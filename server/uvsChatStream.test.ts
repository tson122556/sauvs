import { describe, it, expect, vi, beforeEach } from "vitest";
import { streamLLMResponse, buildSystemPrompt, getModelHandler } from "./_core/streamingLLM";

describe("UVS Chat Stream", () => {
  describe("streamLLMResponse", () => {
    it("should return a string response", async () => {
      const messages = [
        { role: "user" as const, content: "Hello, what is 2+2?" },
      ];

      const response = await streamLLMResponse(messages, "gpt-4");
      expect(typeof response).toBe("string");
      expect(response.length).toBeGreaterThan(0);
    });

    it("should handle streaming callback", async () => {
      const chunks: string[] = [];
      const messages = [
        { role: "user" as const, content: "Say hello" },
      ];

      const response = await streamLLMResponse(
        messages,
        "gpt-4",
        (chunk) => {
          chunks.push(chunk);
        }
      );

      expect(response.length).toBeGreaterThan(0);
      expect(chunks.length).toBeGreaterThan(0);
      expect(chunks.join("")).toBe(response);
    });

    it("should handle different models", async () => {
      const messages = [
        { role: "user" as const, content: "Test message" },
      ];

      const gpt4Response = await streamLLMResponse(messages, "gpt-4");
      const claudeResponse = await streamLLMResponse(messages, "claude");

      expect(typeof gpt4Response).toBe("string");
      expect(typeof claudeResponse).toBe("string");
    });
  });

  describe("buildSystemPrompt", () => {
    it("should return base prompt without content type", () => {
      const prompt = buildSystemPrompt();
      expect(prompt).toContain("极紫星智慧科技");
      expect(prompt).toContain("AI 助手");
    });

    it("should include code-specific instructions", () => {
      const prompt = buildSystemPrompt("code");
      expect(prompt).toContain("代码");
      expect(prompt).toContain("完整");
    });

    it("should include analysis-specific instructions", () => {
      const prompt = buildSystemPrompt("analysis");
      expect(prompt).toContain("分析");
      expect(prompt).toContain("数据");
    });

    it("should return different prompts for different content types", () => {
      const basePrompt = buildSystemPrompt();
      const codePrompt = buildSystemPrompt("code");
      const analysisPrompt = buildSystemPrompt("analysis");

      expect(basePrompt).not.toBe(codePrompt);
      expect(codePrompt).not.toBe(analysisPrompt);
    });
  });

  describe("getModelHandler", () => {
    it("should return correct model names", () => {
      expect(getModelHandler("gpt-4")).toBe("OpenAI GPT-4");
      expect(getModelHandler("claude")).toBe("Anthropic Claude");
      expect(getModelHandler("gemini")).toBe("Google Gemini");
    });

    it("should return Unknown Model for invalid models", () => {
      expect(getModelHandler("invalid-model")).toBe("Unknown Model");
    });

    it("should handle all supported models", () => {
      const models = [
        "gpt-4",
        "gpt-3.5-turbo",
        "claude",
        "claude-3",
        "gemini",
        "grok",
        "kimi",
        "deepseek",
      ];

      models.forEach((model) => {
        const handler = getModelHandler(model);
        expect(handler).not.toBe("Unknown Model");
      });
    });
  });

  describe("Message streaming", () => {
    it("should handle multiple messages in conversation", async () => {
      const messages = [
        { role: "user" as const, content: "What is AI?" },
        { role: "assistant" as const, content: "AI is artificial intelligence..." },
        { role: "user" as const, content: "Tell me more" },
      ];

      const response = await streamLLMResponse(messages, "gpt-4");
      expect(typeof response).toBe("string");
      expect(response.length).toBeGreaterThan(0);
    }, { timeout: 15000 });

    it("should handle system message", async () => {
      const messages = [
        { role: "system" as const, content: "You are a helpful assistant" },
        { role: "user" as const, content: "Hello" },
      ];

      const response = await streamLLMResponse(messages, "gpt-4");
      expect(typeof response).toBe("string");
    }, { timeout: 15000 });
  });

  describe("Error handling", () => {
    it("should handle empty messages gracefully", async () => {
      const messages: any[] = [];
      
      try {
        const response = await streamLLMResponse(messages, "gpt-4");
        expect(typeof response).toBe("string");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("should handle invalid model gracefully", async () => {
      const messages = [
        { role: "user" as const, content: "Test" },
      ];

      try {
        const response = await streamLLMResponse(messages, "invalid-model");
        expect(typeof response).toBe("string");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
