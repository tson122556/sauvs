import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface AIModel {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  url: string;
}

const AI_MODELS: AIModel[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "OpenAI 的先进语言模型",
    icon: "🤖",
    color: "from-green-500 to-green-600",
    url: "https://chat.openai.com",
  },
  {
    id: "grok",
    name: "Grok",
    description: "X 的实时 AI 助手",
    icon: "⚡",
    color: "from-purple-500 to-purple-600",
    url: "https://grok.x.com",
  },
  {
    id: "gemini",
    name: "Gemini",
    description: "谷歌的多模态 AI",
    icon: "✨",
    color: "from-blue-500 to-blue-600",
    url: "https://gemini.google.com",
  },
  {
    id: "kimi",
    name: "Kimi",
    description: "月之暗面的长文本 AI",
    icon: "🌙",
    color: "from-indigo-500 to-indigo-600",
    url: "https://kimi.moonshot.cn",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    description: "中国先进推理 AI",
    icon: "🔍",
    color: "from-orange-500 to-orange-600",
    url: "https://chat.deepseek.com",
  },
  {
    id: "qwen",
    name: "通义千问",
    description: "阿里巴巴的大语言模型",
    icon: "🌟",
    color: "from-red-500 to-red-600",
    url: "https://qwenlm.github.io",
  },
];

export default function AIHubZh() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20">
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

        {/* AI Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {AI_MODELS.map((model) => (
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
                  <p className="text-gray-400 text-sm">{model.description}</p>
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

        {/* Info Section */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">关于我们的 AI 模型</h2>
          <p className="text-gray-300 mb-4">
            我们提供全球领先的 AI 模型，每个模型都有独特的优势：
          </p>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <strong className="text-purple-400">ChatGPT：</strong>
              最适合通用对话和创意写作
            </li>
            <li>
              <strong className="text-purple-400">Grok：</strong>
              擅长实时信息和当前事件
            </li>
            <li>
              <strong className="text-purple-400">Gemini：</strong>
              强大的多模态能力，包括图像理解
            </li>
            <li>
              <strong className="text-purple-400">Kimi：</strong>
              专门处理长文本分析和文档处理
            </li>
            <li>
              <strong className="text-purple-400">DeepSeek：</strong>
              先进的推理和问题解决能力
            </li>
            <li>
              <strong className="text-purple-400">通义千问：</strong>
              优化了中文语言和多语言任务
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
