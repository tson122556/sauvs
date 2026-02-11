import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: string;
  type: "user" | "agent";
  content: string;
  timestamp: Date;
  avatar?: string;
}

interface WindowSize {
  width: number;
  height: number;
}

const DEFAULT_SIZE: WindowSize = { width: 384, height: 384 };
const MIN_SIZE: WindowSize = { width: 300, height: 300 };
const MAX_SIZE: WindowSize = { width: 800, height: 600 };
const STORAGE_KEY = "customer_service_window_size";

export default function CustomerService() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [windowSize, setWindowSize] = useState<WindowSize>(DEFAULT_SIZE);
  const [isResizing, setIsResizing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "agent",
      content:
        language === "zh"
          ? "您好！欢迎咨询极紫星智慧科技。我是 AI 客服助手，有什么可以帮助您的吗？"
          : "Hello! Welcome to UVS Smart Technology. I am an AI customer service assistant. How can I help you?",
      timestamp: new Date(),
      avatar: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/uAJQYgErxzlvdMug.png",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  // 调用 AI 客服 API
  const sendMessageMutation = trpc.customerService.sendMessage.useMutation();

  // 从 localStorage 加载窗口大小
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const size = JSON.parse(saved);
        setWindowSize(size);
      } catch (e) {
        console.error("Failed to load window size:", e);
      }
    }
  }, []);

  // 保存窗口大小到 localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(windowSize));
  }, [windowSize]);

  // 处理鼠标移动时的缩放
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !windowRef.current) return;

      const rect = windowRef.current.getBoundingClientRect();
      const newWidth = Math.max(MIN_SIZE.width, Math.min(MAX_SIZE.width, e.clientX - rect.left));
      const newHeight = Math.max(MIN_SIZE.height, Math.min(MAX_SIZE.height, e.clientY - rect.top));

      setWindowSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isResizing]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // 构建对话历史（去除 avatar 和 timestamp）
      const conversationHistory = messages
        .filter((msg) => msg.type !== "agent" || msg.id !== "1") // 排除初始问候
        .map((msg) => ({
          role: msg.type === "user" ? ("user" as const) : ("assistant" as const),
          content: msg.content,
        }));

      // 调用 AI 客服 API
      const response = await sendMessageMutation.mutateAsync({
        message: inputValue,
        conversationHistory,
        language: language === "zh" ? "zh" : "en",
      });

      if (response.success) {
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "agent",
          content: typeof response.message === "string" ? response.message : "",
          timestamp: new Date(),
          avatar:
            "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/uAJQYgErxzlvdMug.png",
        };
        setMessages((prev) => [...prev, agentMessage]);
      } else {
        // 显示错误消息
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "agent",
          content: typeof response.message === "string" ? response.message : "",
          timestamp: new Date(),
          avatar:
            "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/uAJQYgErxzlvdMug.png",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content:
          language === "zh"
            ? "抱歉，服务暂时不可用。请稍后重试。"
            : "Sorry, the service is temporarily unavailable. Please try again later.",
        timestamp: new Date(),
        avatar:
          "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/uAJQYgErxzlvdMug.png",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        type: "agent",
        content:
          language === "zh"
            ? "您好！欢迎咨询极紫星智慧科技。我是 AI 客服助手，有什么可以帮助您的吗？"
            : "Hello! Welcome to UVS Smart Technology. I am an AI customer service assistant. How can I help you?",
        timestamp: new Date(),
        avatar:
          "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/uAJQYgErxzlvdMug.png",
      },
    ]);
  };

  return (
    <>
      {/* Customer Service Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
            title={language === "zh" ? "在线客服" : "Customer Service"}
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={windowRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50"
            style={{
              width: `${windowSize.width}px`,
              height: `${windowSize.height}px`,
              cursor: isResizing ? "nwse-resize" : "default",
            }}
          >
            <Card className="bg-slate-900 border-purple-500/30 shadow-2xl flex flex-col h-full">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white p-4 flex items-center justify-between rounded-t-lg flex-shrink-0">
                <div>
                  <h3 className="font-bold text-lg">
                    {language === "zh" ? "AI 客服助手" : "AI Customer Service"}
                  </h3>
                  <p className="text-sm text-purple-100">
                    {language === "zh"
                      ? "由 GPT-4 驱动"
                      : "Powered by GPT-4"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearChat}
                    className="hover:bg-white/20 p-1 rounded transition text-xs"
                    title={language === "zh" ? "清空对话" : "Clear chat"}
                  >
                    {language === "zh" ? "清空" : "Clear"}
                  </button>
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="hover:bg-white/20 p-1 rounded transition"
                  >
                    {isMinimized ? (
                      <Maximize2 className="w-4 h-4" />
                    ) : (
                      <Minimize2 className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-white/20 p-1 rounded transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              {!isMinimized && (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${
                          message.type === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`flex gap-2 max-w-xs ${
                            message.type === "user" ? "flex-row-reverse" : ""
                          }`}
                        >
                          {message.avatar && message.type === "agent" && (
                            <img
                              src={message.avatar}
                              alt="Agent"
                              className="w-8 h-8 rounded-full"
                            />
                          )}
                          <div
                            className={`px-4 py-2 rounded-lg ${
                              message.type === "user"
                                ? "bg-purple-600 text-white rounded-br-none"
                                : "bg-slate-700 text-gray-100 rounded-bl-none"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <span className="text-xs opacity-70 mt-1 block">
                              {message.timestamp.toLocaleTimeString(
                                language === "zh" ? "zh-CN" : "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-slate-700 text-gray-100 px-4 py-2 rounded-lg rounded-bl-none">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="border-t border-slate-700 p-4 flex gap-2 flex-shrink-0">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                      placeholder={
                        language === "zh"
                          ? "输入您的问题..."
                          : "Type your question..."
                      }
                      className="flex-1 bg-slate-800 text-white px-3 py-2 rounded border border-slate-600 focus:border-purple-500 outline-none transition"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={isLoading || !inputValue.trim()}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      size="sm"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}

              {/* Resize Handle */}
              <div
                ref={resizeRef}
                onMouseDown={() => setIsResizing(true)}
                className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize hover:bg-purple-500/30 rounded-tl-lg transition"
                title={language === "zh" ? "拖动调整窗口大小" : "Drag to resize"}
              >
                <div className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-purple-400 opacity-60" />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
