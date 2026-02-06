/**
 * UVS AI 模型调度引擎
 * 实现智能路由、负载均衡和故障转移
 */

import {
  UVS_MODELS,
  SCHEDULING_STRATEGIES,
  TaskType,
  AIModel,
  ModelPerformance,
  getOptimalModel,
  getFallbackModels,
  getBestModelByPerformance,
} from "./aiModels";

export interface SchedulingRequest {
  taskType: TaskType;
  prompt: string;
  userPreference?: string;
  maxRetries?: number;
  timeout?: number;
  priority?: "low" | "normal" | "high";
}

export interface SchedulingResult {
  selectedModel: AIModel;
  fallbackModels: AIModel[];
  strategy: string;
  estimatedCost: number;
  estimatedTime: number;
}

export interface RequestMetrics {
  requestId: string;
  taskType: TaskType;
  selectedModel: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  tokensUsed?: number;
  cost?: number;
  success: boolean;
  error?: string;
  retryCount: number;
  finalModel?: string;
}

/**
 * UVS AI 调度器
 * 管理模型选择、负载均衡和性能监控
 */
export class UVSScheduler {
  private performanceData: Map<string, ModelPerformance> = new Map();
  private requestQueue: SchedulingRequest[] = [];
  private activeRequests: Map<string, RequestMetrics> = new Map();
  private modelLoadMap: Map<string, number> = new Map();
  private cacheEnabled: boolean = true;
  private responseCache: Map<string, string> = new Map();

  constructor() {
    this.initializePerformanceData();
    this.initializeModelLoad();
  }

  /**
   * 初始化性能数据
   */
  private initializePerformanceData(): void {
    Object.values(UVS_MODELS).forEach((model) => {
      this.performanceData.set(model.id, {
        modelId: model.id,
        totalRequests: 0,
        successfulRequests: 0,
        failedRequests: 0,
        averageResponseTime: model.responseTime,
        averageTokensUsed: 0,
        totalCost: 0,
        lastUpdated: new Date(),
      });
    });
  }

  /**
   * 初始化模型负载
   */
  private initializeModelLoad(): void {
    Object.keys(UVS_MODELS).forEach((modelId) => {
      this.modelLoadMap.set(modelId, 0);
    });
  }

  /**
   * 调度请求到最优模型
   */
  public scheduleRequest(request: SchedulingRequest): SchedulingResult {
    const strategy = SCHEDULING_STRATEGIES[request.taskType];

    // 获取最优模型
    let selectedModel: AIModel;

    // 1. 如果用户有偏好，优先使用用户偏好
    if (request.userPreference) {
      const preferredModel = UVS_MODELS[request.userPreference];
      if (preferredModel?.isActive) {
        selectedModel = preferredModel;
      } else {
        selectedModel = this.selectModelByLoadBalancing(request.taskType);
      }
    } else {
      // 2. 根据性能数据和负载均衡选择模型
      selectedModel = this.selectModelByLoadBalancing(request.taskType);
    }

    // 获取备用模型
    const fallbackModels = getFallbackModels(request.taskType);

    // 计算估计成本和时间
    const estimatedCost = selectedModel.costPerToken * 1000; // 假设 1000 tokens
    const estimatedTime = selectedModel.responseTime;

    // 更新模型负载
    this.updateModelLoad(selectedModel.id, 1);

    return {
      selectedModel,
      fallbackModels,
      strategy: `${request.taskType}_${selectedModel.id}`,
      estimatedCost,
      estimatedTime,
    };
  }

  /**
   * 基于负载均衡选择模型
   */
  private selectModelByLoadBalancing(taskType: TaskType): AIModel {
    const strategy = SCHEDULING_STRATEGIES[taskType];
    const candidateModels = [
      strategy.primaryModel,
      ...strategy.fallbackModels,
    ]
      .map((id) => UVS_MODELS[id])
      .filter((model) => model?.isActive);

    if (candidateModels.length === 0) {
      throw new Error(`No active models available for task type: ${taskType}`);
    }

    // 计算每个模型的综合评分（考虑性能和负载）
    let bestModel = candidateModels[0];
    let bestScore = -Infinity;

    for (const model of candidateModels) {
      const performance = this.performanceData.get(model.id)!;
      const currentLoad = this.modelLoadMap.get(model.id) || 0;

      // 综合评分 = 优先级 * 成功率 / (响应时间 * 相对成本 * 当前负载)
      let score = model.priority * model.successRate;
      score /= (model.responseTime / 1000) * model.costPerToken * (1 + currentLoad);

      // 考虑历史性能
      if (performance.totalRequests > 0) {
        const successRate =
          performance.successfulRequests / performance.totalRequests;
        score *= successRate;
        score /= performance.averageResponseTime / 1000;
      }

      if (score > bestScore) {
        bestScore = score;
        bestModel = model;
      }
    }

    return bestModel;
  }

  /**
   * 记录请求指标
   */
  public recordMetrics(
    requestId: string,
    metrics: Partial<RequestMetrics>
  ): void {
    const existing = this.activeRequests.get(requestId);
    if (existing) {
      Object.assign(existing, metrics);

      // 如果请求完成，更新性能数据
      if (metrics.success !== undefined && existing.finalModel) {
        this.updatePerformanceData(existing);
        this.activeRequests.delete(requestId);
      }
    }
  }

  /**
   * 更新性能数据
   */
  private updatePerformanceData(metrics: RequestMetrics): void {
    const performance = this.performanceData.get(metrics.finalModel!);
    if (!performance) return;

    performance.totalRequests++;
    if (metrics.success) {
      performance.successfulRequests++;
    } else {
      performance.failedRequests++;
    }

    if (metrics.duration) {
      performance.averageResponseTime =
        (performance.averageResponseTime * (performance.totalRequests - 1) +
          metrics.duration) /
        performance.totalRequests;
    }

    if (metrics.tokensUsed) {
      performance.averageTokensUsed =
        (performance.averageTokensUsed * (performance.totalRequests - 1) +
          metrics.tokensUsed) /
        performance.totalRequests;
    }

    if (metrics.cost) {
      performance.totalCost += metrics.cost;
    }

    performance.lastUpdated = new Date();
  }

  /**
   * 更新模型负载
   */
  private updateModelLoad(modelId: string, delta: number): void {
    const currentLoad = this.modelLoadMap.get(modelId) || 0;
    this.modelLoadMap.set(modelId, Math.max(0, currentLoad + delta));
  }

  /**
   * 获取模型性能统计
   */
  public getPerformanceStats(modelId?: string): Record<string, ModelPerformance> {
    if (modelId) {
      const stats: Record<string, ModelPerformance> = {};
      const perf = this.performanceData.get(modelId);
      if (perf) {
        stats[modelId] = perf;
      }
      return stats;
    }

    const stats: Record<string, ModelPerformance> = {};
    this.performanceData.forEach((perf, modelId) => {
      stats[modelId] = perf;
    });
    return stats;
  }

  /**
   * 获取模型负载
   */
  public getModelLoad(modelId?: string): Record<string, number> {
    if (modelId) {
      return { [modelId]: this.modelLoadMap.get(modelId) || 0 };
    }

    const loads: Record<string, number> = {};
    this.modelLoadMap.forEach((load, modelId) => {
      loads[modelId] = load;
    });
    return loads;
  }

  /**
   * 缓存响应
   */
  public cacheResponse(prompt: string, response: string): void {
    if (this.cacheEnabled) {
      const cacheKey = this.generateCacheKey(prompt);
      this.responseCache.set(cacheKey, response);
    }
  }

  /**
   * 获取缓存响应
   */
  public getCachedResponse(prompt: string): string | undefined {
    if (this.cacheEnabled) {
      const cacheKey = this.generateCacheKey(prompt);
      return this.responseCache.get(cacheKey);
    }
    return undefined;
  }

  /**
   * 生成缓存键
   */
  private generateCacheKey(prompt: string): string {
    // 简单的哈希函数
    let hash = 0;
    for (let i = 0; i < prompt.length; i++) {
      const char = prompt.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // 转换为 32 位整数
    }
    return `cache_${Math.abs(hash)}`;
  }

  /**
   * 清空缓存
   */
  public clearCache(): void {
    this.responseCache.clear();
  }

  /**
   * 设置缓存启用状态
   */
  public setCacheEnabled(enabled: boolean): void {
    this.cacheEnabled = enabled;
  }

  /**
   * 获取调度统计
   */
  public getSchedulingStats(): {
    totalRequests: number;
    activeRequests: number;
    modelDistribution: Record<string, number>;
    averageResponseTime: number;
    successRate: number;
  } {
    const stats = this.getPerformanceStats();
    let totalRequests = 0;
    let totalSuccessful = 0;
    let totalResponseTime = 0;
    const modelDistribution: Record<string, number> = {};

    Object.entries(stats).forEach(([modelId, perf]) => {
      totalRequests += perf.totalRequests;
      totalSuccessful += perf.successfulRequests;
      totalResponseTime += perf.averageResponseTime * perf.totalRequests;
      modelDistribution[modelId] = perf.totalRequests;
    });

    return {
      totalRequests,
      activeRequests: this.activeRequests.size,
      modelDistribution,
      averageResponseTime:
        totalRequests > 0 ? totalResponseTime / totalRequests : 0,
      successRate: totalRequests > 0 ? totalSuccessful / totalRequests : 0,
    };
  }
}

// 创建全局调度器实例
export const globalScheduler = new UVSScheduler();
