import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, date } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * 客户咨询表：存储来自网站的客户咨询信息
 */
export const inquiries = mysqlTable("inquiries", {
  id: int("id").autoincrement().primaryKey(),
  /** 客户名称 */
  name: varchar("name", { length: 100 }).notNull(),
  /** 客户邮箱 */
  email: varchar("email", { length: 320 }).notNull(),
  /** 客户电话 */
  phone: varchar("phone", { length: 20 }),
  /** 咨询主题 */
  subject: varchar("subject", { length: 200 }).notNull(),
  /** 咨询内容 */
  message: text("message").notNull(),
  /** 咨询状态：未处理、处理中、已完成 */
  status: mysqlEnum("status", ["pending", "processing", "completed"]).default("pending").notNull(),
  /** 创建时间 */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  /** 更新时间 */
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = typeof inquiries.$inferInsert;

/**
 * 产品表：存储公司的产品信息
 */
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  /** 产品名称 */
  name: varchar("name", { length: 200 }).notNull(),
  /** 产品分类：AI应用、智能机器人、物联网 */
  category: mysqlEnum("category", ["ai", "robot", "iot"]).notNull(),
  /** 产品描述 */
  description: text("description"),
  /** 产品详细信息 */
  details: text("details"),
  /** 产品图片 URL */
  imageUrl: text("imageUrl"),
  /** 是否发布 */
  published: int("published").default(1).notNull(),
  /** 创建时间 */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  /** 更新时间 */
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * 新闻动态表：存储公司的新闻和动态
 */
export const news = mysqlTable("news", {
  id: int("id").autoincrement().primaryKey(),
  /** 新闻标题 */
  title: varchar("title", { length: 300 }).notNull(),
  /** 新闻内容 */
  content: text("content").notNull(),
  /** 新闻摘要 */
  summary: text("summary"),
  /** 新闻图片 URL */
  imageUrl: text("imageUrl"),
  /** 新闻分类 */
  category: varchar("category", { length: 100 }),
  /** 是否发布 */
  published: int("published").default(1).notNull(),
  /** 发布时间 */
  publishedAt: timestamp("publishedAt").defaultNow().notNull(),
  /** 创建时间 */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  /** 更新时间 */
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type News = typeof news.$inferSelect;
export type InsertNews = typeof news.$inferInsert;

/**
 * 预约表：存储客户的咨询预约信息
 */
export const appointments = mysqlTable("appointments", {
  id: int("id").autoincrement().primaryKey(),
  /** 客户名称 */
  name: varchar("name", { length: 100 }).notNull(),
  /** 客户邮箱 */
  email: varchar("email", { length: 320 }).notNull(),
  /** 客户电话 */
  phone: varchar("phone", { length: 20 }).notNull(),
  /** 咨询类型：AI应用、智能机器人、物联网 */
  consultationType: mysqlEnum("consultationType", ["ai", "robot", "iot"]).notNull(),
  /** 偏好日期 */
  preferredDate: varchar("preferredDate", { length: 20 }).notNull(),
  /** 偏好时间 */
  preferredTime: varchar("preferredTime", { length: 10 }).default("09:00").notNull(),
  /** 备注信息 */
  message: text("message"),
  /** 预约状态：待处理、已确认、已完成、已取消 */
  status: mysqlEnum("status", ["pending", "confirmed", "completed", "cancelled"]).default("pending").notNull(),
  /** 创建时间 */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  /** 更新时间 */
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = typeof appointments.$inferInsert;

/**
 * UVS AI 对话表：存储用户与 AI 的对话记录
 */
export const aiConversations = mysqlTable("aiConversations", {
  id: int("id").autoincrement().primaryKey(),
  /** 用户 ID，关联 users 表 */
  userId: int("userId").notNull(),
  /** 对话标题 */
  title: varchar("title", { length: 300 }).notNull(),
  /** 对话模型：gpt-4, claude, grok, gemini, kimi, deepseek */
  model: varchar("model", { length: 50 }).default("gpt-4").notNull(),
  /** 对话摘要 */
  summary: text("summary"),
  /** 消息总数 */
  messageCount: int("messageCount").default(0).notNull(),
  /** 创建时间 */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  /** 更新时间 */
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AIConversation = typeof aiConversations.$inferSelect;
export type InsertAIConversation = typeof aiConversations.$inferInsert;

/**
 * UVS AI 消息表：存储对话中的每条消息
 */
export const aiMessages = mysqlTable("aiMessages", {
  id: int("id").autoincrement().primaryKey(),
  /** 对话 ID，关联 aiConversations 表 */
  conversationId: int("conversationId").notNull(),
  /** 消息角色：user 或 assistant */
  role: mysqlEnum("role", ["user", "assistant"]).notNull(),
  /** 消息内容 */
  content: text("content").notNull(),
  /** 使用的模型（仅对 assistant 消息） */
  model: varchar("model", { length: 50 }),
  /** 消息令牌数 */
  tokenCount: int("tokenCount").default(0),
  /** 创建时间 */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AIMessage = typeof aiMessages.$inferSelect;
export type InsertAIMessage = typeof aiMessages.$inferInsert;

/**
 * UVS AI 使用统计表：记录 API 调用统计
 */
export const aiUsageStats = mysqlTable("aiUsageStats", {
  id: int("id").autoincrement().primaryKey(),
  /** 用户 ID */
  userId: int("userId").notNull(),
  /** 模型名称 */
  model: varchar("model", { length: 50 }).notNull(),
  /** 调用次数 */
  callCount: int("callCount").default(0).notNull(),
  /** 总令牌数 */
  totalTokens: int("totalTokens").default(0).notNull(),
  /** 成功调用次数 */
  successCount: int("successCount").default(0).notNull(),
  /** 失败调用次数 */
  failureCount: int("failureCount").default(0).notNull(),
  /** 统计日期 */
  statDate: date("statDate").notNull(),
  /** 创建时间 */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  /** 更新时间 */
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AIUsageStat = typeof aiUsageStats.$inferSelect;
export type InsertAIUsageStat = typeof aiUsageStats.$inferInsert;


/**
 * Stripe 客户表：存储 Stripe 客户信息和用户的关联
 */
export const stripeCustomers = mysqlTable("stripeCustomers", {
  id: int("id").autoincrement().primaryKey(),
  /** 用户 ID，关联 users 表 */
  userId: int("userId").notNull().unique(),
  /** Stripe 客户 ID */
  stripeCustomerId: varchar("stripeCustomerId", { length: 100 }).notNull().unique(),
  /** 创建时间 */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  /** 更新时间 */
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StripeCustomer = typeof stripeCustomers.$inferSelect;
export type InsertStripeCustomer = typeof stripeCustomers.$inferInsert;

/**
 * 订阅表：存储用户的订阅信息
 */
export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  /** 用户 ID */
  userId: int("userId").notNull(),
  /** Stripe 订阅 ID */
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 100 }).notNull().unique(),
  /** 订阅计划：basic, pro, enterprise */
  plan: mysqlEnum("plan", ["basic", "pro", "enterprise"]).notNull(),
  /** 订阅状态：active, past_due, canceled, unpaid */
  status: varchar("status", { length: 50 }).notNull(),
  /** 当前周期开始时间 */
  currentPeriodStart: timestamp("currentPeriodStart"),
  /** 当前周期结束时间 */
  currentPeriodEnd: timestamp("currentPeriodEnd"),
  /** 取消时间 */
  canceledAt: timestamp("canceledAt"),
  /** 创建时间 */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  /** 更新时间 */
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

/**
 * 支付表：存储订单和支付信息
 */
export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  /** 用户 ID */
  userId: int("userId").notNull(),
  /** Stripe 支付意图 ID */
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 100 }).notNull().unique(),
  /** 金额（以美分计） */
  amount: int("amount").notNull(),
  /** 货币 */
  currency: varchar("currency", { length: 10 }).default("usd").notNull(),
  /** 支付状态：succeeded, processing, requires_payment_method */
  status: varchar("status", { length: 50 }).notNull(),
  /** 产品类型：subscription, one_time */
  productType: mysqlEnum("productType", ["subscription", "one_time"]).notNull(),
  /** 产品 ID（如果是一次性购买） */
  productId: int("productId"),
  /** 订阅 ID（如果是订阅相关的支付） */
  subscriptionId: int("subscriptionId"),
  /** 支付方法信息 */
  paymentMethod: varchar("paymentMethod", { length: 100 }),
  /** 收据 URL */
  receiptUrl: text("receiptUrl"),
  /** 创建时间 */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  /** 更新时间 */
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;

/**
 * 订阅计划表：存储可用的订阅计划
 */
export const subscriptionPlans = mysqlTable("subscriptionPlans", {
  id: int("id").autoincrement().primaryKey(),
  /** 计划名称 */
  name: varchar("name", { length: 100 }).notNull(),
  /** 计划标识：basic, pro, enterprise */
  planId: varchar("planId", { length: 50 }).notNull().unique(),
  /** 计划描述 */
  description: text("description"),
  /** 月价格（以美分计） */
  monthlyPrice: int("monthlyPrice").notNull(),
  /** 年价格（以美分计） */
  yearlyPrice: int("yearlyPrice"),
  /** Stripe 产品 ID */
  stripeProductId: varchar("stripeProductId", { length: 100 }).notNull(),
  /** Stripe 月价格 ID */
  stripePriceIdMonthly: varchar("stripePriceIdMonthly", { length: 100 }).notNull(),
  /** Stripe 年价格 ID */
  stripePriceIdYearly: varchar("stripePriceIdYearly", { length: 100 }),
  /** 功能列表（JSON 格式） */
  features: text("features"),
  /** 是否发布 */
  published: int("published").default(1).notNull(),
  /** 创建时间 */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  /** 更新时间 */
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;
export type InsertSubscriptionPlan = typeof subscriptionPlans.$inferInsert;
