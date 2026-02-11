import { publicProcedure, adminProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { news } from "../../drizzle/schema";
import { eq, desc, and } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const newsRouter = router({
  /**
   * 获取所有已发布的新闻（分页）
   */
  getPublished: publicProcedure
    .input(
      z.object({
        page: z.number().int().positive().default(1),
        pageSize: z.number().int().positive().max(100).default(10),
        category: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "数据库连接失败",
        });
      }

      const offset = (input.page - 1) * input.pageSize;

      const whereConditions = [eq(news.published, 1)];
      if (input.category) {
        whereConditions.push(eq(news.category, input.category));
      }

      const items = await db
        .select()
        .from(news)
        .where(and(...whereConditions))
        .orderBy(desc(news.publishedAt))
        .limit(input.pageSize)
        .offset(offset);

      const countResult = await db
        .select({ count: db.$count(news) })
        .from(news)
        .where(and(...whereConditions));

      const total = countResult[0]?.count || 0;

      return {
        items,
        total,
        page: input.page,
        pageSize: input.pageSize,
        totalPages: Math.ceil(total / input.pageSize),
      };
    }),

  /**
   * 获取单条新闻详情
   */
  getById: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "数据库连接失败",
        });
      }

      const item = await db
        .select()
        .from(news)
        .where(and(eq(news.id, input.id), eq(news.published, 1)))
        .limit(1);

      if (!item.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "新闻不存在",
        });
      }

      return item[0];
    }),

  /**
   * 获取最新的新闻（用于首页展示）
   */
  getLatest: publicProcedure
    .input(z.object({ limit: z.number().int().positive().max(10).default(5) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "数据库连接失败",
        });
      }

      return await db
        .select()
        .from(news)
        .where(eq(news.published, 1))
        .orderBy(desc(news.publishedAt))
        .limit(input.limit);
    }),

  /**
   * 获取所有新闻（管理员）
   */
  getAll: adminProcedure
    .input(
      z.object({
        page: z.number().int().positive().default(1),
        pageSize: z.number().int().positive().max(100).default(20),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "数据库连接失败",
        });
      }

      const offset = (input.page - 1) * input.pageSize;

      const items = await db
        .select()
        .from(news)
        .orderBy(desc(news.createdAt))
        .limit(input.pageSize)
        .offset(offset);

      const countResult = await db
        .select({ count: db.$count(news) })
        .from(news);

      const total = countResult[0]?.count || 0;

      return {
        items,
        total,
        page: input.page,
        pageSize: input.pageSize,
        totalPages: Math.ceil(total / input.pageSize),
      };
    }),

  /**
   * 创建新闻（管理员）
   */
  create: adminProcedure
    .input(
      z.object({
        title: z.string().min(1).max(300),
        content: z.string().min(1),
        summary: z.string().optional(),
        imageUrl: z.string().optional(),
        category: z.string().optional(),
        published: z.number().int().default(1),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "数据库连接失败",
        });
      }

      await db.insert(news).values({
        title: input.title,
        content: input.content,
        summary: input.summary,
        imageUrl: input.imageUrl,
        category: input.category,
        published: input.published,
        publishedAt: new Date(),
      });

      return {
        ...input,
      };
    }),

  /**
   * 更新新闻（管理员）
   */
  update: adminProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        title: z.string().min(1).max(300).optional(),
        content: z.string().min(1).optional(),
        summary: z.string().optional(),
        imageUrl: z.string().optional(),
        category: z.string().optional(),
        published: z.number().int().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "数据库连接失败",
        });
      }

      const { id, ...updateData } = input;

      const updatePayload: any = {};
      if (updateData.title !== undefined) updatePayload.title = updateData.title;
      if (updateData.content !== undefined) updatePayload.content = updateData.content;
      if (updateData.summary !== undefined) updatePayload.summary = updateData.summary;
      if (updateData.imageUrl !== undefined) updatePayload.imageUrl = updateData.imageUrl;
      if (updateData.category !== undefined) updatePayload.category = updateData.category;
      if (updateData.published !== undefined) updatePayload.published = updateData.published;
      updatePayload.updatedAt = new Date();

      await db.update(news).set(updatePayload).where(eq(news.id, id));

      return { id, ...updateData };
    }),

  /**
   * 删除新闻（管理员）
   */
  delete: adminProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "数据库连接失败",
        });
      }

      await db.delete(news).where(eq(news.id, input.id));
      return { success: true };
    }),
});
