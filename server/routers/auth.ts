import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import {
  createUserByEmail,
  getUserByEmail,
  getUserById,
  createEmailVerificationToken,
  getEmailVerificationToken,
  markEmailVerificationTokenAsUsed,
  verifyUserEmail,
  createPasswordResetToken,
  getPasswordResetToken,
  markPasswordResetTokenAsUsed,
  updateUserPassword,
  createSession,
  getSession,
  deleteSession,
} from "../db";
import {
  hashPassword,
  verifyPassword,
  generateToken,
  isValidEmail,
  isStrongPassword,
  getTokenExpiryTime,
} from "../auth-utils";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  /**
   * 用户注册
   */
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email("邮箱格式不正确"),
        password: z.string().min(8, "密码至少8个字符"),
        confirmPassword: z.string(),
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

      // 验证密码强度
      const passwordCheck = isStrongPassword(input.password);
      if (!passwordCheck.isStrong) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: passwordCheck.errors.join("; "),
        });
      }

      // 验证两次密码是否一致
      if (input.password !== input.confirmPassword) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "两次密码不一致",
        });
      }

      // 检查邮箱是否已存在
      const existingUser = await getUserByEmail(input.email);
      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "该邮箱已被注册",
        });
      }

      // 创建用户
      const passwordHash = hashPassword(input.password);
      const userId = await createUserByEmail({
        email: input.email,
        name: input.name,
        passwordHash,
      });

      // 生成邮箱验证令牌
      const verificationToken = generateToken();
      const expiryTime = getTokenExpiryTime(24 * 60); // 24小时过期
      await createEmailVerificationToken({
        userId,
        token: verificationToken,
        expiresAt: expiryTime,
      });

      // 返回成功信息（实际应用中应该发送验证邮件）
      return {
        success: true,
        userId,
        message: "注册成功，请检查邮箱验证",
        verificationToken, // 仅用于测试，生产环境应该通过邮件发送
      };
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
      // 获取用户
      const user = await getUserByEmail(input.email);
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "邮箱或密码不正确",
        });
      }

      // 检查用户是否已验证邮箱
      if (!user.emailVerified) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "请先验证邮箱",
        });
      }

      // 检查用户是否启用
      if (!user.isActive) {
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

      // 生成会话令牌
      const sessionToken = generateToken();
      const expiryTime = getTokenExpiryTime(7 * 24 * 60); // 7天过期
      await createSession({
        userId: user.id,
        token: sessionToken,
        expiresAt: expiryTime,
      });

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        sessionToken,
      };
    }),

  /**
   * 验证邮箱
   */
  verifyEmail: publicProcedure
    .input(
      z.object({
        token: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // 获取验证令牌
      const tokenRecord = await getEmailVerificationToken(input.token);
      if (!tokenRecord) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "验证令牌不存在或已过期",
        });
      }

      // 检查令牌是否过期
      if (new Date() > tokenRecord.expiresAt) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "验证令牌已过期",
        });
      }

      // 检查令牌是否已使用
      if (tokenRecord.used) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "验证令牌已被使用",
        });
      }

      // 标记邮箱为已验证
      await verifyUserEmail(tokenRecord.userId);
      await markEmailVerificationTokenAsUsed(tokenRecord.id);

      return {
        success: true,
        message: "邮箱验证成功",
      };
    }),

  /**
   * 请求密码重置
   */
  requestPasswordReset: publicProcedure
    .input(
      z.object({
        email: z.string().email("邮箱格式不正确"),
      })
    )
    .mutation(async ({ input }) => {
      // 获取用户
      const user = await getUserByEmail(input.email);
      if (!user) {
        // 为了安全起见，不要透露邮箱是否存在
        return {
          success: true,
          message: "如果该邮箱已注册，您将收到密码重置链接",
        };
      }

      // 生成密码重置令牌
      const resetToken = generateToken();
      const expiryTime = getTokenExpiryTime(1 * 60); // 1小时过期
      await createPasswordResetToken({
        userId: user.id,
        token: resetToken,
        expiresAt: expiryTime,
      });

      // 返回成功信息（实际应用中应该发送重置邮件）
      return {
        success: true,
        message: "如果该邮箱已注册，您将收到密码重置链接",
        resetToken, // 仅用于测试，生产环境应该通过邮件发送
      };
    }),

  /**
   * 重置密码
   */
  resetPassword: publicProcedure
    .input(
      z.object({
        token: z.string(),
        password: z.string().min(8, "密码至少8个字符"),
        confirmPassword: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // 验证密码强度
      const passwordCheck = isStrongPassword(input.password);
      if (!passwordCheck.isStrong) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: passwordCheck.errors.join("; "),
        });
      }

      // 验证两次密码是否一致
      if (input.password !== input.confirmPassword) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "两次密码不一致",
        });
      }

      // 获取重置令牌
      const tokenRecord = await getPasswordResetToken(input.token);
      if (!tokenRecord) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "重置令牌不存在或已过期",
        });
      }

      // 检查令牌是否过期
      if (new Date() > tokenRecord.expiresAt) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "重置令牌已过期",
        });
      }

      // 检查令牌是否已使用
      if (tokenRecord.used) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "重置令牌已被使用",
        });
      }

      // 更新密码
      const passwordHash = hashPassword(input.password);
      await updateUserPassword(tokenRecord.userId, passwordHash);
      await markPasswordResetTokenAsUsed(tokenRecord.id);

      return {
        success: true,
        message: "密码重置成功，请使用新密码登录",
      };
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

    const user = await getUserById(ctx.user.id);
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "用户不存在",
      });
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      emailVerified: !!user.emailVerified,
      isActive: !!user.isActive,
      createdAt: user.createdAt,
    };
  }),

  /**
   * 登出
   */
  logout: protectedProcedure.mutation(async ({ input, ctx }) => {
    // 删除会话（如果有会话令牌）
    // 这里可以从请求头中获取会话令牌并删除
    return {
      success: true,
      message: "登出成功",
    };
  }),
});
