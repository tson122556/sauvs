/**
 * 安全登录路由
 * 为中国大陆用户提供专门的登录保护
 */

import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

/**
 * 获取客户端 IP 地址
 */
function getClientIP(ctx: any): string {
  const req = ctx.req;
  const forwarded = req.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || req.socket.remoteAddress || '';
}

/**
 * 检测客户端是否在中国大陆
 */
async function detectMainlandChina(ip: string): Promise<boolean> {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json() as { country_code?: string };
    return data.country_code === 'CN';
  } catch (error) {
    console.warn('IP 地域检测失败:', error);
    return false;
  }
}

export const secureLoginRouter = router({
  /**
   * 检测用户地域和登录安全性
   */
  detectRegion: publicProcedure
    .input(z.object({
      userAgent: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      try {
        const clientIP = getClientIP(ctx);
        const isMainland = await detectMainlandChina(clientIP);

        return {
          region: isMainland ? 'mainland' : 'international',
          ip: clientIP.substring(0, 10) + '***', // 隐藏 IP 的后部分
          timestamp: new Date().toISOString(),
        };
      } catch (error) {
        console.error('地域检测错误:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: '地域检测失败',
        });
      }
    }),

  /**
   * 验证登录页面安全性
   */
  verifyLoginPageSafety: publicProcedure
    .input(z.object({
      referer: z.string().optional(),
      currentUrl: z.string().optional(),
    }))
    .query(async ({ input }) => {
      try {
        const referer = input.referer || '';
        const currentUrl = input.currentUrl || '';

        // 检查是否有可疑的重定向标志
        const suspiciousDomains = [
          'byte16.com',
          's1.byte16.com',
          'api.byte16.com',
        ];

        let isSuspicious = false;
        for (const domain of suspiciousDomains) {
          if (referer.includes(domain) || currentUrl.includes(domain)) {
            isSuspicious = true;
            break;
          }
        }

        return {
          isSafe: !isSuspicious,
          timestamp: new Date().toISOString(),
          message: isSuspicious 
            ? '检测到异常重定向，请使用安全的登录页面'
            : '登录页面安全',
        };
      } catch (error) {
        console.error('安全性验证错误:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: '安全性验证失败',
        });
      }
    }),

  /**
   * 获取安全的登录配置
   */
  getLoginConfig: publicProcedure
    .query(async ({ ctx }) => {
      try {
        const clientIP = getClientIP(ctx);
        const isMainland = await detectMainlandChina(clientIP);

        return {
          region: isMainland ? 'mainland' : 'international',
          supportedMethods: isMainland
            ? ['local', 'oauth', 'wechat']
            : ['oauth', 'email'],
          recommendedMethod: isMainland ? 'local' : 'oauth',
          securityLevel: 'high',
          timestamp: new Date().toISOString(),
        };
      } catch (error) {
        console.error('获取登录配置错误:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: '获取登录配置失败',
        });
      }
    }),

  /**
   * 报告可疑的重定向
   */
  reportRedirect: publicProcedure
    .input(z.object({
      sourceUrl: z.string(),
      targetUrl: z.string(),
      timestamp: z.string().optional(),
      userAgent: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        const clientIP = getClientIP(ctx);
        
        // 记录可疑的重定向
        console.warn('[Security Alert] 检测到可疑重定向', {
          sourceUrl: input.sourceUrl,
          targetUrl: input.targetUrl,
          clientIP: clientIP.substring(0, 10) + '***',
          userAgent: input.userAgent?.substring(0, 50),
          timestamp: input.timestamp || new Date().toISOString(),
        });

        return {
          success: true,
          message: '已记录可疑重定向，安全团队将进行调查',
        };
      } catch (error) {
        console.error('报告重定向错误:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: '报告失败',
        });
      }
    }),
});
