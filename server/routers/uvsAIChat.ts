/**
 * UVS AI Chat tRPC 路由
 * 实现智能模型选择和 AI 回答功能
 */

import { protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { analyzeIntent } from "../_core/intentAnalyzer";
import {
  respondToUserQuestion,
  generateSelectionExplanation,
} from "../_core/aiResponder";
import {
  createAIConversation,
  getAIConversationById,
  createAIMessage,
  getAIMessages,
} from "../db";

// 根据内容模态选择最优模型
function getModelForModality(modality: string): string {
  const modelMap: Record<string, string> = {
    TEXT: "gpt-4",
    IMAGE: "gemini",
    VIDEO: "gemini",
    CODE: "gpt-4",
  };
  return modelMap[modality] || "gpt-4";
}

// 转换置信度字符串为数字
function confidenceToNumber(confidence: string): number {
  switch (confidence) {
    case "high":
      return 0.9;
    case "medium":
      return 0.6;
    case "low":
      return 0.3;
    default:
      return 0.5;
  }
}

export const uvsAIChatRouter = router({
  /**
   * 创建新对话
   */
  createConversation: protectedProcedure
    .input(
      z.object({
        title: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const conversation = await createAIConversation({
        userId: ctx.user?.id || 0,
        title: input.title || "New Conversation",
      });
      return conversation;
    }),

  /**
   * 发送消息并获取 AI 回答
   */
  sendMessage: protectedProcedure
    .input(
      z.object({
        conversationId: z.number(),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user?.id) {
        throw new Error("User not authenticated");
      }

      try {
        // 验证对话所有权
        const conversation = await getAIConversationById(input.conversationId);
        if (!conversation || conversation.userId !== ctx.user.id) {
          throw new Error("Conversation not found or unauthorized");
        }

        // 保存用户消息
        await createAIMessage({
          conversationId: input.conversationId,
          role: "user",
          content: input.content,
        });

        // 分析用户意图和内容模态
        const contentAnalysis = analyzeIntent(input.content);
        const selectedModel = getModelForModality(contentAnalysis.modality);
        const confidenceNum = confidenceToNumber(contentAnalysis.confidence);

        // 获取对话历史
        const messages = await getAIMessages(input.conversationId);
        const conversationHistory = messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

        // 获取 AI 回答
        const aiResponse = await respondToUserQuestion(
          input.content,
          selectedModel,
          conversationHistory
        );

        if (!aiResponse.success) {
          throw new Error(aiResponse.error || "Failed to get AI response");
        }

        // 保存 AI 回答
        const assistantMessage = await createAIMessage({
          conversationId: input.conversationId,
          role: "assistant",
          content: aiResponse.content || "",
        });

        // 生成模型选择说明
        const selectionExplanation = generateSelectionExplanation(
          selectedModel,
          contentAnalysis.modality,
          confidenceNum
        );

        return {
          success: true,
          model: selectedModel,
          modality: contentAnalysis.modality,
          confidence: confidenceNum,
          selectionExplanation,
          tokensUsed: aiResponse.tokensUsed,
          content: aiResponse.content,
        };
      } catch (error) {
        console.error("[UVS AI Chat] Error sending message:", error);
        throw error;
      }
    }),

  /**
   * 获取对话消息
   */
  getMessages: protectedProcedure
    .input(
      z.object({
        conversationId: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (!ctx.user?.id) {
        throw new Error("User not authenticated");
      }

      // 验证对话所有权
      const conversation = await getAIConversationById(input.conversationId);
      if (!conversation || conversation.userId !== ctx.user.id) {
        throw new Error("Conversation not found or unauthorized");
      }

      const messages = await getAIMessages(input.conversationId);
      return messages;
    }),

  /**
   * 获取模型选择建议
   * 不实际调用 AI，只返回选择建议
   */
  getModelSuggestion: protectedProcedure
    .input(
      z.object({
        userInput: z.string().min(1),
      })
    )
    .query(async ({ input }) => {
      const contentAnalysis = analyzeIntent(input.userInput);
      const selectedModel = getModelForModality(contentAnalysis.modality);
      const confidenceNum = confidenceToNumber(contentAnalysis.confidence);

      return {
        selectedModel,
        modality: contentAnalysis.modality,
        confidence: confidenceNum,
        reason: contentAnalysis.reason,
      };
    }),
});
