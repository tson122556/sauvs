import { getDb } from "./db";
import { aiConversations, aiMessages, aiUsageStats } from "../drizzle/schema";
import { eq, and, desc } from "drizzle-orm";
import { InsertAIConversation, InsertAIMessage, InsertAIUsageStat } from "../drizzle/schema";

/**
 * 创建新的对话
 */
export async function createConversation(
  userId: number,
  title: string,
  model: string
): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(aiConversations).values({
    userId,
    title,
    model,
    messageCount: 0,
  });

  return result[0].insertId;
}

/**
 * 获取用户的所有对话
 */
export async function getUserConversations(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db
    .select()
    .from(aiConversations)
    .where(eq(aiConversations.userId, userId))
    .orderBy(desc(aiConversations.updatedAt));
}

/**
 * 获取对话详情及其消息
 */
export async function getConversationWithMessages(conversationId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const conversation = await db
    .select()
    .from(aiConversations)
    .where(eq(aiConversations.id, conversationId));

  if (!conversation.length) {
    return null;
  }

  const messages = await db
    .select()
    .from(aiMessages)
    .where(eq(aiMessages.conversationId, conversationId))
    .orderBy(aiMessages.createdAt);

  return {
    conversation: conversation[0],
    messages,
  };
}

/**
 * 添加消息到对话
 */
export async function addMessageToConversation(
  conversationId: number,
  role: "user" | "assistant",
  content: string,
  model?: string,
  tokenCount?: number
): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(aiMessages).values({
    conversationId,
    role,
    content,
    model,
    tokenCount,
  });

  // 更新对话的消息计数
  const conversation = await db!
    .select()
    .from(aiConversations)
    .where(eq(aiConversations.id, conversationId));

  if (conversation.length) {
    await db!
      .update(aiConversations)
      .set({
        messageCount: conversation[0].messageCount + 1,
        updatedAt: new Date(),
      })
      .where(eq(aiConversations.id, conversationId));
  }

  return result[0].insertId;
}

/**
 * 更新对话标题
 */
export async function updateConversationTitle(
  conversationId: number,
  title: string
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(aiConversations)
    .set({ title, updatedAt: new Date() })
    .where(eq(aiConversations.id, conversationId));
}

/**
 * 删除对话及其所有消息
 */
export async function deleteConversation(conversationId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  // 删除所有消息
  await db
    .delete(aiMessages)
    .where(eq(aiMessages.conversationId, conversationId));

  // 删除对话
  await db
    .delete(aiConversations)
    .where(eq(aiConversations.id, conversationId));
}

/**
 * 记录 API 使用统计
 */
export async function recordUsageStats(
  userId: number,
  model: string,
  tokenCount: number,
  success: boolean
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const today = new Date().toISOString().split("T")[0];

  const existing = await db
    .select()
    .from(aiUsageStats)
    .where(
      and(
        eq(aiUsageStats.userId, userId),
        eq(aiUsageStats.model, model),
        eq(aiUsageStats.statDate, today as any)
      )
    );

  if (existing.length > 0) {
    await db
      .update(aiUsageStats)
      .set({
        callCount: existing[0].callCount + 1,
        totalTokens: existing[0].totalTokens + tokenCount,
        successCount: success ? existing[0].successCount + 1 : existing[0].successCount,
        failureCount: !success ? existing[0].failureCount + 1 : existing[0].failureCount,
        updatedAt: new Date(),
      })
      .where(eq(aiUsageStats.id, existing[0].id));
  } else {
    await db.insert(aiUsageStats).values({
      userId,
      model,
      callCount: 1,
      totalTokens: tokenCount,
      successCount: success ? 1 : 0,
      failureCount: !success ? 1 : 0,
      statDate: today as any,
    });
  }
}

/**
 * 获取用户的使用统计
 */
export async function getUserUsageStats(userId: number, days: number = 30) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return await db
    .select()
    .from(aiUsageStats)
    .where(
      and(
        eq(aiUsageStats.userId, userId),
        // @ts-ignore - Drizzle ORM 类型问题
        aiUsageStats.statDate >= startDate.toISOString().split("T")[0]
      )
    )
    .orderBy(desc(aiUsageStats.statDate));
}
