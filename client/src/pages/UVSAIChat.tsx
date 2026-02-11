import { motion, AnimatePresence } from "framer-motion";
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
    /news|current|today|latest|real-time|trending|recent|breaking|update|happening|live|now/i,
    /weather|stock|price|market|rate|exchange|crypto|bitcoin|ethereum|sports|politics|election/i,
  ];
  if (realtimePatterns.some((p) => p.test(input))) {
    scores["grok"] += 8;
  }

  // 长上下文和文档分析 - Kimi (权重: 7)
  const longContextPatterns = [
    /long|context|memory|remember|previous|history|conversation|thread|summarize|recap/i,
    /review|reference|mention|earlier|before|book|novel|document|file|transcript|pdf|article/i,
  ];
  if (longContextPatterns.some((p) => p.test(input))) {
    scores["kimi"] += 7;
  }

  // 推理和问题解决 - DeepSeek (权重: 8)
  const reasoningPatterns = [
    /reason|logic|solve|problem|complex|think|debug|error|troubleshoot|why|how|explain/i,
    /step|process|method|approach|strategy|plan|algorithm|proof|theorem|mathematical/i,
  ];
  if (reasoningPatterns.some((p) => p.test(input))) {
    scores["deepseek"] += 8;
  }

  // 数据分析 - DeepSeek (权重: 7)
  const dataPatterns = [
    /data|analysis|statistics|metric|trend|pattern|insight|correlation|regression|cluster/i,
    /table|spreadsheet|database|query|sql|aggregate|group|sort|visualization|histogram|scatter|plot/i,
  ];
  if (dataPatterns.some((p) => p.test(input))) {
    scores["deepseek"] += 7;
  }

  // 文本分析和学术 - Claude (权重: 8)
  const textPatterns = [
    /analyze|summary|document|article|research|academic|paper|essay|report|writing|content/i,
    /grammar|spelling|punctuation|style|tone|sentiment|emotion|writing|prose|poetry|literature/i,
    /translate|language|linguistic|semantic|etymology|phonetic/i,
  ];
  if (textPatterns.some((p) => p.test(input))) {
    scores["claude"] += 8;
  }

  // 创意和故事 - Claude (权重: 7)
  const creativePatterns = [
    /story|fiction|creative|imagine|write|compose|poem|song|dialogue|character|plot/i,
    /brainstorm|idea|concept|design|brand|marketing|campaign|slogan|tagline/i,
  ];
  if (creativePatterns.some((p) => p.test(input))) {
    scores["claude"] += 7;
  }

  // 计算总分并排序
  const sortedModels = Object.entries(scores)
    .map(([model, score]) => ({ model, score }))
    .sort((a, b) => b.score - a.score);

  const topModel = sortedModels[0];
  const maxScore = Math.max(...Object.values(scores));
  const confidence = maxScore > 0 ? Math.min(100, (maxScore / 10) * 100) : 50;

  // 确定选择原因
  let reason = "Default model";
  if (topModel.score > 0) {
    if (topModel.model === "gpt-4" && scores["gpt-4"] > 0) {
      reason = "Optimized for code and programming";
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
    model: topModel.model || "gpt-4",
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
  const [selectedModel, setSelectedModel] = useState<string>("gpt-4");
  const [predictedModel, setPredictedModel] = useState<{model: string; reason: string; confidence: number} | null>(null);
  const [autoSelectMode, setAutoSelectMode] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // tRPC 调用
  const sendMessageMutation = trpc.uvsAi.sendMessage.useMutation();

  // 检查认证
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation(language === "zh" ? "/zh/login" : "/en/login");
    } else if (!currentConversation) {
      // 自动创建第一个对话
      const title = language === "zh" ? "新对话" : "New Conversation";
      const newConversation: Conversation = {
        id: Date.now(),
        title,
        model: "gpt-4",
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

      // 调用后端 uvsAi 路由获取真实响应
      const response = await sendMessageMutation.mutateAsync({
        message: messageContent,
        conversationHistory: messages.map(m => ({ role: m.role, content: m.content })),
        selectedModel: finalModel as any,
        autoSelectMode,
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

      // 生成推荐追问
      const suggestions = generateSuggestedQuestions(messageContent, (language === "zh" ? "zh" : "en") as "zh" | "en");
      setSuggestedQuestions(suggestions);
    } catch (error) {
      console.error("发送消息失败:", error);
      // 显示错误消息
      const errorMessage: Message = {
        role: "assistant",
        content: language === "zh" ? "抱歉，发送消息失败。请稍后重试。" : "Sorry, failed to send message. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 复制消息
  const handleCopyMessage = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 删除对话
  const handleDeleteConversation = (id: number) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (currentConversation?.id === id) {
      setCurrentConversation(null);
      setMessages([]);
    }
  };

  // 清空对话
  const handleClearMessages = () => {
    setMessages([]);
    setSuggestedQuestions([]);
  };

  // 生成推荐追问（简化版）
  function generateSuggestedQuestions(input: string, lang: "zh" | "en"): string[] {
    if (lang === "zh") {
      return ["能否详细解释？", "还有其他方法吗？", "如何应用到实际中？"];
    } else {
      return ["Can you explain in detail?", "Are there other approaches?", "How to apply in practice?"];
    }
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* 侧边栏 */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-64 bg-card border-r border-border flex flex-col"
          >
            {/* 新对话按钮 */}
            <div className="p-4 border-b border-border">
              <Button
                onClick={handleNewConversation}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                {language === "zh" ? "新对话" : "New Chat"}
              </Button>
            </div>

            {/* 对话列表 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`p-3 rounded-lg cursor-pointer transition ${
                    currentConversation?.id === conv.id
                      ? "bg-purple-600 text-white"
                      : "bg-background hover:bg-card"
                  }`}
                  onClick={() => setCurrentConversation(conv)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate">{conv.title}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteConversation(conv.id);
                      }}
                      className="text-xs opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 用户信息和登出 */}
            <div className="p-4 border-t border-border">
              {user && (
                <div className="text-xs text-muted-foreground mb-3">
                  {user.name || user.email}
                </div>
              )}
              <Button
                onClick={logout}
                variant="outline"
                className="w-full"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {language === "zh" ? "登出" : "Logout"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 主对话区域 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部导航栏 */}
        <div className="border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-card rounded-lg"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-lg font-semibold">
              {currentConversation?.title || (language === "zh" ? "新对话" : "New Conversation")}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={handleClearMessages}
              className="p-2 hover:bg-card rounded-lg"
              title={language === "zh" ? "清空对话" : "Clear chat"}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 消息区域 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Zap className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                {language === "zh" ? "开始对话，让 AI 帮助你" : "Start chatting with AI"}
              </p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <Card
                  className={`max-w-2xl p-4 ${
                    msg.role === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-card text-foreground"
                  }`}
                >
                  <div className="text-sm">{msg.content}</div>
                  {msg.model && msg.role === "assistant" && (
                    <div className="text-xs opacity-70 mt-2">
                      {MODELS[msg.model as keyof typeof MODELS]?.icon} {MODELS[msg.model as keyof typeof MODELS]?.name || msg.model}
                    </div>
                  )}
                  {msg.role === "assistant" && (
                    <button
                      onClick={() => handleCopyMessage(msg.content, `msg-${idx}`)}
                      className="text-xs opacity-70 hover:opacity-100 mt-2 flex items-center gap-1"
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
                    </button>
                  )}
                </Card>
              </motion.div>
            ))
          )}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <Card className="bg-card p-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </Card>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 推荐追问 */}
        {suggestedQuestions.length > 0 && (
          <div className="px-4 py-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">
              {language === "zh" ? "推荐追问" : "Suggested Questions"}
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setInputValue(q)}
                  className="text-xs px-3 py-1 rounded-full bg-card hover:bg-purple-600/20 border border-border transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 模型选择和输入区域 */}
        <div className="border-t border-border p-4 space-y-3">
          {/* 模型选择控制 */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoSelectMode(!autoSelectMode)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                autoSelectMode
                  ? "bg-purple-600 text-white"
                  : "bg-card border border-border text-foreground"
              }`}
            >
              <Sparkles className="w-3 h-3 inline mr-1" />
              {language === "zh" ? "智能选择" : "Auto Select"}
            </button>
            
            {/* 模型选择下拉 */}
            {!autoSelectMode && (
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="px-3 py-1 rounded-lg text-xs bg-card border border-border text-foreground"
              >
                {Object.entries(MODELS).map(([key, model]) => (
                  <option key={key} value={key}>{model.name}</option>
                ))}
              </select>
            )}

            {/* 预测模型显示 */}
            {autoSelectMode && predictedModel && (
              <div className="flex-1 flex items-center gap-2 px-3 py-1 rounded-lg bg-card border border-border">
                <Sparkles className="w-3 h-3 text-yellow-500" />
                <span className="text-xs">
                  {language === "zh" ? "推荐: " : "Suggested: "}
                  <strong>{MODELS[predictedModel.model as keyof typeof MODELS]?.name}</strong>
                </span>
                <span className="text-xs text-muted-foreground">
                  ({Math.round(predictedModel.confidence)}%)
                </span>
              </div>
            )}
          </div>

          {/* 模型选择原因提示 */}
          {autoSelectMode && predictedModel && inputValue.trim() && (
            <div className="text-xs text-muted-foreground px-3 py-2 rounded-lg bg-card/50 border border-border/50">
              💡 {predictedModel.reason}
            </div>
          )}

          {/* 输入框 */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={language === "zh" ? "输入消息..." : "Type a message..."}
              className="flex-1 px-4 py-2 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
