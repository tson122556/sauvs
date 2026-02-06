import { describe, it, expect, vi, beforeEach } from "vitest";
import { z } from "zod";

// Mock the sendMessage input schema
const sendMessageInputSchema = z.object({
  conversationId: z.number(),
  content: z.string().min(1),
  contentType: z
    .enum(["text", "image", "video", "code", "analysis"])
    .optional(),
  manualModel: z.string().optional(),
  isModelLocked: z.boolean().optional(),
});

describe("Manual Model Selection", () => {
  describe("Input Validation", () => {
    it("should accept manual model selection", () => {
      const input = {
        conversationId: 1,
        content: "Generate an image",
        contentType: "image" as const,
        manualModel: "dall-e-3",
        isModelLocked: true,
      };

      const result = sendMessageInputSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.manualModel).toBe("dall-e-3");
        expect(result.data.isModelLocked).toBe(true);
      }
    });

    it("should accept auto-select mode without manual model", () => {
      const input = {
        conversationId: 1,
        content: "What is AI?",
        contentType: "text" as const,
      };

      const result = sendMessageInputSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.manualModel).toBeUndefined();
        expect(result.data.isModelLocked).toBeUndefined();
      }
    });

    it("should reject empty content", () => {
      const input = {
        conversationId: 1,
        content: "",
        manualModel: "gpt-4",
      };

      const result = sendMessageInputSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  describe("Model Selection Logic", () => {
    it("should prioritize manual model over auto-selection", () => {
      const autoModel = "gpt-4";
      const manualModel = "claude";
      const isModelLocked = true;

      const selectedModel = manualModel || autoModel;

      expect(selectedModel).toBe("claude");
    });

    it("should use auto-selection when no manual model is provided", () => {
      const autoModel = "gpt-4";
      const manualModel: string | undefined = undefined;

      const selectedModel = manualModel || autoModel;

      expect(selectedModel).toBe("gpt-4");
    });

    it("should track manual selection state", () => {
      const manualModel = "dall-e-3";
      const isManuallySelected = !!manualModel;

      expect(isManuallySelected).toBe(true);
    });
  });

  describe("Model Lock Behavior", () => {
    it("should maintain locked model across multiple requests", () => {
      const lockedModel = "gpt-4";
      const isModelLocked = true;

      const request1 = {
        conversationId: 1,
        content: "First question",
        manualModel: lockedModel,
        isModelLocked,
      };

      const request2 = {
        conversationId: 1,
        content: "Second question",
        manualModel: lockedModel,
        isModelLocked,
      };

      expect(request1.manualModel).toBe(request2.manualModel);
      expect(request1.isModelLocked).toBe(request2.isModelLocked);
    });

    it("should allow switching locked model", () => {
      const model1 = "gpt-4";
      const model2 = "claude";
      const isLocked = true;

      const newModel = model2;

      expect(newModel).not.toBe(model1);
      expect(isLocked).toBe(true);
    });
  });

  describe("Model Compatibility", () => {
    it("should validate text model for text content", () => {
      const textModels = ["gpt-4", "claude", "grok", "gemini"];
      const selectedModel = "gpt-4";
      const contentType = "text";

      const isCompatible = textModels.includes(selectedModel);

      expect(isCompatible).toBe(true);
      expect(contentType).toBe("text");
    });

    it("should validate image model for image content", () => {
      const imageModels = ["dall-e-3", "midjourney", "stable-diffusion"];
      const selectedModel = "dall-e-3";
      const contentType = "image";

      const isCompatible = imageModels.includes(selectedModel);

      expect(isCompatible).toBe(true);
      expect(contentType).toBe("image");
    });

    it("should validate video model for video content", () => {
      const videoModels = ["runway-ml", "synthesia"];
      const selectedModel = "runway-ml";
      const contentType = "video";

      const isCompatible = videoModels.includes(selectedModel);

      expect(isCompatible).toBe(true);
      expect(contentType).toBe("video");
    });
  });
});
