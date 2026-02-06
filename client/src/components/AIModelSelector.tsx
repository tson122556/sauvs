import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useLocation } from "wouter";

export interface AIModel {
  id: string;
  name: string;
  description: string;
  feature: string;
  icon: string;
  color: string;
  url: string;
  region: "international" | "china";
}

const AI_MODELS: AIModel[] = [
  // International Models
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "OpenAI's advanced language model",
    feature: "Excels at natural conversations and creative content generation",
    icon: "🤖",
    color: "from-green-500 to-green-600",
    url: "https://chat.openai.com",
    region: "international",
  },
  {
    id: "claude",
    name: "Claude",
    description: "Anthropic's advanced AI assistant",
    feature: "Specializes in detailed analysis and long-form document processing",
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
    feature: "Handles images, text, and video with advanced multimodal understanding",
    icon: "✨",
    color: "from-blue-500 to-blue-600",
    url: "https://gemini.google.com",
    region: "international",
  },

  // China Models
  {
    id: "kimi",
    name: "Kimi",
    description: "Moonshot's long-context AI",
    feature: "Processes ultra-long documents and maintains context over extended conversations",
    icon: "🌙",
    color: "from-indigo-500 to-indigo-600",
    url: "https://kimi.moonshot.cn",
    region: "china",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    description: "Chinese advanced reasoning AI",
    feature: "Excels at complex reasoning and problem-solving with deep analysis",
    icon: "🔍",
    color: "from-orange-500 to-orange-600",
    url: "https://chat.deepseek.com",
    region: "china",
  },
  {
    id: "qwen",
    name: "Qwen",
    description: "Alibaba's large language model",
    feature: "Optimized for Chinese language with superior multilingual capabilities",
    icon: "🌟",
    color: "from-red-500 to-red-600",
    url: "https://qwenlm.github.io",
    region: "china",
  },
  {
    id: "doubao",
    name: "豆包",
    description: "ByteDance's AI assistant",
    feature: "Fast response with strong Chinese understanding and creative capabilities",
    icon: "🎯",
    color: "from-pink-500 to-pink-600",
    url: "https://www.doubao.com",
    region: "china",
  },
];

const INTERNATIONAL_MODELS = AI_MODELS.filter(
  (m) => m.region === "international"
);
const CHINA_MODELS = AI_MODELS.filter((m) => m.region === "china");

export default function AIModelSelector() {
  const [, setLocation] = useLocation();

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20">
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
            Choose your preferred AI model to start a conversation. Each model
            offers unique capabilities and perspectives.
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


      </div>
    </div>
  );
}
