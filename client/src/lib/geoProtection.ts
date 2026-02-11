/**
 * 地域检测和重定向防护模块
 * 用于检测用户所在地域，防止被重定向到第三方服务
 */

export type Region = 'mainland' | 'hongkong' | 'international';

export interface GeoDetectionResult {
  region: Region;
  country?: string;
  province?: string;
  city?: string;
  ip?: string;
  confidence: number; // 0-1，表示检测的可信度
}

/**
 * 检测用户所在地域
 * 通过多种方式进行地域检测，包括 IP 地址、地理位置 API 等
 */
export async function detectRegion(): Promise<GeoDetectionResult> {
  try {
    // 方法1：使用 IP 地址检测
    const ipResult = await detectByIP();
    if (ipResult.confidence > 0.7) {
      return ipResult;
    }

    // 方法2：使用地理位置 API
    const geoResult = await detectByGeolocation();
    if (geoResult.confidence > 0.7) {
      return geoResult;
    }

    // 方法3：使用浏览器时区
    const tzResult = detectByTimezone();
    if (tzResult.confidence > 0.5) {
      return tzResult;
    }

    // 默认返回国际地域
    return {
      region: 'international',
      confidence: 0.3,
    };
  } catch (error) {
    console.error('地域检测失败:', error);
    return {
      region: 'international',
      confidence: 0,
    };
  }
}

/**
 * 通过 IP 地址检测地域
 */
async function detectByIP(): Promise<GeoDetectionResult> {
  try {
    // 使用免费的 IP 地址检测 API
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('IP 检测失败');
    }

    const data = await response.json();
    const country = data.country_code?.toUpperCase();
    const region = mapCountryToRegion(country);

    return {
      region,
      country,
      province: data.region,
      city: data.city,
      ip: data.ip,
      confidence: 0.85,
    };
  } catch (error) {
    console.warn('IP 检测失败:', error);
    return {
      region: 'international',
      confidence: 0,
    };
  }
}

/**
 * 通过地理位置 API 检测地域
 */
async function detectByGeolocation(): Promise<GeoDetectionResult> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        region: 'international',
        confidence: 0,
      });
      return;
    }

    // 设置超时
    const timeout = setTimeout(() => {
      resolve({
        region: 'international',
        confidence: 0,
      });
    }, 5000);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        clearTimeout(timeout);
        try {
          const { latitude, longitude } = position.coords;
          const region = mapCoordinatesToRegion(latitude, longitude);
          resolve({
            region,
            confidence: 0.7,
          });
        } catch (error) {
          resolve({
            region: 'international',
            confidence: 0,
          });
        }
      },
      (error) => {
        clearTimeout(timeout);
        console.warn('地理位置获取失败:', error);
        resolve({
          region: 'international',
          confidence: 0,
        });
      }
    );
  });
}

/**
 * 通过浏览器时区检测地域
 */
function detectByTimezone(): GeoDetectionResult {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // 中国时区
    if (timezone === 'Asia/Shanghai' || timezone === 'Asia/Chongqing') {
      return {
        region: 'mainland',
        confidence: 0.6,
      };
    }

    // 香港时区
    if (timezone === 'Asia/Hong_Kong') {
      return {
        region: 'hongkong',
        confidence: 0.6,
      };
    }

    return {
      region: 'international',
      confidence: 0.3,
    };
  } catch (error) {
    console.warn('时区检测失败:', error);
    return {
      region: 'international',
      confidence: 0,
    };
  }
}

/**
 * 将国家代码映射到地域
 */
function mapCountryToRegion(countryCode?: string): Region {
  if (!countryCode) return 'international';

  // 中国大陆
  if (countryCode === 'CN') {
    return 'mainland';
  }

  // 香港
  if (countryCode === 'HK') {
    return 'hongkong';
  }

  // 其他地区
  return 'international';
}

/**
 * 将坐标映射到地域
 */
function mapCoordinatesToRegion(latitude: number, longitude: number): Region {
  // 中国大陆范围：约 3.8°N - 53.6°N，73.5°E - 135.1°E
  if (latitude >= 3.8 && latitude <= 53.6 && longitude >= 73.5 && longitude <= 135.1) {
    // 排除香港：约 22.2°N - 22.3°N，114.0°E - 114.2°E
    if (latitude >= 22.2 && latitude <= 22.3 && longitude >= 114.0 && longitude <= 114.2) {
      return 'hongkong';
    }
    return 'mainland';
  }

  // 香港坐标
  if (latitude >= 22.2 && latitude <= 22.3 && longitude >= 114.0 && longitude <= 114.2) {
    return 'hongkong';
  }

  return 'international';
}

/**
 * 检测是否被重定向到第三方服务
 */
export function detectRedirect(): boolean {
  try {
    const currentUrl = window.location.href;
    
    // 检查是否被重定向到已知的第三方服务
    const suspiciousPatterns = [
      /byte16\.com/i,
      /s1\.byte16\.com/i,
      /api\/v1\/client\/subscribe/i,
      /token=/i,
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(currentUrl)) {
        return true;
      }
    }

    // 检查 URL 中是否有异常的查询参数
    const params = new URLSearchParams(window.location.search);
    if (params.has('token') && params.has('redirect')) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('重定向检测失败:', error);
    return false;
  }
}

/**
 * 防止重定向
 */
export function preventRedirect(): void {
  try {
    // 清除所有可疑的查询参数
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, document.title, url.toString());
  } catch (error) {
    console.error('防止重定向失败:', error);
  }
}

/**
 * 获取安全的登录 URL
 */
export function getSafeLoginUrl(region: Region): string {
  // 对于中国大陆用户，提供本地登录选项
  if (region === 'mainland') {
    return '/zh/login?method=local';
  }

  // 对于其他地区，使用标准登录
  return '/zh/login';
}

/**
 * 检查登录页面是否安全
 */
export async function isLoginPageSafe(): Promise<boolean> {
  // 检查是否被重定向
  if (detectRedirect()) {
    return false;
  }

  // 检查当前 URL 是否为登录页面
  const currentUrl = window.location.pathname;
  if (!currentUrl.includes('/login')) {
    return true;
  }

  // 检查是否有异常的查询参数
  const params = new URLSearchParams(window.location.search);
  if (params.has('redirect') || params.has('token')) {
    return false;
  }

  return true;
}

/**
 * 存储地域检测结果到本地存储
 */
export function storeGeoResult(result: GeoDetectionResult): void {
  try {
    localStorage.setItem(
      'geo_detection_result',
      JSON.stringify({
        ...result,
        timestamp: Date.now(),
      })
    );
  } catch (error) {
    console.warn('存储地域检测结果失败:', error);
  }
}

/**
 * 从本地存储获取地域检测结果
 */
export function getStoredGeoResult(): GeoDetectionResult | null {
  try {
    const stored = localStorage.getItem('geo_detection_result');
    if (!stored) return null;

    const result = JSON.parse(stored);
    const age = Date.now() - result.timestamp;

    // 如果结果超过 24 小时，则认为过期
    if (age > 24 * 60 * 60 * 1000) {
      localStorage.removeItem('geo_detection_result');
      return null;
    }

    return result;
  } catch (error) {
    console.warn('获取地域检测结果失败:', error);
    return null;
  }
}

/**
 * 清除地域检测结果
 */
export function clearGeoResult(): void {
  try {
    localStorage.removeItem('geo_detection_result');
  } catch (error) {
    console.warn('清除地域检测结果失败:', error);
  }
}
