import { describe, it, expect, vi, beforeEach } from "vitest";
import { customerServiceRouter } from "./customerService";
import { invokeLLM } from "../_core/llm";

// Mock invokeLLM
vi.mock("../_core/llm", () => ({
  invokeLLM: vi.fn(),
}));

describe("Customer Service Router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("sendMessage", () => {
    it("should send a message and get a response", async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: "感谢您的咨询。我们的产品包括 AI 应用、智能机器人和物联网解决方案。",
            },
          },
        ],
      };

      vi.mocked(invokeLLM).mockResolvedValue(mockResponse as any);

      const procedure = customerServiceRouter.createCaller({});

      // 测试发送消息
      const result = await procedure.sendMessage({
        message: "请介绍一下你们的产品",
        conversationHistory: [],
        language: "zh",
      });

      expect(result.success).toBe(true);
      expect(result.message).toBe(
        "感谢您的咨询。我们的产品包括 AI 应用、智能机器人和物联网解决方案。"
      );
    });

    it("should handle conversation history", async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: "我们的 AI 应用可以帮助您实现智能化业务流程。",
            },
          },
        ],
      };

      vi.mocked(invokeLLM).mockResolvedValue(mockResponse as any);

      const procedure = customerServiceRouter.createCaller({});

      const conversationHistory = [
        { role: "user" as const, content: "你们有什么产品？" },
        {
          role: "assistant" as const,
          content: "我们有 AI 应用、智能机器人和物联网解决方案。",
        },
      ];

      const result = await procedure.sendMessage({
        message: "AI 应用可以做什么？",
        conversationHistory,
        language: "zh",
      });

      expect(result.success).toBe(true);
      expect(result.message).toContain("AI 应用");
    });

    it("should support English language", async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: "Thank you for your inquiry. We offer AI applications, smart robots, and IoT solutions.",
            },
          },
        ],
      };

      vi.mocked(invokeLLM).mockResolvedValue(mockResponse as any);

      const procedure = customerServiceRouter.createCaller({});

      const result = await procedure.sendMessage({
        message: "What products do you offer?",
        conversationHistory: [],
        language: "en",
      });

      expect(result.success).toBe(true);
      expect(result.message).toContain("AI applications");
    });

    it("should handle API errors gracefully", async () => {
      vi.mocked(invokeLLM).mockRejectedValue(new Error("API Error"));

      const procedure = customerServiceRouter.createCaller({});

      const result = await procedure.sendMessage({
        message: "测试消息",
        conversationHistory: [],
        language: "zh",
      });

      expect(result.success).toBe(false);
      expect(result.message).toContain("错误");
    });

    it("should reject empty messages", async () => {
      const procedure = customerServiceRouter.createCaller({});

      try {
        await procedure.sendMessage({
          message: "",
          conversationHistory: [],
          language: "zh",
        });
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("should support general knowledge questions", async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: "Python 是一种高级编程语言，以其简洁易读的语法而闻名。",
            },
          },
        ],
      };

      vi.mocked(invokeLLM).mockResolvedValue(mockResponse as any);

      const procedure = customerServiceRouter.createCaller({});

      const result = await procedure.sendMessage({
        message: "请解释一下 Python 编程语言",
        conversationHistory: [],
        language: "zh",
      });

      expect(result.success).toBe(true);
      expect(result.message).toContain("Python");
    });

    it("should answer general knowledge in English", async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: "Machine learning is a subset of artificial intelligence that enables systems to learn from data.",
            },
          },
        ],
      };

      vi.mocked(invokeLLM).mockResolvedValue(mockResponse as any);

      const procedure = customerServiceRouter.createCaller({});

      const result = await procedure.sendMessage({
        message: "What is machine learning?",
        conversationHistory: [],
        language: "en",
      });

      expect(result.success).toBe(true);
      expect(result.message).toContain("Machine learning");
    });
  });

  describe("getFAQResponse", () => {
    it("should return FAQ response for company question", async () => {
      const procedure = customerServiceRouter.createCaller({});

      const result = await procedure.getFAQResponse({
        question: "请介绍一下公司",
        language: "zh",
      });

      expect(result.answer).toBeDefined();
      expect(result.answer).toContain("极紫星");
    });

    it("should return FAQ response for contact question", async () => {
      const procedure = customerServiceRouter.createCaller({});

      const result = await procedure.getFAQResponse({
        question: "如何联系你们？",
        language: "zh",
      });

      expect(result.answer).toBeDefined();
      expect(result.answer).toContain("1519387647");
    });

    it("should return FAQ response for address question", async () => {
      const procedure = customerServiceRouter.createCaller({});

      const result = await procedure.getFAQResponse({
        question: "你们的地址是什么？",
        language: "zh",
      });

      expect(result.answer).toBeDefined();
      expect(result.answer).toContain("香港");
    });

    it("should return FAQ response for products question", async () => {
      const procedure = customerServiceRouter.createCaller({});

      const result = await procedure.getFAQResponse({
        question: "你们有什么产品？",
        language: "zh",
      });

      expect(result.answer).toBeDefined();
      expect(result.answer).toContain("产品");
    });

    it("should return null for unknown question", async () => {
      const procedure = customerServiceRouter.createCaller({});

      const result = await procedure.getFAQResponse({
        question: "天气如何？",
        language: "zh",
      });

      expect(result.answer).toBeNull();
    });

    it("should support English FAQ", async () => {
      const procedure = customerServiceRouter.createCaller({});

      const result = await procedure.getFAQResponse({
        question: "Tell me about your company",
        language: "en",
      });

      expect(result.answer).toBeDefined();
      expect(result.answer).toContain("UVS");
    });
  });
});
