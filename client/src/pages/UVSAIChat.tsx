import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, Plus, Trash2, Menu, X, Settings, LogOut, Zap } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  model?: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

// 模型配置
const MODELS = {
  "gpt-4": { name: "GPT-4", color: "from-green-500 to-green-600" },
  "claude": { name: "Claude", color: "from-amber-500 to-amber-600" },
  "grok": { name: "Grok", color: "from-purple-500 to-purple-600" },
  "gemini": { name: "Gemini", color: "from-blue-500 to-blue-600" },
  "kimi": { name: "Kimi", color: "from-indigo-500 to-indigo-600" },
  "deepseek": { name: "DeepSeek", color: "from-orange-500 to-orange-600" },
};

// 根据输入内容自动选择最优模型
function getOptimalModel(input: string): string {
  const lowerInput = input.toLowerCase();
  
  // 代码相关 -> GPT-4
  if (/code|programming|python|javascript|function|class|debug|error/i.test(input)) {
    return "gpt-4";
  }
  
  // 长文本分析 -> Claude
  if (/analyze|summary|document|article|research|academic|paper/i.test(input)) {
    return "claude";
  }
  
  // 实时信息 -> Grok
  if (/news|current|today|latest|real-time|trending|recent/i.test(input)) {
    return "grok";
  }
  
  // 多模态 -> Gemini
  if (/image|video|visual|picture|diagram|chart|graph/i.test(input)) {
    return "gemini";
  }
  
  // 长上下文 -> Kimi
  if (/long|context|memory|remember|previous|history/i.test(input)) {
    return "kimi";
  }
  
  // 推理 -> DeepSeek
  if (/reason|logic|solve|problem|complex|think|analyze/i.test(input)) {
    return "deepseek";
  }
  
  // 默认
  return "gpt-4";
}

// 生成更智能的 AI 响应
function generateAIResponse(input: string, model: string): string {
  const responses: Record<string, string[]> = {
    "gpt-4": [
      `我是 GPT-4，我已收到您的问题："${input}"。我可以帮您进行深度分析、代码编写、创意写作等多种任务。`,
      `作为 GPT-4，我理解您想要了解关于"${input}"的内容。让我为您提供详细的解答和建议。`,
      `您提到了"${input}"，这是一个很有趣的话题。我可以从多个角度为您分析这个问题。`,
    ],
    "claude": [
      `我是 Claude，我收到了您的问题："${input}"。我擅长进行深入的分析和长文本处理，可以为您提供详细的研究报告。`,
      `关于"${input}"这个话题，我可以为您提供系统的分析框架和详细的解释。`,
      `您询问的"${input}"是一个复杂的问题。让我为您进行全面的分析和总结。`,
    ],
    "grok": [
      `我是 Grok，我了解到您想知道关于"${input}"的最新信息。我可以为您提供实时的、最新的相关资讯。`,
      `关于"${input}"，我可以为您提供当前最新的信息和趋势分析。`,
      `您提到的"${input}"，我可以为您提供最新的新闻和实时信息。`,
    ],
    "gemini": [
      `我是 Gemini，我收到了您关于"${input}"的问题。我可以处理多种模态的内容，包括文本、图像和视频分析。`,
      `关于"${input}"，我可以为您进行多模态的分析和处理。`,
      `您提到的"${input}"，我可以为您提供包括图像、视频等多模态的分析结果。`,
    ],
    "kimi": [
      `我是 Kimi，我收到了您的问题："${input}"。我擅长处理长上下文，可以记住对话历史并进行连贯的分析。`,
      `关于"${input}"，我可以为您进行长文本的处理和上下文记忆。`,
      `您提到的"${input}"，我可以在保持完整上下文的情况下为您提供答案。`,
    ],
    "deepseek": [
      `我是 DeepSeek，我收到了您的问题："${input}"。我擅长复杂推理和问题求解，可以为您提供深层的逻辑分析。`,
      `关于"${input}"这个问题，我可以进行深入的推理和逻辑分析。`,
      `您提到的"${input}"，让我为您进行详细的推理和问题分解。`,
    ],
  };

  const modelResponses = responses[model] || responses["gpt-4"];
  return modelResponses[Math.floor(Math.random() * modelResponses.length)];
}

export default function UVSAIChat() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [autoSelectModel, setAutoSelectModel] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 创建新对话
  const createNewConversation = () => {
    const newId = Date.now().toString();
    const newConversation: Conversation = {
      id: newId,
      title: language === "zh" ? "新对话" : "New Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConversations([newConversation, ...conversations]);
    setCurrentConversationId(newId);
    setMessages([]);
  };

  // 选择对话
  const selectConversation = (id: string) => {
    setCurrentConversationId(id);
    const conv = conversations.find((c) => c.id === id);
    if (conv) {
      setMessages(conv.messages);
    }
  };

  // 删除对话
  const deleteConversation = (id: string) => {
    setConversations(conversations.filter((c) => c.id !== id));
    if (currentConversationId === id) {
      if (conversations.length > 1) {
        const nextConv = conversations.find((c) => c.id !== id);
        if (nextConv) {
          selectConversation(nextConv.id);
        }
      } else {
        setCurrentConversationId(null);
        setMessages([]);
      }
    }
  };

  // 发送消息
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // 确定使用的模型
    let modelToUse = selectedModel;
    if (autoSelectModel) {
      modelToUse = getOptimalModel(input);
      setSelectedModel(modelToUse);
    }

    // 创建用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // 模拟 AI 响应延迟
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 生成 AI 响应
      const responseContent = generateAIResponse(input, modelToUse);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
        model: modelToUse,
      };

      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);

      // 更新对话
      if (currentConversationId) {
        setConversations(
          conversations.map((conv) =>
            conv.id === currentConversationId
              ? {
                  ...conv,
                  messages: updatedMessages,
                  updatedAt: new Date(),
                  title:
                    conv.messages.length === 0
                      ? input.substring(0, 30) + (input.length > 30 ? "..." : "")
                      : conv.title,
                }
              : conv
          )
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 清空所有消息
  const clearMessages = () => {
    if (currentConversationId) {
      setMessages([]);
      setConversations(
        conversations.map((conv) =>
          conv.id === currentConversationId
            ? { ...conv, messages: [] }
            : conv
        )
      );
    }
  };

  const isChatEmpty = !currentConversationId || messages.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-purple-500/20 z-40 flex flex-col"
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-purple-500/20 flex items-center justify-between">
          <h1 className="text-lg font-bold text-white">UVS AI</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Chat Button */}
        <button
          onClick={createNewConversation}
          className="m-4 flex items-center justify-center gap-2 w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-lg transition"
        >
          <Plus className="w-4 h-4" />
          {language === "zh" ? "新对话" : "New Chat"}
        </button>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
          {conversations.map((conv) => (
            <motion.div
              key={conv.id}
              whileHover={{ x: 4 }}
              className={`p-3 rounded-lg cursor-pointer transition group ${
                currentConversationId === conv.id
                  ? "bg-purple-600/30 border border-purple-500/50"
                  : "hover:bg-slate-800/50"
              }`}
              onClick={() => selectConversation(conv.id)}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-300 truncate flex-1">
                  {conv.title}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(conv.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-purple-500/20 space-y-2">
          <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition">
            <Settings className="w-4 h-4" />
            <span className="text-sm">{language === "zh" ? "设置" : "Settings"}</span>
          </button>
          {user && (
            <button
              onClick={() => {
                logout();
                setLocation(`/${language}`);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">{language === "zh" ? "退出" : "Logout"}</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        {/* Header */}
        <div className="border-b border-purple-500/20 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-gray-400 hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold text-white">
                {language === "zh" ? "UVS AI 助手" : "UVS AI Assistant"}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-400">{language === "zh" ? "自动选择模型" : "Auto Model"}</label>
                <input
                  type="checkbox"
                  checked={autoSelectModel}
                  onChange={(e) => setAutoSelectModel(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
              </div>
              <select
                value={selectedModel}
                onChange={(e) => {
                  setSelectedModel(e.target.value);
                  setAutoSelectModel(false);
                }}
                className="px-3 py-2 bg-slate-800 border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
              >
                {Object.entries(MODELS).map(([key, { name }]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-8">
          {isChatEmpty ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="h-full flex flex-col items-center justify-center"
            >
              <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {language === "zh" ? "开始对话" : "Start a Conversation"}
                </h3>
                <p className="text-gray-400 mb-8">
                  {language === "zh"
                    ? "输入您的问题，UVS AI 将自动选择最优模型为您服务"
                    : "Type your message and UVS AI will automatically select the best model for you"}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(MODELS).map(([key, { name }]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedModel(key);
                        setAutoSelectModel(false);
                      }}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-purple-500/30 rounded-lg text-sm text-gray-300 hover:text-white transition"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4 max-w-4xl mx-auto">
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-2xl px-4 py-3 rounded-lg ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-br-none"
                        : "bg-slate-800 text-gray-100 border border-purple-500/30 rounded-bl-none"
                    }`}
                  >
                    {msg.role === "assistant" && msg.model && (
                      <div className="text-xs text-purple-400 mb-1 font-semibold">
                        {MODELS[msg.model as keyof typeof MODELS]?.name || msg.model}
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-slate-800 border border-purple-500/30 px-4 py-3 rounded-lg rounded-bl-none">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-purple-500/20 bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="max-w-4xl mx-auto">
            {!isChatEmpty && (
              <div className="mb-4 flex justify-center">
                <button
                  onClick={clearMessages}
                  className="text-xs text-gray-400 hover:text-gray-300 transition"
                >
                  {language === "zh" ? "清空对话" : "Clear Chat"}
                </button>
              </div>
            )}
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={
                  language === "zh"
                    ? "输入您的问题..."
                    : "Type your message..."
                }
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="px-4 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {language === "zh"
                ? "按 Enter 发送，Shift+Enter 换行"
                : "Press Enter to send, Shift+Enter for new line"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
