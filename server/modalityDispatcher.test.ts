import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  dispatchByModality,
  validateModalityModelCompatibility,
  type ModalityDispatchRequest,
} from "./_core/modalityDispatcher";
import * as modalityRouter from "./_core/modalityRouter";
import * as streamingLLM from "./_core/streamingLLM";
import * as imageGeneration from "./_core/imageGeneration";
import * as videoGeneration from "./_core/videoGeneration";

// Mock dependencies
vi.mock("./_core/modalityRouter");
vi.mock("./_core/streamingLLM");
vi.mock("./_core/imageGeneration");
vi.mock("./_core/videoGeneration");

describe("Modality Dispatcher", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("dispatchByModality", () => {
    it("should dispatch text requests to LLM service", async () => {
      const mockMessages = [
        { role: "user" as const, content: "What is AI?" },
      ];

      vi.mocked(modalityRouter.detectModality).mockReturnValue("text");
      vi.mocked(modalityRouter.routeByModality).mockReturnValue({
        selectedModel: {
          id: "gpt-4",
          name: "GPT-4",
          provider: "openai",
          complexity: 10,
          speed: 8,
          quality: 10,
          cost: 0.03,
        },
        reason: "General question - GPT-4 is optimal",
      });
      vi.mocked(streamingLLM.streamLLMResponse).mockResolvedValue(
        "AI is a broad field..."
      );

      const request: ModalityDispatchRequest = {
        messages: mockMessages,
        userInput: "What is AI?",
        contentType: "text",
      };

      const result = await dispatchByModality(request);

      expect(result.modality).toBe("text");
      expect(result.model).toBe("gpt-4");
      expect(result.content).toBe("AI is a broad field...");
      expect(streamingLLM.streamLLMResponse).toHaveBeenCalled();
    });

    it("should dispatch image requests to image generation service", async () => {
      const mockMessages = [
        { role: "user" as const, content: "Generate a beautiful landscape" },
      ];

      vi.mocked(modalityRouter.detectModality).mockReturnValue("image");
      vi.mocked(modalityRouter.routeByModality).mockReturnValue({
        selectedModel: {
          id: "dall-e-3",
          name: "DALL-E 3",
          provider: "openai",
          complexity: 8,
          speed: 6,
          quality: 9,
          cost: 0.02,
        },
        reason: "Image generation - DALL-E 3 is optimal",
      });
      vi.mocked(imageGeneration.generateImage).mockResolvedValue({
        url: "https://example.com/image.jpg",
      });

      const request: ModalityDispatchRequest = {
        messages: mockMessages,
        userInput: "Generate a beautiful landscape",
        contentType: "image",
      };

      const result = await dispatchByModality(request);

      expect(result.modality).toBe("image");
      expect(result.model).toBe("dall-e-3");
      expect(result.url).toBe("https://example.com/image.jpg");
      expect(imageGeneration.generateImage).toHaveBeenCalled();
    });

    it("should dispatch video requests to video generation service", async () => {
      const mockMessages = [
        { role: "user" as const, content: "Create a 5-second video" },
      ];

      vi.mocked(modalityRouter.detectModality).mockReturnValue("video");
      vi.mocked(modalityRouter.routeByModality).mockReturnValue({
        selectedModel: {
          id: "runway-ml",
          name: "Runway ML",
          provider: "runway",
          complexity: 9,
          speed: 4,
          quality: 9,
          cost: 0.05,
        },
        reason: "Video generation - Runway ML is optimal",
      });
      vi.mocked(videoGeneration.generateVideo).mockResolvedValue({
        url: "https://example.com/video.mp4",
      });

      const request: ModalityDispatchRequest = {
        messages: mockMessages,
        userInput: "Create a 5-second video",
        contentType: "video",
      };

      const result = await dispatchByModality(request);

      expect(result.modality).toBe("video");
      expect(result.model).toBe("runway-ml");
      expect(result.url).toBe("https://example.com/video.mp4");
      expect(videoGeneration.generateVideo).toHaveBeenCalled();
    });

    it("should handle streaming callbacks for text generation", async () => {
      const mockMessages = [
        { role: "user" as const, content: "Tell me a story" },
      ];
      const chunks: string[] = [];

      vi.mocked(modalityRouter.detectModality).mockReturnValue("text");
      vi.mocked(modalityRouter.routeByModality).mockReturnValue({
        selectedModel: {
          id: "claude",
          name: "Claude",
          provider: "anthropic",
          complexity: 9,
          speed: 7,
          quality: 9,
          cost: 0.015,
        },
        reason: "Story generation - Claude is optimal",
      });
      vi.mocked(streamingLLM.streamLLMResponse).mockImplementation(
        async (messages, model, onChunk) => {
          if (onChunk) {
            onChunk("Once ");
            onChunk("upon ");
            onChunk("a time...");
          }
          return "Once upon a time...";
        }
      );

      const request: ModalityDispatchRequest = {
        messages: mockMessages,
        userInput: "Tell me a story",
        onChunk: (chunk) => chunks.push(chunk),
      };

      const result = await dispatchByModality(request);

      expect(result.content).toBe("Once upon a time...");
      expect(chunks.length).toBeGreaterThan(0);
    });

    it("should include metadata in response", async () => {
      const mockMessages = [
        { role: "user" as const, content: "Simple query" },
      ];

      vi.mocked(modalityRouter.detectModality).mockReturnValue("text");
      vi.mocked(modalityRouter.routeByModality).mockReturnValue({
        selectedModel: {
          id: "gpt-4",
          name: "GPT-4",
          provider: "openai",
          complexity: 10,
          speed: 8,
          quality: 10,
          cost: 0.03,
        },
        reason: "Default model selection",
      });
      vi.mocked(streamingLLM.streamLLMResponse).mockResolvedValue("Response");

      const request: ModalityDispatchRequest = {
        messages: mockMessages,
        userInput: "Simple query",
      };

      const result = await dispatchByModality(request);

      expect(result.metadata).toBeDefined();
      expect(result.metadata?.provider).toBe("openai");
      expect(result.metadata?.selectionReason).toBe("Default model selection");
    });

    it("should handle errors gracefully", async () => {
      const mockMessages = [
        { role: "user" as const, content: "Failing request" },
      ];

      vi.mocked(modalityRouter.detectModality).mockReturnValue("text");
      vi.mocked(modalityRouter.routeByModality).mockReturnValue({
        selectedModel: {
          id: "gpt-4",
          name: "GPT-4",
          provider: "openai",
          complexity: 10,
          speed: 8,
          quality: 10,
          cost: 0.03,
        },
        reason: "Default",
      });
      vi.mocked(streamingLLM.streamLLMResponse).mockRejectedValue(
        new Error("API Error")
      );

      const request: ModalityDispatchRequest = {
        messages: mockMessages,
        userInput: "Failing request",
      };

      await expect(dispatchByModality(request)).rejects.toThrow("API Error");
    });
  });

  describe("validateModalityModelCompatibility", () => {
    it("should validate text model compatibility", () => {
      expect(validateModalityModelCompatibility("text", "gpt-4")).toBe(true);
      expect(validateModalityModelCompatibility("text", "claude")).toBe(true);
      expect(validateModalityModelCompatibility("text", "dall-e-3")).toBe(
        false
      );
    });

    it("should validate image model compatibility", () => {
      expect(validateModalityModelCompatibility("image", "dall-e-3")).toBe(
        true
      );
      expect(validateModalityModelCompatibility("image", "midjourney")).toBe(
        true
      );
      expect(validateModalityModelCompatibility("image", "gpt-4")).toBe(false);
    });

    it("should validate video model compatibility", () => {
      expect(validateModalityModelCompatibility("video", "runway-ml")).toBe(
        true
      );
      expect(validateModalityModelCompatibility("video", "synthesia")).toBe(
        true
      );
      expect(validateModalityModelCompatibility("video", "gpt-4")).toBe(false);
    });
  });
});
