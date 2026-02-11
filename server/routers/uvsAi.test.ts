import { describe, it, expect, vi, beforeEach } from "vitest";
import { uvsAiRouter } from "./uvsAi";
import { invokeLLM } from "../_core/llm";
import { generateImage } from "../_core/imageGeneration";

// Mock LLM and image generation
vi.mock("../_core/llm", () => ({
  invokeLLM: vi.fn(),
}));

vi.mock("../_core/imageGeneration", () => ({
  generateImage: vi.fn(),
}));

describe("UVS AI Router", () => {
  let caller: any;

  beforeEach(() => {
    vi.clearAllMocks();
    caller = uvsAiRouter.createCaller({});
  });

  describe("getAvailableModels", () => {
    it("should return list of available models", async () => {
      const models = await caller.getAvailableModels();
      expect(Array.isArray(models)).toBe(true);
      expect(models.length).toBeGreaterThan(0);
      expect(models[0]).toHaveProperty("id");
      expect(models[0]).toHaveProperty("name");
      expect(models[0]).toHaveProperty("capabilities");
    });

    it("should return models with correct properties", async () => {
      const models = await caller.getAvailableModels();
      models.forEach((model: any) => {
        expect(model.id).toBeTruthy();
        expect(model.name).toBeTruthy();
        expect(model.description).toBeTruthy();
        expect(Array.isArray(model.capabilities)).toBe(true);
      });
    });
  });

  describe("analyzeIntent", () => {
    it("should detect code-related intent", async () => {
      const result = await caller.analyzeIntent({
        message: "How do I write a Python function?",
      });
      expect(result.contentType).toBe("code");
      expect(result.suggestedModels.length).toBeGreaterThan(0);
      expect(result.reasoning).toBeTruthy();
    });

    it("should detect image-related intent", async () => {
      const result = await caller.analyzeIntent({
        message: "Generate an image of a sunset",
      });
      expect(result.contentType).toBe("image");
      expect(result.suggestedModels.length).toBeGreaterThan(0);
    });

    it("should detect video-related intent", async () => {
      const result = await caller.analyzeIntent({
        message: "Create a video script for product demo",
      });
      expect(["video", "text", "image"]).toContain(result.contentType);
      expect(result.suggestedModels.length).toBeGreaterThan(0);
    });

    it("should detect analysis-related intent", async () => {
      const result = await caller.analyzeIntent({
        message: "Analyze the market trends",
      });
      expect(["analysis", "file", "text"]).toContain(result.contentType);
      expect(result.suggestedModels.length).toBeGreaterThan(0);
    });

    it("should default to text for general messages", async () => {
      const result = await caller.analyzeIntent({
        message: "Hello, how are you?",
      });
      expect(result.contentType).toBe("text");
      expect(result.suggestedModels.length).toBeGreaterThan(0);
    });
  });

  describe("sendMessage", () => {
    it("should send message and return response", async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: "AI is artificial intelligence...",
            },
          },
        ],
      };

      vi.mocked(invokeLLM).mockResolvedValue(mockResponse as any);

      const result = await caller.sendMessage({
        message: "What is AI?",
        conversationHistory: [],
        autoSelectMode: true,
      });

      expect(result).toHaveProperty("response");
      expect(result).toHaveProperty("model");
      expect(result).toHaveProperty("contentType");
      expect(result).toHaveProperty("intentAnalysis");
      expect(result).toHaveProperty("timestamp");
      expect(typeof result.response).toBe("string");
    });

    it("should support manual model selection", async () => {
      const result = await caller.sendMessage({
        message: "Write code",
        conversationHistory: [],
        selectedModel: "gpt4",
        autoSelectMode: false,
      });

      expect(result.model).toBe("gpt4");
    });

    it("should maintain conversation history", async () => {
      const history = [
        { role: "user" as const, content: "Hello" },
        { role: "assistant" as const, content: "Hi there!" },
      ];

      const result = await caller.sendMessage({
        message: "How are you?",
        conversationHistory: history,
        autoSelectMode: true,
      });

      expect(result).toHaveProperty("response");
      expect(typeof result.response).toBe("string");
    });

    it("should auto-select model based on intent", async () => {
      const result = await caller.sendMessage({
        message: "Generate Python code for fibonacci",
        conversationHistory: [],
        autoSelectMode: true,
      });

      expect(result.contentType).toBe("code");
      expect(["gpt4", "claude", "deepseek"]).toContain(result.model);
    });
  });

  describe("generateImage", () => {
    it("should generate image with valid prompt", async () => {
      const mockImageResult = {
        url: "https://example.com/image.jpg",
      };

      vi.mocked(generateImage).mockResolvedValue(mockImageResult as any);

      const result = await caller.generateImage({
        prompt: "A beautiful sunset over mountains",
      });

      expect(result).toHaveProperty("success");
      expect(result).toHaveProperty("imageUrl");
      expect(result).toHaveProperty("timestamp");
    });
  });

  describe("generateCode", () => {
    it("should generate code with description", async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: "def factorial(n):\n  return 1 if n <= 1 else n * factorial(n-1)",
            },
          },
        ],
      };

      vi.mocked(invokeLLM).mockResolvedValue(mockResponse as any);

      const result = await caller.generateCode({
        description: "Create a function that calculates factorial",
        language: "python",
      });

      expect(result).toHaveProperty("code");
      expect(result).toHaveProperty("language");
      expect(result).toHaveProperty("timestamp");
      expect(typeof result.code).toBe("string");
      expect(result.language).toBe("python");
    });

    it("should default to python language", async () => {
      const result = await caller.generateCode({
        description: "Hello world program",
      });

      expect(result.language).toBe("python");
    });
  });

  describe("analyzeContent", () => {
    it("should summarize content", async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: "This text is about summarization.",
            },
          },
        ],
      };

      vi.mocked(invokeLLM).mockResolvedValue(mockResponse as any);

      const result = await caller.analyzeContent({
        content: "This is a long text that needs to be summarized",
        analysisType: "summary",
      });

      expect(result).toHaveProperty("analysis");
      expect(result).toHaveProperty("analysisType");
      expect(result).toHaveProperty("timestamp");
      expect(result.analysisType).toBe("summary");
    });

    it("should analyze sentiment", async () => {
      const result = await caller.analyzeContent({
        content: "I love this product, it's amazing!",
        analysisType: "sentiment",
      });

      expect(result.analysisType).toBe("sentiment");
    });

    it("should extract entities", async () => {
      const result = await caller.analyzeContent({
        content: "John Smith works at Google in New York",
        analysisType: "entities",
      });

      expect(result.analysisType).toBe("entities");
    });

    it("should extract keywords", async () => {
      const result = await caller.analyzeContent({
        content: "Machine learning and artificial intelligence are transforming technology",
        analysisType: "keywords",
      });

      expect(result.analysisType).toBe("keywords");
    });
  });

  describe("generateVideoScript", () => {
    it("should generate video script", async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: "Scene 1: Product showcase...\nVoiceover: Introducing our new product...",
            },
          },
        ],
      };

      vi.mocked(invokeLLM).mockResolvedValue(mockResponse as any);

      const result = await caller.generateVideoScript({
        topic: "Product launch announcement",
        duration: 60,
        style: "professional",
      });

      expect(result).toHaveProperty("script");
      expect(result).toHaveProperty("topic");
      expect(result).toHaveProperty("duration");
      expect(result).toHaveProperty("timestamp");
      expect(result).toHaveProperty("success");
      expect(typeof result.script).toBe("string");
    });

    it("should use default duration and style", async () => {
      const result = await caller.generateVideoScript({
        topic: "Tutorial video",
      });

      expect(result.duration).toBe(60);
      expect(result.success).toBe(true);
    });
  });
});
