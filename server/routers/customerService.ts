import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";
import { invokeLLM } from "../_core/llm";
import { generateImage } from "../_core/imageGeneration";

/**
 * 极紫星 AI 专有模型路由 - 优化版本
 * 提供高级对话功能，支持生成图像、视频、代码等多种内容
 * 实现真实、自然、高质量的对话体验
 */
export const customerServiceRouter = router({
  /**
   * 发送消息并获取 AI 回复 - 优化版本
   * 支持真实对话、内容生成（图像、视频、代码等）
   * 实现更自然、更有深度的对话
   */
  sendMessage: publicProcedure
    .input(
      z.object({
        message: z.string().min(1, "消息不能为空"),
        conversationHistory: z
          .array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string(),
            })
          )
          .optional()
          .default([]),
        language: z.enum(["zh", "en"]).default("zh"),
        contentType: z.enum(["text", "code", "image", "video", "analysis"]).optional().default("text"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // 构建优化的系统提示词 - 极紫星 AI 专有模型
        const systemPrompt =
          input.language === "zh"
            ? `你是极紫星智慧科技有限公司的高级 AI 助手 AI 紫星。你是一个功能强大、思维敏捷的人工智能助手，具备以下核心能力：

## 核心能力
1. **真实自然对话**：进行自然、流畅、有深度的对话，完全理解用户的真实意图和上下文
2. **代码生成**：生成高质量、可运行的代码，支持多种编程语言和框架
3. **内容分析**：进行深入的多角度分析，提供专业的见解和可行建议
4. **创意生成**：进行创意写作、头脑风暴、方案设计等创意工作
5. **视频内容规划**：为视频生成提供详细的脚本、场景、镜头描述

## 公司信息（仅在用户询问时使用）
- **公司名称**：极紫星智慧科技有限公司（UVS Smart Technology）
- **地址**：中国香港特别行政区沙田区科技大道东8号
- **电话**：+86 1519387647
- **邮箱**：satifuxie@gmail.com
- **主要产品**：AI 应用、智能机器人、物联网、时空同步/异步航行器、时空编码/解码体
- **主要服务**：技术咨询、系统集成、技术支持、智慧金融、定制化服务

## 对话风格指南
- 保持自然、友好、专业的语气，避免过于正式或机械
- 主动提出有建设性的建议和想法，展现思考深度
- 当用户需要时，提供详细的解释、例子和对比分析
- 承认知识的局限性，但尽量提供有用的替代方案
- 使用恰当的表情符号、格式化和结构化信息提高可读性
- 对复杂问题进行分步骤的讲解
- 主动提供扩展阅读或相关话题的建议

## 内容生成指南
- **代码**：提供完整、可运行的代码，包含详细注释、错误处理和使用示例
- **分析**：提供深入的分析，包括多个角度、数据支持和可能的解决方案
- **创意**：提供原创、有趣、实用的想法和建议
- **视频规划**：提供详细的视频脚本、场景描述、镜头建议、配音指导

## 对话策略
- 首先理解用户的真实需求，而不是表面问题
- 提供具体、可操作的建议，而不是笼统的回答
- 在适当时提出后续问题以深化对话
- 根据对话历史调整回答风格和深度
- 对用户的反馈保持敏感，及时调整方向

请根据用户的需求提供最有价值、最自然的回复。`
            : `You are AI VS, an advanced AI assistant for UVS Smart Technology Co., Ltd. You are a powerful, intelligent artificial intelligence assistant with the following core capabilities:

## Core Capabilities
1. **Real Natural Conversation**: Engage in natural, fluent, and in-depth conversations with complete understanding of users' true intentions and context
2. **Code Generation**: Generate high-quality, executable code supporting multiple programming languages and frameworks
3. **Content Analysis**: Provide in-depth multi-perspective analysis with professional insights and actionable recommendations
4. **Creative Generation**: Assist with creative writing, brainstorming, and solution design
5. **Video Content Planning**: Provide detailed scripts, scenes, and shot descriptions for video generation

## Company Information (use only when asked)
- **Company Name**: UVS Smart Technology Co., Ltd.
- **Address**: 8 Science and Technology Avenue East, Shatin District, Hong Kong SAR, China
- **Phone**: +86 1519387647
- **Email**: satifuxie@gmail.com
- **Main Products**: AI Applications, Smart Robots, IoT Solutions, Spacetime Synchronous/Asynchronous Navigation, Spacetime Encoding/Decoding Body
- **Main Services**: Technical Consulting, System Integration, Technical Support, Smart Finance, Customized Services

## Conversation Style Guide
- Maintain a natural, friendly, and professional tone, avoiding excessive formality or mechanical responses
- Proactively offer constructive suggestions and ideas, demonstrating depth of thinking
- Provide detailed explanations, examples, and comparative analysis when needed
- Acknowledge knowledge limitations but offer useful alternatives
- Use appropriate emojis, formatting, and structured information to improve readability
- Explain complex problems step-by-step
- Proactively suggest further reading or related topics

## Content Generation Guide
- **Code**: Provide complete, executable code with detailed comments, error handling, and usage examples
- **Analysis**: Offer in-depth analysis from multiple perspectives with data support and possible solutions
- **Creative**: Provide original, interesting, and practical ideas and suggestions
- **Video Planning**: Provide detailed video scripts, scene descriptions, shot suggestions, and voice-over guidance

## Conversation Strategy
- First understand users' true needs, not just surface questions
- Provide specific, actionable suggestions rather than generic answers
- Ask follow-up questions when appropriate to deepen the conversation
- Adjust response style and depth based on conversation history
- Remain sensitive to user feedback and adjust direction promptly

Please provide the most valuable and natural response based on user needs.`;

        // 根据内容类型调整系统提示词
        let adjustedSystemPrompt = systemPrompt;
        if (input.contentType === "code") {
          adjustedSystemPrompt += input.language === "zh" 
            ? "\n\n【当前模式：代码生成】请生成高质量、完整、可运行的代码，包含详细注释和使用示例。"
            : "\n\n【Current Mode: Code Generation】Please generate high-quality, complete, executable code with detailed comments and usage examples.";
        } else if (input.contentType === "video") {
          adjustedSystemPrompt += input.language === "zh"
            ? "\n\n【当前模式：视频内容规划】请提供详细的视频脚本、场景描述、镜头建议、配音指导和特效建议。"
            : "\n\n【Current Mode: Video Content Planning】Please provide detailed video scripts, scene descriptions, shot suggestions, voice-over guidance, and special effects recommendations.";
        } else if (input.contentType === "analysis") {
          adjustedSystemPrompt += input.language === "zh"
            ? "\n\n【当前模式：深度分析】请提供多角度的深入分析、数据支持和专业见解，包括可能的解决方案。"
            : "\n\n【Current Mode: In-depth Analysis】Please provide multi-perspective analysis with data support and professional insights, including possible solutions.";
        } else if (input.contentType === "image") {
          adjustedSystemPrompt += input.language === "zh"
            ? "\n\n【当前模式：图像生成】用户可能需要生成或编辑图像。请先理解需求，提供详细的图像描述和建议。"
            : "\n\n【Current Mode: Image Generation】Users may need to generate or edit images. Please understand requirements and provide detailed image descriptions and suggestions.";
        }

        // 构建消息历史 - 优化对话上下文
        const messages = [
          { role: "system" as const, content: adjustedSystemPrompt },
          ...input.conversationHistory.map((msg) => ({
            role: msg.role as "user" | "assistant",
            content: msg.content,
          })),
          { role: "user" as const, content: input.message },
        ];

        // 调用 LLM API
        const response = await invokeLLM({
          messages: messages,
        });

        // 提取回复内容
        const assistantMessage =
          response.choices[0]?.message?.content || 
          (input.language === "zh" 
            ? "抱歉，我无法处理您的请求。请稍后再试。"
            : "Sorry, I cannot process your request. Please try again later.");

        // 构建对话历史
        const updatedHistory = [
          ...input.conversationHistory,
          { role: "user" as const, content: input.message },
          { role: "assistant" as const, content: assistantMessage },
        ];

        return {
          success: true,
          message: assistantMessage,
          conversationHistory: updatedHistory,
          contentType: input.contentType,
        };
      } catch (error) {
        console.error("极紫星 AI 错误:", error);
        return {
          success: false,
          message:
            input.language === "zh"
              ? "抱歉，发生了错误。请稍后再试。"
              : "Sorry, an error occurred. Please try again later.",
          conversationHistory: input.conversationHistory,
          contentType: input.contentType,
        };
      }
    }),

  /**
   * 生成图像
   * 根据用户描述生成或编辑图像
   */
  generateImage: publicProcedure
    .input(
      z.object({
        prompt: z.string().min(1, "描述不能为空"),
        language: z.enum(["zh", "en"]).default("zh"),
        editMode: z.boolean().optional().default(false),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // 翻译提示词为英文（如果是中文）
        let englishPrompt = input.prompt;
        if (input.language === "zh") {
          // 调用 LLM 翻译
          const translationResponse = await invokeLLM({
            messages: [
              {
                role: "system",
                content: "You are a professional translator. Translate the following Chinese text to English, making it more detailed and descriptive for image generation. Only provide the translation, nothing else.",
              },
              {
                role: "user",
                content: input.prompt,
              },
            ],
          });
          const content = translationResponse.choices[0]?.message?.content;
          englishPrompt = typeof content === 'string' ? content : input.prompt;
        }

        // 调用图像生成服务
        const result = await generateImage({
          prompt: englishPrompt,
        });

        return {
          success: true,
          imageUrl: result.url,
          prompt: input.prompt,
          message: input.language === "zh"
            ? `✓ 图像已生成成功！\n\n提示词：${input.prompt}`
            : `✓ Image generated successfully!\n\nPrompt: ${input.prompt}`,
        };
      } catch (error) {
        console.error("图像生成错误:", error);
        return {
          success: false,
          message: input.language === "zh"
            ? "抱歉，图像生成失败。请稍后再试。"
            : "Sorry, image generation failed. Please try again later.",
        };
      }
    }),

  /**
   * 生成视频内容规划
   * 根据需求生成详细的视频脚本和内容规划
   */
  generateVideo: publicProcedure
    .input(
      z.object({
        concept: z.string().min(1, "视频概念不能为空"),
        language: z.enum(["zh", "en"]).default("zh"),
        duration: z.number().optional().default(60),
        style: z.string().optional().default("professional"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const systemPrompt = input.language === "zh"
          ? `你是一个专业的视频制作导演和编剧。根据用户的概念生成详细的视频内容规划。

要求：
- 提供完整的视频脚本（包含时间码、镜头描述、配音、音效）
- 场景描述：详细描述每个场景的视觉元素、布景、道具
- 镜头建议：提供具体的摄影机角度、运动和特效建议
- 配音指导：提供配音风格、语调、节奏建议
- 音乐和音效：建议背景音乐、音效和音量变化
- 时长：${input.duration} 秒
- 风格：${input.style}`
          : `You are a professional video director and screenwriter. Generate detailed video content planning based on the user's concept.

Requirements:
- Provide a complete video script (including timecodes, shot descriptions, voice-over, sound effects)
- Scene Description: Detailed description of visual elements, sets, and props for each scene
- Shot Suggestions: Provide specific camera angles, movements, and special effects recommendations
- Voice-over Guidance: Provide voice-over style, tone, and pacing suggestions
- Music and Sound Effects: Suggest background music, sound effects, and volume changes
- Duration: ${input.duration} seconds
- Style: ${input.style}`;

        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: input.concept },
          ],
        });

        const videoScript = response.choices[0]?.message?.content || "";

        return {
          success: true,
          script: videoScript,
          concept: input.concept,
          duration: input.duration,
          style: input.style,
          message: input.language === "zh"
            ? "✓ 视频内容规划已生成成功！"
            : "✓ Video content planning generated successfully!",
        };
      } catch (error) {
        console.error("视频生成错误:", error);
        return {
          success: false,
          message: input.language === "zh"
            ? "抱歉，视频内容规划生成失败。请稍后再试。"
            : "Sorry, video content planning generation failed. Please try again later.",
        };
      }
    }),

  /**
   * 生成代码
   * 根据需求生成高质量代码
   */
  generateCode: publicProcedure
    .input(
      z.object({
        requirement: z.string().min(1, "需求不能为空"),
        language: z.enum(["zh", "en"]).default("zh"),
        programmingLanguage: z.string().optional().default("javascript"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const systemPrompt = input.language === "zh"
          ? `你是一个专业的代码生成助手和软件工程师。根据用户需求生成高质量、可运行的代码。
          
要求：
- 代码必须完整、可运行、无错误
- 包含详细的注释说明和文档
- 遵循最佳实践和编码规范
- 提供多个使用示例
- 包含错误处理和边界情况处理
- 使用 ${input.programmingLanguage} 编程语言
- 提供依赖说明和安装指导`
          : `You are a professional code generation assistant and software engineer. Generate high-quality, executable code based on user requirements.

Requirements:
- Code must be complete, executable, and error-free
- Include detailed comments and documentation
- Follow best practices and coding standards
- Provide multiple usage examples
- Include error handling and edge case handling
- Use ${input.programmingLanguage} programming language
- Provide dependency information and installation guidance`;

        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: input.requirement },
          ],
        });

        const generatedCode = response.choices[0]?.message?.content || "";

        return {
          success: true,
          code: generatedCode,
          language: input.programmingLanguage,
          message: input.language === "zh"
            ? "✓ 代码已生成成功！"
            : "✓ Code generated successfully!",
        };
      } catch (error) {
        console.error("代码生成错误:", error);
        return {
          success: false,
          message: input.language === "zh"
            ? "抱歉，代码生成失败。请稍后再试。"
            : "Sorry, code generation failed. Please try again later.",
        };
      }
    }),

  /**
   * 深度分析
   * 对用户提出的问题进行多角度深入分析
   */
  analyzeContent: publicProcedure
    .input(
      z.object({
        content: z.string().min(1, "内容不能为空"),
        language: z.enum(["zh", "en"]).default("zh"),
        analysisType: z.enum(["comprehensive", "pros-cons", "solutions", "strategic"]).optional().default("comprehensive"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        let systemPrompt = "";
        if (input.analysisType === "comprehensive") {
          systemPrompt = input.language === "zh"
            ? "你是一个专业的分析师和战略顾问。请对以下内容进行全面、深入的分析，包括背景、关键点、影响、趋势和建议。"
            : "You are a professional analyst and strategic advisor. Please provide a comprehensive and in-depth analysis of the following content, including background, key points, impacts, trends, and recommendations.";
        } else if (input.analysisType === "pros-cons") {
          systemPrompt = input.language === "zh"
            ? "你是一个专业的分析师。请分析以下内容的优点、缺点和中立观点，并提供平衡的评价和建议。"
            : "You are a professional analyst. Please analyze the pros, cons, and neutral perspectives of the following content, and provide a balanced evaluation and recommendations.";
        } else if (input.analysisType === "solutions") {
          systemPrompt = input.language === "zh"
            ? "你是一个专业的问题解决专家。请分析以下问题并提供多个可行的解决方案，包括优缺点和实施步骤。"
            : "You are a professional problem-solving expert. Please analyze the following problem and provide multiple viable solutions with pros/cons and implementation steps.";
        } else {
          systemPrompt = input.language === "zh"
            ? "你是一个专业的战略顾问。请从战略角度分析以下内容，包括机会、威胁、优势、劣势和长期建议。"
            : "You are a professional strategic advisor. Please analyze the following content from a strategic perspective, including opportunities, threats, strengths, weaknesses, and long-term recommendations.";
        }

        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: input.content },
          ],
        });

        const analysis = response.choices[0]?.message?.content || "";

        return {
          success: true,
          analysis: analysis,
          analysisType: input.analysisType,
          message: input.language === "zh"
            ? "✓ 分析已完成！"
            : "✓ Analysis completed!",
        };
      } catch (error) {
        console.error("分析错误:", error);
        return {
          success: false,
          message: input.language === "zh"
            ? "抱歉，分析失败。请稍后再试。"
            : "Sorry, analysis failed. Please try again later.",
        };
      }
    }),

  /**
   * 获取常见问题的 FAQ 回复
   */
  getFAQResponse: publicProcedure
    .input(
      z.object({
        question: z.string(),
        language: z.enum(["zh", "en"]).default("zh"),
      })
    )
    .query(async ({ input }) => {
      const faqMap = {
        zh: {
          company: "极紫星智慧科技有限公司是一家专注于 AI、机器人、物联网等先进技术的公司。我们致力于为组织和个人客户提供创新解决方案，推动数字化转型。",
          contact:
            "您可以通过以下方式联系我们：\n📞 电话：+86 1519387647\n📧 邮箱：satifuxie@gmail.com\n我们的客服团队随时准备为您服务。",
          address: "我们的地址是：中国香港特别行政区沙田区科技大道东8号\n这是我们的主要办公地点。",
          products: "我们的主要产品包括：\n• AI 应用\n• 智能机器人\n• 物联网解决方案\n• 时空同步/异步航行器\n• 时空编码/解码体\n每个产品都经过精心设计，以满足不同的业务需求。",
        },
        en: {
          company:
            "UVS Smart Technology Co., Ltd. is a company focused on advanced technologies such as AI, robots, and IoT. We are committed to providing innovative solutions to organizations and individual customers, driving digital transformation.",
          contact:
            "You can contact us via:\n📞 Phone: +86 1519387647\n📧 Email: satifuxie@gmail.com\nOur customer service team is ready to assist you at any time.",
          address:
            "Our address is: 8 Science and Technology Avenue East, Shatin District, Hong Kong SAR, China\nThis is our main office location.",
          products:
            "Our main products include:\n• AI Applications\n• Smart Robots\n• IoT Solutions\n• Spacetime Synchronous/Asynchronous Navigation\n• Spacetime Encoding/Decoding Body\nEach product is carefully designed to meet different business needs.",
        },
      };

      const lang = input.language === "zh" ? "zh" : "en";
      const questionLower = input.question.toLowerCase();

      if (
        questionLower.includes("公司") ||
        questionLower.includes("company") ||
        questionLower.includes("about")
      ) {
        return { answer: faqMap[lang].company };
      } else if (
        questionLower.includes("联系") ||
        questionLower.includes("contact") ||
        questionLower.includes("phone")
      ) {
        return { answer: faqMap[lang].contact };
      } else if (
        questionLower.includes("地址") ||
        questionLower.includes("address") ||
        questionLower.includes("location")
      ) {
        return { answer: faqMap[lang].address };
      } else if (
        questionLower.includes("产品") ||
        questionLower.includes("product") ||
        questionLower.includes("service")
      ) {
        return { answer: faqMap[lang].products };
      }

      return { answer: null };
    }),
});
