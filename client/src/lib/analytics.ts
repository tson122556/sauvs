/**
 * 分析工具集成模块
 * 支持 Google Analytics 和百度统计
 */

// Google Analytics 配置
export const initGoogleAnalytics = (measurementId: string) => {
  if (typeof window === "undefined") return;

  // 加载 Google Analytics 脚本
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // 初始化 gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", measurementId, {
    page_path: window.location.pathname,
    page_title: document.title,
  });

  // 保存 gtag 函数到全局
  (window as any).gtag = gtag;
};

// 百度统计配置
export const initBaiduAnalytics = (baiduCode: string) => {
  if (typeof window === "undefined") return;

  // 创建百度统计脚本
  const script = document.createElement("script");
  script.text = `
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?${baiduCode}";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  `;
  document.head.appendChild(script);
};

// 跟踪页面浏览
export const trackPageView = (pageName: string, pageTitle?: string) => {
  if (typeof window === "undefined") return;

  // Google Analytics
  if ((window as any).gtag) {
    (window as any).gtag("event", "page_view", {
      page_path: pageName,
      page_title: pageTitle || document.title,
    });
  }

  // 百度统计
  if ((window as any)._hmt) {
    (window as any)._hmt.push(["_trackPageview", pageName]);
  }
};

// 跟踪事件
export const trackEvent = (
  eventName: string,
  eventCategory: string,
  eventLabel?: string,
  eventValue?: number
) => {
  if (typeof window === "undefined") return;

  // Google Analytics
  if ((window as any).gtag) {
    (window as any).gtag("event", eventName, {
      event_category: eventCategory,
      event_label: eventLabel,
      value: eventValue,
    });
  }

  // 百度统计
  if ((window as any)._hmt) {
    (window as any)._hmt.push([
      "_trackEvent",
      eventCategory,
      eventName,
      eventLabel,
      eventValue,
    ]);
  }
};

// 跟踪转化
export const trackConversion = (conversionId: string, conversionLabel: string) => {
  if (typeof window === "undefined") return;

  // Google Analytics 转化跟踪
  if ((window as any).gtag) {
    (window as any).gtag("event", "conversion", {
      send_to: `${conversionId}/${conversionLabel}`,
    });
  }
};

// 跟踪用户属性
export const setUserProperties = (userId: string, properties?: Record<string, any>) => {
  if (typeof window === "undefined") return;

  // Google Analytics
  if ((window as any).gtag) {
    (window as any).gtag("config", {
      user_id: userId,
      ...properties,
    });
  }

  // 百度统计
  if ((window as any)._hmt) {
    (window as any)._hmt.push(["_setUserId", userId]);
  }
};

// 声明全局类型
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    _hmt: any[];
  }
}
