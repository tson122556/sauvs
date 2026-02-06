/**
 * Stripe 产品和价格配置
 * 定义所有可用的订阅计划和一次性产品
 */

export interface SubscriptionPlanConfig {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number; // 以美分计
  yearlyPrice?: number; // 以美分计
  features: string[];
}

export interface OneTimeProductConfig {
  id: string;
  name: string;
  description: string;
  price: number; // 以美分计
}

/**
 * 订阅计划配置
 * 这些是预定义的计划，可以在 Stripe Dashboard 中创建对应的产品和价格
 */
export const SUBSCRIPTION_PLANS: Record<string, SubscriptionPlanConfig> = {
  basic: {
    id: "basic",
    name: "Basic Plan",
    description: "Perfect for getting started",
    monthlyPrice: 999, // $9.99/month
    yearlyPrice: 9990, // $99.90/year
    features: [
      "Up to 100 AI conversations per month",
      "Access to GPT-4 and Claude models",
      "Basic analytics",
      "Email support",
    ],
  },
  pro: {
    id: "pro",
    name: "Pro Plan",
    description: "For power users",
    monthlyPrice: 2999, // $29.99/month
    yearlyPrice: 29990, // $299.90/year
    features: [
      "Unlimited AI conversations",
      "Access to all AI models",
      "Advanced analytics",
      "Priority email support",
      "Custom model training",
      "API access",
    ],
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise Plan",
    description: "For large organizations",
    monthlyPrice: 9999, // $99.99/month
    yearlyPrice: 99990, // $999.90/year
    features: [
      "Unlimited everything",
      "Dedicated account manager",
      "Custom integration support",
      "Phone support",
      "SLA guarantee",
      "Custom billing",
    ],
  },
};

/**
 * 一次性产品配置
 */
export const ONE_TIME_PRODUCTS: Record<string, OneTimeProductConfig> = {
  ai_tokens_100: {
    id: "ai_tokens_100",
    name: "100 AI Tokens",
    description: "100 tokens for AI API calls",
    price: 999, // $9.99
  },
  ai_tokens_500: {
    id: "ai_tokens_500",
    name: "500 AI Tokens",
    description: "500 tokens for AI API calls",
    price: 3999, // $39.99
  },
  ai_tokens_1000: {
    id: "ai_tokens_1000",
    name: "1000 AI Tokens",
    description: "1000 tokens for AI API calls",
    price: 6999, // $69.99
  },
};

/**
 * 获取订阅计划配置
 */
export function getSubscriptionPlan(planId: string): SubscriptionPlanConfig | null {
  return SUBSCRIPTION_PLANS[planId] || null;
}

/**
 * 获取所有订阅计划
 */
export function getAllSubscriptionPlans(): SubscriptionPlanConfig[] {
  return Object.values(SUBSCRIPTION_PLANS);
}

/**
 * 获取一次性产品配置
 */
export function getOneTimeProduct(productId: string): OneTimeProductConfig | null {
  return ONE_TIME_PRODUCTS[productId] || null;
}

/**
 * 获取所有一次性产品
 */
export function getAllOneTimeProducts(): OneTimeProductConfig[] {
  return Object.values(ONE_TIME_PRODUCTS);
}
