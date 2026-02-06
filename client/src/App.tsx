import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import HomeEn from "./pages/HomeEn";
import ContactEn from "./pages/ContactEn";
import AboutEn from "./pages/AboutEn";
import AIHub from "./pages/AIHub";
import AIHubZh from "./pages/AIHubZh";
import UVSAI from "./pages/UVSAI";
import UVSAIChat from "./pages/UVSAIChat";
import ProductAI from "./pages/ProductAI";
import ProductAIEn from "./pages/ProductAIEn";
import ProductRobot from "./pages/ProductRobot";
import ProductIoT from "./pages/ProductIoT";
import News from "./pages/News";
import NewsEn from "./pages/NewsEn";
import AIUsageStats from "./pages/AIUsageStats";
import AIUsageStatsEn from "./pages/AIUsageStatsEn";
import Register from "./pages/Register";
import RegisterEn from "./pages/RegisterEn";
import Login from "./pages/Login";
import LoginEn from "./pages/LoginEn";
import RootRedirect from "./pages/RootRedirect";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      {/* 根路径重定向 */}
      <Route path="/" component={RootRedirect} />
      
      {/* 中文路由 */}
      <Route path="/zh" component={Home} />
      <Route path="/zh/about" component={About} />
      <Route path="/zh/contact" component={Contact} />
      <Route path="/zh/news" component={News} />
      
      {/* 英文路由 */}
      <Route path="/en" component={HomeEn} />
      <Route path="/en/about" component={AboutEn} />
      <Route path="/en/contact" component={ContactEn} />
      <Route path="/en/ai-hub" component={AIHub} />
      <Route path="/en/news" component={NewsEn} />
      
      {/* AI Hub 路由 */}
      <Route path="/zh/ai-hub" component={AIHubZh} />
      
      {/* UVS专有模型路由 */}
      <Route path="/uvs-ai" component={UVSAI} />
      <Route path="/zh/uvs-ai" component={UVSAI} />
      <Route path="/uvs-ai-chat" component={UVSAIChat} />
      <Route path="/zh/uvs-ai-chat" component={UVSAIChat} />
      <Route path="/en/uvs-ai-chat" component={UVSAIChat} />
      <Route path="/en/uvs-ai" component={UVSAI} />
      
      {/* 使用统计页面 */}
      <Route path="/zh/ai-usage-stats" component={AIUsageStats} />
      <Route path="/en/ai-usage-stats" component={AIUsageStatsEn} />
      
      {/* 注册和登录页面 */}
      <Route path="/zh/register" component={Register} />
      <Route path="/en/register" component={RegisterEn} />
      <Route path="/zh/login" component={Login} />
      <Route path="/en/login" component={LoginEn} />
      
      {/* 产品详情页面 */}
      <Route path="/zh/product/ai" component={ProductAI} />
      <Route path="/en/product/ai" component={ProductAIEn} />
      <Route path="/zh/product/robot" component={ProductRobot} />
      <Route path="/zh/product/iot" component={ProductIoT} />
      
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider
          defaultTheme="dark"
          // switchable
        >
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
