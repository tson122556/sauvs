/**
 * AI 回答功能模块
 * 根据选定的模型调用相应的 API 获取真实回答
 */

import { invokeLLM } from "./llm";

export interface AIResponse {
  success: boolean;
  content?: string;
  error?: string;
  model: string;
  tokensUsed?: number;
}

/**
 * 调用 LLM 获取回答
 */
export async function getAIResponse(
  userMessage: string,
  selectedModel: string,
  conversationHistory?: Array<{ role: string; content: string }>
): Promise<AIResponse> {
  try {
    // 构建消息历史
    const messages: Array<{ role: "user" | "assistant" | "system"; content: string }> = [];

    // 添加系统提示
    messages.push({
      role: "system",
      content: `You are a helpful AI assistant. You are currently using the ${selectedModel} model. 
      Please provide clear, accurate, and helpful responses to user questions.
      If you don't know something, be honest about it.`,
    });

    // 添加对话历史
    if (conversationHistory && conversationHistory.length > 0) {
      for (const msg of conversationHistory.slice(-10)) {
        // 只保留最近 10 条消息
        messages.push({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        });
      }
    }

    // 添加当前用户消息
    messages.push({
      role: "user",
      content: userMessage,
    });

    // 调用 LLM
    const response = await invokeLLM({
      messages,
    });

    // 提取响应内容
    let content = "";
    const messageContent = response.choices?.[0]?.message?.content;
    if (typeof messageContent === "string") {
      content = messageContent;
    } else if (Array.isArray(messageContent)) {
      // 处理数组形式的内容
      content = messageContent
        .filter((item: any) => item.type === "text")
        .map((item: any) => item.text)
        .join("\n");
    }

    if (!content) {
      return {
        success: false,
        error: "No response content from LLM",
        model: selectedModel,
      };
    }

    return {
      success: true,
      content,
      model: selectedModel,
      tokensUsed: response.usage?.total_tokens,
    };
  } catch (error) {
    console.error(`[AIResponder] Error calling ${selectedModel}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      model: selectedModel,
    };
  }
}

/**
 * 根据模型选择获取回答
 */
export async function respondToUserQuestion(
  userMessage: string,
  selectedModel: string,
  conversationHistory?: Array<{ role: string; content: string }>
): Promise<AIResponse> {
  // 验证模型
  const validModels = [
    "gpt-4",
    "gpt-3.5-turbo",
    "claude",
    "deepseek",
    "grok",
    "gemini",
    "kimi",
  ];

  if (!validModels.includes(selectedModel)) {
    return {
      success: false,
      error: `Invalid model: ${selectedModel}`,
      model: selectedModel,
    };
  }

  // 调用 LLM 获取回答
  return getAIResponse(userMessage, selectedModel, conversationHistory);
}

/**
 * 生成模型选择说明
 */
export function generateSelectionExplanation(
  selectedModel: string,
  intent: string,
  confidence: number
): string {
  const modelDescriptions: Record<string, string> = {
    "gpt-4": "GPT-4 is selected for its superior reasoning and coding capabilities",
    "gpt-3.5-turbo":
      "GPT-3.5 Turbo is selected for fast and efficient responses",
    claude:
      "Claude is selected for its excellent writing and creative capabilities",
    deepseek:
      "DeepSeek is selected for its strong analytical and reasoning abilities",
    grok: "Grok is selected for real-time information and current events",
    gemini:
      "Gemini is selected for multimodal understanding and visual content",
    kimi: "Kimi is selected for long-context understanding and analysis",
  };

  const description =
    modelDescriptions[selectedModel] ||
    `${selectedModel} is selected for this query`;

  return `${description}. (Intent: ${intent}, Confidence: ${(confidence * 100).toFixed(0)}%)`;
}
