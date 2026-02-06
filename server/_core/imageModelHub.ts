/**
 * Image Model Hub
 * IMAGE 模态下的独立模型池
 * 包含多个图像生成模型，根据质量、成本、延迟、可用性进行选择
 */

export interface ImageModel {
  id: string;
  name: string;
  provider: string;
  quality: "high" | "medium" | "low"; // 生成质量
  cost: number; // 相对成本（1-10）
  latency: number; // 平均延迟（毫秒）
  availability: "available" | "limited" | "unavailable";
  maxResolution: string;
  supportedStyles: string[];
}

/**
 * 图像模型池配置
 */
export const IMAGE_MODEL_POOL: Record<string, ImageModel> = {
  DALL_E_3: {
    id: "dall-e-3",
    name: "DALL-E 3",
    provider: "OpenAI",
    quality: "high",
    cost: 8,
    latency: 3000,
    availability: "available",
    maxResolution: "1024x1024",
    supportedStyles: [
      "realistic",
      "artistic",
      "cartoon",
      "abstract",
      "photorealistic",
    ],
  },
  SDXL: {
    id: "sdxl",
    name: "Stable Diffusion XL",
    provider: "Stability AI",
    quality: "high",
    cost: 3,
    latency: 5000,
    availability: "available",
    maxResolution: "1024x1024",
    supportedStyles: [
      "realistic",
      "artistic",
      "anime",
      "3d",
      "illustration",
    ],
  },
  MIDJOURNEY: {
    id: "midjourney",
    name: "Midjourney",
    provider: "Midjourney",
    quality: "high",
    cost: 6,
    latency: 8000,
    availability: "limited",
    maxResolution: "2048x2048",
    supportedStyles: [
      "artistic",
      "photorealistic",
      "3d",
      "illustration",
      "concept-art",
    ],
  },
  FLUX: {
    id: "flux",
    name: "Flux",
    provider: "Black Forest Labs",
    quality: "high",
    cost: 4,
    latency: 4000,
    availability: "available",
    maxResolution: "1024x1024",
    supportedStyles: [
      "photorealistic",
      "artistic",
      "illustration",
      "abstract",
    ],
  },
  DEEPDREAM: {
    id: "deepdream",
    name: "DeepDream",
    provider: "Google",
    quality: "medium",
    cost: 2,
    latency: 2000,
    availability: "available",
    maxResolution: "512x512",
    supportedStyles: ["surreal", "abstract", "artistic"],
  },
};

/**
 * 模型选择策略
 */
export type SelectionStrategy =
  | "quality-first" // 优先质量
  | "cost-first" // 优先成本
  | "speed-first" // 优先速度
  | "balanced"; // 平衡

/**
 * 根据策略选择最优模型
 */
export function selectImageModel(
  strategy: SelectionStrategy = "balanced"
): ImageModel {
  const availableModels = Object.values(IMAGE_MODEL_POOL).filter(
    (m) => m.availability === "available"
  );

  if (availableModels.length === 0) {
    throw new Error("No available image models");
  }

  switch (strategy) {
    case "quality-first":
      return availableModels.sort((a, b) => {
        const qualityScore = { high: 3, medium: 2, low: 1 };
        return (
          qualityScore[b.quality] - qualityScore[a.quality] ||
          a.cost - b.cost
        );
      })[0];

    case "cost-first":
      return availableModels.sort((a, b) => a.cost - b.cost)[0];

    case "speed-first":
      return availableModels.sort((a, b) => a.latency - b.latency)[0];

    case "balanced":
    default:
      // 综合评分：质量权重 40%，成本权重 30%，速度权重 30%
      return availableModels.sort((a, b) => {
        const qualityScore = { high: 3, medium: 2, low: 1 };
        const aScore =
          qualityScore[a.quality] * 0.4 -
          (a.cost / 10) * 0.3 -
          (a.latency / 10000) * 0.3;
        const bScore =
          qualityScore[b.quality] * 0.4 -
          (b.cost / 10) * 0.3 -
          (b.latency / 10000) * 0.3;
        return bScore - aScore;
      })[0];
  }
}

/**
 * 获取模型信息
 */
export function getImageModel(modelId: string): ImageModel | null {
  const model = Object.values(IMAGE_MODEL_POOL).find((m) => m.id === modelId);
  return model || null;
}

/**
 * 获取所有可用模型
 */
export function getAvailableImageModels(): ImageModel[] {
  return Object.values(IMAGE_MODEL_POOL).filter(
    (m) => m.availability === "available"
  );
}

/**
 * 根据风格推荐模型
 */
export function recommendModelByStyle(style: string): ImageModel {
  const matchingModels = Object.values(IMAGE_MODEL_POOL)
    .filter((m) => m.availability === "available")
    .filter((m) => m.supportedStyles.includes(style.toLowerCase()));

  if (matchingModels.length === 0) {
    return selectImageModel("balanced");
  }

  // 返回质量最高的匹配模型
  return matchingModels.sort((a, b) => {
    const qualityScore = { high: 3, medium: 2, low: 1 };
    return qualityScore[b.quality] - qualityScore[a.quality];
  })[0];
}

/**
 * 获取模型的性能指标
 */
export function getModelMetrics(modelId: string) {
  const model = getImageModel(modelId);
  if (!model) return null;

  return {
    model: model.name,
    quality: model.quality,
    cost: `$${model.cost}`,
    latency: `${model.latency}ms`,
    availability: model.availability,
    maxResolution: model.maxResolution,
  };
}
