/**
 * Capability Router
 * 根据内容模态，强制路由到不同的能力链路
 * 
 * 核心原则：
 * - IMAGE 模态 ≠ 文本模型理解画图
 * - IMAGE 模态 = 强制调用图像生成链路
 * - UI 模态与后端能力 一一对应
 */

import { ContentModality } from "./intentAnalyzer";
import { generateImage } from "./imageGeneration";
import { generateVideo } from "./videoGeneration";
import { invokeLLM } from "./llm";

export interface CapabilityRequest {
  modality: ContentModality;
  prompt: string;
  userId: string;
  conversationId: string;
  selectedModel?: string;
}

export interface CapabilityResponse {
  type: ContentModality;
  data: {
    content?: string; // 文本内容
    url?: string; // 图片/视频 URL
    model: string; // 使用的模型
    prompt: string; // 原始提示词
    timestamp: number;
  };
  metadata?: {
    processingTime: number;
    confidence?: number;
  };
}

/**
 * 能力路由主函数
 * 根据模态强制路由到对应的能力链路
 */
export async function routeCapability(
  request: CapabilityRequest
): Promise<CapabilityResponse> {
  const startTime = Date.now();

  try {
    switch (request.modality) {
      case "IMAGE":
        return await handleImageGeneration(request);

      case "VIDEO":
        return await handleVideoGeneration(request);

      case "CODE":
        return await handleCodeGeneration(request);

      case "TEXT":
      default:
        return await handleTextGeneration(request);
    }
  } catch (error) {
    const processingTime = Date.now() - startTime;
    throw {
      error: `Failed to process ${request.modality} capability`,
      details: error,
      processingTime,
    };
  }
}

/**
 * 文本生成能力链路
 * 调用 LLM 服务
 */
async function handleTextGeneration(
  request: CapabilityRequest
): Promise<CapabilityResponse> {
  const startTime = Date.now();

  // 调用 LLM 服务
  const response = await invokeLLM({
    messages: [
      {
        role: "user",
        content: request.prompt,
      },
    ],
  });

  const messageContent = response.choices[0]?.message?.content;
  const content =
    typeof messageContent === "string"
      ? messageContent
      : "No response generated";

  return {
    type: "TEXT",
    data: {
      content,
      model: request.selectedModel || "gpt-4",
      prompt: request.prompt,
      timestamp: Date.now(),
    },
    metadata: {
      processingTime: Date.now() - startTime,
    },
  };
}

/**
 * 图像生成能力链路
 * 调用图像生成服务
 * ⚠️ 禁止调用 chat/completions
 */
async function handleImageGeneration(
  request: CapabilityRequest
): Promise<CapabilityResponse> {
  const startTime = Date.now();

  // 强制调用图像生成服务，不走文本模型
  const result = await generateImage({
    prompt: request.prompt,
  });

  if (!result?.url) {
    throw new Error("Image generation failed: no URL returned");
  }

  return {
    type: "IMAGE",
    data: {
      url: result.url,
      model: request.selectedModel || "DALL-E-3",
      prompt: request.prompt,
      timestamp: Date.now(),
    },
    metadata: {
      processingTime: Date.now() - startTime,
    },
  };
}

/**
 * 视频生成能力链路
 * 调用视频生成服务
 * ⚠️ 禁止调用 chat/completions
 */
async function handleVideoGeneration(
  request: CapabilityRequest
): Promise<CapabilityResponse> {
  const startTime = Date.now();

  // 强制调用视频生成服务，不走文本模型
  const result = await generateVideo({
    prompt: request.prompt,
  });

  if (!result?.url) {
    throw new Error("Video generation failed: no URL returned");
  }

  return {
    type: "VIDEO",
    data: {
      url: result.url,
      model: request.selectedModel || "Runway",
      prompt: request.prompt,
      timestamp: Date.now(),
    },
    metadata: {
      processingTime: Date.now() - startTime,
    },
  };
}

/**
 * 代码生成能力链路
 * 调用代码特化模型
 */
async function handleCodeGeneration(
  request: CapabilityRequest
): Promise<CapabilityResponse> {
  const startTime = Date.now();

  // 使用代码特化提示词
  const codePrompt = `You are an expert code generator. Generate clean, well-documented code based on the following request:\n\n${request.prompt}`;

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content:
          "You are an expert code generator. Always provide complete, working code with comments.",
      },
      {
        role: "user",
        content: codePrompt,
      },
    ],
  });

  const messageContent = response.choices[0]?.message?.content;
  const content =
    typeof messageContent === "string"
      ? messageContent
      : "No code generated";

  return {
    type: "CODE",
    data: {
      content,
      model: request.selectedModel || "gpt-4",
      prompt: request.prompt,
      timestamp: Date.now(),
    },
    metadata: {
      processingTime: Date.now() - startTime,
    },
  };
}

/**
 * 获取能力路由的描述
 */
export function getCapabilityDescription(modality: ContentModality): string {
  const descriptions: Record<ContentModality, string> = {
    TEXT: "文本生成 - 调用 LLM 服务",
    IMAGE: "图像生成 - 调用专业图像生成服务",
    VIDEO: "视频生成 - 调用视频生成服务",
    CODE: "代码生成 - 调用代码特化模型",
  };
  return descriptions[modality];
}
