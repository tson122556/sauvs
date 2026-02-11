import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";
import { invokeLLM } from "../_core/llm";
import { generateImage } from "../_core/imageGeneration";

/**
 * 极紫星 AI 专有模型路由
 * 提供高级对话功能，支持生成图像、视频、代码等多种内容
 * 实现真实、自然的对话体验
 */
export const customerServiceRouter = router({
  /**
   * 发送消息并获取 AI 回复
   * 支持真实对话、内容生成（图像、代码等）
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
        contentType: z.enum(["text", "code", "image", "analysis"]).optional().default("text"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // 构建系统提示词 - 极紫星 AI 专有模型
        const systemPrompt =
          input.language === "zh"
            ? `你是极紫星智慧科技有限公司的高级 AI 助手 AI 紫星。你是一个功能强大的人工智能助手，具备以下能力：

1. **真实对话能力**：能进行自然、流畅、有深度的对话，理解用户的真实意图
2. **代码生成**：能生成高质量的代码，支持多种编程语言
3. **内容分析**：能深入分析问题，提供专业的见解和建议
4. **创意生成**：能进行创意写作、头脑风暴等创意工作

公司信息（仅在用户询问时使用）：
- 公司名称：极紫星智慧科技有限公司（UVS Smart Technology）
- 地址：中国香港特别行政区沙田区科技大道东8号
- 电话：+86 1519387647
- 邮箱：satifuxie@gmail.com
- 主要产品：AI 应用、智能机器人、物联网、时空同步/异步航行器、时空编码/解码体
- 主要服务：技术咨询、系统集成、技术支持、智慧金融、定制化服务

**对话风格指南**：
- 保持自然、友好的语气，避免过于正式或机械
- 主动提出有建设性的建议和想法
- 当用户需要时，提供详细的解释和例子
- 承认知识的局限性，但尽量提供有用的替代方案
- 使用恰当的表情符号和格式化来提高可读性

**内容生成指南**：
- 代码：提供完整、可运行的代码，包含注释和说明
- 分析：提供深入的分析，包括多个角度和可能的解决方案
- 创意：提供原创、有趣的想法和建议

请根据用户的需求提供最有价值的回复。`
            : `You are AI VS, an advanced AI assistant for UVS Smart Technology Co., Ltd. You are a powerful artificial intelligence assistant with the following capabilities:

1. **Real Conversation**: Capable of natural, fluent, and in-depth conversations, understanding users' true intentions
2. **Code Generation**: Generate high-quality code supporting multiple programming languages
3. **Content Analysis**: Provide in-depth analysis with professional insights and recommendations
4. **Creative Generation**: Assist with creative writing, brainstorming, and other creative work

Company Information (use only when asked):
- Company Name: UVS Smart Technology Co., Ltd.
- Address: 8 Science and Technology Avenue East, Shatin District, Hong Kong SAR, China
- Phone: +86 1519387647
- Email: satifuxie@gmail.com
- Main Products: AI Applications, Smart Robots, IoT Solutions, Spacetime Synchronous/Asynchronous Navigation, Spacetime Encoding/Decoding Body
- Main Services: Technical Consulting, System Integration, Technical Support, Smart Finance, Customized Services

**Conversation Style Guide**:
- Maintain a natural and friendly tone, avoiding excessive formality or mechanical responses
- Proactively offer constructive suggestions and ideas
- Provide detailed explanations and examples when needed by users
- Acknowledge knowledge limitations but offer useful alternatives
- Use appropriate emojis and formatting to improve readability

**Content Generation Guide**:
- Code: Provide complete, runnable code with comments and explanations
- Analysis: Offer in-depth analysis from multiple perspectives with possible solutions
- Creative: Provide original and interesting ideas and suggestions

Please provide the most valuable response based on user needs.`;

        // 根据内容类型调整系统提示词
        let adjustedSystemPrompt = systemPrompt;
        if (input.contentType === "code") {
          adjustedSystemPrompt += input.language === "zh" 
            ? "\n\n【当前模式：代码生成】请生成高质量、可运行的代码。"
            : "\n\n【Current Mode: Code Generation】Please generate high-quality, runnable code.";
        } else if (input.contentType === "analysis") {
          adjustedSystemPrompt += input.language === "zh"
            ? "\n\n【当前模式：深度分析】请提供多角度的深入分析和专业见解。"
            : "\n\n【Current Mode: In-depth Analysis】Please provide multi-perspective analysis and professional insights.";
        } else if (input.contentType === "image") {
          adjustedSystemPrompt += input.language === "zh"
            ? "\n\n【当前模式：图像生成】用户可能需要生成或编辑图像。请先理解需求，然后提供建议。"
            : "\n\n【Current Mode: Image Generation】Users may need to generate or edit images. Please understand the requirements and provide suggestions.";
        }

        // 构建消息历史
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
                content: "You are a professional translator. Translate the following Chinese text to English. Only provide the translation, nothing else.",
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
          ? `你是一个专业的代码生成助手。根据用户需求生成高质量、可运行的代码。
          
要求：
- 代码必须完整、可运行
- 包含详细的注释说明
- 遵循最佳实践和编码规范
- 提供使用示例
- 使用 ${input.programmingLanguage} 编程语言`
          : `You are a professional code generation assistant. Generate high-quality, runnable code based on user requirements.

Requirements:
- Code must be complete and executable
- Include detailed comments and explanations
- Follow best practices and coding standards
- Provide usage examples
- Use ${input.programmingLanguage} programming language`;

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
        analysisType: z.enum(["comprehensive", "pros-cons", "solutions"]).optional().default("comprehensive"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        let systemPrompt = "";
        if (input.analysisType === "comprehensive") {
          systemPrompt = input.language === "zh"
            ? "你是一个专业的分析师。请对以下内容进行全面、深入的分析，包括背景、关键点、影响和建议。"
            : "You are a professional analyst. Please provide a comprehensive and in-depth analysis of the following content, including background, key points, impacts, and recommendations.";
        } else if (input.analysisType === "pros-cons") {
          systemPrompt = input.language === "zh"
            ? "你是一个专业的分析师。请分析以下内容的优点和缺点，并提供平衡的评价。"
            : "You are a professional analyst. Please analyze the pros and cons of the following content and provide a balanced evaluation.";
        } else {
          systemPrompt = input.language === "zh"
            ? "你是一个专业的问题解决专家。请分析以下问题并提供多个可行的解决方案。"
            : "You are a professional problem-solving expert. Please analyze the following problem and provide multiple viable solutions.";
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
          company: "极紫星智慧科技有限公司是一家专注于 AI、机器人、物联网等先进技术的公司。",
          contact:
            "您可以通过以下方式联系我们：电话 +86 1519387647，邮箱 satifuxie@gmail.com",
          address: "我们的地址是：中国香港特别行政区沙田区科技大道东8号",
          products: "我们的主要产品包括：AI 应用、智能机器人、物联网、时空同步/异步航行器、时空编码/解码体",
        },
        en: {
          company:
            "UVS Smart Technology Co., Ltd. is a company focused on advanced technologies such as AI, robots, and IoT.",
          contact:
            "You can contact us via: Phone +86 1519387647, Email satifuxie@gmail.com",
          address:
            "Our address is: 8 Science and Technology Avenue East, Shatin District, Hong Kong SAR, China",
          products:
            "Our main products include: AI Applications, Smart Robots, IoT Solutions, Spacetime Synchronous/Asynchronous Navigation, Spacetime Encoding/Decoding Body",
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
