/**
 * 模态路由 Chat 路由器
 * 集成模态检测、路由和 API 调用
 */

import { protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import {
  createAIConversation,
  getAIConversationById,
  updateAIConversation,
  createAIMessage,
  getAIMessages,
} from "../db";
import {
  routeByModality,
  getAPICallParams,
  Modality,
} from "../_core/modalityRouter";
import { callModalityAPI } from "../_core/modalityAPICalls";

export const modalityChatRouter = router({
  /**
   * 发送消息并根据模态路由到对应的 API
   */
  sendModalityMessage: protectedProcedure
    .input(
      z.object({
        conversationId: z.number(),
        content: z.string().min(1),
        contentType: z.enum(["text", "image", "video"]).optional(),
        criteria: z.object({
          complexity: z.number().optional(),
          speed: z.number().optional(),
          quality: z.number().optional(),
          budget: z.number().optional(),
        }).optional(),
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

        // 执行模态路由
        const routeResult = routeByModality(
          input.content,
          input.contentType,
          input.criteria
        );

        // 获取 API 调用参数
        const apiParams = getAPICallParams(
          routeResult.modality,
          routeResult.selectedModel,
          input.content
        );

        // 调用对应的 API
        const apiResult = await callModalityAPI(
          routeResult.modality,
          routeResult.selectedModel,
          input.content,
          apiParams
        );

        if (!apiResult.success) {
          throw new Error(apiResult.error || "API call failed");
        }

        // 构建响应内容
        let responseContent = "";
        if (routeResult.modality === "text" && apiResult.content) {
          responseContent = apiResult.content;
        } else if ((routeResult.modality === "image" || routeResult.modality === "video") && apiResult.url) {
          responseContent = `[${routeResult.modality.toUpperCase()}]\n${apiResult.url}`;
        } else {
          responseContent = JSON.stringify(apiResult);
        }

        // 保存 AI 响应
        const messageResult = await createAIMessage({
          conversationId: input.conversationId,
          role: "assistant",
          content: responseContent,
          model: routeResult.selectedModel.id,
          tokenCount: apiResult.tokensUsed || 0,
        });

        // 更新对话信息
        await updateAIConversation(input.conversationId, {
          messageCount: conversation.messageCount + 2,
          updatedAt: new Date(),
        });

        return {
          success: true,
          messageId: messageResult[0].insertId,
          response: responseContent,
          modality: routeResult.modality,
          model: routeResult.selectedModel.name,
          reason: routeResult.reason,
          metadata: apiResult.metadata,
        };
      } catch (error) {
        console.error("Modality message error:", error);
        throw error;
      }
    }),

  /**
   * 获取模态路由信息（用于调试和分析）
   */
  getModalityRoute: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1),
        contentType: z.enum(["text", "image", "video"]).optional(),
        criteria: z.object({
          complexity: z.number().optional(),
          speed: z.number().optional(),
          quality: z.number().optional(),
          budget: z.number().optional(),
        }).optional(),
      })
    )
    .query(({ input }) => {
      try {
        const routeResult = routeByModality(
          input.content,
          input.contentType,
          input.criteria
        );

        return {
          success: true,
          modality: routeResult.modality,
          model: {
            id: routeResult.selectedModel.id,
            name: routeResult.selectedModel.name,
            provider: routeResult.selectedModel.provider,
            priority: routeResult.selectedModel.priority,
          },
          reason: routeResult.reason,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * 获取所有可用的模型
   */
  getAvailableModels: protectedProcedure
    .input(
      z.object({
        modality: z.enum(["text", "image", "video"]).optional(),
      })
    )
    .query(({ input }) => {
      try {
        const { TEXT_MODELS, IMAGE_MODELS, VIDEO_MODELS } = require("../_core/modalityRouter");

        let models = [];
        if (input.modality === "text") {
          models = TEXT_MODELS;
        } else if (input.modality === "image") {
          models = IMAGE_MODELS;
        } else if (input.modality === "video") {
          models = VIDEO_MODELS;
        } else {
          models = [...TEXT_MODELS, ...IMAGE_MODELS, ...VIDEO_MODELS];
        }

        return {
          success: true,
          models: models.map((m: any) => ({
            id: m.id,
            name: m.name,
            provider: m.provider,
            modalities: m.modalities,
            priority: m.priority,
            costPer1kTokens: m.costPer1kTokens,
          })),
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * 测试模态路由
   */
  testModalityRoute: protectedProcedure
    .input(
      z.object({
        testCases: z.array(
          z.object({
            content: z.string(),
            expectedModality: z.enum(["text", "image", "video"]),
          })
        ),
      })
    )
    .query(({ input }) => {
      try {
        const results = input.testCases.map((testCase) => {
          const routeResult = routeByModality(testCase.content);
          return {
            content: testCase.content,
            expectedModality: testCase.expectedModality,
            detectedModality: routeResult.modality,
            passed: routeResult.modality === testCase.expectedModality,
            selectedModel: routeResult.selectedModel.name,
          };
        });

        const passedCount = results.filter((r) => r.passed).length;
        const totalCount = results.length;

        return {
          success: true,
          results,
          summary: {
            total: totalCount,
            passed: passedCount,
            failed: totalCount - passedCount,
            passRate: ((passedCount / totalCount) * 100).toFixed(2) + "%",
          },
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),
});
