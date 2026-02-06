import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

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