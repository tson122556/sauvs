export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};


/**
 * 第三方 OAuth 配置
 * 用于 Google、Microsoft、Apple、WeChat、Instagram 登录
 */

export const OAUTH_PROVIDERS = {
  google: {
    name: "Google",
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
    redirectUri: `${window.location.origin}/auth/callback/google`,
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    scope: "openid profile email",
  },
  microsoft: {
    name: "Microsoft",
    clientId: import.meta.env.VITE_MICROSOFT_CLIENT_ID || "",
    redirectUri: `${window.location.origin}/auth/callback/microsoft`,
    authUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    scope: "openid profile email",
  },
  apple: {
    name: "Apple",
    clientId: import.meta.env.VITE_APPLE_CLIENT_ID || "",
    redirectUri: `${window.location.origin}/auth/callback/apple`,
    authUrl: "https://appleid.apple.com/auth/authorize",
    scope: "openid profile email",
  },
  wechat: {
    name: "WeChat",
    clientId: import.meta.env.VITE_WECHAT_CLIENT_ID || "",
    redirectUri: `${window.location.origin}/auth/callback/wechat`,
    authUrl: "https://open.weixin.qq.com/connect/oauth2/authorize",
    scope: "snsapi_login",
  },
  instagram: {
    name: "Instagram",
    clientId: import.meta.env.VITE_INSTAGRAM_CLIENT_ID || "",
    redirectUri: `${window.location.origin}/auth/callback/instagram`,
    authUrl: "https://api.instagram.com/oauth/authorize",
    scope: "user_profile,user_media",
  },
};

/**
 * 生成 OAuth 授权 URL
 */
export const getOAuthUrl = (provider: keyof typeof OAUTH_PROVIDERS) => {
  const config = OAUTH_PROVIDERS[provider];
  if (!config.clientId) {
    console.warn(`OAuth client ID not configured for ${provider}`);
    return "";
  }

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: "code",
    scope: config.scope,
    state: btoa(JSON.stringify({ provider, timestamp: Date.now() })),
  });

  // WeChat 使用不同的参数名
  if (provider === "wechat") {
    params.set("appid", config.clientId);
    params.delete("client_id");
  }

  return `${config.authUrl}?${params.toString()}`;
};
