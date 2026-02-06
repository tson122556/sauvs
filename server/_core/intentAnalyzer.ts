/**
 * Intent & Modality Analyzer
 * 在所有模型调用之前判断用户意图和内容模态
 * 输出：TEXT | IMAGE | VIDEO | CODE
 * 
 * 判断优先级：
 * 1. 前端显式模式（contentType）
 * 2. 关键词规则匹配
 * 3. LLM 轻量判断（fallback）
 */

export type ContentModality = "TEXT" | "IMAGE" | "VIDEO" | "CODE";

export interface IntentAnalysisResult {
  modality: ContentModality;
  confidence: "high" | "medium" | "low";
  reason: string;
  keywords?: string[];
}

/**
 * 关键词配置：用于快速判断用户意图
 */
const MODALITY_KEYWORDS = {
  IMAGE: {
    chinese: [
      "生成图片",
      "画一张",
      "画个",
      "绘制",
      "设计图",
      "图像",
      "图片",
      "render",
      "visualize",
      "美丽",
      "风景",
      "场景",
      "角色",
      "头像",
      "海报",
      "插画",
      "漫画",
      "卡通",
      "照片",
      "效果图",
    ],
    english: [
      "generate image",
      "create image",
      "draw",
      "paint",
      "render",
      "visualize",
      "design",
      "picture",
      "illustration",
      "artwork",
      "photo",
      "image generation",
    ],
  },
  VIDEO: {
    chinese: [
      "生成视频",
      "制作视频",
      "视频",
      "动画",
      "动作",
      "场景演示",
      "演示",
      "动画效果",
    ],
    english: [
      "generate video",
      "create video",
      "video generation",
      "animation",
      "animate",
      "motion",
      "video",
    ],
  },
  CODE: {
    chinese: [
      "代码",
      "编写",
      "实现",
      "函数",
      "算法",
      "程序",
      "脚本",
      "写个",
      "怎么写",
      "如何实现",
    ],
    english: [
      "code",
      "write",
      "implement",
      "function",
      "algorithm",
      "program",
      "script",
      "how to write",
      "generate code",
    ],
  },
};

/**
 * 分析用户意图和内容模态
 * @param userMessage 用户输入的消息
 * @param explicitModality 前端显式指定的模态（优先级最高）
 * @returns 意图分析结果
 */
export function analyzeIntent(
  userMessage: string,
  explicitModality?: ContentModality
): IntentAnalysisResult {
  // 优先级 1：前端显式模式
  if (explicitModality) {
    return {
      modality: explicitModality,
      confidence: "high",
      reason: "Explicit modality from frontend",
    };
  }

  const lowerMessage = userMessage.toLowerCase();
  const chineseMessage = userMessage;

  // 优先级 2：关键词规则匹配
  for (const [modality, keywords] of Object.entries(MODALITY_KEYWORDS)) {
    const allKeywords = [
      ...keywords.chinese,
      ...keywords.english,
    ];

    const matchedKeywords = allKeywords.filter((keyword) => {
      if (keyword.length < 2) return false;
      return (
        lowerMessage.includes(keyword.toLowerCase()) ||
        chineseMessage.includes(keyword)
      );
    });

    if (matchedKeywords.length > 0) {
      return {
        modality: modality as ContentModality,
        confidence: matchedKeywords.length >= 2 ? "high" : "medium",
        reason: `Matched keywords: ${matchedKeywords.join(", ")}`,
        keywords: matchedKeywords,
      };
    }
  }

  // 优先级 3：默认为 TEXT
  return {
    modality: "TEXT",
    confidence: "medium",
    reason: "Default to TEXT modality",
  };
}

/**
 * 验证模态是否有效
 */
export function isValidModality(modality: string): modality is ContentModality {
  return ["TEXT", "IMAGE", "VIDEO", "CODE"].includes(modality);
}

/**
 * 获取模态的中文名称
 */
export function getModalityName(modality: ContentModality): string {
  const names: Record<ContentModality, string> = {
    TEXT: "文本",
    IMAGE: "图像",
    VIDEO: "视频",
    CODE: "代码",
  };
  return names[modality];
}
