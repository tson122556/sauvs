/**
 * 服务器端重定向防护中间件
 * 防止用户被重定向到第三方服务（如 byte16.com）
 */

import type { Request, Response, NextFunction } from 'express';

/**
 * 检测请求是否来自已知的第三方重定向服务
 */
function isRedirectAttempt(req: Request): boolean {
  // 检查 Referer 头是否包含可疑的域名
  const referer = req.get('referer') || '';
  const suspiciousDomains = [
    'byte16.com',
    's1.byte16.com',
    'api.byte16.com',
  ];

  for (const domain of suspiciousDomains) {
    if (referer.includes(domain)) {
      return true;
    }
  }

  // 检查 User-Agent 是否异常
  const userAgent = req.get('user-agent') || '';
  const suspiciousPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(userAgent)) {
      return true;
    }
  }

  return false;
}

/**
 * 获取客户端 IP 地址
 */
function getClientIP(req: Request): string {
  const forwarded = req.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || req.socket.remoteAddress || '';
}

/**
 * 检测客户端是否在中国大陆
 */
async function isMainlandChina(ip: string): Promise<boolean> {
  try {
    // 使用免费的 IP 地址检测 API
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

/**
 * 重定向防护中间件
 * 防止用户被重定向到第三方服务
 */
export function redirectProtectionMiddleware() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 只对登录相关的路由进行保护
      if (!req.path.includes('login') && !req.path.includes('register') && !req.path.includes('auth')) {
        return next();
      }

      // 检查是否是重定向尝试
      if (isRedirectAttempt(req)) {
        console.warn(`[Redirect Protection] 检测到重定向尝试: ${req.path}`);
        // 返回 403 Forbidden
        return res.status(403).json({
          error: 'Access Forbidden',
          message: '检测到异常重定向，访问被拒绝',
        });
      }

      // 检查客户端是否在中国大陆
      const clientIP = getClientIP(req);
      const isChinaMainland = await isMainlandChina(clientIP);

      // 为中国大陆用户添加特殊头部，前端可以据此调整行为
      if (isChinaMainland) {
        res.setHeader('X-Geo-Region', 'mainland-china');
        res.setHeader('X-Redirect-Protection', 'enabled');
      }

      // 添加安全头部，防止被嵌入到 iframe 中
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-XSS-Protection', '1; mode=block');

      next();
    } catch (error) {
      console.error('重定向防护中间件错误:', error);
      // 出错时继续处理请求，不中断
      next();
    }
  };
}

/**
 * 登录页面保护中间件
 * 确保登录页面总是可以被访问
 */
export function loginPageProtectionMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    // 对于登录页面的 GET 请求，添加特殊的缓存控制头
    if (req.method === 'GET' && (req.path.includes('/login') || req.path.includes('/auth'))) {
      // 禁用缓存，确保每次都获取最新的登录页面
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }

    next();
  };
}

/**
 * 安全头部中间件
 * 添加安全相关的 HTTP 头部
 */
export function securityHeadersMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    // 内容安全策略
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https:; frame-ancestors 'self';"
    );

    // 防止 MIME 类型嗅探
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // 防止 XSS 攻击
    res.setHeader('X-XSS-Protection', '1; mode=block');

    // 防止被嵌入到 iframe 中
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');

    // 引用策略
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

    next();
  };
}
