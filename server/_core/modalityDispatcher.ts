/**
 * 模态级调用分发器
 * 根据检测到的模态，将请求路由到对应的生成服务
 */

import { detectModality, routeByModality } from "./modalityRouter";
import { streamLLMResponse } from "./streamingLLM";
import { generateImage } from "./imageGeneration";
import { generateVideo } from "./videoGeneration";

export type Modality = "text" | "image" | "video";

export interface ModalityDispatchRequest {
  messages: Array<{ role: "user" | "assistant" | "system"; content: string }>;
  userInput: string;
  contentType?: Modality;
  model?: string;
  onChunk?: (chunk: string) => void;
}

export interface ModalityDispatchResponse {
  modality: Modality;
  model: string;
  content: string;
  url?: string;
  metadata?: Record<string, any>;
}

/**
 * 根据模态分发请求到对应的服务
 */
export async function dispatchByModality(
  request: ModalityDispatchRequest
): Promise<ModalityDispatchResponse> {
  // 检测模态
  const detectedModality = detectModality(request.userInput, request.contentType);

  console.log(`[Modality Dispatcher] Detected modality: ${detectedModality}`);

  // 根据模态路由
  const routing = routeByModality(request.userInput, request.contentType);
  const selectedModel = routing.selectedModel;

  console.log(
    `[Modality Dispatcher] Selected model: ${selectedModel.name} (${selectedModel.id})`
  );
  console.log(`[Modality Dispatcher] Routing reason: ${routing.reason}`);

  try {
    switch (detectedModality) {
      case "image": {
        // 调用图片生成服务
        console.log(`[Modality Dispatcher] Calling image generation service...`);
        const imageResult = await generateImage({
          prompt: request.userInput,
        });

        return {
          modality: "image",
          model: selectedModel.id,
          content: request.userInput,
          url: imageResult.url,
          metadata: {
            provider: selectedModel.provider,
            responseTime: Date.now(),
            selectionReason: routing.reason,
          },
        };
      }

      case "video": {
        // 调用视频生成服务
        console.log(`[Modality Dispatcher] Calling video generation service...`);
        const videoResult = await generateVideo({
          prompt: request.userInput,
        });

        return {
          modality: "video",
          model: selectedModel.id,
          content: request.userInput,
          url: videoResult.url,
          metadata: {
            provider: selectedModel.provider,
            responseTime: Date.now(),
            selectionReason: routing.reason,
          },
        };
      }

      case "text":
      default: {
        // 调用文本生成服务
        console.log(`[Modality Dispatcher] Calling text generation service...`);
        const textResponse = await streamLLMResponse(
          request.messages,
          selectedModel.id,
          request.onChunk
        );

        return {
          modality: "text",
          model: selectedModel.id,
          content: textResponse,
          metadata: {
            provider: selectedModel.provider,
            responseTime: Date.now(),
            selectionReason: routing.reason,
          },
        };
      }
    }
  } catch (error) {
    console.error(
      `[Modality Dispatcher] Error dispatching to ${detectedModality} service:`,
      error
    );
    throw error;
  }
}

/**
 * 批量分发多个模态的请求（用于模型对比）
 */
export async function dispatchMultipleModalities(
  request: ModalityDispatchRequest,
  modelIds: string[]
): Promise<ModalityDispatchResponse[]> {
  const detectedModality = detectModality(request.userInput, request.contentType);

  const results: ModalityDispatchResponse[] = [];

  for (const modelId of modelIds) {
    try {
      // 为每个模型创建单独的请求
      const modelRequest = {
        ...request,
        model: modelId,
      };

      const result = await dispatchByModality(modelRequest);
      results.push(result);
    } catch (error) {
      console.error(`[Modality Dispatcher] Error dispatching to model ${modelId}:`, error);
      // 继续处理其他模型，不中断
    }
  }

  return results;
}

/**
 * 验证模态和模型的兼容性
 */
export function validateModalityModelCompatibility(
  modality: Modality,
  modelId: string
): boolean {
  const compatibilityMap: Record<Modality, string[]> = {
    text: ["gpt-4", "claude", "grok", "gemini", "kimi", "deepseek"],
    image: ["dall-e-3", "midjourney", "stable-diffusion", "flux"],
    video: ["runway-ml", "synthesia", "d-id"],
  };

  const compatibleModels = compatibilityMap[modality] || [];
  return compatibleModels.some((m) => modelId.includes(m) || m.includes(modelId));
}

export default dispatchByModality;
