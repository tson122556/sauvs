/**
 * 统一的登录/注册表单组件
 * 支持中英文，包含第三方 OAuth 登录
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { GoogleIcon, MicrosoftIcon, AppleIcon, WeChatIcon, InstagramIcon } from "@/components/SocialIcons";
import { getOAuthUrl } from "@/const";

interface AuthFormProps {
  mode: "login" | "register";
  language: "zh" | "en";
  onSubmit: (data: { email: string; password: string }) => Promise<void>;
  onSwitchMode: () => void;
}

const translations = {
  zh: {
    login: {
      title: "登录 UVS AI",
      subtitle: "使用邮箱和密码登录您的账户",
      email: "邮箱地址",
      password: "密码",
      rememberMe: "记住我",
      forgotPassword: "忘记密码?",
      signIn: "登录",
      noAccount: "还没有账户?",
      createAccount: "创建账户",
      orContinueWith: "或使用以下方式登录",
      invalidEmail: "请输入有效的邮箱地址",
      passwordRequired: "请输入密码",
    },
    register: {
      title: "创建 UVS AI 账户",
      subtitle: "加入我们的 AI 社区",
      email: "邮箱地址",
      password: "密码",
      confirmPassword: "确认密码",
      agreeTerms: "我同意服务条款和隐私政策",
      signUp: "创建账户",
      hasAccount: "已有账户?",
      signIn: "登录",
      orContinueWith: "或使用以下方式注册",
      invalidEmail: "请输入有效的邮箱地址",
      passwordTooShort: "密码至少需要 8 个字符",
      passwordMismatch: "两次输入的密码不一致",
    },
  },
  en: {
    login: {
      title: "Sign In to UVS AI",
      subtitle: "Sign in with your email and password",
      email: "Email Address",
      password: "Password",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      signIn: "Sign In",
      noAccount: "Don't have an account?",
      createAccount: "Create one",
      orContinueWith: "Or continue with",
      invalidEmail: "Please enter a valid email address",
      passwordRequired: "Please enter your password",
    },
    register: {
      title: "Create UVS AI Account",
      subtitle: "Join our AI community",
      email: "Email Address",
      password: "Password",
      confirmPassword: "Confirm Password",
      agreeTerms: "I agree to the Terms of Service and Privacy Policy",
      signUp: "Create Account",
      hasAccount: "Already have an account?",
      signIn: "Sign In",
      orContinueWith: "Or continue with",
      invalidEmail: "Please enter a valid email address",
      passwordTooShort: "Password must be at least 8 characters",
      passwordMismatch: "Passwords do not match",
    },
  },
};

export default function AuthForm({ mode, language, onSubmit, onSwitchMode }: AuthFormProps) {
  const t = translations[language][mode];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOAuthLoading] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = t.invalidEmail;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }

    if (!formData.password) {
      newErrors.password = language === "zh" ? "请输入密码" : "Please enter password";
    } else if (mode === "register" && formData.password.length < 8) {
      newErrors.password = (t as any).passwordTooShort || (language === "zh" ? "密码至少需要 8 个字符" : "Password must be at least 8 characters");
    }

    if (mode === "register") {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = language === "zh" ? "请确认密码" : "Please confirm password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = (t as any).passwordMismatch || (language === "zh" ? "两次输入的密码不一致" : "Passwords do not match");
      }

      if (!formData.agreeTerms) {
        newErrors.agreeTerms = language === "zh" ? "请同意服务条款" : "Please agree to the terms";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSubmit({
        email: formData.email,
        password: formData.password,
      });
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = (provider: "google" | "microsoft" | "apple" | "wechat" | "instagram") => {
    setOAuthLoading(provider);
    const url = getOAuthUrl(provider);
    if (url) {
      window.location.href = url;
    } else {
      console.warn(`OAuth not configured for ${provider}`);
      setOAuthLoading(null);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* 标题 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* 表单 */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        {/* 邮箱字段 */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">{t.email}</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="pl-10"
              disabled={isLoading}
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* 密码字段 */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">{t.password}</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="pl-10 pr-10"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* 确认密码字段（仅注册模式） */}
        {mode === "register" && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">{(t as any).confirmPassword}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="pl-10 pr-10"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
        )}

        {/* 记住我 / 同意条款 */}
        <div className="flex items-center justify-between">
          {mode === "login" ? (
            <>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-border"
                  disabled={isLoading}
                />
                <span className="text-sm text-muted-foreground">{(t as any).rememberMe}</span>
              </label>
              <a href="/forgot-password" className="text-sm text-primary hover:underline">
                {(t as any).forgotPassword}
              </a>
            </>
          ) : (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="w-4 h-4 rounded border-border"
              disabled={isLoading}
            />
            <span className="text-sm text-muted-foreground">{(t as any).agreeTerms}</span>
            </label>
          )}
        </div>
        {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}

        {/* 提交按钮 */}
        <Button type="submit" className="w-full" disabled={isLoading} size="lg">
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {mode === "login" ? t.signIn : (t as any).signUp}
        </Button>
      </form>

      {/* 分割线 */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">{t.orContinueWith}</span>
        </div>
      </div>

      {/* OAuth 按钮 */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {[
          { provider: "google" as const, icon: GoogleIcon },
          { provider: "microsoft" as const, icon: MicrosoftIcon },
          { provider: "apple" as const, icon: AppleIcon },
          { provider: "wechat" as const, icon: WeChatIcon },
          { provider: "instagram" as const, icon: InstagramIcon },
        ].map(({ provider, icon: Icon }) => (
          <button
            key={provider}
            type="button"
            onClick={() => handleOAuthLogin(provider)}
            disabled={oauthLoading !== null}
            className="flex items-center justify-center p-3 rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-50"
            title={provider}
          >
            {oauthLoading === provider ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Icon size={20} />
            )}
          </button>
        ))}
      </div>

      {/* 切换登录/注册 */}
      <div className="text-center">
        <p className="text-muted-foreground">
          {mode === "login" ? (t as any).noAccount : (translations[language].register as any).hasAccount}{" "}
          <button
            type="button"
            onClick={onSwitchMode}
            className="text-primary hover:underline font-medium"
          >
            {mode === "login" ? (t as any).createAccount : (translations[language].login as any).signIn}
          </button>
        </p>
      </div>
    </div>
  );
}
