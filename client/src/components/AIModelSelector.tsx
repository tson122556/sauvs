import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useLocation } from "wouter";

export interface AIModel {
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
    description: "OpenAI's advanced language model",
    icon: "🤖",
    color: "from-green-500 to-green-600",
    url: "https://chat.openai.com",
  },
  {
    id: "grok",
    name: "Grok",
    description: "X's real-time AI assistant",
    icon: "⚡",
    color: "from-purple-500 to-purple-600",
    url: "https://grok.x.com",
  },
  {
    id: "gemini",
    name: "Gemini",
    description: "Google's multimodal AI",
    icon: "✨",
    color: "from-blue-500 to-blue-600",
    url: "https://gemini.google.com",
  },
  {
    id: "kimi",
    name: "Kimi",
    description: "Moonshot's long-context AI",
    icon: "🌙",
    color: "from-indigo-500 to-indigo-600",
    url: "https://kimi.moonshot.cn",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    description: "Chinese advanced reasoning AI",
    icon: "🔍",
    color: "from-orange-500 to-orange-600",
    url: "https://chat.deepseek.com",
  },
  {
    id: "qwen",
    name: "Qwen",
    description: "Alibaba's large language model",
    icon: "🌟",
    color: "from-red-500 to-red-600",
    url: "https://qwenlm.github.io",
  },
];

export default function AIModelSelector() {
  const [, setLocation] = useLocation();

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
            Choose your preferred AI model to start a conversation. Each model offers unique capabilities and perspectives.
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
                  Open {model.name}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">
            About Our AI Models
          </h2>
          <p className="text-gray-300 mb-4">
            We provide access to the world's leading AI models, each with unique strengths:
          </p>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <strong className="text-purple-400">ChatGPT:</strong> Best for
              general-purpose conversations and creative writing
            </li>
            <li>
              <strong className="text-purple-400">Grok:</strong> Excels at
              real-time information and current events
            </li>
            <li>
              <strong className="text-purple-400">Gemini:</strong> Powerful
              multimodal capabilities including image understanding
            </li>
            <li>
              <strong className="text-purple-400">Kimi:</strong> Specializes in
              long-context analysis and document processing
            </li>
            <li>
              <strong className="text-purple-400">DeepSeek:</strong> Advanced
              reasoning and problem-solving capabilities
            </li>
            <li>
              <strong className="text-purple-400">Qwen:</strong> Optimized for
              Chinese language and multilingual tasks
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
