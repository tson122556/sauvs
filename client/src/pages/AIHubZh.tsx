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
    description: "OpenAI 的先进语言模型",
    feature: "擅长自然对话和创意内容生成",
    icon: "🤖",
    color: "from-green-500 to-green-600",
    url: "https://chat.openai.com",
    region: "international",
  },
  {
    id: "claude",
    name: "Claude",
    description: "Anthropic 的高级 AI 助手",
    feature: "专精于详细分析和长文档处理",
    icon: "🧠",
    color: "from-amber-500 to-amber-600",
    url: "https://claude.ai",
    region: "international",
  },
  {
    id: "grok",
    name: "Grok",
    description: "X 的实时 AI 助手",
    feature: "提供实时信息和当前事件分析",
    icon: "⚡",
    color: "from-purple-500 to-purple-600",
    url: "https://grok.x.com",
    region: "international",
  },
  {
    id: "gemini",
    name: "Gemini",
    description: "谷歌的多模态 AI",
    feature: "处理图像、文本和视频的高级多模态理解",
    icon: "✨",
    color: "from-blue-500 to-blue-600",
    url: "https://gemini.google.com",
    region: "international",
  },

  // China Models
  {
    id: "kimi",
    name: "Kimi",
    description: "月之暗面的长文本 AI",
    feature: "处理超长文档并在长对话中保持上下文",
    icon: "🌙",
    color: "from-indigo-500 to-indigo-600",
    url: "https://kimi.moonshot.cn",
    region: "china",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    description: "中国先进推理 AI",
    feature: "擅长复杂推理和深度分析的问题解决",
    icon: "🔍",
    color: "from-orange-500 to-orange-600",
    url: "https://chat.deepseek.com",
    region: "china",
  },
  {
    id: "qwen",
    name: "通义千问",
    description: "阿里巴巴的大语言模型",
    feature: "中文语言优化，多语言能力卓越",
    icon: "🌟",
    color: "from-red-500 to-red-600",
    url: "https://qwenlm.github.io",
    region: "china",
  },
  {
    id: "doubao",
    name: "豆包",
    description: "字节跳动的 AI 助手",
    feature: "响应快速，中文理解能力强，创意表达出色",
    icon: "🎯",
    color: "from-pink-500 to-pink-600",
    url: "https://www.doubao.com",
    region: "china",
  },

  // Academic Models
  {
    id: "alpaca",
    name: "Alpaca",
    description: "斯坦福大学的微调模型",
    feature: "轻量级高效的指令跟随模型",
    icon: "🦙",
    color: "from-cyan-500 to-cyan-600",
    url: "https://crfm.stanford.edu/2023/03/13/alpaca.html",
    region: "academic",
  },
  {
    id: "starcoder2",
    name: "StarCoder2",
    description: "加州大学伯克利分校的代码生成模型",
    feature: "专精于代码生成和编程辅助",
    icon: "⭐",
    color: "from-yellow-500 to-yellow-600",
    url: "https://huggingface.co/bigcode/starcoder2",
    region: "academic",
  },
  {
    id: "falcon",
    name: "Falcon",
    description: "阿联酋技术创新研究所的开源模型",
    feature: "高性能模型，多语言能力强",
    icon: "🦅",
    color: "from-teal-500 to-teal-600",
    url: "https://www.falconllm.ai",
    region: "academic",
  },
  {
    id: "chatglm3",
    name: "ChatGLM-3",
    description: "清华大学与智谱 AI 合作的模型",
    feature: "先进的中文语言理解和强大的推理能力",
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

export default function AIHubZh() {
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
              打开 {model.name}
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
              AI 助手中心
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            选择您喜欢的 AI 模型开始对话。每个模型都具有独特的能力和优势。
          </p>
        </div>

        {/* International AI Models Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="w-1 h-8 bg-gradient-to-b from-purple-500 to-cyan-500" />
            国际模型
          </h2>
          {renderModelCards(INTERNATIONAL_MODELS)}
        </div>

        {/* China AI Models Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="w-1 h-8 bg-gradient-to-b from-red-500 to-orange-500" />
            国内模型
          </h2>
          {renderModelCards(CHINA_MODELS)}
        </div>

        {/* Academic AI Models Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500" />
            学术模型
          </h2>
          {renderModelCards(ACADEMIC_MODELS)}
        </div>

        {/* UVS AI Proprietary Model Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500" />
            极紫星 AI 专有模型
          </h2>
          <Card className="bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 overflow-hidden">
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/TwiiMkmPRNBoNOuY.png" alt="UVS AI" className="w-16 h-16 mb-3" />
                  <h3 className="text-2xl font-bold text-white mb-2">UVS AI</h3>
                  <p className="text-gray-300 mb-2">UVS专有 AI 模型集成系统</p>
                  <p className="text-purple-400 italic border-l-2 border-purple-500 pl-3">智能调度、高效会话、专业分析</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">整合全球顶先 AI 模型，通过智能调度引擎为您提供最优的 AI 对话体验。</p>
              <div className="flex gap-4">
                <button
                  onClick={() => window.location.href = '/zh/uvs-ai'}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
                >
                  管理不同模型
                </button>
                <button
                  onClick={() => window.location.href = '/zh/uvs-ai-chat'}
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
                >
                  开始对话
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
