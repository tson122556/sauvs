/**
 * Stripe Webhook 处理器
 * 处理来自 Stripe 的事件（支付完成、订阅更新等）
 */

import { Request, Response } from "express";
import Stripe from "stripe";
import {
  getOrCreateStripeCustomer,
  createSubscription,
  updateSubscriptionStatus,
  createPayment,
  updatePaymentStatus,
} from "./db";
import { getDb } from "../db";
import { eq } from "drizzle-orm";
import { users } from "../../drizzle/schema";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-01-28.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

/**
 * 验证 Webhook 签名
 */
export function verifyWebhookSignature(
  body: string | Buffer,
  signature: string
): Stripe.Event | null {
  try {
    return stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("[Webhook] Signature verification failed:", error);
    return null;
  }
}

/**
 * 处理 checkout.session.completed 事件
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log("[Webhook] Processing checkout.session.completed:", session.id);

  const userId = session.client_reference_id ? parseInt(session.client_reference_id) : null;
  if (!userId) {
    console.error("[Webhook] No user ID found in session");
    return;
  }

  const stripeCustomerId = session.customer as string;
  if (!stripeCustomerId) {
    console.error("[Webhook] No customer ID found in session");
    return;
  }

  // 确保客户记录存在
  await getOrCreateStripeCustomer(userId, stripeCustomerId);

  // 处理订阅
  if (session.mode === "subscription" && session.subscription) {
    const subscriptionId = session.subscription as string;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const planId = (session.metadata?.planId || "basic") as string;

    const sub = subscription as any;
    await createSubscription({
      userId,
      stripeSubscriptionId: subscriptionId,
      plan: planId as "basic" | "pro" | "enterprise",
      status: sub.status,
      currentPeriodStart: new Date(sub.current_period_start * 1000),
      currentPeriodEnd: new Date(sub.current_period_end * 1000),
    });

    console.log("[Webhook] Subscription created:", subscriptionId);
  }

  // 处理一次性支付
  if (session.mode === "payment" && session.payment_intent) {
    const paymentIntentId = session.payment_intent as string;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    const amount = paymentIntent.amount || 0;
    const currency = paymentIntent.currency || "usd";
    const status = paymentIntent.status;

    const productId = session.metadata?.productId;

    await createPayment({
      userId,
      stripePaymentIntentId: paymentIntentId,
      amount,
      currency,
      status,
      productType: "one_time",
      productId: productId ? parseInt(productId) : undefined,
      paymentMethod: paymentIntent.payment_method as string | undefined,
      receiptUrl: undefined,
    });

    console.log("[Webhook] Payment created:", paymentIntentId);
  }
}

/**
 * 处理 customer.subscription.updated 事件
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log("[Webhook] Processing customer.subscription.updated:", subscription.id);

  await updateSubscriptionStatus(subscription.id, subscription.status);
}

/**
 * 处理 customer.subscription.deleted 事件
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log("[Webhook] Processing customer.subscription.deleted:", subscription.id);

  await updateSubscriptionStatus(subscription.id, "canceled");
}

/**
 * 处理 payment_intent.succeeded 事件
 */
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log("[Webhook] Processing payment_intent.succeeded:", paymentIntent.id);

  await updatePaymentStatus(paymentIntent.id, "succeeded");
}

/**
 * 处理 payment_intent.payment_failed 事件
 */
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log("[Webhook] Processing payment_intent.payment_failed:", paymentIntent.id);

  await updatePaymentStatus(paymentIntent.id, "requires_payment_method");
}

/**
 * 处理 invoice.paid 事件
 */
async function handleInvoicePaid(invoice: Stripe.Invoice) {
  console.log("[Webhook] Processing invoice.paid:", invoice.id);

  // Invoice paid event - typically for subscriptions
  // Update payment status if there's a payment intent
  const paymentIntentId = (invoice as any).payment_intent as string | undefined;
  if (paymentIntentId) {
    const receiptUrl = invoice.hosted_invoice_url || undefined;
    await updatePaymentStatus(paymentIntentId, "succeeded", receiptUrl as string | undefined);
  }
}

/**
 * 主 Webhook 处理器
 */
export async function handleWebhook(req: Request, res: Response) {
  const signature = req.headers["stripe-signature"] as string;

  if (!signature) {
    console.error("[Webhook] No signature found");
    return res.status(400).json({ error: "No signature" });
  }

  // 验证签名
  const event = verifyWebhookSignature(req.body, signature);

  if (!event) {
    console.error("[Webhook] Invalid signature");
    return res.status(400).json({ error: "Invalid signature" });
  }

  // 处理测试事件
  if (event.id.startsWith("evt_test_")) {
    console.log("[Webhook] Test event detected, returning verification response");
    return res.json({
      verified: true,
    });
  }

  try {
    // 处理不同的事件类型
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case "payment_intent.succeeded":
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case "payment_intent.payment_failed":
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      case "invoice.paid":
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;

      default:
        console.log("[Webhook] Unhandled event type:", event.type);
    }

    // 返回成功响应
    res.json({ received: true });
  } catch (error) {
    console.error("[Webhook] Error processing event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
