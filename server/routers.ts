import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { createInquiry, getInquiries, updateInquiryStatus, createProduct, getProducts, getProductById, updateProduct, createNews, getNews, getNewsById, updateNews, createAppointment, getAppointments } from "./db";
import { uvsAIRouter } from "./routers/uvsAI";
import { aiChatRouter } from "./routers/aiChat";
import { uvsChatStreamRouter } from "./routers/uvsChatStream";
import { modalityChatRouter } from "./routers/modalityChat";
import { uvsAIChatRouter } from "./routers/uvsAIChat";
import { contactRouter } from "./routers/contact";
import { stripeRouter } from "./routers/stripe";
import { simpleAuthRouter } from "./routers/simpleAuth";
import { sendAppointmentConfirmationEmail } from "./email";

export const appRouter = router({
  system: systemRouter,
  uvsAI: uvsAIRouter,
  aiChat: aiChatRouter,
  uvsChatStream: uvsChatStreamRouter,
  modalityChat: modalityChatRouter,
  uvsAIChat: uvsAIChatRouter,
  contact: contactRouter,
  stripe: stripeRouter,
  auth: simpleAuthRouter,

  // 咨询相关 API
  inquiries: router({
    // 创建咨询（公开）
    create: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string().min(1),
        message: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        await createInquiry(input);
        return { success: true };
      }),
    // 获取所有咨询（仅管理员）
    list: protectedProcedure
      .input(z.object({
        limit: z.number().default(50),
        offset: z.number().default(0),
      }))
      .query(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        return await getInquiries(input.limit, input.offset);
      }),
    // 更新咨询状态（仅管理员）
    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(['pending', 'processing', 'completed']),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        await updateInquiryStatus(input.id, input.status);
        return { success: true };
      }),
  }),

  // 产品相关 API
  products: router({
    // 创建产品（仅管理员）
    create: protectedProcedure
      .input(z.object({
        name: z.string().min(1),
        category: z.enum(['ai', 'robot', 'iot']),
        description: z.string().optional(),
        details: z.string().optional(),
        imageUrl: z.string().optional(),
        published: z.number().default(1),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        await createProduct(input);
        return { success: true };
      }),
    // 获取所有产品（公开）
    list: publicProcedure.query(async () => {
      return await getProducts(true);
    }),
    // 获取产品详情（公开）
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getProductById(input.id);
      }),
    // 更新产品（仅管理员）
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        category: z.enum(['ai', 'robot', 'iot']).optional(),
        description: z.string().optional(),
        details: z.string().optional(),
        imageUrl: z.string().optional(),
        published: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        const { id, ...data } = input;
        await updateProduct(id, data);
        return { success: true };
      }),
  }),

  // 预约相关 API
  appointments: router({
    // 创建预约（公开）
    create: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(1),
        consultationType: z.enum(['ai', 'robot', 'iot']),
        preferredDate: z.string().min(1),
        preferredTime: z.string().default('09:00'),
        message: z.string().optional().default(''),
      }))
      .mutation(async ({ input }) => {
        await createAppointment(input);
        
        // 发送确认邮件
        const consultationTypeMap: Record<string, string> = {
          ai: 'AI 应用咨询',
          robot: '智能机器人咨询',
          iot: 'IoT 解决方案咨询',
        };
        
        await sendAppointmentConfirmationEmail({
          email: input.email,
          name: input.name,
          consultationType: consultationTypeMap[input.consultationType],
          appointmentDate: input.preferredDate,
          appointmentTime: input.preferredTime,
          phone: input.phone,
        });
        
        return { success: true };
      }),
    // 获取所有预约（仅管理员）
    list: protectedProcedure
      .input(z.object({
        limit: z.number().default(50),
        offset: z.number().default(0),
      }))
      .query(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        return await getAppointments(input.limit, input.offset);
      }),
    // 发送提醒邮件（仅管理员）
    sendReminder: protectedProcedure
      .input(z.object({
        appointmentId: z.number(),
        name: z.string(),
        email: z.string().email(),
        consultationType: z.string(),
        appointmentDate: z.string(),
        appointmentTime: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        
        const { sendAppointmentReminderEmail } = await import('./email');
        await sendAppointmentReminderEmail({
          email: input.email,
          name: input.name,
          consultationType: input.consultationType,
          appointmentDate: input.appointmentDate,
          appointmentTime: input.appointmentTime,
          phone: '', // 提醒邮件中不需要电话
        });
        
        return { success: true };
      }),
  }),

  // 新闻相关 API
  news: router({
    // 创建新闻（仅管理员）
    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        summary: z.string().optional(),
        imageUrl: z.string().optional(),
        category: z.string().optional(),
        published: z.number().default(1),
        publishedAt: z.date().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        await createNews(input);
        return { success: true };
      }),
    // 获取新闻列表（公开）
    list: publicProcedure
      .input(z.object({
        limit: z.number().default(10),
        offset: z.number().default(0),
      }))
      .query(async ({ input }) => {
        return await getNews(input.limit, input.offset, true);
      }),
    // 获取新闻详情（公开）
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getNewsById(input.id);
      }),
    // 更新新闻（仅管理员）
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        content: z.string().optional(),
        summary: z.string().optional(),
        imageUrl: z.string().optional(),
        category: z.string().optional(),
        published: z.number().optional(),
        publishedAt: z.date().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        const { id, ...data } = input;
        await updateNews(id, data);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
