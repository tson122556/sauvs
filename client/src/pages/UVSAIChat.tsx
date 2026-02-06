import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, Plus, Trash2, Menu, X, Settings, LogOut, Zap, Copy, Check } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { SuggestedQuestions, generateSuggestedQuestions } from "@/components/SuggestedQuestions";

interface Message {
  id?: number;
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  model?: string;
  tokenCount?: number;
}

interface Conversation {
  id: number;
  title: string;
  model: string;
  messageCount: number;
  createdAt?: Date;
  updatedAt?: Date;
  messages?: Message[];
}

const MODELS = {
  "gpt-4": { name: "GPT-4", color: "from-green-500 to-green-600" },
  "claude": { name: "Claude", color: "from-amber-500 to-amber-600" },
  "grok": { name: "Grok", color: "from-purple-500 to-purple-600" },
  "gemini": { name: "Gemini", color: "from-blue-500 to-blue-600" },
  "kimi": { name: "Kimi", color: "from-indigo-500 to-indigo-600" },
  "deepseek": { name: "DeepSeek", color: "from-orange-500 to-orange-600" },
};

function getOptimalModel(input: string): string {
  if (/code|programming|python|javascript|function|class|debug|error/i.test(input)) {
    return "gpt-4";
  }
  if (/analyze|summary|document|article|research|academic|paper/i.test(input)) {
    return "claude";
  }
  if (/news|current|today|latest|real-time|trending|recent/i.test(input)) {
    return "grok";
  }
  if (/image|video|visual|picture|diagram|chart|graph/i.test(input)) {
    return "gemini";
  }
  if (/long|context|memory|remember|previous|history/i.test(input)) {
    return "kimi";
  }
  if (/reason|logic|solve|problem|complex|think|analyze/i.test(input)) {
    return "deepseek";
  }
  return "gpt-4";
}

export default function UVSAIChat() {
  const { language } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();

  // 对话管理状态
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // tRPC 调用
  const createConversationMutation = trpc.aiChat.createConversation.useMutation();
  const getConversationsQuery = trpc.aiChat.getConversations.useQuery(
    { limit: 50, offset: 0 },
    { enabled: isAuthenticated }
  );
  const sendMessageMutation = trpc.aiChat.sendMessage.useMutation();
  const deleteConversationMutation = trpc.aiChat.deleteConversation.useMutation();

  // 加载对话列表
  useEffect(() => {
    if (getConversationsQuery.data) {
      setConversations(getConversationsQuery.data);
      if (getConversationsQuery.data.length > 0 && !currentConversation) {
        setCurrentConversation(getConversationsQuery.data[0]);
      }
    }
  }, [getConversationsQuery.data]);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 创建新对话
  const handleNewConversation = async () => {
    const title = language === "zh" ? "新对话" : "New Conversation";
    const result = await createConversationMutation.mutateAsync({
      title,
      model: "gpt-4",
    });

    if (result.conversationId) {
      const newConversation: Conversation = {
        id: result.conversationId,
        title,
        model: "gpt-4",
        messageCount: 0,
      };
      setConversations([newConversation, ...conversations]);
      setCurrentConversation(newConversation);
      setMessages([]);
    }
  };

  // 发送消息
  const handleSendMessage = async () => {
    if (!inputValue.trim() || !currentConversation || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const optimalModel = getOptimalModel(inputValue);
      const response = await sendMessageMutation.mutateAsync({
        conversationId: currentConversation.id,
        content: inputValue,
        model: optimalModel,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: response.response,
        timestamp: new Date(),
        model: response.model,
        tokenCount: response.tokenCount,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // 更新对话列表
      if (getConversationsQuery.data) {
        getConversationsQuery.refetch();
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage: Message = {
        role: "assistant",
        content:
          language === "zh"
            ? "抱歉，发生了错误。请稍后重试。"
            : "Sorry, an error occurred. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 删除对话
  const handleDeleteConversation = async (conversationId: number) => {
    await deleteConversationMutation.mutateAsync(conversationId);
    setConversations(conversations.filter((c) => c.id !== conversationId));
    if (currentConversation?.id === conversationId) {
      setCurrentConversation(null);
      setMessages([]);
    }
  };

  // 复制消息
  const handleCopyMessage = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 未登录时重定向到登录页面
  if (!isAuthenticated) {
    const loginUrl = language === "zh" ? "/zh/login" : "/en/login";
    setLocation(loginUrl);
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* 顶部导航 */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:text-purple-400 transition"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl font-bold text-white">UVS AI Chat</h1>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut size={16} />
              {language === "zh" ? "退出" : "Logout"}
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex pt-20 min-h-screen">
        {/* 侧边栏 */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="w-64 bg-slate-900/50 border-r border-purple-500/20 p-4 overflow-y-auto"
            >
              <Button
                onClick={handleNewConversation}
                className="w-full mb-4 bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center gap-2"
              >
                <Plus size={18} />
                {language === "zh" ? "新对话" : "New Chat"}
              </Button>

              <div className="space-y-2">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`p-3 rounded-lg cursor-pointer transition ${
                      currentConversation?.id === conv.id
                        ? "bg-purple-600/20 border border-purple-500"
                        : "bg-slate-800/30 hover:bg-slate-800/50"
                    }`}
                    onClick={() => setCurrentConversation(conv)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {conv.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {conv.messageCount}{language === "zh" ? "条消息" : " messages"}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteConversation(conv.id);
                        }}
                        className="text-gray-400 hover:text-red-400 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 主聊天区域 */}
        <div className="flex-1 flex flex-col">
          {currentConversation ? (
            <>
              {/* 消息区域 */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 && (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <Zap size={48} className="mx-auto mb-4 text-purple-400" />
                      <p className="text-gray-400">
                        {language === "zh"
                          ? "开始您的对话吧！"
                          : "Start your conversation!"}
                      </p>
                    </div>
                  </div>
                )}

                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <Card
                      className={`max-w-2xl p-4 ${
                        msg.role === "user"
                          ? "bg-purple-600/20 border-purple-500"
                          : "bg-slate-800/50 border-slate-700"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-sm text-gray-300">{msg.content}</p>
                          {msg.model && (
                            <p className="text-xs text-gray-500 mt-2">
                              Model: {msg.model}
                              {msg.tokenCount && ` (${msg.tokenCount} tokens)`}
                            </p>
                          )}
                        </div>
                        {msg.role === "assistant" && (
                          <button
                            onClick={() =>
                              handleCopyMessage(msg.content, `msg-${idx}`)
                            }
                            className="text-gray-400 hover:text-purple-400 transition"
                          >
                            {copiedId === `msg-${idx}` ? (
                              <Check size={16} />
                            ) : (
                              <Copy size={16} />
                            )}
                          </button>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <Card className="bg-slate-800/50 border-slate-700 p-4">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200" />
                      </div>
                    </Card>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* 输入区域 */}
              <div className="border-t border-purple-500/20 p-6 bg-slate-900/50">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder={
                      language === "zh"
                        ? "输入您的问题..."
                        : "Type your question..."
                    }
                    disabled={isLoading}
                    className="flex-1 bg-slate-800/50 border border-purple-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 disabled:opacity-50"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center gap-2"
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-400 mb-4">
                  {language === "zh"
                    ? "选择或创建一个对话开始"
                    : "Select or create a conversation to start"}
                </p>
                <Button
                  onClick={handleNewConversation}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600"
                >
                  {language === "zh" ? "创建新对话" : "Create New Chat"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
