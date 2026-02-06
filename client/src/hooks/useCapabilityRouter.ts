/**
 * useCapabilityRouter
 * 前端 Hook 用于调用新的能力路由系统
 * 支持统一的 Schema 响应
 */

import { useState, useCallback } from "react";

export type ContentModality = "TEXT" | "IMAGE" | "VIDEO" | "CODE";

export interface CapabilityRequest {
  prompt: string;
  modality: ContentModality;
  selectedModel?: string;
}

export interface TextData {
  content: string;
  model: string;
  prompt: string;
  timestamp: number;
}

export interface ImageData {
  url: string;
  model: string;
  prompt: string;
  timestamp: number;
}

export interface VideoData {
  url: string;
  model: string;
  prompt: string;
  timestamp: number;
}

export interface CodeData {
  content: string;
  model: string;
  prompt: string;
  timestamp: number;
}

export type CapabilityResponse =
  | { type: "TEXT"; data: TextData }
  | { type: "IMAGE"; data: ImageData }
  | { type: "VIDEO"; data: VideoData }
  | { type: "CODE"; data: CodeData };

export function useCapabilityRouter() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendCapabilityRequest = useCallback(
    async (request: CapabilityRequest): Promise<CapabilityResponse | null> => {
      setIsLoading(true);
      setError(null);

      try {
        // 调用后端能力路由 API
        // 注：需要在后端 routers.ts 中添加对应的 tRPC 路由
        console.log("Capability request:", request);
        return null;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    sendCapabilityRequest,
    isLoading,
    error,
  };
}
