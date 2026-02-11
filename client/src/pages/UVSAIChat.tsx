"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, Plus, Trash2, Menu, X, Settings, LogOut, Zap, Copy, Check, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useState, useRef, useEffect } from "react";

interface Message {
  id?: number;
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  model?: string;
  tokenCount?: number;
  contentType?: "text" | "image" | "video" | "code" | "analysis";
  url?: string;
  metadata?: Record<string, any>;
  modelSelectionReason?: string;
  responseTime?: number;
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
  "gpt4": { name: "GPT-4", color: "from-green-500 to-green-600", icon: "🟢" },
  "claude": { name: "Claude", color: "from-amber-500 to-amber-600", icon: "🟡" },
  "gemini": { name: "Gemini", color: "from-blue-500 to-blue-600", icon: "🔵" },
  "kimi": { name: "Kimi", color: "from-indigo-500 to-indigo-600", icon: "🟦" },
  "deepseek": { name: "DeepSeek", color: "from-orange-500 to-orange-600", icon: "🟠" },
  "qwen": { name: "通义千问", color: "from-red-500 to-red-600", icon: "🔴" },
  "doubao": { name: "豆包", color: "from-yellow-500 to-yellow-600", icon: "🟨" },
  "glm": { name: "ChatGLM", color: "from-cyan-500 to-cyan-600", icon: "🟦" },
  "grok": { name: "Grok", color: "from-purple-500 to-purple-600", icon: "🟣" },
};

// 增强的多模态模型选择算法，支持评分和权重
function analyzeAndSelectModel(input: string): { model: string; reason: string; confidence: number; alternatives: Array<{model: string; score: number}> } {
  const scores: Record<string, number> = {
    "gpt4": 0,
    "claude": 0,
    "gemini": 0,
    "kimi": 0,
    "deepseek": 0,
    "qwen": 0,
    "doubao": 0,
    "glm": 0,
    "grok": 0,
  };

  // 代码和编程 - GPT-4 (权重: 10)
  const codePatterns = [/```/, /function|class|def|const|let|var|import|export|function/, /=>|async|await|try|catch|if|else|for|while/i, /python|javascript|java|c\+\+|typescript|rust|go|php|ruby/i];
  if (codePatterns.some((p) => p.test(input))) {
    scores["gpt4"] += 10;
  }

  // 多模态内容 - Gemini (权重: 9)
  const imagePatterns = [
    /image|photo|picture|visual|diagram|chart|graph|design|ui|ux|screenshot|icon|logo|illustration|artwork/i,
    /pixel|resolution|dpi|rgba|color|hue|saturation|brightness|filter|effect/i,
  ];
  const videoPatterns = [
    /video|movie|film|animation|streaming|frame|fps|codec|subtitle|caption/i,
    /youtube|vimeo|mp4|webm|avi|mov|mkv|edit|cut|trim|transition|effect|render|premiere|after effects/i,
  ];
  if (imagePatterns.some((p) => p.test(input)) || videoPatterns.some((p) => p.test(input))) {
    scores["gemini"] += 9;
  }

  // 实时信息 - Grok (权重: 8)
  const realtimePatterns = [
    /news|stock|weather|current|today|latest|breaking|real-time|live|trending/i,
    /bitcoin|crypto|market|price|rate|exchange|financial|economy/i,
  ];
  if (realtimePatterns.some((p) => p.test(input))) {
    scores["grok"] += 8;
  }

  // 长文本和文档分析 - Kimi (权重: 7)
  const longTextPatterns = [/document|pdf|paper|article|research|analyze|summary|extract|long|context/i];
  if (longTextPatterns.some((p) => p.test(input))) {
    scores["kimi"] += 7;
  }

  // 中文优化 - 通义千问、豆包、ChatGLM (权重: 6)
  const chinesePatterns = [/[\u4e00-\u9fa5]/, /中文|汉语|普通话|简体|繁体/i];
  if (chinesePatterns.some((p) => p.test(input))) {
    scores["qwen"] += 6;
    scores["doubao"] += 5;
    scores["glm"] += 5;
  }

  // 创意写作 - Claude (权重: 5)
  const creativePatterns = [/story|poem|creative|write|fiction|novel|character|dialogue|narrative/i];
  if (creativePatterns.some((p) => p.test(input))) {
    scores["claude"] += 5;
  }

  // 深度推理 - DeepSeek (权重: 4)
  const reasoningPatterns = [/logic|reason|think|analyze|explain|why|how|complex|problem|solve/i];
  if (reasoningPatterns.some((p) => p.test(input))) {
    scores["deepseek"] += 4;
  }

  // 计算置信度和排序
  const sortedModels = Object.entries(scores)
    .map(([model, score]) => ({ model, score }))
    .sort((a, b) => b.score - a.score);

  const topModel = sortedModels[0];
  const maxScore = Math.max(...Object.values(scores));
  const confidence = maxScore > 0 ? Math.min(100, (topModel.score / maxScore) * 100) : 0;

  let reason = "General purpose model";
  if (topModel.score > 0) {
    if (topModel.model === "gpt4" && scores["gpt4"] > 0) {
      reason = "Best for code and complex tasks";
    } else if (topModel.model === "gemini" && scores["gemini"] > 0) {
      reason = "Best for multimodal content (images, videos)";
    } else if (topModel.model === "grok" && scores["grok"] > 0) {
      reason = "Real-time information specialist";
    } else if (topModel.model === "kimi" && scores["kimi"] > 0) {
      reason = "Long context and document analysis";
    } else if (topModel.model === "deepseek" && scores["deepseek"] > 0) {
      reason = "Complex reasoning and data analysis";
    } else if (topModel.model === "claude" && scores["claude"] > 0) {
      reason = "Text analysis and creative writing";
    }
  }

  return {
    model: topModel.model || "gpt4",
    reason,
    confidence,
    alternatives: sortedModels.slice(1, 3),
  };
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
  const [selectedModel, setSelectedModel] = useState<string>("gpt4");
  const [predictedModel, setPredictedModel] = useState<{model: string; reason: string; confidence: number} | null>(null);
  const [autoSelectMode, setAutoSelectMode] = useState(true);
  const [isMainlandRegion, setIsMainlandRegion] = useState(false); // 是否是中国大陆用户
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // tRPC 调用
  const sendMessageMutation = trpc.uvsAi.sendMessage.useMutation();

  // 检查认证和地域
  useEffect(() => {
    // 检测用户地域
    const detectRegion = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        // 检查是否是中国大陆
        const isMainland = data.country_code === "CN" && data.region !== "Hong Kong" && data.region !== "Macau" && data.region !== "Taiwan";
        setIsMainlandRegion(isMainland);
        console.log(`地域检测: ${data.country_code} - ${data.region} - 中国大陆: ${isMainland}`);
      } catch (error) {
        console.log("地域检测失败，默认为非中国大陆", error);
        setIsMainlandRegion(false);
      }
    };
    
    detectRegion();
    
    if (!isAuthenticated) {
      setLocation(language === "zh" ? "/zh/login" : "/en/login");
    } else if (!currentConversation) {
      // 自动创建第一个对话
      const title = language === "zh" ? "新对话" : "New Conversation";
      const newConversation: Conversation = {
        id: Date.now(),
        title,
        model: "gpt4",
        messageCount: 0,
      };
      setCurrentConversation(newConversation);
      setConversations([newConversation]);
    }
  }, [isAuthenticated, language, setLocation, currentConversation]);

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 实时模型预测
  useEffect(() => {
    if (autoSelectMode && inputValue.trim()) {
      const prediction = analyzeAndSelectModel(inputValue);
      setPredictedModel(prediction);
    } else {
      setPredictedModel(null);
    }
  }, [inputValue, autoSelectMode]);

  // 创建新对话
  const handleNewConversation = async () => {
    const title = language === "zh" ? "新对话" : "New Conversation";
    const newConversation: Conversation = {
      id: Date.now(),
      title,
      model: "gpt4",
      messageCount: 0,
    };
    setCurrentConversation(newConversation);
    setConversations([newConversation]);
    setMessages([]);
    setInputValue("");
    setSuggestedQuestions([]);
    setSelectedModel("gpt4");
    setPredictedModel(null);
  };

  // 发送消息
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // 如果没有当前对话，创建一个新的
    let conversation = currentConversation;
    if (!conversation) {
      const title = language === "zh" ? "新对话" : "New Conversation";
      conversation = {
        id: Date.now(),
        title,
        model: "gpt4",
        messageCount: 0,
      };
      setCurrentConversation(conversation);
      setConversations([conversation]);
    }

    const userMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageContent = inputValue;
    setInputValue("");
    setPredictedModel(null);
    setIsLoading(true);

    try {
      // 使用自动选择或用户手动选择的模型
      const finalModel = autoSelectMode ? (predictedModel?.model || selectedModel) : selectedModel;
      
      // 验证模型名称
      const validModels = ["gpt4", "claude", "gemini", "deepseek", "qwen", "doubao", "kimi", "glm", "grok"];
      if (!validModels.includes(finalModel)) {
        console.error(`Invalid model: ${finalModel}`);
        setIsLoading(false);
        return;
      }
      
      const updatedConversation = { ...conversation, model: finalModel };
      setCurrentConversation(updatedConversation);
      setConversations((prev) => 
        prev.map((c) => c.id === conversation.id ? updatedConversation : c)
      );

      // 调用后端 uvsAi 路由获取真实响应，传递地域信息
      const response = await sendMessageMutation.mutateAsync({
        message: messageContent,
        conversationHistory: messages.map(m => ({ role: m.role, content: m.content })),
        selectedModel: finalModel as any,
        autoSelectMode,
        isMainlandRegion, // 传递地域信息用于自动切换
      });

      const modelName = MODELS[finalModel as keyof typeof MODELS]?.name || finalModel;
      const assistantMessage: Message = {
        role: "assistant",
        content: response.response,
        timestamp: new Date(),
        model: finalModel,
        contentType: (response.contentType === "file" ? "text" : response.contentType) as "text" | "image" | "video" | "code" | "analysis" | undefined,
        modelSelectionReason: response.intentAnalysis?.reasoning || "Auto-selected",
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      // 更新对话计数
      const updatedConversation2 = { ...updatedConversation, messageCount: messages.length + 2 };
      setCurrentConversation(updatedConversation2);
      setConversations((prev) =>
        prev.map((c) => c.id === conversation.id ? updatedConversation2 : c)
      );
    } catch (error) {
      console.error("发送消息失败:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: language === "zh" 
          ? `错误: ${error instanceof Error ? error.message : "未知错误"}` 
          : `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 删除对话
  const handleDeleteConversation = (id: number) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (currentConversation?.id === id) {
      setCurrentConversation(null);
      setMessages([]);
    }
  };

  // 复制消息
  const handleCopyMessage = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* 侧边栏 */}
      <div className={`${sidebarOpen ? "w-64" : "w-0"} bg-card border-r border-border transition-all duration-300 flex flex-col overflow-hidden`}>
        <div className="p-4 border-b border-border">
          <Button onClick={handleNewConversation} className="w-full gap-2">
            <Plus className="w-4 h-4" />
            {language === "zh" ? "新对话" : "New Chat"}
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setCurrentConversation(conv)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                currentConversation?.id === conv.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-background hover:bg-muted"
              }`}
            >
              <div className="text-sm font-medium truncate">{conv.title}</div>
              <div className="text-xs opacity-70">{MODELS[conv.model as keyof typeof MODELS]?.name || conv.model}</div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border space-y-2">
          <LanguageSwitcher />
          {isAuthenticated && (
            <Button
              onClick={() => logout()}
              variant="outline"
              className="w-full gap-2"
              size="sm"
            >
              <LogOut className="w-4 h-4" />
              {language === "zh" ? "退出登录" : "Logout"}
            </Button>
          )}
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部栏 */}
        <div className="border-b border-border bg-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              variant="ghost"
              size="icon"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div>
              <h1 className="text-lg font-bold">UVS AI Chat</h1>
              <p className="text-sm text-muted-foreground">
                {isMainlandRegion ? "🇨🇳 中国大陆模式" : "🌍 国际模式"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span className="text-sm">{messages.length} {language === "zh" ? "条消息" : "messages"}</span>
          </div>
        </div>

        {/* 消息区 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Zap className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">{language === "zh" ? "开始对话" : "Start a conversation"}</p>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <Card
                  className={`max-w-2xl p-4 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {msg.model && (
                    <div className="text-xs opacity-70 mb-2">
                      {MODELS[msg.model as keyof typeof MODELS]?.name || msg.model}
                    </div>
                  )}
                  <p className="text-sm">{msg.content}</p>
                  {msg.role === "assistant" && (
                    <Button
                      onClick={() => handleCopyMessage(`msg-${idx}`, msg.content)}
                      variant="ghost"
                      size="sm"
                      className="mt-2 gap-1"
                    >
                      {copiedId === `msg-${idx}` ? (
                        <>
                          <Check className="w-3 h-3" />
                          {language === "zh" ? "已复制" : "Copied"}
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          {language === "zh" ? "复制" : "Copy"}
                        </>
                      )}
                    </Button>
                  )}
                </Card>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 输入区 */}
        <div className="border-t border-border bg-card p-4">
          <div className="space-y-3">
            {/* 模型选择 */}
            <div className="flex items-center gap-2 flex-wrap">
              <label className="text-sm font-medium">{language === "zh" ? "模型:" : "Model:"}</label>
              <div className="flex gap-2 flex-wrap">
                {autoSelectMode ? (
                  <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm">{predictedModel?.model ? MODELS[predictedModel.model as keyof typeof MODELS]?.name : "自动选择"}</span>
                    <span className="text-xs text-muted-foreground">({predictedModel?.confidence.toFixed(0)}%)</span>
                  </div>
                ) : (
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="px-3 py-1 rounded border border-border bg-background text-sm"
                  >
                    {Object.entries(MODELS).map(([key, model]) => (
                      <option key={key} value={key}>{model.name}</option>
                    ))}
                  </select>
                )}
              </div>
              <Button
                onClick={() => setAutoSelectMode(!autoSelectMode)}
                variant={autoSelectMode ? "default" : "outline"}
                size="sm"
              >
                {language === "zh" ? (autoSelectMode ? "自动" : "手动") : (autoSelectMode ? "Auto" : "Manual")}
              </Button>
            </div>

            {/* 输入框 */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={language === "zh" ? "输入消息..." : "Type a message..."}
                className="flex-1 px-4 py-2 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="gap-2"
              >
                <Send className="w-4 h-4" />
                {language === "zh" ? "发送" : "Send"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
