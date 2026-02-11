import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { invokeLLM } from "../_core/llm";
import { generateImage } from "../_core/imageGeneration";

// 定义支持的内容类型
export type ContentType = "text" | "code" | "image" | "video" | "analysis" | "file";

// 定义 AI 模型类型
export type AIModel = 
  | "gpt4" 
  | "claude" 
  | "gemini" 
  | "deepseek" 
  | "qwen" 
  | "doubao" 
  | "kimi" 
  | "glm";

// 定义对话消息类型
export interface Message {
  role: "user" | "assistant";
  content: string;
  contentType?: ContentType;
  model?: AIModel;
  timestamp: number;
}

// 定义对话会话类型
export interface ConversationSession {
  id: string;
  messages: Message[];
  selectedModel?: AIModel;
  autoSelectMode: boolean;
  createdAt: number;
  updatedAt: number;
}

// 模型配置
const MODEL_CONFIG: Record<AIModel, { name: string; description: string; capabilities: ContentType[] }> = {
  gpt4: {
    name: "GPT-4",
    description: "OpenAI 的最强大模型，擅长复杂推理和多模态理解",
    capabilities: ["text", "code", "image", "analysis"],
  },
  claude: {
    name: "Claude",
    description: "Anthropic 的高级 AI，专精于长文档处理和详细分析",
    capabilities: ["text", "code", "analysis", "file"],
  },
  gemini: {
    name: "Gemini",
    description: "谷歌的多模态 AI，处理图像、文本和视频",
    capabilities: ["text", "code", "image", "video", "analysis"],
  },
  deepseek: {
    name: "DeepSeek",
    description: "中国先进推理 AI，擅长复杂推理和深度分析",
    capabilities: ["text", "code", "analysis"],
  },
  qwen: {
    name: "通义千问",
    description: "阿里巴巴的大语言模型，中文优化",
    capabilities: ["text", "code", "analysis"],
  },
  doubao: {
    name: "豆包",
    description: "字节跳动的 AI 助手，响应快速",
    capabilities: ["text", "code", "image"],
  },
  kimi: {
    name: "Kimi",
    description: "月之暗面的长文本 AI，处理超长文档",
    capabilities: ["text", "analysis", "file"],
  },
  glm: {
    name: "ChatGLM-3",
    description: "清华大学与智谱 AI 的模型，中文理解强",
    capabilities: ["text", "code", "analysis"],
  },
};

// 意图分析函数：根据用户输入判断最适合的模型和内容类型
function analyzeIntent(userMessage: string): {
  contentType: ContentType;
  suggestedModels: AIModel[];
  reasoning: string;
} {
  const lowerMessage = userMessage.toLowerCase();
  
  // 代码相关
  if (
    /code|programming|python|javascript|java|function|class|debug|algorithm|error|syntax/i.test(
      userMessage
    )
  ) {
    return {
      contentType: "code",
      suggestedModels: ["gpt4", "claude", "deepseek"],
      reasoning: "检测到代码相关问题，推荐使用 GPT-4 或 Claude",
    };
  }
  
  // 图像相关
  if (/image|picture|photo|draw|design|visual|generate|create|edit/i.test(userMessage)) {
    return {
      contentType: "image",
      suggestedModels: ["gemini", "gpt4", "doubao"],
      reasoning: "检测到图像相关需求，推荐使用 Gemini 或 GPT-4",
    };
  }
  
  // 视频相关
  if (/video|movie|film|animation|script|scene|shot|frame/i.test(userMessage)) {
    return {
      contentType: "video",
      suggestedModels: ["gemini", "gpt4"],
      reasoning: "检测到视频相关需求，推荐使用 Gemini",
    };
  }
  
  // 文件分析
  if (/file|document|pdf|excel|analyze|extract|parse|read/i.test(userMessage)) {
    return {
      contentType: "file",
      suggestedModels: ["claude", "kimi", "gpt4"],
      reasoning: "检测到文件分析需求，推荐使用 Claude 或 Kimi",
    };
  }
  
  // 深度分析
  if (/analyze|analysis|explain|understand|research|study|investigate/i.test(userMessage)) {
    return {
      contentType: "analysis",
      suggestedModels: ["claude", "deepseek", "gpt4"],
      reasoning: "检测到分析需求，推荐使用 Claude 或 DeepSeek",
    };
  }
  
  // 默认：文本对话
  return {
    contentType: "text",
    suggestedModels: ["gpt4", "qwen", "doubao"],
    reasoning: "通用对话，推荐使用 GPT-4 或国内模型",
  };
}

// 调用 AI 模型获取回复
async function callAIModel(
  model: AIModel,
  messages: Array<{ role: "user" | "assistant"; content: string }>,
  contentType: ContentType
): Promise<string> {
  // 根据内容类型调整系统提示词
  let systemPrompt = "你是一个专业的 AI 助手，提供准确、有帮助的回复。";
  
  if (contentType === "code") {
    systemPrompt = "你是一个专业的编程助手。提供清晰的代码示例、解释和最佳实践。使用 markdown 代码块格式化代码。";
  } else if (contentType === "image") {
    systemPrompt = "你是一个专业的图像生成和设计助手。提供详细的图像描述和设计建议。";
  } else if (contentType === "video") {
    systemPrompt = "你是一个专业的视频制作和脚本编写助手。提供详细的视频脚本、场景描述和制作建议。";
  } else if (contentType === "analysis") {
    systemPrompt = "你是一个专业的分析师。提供深入的分析、洞察和详细的解释。";
  } else if (contentType === "file") {
    systemPrompt = "你是一个专业的文档分析助手。准确提取和分析文档内容，提供有结构的总结。";
  }
  
  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
    });
    
    const content = response.choices[0]?.message?.content;
    if (typeof content === "string") {
      return content;
    }
    return "无法生成回复，请重试。";
  } catch (error) {
    console.error(`调用 ${model} 模型失败:`, error);
    throw new Error(`模型 ${MODEL_CONFIG[model].name} 调用失败`);
  }
}

export const uvsAiRouter = router({
  // 获取可用模型列表
  getAvailableModels: publicProcedure.query(() => {
    return Object.entries(MODEL_CONFIG).map(([id, config]) => ({
      id: id as AIModel,
      ...config,
    }));
  }),
  
  // 分析用户意图并推荐模型
  analyzeIntent: publicProcedure
    .input(z.object({ message: z.string() }))
    .query(({ input }) => {
      return analyzeIntent(input.message);
    }),
  
  // 发送消息并获取 AI 回复
  sendMessage: publicProcedure
    .input(
      z.object({
        message: z.string(),
        conversationHistory: z.array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string(),
          })
        ),
        selectedModel: z.enum([
          "gpt4",
          "claude",
          "gemini",
          "deepseek",
          "qwen",
          "doubao",
          "kimi",
          "glm",
        ]).optional(),
        autoSelectMode: z.boolean().default(true),
      })
    )
    .mutation(async ({ input }) => {
      const { message, conversationHistory, selectedModel, autoSelectMode } = input;
      
      // 分析意图
      const intentAnalysis = analyzeIntent(message);
      
      // 选择模型
      let modelToUse: AIModel;
      if (selectedModel && !autoSelectMode) {
        // 手动选择模式
        modelToUse = selectedModel;
      } else {
        // 自动选择模式
        modelToUse = intentAnalysis.suggestedModels[0] || "gpt4";
      }
      
      // 构建消息历史
      const messages = [
        ...conversationHistory,
        { role: "user" as const, content: message },
      ];
      
      // 调用 AI 模型
      const aiResponse = await callAIModel(modelToUse, messages, intentAnalysis.contentType);
      
      return {
        response: aiResponse,
        model: modelToUse,
        contentType: intentAnalysis.contentType,
        intentAnalysis,
        timestamp: Date.now(),
      };
    }),
  
  // 生成图像
  generateImage: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const result = await generateImage({ prompt: input.prompt });
        return {
          success: true,
          imageUrl: result.url,
          timestamp: Date.now(),
        };
      } catch (error) {
        console.error("图像生成失败:", error);
        throw new Error("图像生成失败，请重试");
      }
    }),
  
  // 生成代码
  generateCode: publicProcedure
    .input(
      z.object({
        description: z.string(),
        language: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { description, language = "python" } = input;
      
      const prompt = `生成 ${language} 代码来实现以下功能：\n${description}\n\n请提供完整、可运行的代码示例。`;
      
      const codeResponse = await invokeLLM({
        messages: [
          {
            role: "system",
            content: "你是一个专业的编程助手。提供清晰的、可运行的代码示例。",
          },
          { role: "user", content: prompt },
        ],
      });
      
      const codeContent = typeof codeResponse.choices[0]?.message?.content === "string" ? codeResponse.choices[0]?.message?.content : "";
      
      return {
        code: codeContent,
        language,
        timestamp: Date.now(),
      };
    }),
  
  // 分析文件或文本
  analyzeContent: publicProcedure
    .input(
      z.object({
        content: z.string(),
        analysisType: z.enum(["summary", "sentiment", "entities", "keywords"]),
      })
    )
    .mutation(async ({ input }) => {
      const { content, analysisType } = input;
      
      const prompts: Record<string, string> = {
        summary: `请总结以下内容的要点：\n${content}`,
        sentiment: `分析以下文本的情感倾向：\n${content}`,
        entities: `提取以下文本中的关键实体（人名、地名、组织等）：\n${content}`,
        keywords: `提取以下文本的关键词：\n${content}`,
      };
      
      const analysisResponse = await invokeLLM({
        messages: [
          {
            role: "system",
            content: "你是一个专业的文本分析助手。提供准确、结构化的分析结果。",
          },
          { role: "user", content: prompts[analysisType] },
        ],
      });
      
      const analysisContent = typeof analysisResponse.choices[0]?.message?.content === "string" ? analysisResponse.choices[0]?.message?.content : "";
      
      return {
        analysis: analysisContent,
        analysisType,
        timestamp: Date.now(),
      };
    }),
  
  // 生成视频脚本
  generateVideoScript: publicProcedure
    .input(
      z.object({
        topic: z.string(),
        duration: z.number().optional(),
        style: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { topic, duration = 60, style = "professional" } = input;
      
      const prompt = `生成一个约 ${duration} 秒的 ${style} 风格的视频脚本，主题是：${topic}\n\n请包括：\n1. 场景描述\n2. 镜头建议\n3. 配音文本\n4. 音效建议`;
      
      const scriptResponse = await invokeLLM({
        messages: [
          {
            role: "system",
            content: "你是一个专业的视频制作和脚本编写专家。提供详细、专业的视频脚本。",
          },
          { role: "user", content: prompt },
        ],
      });
      
      const scriptContent = typeof scriptResponse.choices[0]?.message?.content === "string" ? scriptResponse.choices[0]?.message?.content : "";
      
      return {
        script: scriptContent,
        topic,
        duration,
        style,
        timestamp: Date.now(),
      };
    }),
});
