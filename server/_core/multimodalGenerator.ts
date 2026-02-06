/**
 * 多模态内容生成管理器
 * 支持文本、图片、视频等多种内容类型的智能生成
 */

import { invokeLLM } from "./llm";
import { generateImage } from "./imageGeneration";
import { generateVideo } from "./videoGeneration";

export type ContentType = "text" | "image" | "video" | "code" | "analysis";

export type MultimodalGenerationRequest = {
  prompt: string;
  contentType?: ContentType;
  model?: string;
  imageOptions?: {
    style?: string;
    quality?: "low" | "medium" | "high";
  };
  videoOptions?: {
    duration?: number;
    resolution?: "720p" | "1080p" | "4k";
    style?: string;
  };
};

export type GeneratedContent = {
  type: ContentType;
  content: string;
  url?: string; // For images and videos
  model?: string;
  metadata?: Record<string, any>;
};

/**
 * 检测内容类型
 */
export function detectContentType(prompt: string): ContentType {
  // 代码生成关键词（优先级最高）
  const codeKeywords = [
    "code",
    "function",
    "class",
    "script",
    "program",
    "algorithm",
    "implement",
    "write",
    "```",
  ];

  // 视频生成关键词（优先级次高）
  const videoKeywords = [
    "video",
    "movie",
    "film",
    "animation",
    "animate",
    "scene",
    "cinematic",
    "footage",
    "sequence",
    "motion",
    "action",
  ];

  // 图片生成关键词
  const imageKeywords = [
    "image",
    "picture",
    "photo",
    "visual",
    "design",
    "draw",
    "illustration",
    "artwork",
    "logo",
    "icon",
    "diagram",
    "chart",
    "infographic",
    "render",
    "3d",
  ];

  // 分析关键词
  const analysisKeywords = [
    "analyze",
    "analysis",
    "explain",
    "understand",
    "research",
    "study",
    "investigate",
    "examine",
    "report",
  ];

  const lowerPrompt = prompt.toLowerCase();

  // 按优先级检测
  if (codeKeywords.some((kw) => lowerPrompt.includes(kw))) {
    return "code";
  }

  if (videoKeywords.some((kw) => lowerPrompt.includes(kw))) {
    return "video";
  }

  if (imageKeywords.some((kw) => lowerPrompt.includes(kw))) {
    return "image";
  }

  if (analysisKeywords.some((kw) => lowerPrompt.includes(kw))) {
    return "analysis";
  }

  return "text";
}

/**
 * 选择最优模型
 */
export function selectOptimalModel(
  contentType: ContentType,
  userModel?: string
): string {
  if (userModel) return userModel;

  const modelMap: Record<ContentType, string> = {
    text: "gpt-4",
    image: "gemini",
    video: "gemini",
    code: "gpt-4",
    analysis: "claude",
  };

  return modelMap[contentType] || "gpt-4";
}

/**
 * 生成多模态内容
 */
export async function generateMultimodalContent(
  request: MultimodalGenerationRequest
): Promise<GeneratedContent> {
  // 检测内容类型
  const contentType = request.contentType || detectContentType(request.prompt);

  // 选择最优模型
  const model = selectOptimalModel(contentType, request.model);

  try {
    switch (contentType) {
      case "image":
        return await generateImageContent(request, model);

      case "video":
        return await generateVideoContent(request, model);

      case "code":
        return await generateCodeContent(request, model);

      case "analysis":
        return await generateAnalysisContent(request, model);

      case "text":
      default:
        return await generateTextContent(request, model);
    }
  } catch (error) {
    console.error(`Failed to generate ${contentType} content:`, error);
    throw error;
  }
}

/**
 * 生成文本内容
 */
async function generateTextContent(
  request: MultimodalGenerationRequest,
  model: string
): Promise<GeneratedContent> {
  const response = await invokeLLM({
    messages: [
      {
        role: "user",
        content: request.prompt,
      },
    ],
  });

  const content =
    typeof response.choices[0]?.message?.content === "string"
      ? response.choices[0].message.content
      : "Unable to generate response";

  return {
    type: "text",
    content,
    model,
    metadata: {
      tokens: response.usage?.total_tokens,
    },
  };
}

/**
 * 生成代码内容
 */
async function generateCodeContent(
  request: MultimodalGenerationRequest,
  model: string
): Promise<GeneratedContent> {
  const systemPrompt =
    "You are an expert programmer. Generate clean, well-documented code with proper error handling. Always include comments explaining the logic.";

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: request.prompt,
      },
    ],
  });

  const content =
    typeof response.choices[0]?.message?.content === "string"
      ? response.choices[0].message.content
      : "Unable to generate code";

  return {
    type: "code",
    content,
    model,
    metadata: {
      tokens: response.usage?.total_tokens,
    },
  };
}

/**
 * 生成分析内容
 */
async function generateAnalysisContent(
  request: MultimodalGenerationRequest,
  model: string
): Promise<GeneratedContent> {
  const systemPrompt =
    "You are an expert analyst. Provide comprehensive, well-structured analysis with clear insights and actionable recommendations.";

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: request.prompt,
      },
    ],
  });

  const content =
    typeof response.choices[0]?.message?.content === "string"
      ? response.choices[0].message.content
      : "Unable to generate analysis";

  return {
    type: "analysis",
    content,
    model,
    metadata: {
      tokens: response.usage?.total_tokens,
    },
  };
}

/**
 * 生成图片内容
 */
async function generateImageContent(
  request: MultimodalGenerationRequest,
  model: string
): Promise<GeneratedContent> {
  // 首先使用 LLM 优化图片提示词
  const optimizationResponse = await invokeLLM({
    messages: [
      {
        role: "system",
        content:
          "You are an expert at creating detailed, vivid image prompts for AI image generation. Enhance the user's description with artistic details, style, lighting, and composition.",
      },
      {
        role: "user",
        content: `Enhance this image prompt: ${request.prompt}`,
      },
    ],
  });

  const enhancedPrompt =
    typeof optimizationResponse.choices[0]?.message?.content === "string"
      ? optimizationResponse.choices[0].message.content
      : request.prompt;

  // 生成图片
  const imageResult = await generateImage({
    prompt: enhancedPrompt,
  });

  return {
    type: "image",
    content: `Generated image for: ${request.prompt}`,
    url: imageResult.url,
    model,
    metadata: {
      originalPrompt: request.prompt,
      enhancedPrompt,
    },
  };
}

/**
 * 生成视频内容
 */
async function generateVideoContent(
  request: MultimodalGenerationRequest,
  model: string
): Promise<GeneratedContent> {
  // 首先使用 LLM 优化视频提示词
  const optimizationResponse = await invokeLLM({
    messages: [
      {
        role: "system",
        content:
          "You are an expert at creating detailed video prompts for AI video generation. Enhance the user's description with cinematography details, pacing, effects, and visual style.",
      },
      {
        role: "user",
        content: `Enhance this video prompt: ${request.prompt}`,
      },
    ],
  });

  const enhancedPrompt =
    typeof optimizationResponse.choices[0]?.message?.content === "string"
      ? optimizationResponse.choices[0].message.content
      : request.prompt;

  // 生成视频
  const videoResult = await generateVideo({
    prompt: enhancedPrompt,
    duration: request.videoOptions?.duration || 5,
    resolution: request.videoOptions?.resolution || "1080p",
    style: request.videoOptions?.style,
  });

  return {
    type: "video",
    content: `Generated video for: ${request.prompt}`,
    url: videoResult.url,
    model,
    metadata: {
      originalPrompt: request.prompt,
      enhancedPrompt,
      duration: videoResult.duration,
      resolution: videoResult.resolution,
    },
  };
}
