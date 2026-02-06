/**
 * Unified Response Schema
 * 所有能力链路的统一返回格式
 * 前端只需根据 type 字段进行渲染
 */

import { ContentModality } from "./intentAnalyzer";

/**
 * 文本内容响应
 */
export interface TextResponse {
  type: "TEXT";
  data: {
    content: string;
    model: string;
    prompt: string;
    timestamp: number;
  };
  metadata?: {
    processingTime: number;
    confidence?: number;
    tokensUsed?: number;
  };
}

/**
 * 图像内容响应
 */
export interface ImageResponse {
  type: "IMAGE";
  data: {
    url: string;
    model: string;
    prompt: string;
    timestamp: number;
    resolution?: string;
    style?: string;
  };
  metadata?: {
    processingTime: number;
    confidence?: number;
    seed?: number;
    quality?: "high" | "medium" | "low";
  };
}

/**
 * 视频内容响应
 */
export interface VideoResponse {
  type: "VIDEO";
  data: {
    url: string;
    model: string;
    prompt: string;
    timestamp: number;
    duration?: number;
    resolution?: string;
  };
  metadata?: {
    processingTime: number;
    confidence?: number;
    frameRate?: number;
  };
}

/**
 * 代码内容响应
 */
export interface CodeResponse {
  type: "CODE";
  data: {
    content: string;
    model: string;
    prompt: string;
    timestamp: number;
    language?: string;
  };
  metadata?: {
    processingTime: number;
    confidence?: number;
    linesOfCode?: number;
  };
}

/**
 * 统一响应类型
 */
export type UnifiedResponse =
  | TextResponse
  | ImageResponse
  | VideoResponse
  | CodeResponse;

/**
 * 错误响应
 */
export interface ErrorResponse {
  error: true;
  code: string;
  message: string;
  details?: unknown;
  timestamp: number;
}

/**
 * 创建文本响应
 */
export function createTextResponse(
  content: string,
  model: string,
  prompt: string,
  metadata?: TextResponse["metadata"]
): TextResponse {
  return {
    type: "TEXT",
    data: {
      content,
      model,
      prompt,
      timestamp: Date.now(),
    },
    metadata,
  };
}

/**
 * 创建图像响应
 */
export function createImageResponse(
  url: string,
  model: string,
  prompt: string,
  metadata?: ImageResponse["metadata"]
): ImageResponse {
  return {
    type: "IMAGE",
    data: {
      url,
      model,
      prompt,
      timestamp: Date.now(),
    },
    metadata,
  };
}

/**
 * 创建视频响应
 */
export function createVideoResponse(
  url: string,
  model: string,
  prompt: string,
  metadata?: VideoResponse["metadata"]
): VideoResponse {
  return {
    type: "VIDEO",
    data: {
      url,
      model,
      prompt,
      timestamp: Date.now(),
    },
    metadata,
  };
}

/**
 * 创建代码响应
 */
export function createCodeResponse(
  content: string,
  model: string,
  prompt: string,
  metadata?: CodeResponse["metadata"]
): CodeResponse {
  return {
    type: "CODE",
    data: {
      content,
      model,
      prompt,
      timestamp: Date.now(),
    },
    metadata,
  };
}

/**
 * 创建错误响应
 */
export function createErrorResponse(
  code: string,
  message: string,
  details?: unknown
): ErrorResponse {
  return {
    error: true,
    code,
    message,
    details,
    timestamp: Date.now(),
  };
}

/**
 * 验证响应是否为错误响应
 */
export function isErrorResponse(response: unknown): response is ErrorResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "error" in response &&
    (response as any).error === true
  );
}

/**
 * 验证响应是否为特定类型
 */
export function isResponseType<T extends ContentModality>(
  response: unknown,
  type: T
): response is Extract<UnifiedResponse, { type: T }> {
  return (
    typeof response === "object" &&
    response !== null &&
    "type" in response &&
    (response as any).type === type
  );
}

/**
 * 获取响应的显示文本
 */
export function getResponseDisplayText(response: UnifiedResponse): string {
  switch (response.type) {
    case "TEXT":
      return response.data.content;
    case "IMAGE":
      return `[Image: ${response.data.model}] ${response.data.prompt}`;
    case "VIDEO":
      return `[Video: ${response.data.model}] ${response.data.prompt}`;
    case "CODE":
      return response.data.content;
    default:
      return "Unknown response type";
  }
}

/**
 * 序列化响应（用于存储或传输）
 */
export function serializeResponse(response: UnifiedResponse): string {
  return JSON.stringify(response);
}

/**
 * 反序列化响应
 */
export function deserializeResponse(json: string): UnifiedResponse | null {
  try {
    const parsed = JSON.parse(json);
    if (parsed.type && ["TEXT", "IMAGE", "VIDEO", "CODE"].includes(parsed.type)) {
      return parsed as UnifiedResponse;
    }
    return null;
  } catch {
    return null;
  }
}
