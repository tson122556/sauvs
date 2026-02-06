import { invokeLLM } from "./llm";

/**
 * 流式 LLM 响应处理器
 * 支持将 LLM 响应以流式方式返回给客户端
 */

export interface StreamMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string | Array<{
    type: "text" | "image_url" | "file_url";
    text?: string;
    image_url?: { url: string; detail?: "auto" | "low" | "high" };
    file_url?: { url: string; mime_type?: string };
  }>;
}

/**
 * 调用 LLM 并返回流式响应
 * @param messages 消息列表
 * @param model 模型名称（可选，使用默认模型）
 * @param onChunk 流式数据回调函数
 * @returns 完整的响应文本
 */
export async function streamLLMResponse(
  messages: StreamMessage[],
  model: string = "gpt-4",
  onChunk?: (chunk: string) => void
): Promise<string> {
  try {
    // 调用 LLM API
    const response = await invokeLLM({
      messages: messages as Parameters<typeof invokeLLM>[0]["messages"],
    });

    // 提取响应内容
    const content = response.choices?.[0]?.message?.content || "";
    
    // 如果提供了回调函数，模拟流式输出
    if (onChunk && typeof content === "string") {
      // 将内容分成小块，模拟流式响应
      const chunkSize = 10;
      for (let i = 0; i < content.length; i += chunkSize) {
        const chunk = content.substring(i, i + chunkSize);
        onChunk(chunk);
        // 模拟网络延迟
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    }

    return typeof content === "string" ? content : JSON.stringify(content);
  } catch (error) {
    console.error("LLM streaming error:", error);
    throw error;
  }
}

/**
 * 根据模型名称获取对应的 API 调用函数
 */
export function getModelHandler(model: string) {
  const handlers: Record<string, string> = {
    "gpt-4": "OpenAI GPT-4",
    "gpt-3.5-turbo": "OpenAI GPT-3.5 Turbo",
    "claude": "Anthropic Claude",
    "claude-3": "Anthropic Claude 3",
    "gemini": "Google Gemini",
    "grok": "xAI Grok",
    "kimi": "Moonshot Kimi",
    "deepseek": "DeepSeek",
  };

  return handlers[model] || "Unknown Model";
}

/**
 * 构建系统提示词
 */
export function buildSystemPrompt(contentType?: string): string {
  const basePrompt = `你是一个专业的 AI 助手，由极紫星智慧科技提供。
你具备以下能力：
- 深入的技术知识和分析能力
- 创意思维和问题解决能力
- 多语言支持
- 代码编写和调试
- 数据分析和可视化建议

请根据用户的需求提供准确、有帮助的回答。`;

  if (contentType === "code") {
    return basePrompt + "\n\n当用户要求编写代码时，请提供完整、可运行的代码示例，并包含注释说明。";
  }

  if (contentType === "analysis") {
    return basePrompt + "\n\n当用户要求分析时，请提供详细的分析过程和结论，包括数据支持和逻辑推理。";
  }

  return basePrompt;
}
