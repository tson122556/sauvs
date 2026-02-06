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
  contentType?: "text" | "image" | "video" | "code" | "analysis";
  url?: string;
  metadata?: Record<string, any>;
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

// 优化的多模态模型选择算法
function getOptimalModel(input: string): string {
  // 代码和编程 - GPT-4
  const codePatterns = [/```/, /function|class|def|const|let|var|import|export/, /=>|async|await|try|catch/i];
  if (codePatterns.some((p) => p.test(input))) {
    return "gpt-4";
  }

  // 多模态内容 - Gemini (图片、视频、设计)
  const imagePatterns = [
    /image|photo|picture|visual|diagram|chart|graph|design|ui|ux|screenshot|icon|logo/i,
    /pixel|resolution|dpi|rgba|color|hue|saturation|brightness/i,
  ];
  const videoPatterns = [
    /video|movie|film|animation|streaming|frame|fps|codec|subtitle/i,
    /youtube|vimeo|mp4|webm|avi|mov|mkv|edit|cut|trim|transition|effect|render/i,
  ];
  if (imagePatterns.some((p) => p.test(input)) || videoPatterns.some((p) => p.test(input))) {
    return "gemini";
  }

  // 实时信息 - Grok
  const realtimePatterns = [
    /news|current|today|latest|real-time|trending|recent|breaking|update/i,
    /weather|stock|price|market|rate|exchange|live|happening|now|this week/i,
  ];
  if (realtimePatterns.some((p) => p.test(input))) {
    return "grok";
  }

  // 长上下文 - Kimi
  const longContextPatterns = [
    /long|context|memory|remember|previous|history|conversation|thread/i,
    /summarize|recap|review|reference|mention|earlier|before|book|novel|document|file|transcript/i,
  ];
  if (longContextPatterns.some((p) => p.test(input))) {
    return "kimi";
  }

  // 推理和问题解决 - DeepSeek
  const reasoningPatterns = [
    /reason|logic|solve|problem|complex|think|debug|error|troubleshoot/i,
    /step|process|method|approach|strategy|plan|algorithm/i,
  ];
  if (reasoningPatterns.some((p) => p.test(input))) {
    return "deepseek";
  }

  // 数据分析 - DeepSeek
  const dataPatterns = [
    /data|analysis|statistics|metric|trend|pattern|insight|correlation/i,
    /table|spreadsheet|database|query|sql|aggregate|group|sort|visualization|histogram|scatter/i,
  ];
  if (dataPatterns.some((p) => p.test(input))) {
    return "deepseek";
  }

  // 文本分析和学术 - Claude
  const textPatterns = [
    /analyze|summary|document|article|research|academic|paper|essay|report/i,
    /grammar|spelling|punctuation|style|tone|sentiment|emotion|writing/i,
    /translate|language|linguistic|semantic/i,
  ];
  if (textPatterns.some((p) => p.test(input))) {
    return "claude";
  }

  // 默认使用 GPT-4
  return "gpt-4";
}

import { useState, useRef, useEffect } from "react";

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
  const [selectedContentType, setSelectedContentType] = useState<"text" | "image" | "video" | "code" | "analysis" | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 检查认证
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation(language === "zh" ? "/zh/login" : "/en/login");
    }
  }, [isAuthenticated, language, setLocation]);

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 创建新对话
  const handleNewConversation = async () => {
    const title = language === "zh" ? "新对话" : "New Conversation";
    const model = "gpt-4";

    setCurrentConversation({
      id: Date.now(),
      title,
      model,
      messageCount: 0,
    });
    setMessages([]);
    setInputValue("");
    setSuggestedQuestions([]);
  };

  // 发送消息
  const handleSendMessage = async () => {
    if (!inputValue.trim() || !currentConversation) return;

    const userMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // 自动选择最优模型
      const optimalModel = getOptimalModel(inputValue);
      const updatedConversation = { ...currentConversation, model: optimalModel };
      setCurrentConversation(updatedConversation);

      // 模拟 AI 响应
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const assistantMessage: Message = {
        role: "assistant",
        content: `这是来自 ${MODELS[optimalModel as keyof typeof MODELS]?.name || optimalModel} 的响应。您的问题："${inputValue}"`,
        timestamp: new Date(),
        model: optimalModel,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // 生成推荐追问
      const suggestions = generateSuggestedQuestions(inputValue, (language === "zh" ? "zh" : "en") as "zh" | "en");
      setSuggestedQuestions(suggestions);
    } catch (error) {
      console.error("发送消息失败:", error);
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
                      : "bg-background hover:bg-accent"
                  }`}
                  onClick={() => setCurrentConversation(conv)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 truncate">
                      <p className="font-medium truncate">{conv.title}</p>
                      <p className="text-xs opacity-70">{MODELS[conv.model as keyof typeof MODELS]?.name}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteConversation(conv.id);
                      }}
                      className="p-1 hover:bg-red-600 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 用户信息 */}
            <div className="p-4 border-t border-border space-y-2">
              <p className="text-sm text-muted-foreground">{user?.email}</p>
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

      {/* 主聊天区域 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部栏 */}
        <div className="border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-accent rounded-lg"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            {currentConversation && (
              <div>
                <h1 className="text-lg font-semibold">{currentConversation.title}</h1>
                <p className="text-sm text-muted-foreground">
                  {language === "zh" ? "当前模型：" : "Current Model: "}
                  <span className={`bg-gradient-to-r ${MODELS[currentConversation.model as keyof typeof MODELS]?.color || "from-gray-500 to-gray-600"} bg-clip-text text-transparent font-bold`}>
                    {MODELS[currentConversation.model as keyof typeof MODELS]?.name}
                  </span>
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={handleClearMessages}
              className="p-2 hover:bg-accent rounded-lg"
              title={language === "zh" ? "清空对话" : "Clear chat"}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 消息区域 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Zap className="w-12 h-12 text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">
                {language === "zh" ? "开始对话" : "Start Chatting"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {language === "zh"
                  ? "输入您的问题，AI 将自动选择最优模型为您服务"
                  : "Type your question and AI will automatically select the best model"}
              </p>
            </div>
          ) : (
            <>
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
                        ? "bg-purple-600 text-white"
                        : "bg-card text-foreground"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        {msg.contentType && msg.contentType !== "text" && (
                          <div className="mb-2">
                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-gradient-to-r from-purple-500 to-cyan-500 text-white">
                              {msg.contentType.toUpperCase()}
                            </span>
                          </div>
                        )}
                        <p className="text-sm mb-2">{msg.content}</p>
                        {msg.contentType === "image" && msg.url && (
                          <img
                            src={msg.url}
                            alt="Generated image"
                            className="max-w-full h-auto rounded-lg mb-2 max-h-96"
                          />
                        )}
                        {msg.contentType === "video" && msg.url && (
                          <video
                            src={msg.url}
                            controls
                            className="max-w-full h-auto rounded-lg mb-2 max-h-96"
                          />
                        )}
                        {msg.contentType === "code" && (
                          <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto text-xs mb-2">
                            <code>{msg.content}</code>
                          </pre>
                        )}
                        {msg.model && (
                          <p className="text-xs opacity-70 mt-2">
                            {MODELS[msg.model as keyof typeof MODELS]?.name}
                          </p>
                        )}
                      </div>
                      {msg.role === "assistant" && (
                        <button
                          onClick={() => handleCopyMessage(msg.content, `msg-${idx}`)}
                          className="p-1 hover:bg-accent rounded flex-shrink-0"
                        >
                          {copiedId === `msg-${idx}` ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
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
                  <Card className="bg-card p-4">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-200" />
                    </div>
                  </Card>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* 推荐追问 */}
        {suggestedQuestions.length > 0 && messages.length > 0 && (
          <SuggestedQuestions
            questions={suggestedQuestions}
            onSelectQuestion={(question: string) => {
              setInputValue(question);
            }}
            language={language as "zh" | "en"}
          />
        )}

        {/* 内容类型选择 */}
        <div className="border-t border-border px-6 py-3 bg-card/50">
          <p className="text-xs text-muted-foreground mb-2">
            {language === "zh" ? "生成内容类型：" : "Content Type:"}
          </p>
          <div className="flex gap-2 flex-wrap">
            {(["text", "image", "video", "code", "analysis"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedContentType(selectedContentType === type ? null : type)}
                className={`px-3 py-1 text-xs rounded-full transition ${
                  selectedContentType === type
                    ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* 输入区域 */}
        <div className="border-t border-border p-6 space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={language === "zh" ? "输入您的问题..." : "Type your question..."}
              className="flex-1 bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            {language === "zh"
              ? "💡 提示：输入不同类型的问题，AI 会自动为您选择最优模型。支持生成文本、图片、视频、代码等内容"
              : "💡 Tip: Ask different types of questions and AI will automatically select the best model. Supports generating text, images, videos, code and more"}
          </p>
        </div>
      </div>
    </div>
  );
}
