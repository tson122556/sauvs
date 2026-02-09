import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";

interface AIModel {
  id: string;
  name: string;
  description: string;
  feature: string;
  icon: string;
  color: string;
  url: string;
  region: "international" | "china" | "academic";
}

const AI_MODELS: AIModel[] = [
  // International Models
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "OpenAI's advanced language model",
    feature: "Excellent at natural conversation and creative content generation",
    icon: "🤖",
    color: "from-green-500 to-green-600",
    url: "https://chat.openai.com",
    region: "international",
  },
  {
    id: "claude",
    name: "Claude",
    description: "Anthropic's advanced AI assistant",
    feature: "Specialized in detailed analysis and long document processing",
    icon: "🧠",
    color: "from-amber-500 to-amber-600",
    url: "https://claude.ai",
    region: "international",
  },
  {
    id: "grok",
    name: "Grok",
    description: "X's real-time AI assistant",
    feature: "Provides real-time information and current event analysis",
    icon: "⚡",
    color: "from-purple-500 to-purple-600",
    url: "https://grok.x.com",
    region: "international",
  },
  {
    id: "gemini",
    name: "Gemini",
    description: "Google's multimodal AI",
    feature: "Advanced multimodal understanding of images, text, and video",
    icon: "✨",
    color: "from-blue-500 to-blue-600",
    url: "https://gemini.google.com",
    region: "international",
  },

  // China Models
  {
    id: "kimi",
    name: "Kimi",
    description: "Moonshot's long-text AI",
    feature: "Handles ultra-long documents and maintains context in long conversations",
    icon: "🌙",
    color: "from-indigo-500 to-indigo-600",
    url: "https://kimi.moonshot.cn",
    region: "china",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    description: "China's advanced reasoning AI",
    feature: "Excellent at complex reasoning and deep analytical problem-solving",
    icon: "🔍",
    color: "from-orange-500 to-orange-600",
    url: "https://chat.deepseek.com",
    region: "china",
  },
  {
    id: "qwen",
    name: "Qwen",
    description: "Alibaba's large language model",
    feature: "Optimized for Chinese language with excellent multilingual capabilities",
    icon: "🌟",
    color: "from-red-500 to-red-600",
    url: "https://qwenlm.github.io",
    region: "china",
  },
  {
    id: "doubao",
    name: "Doubao",
    description: "ByteDance's AI assistant",
    feature: "Fast response, strong Chinese understanding, excellent creative expression",
    icon: "🎯",
    color: "from-pink-500 to-pink-600",
    url: "https://www.doubao.com",
    region: "china",
  },
  {
    id: "wenxin",
    name: "Wenxin",
    description: "Baidu's large language model",
    feature: "Excellent Chinese understanding, rich knowledge base, ideal for content creation",
    icon: "💡",
    color: "from-red-500 to-orange-600",
    url: "https://yiyan.baidu.com",
    region: "china",
  },
  {
    id: "zidong",
    name: "Zidong Taichi",
    description: "Tsinghua University's multimodal large model",
    feature: "Supports multimodal understanding and generation of text, images, and videos",
    icon: "🎨",
    color: "from-purple-500 to-pink-600",
    url: "https://www.zidongtaichu.com/",
    region: "china",
  },
  {
    id: "xunfei",
    name: "iFlytek",
    description: "iFlytek's speech and text large model",
    feature: "Leading in speech recognition and synthesis, strong multimodal interaction capabilities",
    icon: "🎤",
    color: "from-blue-500 to-cyan-600",
    url: "https://www.xfyun.cn",
    region: "china",
  },
  {
    id: "pangu",
    name: "Pangu",
    description: "Huawei's large-scale pre-trained model",
    feature: "Industry-specific optimization, enterprise-grade performance and security",
    icon: "🌐",
    color: "from-red-500 to-orange-600",
    url: "https://pangu.huaweicloud.com",
    region: "china",
  },

  // Academic Models
  {
    id: "alpaca",
    name: "Alpaca",
    description: "Stanford University's fine-tuned model",
    feature: "Lightweight and efficient instruction-following model",
    icon: "🦙",
    color: "from-cyan-500 to-cyan-600",
    url: "https://crfm.stanford.edu/2023/03/13/alpaca.html",
    region: "academic",
  },
  {
    id: "starcoder2",
    name: "StarCoder2",
    description: "UC Berkeley's code generation model",
    feature: "Specialized in code generation and programming assistance",
    icon: "⭐",
    color: "from-yellow-500 to-yellow-600",
    url: "https://huggingface.co/bigcode/starcoder2",
    region: "academic",
  },
  {
    id: "falcon",
    name: "Falcon",
    description: "UAE's Technology Innovation Institute open-source model",
    feature: "High-performance model with strong multilingual capabilities",
    icon: "🦅",
    color: "from-teal-500 to-teal-600",
    url: "https://www.falconllm.ai",
    region: "academic",
  },
  {
    id: "chatglm3",
    name: "ChatGLM-3",
    description: "Tsinghua University & Zhipu AI collaborative model",
    feature: "Advanced Chinese language understanding and powerful reasoning abilities",
    icon: "🎓",
    color: "from-violet-500 to-violet-600",
    url: "https://github.com/THUDM/ChatGLM3",
    region: "academic",
  },
];

const INTERNATIONAL_MODELS = AI_MODELS.filter(
  (m) => m.region === "international"
);
const CHINA_MODELS = AI_MODELS.filter((m) => m.region === "china");
const ACADEMIC_MODELS = AI_MODELS.filter((m) => m.region === "academic");

export default function AIHub() {
  const renderModelCards = (models: AIModel[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {models.map((model) => (
        <Card
          key={model.id}
          className="group relative overflow-hidden bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
        >
          {/* Background gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${model.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
          />

          {/* Content */}
          <div className="relative p-6 flex flex-col h-full">
            {/* Icon and Name */}
            <div className="mb-4">
              <div className="text-5xl mb-3">{model.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {model.name}
              </h3>
              <p className="text-gray-400 text-sm mb-3">{model.description}</p>
              <p className="text-purple-300 text-xs italic border-l-2 border-purple-500 pl-2">
                {model.feature}
              </p>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Button */}
            <Button
              onClick={() => window.open(model.url, "_blank")}
              className={`w-full bg-gradient-to-r ${model.color} hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 text-white font-semibold`}
            >
              Open {model.name}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );

  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20">
      {/* Back Button */}
      <div className="fixed top-24 left-4 z-40">
        <Button
          onClick={() => setLocation("/zh")}
          className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          返回
        </Button>
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              AI Assistant Hub
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Choose your favorite AI model to start chatting. Each model has unique capabilities and advantages.
          </p>
        </div>

        {/* International AI Models Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="w-1 h-8 bg-gradient-to-b from-purple-500 to-cyan-500" />
            International Models
          </h2>
          {renderModelCards(INTERNATIONAL_MODELS)}
        </div>

        {/* China AI Models Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="w-1 h-8 bg-gradient-to-b from-red-500 to-orange-500" />
            China Models
          </h2>
          {renderModelCards(CHINA_MODELS)}
        </div>

        {/* Academic AI Models Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500" />
            Academic Models
          </h2>
          {renderModelCards(ACADEMIC_MODELS)}
        </div>

        {/* UVS AI Proprietary Model Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500" />
            SAUVS Proprietary AI Model
          </h2>
          <Card className="bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 overflow-hidden">
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/TwiiMkmPRNBoNOuY.png" alt="SAUVS AI" className="w-16 h-16 mb-3" />
                  <h3 className="text-2xl font-bold text-white mb-2">SAUVS AI</h3>
                  <p className="text-gray-300 mb-2">SAUVS Proprietary AI Model Integration System</p>
                  <p className="text-purple-400 italic border-l-2 border-purple-500 pl-3">Intelligent scheduling, efficient conversations, professional analysis</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">Integrating the world's leading AI models, providing you with the optimal AI conversation experience through an intelligent scheduling engine.</p>
              <div className="flex gap-4">
                <button
                  onClick={() => window.location.href = '/en/uvs-ai'}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
                >
                  Manage Different Models
                </button>
                <button
                  onClick={() => window.location.href = '/en/uvs-ai-chat'}
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
                >
                  Start Chatting
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
