import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  detectRegion,
  detectRedirect,
  preventRedirect,
  isLoginPageSafe,
  storeGeoResult,
  getStoredGeoResult,
  clearGeoResult,
  getSafeLoginUrl,
  type GeoDetectionResult,
} from './geoProtection';

describe('geoProtection', () => {
  beforeEach(() => {
    // 清除本地存储
    localStorage.clear();
    
    // 重置 window.location
    delete (window as any).location;
    window.location = { href: 'http://localhost:3000/zh/login' } as any;
  });

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('detectRegion', () => {
    it('应该返回地域检测结果', async () => {
      const result = await detectRegion();
      expect(result).toBeDefined();
      expect(result.region).toMatch(/mainland|hongkong|international/);
      expect(result.confidence).toBeGreaterThanOrEqual(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
    });

    it('应该处理检测失败的情况', async () => {
      // Mock fetch 失败
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
      
      const result = await detectRegion();
      expect(result.region).toBe('international');
      expect(result.confidence).toBe(0);
    });
  });

  describe('detectRedirect', () => {
    it('应该检测到 byte16.com 重定向', () => {
      window.location = {
        href: 'https://s1.byte16.com/api/v1/client/subscribe?token=abc123',
      } as any;
      
      expect(detectRedirect()).toBe(true);
    });

    it('应该检测到 token 参数重定向', () => {
      window.location = {
        href: 'http://localhost:3000/zh/login?token=abc123&redirect=true',
      } as any;
      
      expect(detectRedirect()).toBe(true);
    });

    it('应该识别安全的登录页面', () => {
      window.location = {
        href: 'http://localhost:3000/zh/login',
      } as any;
      
      expect(detectRedirect()).toBe(false);
    });

    it('应该处理异常情况', () => {
      // 删除 window.location
      delete (window as any).location;
      
      expect(detectRedirect()).toBe(false);
    });
  });

  describe('preventRedirect', () => {
    it('应该清除查询参数', () => {
      window.location = {
        href: 'http://localhost:3000/zh/login?token=abc123',
        search: '?token=abc123',
      } as any;
      
      window.history.replaceState = vi.fn();
      
      preventRedirect();
      
      expect(window.history.replaceState).toHaveBeenCalled();
    });

    it('应该处理异常情况', () => {
      delete (window as any).location;
      
      expect(() => preventRedirect()).not.toThrow();
    });
  });

  describe('isLoginPageSafe', () => {
    it('应该识别安全的登录页面', async () => {
      window.location = {
        href: 'http://localhost:3000/zh/login',
        pathname: '/zh/login',
        search: '',
      } as any;
      
      const isSafe = await isLoginPageSafe();
      expect(isSafe).toBe(true);
    });

    it('应该检测到重定向风险', async () => {
      window.location = {
        href: 'https://s1.byte16.com/api/v1/client/subscribe?token=abc123',
        pathname: '/api/v1/client/subscribe',
        search: '?token=abc123',
      } as any;
      
      const isSafe = await isLoginPageSafe();
      expect(isSafe).toBe(false);
    });

    it('应该识别非登录页面为安全', async () => {
      window.location = {
        href: 'http://localhost:3000/zh/home',
        pathname: '/zh/home',
        search: '',
      } as any;
      
      const isSafe = await isLoginPageSafe();
      expect(isSafe).toBe(true);
    });
  });

  describe('storeGeoResult 和 getStoredGeoResult', () => {
    it('应该存储和获取地域检测结果', () => {
      const geoResult: GeoDetectionResult = {
        region: 'mainland',
        country: 'CN',
        city: 'Beijing',
        confidence: 0.9,
      };
      
      storeGeoResult(geoResult);
      const stored = getStoredGeoResult();
      
      expect(stored).toBeDefined();
      expect(stored?.region).toBe('mainland');
      expect(stored?.country).toBe('CN');
      expect(stored?.confidence).toBe(0.9);
    });

    it('应该返回过期的结果为 null', () => {
      const geoResult: GeoDetectionResult = {
        region: 'mainland',
        confidence: 0.9,
      };
      
      storeGeoResult(geoResult);
      
      // 模拟过期（25 小时前）
      const stored = localStorage.getItem('geo_detection_result');
      if (stored) {
        const data = JSON.parse(stored);
        data.timestamp = Date.now() - 25 * 60 * 60 * 1000;
        localStorage.setItem('geo_detection_result', JSON.stringify(data));
      }
      
      const result = getStoredGeoResult();
      expect(result).toBeNull();
    });

    it('应该处理无效的 JSON', () => {
      localStorage.setItem('geo_detection_result', 'invalid json');
      
      const result = getStoredGeoResult();
      expect(result).toBeNull();
    });
  });

  describe('clearGeoResult', () => {
    it('应该清除地域检测结果', () => {
      const geoResult: GeoDetectionResult = {
        region: 'mainland',
        confidence: 0.9,
      };
      
      storeGeoResult(geoResult);
      expect(getStoredGeoResult()).toBeDefined();
      
      clearGeoResult();
      expect(getStoredGeoResult()).toBeNull();
    });
  });

  describe('getSafeLoginUrl', () => {
    it('应该为中国大陆用户返回本地登录 URL', () => {
      const url = getSafeLoginUrl('mainland');
      expect(url).toBe('/zh/login?method=local');
    });

    it('应该为其他地区返回标准登录 URL', () => {
      const urlHK = getSafeLoginUrl('hongkong');
      const urlIntl = getSafeLoginUrl('international');
      
      expect(urlHK).toBe('/zh/login');
      expect(urlIntl).toBe('/zh/login');
    });
  });

  describe('集成测试', () => {
    it('应该完整处理中国大陆用户的登录流程', async () => {
      // 1. 检测地域
      const geoResult: GeoDetectionResult = {
        region: 'mainland',
        country: 'CN',
        confidence: 0.9,
      };
      
      storeGeoResult(geoResult);
      const stored = getStoredGeoResult();
      expect(stored?.region).toBe('mainland');
      
      // 2. 检查登录页面安全性
      window.location = {
        href: 'http://localhost:3000/zh/login',
        pathname: '/zh/login',
        search: '',
      } as any;
      
      const isSafe = await isLoginPageSafe();
      expect(isSafe).toBe(true);
      
      // 3. 获取安全的登录 URL
      const loginUrl = getSafeLoginUrl(stored!.region);
      expect(loginUrl).toBe('/zh/login?method=local');
    });

    it('应该检测并防止重定向', () => {
      // 1. 检测重定向
      window.location = {
        href: 'https://s1.byte16.com/api/v1/client/subscribe?token=abc123',
        pathname: '/api/v1/client/subscribe',
        search: '?token=abc123',
      } as any;
      
      expect(detectRedirect()).toBe(true);
      
      // 2. 防止重定向
      window.history.replaceState = vi.fn();
      preventRedirect();
      
      expect(window.history.replaceState).toHaveBeenCalled();
    });
  });
});
