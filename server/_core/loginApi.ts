import type { Request, Response } from 'express';

/**
 * 处理登录请求
 * 这是一个独立的 API 端点，绕过 Manus 平台限制
 */
export function handleLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // 基本验证
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: '邮箱和密码不能为空',
      });
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: '邮箱格式不正确',
      });
    }

    // 模拟登录 - 实际应用中应该查询数据库
    // 演示账户: demo@example.com / password123
    if (email === 'demo@example.com' && password === 'password123') {
      const token = Buffer.from(
        JSON.stringify({ 
          email, 
          timestamp: Date.now(),
          userId: '1',
        })
      ).toString('base64');

      return res.json({
        success: true,
        message: '登录成功',
        token,
        user: {
          id: '1',
          email,
          name: 'Demo User',
        },
      });
    }

    // 登录失败
    res.status(401).json({
      success: false,
      message: '邮箱或密码错误',
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: '登录失败，请稍后重试',
    });
  }
}

/**
 * 处理注册请求
 */
export function handleRegister(req: Request, res: Response) {
  try {
    const { email, password, confirmPassword, name } = req.body;

    // 基本验证
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: '请填写所有必填项',
      });
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: '邮箱格式不正确',
      });
    }

    // 密码验证
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: '密码至少需要 8 个字符',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: '两次输入的密码不一致',
      });
    }

    // 模拟注册 - 实际应用中应该保存到数据库
    const token = Buffer.from(
      JSON.stringify({ 
        email, 
        timestamp: Date.now(),
        userId: Math.random().toString(36).substr(2, 9),
      })
    ).toString('base64');

    return res.json({
      success: true,
      message: '注册成功',
      token,
      user: {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: name || email.split('@')[0],
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: '注册失败，请稍后重试',
    });
  }
}

/**
 * 处理忘记密码请求
 */
export function handleForgotPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: '请输入邮箱地址',
      });
    }

    // 模拟发送重置链接
    return res.json({
      success: true,
      message: '重置链接已发送到您的邮箱，请检查收件箱',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: '请求失败，请稍后重试',
    });
  }
}
