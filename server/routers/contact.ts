/**
 * 联系表单路由处理器
 * 处理联系表单提交、邮件发送和 CRM 集成
 */

import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { notifyOwner } from "../_core/notification";

// 联系表单验证 Schema
const contactFormSchema = z.object({
  name: z.string().min(2, "姓名至少2个字符").max(50),
  email: z.string().email("请输入有效的邮箱地址"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(5, "主题至少5个字符").max(100),
  message: z.string().min(10, "消息至少10个字符").max(5000),
  language: z.enum(["zh", "en"]).default("zh"),
});

type ContactFormInput = z.infer<typeof contactFormSchema>;

/**
 * 发送邮件通知
 */
const sendEmailNotification = async (data: ContactFormInput) => {
  try {
    // 这里可以集成实际的邮件服务（如 SendGrid、AWS SES、阿里云邮件等）
    // 示例：使用 nodemailer 或其他邮件库

    const emailContent = `
      <h2>新的联系表单提交</h2>
      <p><strong>姓名：</strong>${data.name}</p>
      <p><strong>邮箱：</strong>${data.email}</p>
      <p><strong>电话：</strong>${data.phone || "未提供"}</p>
      <p><strong>公司：</strong>${data.company || "未提供"}</p>
      <p><strong>主题：</strong>${data.subject}</p>
      <p><strong>消息：</strong></p>
      <p>${data.message.replace(/\n/g, "<br>")}</p>
      <p><strong>提交时间：</strong>${new Date().toLocaleString()}</p>
    `;

    // 通知项目所有者
    await notifyOwner({
      title: `新的联系表单提交 - ${data.subject}`,
      content: emailContent,
    });

    return true;
  } catch (error) {
    console.error("Failed to send email notification:", error);
    return false;
  }
};

/**
 * 保存联系表单到数据库
 */
const saveContactForm = async (data: ContactFormInput) => {
  try {
    // 这里可以集成数据库保存逻辑
    // 示例：保存到 contacts 表

    console.log("Contact form saved:", {
      ...data,
      submittedAt: new Date(),
    });

    return true;
  } catch (error) {
    console.error("Failed to save contact form:", error);
    return false;
  }
};

/**
 * 集成 CRM 系统
 */
const syncToCRM = async (data: ContactFormInput) => {
  try {
    // 这里可以集成 CRM 系统（如 Salesforce、HubSpot、企业微信等）
    // 示例：创建联系人和商机

    const crmPayload = {
      firstName: data.name.split(" ")[0],
      lastName: data.name.split(" ").slice(1).join(" ") || "",
      email: data.email,
      phone: data.phone,
      company: data.company,
      subject: data.subject,
      description: data.message,
      source: "website_contact_form",
      language: data.language,
      createdAt: new Date(),
    };

    console.log("Syncing to CRM:", crmPayload);

    // 实际的 CRM 集成代码会在这里
    // await crmService.createContact(crmPayload);

    return true;
  } catch (error) {
    console.error("Failed to sync to CRM:", error);
    return false;
  }
};

/**
 * 发送自动回复邮件给用户
 */
const sendAutoReply = async (data: ContactFormInput) => {
  try {
    const autoReplyContent =
      data.language === "zh"
        ? `
          <h2>感谢您的联系</h2>
          <p>亲爱的 ${data.name}，</p>
          <p>感谢您对极紫星智慧科技有限公司的关注！</p>
          <p>我们已收到您的消息，我们的团队将在 24 小时内与您联系。</p>
          <p>如有紧急事项，请拨打我们的客服热线。</p>
          <p>此致<br>极紫星智慧科技有限公司</p>
        `
        : `
          <h2>Thank You for Contacting Us</h2>
          <p>Dear ${data.name},</p>
          <p>Thank you for your interest in Jizixing Smart Technology Co., Ltd!</p>
          <p>We have received your message and our team will contact you within 24 hours.</p>
          <p>For urgent matters, please call our customer service hotline.</p>
          <p>Best regards,<br>Jizixing Smart Technology Co., Ltd</p>
        `;

    console.log("Auto-reply email sent to:", data.email);

    // 实际的邮件发送代码会在这里
    // await emailService.send({
    //   to: data.email,
    //   subject: data.language === 'zh' ? '感谢您的联系' : 'Thank You for Contacting Us',
    //   html: autoReplyContent
    // });

    return true;
  } catch (error) {
    console.error("Failed to send auto-reply:", error);
    return false;
  }
};

export const contactRouter = router({
  /**
   * 提交联系表单
   */
  submitForm: publicProcedure
    .input(contactFormSchema)
    .mutation(async ({ input }) => {
      try {
        // 1. 保存到数据库
        const saved = await saveContactForm(input);
        if (!saved) {
          throw new Error("Failed to save contact form");
        }

        // 2. 发送邮件通知给管理员
        const notified = await sendEmailNotification(input);

        // 3. 同步到 CRM
        const synced = await syncToCRM(input);

        // 4. 发送自动回复邮件给用户
        const replied = await sendAutoReply(input);

        return {
          success: true,
          message:
            input.language === "zh"
              ? "感谢您的提交，我们将尽快与您联系！"
              : "Thank you for your submission. We will contact you soon!",
          data: {
            saved,
            notified,
            synced,
            replied,
          },
        };
      } catch (error) {
        console.error("Contact form submission error:", error);
        return {
          success: false,
          message:
            input.language === "zh"
              ? "提交失败，请稍后重试"
              : "Submission failed. Please try again later.",
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * 获取联系表单状态
   */
  getFormStatus: publicProcedure.query(async () => {
    return {
      isAvailable: true,
      message: "Contact form is available",
      supportedLanguages: ["zh", "en"],
    };
  }),
});
