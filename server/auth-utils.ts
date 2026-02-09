import crypto from 'crypto';

/**
 * 生成密码哈希
 * 使用 PBKDF2 算法，盐值 32 字节，迭代次数 100000，哈希长度 64 字节
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha256').toString('hex');
  return `${salt}:${hash}`;
}

/**
 * 验证密码
 */
export function verifyPassword(password: string, hash: string): boolean {
  const [salt, storedHash] = hash.split(':');
  if (!salt || !storedHash) {
    return false;
  }

  const computedHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha256').toString('hex');
  return computedHash === storedHash;
}

/**
 * 生成随机令牌（用于邮箱验证、密码重置等）
 */
export function generateToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * 生成会话令牌
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * 验证邮箱格式
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 验证密码强度
 * 要求：至少8个字符，包含大小写字母、数字和特殊字符
 */
export function isStrongPassword(password: string): {
  isStrong: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('密码至少需要8个字符');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('密码需要包含小写字母');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('密码需要包含大写字母');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('密码需要包含数字');
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('密码需要包含特殊字符');
  }

  return {
    isStrong: errors.length === 0,
    errors,
  };
}

/**
 * 生成令牌过期时间
 * @param minutes 分钟数
 */
export function getTokenExpiryTime(minutes: number = 24 * 60): Date {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutes);
  return now;
}
