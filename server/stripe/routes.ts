/**
 * Stripe Webhook 路由
 * 注册到 Express 服务器
 */

import { Router, Request, Response, raw } from "express";
import { handleWebhook } from "./webhook";

export function setupStripeRoutes(app: any) {
  // Webhook 路由 - 必须在 express.json() 之前注册
  // 因为 Stripe 需要原始 body 来验证签名
  app.post(
    "/api/stripe/webhook",
    raw({ type: "application/json" }),
    async (req: Request, res: Response) => {
      await handleWebhook(req, res);
    }
  );
}

export const stripeRouter = Router();

// 其他 Stripe 相关的 HTTP 路由可以在这里添加
// 例如：获取发票、管理订阅等
