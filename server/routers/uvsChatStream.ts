/**
 * UVS AI Chat 流式响应路由器
 * 提供对话管理、消息持久化和真实 LLM API 集成
 */

import { protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import {
  createAIConversation,
  getAIConversations,
  getAIConversationById,
  updateAIConversation,
  deleteAIConversation,
  createAIMessage,
  getAIMessages,
  deleteAIMessages,
  createOrUpdateAIUsageStat,
  getAIUsageStats,
} from "../db";
import { invokeLLM } from "../_core/llm";
import { streamLLMResponse, buildSystemPrompt } from "../_core/streamingLLM";

export const uvsChatStreamRouter = router({
  /**
   * 创建新对话
   */
  createConversation: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(300),
        model: z.string().default("gpt-4"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user?.id) {
        throw new Error("User not authenticated");
      }

      try {
        const result = await createAIConversation({
          userId: ctx.user.id,
          title: input.title,
          model: input.model,
          messageCount: 0,
        });

        return {
          success: true,
          conversationId: result[0].insertId,
        };
      } catch (error) {
        console.error("Create conversation error:", error);
        throw error;
      }
    }),

  /**
   * 获取用户的所有对话
   */
  getConversations: protectedProcedure
    .input(
      z.object({
        limit: z.number().default(50),
        offset: z.number().default(0),
      })
    )
    .query(async ({ input, ctx }) => {
      if (!ctx.user?.id) {
        throw new Error("User not authenticated");
      }

      try {
        const conversations = await getAIConversations(ctx.user.id, input.limit, input.offset);
        return {
          success: true,
          conversations,
        };
      } catch (error) {
        console.error("Get conversations error:", error);
        throw error;
      }
    }),

  /**
   * 获取对话详情及消息
   */
  getConversation: protectedProcedure
    .input(z.object({ conversationId: z.number() }))
    .query(async ({ input, ctx }) => {
      if (!ctx.user?.id) {
        throw new Error("User not authenticated");
      }

      try {
        const conversation = await getAIConversationById(input.conversationId);
        if (!conversation) {
          throw new Error("Conversation not found");
        }

        if (conversation.userId !== ctx.user.id) {
          throw new Error("Unauthorized");
        }

        const messages = await getAIMessages(input.conversationId);

        return {
          success: true,
          conversation,
          messages,
        };
      } catch (error) {
        console.error("Get conversation error:", error);
        throw error;
      }
    }),

  /**
   * 发送消息并获取 AI 响应（流式）
   */
  sendMessage: protectedProcedure
    .input(
      z.object({
        conversationId: z.number(),
        content: z.string().min(1),
        contentType: z.enum(["text", "image", "video", "code", "analysis"]).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user?.id) {
        throw new Error("User not authenticated");
      }

      try {
        // 验证对话所有权
        const conversation = await getAIConversationById(input.conversationId);
        if (!conversation) {
          throw new Error("Conversation not found");
        }

        if (conversation.userId !== ctx.user.id) {
          throw new Error("Unauthorized");
        }

        // 保存用户消息
        await createAIMessage({
          conversationId: input.conversationId,
          role: "user",
          content: input.content,
        });

        // 获取对话历史
        const messages = await getAIMessages(input.conversationId);

        // 构建消息列表
        const messageList: Array<{ role: "user" | "assistant" | "system"; content: string }> = messages.map((msg) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        }));

        // 添加系统提示
        const systemPrompt = buildSystemPrompt(input.contentType);
        messageList.unshift({
          role: "system",
          content: systemPrompt,
        });

        // 调用 LLM 获取响应
        let fullResponse = "";
        try {
          fullResponse = await streamLLMResponse(
            messageList,
            conversation.model,
            (chunk) => {
              // 流式数据处理（在实际应用中会通过 SSE 发送）
              process.stdout.write(chunk);
            }
          );
        } catch (llmError) {
          console.error("LLM API error:", llmError);
          fullResponse = "抱歉，AI 服务暂时不可用。请稍后重试。";
        }

        // 保存 AI 响应
        const messageResult = await createAIMessage({
          conversationId: input.conversationId,
          role: "assistant",
          content: fullResponse,
          model: conversation.model,
          tokenCount: Math.ceil(fullResponse.length / 4), // 粗略估计
        });

        // 更新对话消息计数
        await updateAIConversation(input.conversationId, {
          messageCount: conversation.messageCount + 2,
          updatedAt: new Date(),
        });

        // 记录使用统计
        const today = new Date().toISOString().split("T")[0];
        await createOrUpdateAIUsageStat({
          userId: ctx.user.id,
          model: conversation.model,
          callCount: 1,
          totalTokens: Math.ceil((input.content.length + fullResponse.length) / 4),
          successCount: 1,
          failureCount: 0,
          statDate: new Date(today),
        });

        return {
          success: true,
          messageId: messageResult[0].insertId,
          response: fullResponse,
        };
      } catch (error) {
        console.error("Send message error:", error);
        throw error;
      }
    }),

  /**
   * 删除对话
   */
  deleteConversation: protectedProcedure
    .input(z.object({ conversationId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user?.id) {
        throw new Error("User not authenticated");
      }

      try {
        const conversation = await getAIConversationById(input.conversationId);
        if (!conversation) {
          throw new Error("Conversation not found");
        }

        if (conversation.userId !== ctx.user.id) {
          throw new Error("Unauthorized");
        }

        // 删除所有消息
        await deleteAIMessages(input.conversationId);

        // 删除对话
        await deleteAIConversation(input.conversationId);

        return {
          success: true,
        };
      } catch (error) {
        console.error("Delete conversation error:", error);
        throw error;
      }
    }),

  /**
   * 更新对话标题
   */
  updateConversationTitle: protectedProcedure
    .input(
      z.object({
        conversationId: z.number(),
        title: z.string().min(1).max(300),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user?.id) {
        throw new Error("User not authenticated");
      }

      try {
        const conversation = await getAIConversationById(input.conversationId);
        if (!conversation) {
          throw new Error("Conversation not found");
        }

        if (conversation.userId !== ctx.user.id) {
          throw new Error("Unauthorized");
        }

        await updateAIConversation(input.conversationId, {
          title: input.title,
          updatedAt: new Date(),
        });

        return {
          success: true,
        };
      } catch (error) {
        console.error("Update conversation error:", error);
        throw error;
      }
    }),

  /**
   * 获取使用统计
   */
  getUsageStats: protectedProcedure
    .input(
      z.object({
        days: z.number().default(30),
      })
    )
    .query(async ({ input, ctx }) => {
      if (!ctx.user?.id) {
        throw new Error("User not authenticated");
      }

      try {
        const stats = await getAIUsageStats(ctx.user.id);
        return {
          success: true,
          stats,
        };
      } catch (error) {
        console.error("Get usage stats error:", error);
        throw error;
      }
    }),
});
