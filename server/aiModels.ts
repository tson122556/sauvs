/**
 * 极紫星专有 AI 模型集成系统
 * 通过智能调度实现多个国内外优秀模型的高效协作
 */

export type TaskType =
  | "general" // 通用对话
  | "coding" // 代码生成和分析
  | "analysis" // 深度分析和研究
  | "creative" // 创意内容生成
  | "chinese" // 中文优化
  | "multilingual" // 多语言处理
  | "image" // 图像处理
  | "academic"; // 学术研究

export type ModelRegion = "international" | "china" | "academic";

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  region: ModelRegion;
  capabilities: TaskType[];
  priority: number; // 1-10，优先级
  maxTokens: number;
  costPerToken: number; // 相对成本
  responseTime: number; // 平均响应时间（毫秒）
  successRate: number; // 成功率（0-1）
  isActive: boolean;
  apiKey?: string;
  endpoint?: string;
}

export interface ModelPerformance {
  modelId: string;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  averageTokensUsed: number;
  totalCost: number;
  lastUpdated: Date;
}

export interface SchedulingStrategy {
  taskType: TaskType;
  primaryModel: string;
  fallbackModels: string[];
  useCache: boolean;
  maxRetries: number;
  timeout: number; // 毫秒
}

/**
 * 极紫星专有模型配置
 * 整合了国际、国内和学术机构的优秀模型
 */
export const JIZIXING_MODELS: Record<string, AIModel> = {
  // 国际模型
  chatgpt: {
    id: "chatgpt",
    name: "ChatGPT",
    provider: "OpenAI",
    region: "international",
    capabilities: ["general", "creative", "analysis", "multilingual"],
    priority: 9,
    maxTokens: 4096,
    costPerToken: 1.0,
    responseTime: 1200,
    successRate: 0.98,
    isActive: true,
  },
  claude: {
    id: "claude",
    name: "Claude",
    provider: "Anthropic",
    region: "international",
    capabilities: ["analysis", "academic", "general"],
    priority: 9,
    maxTokens: 100000,
    costPerToken: 1.2,
    responseTime: 1500,
    successRate: 0.99,
    isActive: true,
  },
  grok: {
    id: "grok",
    name: "Grok",
    provider: "X",
    region: "international",
    capabilities: ["general", "analysis", "multilingual"],
    priority: 7,
    maxTokens: 8192,
    costPerToken: 0.8,
    responseTime: 1000,
    successRate: 0.95,
    isActive: true,
  },
  gemini: {
    id: "gemini",
    name: "Gemini",
    provider: "Google",
    region: "international",
    capabilities: ["general", "image", "multilingual", "analysis"],
    priority: 8,
    maxTokens: 32000,
    costPerToken: 0.9,
    responseTime: 1100,
    successRate: 0.97,
    isActive: true,
  },

  // 国内模型
  kimi: {
    id: "kimi",
    name: "Kimi",
    provider: "月之暗面",
    region: "china",
    capabilities: ["general", "analysis", "chinese"],
    priority: 8,
    maxTokens: 200000,
    costPerToken: 0.7,
    responseTime: 1300,
    successRate: 0.96,
    isActive: true,
  },
  deepseek: {
    id: "deepseek",
    name: "DeepSeek",
    provider: "深度求索",
    region: "china",
    capabilities: ["general", "analysis", "coding", "chinese"],
    priority: 8,
    maxTokens: 64000,
    costPerToken: 0.6,
    responseTime: 1200,
    successRate: 0.96,
    isActive: true,
  },
  qwen: {
    id: "qwen",
    name: "通义千问",
    provider: "阿里巴巴",
    region: "china",
    capabilities: ["general", "multilingual", "chinese", "creative"],
    priority: 8,
    maxTokens: 32000,
    costPerToken: 0.65,
    responseTime: 1100,
    successRate: 0.97,
    isActive: true,
  },
  doubao: {
    id: "doubao",
    name: "豆包",
    provider: "字节跳动",
    region: "china",
    capabilities: ["general", "creative", "chinese", "multilingual"],
    priority: 7,
    maxTokens: 8192,
    costPerToken: 0.6,
    responseTime: 900,
    successRate: 0.95,
    isActive: true,
  },

  // 学术模型
  alpaca: {
    id: "alpaca",
    name: "Alpaca",
    provider: "斯坦福大学",
    region: "academic",
    capabilities: ["general"],
    priority: 6,
    maxTokens: 2048,
    costPerToken: 0.1,
    responseTime: 800,
    successRate: 0.92,
    isActive: true,
  },
  starcoder2: {
    id: "starcoder2",
    name: "StarCoder2",
    provider: "加州大学伯克利分校",
    region: "academic",
    capabilities: ["coding"],
    priority: 9,
    maxTokens: 16384,
    costPerToken: 0.2,
    responseTime: 1000,
    successRate: 0.98,
    isActive: true,
  },
  falcon: {
    id: "falcon",
    name: "Falcon",
    provider: "阿联酋技术创新研究所",
    region: "academic",
    capabilities: ["general", "multilingual"],
    priority: 7,
    maxTokens: 2048,
    costPerToken: 0.15,
    responseTime: 900,
    successRate: 0.94,
    isActive: true,
  },
  chatglm3: {
    id: "chatglm3",
    name: "ChatGLM-3",
    provider: "清华大学 & 智谱 AI",
    region: "academic",
    capabilities: ["general", "chinese", "analysis"],
    priority: 8,
    maxTokens: 32000,
    costPerToken: 0.5,
    responseTime: 1100,
    successRate: 0.97,
    isActive: true,
  },
};

/**
 * 极紫星智能调度策略
 * 根据任务类型自动选择最优模型组合
 */
export const SCHEDULING_STRATEGIES: Record<TaskType, SchedulingStrategy> = {
  general: {
    taskType: "general",
    primaryModel: "chatgpt", // ChatGPT 作为主模型
    fallbackModels: ["claude", "kimi", "qwen"],
    useCache: true,
    maxRetries: 2,
    timeout: 30000,
  },
  coding: {
    taskType: "coding",
    primaryModel: "starcoder2", // StarCoder2 专精代码
    fallbackModels: ["deepseek", "chatgpt", "claude"],
    useCache: true,
    maxRetries: 2,
    timeout: 30000,
  },
  analysis: {
    taskType: "analysis",
    primaryModel: "claude", // Claude 擅长深度分析
    fallbackModels: ["deepseek", "chatgpt", "kimi"],
    useCache: false,
    maxRetries: 2,
    timeout: 45000,
  },
  creative: {
    taskType: "creative",
    primaryModel: "chatgpt", // ChatGPT 创意生成
    fallbackModels: ["qwen", "doubao", "claude"],
    useCache: false,
    maxRetries: 1,
    timeout: 30000,
  },
  chinese: {
    taskType: "chinese",
    primaryModel: "qwen", // 通义千问中文优化
    fallbackModels: ["chatglm3", "kimi", "deepseek"],
    useCache: true,
    maxRetries: 2,
    timeout: 30000,
  },
  multilingual: {
    taskType: "multilingual",
    primaryModel: "gemini", // Gemini 多语言
    fallbackModels: ["chatgpt", "qwen", "falcon"],
    useCache: true,
    maxRetries: 2,
    timeout: 30000,
  },
  image: {
    taskType: "image",
    primaryModel: "gemini", // Gemini 图像处理
    fallbackModels: ["chatgpt"],
    useCache: false,
    maxRetries: 1,
    timeout: 45000,
  },
  academic: {
    taskType: "academic",
    primaryModel: "claude", // Claude 学术研究
    fallbackModels: ["chatglm3", "deepseek", "kimi"],
    useCache: false,
    maxRetries: 2,
    timeout: 45000,
  },
};

/**
 * 获取任务的最优模型
 */
export function getOptimalModel(
  taskType: TaskType,
  userPreference?: string
): AIModel {
  // 如果用户有偏好且该模型可用，使用用户偏好
  if (userPreference && JIZIXING_MODELS[userPreference]?.isActive) {
    return JIZIXING_MODELS[userPreference];
  }

  // 否则使用调度策略中的主模型
  const strategy = SCHEDULING_STRATEGIES[taskType];
  return JIZIXING_MODELS[strategy.primaryModel];
}

/**
 * 获取任务的备用模型列表
 */
export function getFallbackModels(taskType: TaskType): AIModel[] {
  const strategy = SCHEDULING_STRATEGIES[taskType];
  return strategy.fallbackModels
    .map((modelId) => JIZIXING_MODELS[modelId])
    .filter((model) => model.isActive);
}

/**
 * 根据性能指标获取最佳模型
 */
export function getBestModelByPerformance(
  taskType: TaskType,
  performanceData: Record<string, ModelPerformance>
): AIModel {
  const strategy = SCHEDULING_STRATEGIES[taskType];
  const candidateModels = [
    strategy.primaryModel,
    ...strategy.fallbackModels,
  ].filter((id) => JIZIXING_MODELS[id]?.isActive);

  // 计算每个模型的综合评分
  let bestModel = JIZIXING_MODELS[strategy.primaryModel];
  let bestScore = -Infinity;

  for (const modelId of candidateModels) {
    const model = JIZIXING_MODELS[modelId];
    const performance = performanceData[modelId];

    if (!model) continue;

    // 综合评分 = 优先级 * 成功率 / (响应时间 * 相对成本)
    let score = model.priority * model.successRate;
    if (performance) {
      score *= performance.successfulRequests / Math.max(1, performance.totalRequests);
      score /= performance.averageResponseTime / 1000; // 转换为秒
    }

    if (score > bestScore) {
      bestScore = score;
      bestModel = model;
    }
  }

  return bestModel;
}

/**
 * 获取所有活跃模型
 */
export function getActiveModels(): AIModel[] {
  return Object.values(JIZIXING_MODELS).filter((model) => model.isActive);
}

/**
 * 按区域获取模型
 */
export function getModelsByRegion(region: ModelRegion): AIModel[] {
  return Object.values(JIZIXING_MODELS).filter(
    (model) => model.region === region && model.isActive
  );
}

/**
 * 按能力获取模型
 */
export function getModelsByCapability(capability: TaskType): AIModel[] {
  return Object.values(JIZIXING_MODELS).filter(
    (model) => model.capabilities.includes(capability) && model.isActive
  );
}
