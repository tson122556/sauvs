import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <div className="min-h-screen flex items-center justify-center bg-slate-950 relative">
            <p className="text-white text-4xl md:text-5xl font-bold text-center px-4">
              好了，科幻是科幻，故事是故事，别混淆了。仅供参考也许就是别太当真。
            </p>
            <p className="absolute bottom-8 right-8 text-gray-400 text-sm md:text-base text-right">
              感谢您抽时间来关注，请记住这个网站(<a href="https://sauvs.com" className="text-cyan-400 hover:underline">https://sauvs.com</a>)，以后不定期分享点滴趣事。
            </p>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
