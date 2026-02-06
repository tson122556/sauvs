/**
 * 模态路由系统
 * 支持 Text / Image / Video 三种模态
 * 根据用户输入和选择自动检测模态，选择对应的模型池和 API 接口
 */

export type Modality = "text" | "image" | "video";

export interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  apiEndpoint: string;
  apiKey: string;
  modalities: Modality[];
  maxTokens?: number;
  costPer1kTokens?: number;
  priority: number; // 优先级，数字越小优先级越高
}

export interface ModalityRouteResult {
  modality: Modality;
  selectedModel: ModelConfig;
  reason: string;
}

/**
 * 文本模型池配置
 */
export const TEXT_MODELS: ModelConfig[] = [
  {
    id: "gpt-4",
    name: "GPT-4",
    provider: "OpenAI",
    apiEndpoint: "https://api.openai.com/v1/chat/completions",
    apiKey: process.env.OPENAI_API_KEY || "",
    modalities: ["text"],
    maxTokens: 8192,
    costPer1kTokens: 0.03,
    priority: 1,
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "OpenAI",
    apiEndpoint: "https://api.openai.com/v1/chat/completions",
    apiKey: process.env.OPENAI_API_KEY || "",
    modalities: ["text"],
    maxTokens: 4096,
    costPer1kTokens: 0.002,
    priority: 2,
  },
  {
    id: "claude-3",
    name: "Claude 3",
    provider: "Anthropic",
    apiEndpoint: "https://api.anthropic.com/v1/messages",
    apiKey: process.env.ANTHROPIC_API_KEY || "",
    modalities: ["text"],
    maxTokens: 4096,
    costPer1kTokens: 0.015,
    priority: 2,
  },
  {
    id: "gemini",
    name: "Gemini",
    provider: "Google",
    apiEndpoint: "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",
    apiKey: process.env.GOOGLE_API_KEY || "",
    modalities: ["text"],
    maxTokens: 2048,
    costPer1kTokens: 0.0005,
    priority: 3,
  },
];

/**
 * 图片生成模型池配置
 */
export const IMAGE_MODELS: ModelConfig[] = [
  {
    id: "dall-e-3",
    name: "DALL-E 3",
    provider: "OpenAI",
    apiEndpoint: "https://api.openai.com/v1/images/generations",
    apiKey: process.env.OPENAI_API_KEY || "",
    modalities: ["image"],
    costPer1kTokens: 0.02, // 每张图片成本
    priority: 1,
  },
  {
    id: "midjourney",
    name: "Midjourney",
    provider: "Midjourney",
    apiEndpoint: "https://api.midjourney.com/v1/imagine",
    apiKey: process.env.MIDJOURNEY_API_KEY || "",
    modalities: ["image"],
    costPer1kTokens: 0.015,
    priority: 2,
  },
  {
    id: "stable-diffusion",
    name: "Stable Diffusion",
    provider: "Stability AI",
    apiEndpoint: "https://api.stability.ai/v1/generate",
    apiKey: process.env.STABILITY_API_KEY || "",
    modalities: ["image"],
    costPer1kTokens: 0.01,
    priority: 3,
  },
];

/**
 * 视频生成模型池配置
 */
export const VIDEO_MODELS: ModelConfig[] = [
  {
    id: "runway-ml",
    name: "Runway ML",
    provider: "Runway",
    apiEndpoint: "https://api.runwayml.com/v1/generate",
    apiKey: process.env.RUNWAY_API_KEY || "",
    modalities: ["video"],
    costPer1kTokens: 0.1, // 每秒视频成本
    priority: 1,
  },
  {
    id: "synthesia",
    name: "Synthesia",
    provider: "Synthesia",
    apiEndpoint: "https://api.synthesia.io/v1/videos",
    apiKey: process.env.SYNTHESIA_API_KEY || "",
    modalities: ["video"],
    costPer1kTokens: 0.05,
    priority: 2,
  },
];

/**
 * 模态检测关键词
 */
const MODALITY_KEYWORDS = {
  image: [
    "生成图片",
    "画图",
    "绘制",
    "create image",
    "generate image",
    "draw",
    "paint",
    "illustration",
    "图像",
    "图片",
    "美丽",
    "风景",
    "风景画",
    "portrait",
    "landscape",
    "artwork",
  ],
  video: [
    "生成视频",
    "制作视频",
    "视频",
    "create video",
    "generate video",
    "make video",
    "video",
    "animation",
  ],
};

/**
 * 检测用户输入的模态
 */
export function detectModality(
  userInput: string,
  explicitContentType?: "text" | "image" | "video"
): Modality {
  // 如果用户显式选择了内容类型，优先使用
  if (explicitContentType) {
    return explicitContentType;
  }

  // 同时检查原始输入和小写版本
  const lowerInput = userInput.toLowerCase();

  // 检测图片相关关键词（需要同时检查原始和小写）
  for (const keyword of MODALITY_KEYWORDS.image) {
    if (lowerInput.includes(keyword.toLowerCase()) || userInput.includes(keyword)) {
      return "image";
    }
  }

  // 检测视频相关关键词
  for (const keyword of MODALITY_KEYWORDS.video) {
    if (lowerInput.includes(keyword.toLowerCase()) || userInput.includes(keyword)) {
      return "video";
    }
  }

  // 默认返回文本
  return "text";
}

/**
 * 根据模态获取对应的模型池
 */
export function getModelPoolForModality(modality: Modality): ModelConfig[] {
  switch (modality) {
    case "image":
      return IMAGE_MODELS;
    case "video":
      return VIDEO_MODELS;
    case "text":
    default:
      return TEXT_MODELS;
  }
}

/**
 * 计算模型的综合评分
 */
export function calculateModelScore(
  model: ModelConfig,
  criteria: {
    complexity?: number; // 0-1，任务复杂度
    speed?: number; // 0-1，需要的速度
    quality?: number; // 0-1，需要的质量
    budget?: number; // 0-1，预算限制
  } = {}
): number {
  const { complexity = 0.5, speed = 0.5, quality = 0.5, budget = 0.5 } = criteria;

  // 基础分数
  let score = 100;

  // 根据优先级调整
  score -= model.priority * 10;

  // 根据复杂度调整
  if (complexity > 0.7) {
    // 复杂任务倾向于高端模型
    score += (model.priority === 1 ? 20 : model.priority === 2 ? 10 : 0);
  }

  // 根据速度需求调整
  if (speed > 0.7) {
    // 需要快速响应，倾向于轻量级模型
    score += (model.priority === 3 ? 20 : model.priority === 2 ? 10 : 0);
  }

  // 根据质量需求调整
  if (quality > 0.7) {
    // 需要高质量，倾向于高端模型
    score += (model.priority === 1 ? 20 : model.priority === 2 ? 10 : 0);
  }

  // 根据预算限制调整
  if (budget < 0.3) {
    // 预算紧张，倾向于低成本模型
    const costScore = model.costPer1kTokens ? 100 / (model.costPer1kTokens * 1000) : 0;
    score += Math.min(costScore, 20);
  }

  return Math.max(0, score);
}

/**
 * 选择最优模型
 */
export function selectOptimalModel(
  modality: Modality,
  criteria?: {
    complexity?: number;
    speed?: number;
    quality?: number;
    budget?: number;
  }
): ModelConfig {
  const modelPool = getModelPoolForModality(modality);

  if (modelPool.length === 0) {
    throw new Error(`No models available for modality: ${modality}`);
  }

  // 计算每个模型的评分
  const scoredModels = modelPool.map((model) => ({
    model,
    score: calculateModelScore(model, criteria),
  }));

  // 按评分排序，选择最高分的模型
  scoredModels.sort((a, b) => b.score - a.score);

  return scoredModels[0].model;
}

/**
 * 执行模态路由
 */
export function routeByModality(
  userInput: string,
  explicitContentType?: "text" | "image" | "video",
  criteria?: {
    complexity?: number;
    speed?: number;
    quality?: number;
    budget?: number;
  }
): ModalityRouteResult {
  // 检测模态
  const modality = detectModality(userInput, explicitContentType);

  // 选择最优模型
  const selectedModel = selectOptimalModel(modality, criteria);

  // 生成路由原因说明
  let reason = `Detected modality: ${modality}. Selected model: ${selectedModel.name}`;
  if (explicitContentType) {
    reason += ` (explicit selection)`;
  }

  return {
    modality,
    selectedModel,
    reason,
  };
}

/**
 * 获取 API 调用参数
 */
export function getAPICallParams(
  modality: Modality,
  model: ModelConfig,
  userInput: string,
  options?: Record<string, any>
) {
  const baseParams = {
    model: model.id,
    apiEndpoint: model.apiEndpoint,
    apiKey: model.apiKey,
  };

  switch (modality) {
    case "text":
      return {
        ...baseParams,
        messages: [{ role: "user", content: userInput }],
        temperature: options?.temperature || 0.7,
        maxTokens: options?.maxTokens || model.maxTokens || 2048,
      };

    case "image":
      return {
        ...baseParams,
        prompt: userInput,
        size: options?.size || "1024x1024",
        quality: options?.quality || "standard",
        n: options?.n || 1,
      };

    case "video":
      return {
        ...baseParams,
        prompt: userInput,
        duration: options?.duration || 5,
        resolution: options?.resolution || "720p",
        fps: options?.fps || 30,
      };

    default:
      return baseParams;
  }
}
