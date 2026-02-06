/**
 * 统一的登录/注册页面
 * 支持中英文，包含第三方 OAuth 登录
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import AuthForm from "@/components/AuthForm";

export default function UnifiedLogin() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<"login" | "register">("login");

  const handleSubmit = async (data: { email: string; password: string }) => {
    try {
      // Simulate login/register request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (mode === "login") {
        // Redirect to chat page after successful login
        setLocation(language === "zh" ? "/zh/uvs-ai-chat" : "/en/uvs-ai-chat");
      } else {
        // Redirect to login page after successful registration
        setLocation(language === "zh" ? "/zh/login" : "/en/login");
      }
    } catch (error) {
      console.error("Auth error:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Language switcher */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Main container */}
      <div className="w-full max-w-md relative z-10">
        <AuthForm
          mode={mode}
          language={language as "zh" | "en"}
          onSubmit={handleSubmit}
          onSwitchMode={() => setMode(mode === "login" ? "register" : "login")}
        />
      </div>
    </div>
  );
}
