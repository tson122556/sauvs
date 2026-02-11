import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Globe, Shield } from "lucide-react";
import { GoogleIcon, MicrosoftIcon, AppleIcon, WeChatIcon, InstagramIcon } from "@/components/SocialIcons";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { 
  detectRegion, 
  detectRedirect, 
  preventRedirect, 
  isLoginPageSafe,
  storeGeoResult,
  getStoredGeoResult,
  type GeoDetectionResult,
  type Region,
} from "@/lib/geoProtection";

export default function Login() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [geoData, setGeoData] = useState<GeoDetectionResult | null>(null);
  const [isCheckingGeo, setIsCheckingGeo] = useState(true);
  const [redirectDetected, setRedirectDetected] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'oauth' | 'local'>('oauth');
  const [securityStatus, setSecurityStatus] = useState<'checking' | 'safe' | 'warning'>('checking');

  // 从服务器端获取安全信息
  const { data: safetyData } = trpc.secureLogin.verifyLoginPageSafety.useQuery(
    {
      referer: document.referrer,
      currentUrl: typeof window !== 'undefined' ? window.location.href : '',
    },
    {
      enabled: typeof window !== 'undefined',
      retry: 1,
    }
  );

  const { data: regionData } = trpc.secureLogin.detectRegion.useQuery(
    {
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    },
    {
      enabled: typeof navigator !== 'undefined',
      retry: 1,
    }
  );

  // 初始化：检测地域和重定向
  useEffect(() => {
    const initializeLogin = async () => {
      try {
        // 检查服务器端的安全性验证结果
        if (safetyData && !safetyData.isSafe) {
          console.warn('[Security] Login page safety check failed:', safetyData.message);
          setRedirectDetected(true);
          setSecurityStatus('warning');
          preventRedirect();
        } else if (safetyData) {
          setSecurityStatus('safe');
        } else {
          // 如果服务器端检查失败，使用客户端检查
          const isSafe = await isLoginPageSafe();
          if (!isSafe) {
            setRedirectDetected(true);
            setSecurityStatus('warning');
            preventRedirect();
          } else {
            setSecurityStatus('safe');
          }
        }

        // 处理地域信息
        if (regionData) {
          const geoResult: GeoDetectionResult = {
            region: regionData.region as Region,
            confidence: 0.95,
          };
          
          setGeoData(geoResult);
          storeGeoResult(geoResult);
          
          // 如果是中国大陆用户，默认使用本地登录
          if (geoResult.region === 'mainland') {
            setLoginMethod('local');
          }
        } else {
          // 如果服务器端检查失败，使用客户端检查
          let geoResult = getStoredGeoResult();
          if (!geoResult) {
            geoResult = await detectRegion();
            storeGeoResult(geoResult);
          }
          setGeoData(geoResult);

          // 如果是中国大陆用户，默认使用本地登录
          if (geoResult.region === 'mainland') {
            setLoginMethod('local');
          }
        }
      } catch (error) {
        console.error('Login initialization failed:', error);
      } finally {
        setIsCheckingGeo(false);
      }
    };

    initializeLogin();
  }, [safetyData, regionData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = language === "zh" ? "请输入邮箱" : "Please enter email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === "zh" ? "邮箱格式不正确" : "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = language === "zh" ? "请输入密码" : "Please enter password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // 模拟登录请求
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // 实际应该调用登录 API
      setLocation("/zh");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const getRegionLabel = (region: Region): string => {
    if (language === "zh") {
      switch (region) {
        case 'mainland':
          return '中国大陆';
        case 'hongkong':
          return '香港';
        default:
          return '国际';
      }
    } else {
      switch (region) {
        case 'mainland':
          return 'Mainland China';
        case 'hongkong':
          return 'Hong Kong';
        default:
          return 'International';
      }
    }
  };

  if (isCheckingGeo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">
            {language === "zh" ? "正在检测您的位置..." : "Detecting your location..."}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* 顶部导航 */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setLocation("/zh")}
            className="text-gray-400 hover:text-white transition flex items-center gap-2"
          >
            <ArrowRight size={20} className="rotate-180" />
            <span>{language === "zh" ? "返回首页" : "Back"}</span>
          </button>
          <LanguageSwitcher />
        </div>

        {/* 重定向警告 */}
        {redirectDetected && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3"
          >
            <Shield size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-400">
              {language === "zh"
                ? "⚠️ 检测到异常重定向！我们已为您恢复安全的登录页面。如果您继续遇到问题，请联系技术支持。"
                : "⚠️ Suspicious redirect detected! We've restored a safe login page for you. If you continue to experience issues, please contact technical support."}
            </div>
          </motion.div>
        )}

        {/* 地域信息和安全状态 */}
        {geoData && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 space-y-2"
          >
            {/* 地域信息 */}
            <div className="p-3 bg-slate-800/50 border border-purple-500/20 rounded-lg flex items-center gap-2 text-sm text-gray-400">
              <Globe size={16} className="text-purple-400" />
              <span>
                {language === "zh" ? "检测位置：" : "Location: "}
                <span className="text-purple-400 font-medium">{getRegionLabel(geoData.region)}</span>
                {geoData.confidence > 0 && (
                  <span className="text-gray-500 ml-1">
                    ({Math.round(geoData.confidence * 100)}%)
                  </span>
                )}
              </span>
            </div>
            
            {/* 安全状态 */}
            {!redirectDetected && (
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2 text-sm text-green-400">
                <Shield size={16} className="text-green-400" />
                <span>
                  {language === "zh" ? "✓ 登录页面已验证安全" : "✓ Login page verified as secure"}
                </span>
              </div>
            )}
          </motion.div>
        )}

        <Card className="p-8 bg-slate-900/50 border-purple-500/20 backdrop-blur-xl">
          {/* 标题 */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              {language === "zh" ? "欢迎回来" : "Welcome Back"}
            </h1>
            <p className="text-gray-400">
              {language === "zh"
                ? "登录您的 UVS AI 账户"
                : "Sign in to your UVS AI account"}
            </p>
          </div>

          {/* 登录方式选择 */}
          {geoData?.region === 'mainland' && (
            <div className="mb-6 flex gap-2">
              <button
                onClick={() => setLoginMethod('local')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
                  loginMethod === 'local'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800/50 text-gray-400 hover:text-white'
                }`}
              >
                {language === "zh" ? "本地登录" : "Local Login"}
              </button>
              <button
                onClick={() => setLoginMethod('oauth')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
                  loginMethod === 'oauth'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800/50 text-gray-400 hover:text-white'
                }`}
              >
                {language === "zh" ? "OAuth 登录" : "OAuth Login"}
              </button>
            </div>
          )}

          {/* 表单 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 邮箱输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {language === "zh" ? "邮箱" : "Email"}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={language === "zh" ? "输入您的邮箱" : "Enter your email"}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* 密码输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {language === "zh" ? "密码" : "Password"}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={language === "zh" ? "输入您的密码" : "Enter your password"}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* 记住我和忘记密码 */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 hover:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-purple-500/20 bg-slate-800/50"
                />
                {language === "zh" ? "记住我" : "Remember me"}
              </label>
              <a href="#" className="text-purple-400 hover:text-purple-300 transition">
                {language === "zh" ? "忘记密码？" : "Forgot password?"}
              </a>
            </div>

            {/* 登录按钮 */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {language === "zh" ? "登录中..." : "Signing in..."}
                </>
              ) : (
                <>
                  {language === "zh" ? "登录" : "Sign in"}
                  <ArrowRight size={18} />
                </>
              )}
            </Button>
          </form>

          {/* 第三方登录 - 仅在 OAuth 模式显示 */}
          {loginMethod === 'oauth' && (
            <div className="space-y-2">
              {/* Google 登录 */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-2.5"
              >
                <GoogleIcon size={18} />
                {language === "zh" ? "使用 Google 登录" : "Sign in with Google"}
              </Button>

              {/* Microsoft 登录 */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-2.5"
              >
                <MicrosoftIcon size={18} />
                {language === "zh" ? "使用 Microsoft 登录" : "Sign in with Microsoft"}
              </Button>

              {/* Apple 登录 */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-2.5"
              >
                <AppleIcon size={18} />
                {language === "zh" ? "使用 Apple 登录" : "Sign in with Apple"}
              </Button>

              {/* 微信登录 - 仅在中国大陆显示 */}
              {geoData?.region === 'mainland' && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 py-2.5"
                >
                  <WeChatIcon size={18} />
                  {language === "zh" ? "使用微信登录" : "Sign in with WeChat"}
                </Button>
              )}

              {/* Instagram 登录 */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-2.5"
              >
                <InstagramIcon size={18} />
                {language === "zh" ? "使用 Instagram 登录" : "Sign in with Instagram"}
              </Button>
            </div>
          )}

          {/* 底部提示 */}
          <div className="mt-6 space-y-2 text-center text-gray-500 text-xs">
            <p>
              {language === "zh"
                ? "登录即表示您同意我们的服务条款和隐私政策"
                : "By signing in, you agree to our Terms of Service and Privacy Policy"}
            </p>
            {geoData?.region === 'mainland' && (
              <p className="text-purple-400/70">
                {language === "zh"
                  ? "✓ 为中国大陆用户优化，支持本地登录"
                  : "✓ Optimized for mainland China users with local login support"}
              </p>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
