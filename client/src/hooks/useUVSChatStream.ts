import { useState, useCallback } from "react";
import { trpc } from "@/lib/trpc";

export interface ChatMessage {
  id?: number;
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  model?: string;
  contentType?: "text" | "image" | "video" | "code" | "analysis";
}

export interface Conversation {
  id: number;
  title: string;
  model: string;
  messageCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export function useUVSChatStream() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // tRPC 调用
  const createConvMutation = trpc.uvsChatStream.createConversation.useMutation();
  const sendMessageMutation = trpc.uvsChatStream.sendMessage.useMutation();
  const deleteConvMutation = trpc.uvsChatStream.deleteConversation.useMutation();
  const updateTitleMutation = trpc.uvsChatStream.updateConversationTitle.useMutation();
  // 移除未使用的查询

  /**
   * 创建新对话
   */
  const createConversation = useCallback(
    async (title: string, model: string = "gpt-4") => {
      try {
        setError(null);
        const result = await createConvMutation.mutateAsync({ title, model });
        
        const newConversation: Conversation = {
          id: result.conversationId,
          title,
          model,
          messageCount: 0,
        };
        
        setConversations((prev) => [newConversation, ...prev]);
        setCurrentConversation(newConversation);
        setMessages([]);
        
        return result;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to create conversation";
        setError(message);
        throw err;
      }
    },
    [createConvMutation]
  );

  /**
   * 加载对话
   */
  const loadConversation = useCallback(
    async (conversationId: number) => {
      try {
        setError(null);
        setIsLoading(true);
        
        // 使用 trpc 客户端直接调用
        const result = await (trpc.uvsChatStream.getConversation as any)({
          conversationId,
        });
        
        setCurrentConversation(result.conversation);
        setMessages(
          result.messages.map((msg: any) => ({
            id: msg.id,
            role: msg.role,
            content: msg.content,
            model: msg.model,
            timestamp: new Date(msg.createdAt),
          }))
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load conversation";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * 发送消息
   */
  const sendMessage = useCallback(
    async (content: string, contentType?: "text" | "image" | "video" | "code" | "analysis") => {
      if (!currentConversation) {
        setError("No conversation selected");
        return;
      }

      try {
        setError(null);
        setIsLoading(true);

        // 添加用户消息到本地
        const userMessage: ChatMessage = {
          role: "user",
          content,
          timestamp: new Date(),
          contentType,
        };
        setMessages((prev) => [...prev, userMessage]);

        // 调用 API
        const result = await sendMessageMutation.mutateAsync({
          conversationId: currentConversation.id,
          content,
          contentType,
        });

        // 添加 AI 响应到本地
        const assistantMessage: ChatMessage = {
          id: result.messageId,
          role: "assistant",
          content: result.response,
          timestamp: new Date(),
          model: currentConversation.model,
          contentType,
        };
        setMessages((prev) => [...prev, assistantMessage]);

        // 更新对话信息
        setCurrentConversation((prev) =>
          prev
            ? {
                ...prev,
                messageCount: prev.messageCount + 2,
              }
            : null
        );

        return result;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to send message";
        setError(message);
        
        // 移除用户消息（因为发送失败）
        setMessages((prev) => prev.slice(0, -1));
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [currentConversation, sendMessageMutation]
  );

  /**
   * 删除对话
   */
  const deleteConversation = useCallback(
    async (conversationId: number) => {
      try {
        setError(null);
        await deleteConvMutation.mutateAsync({ conversationId });
        
        setConversations((prev) => prev.filter((c) => c.id !== conversationId));
        
        if (currentConversation?.id === conversationId) {
          setCurrentConversation(null);
          setMessages([]);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to delete conversation";
        setError(message);
        throw err;
      }
    },
    [currentConversation, deleteConvMutation]
  );

  /**
   * 更新对话标题
   */
  const updateConversationTitle = useCallback(
    async (conversationId: number, title: string) => {
      try {
        setError(null);
        await updateTitleMutation.mutateAsync({ conversationId, title });
        
        setConversations((prev) =>
          prev.map((c) => (c.id === conversationId ? { ...c, title } : c))
        );
        
        if (currentConversation?.id === conversationId) {
          setCurrentConversation((prev) => (prev ? { ...prev, title } : null));
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to update title";
        setError(message);
        throw err;
      }
    },
    [currentConversation, updateTitleMutation]
  );

  /**
   * 刷新对话列表
   */
  const refreshConversations = useCallback(async () => {
    try {
      setError(null);
      const result = await (trpc.uvsChatStream.getConversations as any)({ limit: 50 });
      setConversations(result.conversations);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to refresh conversations";
      setError(message);
    }
  }, [trpc]);

  return {
    conversations,
    currentConversation,
    messages,
    isLoading,
    error,
    createConversation,
    loadConversation,
    sendMessage,
    deleteConversation,
    updateConversationTitle,
    refreshConversations,
  };
}
