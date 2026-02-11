import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";
import { invokeLLM } from "../_core/llm";

/**
 * AI 客服路由
 * 提供智能客服对话功能，使用 GPT-4 处理用户问题
 * 支持公司相关问题和通用知识库问题
 */
export const customerServiceRouter = router({
  /**
   * 发送客服消息并获取 AI 回复
   * 使用 GPT-4 模型智能回答关于公司、产品、服务等的问题，以及任何一般性问题
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
      })
    )
    .mutation(async ({ input }) => {
      try {
        // 构建系统提示词 - 使用 GPT-4 的通用知识库
        const systemPrompt =
          input.language === "zh"
            ? `你是极紫星智慧科技有限公司的在线智能助手 AI VS。你是一个博学的、专业的智能助手，不仅能回答关于极紫星公司的问题，还能回答任何一般性的问题。

当用户咨询关于极紫星公司的信息时，请使用以下信息：

公司信息：
- 公司名称：极紫星智慧科技有限公司（UVS Smart Technology）
- 地址：中国香港特别行政区沙田区科技大道东8号
- 电话：+86 1519387647
- 邮箱：satifuxie@gmail.com

主要产品：
1. AI 应用 - 提供先进的人工智能解决方案
2. 智能机器人 - 高效的自动化机器人系统
3. 物联网 - 全面的物联网技术方案
4. 时空同步/异步航行器 - 先进的时空技术
5. 时空编码/解码体 - 创新的编码解决方案

主要服务：
- 技术咨询
- 系统集成
- 技术支持
- 智慧金融
- 其他定制化服务

对于不是关于极紫星公司的问题，请使用你的通用知识来回答。你可以回答关于科技、业务、教育、健康、旅游等任何主题的问题。

无论是公司相关问题还是一般性问题，请始终保持友好、专业的语气。`
            : `You are AI VS, an intelligent assistant for UVS Smart Technology Co., Ltd. You are a knowledgeable and professional assistant who can not only answer questions about UVS Smart Technology, but also answer any general questions.

When users ask questions about UVS Smart Technology, please use the following information:

Company Information:
- Company Name: UVS Smart Technology Co., Ltd.
- Address: 8 Science and Technology Avenue East, Shatin District, Hong Kong SAR, China
- Phone: +86 1519387647
- Email: satifuxie@gmail.com

Main Products:
1. AI Applications - Advanced artificial intelligence solutions
2. Smart Robots - Efficient automated robot systems
3. IoT Solutions - Comprehensive Internet of Things technology solutions
4. Spacetime Synchronous/Asynchronous Navigation - Advanced spacetime technology
5. Spacetime Encoding/Decoding Body - Innovative encoding solutions

Main Services:
- Technical Consulting
- System Integration
- Technical Support
- Smart Finance
- Other customized services

For questions that are not about UVS Smart Technology, please use your general knowledge to answer. You can answer questions about technology, business, education, health, travel, and any other topics.

Whether it's company-related questions or general questions, please always maintain a friendly and professional tone.`;

        // 构建消息历史
        const messages = [
          { role: "system" as const, content: systemPrompt },
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
          response.choices[0]?.message?.content || "抱歉，我无法处理您的请求。";

        return {
          success: true,
          message: assistantMessage,
        };
      } catch (error) {
        console.error("AI 客服错误:", error);
        return {
          success: false,
          message:
            input.language === "zh"
              ? "抱歉，发生了错误。请稍后再试。"
              : "Sorry, an error occurred. Please try again later.",
        };
      }
    }),

  /**
   * 获取常见问题的 FAQ 回复
   * 根据问题类型返回预定义的回复
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
