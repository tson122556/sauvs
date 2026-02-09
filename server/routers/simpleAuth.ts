import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { hashPassword, verifyPassword, isValidEmail } from "../auth-utils";
import { getDb } from "../db";
import { users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export const simpleAuthRouter = router({
  /**
   * 用户注册
   */
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email("邮箱格式不正确"),
        password: z.string().min(6, "密码至少6个字符"),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // 验证邮箱格式
      if (!isValidEmail(input.email)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "邮箱格式不正确",
        });
      }

      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "数据库连接失败",
        });
      }

      try {
        // 检查邮箱是否已存在
        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, input.email))
          .limit(1);

        if (existingUser.length > 0) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "该邮箱已被注册",
          });
        }

        // 创建用户
        const passwordHash = hashPassword(input.password);
        const result = await db.insert(users).values({
          email: input.email,
          name: input.name || null,
          passwordHash,
          loginMethod: "email",
          isActive: 1,
        } as any);

        const userId = (result as any).insertId;

        return {
          success: true,
          userId,
          message: "注册成功",
        };
      } catch (error: any) {
        if (error.code === "CONFLICT") {
          throw error;
        }
        console.error("[Auth] Register error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "注册失败，请稍后重试",
        });
      }
    }),

  /**
   * 用户登录
   */
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email("邮箱格式不正确"),
        password: z.string(),
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

      try {
        // 获取用户
        const userResult = await db
          .select()
          .from(users)
          .where(eq(users.email, input.email))
          .limit(1);

        if (userResult.length === 0) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "邮箱或密码不正确",
          });
        }

        const user = userResult[0];

        // 检查用户是否启用
        if (user.isActive === 0) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "账户已被禁用",
          });
        }

        // 验证密码
        if (!user.passwordHash || !verifyPassword(input.password, user.passwordHash)) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "邮箱或密码不正确",
          });
        }

        // 更新最后登录时间
        await db
          .update(users)
          .set({ lastSignedIn: new Date() })
          .where(eq(users.id, user.id));

        return {
          success: true,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
        };
      } catch (error: any) {
        if (error.code === "UNAUTHORIZED" || error.code === "FORBIDDEN") {
          throw error;
        }
        console.error("[Auth] Login error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "登录失败，请稍后重试",
        });
      }
    }),

  /**
   * 获取当前用户信息
   */
  me: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "未登录",
      });
    }

    return {
      id: ctx.user.id,
      email: ctx.user.email,
      name: ctx.user.name,
    };
  }),

  /**
   * 登出
   */
  logout: protectedProcedure.mutation(async () => {
    return {
      success: true,
      message: "登出成功",
    };
  }),
});
