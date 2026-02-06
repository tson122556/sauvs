/**
 * Stripe 支付数据库查询助手
 * 提供与 Stripe 相关的数据库操作
 */

import { getDb } from "../db";
import {
  stripeCustomers,
  subscriptions,
  payments,
  subscriptionPlans,
  InsertStripeCustomer,
  InsertSubscription,
  InsertPayment,
  InsertSubscriptionPlan,
} from "../../drizzle/schema";
import { eq, and } from "drizzle-orm";

/**
 * 获取或创建 Stripe 客户
 */
export async function getOrCreateStripeCustomer(
  userId: number,
  stripeCustomerId: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await db
    .select()
    .from(stripeCustomers)
    .where(eq(stripeCustomers.userId, userId))
    .limit(1);

  if (existing.length > 0) {
    return existing[0];
  }

  const newCustomer: InsertStripeCustomer = {
    userId,
    stripeCustomerId,
  };

  await db.insert(stripeCustomers).values(newCustomer);
  const created = await db
    .select()
    .from(stripeCustomers)
    .where(eq(stripeCustomers.userId, userId))
    .limit(1);
  return created[0];
}

/**
 * 获取用户的 Stripe 客户 ID
 */
export async function getUserStripeCustomerId(userId: number): Promise<string | null> {
  const db = await getDb();
  if (!db) return null;

  const customer = await db
    .select()
    .from(stripeCustomers)
    .where(eq(stripeCustomers.userId, userId))
    .limit(1);

  return customer.length > 0 ? customer[0].stripeCustomerId : null;
}

/**
 * 创建订阅记录
 */
export async function createSubscription(data: InsertSubscription) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(subscriptions).values(data);
  const created = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.stripeSubscriptionId, data.stripeSubscriptionId))
    .limit(1);
  return created[0];
}

/**
 * 获取用户的活跃订阅
 */
export async function getUserActiveSubscription(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const subs = await db
    .select()
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.userId, userId),
        eq(subscriptions.status, "active")
      )
    )
    .limit(1);

  return subs.length > 0 ? subs[0] : null;
}

/**
 * 更新订阅状态
 */
export async function updateSubscriptionStatus(
  stripeSubscriptionId: string,
  status: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(subscriptions)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.stripeSubscriptionId, stripeSubscriptionId));
}

/**
 * 取消订阅
 */
export async function cancelSubscription(stripeSubscriptionId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(subscriptions)
    .set({
      status: "canceled",
      canceledAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.stripeSubscriptionId, stripeSubscriptionId));
}

/**
 * 创建支付记录
 */
export async function createPayment(data: InsertPayment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(payments).values(data);
  const created = await db
    .select()
    .from(payments)
    .where(eq(payments.stripePaymentIntentId, data.stripePaymentIntentId))
    .limit(1);
  return created[0];
}

/**
 * 获取支付记录
 */
export async function getPayment(stripePaymentIntentId: string) {
  const db = await getDb();
  if (!db) return null;

  const payment = await db
    .select()
    .from(payments)
    .where(eq(payments.stripePaymentIntentId, stripePaymentIntentId))
    .limit(1);

  return payment.length > 0 ? payment[0] : null;
}

/**
 * 更新支付状态
 */
export async function updatePaymentStatus(
  stripePaymentIntentId: string,
  status: string,
  receiptUrl?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(payments)
    .set({
      status,
      receiptUrl,
      updatedAt: new Date(),
    })
    .where(eq(payments.stripePaymentIntentId, stripePaymentIntentId));
}

/**
 * 获取用户的支付历史
 */
export async function getUserPaymentHistory(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(payments)
    .where(eq(payments.userId, userId));
}

/**
 * 创建订阅计划
 */
export async function createSubscriptionPlan(data: InsertSubscriptionPlan) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(subscriptionPlans).values(data);
  const created = await db
    .select()
    .from(subscriptionPlans)
    .where(eq(subscriptionPlans.planId, data.planId))
    .limit(1);
  return created[0];
}

/**
 * 获取所有订阅计划
 */
export async function getAllSubscriptionPlans() {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(subscriptionPlans)
    .where(eq(subscriptionPlans.published, 1));
}

/**
 * 获取订阅计划
 */
export async function getSubscriptionPlan(planId: string) {
  const db = await getDb();
  if (!db) return null;

  const plan = await db
    .select()
    .from(subscriptionPlans)
    .where(eq(subscriptionPlans.planId, planId))
    .limit(1);

  return plan.length > 0 ? plan[0] : null;
}
