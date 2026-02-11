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

      const caller = vi.fn();
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
      expect(result.conversationHistory).toHaveLength(2);
      expect(result.conversationHistory[0].role).toBe("user");
      expect(result.conversationHistory[0].content).toBe("请介绍一下你们的产品");
      expect(result.conversationHistory[1].role).toBe("assistant");
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
      expect(result.conversationHistory).toHaveLength(4);
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
      expect(result.message).toContain("暂时不可用");
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
  });

  describe("getFAQResponse", () => {
    it("should return FAQ response for Chinese keyword", async () => {
      const procedure = customerServiceRouter.createCaller({});

      const result = await procedure.getFAQResponse({
        keyword: "价格",
        language: "zh",
      });

      expect(result.found).toBe(true);
      expect(result.response).toContain("定价方案");
    });

    it("should return FAQ response for English keyword", async () => {
      const procedure = customerServiceRouter.createCaller({});

      const result = await procedure.getFAQResponse({
        keyword: "price",
        language: "en",
      });

      expect(result.found).toBe(true);
      expect(result.response).toContain("pricing");
    });

    it("should return not found for unknown keyword", async () => {
      const procedure = customerServiceRouter.createCaller({});

      const result = await procedure.getFAQResponse({
        keyword: "未知关键词",
        language: "zh",
      });

      expect(result.found).toBe(false);
      expect(result.response).toBeNull();
    });

    it("should handle case-insensitive keyword matching", async () => {
      const procedure = customerServiceRouter.createCaller({});

      const result = await procedure.getFAQResponse({
        keyword: "PRICE",
        language: "en",
      });

      expect(result.found).toBe(true);
      expect(result.response).toContain("pricing");
    });

    it("should support partial keyword matching", async () => {
      const procedure = customerServiceRouter.createCaller({});

      const result = await procedure.getFAQResponse({
        keyword: "产品信息",
        language: "zh",
      });

      expect(result.found).toBe(true);
    });
  });
});
