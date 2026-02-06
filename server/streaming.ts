/**
 * SSE (Server-Sent Events) 流式响应处理
 * 支持实时流式输出 AI 响应
 */

import { Response } from "express";
import { invokeLLM } from "./_core/llm";
import { createAIMessage, getAIConversationById, updateAIConversation } from "./db";

export interface StreamingOptions {
  conversationId: number;
  userId: number;
  userMessage: string;
  model: string;
}

/**
 * 发送流式 AI 响应
 */
export async function streamAIResponse(
  res: Response,
  options: StreamingOptions
): Promise<void> {
  const { conversationId, userId, userMessage, model } = options;

  // 设置 SSE 响应头
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    // 验证对话所有权
    const conversation = await getAIConversationById(conversationId);
    if (!conversation || conversation.userId !== userId) {
      sendSSEEvent(res, "error", { message: "Conversation not found or unauthorized" });
      res.end();
      return;
    }

    // 保存用户消息
    await createAIMessage({
      conversationId,
      role: "user",
      content: userMessage,
    });

    sendSSEEvent(res, "start", { model });

    // 调用 LLM API 获取流式响应
    const response = await invokeLLM({
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    let fullContent = "";
    const messageContent = response.choices?.[0]?.message?.content;

    if (typeof messageContent === "string") {
      fullContent = messageContent;
    } else if (Array.isArray(messageContent)) {
      fullContent = messageContent
        .map((item: any) => {
          if (item.type === "text") return item.text;
          return "";
        })
        .join("\n");
    }

    // 模拟流式输出（分块发送）
    const chunkSize = 50;
    for (let i = 0; i < fullContent.length; i += chunkSize) {
      const chunk = fullContent.substring(i, i + chunkSize);
      sendSSEEvent(res, "chunk", { content: chunk });
      // 模拟网络延迟
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    // 保存完整的 AI 响应
    await createAIMessage({
      conversationId,
      role: "assistant",
      content: fullContent,
      model,
      tokenCount: response.usage?.total_tokens || 0,
    });

    // 更新对话信息
    await updateAIConversation(conversationId, {
      model,
      messageCount: (conversation.messageCount || 0) + 2,
    });

    sendSSEEvent(res, "done", {
      totalTokens: response.usage?.total_tokens || 0,
      model,
    });
  } catch (error) {
    console.error("Streaming error:", error);
    sendSSEEvent(res, "error", {
      message: error instanceof Error ? error.message : "Unknown error",
    });
  } finally {
    res.end();
  }
}

/**
 * 发送 SSE 事件
 */
function sendSSEEvent(
  res: Response,
  eventType: string,
  data: Record<string, any>
): void {
  res.write(`event: ${eventType}\n`);
  res.write(`data: ${JSON.stringify(data)}\n\n`);
}

/**
 * 处理流式对话请求
 */
export async function handleStreamingChat(
  res: Response,
  conversationId: number,
  userId: number,
  userMessage: string,
  model: string
): Promise<void> {
  await streamAIResponse(res, {
    conversationId,
    userId,
    userMessage,
    model,
  });
}
