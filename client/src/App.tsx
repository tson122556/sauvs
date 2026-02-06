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
import JizixingAI from "./pages/JizixingAI";
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
      
      {/* 英文路由 */}
      <Route path="/en" component={HomeEn} />
      <Route path="/en/about" component={AboutEn} />
      <Route path="/en/contact" component={ContactEn} />
      <Route path="/en/ai-hub" component={AIHub} />
      
      {/* AI Hub 路由 */}
      <Route path="/zh/ai-hub" component={AIHubZh} />
      
      {/* 极紫星专有模型路由 */}
      <Route path="/jizixing-ai" component={JizixingAI} />
      <Route path="/zh/jizixing-ai" component={JizixingAI} />
      <Route path="/en/jizixing-ai" component={JizixingAI} />
      
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
