import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { invokeLLM } from "../_core/llm";

/**
 * AI 客服路由
 * 提供智能客服对话功能，使用 GPT-4 处理用户问题
 */
export const customerServiceRouter = router({
  /**
   * 发送客服消息并获取 AI 回复
   * 使用 GPT-4 模型智能回答关于公司、产品、服务等的问题
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
        // 构建系统提示词
        const systemPrompt =
          input.language === "zh"
            ? `你是极紫星智慧科技有限公司的在线客服助手。你的职责是帮助用户了解公司信息、产品和服务。

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

请用友好、专业的语气回答用户问题。如果用户询问的内容超出你的知识范围，请建议他们联系我们的销售团队或拨打电话。`
            : `You are an online customer service assistant for UVS Smart Technology Co., Ltd. Your responsibility is to help users learn about the company information, products, and services.

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

Please answer user questions in a friendly and professional tone. If the user asks about content beyond your knowledge, please suggest they contact our sales team or call the phone number.`;

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
          response.choices[0]?.message?.content ||
          (input.language === "zh"
            ? "抱歉，我暂时无法回答您的问题。请稍后重试或联系我们的销售团队。"
            : "Sorry, I cannot answer your question at the moment. Please try again later or contact our sales team.");

        return {
          success: true,
          message: assistantMessage,
          conversationHistory: [
            ...input.conversationHistory,
            { role: "user", content: input.message },
            { role: "assistant", content: assistantMessage },
          ],
        };
      } catch (error) {
        console.error("Customer service error:", error);
        return {
          success: false,
          message:
            input.language === "zh"
              ? "服务暂时不可用，请稍后重试。"
              : "Service is temporarily unavailable. Please try again later.",
          conversationHistory: input.conversationHistory,
        };
      }
    }),

  /**
   * 获取常见问题回复
   * 为常见问题提供预定义的快速回复
   */
  getFAQResponse: publicProcedure
    .input(
      z.object({
        keyword: z.string(),
        language: z.enum(["zh", "en"]).default("zh"),
      })
    )
    .query(({ input }) => {
      const faqResponses =
        input.language === "zh"
          ? {
              价格: "我们提供灵活的定价方案。具体价格取决于您的需求。请联系我们的销售团队获取详细报价。",
              功能: "我们的产品包括 AI 应用、智能机器人、物联网、时空航行器等。每个产品都有独特的功能和优势。",
              支持: "我们提供 24/7 的客户支持。您可以通过电话、邮件或此聊天窗口联系我们。",
              产品: "我们提供多种产品，包括 AI 应用、智能机器人、物联网和时空航行器。您对哪个产品感兴趣？",
              合作: "我们欢迎合作伙伴。请告诉我们您的合作需求，我们会尽快与您联系。",
              技术: "我们的技术团队可以帮助您解决技术问题。请描述您遇到的具体问题。",
              地址: "我们的地址是：中国香港特别行政区沙田区科技大道东8号。",
              电话: "您可以拨打 +86 1519387647 联系我们。",
              邮箱: "您可以发送邮件至 satifuxie@gmail.com 联系我们。",
            }
          : {
              price: "We offer flexible pricing plans. The specific price depends on your needs. Please contact our sales team for a detailed quote.",
              features:
                "Our products include AI applications, smart robots, IoT, spacetime navigation, and more. Each product has unique features and advantages.",
              support:
                "We provide 24/7 customer support. You can contact us via phone, email, or this chat window.",
              products:
                "We offer a variety of products including AI applications, smart robots, IoT, and spacetime navigation. Which product are you interested in?",
              cooperation:
                "We welcome partners. Please tell us your cooperation needs, and we will contact you as soon as possible.",
              technology:
                "Our technical team can help you solve technical problems. Please describe the specific problem you encountered.",
              address:
                "Our address is: 8 Science and Technology Avenue East, Shatin District, Hong Kong SAR, China.",
              phone: "You can call +86 1519387647 to contact us.",
              email: "You can send an email to satifuxie@gmail.com to contact us.",
            };

      // 查找匹配的关键词
      for (const [key, value] of Object.entries(faqResponses)) {
        if (
          input.keyword.toLowerCase().includes(key.toLowerCase()) ||
          key.toLowerCase().includes(input.keyword.toLowerCase())
        ) {
          return { found: true, response: value };
        }
      }

      return { found: false, response: null };
    }),
});
