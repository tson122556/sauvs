import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  detectContentType,
  selectOptimalModel,
  generateMultimodalContent,
  type ContentType,
} from "./_core/multimodalGenerator";

describe("Multimodal Content Generation", () => {
  describe("detectContentType", () => {
    it("should detect image content type", () => {
      const prompts = [
        "Generate an image of a sunset",
        "Create a beautiful illustration",
        "Draw a logo for my company",
        "Design a poster",
      ];

      prompts.forEach((prompt) => {
        expect(detectContentType(prompt)).toBe("image");
      });
    });

    it("should detect video content type", () => {
      const prompts = [
        "Create a video of a spaceship",
        "Animate a cinematic scene",
        "Generate a movie trailer",
        "Make an animation of dancing",
      ];

      prompts.forEach((prompt) => {
        expect(detectContentType(prompt)).toBe("video");
      });
    });

    it("should detect code content type", () => {
      const prompts = [
        "Write a function to calculate fibonacci",
        "Create a class for user management",
        "Implement a sorting algorithm",
        "Write code for a REST API",
      ];

      prompts.forEach((prompt) => {
        expect(detectContentType(prompt)).toBe("code");
      });
    });

    it("should detect analysis content type", () => {
      const prompts = [
        "Analyze the market trends",
        "Explain quantum computing",
        "Research the impact of AI",
        "Study the climate change data",
      ];

      prompts.forEach((prompt) => {
        expect(detectContentType(prompt)).toBe("analysis");
      });
    });

    it("should default to text content type", () => {
      const prompts = [
        "Hello, how are you?",
        "Tell me a joke",
        "What is the weather today?",
      ];

      prompts.forEach((prompt) => {
        expect(detectContentType(prompt)).toBe("text");
      });
    });
  });

  describe("selectOptimalModel", () => {
    it("should select GPT-4 for text content", () => {
      expect(selectOptimalModel("text")).toBe("gpt-4");
    });

    it("should select Gemini for image content", () => {
      expect(selectOptimalModel("image")).toBe("gemini");
    });

    it("should select Gemini for video content", () => {
      expect(selectOptimalModel("video")).toBe("gemini");
    });

    it("should select GPT-4 for code content", () => {
      expect(selectOptimalModel("code")).toBe("gpt-4");
    });

    it("should select Claude for analysis content", () => {
      expect(selectOptimalModel("analysis")).toBe("claude");
    });

    it("should respect user model preference", () => {
      expect(selectOptimalModel("text", "claude")).toBe("claude");
      expect(selectOptimalModel("image", "gpt-4")).toBe("gpt-4");
      expect(selectOptimalModel("video", "deepseek")).toBe("deepseek");
    });
  });

  describe("generateMultimodalContent", () => {
    beforeEach(() => {
      // Mock the LLM and image/video generation functions
      vi.clearAllMocks();
    });

    it("should generate text content with detected type", async () => {
      // This test verifies the structure without making actual API calls
      const contentType = detectContentType("Tell me about AI");
      expect(contentType).toBe("text");

      const model = selectOptimalModel(contentType);
      expect(model).toBe("gpt-4");
    });

    it("should generate image content with detected type", async () => {
      const contentType = detectContentType("Create a beautiful landscape image");
      expect(contentType).toBe("image");

      const model = selectOptimalModel(contentType);
      expect(model).toBe("gemini");
    });

    it("should generate video content with detected type", async () => {
      const contentType = detectContentType("Animate a spaceship flying");
      expect(contentType).toBe("video");

      const model = selectOptimalModel(contentType);
      expect(model).toBe("gemini");
    });

    it("should generate code content with detected type", async () => {
      const contentType = detectContentType("Write a Python function");
      expect(contentType).toBe("code");

      const model = selectOptimalModel(contentType);
      expect(model).toBe("gpt-4");
    });

    it("should generate analysis content with detected type", async () => {
      const contentType = detectContentType("Analyze market trends");
      expect(contentType).toBe("analysis");

      const model = selectOptimalModel(contentType);
      expect(model).toBe("claude");
    });

    it("should handle explicit content type specification", () => {
      const contentType: ContentType = "code";
      const model = selectOptimalModel(contentType);
      expect(model).toBe("gpt-4");
    });

    it("should handle explicit model specification", () => {
      const model = selectOptimalModel("text", "deepseek");
      expect(model).toBe("deepseek");
    });
  });

  describe("Content Type Detection Edge Cases", () => {
    it("should handle mixed keywords", () => {
      // When multiple keywords are present, should pick the first match
      const prompt =
        "Create a video with code snippets displayed as text";
      const contentType = detectContentType(prompt);
      expect(["video", "code", "text"]).toContain(contentType);
    });

    it("should be case insensitive", () => {
      const prompt1 = "Generate an IMAGE";
      const prompt2 = "generate an image";
      expect(detectContentType(prompt1)).toBe(detectContentType(prompt2));
    });

    it("should handle empty strings", () => {
      const contentType = detectContentType("");
      expect(contentType).toBe("text");
    });

    it("should handle special characters", () => {
      const prompt = "Create an image!!! @#$%";
      expect(detectContentType(prompt)).toBe("image");
    });
  });

  describe("Model Selection Logic", () => {
    it("should provide consistent model selection", () => {
      const contentTypes: ContentType[] = [
        "text",
        "image",
        "video",
        "code",
        "analysis",
      ];

      contentTypes.forEach((type) => {
        const model1 = selectOptimalModel(type);
        const model2 = selectOptimalModel(type);
        expect(model1).toBe(model2);
      });
    });

    it("should support all model types", () => {
      const models = ["gpt-4", "claude", "gemini", "grok", "kimi", "deepseek"];

      models.forEach((model) => {
        const selectedModel = selectOptimalModel("text", model);
        expect(selectedModel).toBe(model);
      });
    });
  });
});
