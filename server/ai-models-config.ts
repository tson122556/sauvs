/**
 * AI 模型配置文件
 * 定义极紫星专有模型中所有支持的AI模型
 */

export interface AIModelConfig {
  id: string;
  name: string;
  displayName: string;
  description: string;
  provider: string;
  category: "international" | "china" | "academic";
  enabled: boolean;
  mockResponses?: string[];
}

export const AI_MODELS_CONFIG: Record<string, AIModelConfig> = {
  // 国际模型
  chatgpt: {
    id: "chatgpt",
    name: "ChatGPT",
    displayName: "ChatGPT (GPT-4)",
    description: "OpenAI 的先进语言模型",
    provider: "openai",
    category: "international",
    enabled: true,
    mockResponses: [
      "这是一个来自 ChatGPT 的示例回复。我可以帮助您进行自然语言处理、创意写作、代码生成等任务。",
      "ChatGPT 擅长处理复杂的对话和提供详细的解释。请继续提出您的问题。",
    ],
  },
  claude: {
    id: "claude",
    name: "Claude",
    displayName: "Claude (Anthropic)",
    description: "Anthropic 的高级 AI 助手",
    provider: "anthropic",
    category: "international",
    enabled: true,
    mockResponses: [
      "这是来自 Claude 的回复。我专注于提供详细、准确和有帮助的分析。",
      "Claude 在处理长文档和复杂推理方面表现出色。",
    ],
  },
  grok: {
    id: "grok",
    name: "Grok",
    displayName: "Grok (X)",
    description: "X 的实时 AI 助手",
    provider: "xai",
    category: "international",
    enabled: true,
    mockResponses: [
      "这是 Grok 的回复。我可以访问实时信息并提供当前事件的分析。",
      "Grok 以其幽默和实时数据访问能力而闻名。",
    ],
  },
  gemini: {
    id: "gemini",
    name: "Gemini",
    displayName: "Gemini (Google)",
    description: "谷歌的多模态 AI",
    provider: "google",
    category: "international",
    enabled: true,
    mockResponses: [
      "这是来自 Gemini 的回复。我支持文本、图像和视频的多模态理解。",
      "Gemini 在处理多种类型的输入方面具有优势。",
    ],
  },

  // 国内模型
  kimi: {
    id: "kimi",
    name: "Kimi",
    displayName: "Kimi (月之暗面)",
    description: "月之暗面的长文本 AI",
    provider: "moonshot",
    category: "china",
    enabled: true,
    mockResponses: [
      "这是来自 Kimi 的回复。我可以处理超长文档并在长对话中保持上下文。",
      "Kimi 在处理中文长文本方面表现突出。",
    ],
  },
  deepseek: {
    id: "deepseek",
    name: "DeepSeek",
    displayName: "DeepSeek",
    description: "中国先进推理 AI",
    provider: "deepseek",
    category: "china",
    enabled: true,
    mockResponses: [
      "这是来自 DeepSeek 的回复。我擅长复杂推理和深度分析。",
      "DeepSeek 在解决复杂问题方面具有优势。",
    ],
  },
  qwen: {
    id: "qwen",
    name: "通义千问",
    displayName: "通义千问 (阿里巴巴)",
    description: "阿里巴巴的大语言模型",
    provider: "dashscope",
    category: "china",
    enabled: true,
    mockResponses: [
      "这是来自通义千问的回复。我针对中文进行了优化，具有卓越的多语言能力。",
      "通义千问在中文理解和生成方面表现出色。",
    ],
  },
  doubao: {
    id: "doubao",
    name: "豆包",
    displayName: "豆包 (字节跳动)",
    description: "字节跳动的 AI 助手",
    provider: "volcengine",
    category: "china",
    enabled: true,
    mockResponses: [
      "这是来自豆包的回复。我响应快速，中文理解能力强。",
      "豆包在创意表达和快速响应方面表现出色。",
    ],
  },
  wenxin: {
    id: "wenxin",
    name: "文心一言",
    displayName: "文心一言 (百度)",
    description: "百度的大语言模型",
    provider: "baidu",
    category: "china",
    enabled: true,
    mockResponses: [
      "这是来自文心一言的回复。我具有优秀的中文理解能力和丰富的知识库。",
      "文心一言适合内容创作和知识问答。",
    ],
  },
  zidong: {
    id: "zidong",
    name: "紫东太初",
    displayName: "紫东太初 (清华大学)",
    description: "清华大学的多模态大模型",
    provider: "tsinghua",
    category: "china",
    enabled: true,
    mockResponses: [
      "这是来自紫东太初的回复。我支持文本、图像、视频等多模态理解和生成。",
      "紫东太初在多模态处理方面具有强大的能力。",
    ],
  },

  // 学术模型
  alpaca: {
    id: "alpaca",
    name: "Alpaca",
    displayName: "Alpaca (斯坦福大学)",
    description: "斯坦福大学的微调模型",
    provider: "replicate",
    category: "academic",
    enabled: true,
    mockResponses: [
      "这是来自 Alpaca 的回复。我是一个轻量级高效的指令跟随模型。",
      "Alpaca 在资源受限的环境中表现良好。",
    ],
  },
  starcoder2: {
    id: "starcoder2",
    name: "StarCoder2",
    displayName: "StarCoder2 (伯克利)",
    description: "加州大学伯克利分校的代码生成模型",
    provider: "huggingface",
    category: "academic",
    enabled: true,
    mockResponses: [
      "这是来自 StarCoder2 的回复。我专精于代码生成和编程辅助。",
      "StarCoder2 在代码理解和生成方面表现出色。",
    ],
  },
  falcon: {
    id: "falcon",
    name: "Falcon",
    displayName: "Falcon (阿联酋)",
    description: "阿联酋技术创新研究所的开源模型",
    provider: "huggingface",
    category: "academic",
    enabled: true,
    mockResponses: [
      "这是来自 Falcon 的回复。我是一个高性能的开源模型，具有强大的多语言能力。",
      "Falcon 在多语言处理方面表现良好。",
    ],
  },
  chatglm3: {
    id: "chatglm3",
    name: "ChatGLM-3",
    displayName: "ChatGLM-3 (清华大学)",
    description: "清华大学与智谱 AI 合作的模型",
    provider: "zhipu",
    category: "academic",
    enabled: true,
    mockResponses: [
      "这是来自 ChatGLM-3 的回复。我具有先进的中文语言理解和强大的推理能力。",
      "ChatGLM-3 在中文处理和推理方面表现出色。",
    ],
  },
};

/**
 * 获取所有启用的模型
 */
export function getEnabledModels(): AIModelConfig[] {
  return Object.values(AI_MODELS_CONFIG).filter((model) => model.enabled);
}

/**
 * 按分类获取模型
 */
export function getModelsByCategory(
  category: "international" | "china" | "academic"
): AIModelConfig[] {
  return Object.values(AI_MODELS_CONFIG).filter(
    (model) => model.category === category && model.enabled
  );
}

/**
 * 获取单个模型配置
 */
export function getModelConfig(modelId: string): AIModelConfig | null {
  return AI_MODELS_CONFIG[modelId] || null;
}

/**
 * 获取模型的模拟响应
 */
export function getMockResponse(modelId: string): string {
  const model = getModelConfig(modelId);
  if (!model || !model.mockResponses || model.mockResponses.length === 0) {
    return "这是来自 AI 模型的默认回复。";
  }
  const randomIndex = Math.floor(Math.random() * model.mockResponses.length);
  return model.mockResponses[randomIndex];
}
