/**
 * 极紫星专有 AI 模型 tRPC 路由器
 * 提供统一的 AI 对话接口，自动调度到最优模型
 */

import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import {
  JIZIXING_MODELS,
  TaskType,
  getOptimalModel,
  getFallbackModels,
  getActiveModels,
  getModelsByRegion,
  getModelsByCapability,
} from "../aiModels";
import {
  globalScheduler,
  SchedulingRequest,
  SchedulingResult,
} from "../modelScheduler";

export const jizixingAIRouter = router({
  /**
   * 获取所有可用的 AI 模型
   */
  getAllModels: publicProcedure.query(() => {
    return getActiveModels().map((model) => ({
      id: model.id,
      name: model.name,
      provider: model.provider,
      region: model.region,
      capabilities: model.capabilities,
      priority: model.priority,
      responseTime: model.responseTime,
      successRate: model.successRate,
    }));
  }),

  /**
   * 按区域获取模型
   */
  getModelsByRegion: publicProcedure
    .input(z.enum(["international", "china", "academic"]))
    .query(({ input }) => {
      return getModelsByRegion(input).map((model) => ({
        id: model.id,
        name: model.name,
        provider: model.provider,
        region: model.region,
        capabilities: model.capabilities,
      }));
    }),

  /**
   * 按能力获取模型
   */
  getModelsByCapability: publicProcedure
    .input(
      z.enum([
        "general",
        "coding",
        "analysis",
        "creative",
        "chinese",
        "multilingual",
        "image",
        "academic",
      ])
    )
    .query(({ input }) => {
      return getModelsByCapability(input as TaskType).map((model) => ({
        id: model.id,
        name: model.name,
        provider: model.provider,
        capabilities: model.capabilities,
      }));
    }),

  /**
   * 调度请求到最优模型
   */
  scheduleRequest: publicProcedure
    .input(
      z.object({
        taskType: z.enum([
          "general",
          "coding",
          "analysis",
          "creative",
          "chinese",
          "multilingual",
          "image",
          "academic",
        ]),
        prompt: z.string().min(1),
        userPreference: z.string().optional(),
        priority: z.enum(["low", "normal", "high"]).optional(),
      })
    )
    .query(({ input }) => {
      const request: SchedulingRequest = {
        taskType: input.taskType as TaskType,
        prompt: input.prompt,
        userPreference: input.userPreference,
        priority: input.priority || "normal",
      };

      const result = globalScheduler.scheduleRequest(request);

      return {
        selectedModel: {
          id: result.selectedModel.id,
          name: result.selectedModel.name,
          provider: result.selectedModel.provider,
          region: result.selectedModel.region,
        },
        fallbackModels: result.fallbackModels.map((m) => ({
          id: m.id,
          name: m.name,
          provider: m.provider,
        })),
        strategy: result.strategy,
        estimatedCost: result.estimatedCost,
        estimatedTime: result.estimatedTime,
      };
    }),

  /**
   * 获取模型性能统计
   */
  getPerformanceStats: publicProcedure
    .input(z.string().optional())
    .query(({ input }) => {
      const stats = globalScheduler.getPerformanceStats(input);
      return Object.entries(stats).map(([modelId, perf]) => ({
        modelId,
        totalRequests: perf.totalRequests,
        successfulRequests: perf.successfulRequests,
        failedRequests: perf.failedRequests,
        averageResponseTime: Math.round(perf.averageResponseTime),
        averageTokensUsed: Math.round(perf.averageTokensUsed),
        totalCost: perf.totalCost.toFixed(2),
        successRate: (
          (perf.successfulRequests / Math.max(1, perf.totalRequests)) *
          100
        ).toFixed(2),
      }));
    }),

  /**
   * 获取模型负载
   */
  getModelLoad: publicProcedure.input(z.string().optional()).query(({ input }) => {
    const loads = globalScheduler.getModelLoad(input);
    return Object.entries(loads).map(([modelId, load]) => ({
      modelId,
      currentLoad: load,
      model: JIZIXING_MODELS[modelId],
    }));
  }),

  /**
   * 获取调度统计
   */
  getSchedulingStats: publicProcedure.query(() => {
    const stats = globalScheduler.getSchedulingStats();
    return {
      totalRequests: stats.totalRequests,
      activeRequests: stats.activeRequests,
      modelDistribution: stats.modelDistribution,
      averageResponseTime: Math.round(stats.averageResponseTime),
      successRate: (stats.successRate * 100).toFixed(2),
    };
  }),

  /**
   * 获取模型详情
   */
  getModelDetails: publicProcedure.input(z.string()).query(({ input }) => {
    const model = JIZIXING_MODELS[input];
    if (!model) {
      throw new Error(`Model not found: ${input}`);
    }

    const perf = globalScheduler.getPerformanceStats(input)[input];
    const load = globalScheduler.getModelLoad(input)[input] || 0;

    return {
      ...model,
      currentLoad: load,
      performance: perf
        ? {
            totalRequests: perf.totalRequests,
            successRate: (
              (perf.successfulRequests / Math.max(1, perf.totalRequests)) *
              100
            ).toFixed(2),
            averageResponseTime: Math.round(perf.averageResponseTime),
          }
        : null,
    };
  }),

  /**
   * 清空缓存
   */
  clearCache: publicProcedure.mutation(() => {
    globalScheduler.clearCache();
    return { success: true, message: "Cache cleared successfully" };
  }),

  /**
   * 设置缓存启用状态
   */
  setCacheEnabled: publicProcedure
    .input(z.boolean())
    .mutation(({ input }) => {
      globalScheduler.setCacheEnabled(input);
      return {
        success: true,
        message: `Cache ${input ? "enabled" : "disabled"}`,
      };
    }),

  /**
   * 获取推荐模型
   */
  getRecommendedModel: publicProcedure
    .input(
      z.object({
        taskType: z.enum([
          "general",
          "coding",
          "analysis",
          "creative",
          "chinese",
          "multilingual",
          "image",
          "academic",
        ]),
        userPreference: z.string().optional(),
      })
    )
    .query(({ input }) => {
      const model = getOptimalModel(
        input.taskType as TaskType,
        input.userPreference
      );

      return {
        id: model.id,
        name: model.name,
        provider: model.provider,
        region: model.region,
        capabilities: model.capabilities,
        priority: model.priority,
        maxTokens: model.maxTokens,
        responseTime: model.responseTime,
        successRate: model.successRate,
        reason: `Recommended for ${input.taskType} tasks`,
      };
    }),

  /**
   * 获取备用模型
   */
  getFallbackModels: publicProcedure
    .input(
      z.enum([
        "general",
        "coding",
        "analysis",
        "creative",
        "chinese",
        "multilingual",
        "image",
        "academic",
      ])
    )
    .query(({ input }) => {
      const models = getFallbackModels(input as TaskType);
      return models.map((model) => ({
        id: model.id,
        name: model.name,
        provider: model.provider,
        region: model.region,
        priority: model.priority,
      }));
    }),
});
