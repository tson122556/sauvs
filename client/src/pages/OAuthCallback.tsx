/**
 * OAuth 回调处理页面
 * 处理来自第三方 OAuth 提供商的回调
 */

import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "wouter";
import { Loader2 } from "lucide-react";

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const [, setLocation] = useLocation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the authorization code from URL params
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const error = searchParams.get("error");

        if (error) {
          setError(`OAuth error: ${error}`);
          return;
        }

        if (!code) {
          setError("No authorization code received");
          return;
        }

        // Decode state to get provider info
        let provider = "unknown";
        try {
          const decodedState = JSON.parse(atob(state || "{}"));
          provider = decodedState.provider || "unknown";
        } catch (e) {
          console.warn("Could not decode state:", e);
        }

        // Send code to backend for token exchange
        const response = await fetch("/api/auth/oauth/callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
            state,
            provider,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "OAuth authentication failed");
          return;
        }

        const data = await response.json();

        // Store auth token if provided
        if (data.token) {
          localStorage.setItem("auth_token", data.token);
        }

        // Redirect to chat page
        const language = localStorage.getItem("language") || "en";
        setLocation(language === "zh" ? "/zh/uvs-ai-chat" : "/en/uvs-ai-chat");
      } catch (err) {
        console.error("OAuth callback error:", err);
        setError("An error occurred during authentication");
      }
    };

    handleCallback();
  }, [searchParams, setLocation]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Authentication Error</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button
            onClick={() => window.location.href = "/"}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary mb-4" />
        <p className="text-muted-foreground">Completing authentication...</p>
      </div>
    </div>
  );
}
