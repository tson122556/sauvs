/**
 * Stripe 支付 tRPC 路由
 * 处理所有与支付相关的 API 端点
 */

import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import Stripe from "stripe";
import {
  getOrCreateStripeCustomer,
  getUserStripeCustomerId,
  createSubscription,
  getUserActiveSubscription,
  cancelSubscription,
  createPayment,
  getUserPaymentHistory,
  getAllSubscriptionPlans,
  getSubscriptionPlan,
} from "../stripe/db";
import { SUBSCRIPTION_PLANS } from "../stripe/products";

// 初始化 Stripe
// 只在有有效密钥时初始化 Stripe 客户端
let stripe: Stripe | null = null;

if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-01-28.clover" as any,
  });
}

// 辅助函数：检查 Stripe 是否已配置
function ensureStripeConfigured() {
  if (!stripe || !process.env.STRIPE_SECRET_KEY) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.",
    });
  }
  return stripe;
}

export const stripeRouter = router({
  /**
   * 获取所有订阅计划
   */
  getSubscriptionPlans: publicProcedure.query(async () => {
    try {
      const plans = await getAllSubscriptionPlans();
      return plans.map((plan) => ({
        id: plan.id,
        planId: plan.planId,
        name: plan.name,
        description: plan.description,
        monthlyPrice: plan.monthlyPrice,
        yearlyPrice: plan.yearlyPrice,
        features: plan.features ? JSON.parse(plan.features) : [],
      }));
    } catch (error) {
      console.error("[Stripe] Error fetching subscription plans:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch subscription plans",
      });
    }
  }),

  /**
   * 创建订阅 Checkout Session
   */
  createSubscriptionCheckout: protectedProcedure
    .input(
      z.object({
        planId: z.enum(["basic", "pro", "enterprise"]),
        billingCycle: z.enum(["monthly", "yearly"]).default("monthly"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        if (!ctx.user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "User not authenticated",
          });
        }

        // 获取或创建 Stripe 客户
        let stripeCustomerId = await getUserStripeCustomerId(ctx.user.id);
        if (!stripeCustomerId) {
          const stripeClient = ensureStripeConfigured();
          const customer = await stripeClient.customers.create({
            email: ctx.user.email || undefined,
            name: ctx.user.name || undefined,
            metadata: {
              userId: ctx.user.id.toString(),
            },
          });
          if (customer.id) {
            stripeCustomerId = customer.id as string;
            await getOrCreateStripeCustomer(ctx.user.id, stripeCustomerId);
          } else {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to create Stripe customer",
            });
          }
        }

        // 获取订阅计划配置
        const plan = SUBSCRIPTION_PLANS[input.planId];
        if (!plan) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid plan ID",
          });
        }

        // 确定价格 ID
        const planRecord = await getSubscriptionPlan(input.planId);
        if (!planRecord) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Plan not found in database",
          });
        }

        const priceId =
          input.billingCycle === "yearly"
            ? planRecord.stripePriceIdYearly
            : planRecord.stripePriceIdMonthly;

        if (!priceId) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Price not configured",
          });
        }

        // 创建 Checkout Session
        const stripeClient = ensureStripeConfigured();
        const session = await stripeClient.checkout.sessions.create({
          customer: stripeCustomerId,
          mode: "subscription",
          payment_method_types: ["card"],
          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],
          success_url: `${ctx.req?.headers.origin || "http://localhost:3000"}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${ctx.req?.headers.origin || "http://localhost:3000"}/payments/cancel`,
          client_reference_id: ctx.user.id.toString(),
          metadata: {
            userId: ctx.user.id.toString(),
            planId: input.planId,
          },
          allow_promotion_codes: true,
              } as Parameters<typeof stripeClient.checkout.sessions.create>[0]);

        if (!session.url) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create checkout session",
          });
        }

        return {
          sessionId: session.id,
          url: session.url,
        };
      } catch (error) {
        console.error("[Stripe] Error creating subscription checkout:", error);
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create checkout session",
        });
      }
    }),

  /**
   * 创建一次性购买 Checkout Session
   */
  createOneTimeCheckout: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive().default(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        if (!ctx.user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "User not authenticated",
          });
        }

           // 获取或创建 Stripe 客户
        let stripeCustomerId = await getUserStripeCustomerId(ctx.user.id);
        if (!stripeCustomerId) {
          const stripeClient = ensureStripeConfigured();
          const customer = await stripeClient.customers.create({
            email: ctx.user.email || undefined,
            name: ctx.user.name || undefined,
            metadata: {
              userId: ctx.user.id.toString(),
            },
          });
          if (customer.id) {
            stripeCustomerId = customer.id as string;
            await getOrCreateStripeCustomer(ctx.user.id, stripeCustomerId);
          } else {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to create Stripe customer",
            });
          }
        }

        // 获取一次性产品配置信息
        // 为了演示，我们使用硬编码的产品
        const products: Record<
          string,
          { name: string; price: number; stripePriceId: string }
        > = {
          ai_tokens_100: {
            name: "100 AI Tokens",
            price: 999,
            stripePriceId: "price_ai_tokens_100", // 需要在 Stripe 中配置
          },
          ai_tokens_500: {
            name: "500 AI Tokens",
            price: 3999,
            stripePriceId: "price_ai_tokens_500",
          },
          ai_tokens_1000: {
            name: "1000 AI Tokens",
            price: 6999,
            stripePriceId: "price_ai_tokens_1000",
          },
        };

        const product = products[input.productId];
        if (!product) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid product ID",
          });
        }

        // 创建 Checkout Session
        const stripeClient = ensureStripeConfigured();
        const session = await stripeClient.checkout.sessions.create({
          customer: stripeCustomerId,
          mode: "payment",
          payment_method_types: ["card"],
          line_items: [
            {
              price: product.stripePriceId,
              quantity: input.quantity,
            },
          ],
          success_url: `${ctx.req?.headers.origin || "http://localhost:3000"}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${ctx.req?.headers.origin || "http://localhost:3000"}/payments/cancel`,
          client_reference_id: ctx.user.id.toString(),
          metadata: {
            userId: ctx.user.id.toString(),
            productId: input.productId,
          },
          allow_promotion_codes: true,
        } as Parameters<typeof stripeClient.checkout.sessions.create>[0]);

        if (!session.url) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create checkout session",
          });
        }

        return {
          sessionId: session.id,
          url: session.url,
        };
      } catch (error) {
        console.error("[Stripe] Error creating one-time checkout:", error);
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create checkout session",
        });
      }
    }),

  /**
   * 获取用户的活跃订阅
   */
  getActiveSubscription: protectedProcedure.query(async ({ ctx }) => {
    try {
      if (!ctx.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not authenticated",
        });
      }

      const subscription = await getUserActiveSubscription(ctx.user.id);
      if (!subscription) {
        return null;
      }

      return {
        id: subscription.id,
        plan: subscription.plan,
        status: subscription.status,
        currentPeriodStart: subscription.currentPeriodStart,
        currentPeriodEnd: subscription.currentPeriodEnd,
      };
    } catch (error) {
      console.error("[Stripe] Error fetching active subscription:", error);
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch subscription",
      });
    }
  }),

  /**
   * 取消订阅
   */
  cancelSubscription: protectedProcedure
    .input(z.object({ stripeSubscriptionId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        if (!ctx.user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "User not authenticated",
          });
        }

        // 在 Stripe 中取消订阅
        const stripeClient = ensureStripeConfigured();
        await stripeClient.subscriptions.update(input.stripeSubscriptionId, {
          cancel_at_period_end: true,
        });

        // 在数据库中更新订阅状态
        await cancelSubscription(input.stripeSubscriptionId);

        return {
          success: true,
          message: "Subscription cancelled successfully",
        };
      } catch (error) {
        console.error("[Stripe] Error cancelling subscription:", error);
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to cancel subscription",
        });
      }
    }),

  /**
   * 获取支付历史
   */
  getPaymentHistory: protectedProcedure.query(async ({ ctx }) => {
    try {
      if (!ctx.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not authenticated",
        });
      }

      const payments = await getUserPaymentHistory(ctx.user.id);
      return payments.map((payment) => ({
        id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        productType: payment.productType,
        createdAt: payment.createdAt,
      }));
    } catch (error) {
      console.error("[Stripe] Error fetching payment history:", error);
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch payment history",
      });
    }
  }),

  /**
   * 获取 Checkout Session 状态
   */
  getCheckoutSessionStatus: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      try {
        const stripeClient = ensureStripeConfigured();
        const session = await stripeClient.checkout.sessions.retrieve(input.sessionId);
        return {
          id: session.id,
          status: session.payment_status,
          paymentStatus: session.payment_status,
          subscriptionId: session.subscription as string | null,
          paymentIntentId: session.payment_intent as string | null,
        };
      } catch (error) {
        console.error("[Stripe] Error fetching session status:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch session status",
        });
      }
    }),
});
