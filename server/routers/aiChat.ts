/**
 * UVS AI Chat 对话路由器
 * 提供对话管理、消息持久化和流式响应功能
 */

import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
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
import { generateMultimodalContent, detectContentType, selectOptimalModel } from "../_core/multimodalGenerator";

export const aiChatRouter = router({
  /**
   * 生成多模态内容（文本、图片、视频等）
   */
  generateMultimodalContent: protectedProcedure
    .input(
      z.object({
        prompt: z.string().min(1),
        contentType: z.enum(["text", "image", "video", "code", "analysis"]).optional(),
        model: z.string().optional(),
        imageOptions: z.object({
          style: z.string().optional(),
          quality: z.enum(["low", "medium", "high"]).optional(),
        }).optional(),
        videoOptions: z.object({
          duration: z.number().optional(),
          resolution: z.enum(["720p", "1080p", "4k"]).optional(),
          style: z.string().optional(),
        }).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user?.id) {
        throw new Error("User not authenticated");
      }

      try {
        const result = await generateMultimodalContent({
          prompt: input.prompt,
          contentType: input.contentType,
          model: input.model,
          imageOptions: input.imageOptions,
          videoOptions: input.videoOptions,
        });

        // 记录使用统计
        const today = new Date().toISOString().split("T")[0];
        await createOrUpdateAIUsageStat({
          userId: ctx.user.id,
          model: result.model || "gpt-4",
          callCount: 1,
          totalTokens: result.metadata?.tokens || 0,
          successCount: 1,
          failureCount: 0,
          statDate: new Date(today),
        });

        return {
          success: true,
          ...result,
        };
      } catch (error) {
        console.error("Multimodal generation error:", error);

        // 记录失败统计
        const today = new Date().toISOString().split("T")[0];
        await createOrUpdateAIUsageStat({
          userId: ctx.user.id,
          model: input.model || "gpt-4",
          callCount: 1,
          totalTokens: 0,
          successCount: 0,
          failureCount: 1,
          statDate: new Date(today),
        });

        throw new Error("Failed to generate multimodal content");
      }
    }),

  /**
   * 检测内容类型
   */
  detectContentType: publicProcedure
    .input(z.string())
    .query(({ input }) => {
      return {
        contentType: detectContentType(input),
      };
    }),

  /**
   * 选择最优模型
   */
  selectOptimalModel: publicProcedure
    .input(
      z.object({
        contentType: z.enum(["text", "image", "video", "code", "analysis"]),
        userModel: z.string().optional(),
      })
    )
    .query(({ input }) => {
      return {
        model: selectOptimalModel(input.contentType, input.userModel),
      };
    }),
  /**
   * 创建新的对话
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

      await createAIConversation({
        userId: ctx.user.id,
        title: input.title,
        model: input.model,
        messageCount: 0,
      });

      // 获取最新创建的对话
      const conversations = await getAIConversations(ctx.user.id, 1, 0);
      const latestConversation = conversations[0];

      return {
        success: true,
        conversationId: latestConversation?.id,
      };
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

      return await getAIConversations(ctx.user.id, input.limit, input.offset);
    }),

  /**
   * 获取单个对话及其消息
   */
  getConversation: protectedProcedure
    .input(z.number())
    .query(async ({ input: conversationId, ctx }) => {
      if (!ctx.user?.id) {
        throw new Error("User not authenticated");
      }

      const conversation = await getAIConversationById(conversationId);
      if (!conversation || conversation.userId !== ctx.user.id) {
        throw new Error("Conversation not found or unauthorized");
      }

      const messages = await getAIMessages(conversationId);

      return {
        ...conversation,
        messages,
      };
    }),

  /**
   * 发送消息并获取 AI 响应
   */
  sendMessage: protectedProcedure
    .input(
      z.object({
        conversationId: z.number(),
        content: z.string().min(1),
        model: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user?.id) {
        throw new Error("User not authenticated");
      }

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

      try {
        // 调用 LLM API
        const model = input.model || conversation.model || "gpt-4";
        const response = await invokeLLM({
          messages: [
            {
              role: "user",
              content: input.content,
            },
          ],
        });

        let assistantContent = "Unable to generate response";
        const messageContent = response.choices?.[0]?.message?.content;
        if (typeof messageContent === "string") {
          assistantContent = messageContent;
        } else if (Array.isArray(messageContent)) {
          // 处理数组内容
          assistantContent = messageContent
            .map((item: any) => {
              if (item.type === "text") return item.text;
              return "";
            })
            .join("\n");
        }

        // 保存 AI 响应
        await createAIMessage({
          conversationId: input.conversationId,
          role: "assistant",
          content: assistantContent,
          model,
          tokenCount: response.usage?.total_tokens || 0,
        });

        // 更新对话的消息计数
        const messages = await getAIMessages(input.conversationId);
        await updateAIConversation(input.conversationId, {
          messageCount: messages.length,
          model,
        });

        // 记录使用统计
        const today = new Date().toISOString().split("T")[0];
        await createOrUpdateAIUsageStat({
          userId: ctx.user.id,
          model,
          callCount: 1,
          totalTokens: response.usage?.total_tokens || 0,
          successCount: 1,
          failureCount: 0,
          statDate: new Date(today),
        });

        return {
          success: true,
          response: assistantContent,
          model,
          tokenCount: response.usage?.total_tokens || 0,
        };
      } catch (error) {
        console.error("LLM API error:", error);

        // 记录失败统计
        const today = new Date().toISOString().split("T")[0];
        await createOrUpdateAIUsageStat({
          userId: ctx.user.id,
          model: input.model || conversation.model || "gpt-4",
          callCount: 1,
          totalTokens: 0,
          successCount: 0,
          failureCount: 1,
          statDate: new Date(today),
        });

        throw new Error("Failed to get AI response");
      }
    }),

  /**
   * 更新对话标题
   */
  updateConversation: protectedProcedure
    .input(
      z.object({
        conversationId: z.number(),
        title: z.string().min(1).max(300).optional(),
        model: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user?.id) {
        throw new Error("User not authenticated");
      }

      const conversation = await getAIConversationById(input.conversationId);
      if (!conversation || conversation.userId !== ctx.user.id) {
        throw new Error("Conversation not found or unauthorized");
      }

      const updateData: Record<string, any> = {};
      if (input.title) updateData.title = input.title;
      if (input.model) updateData.model = input.model;

      await updateAIConversation(input.conversationId, updateData);

      return { success: true };
    }),

  /**
   * 删除对话
   */
  deleteConversation: protectedProcedure
    .input(z.number())
    .mutation(async ({ input: conversationId, ctx }) => {
      if (!ctx.user?.id) {
        throw new Error("User not authenticated");
      }

      const conversation = await getAIConversationById(conversationId);
      if (!conversation || conversation.userId !== ctx.user.id) {
        throw new Error("Conversation not found or unauthorized");
      }

      // 删除对话中的所有消息
      await deleteAIMessages(conversationId);

      // 删除对话
      await deleteAIConversation(conversationId);

      return { success: true };
    }),

  /**
   * 获取使用统计
   */
  getUsageStats: protectedProcedure
    .input(z.string().optional())
    .query(async ({ input: model, ctx }) => {
      if (!ctx.user?.id) {
        throw new Error("User not authenticated");
      }

      return await getAIUsageStats(ctx.user.id, model || undefined);
    }),
});
