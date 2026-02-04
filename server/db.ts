import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, InsertInquiry, inquiries, InsertProduct, products, InsertNews, news } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * 客户咨询相关函数
 */
export async function createInquiry(inquiry: InsertInquiry) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  const result = await db.insert(inquiries).values(inquiry);
  return result;
}

export async function getInquiries(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) {
    return [];
  }
  return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(limit).offset(offset);
}

export async function updateInquiryStatus(id: number, status: "pending" | "processing" | "completed") {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  return await db.update(inquiries).set({ status }).where(eq(inquiries.id, id));
}

/**
 * 产品相关函数
 */
export async function createProduct(product: InsertProduct) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  return await db.insert(products).values(product);
}

export async function getProducts(published = true) {
  const db = await getDb();
  if (!db) {
    return [];
  }
  const query = db.select().from(products).orderBy(desc(products.createdAt));
  if (published) {
    return await query.where(eq(products.published, 1));
  }
  return await query;
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) {
    return undefined;
  }
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateProduct(id: number, product: Partial<InsertProduct>) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  return await db.update(products).set(product).where(eq(products.id, id));
}

/**
 * 新闻相关函数
 */
export async function createNews(newsItem: InsertNews) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  return await db.insert(news).values(newsItem);
}

export async function getNews(limit = 10, offset = 0, published = true) {
  const db = await getDb();
  if (!db) {
    return [];
  }
  const query = db.select().from(news).orderBy(desc(news.publishedAt));
  if (published) {
    return await query.where(eq(news.published, 1)).limit(limit).offset(offset);
  }
  return await query.limit(limit).offset(offset);
}

export async function getNewsById(id: number) {
  const db = await getDb();
  if (!db) {
    return undefined;
  }
  const result = await db.select().from(news).where(eq(news.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateNews(id: number, newsItem: Partial<InsertNews>) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  return await db.update(news).set(newsItem).where(eq(news.id, id));
}
