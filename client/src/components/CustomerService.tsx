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
  contentType?: "text" | "code" | "image" | "analysis";
  imageUrl?: string;
}

interface WindowSize {
  width: number;
  height: number;
}

interface WindowPosition {
  x: number;
  y: number;
}

type ResizeDirection =
  | "n"
  | "s"
  | "e"
  | "w"
  | "ne"
  | "nw"
  | "se"
  | "sw"
  | null;

const DEFAULT_SIZE: WindowSize = { width: 384, height: 384 };
const MIN_SIZE: WindowSize = { width: 300, height: 300 };
const MAX_SIZE: WindowSize = { width: 800, height: 600 };
const STORAGE_KEY_SIZE = "customer_service_window_size";
const STORAGE_KEY_POS = "customer_service_window_pos";

export default function CustomerService() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [windowSize, setWindowSize] = useState<WindowSize>(DEFAULT_SIZE);
  const [windowPos, setWindowPos] = useState<WindowPosition>({
    x: typeof window !== "undefined" ? window.innerWidth - 400 : 0,
    y: typeof window !== "undefined" ? window.innerHeight - 450 : 0,
  });
  const [resizeDirection, setResizeDirection] = useState<ResizeDirection>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "agent",
      content:
        language === "zh"
          ? "您好！欢迎咨询极紫星智慧科技。我是 AI 紫星，有什么可以帮助您的吗？"
          : "Hello! Welcome to UVS Smart Technology. I am AI VS. How can I help you?",
      timestamp: new Date(),
      avatar: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/uAJQYgErxzlvdMug.png",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [contentType, setContentType] = useState<"text" | "code" | "image" | "analysis">("text");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // 调用 AI 客服 API
  const sendMessageMutation = trpc.customerService.sendMessage.useMutation();
  const generateImageMutation = trpc.customerService.generateImage.useMutation();
  const generateCodeMutation = trpc.customerService.generateCode.useMutation();
  const analyzeContentMutation = trpc.customerService.analyzeContent.useMutation();

  // 从 localStorage 加载窗口大小和位置
  useEffect(() => {
    const savedSize = localStorage.getItem(STORAGE_KEY_SIZE);
    if (savedSize) {
      try {
        const size = JSON.parse(savedSize);
        setWindowSize(size);
      } catch (e) {
        console.error("Failed to load window size:", e);
      }
    }

    const savedPos = localStorage.getItem(STORAGE_KEY_POS);
    if (savedPos) {
      try {
        const pos = JSON.parse(savedPos);
        setWindowPos(pos);
      } catch (e) {
        console.error("Failed to load window position:", e);
      }
    }
  }, []);

  // 保存窗口大小到 localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SIZE, JSON.stringify(windowSize));
  }, [windowSize]);

  // 保存窗口位置到 localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_POS, JSON.stringify(windowPos));
  }, [windowPos]);

  // 处理标题栏拖动
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !windowRef.current) return;

      let newX = e.clientX - dragOffset.x;
      let newY = e.clientY - dragOffset.y;

      // 防止窗口拖出屏幕外
      newX = Math.max(0, Math.min(newX, window.innerWidth - windowSize.width));
      newY = Math.max(0, Math.min(newY, window.innerHeight - windowSize.height));

      setWindowPos({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset, windowSize.width, windowSize.height]);

  // 处理鼠标移动时的缩放
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizeDirection || !windowRef.current) return;

      const rect = windowRef.current.getBoundingClientRect();
      const deltaX = e.clientX - rect.left;
      const deltaY = e.clientY - rect.top;

      let newWidth = windowSize.width;
      let newHeight = windowSize.height;
      let newX = windowPos.x;
      let newY = windowPos.y;

      // 处理水平方向调整
      if (resizeDirection.includes("e")) {
        newWidth = Math.max(MIN_SIZE.width, Math.min(MAX_SIZE.width, deltaX));
      } else if (resizeDirection.includes("w")) {
        const diff = rect.width - deltaX;
        if (diff >= MIN_SIZE.width && diff <= MAX_SIZE.width) {
          newWidth = diff;
          newX = e.clientX;
        }
      }

      // 处理垂直方向调整
      if (resizeDirection.includes("s")) {
        newHeight = Math.max(MIN_SIZE.height, Math.min(MAX_SIZE.height, deltaY));
      } else if (resizeDirection.includes("n")) {
        const diff = rect.height - deltaY;
        if (diff >= MIN_SIZE.height && diff <= MAX_SIZE.height) {
          newHeight = diff;
          newY = e.clientY;
        }
      }

      setWindowSize({ width: newWidth, height: newHeight });
      setWindowPos({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setResizeDirection(null);
    };

    if (resizeDirection) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [resizeDirection, windowSize, windowPos]);

  const handleHeaderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // 不要在按钮上拖动
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }

    if (headerRef.current && windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

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
      contentType: contentType,
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageText = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      let response: any;

      if (contentType === "image") {
        // 生成图像
        response = await generateImageMutation.mutateAsync({
          prompt: messageText,
          language: language === "zh" ? "zh" : "en",
        });
      } else if (contentType === "code") {
        // 生成代码
        response = await generateCodeMutation.mutateAsync({
          requirement: messageText,
          language: language === "zh" ? "zh" : "en",
          programmingLanguage: "javascript",
        });
      } else if (contentType === "analysis") {
        // 深度分析
        response = await analyzeContentMutation.mutateAsync({
          content: messageText,
          language: language === "zh" ? "zh" : "en",
          analysisType: "comprehensive",
        });
      } else {
        // 普通对话
        const conversationHistory = messages
          .filter((msg) => msg.type !== "agent" || msg.id !== "1")
          .map((msg) => ({
            role: msg.type === "user" ? ("user" as const) : ("assistant" as const),
            content: msg.content,
          }));

        response = await sendMessageMutation.mutateAsync({
          message: messageText,
          conversationHistory,
          language: language === "zh" ? "zh" : "en",
          contentType: contentType,
        });
      }

      if (response.success) {
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "agent",
          content: response.message || response.code || response.analysis || "",
          timestamp: new Date(),
          avatar:
            "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/uAJQYgErxzlvdMug.png",
          contentType: contentType,
          imageUrl: response.imageUrl,
        };
        setMessages((prev) => [...prev, agentMessage]);
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "agent",
          content: response.message || (language === "zh" ? "请求失败" : "Request failed"),
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
            ? "您好！欢迎咨询极紫星智慧科技。我是 AI 紫星，有什么可以帮助您的吗？"
            : "Hello! Welcome to UVS Smart Technology. I am AI Zixing. How can I help you?",
        timestamp: new Date(),
        avatar:
          "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/uAJQYgErxzlvdMug.png",
      },
    ]);
  };

  const getResizeCursor = (direction: ResizeDirection): string => {
    if (!direction) return "default";
    const cursorMap: Record<string, string> = {
      n: "ns-resize",
      s: "ns-resize",
      e: "ew-resize",
      w: "ew-resize",
      ne: "nesw-resize",
      nw: "nwse-resize",
      se: "nwse-resize",
      sw: "nesw-resize",
    };
    return cursorMap[direction] || "default";
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
            title={language === "zh" ? "AI 紫星" : "AI Zixing"}
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
            className="fixed z-50"
            style={{
              width: `${windowSize.width}px`,
              height: `${windowSize.height}px`,
              left: `${windowPos.x}px`,
              top: `${windowPos.y}px`,
              cursor: isDragging ? "grabbing" : getResizeCursor(resizeDirection),
            }}
          >
            <Card className="bg-slate-900 border-purple-500/30 shadow-2xl flex flex-col h-full relative">
              {/* Header - Draggable */}
              <div
                ref={headerRef}
                onMouseDown={handleHeaderMouseDown}
                className={`bg-gradient-to-r from-purple-600 to-cyan-600 text-white p-4 flex items-center justify-between rounded-t-lg flex-shrink-0 ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
              >
                <div>
                  <h3 className="font-bold text-lg">
                    {language === "zh" ? "AI 紫星" : "AI VS"}
                  </h3>
                  <p className="text-sm text-purple-100">
                    {language === "zh"
                      ? "由极紫星智慧引擎驱动"
                      : "Powered by UVS Smart Engine"}
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
                            className={`px-4 py-2 rounded-lg max-w-sm ${
                              message.type === "user"
                                ? "bg-purple-600 text-white rounded-br-none"
                                : "bg-slate-700 text-gray-100 rounded-bl-none"
                            }`}
                          >
                            {message.imageUrl && (
                              <img
                                src={message.imageUrl}
                                alt="Generated"
                                className="w-full rounded mb-2 max-h-48 object-cover"
                              />
                            )}
                            {message.contentType === "code" ? (
                              <pre className="text-xs overflow-auto bg-slate-800 p-2 rounded mb-2">
                                <code>{message.content}</code>
                              </pre>
                            ) : (
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            )}
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

                  {/* Content Type Selector */}
                  <div className="border-t border-slate-700 p-2 flex gap-1 flex-shrink-0 flex-wrap">
                    {[
                      { type: "text" as const, label: language === "zh" ? "对话" : "Chat" },
                      { type: "code" as const, label: language === "zh" ? "代码" : "Code" },
                      { type: "image" as const, label: language === "zh" ? "图像" : "Image" },
                      { type: "analysis" as const, label: language === "zh" ? "分析" : "Analysis" },
                    ].map((item) => (
                      <button
                        key={item.type}
                        onClick={() => setContentType(item.type)}
                        className={`px-2 py-1 text-xs rounded transition ${
                          contentType === item.type
                            ? "bg-purple-600 text-white"
                            : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
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
                          ? contentType === "code"
                            ? "输入代码需求..."
                            : contentType === "image"
                            ? "输入图像描述..."
                            : contentType === "analysis"
                            ? "输入分析内容..."
                            : "输入您的问题..."
                          : contentType === "code"
                          ? "Enter code requirement..."
                          : contentType === "image"
                          ? "Enter image description..."
                          : contentType === "analysis"
                          ? "Enter content to analyze..."
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

              {/* Resize Handles - 四边和四角 */}
              {/* Top */}
              <div
                onMouseDown={() => setResizeDirection("n")}
                className="absolute top-0 left-0 right-0 h-1 cursor-ns-resize hover:bg-purple-500/50 transition"
              />
              {/* Bottom */}
              <div
                onMouseDown={() => setResizeDirection("s")}
                className="absolute bottom-0 left-0 right-0 h-1 cursor-ns-resize hover:bg-purple-500/50 transition"
              />
              {/* Left */}
              <div
                onMouseDown={() => setResizeDirection("w")}
                className="absolute top-0 bottom-0 left-0 w-1 cursor-ew-resize hover:bg-purple-500/50 transition"
              />
              {/* Right */}
              <div
                onMouseDown={() => setResizeDirection("e")}
                className="absolute top-0 bottom-0 right-0 w-1 cursor-ew-resize hover:bg-purple-500/50 transition"
              />
              {/* Top-Left */}
              <div
                onMouseDown={() => setResizeDirection("nw")}
                className="absolute top-0 left-0 w-2 h-2 cursor-nwse-resize hover:bg-purple-500/50 transition"
              />
              {/* Top-Right */}
              <div
                onMouseDown={() => setResizeDirection("ne")}
                className="absolute top-0 right-0 w-2 h-2 cursor-nesw-resize hover:bg-purple-500/50 transition"
              />
              {/* Bottom-Left */}
              <div
                onMouseDown={() => setResizeDirection("sw")}
                className="absolute bottom-0 left-0 w-2 h-2 cursor-nesw-resize hover:bg-purple-500/50 transition"
              />
              {/* Bottom-Right */}
              <div
                onMouseDown={() => setResizeDirection("se")}
                className="absolute bottom-0 right-0 w-2 h-2 cursor-nwse-resize hover:bg-purple-500/50 transition"
              />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
