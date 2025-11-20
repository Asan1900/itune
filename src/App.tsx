import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/components/LanguageProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Theme initialization component
const ThemeInitializer = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Initialize theme from localStorage or default to dark
    const savedSettings = localStorage.getItem('itunenote-tuner-settings');
    let theme = 'dark';

    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        theme = parsed.theme || 'dark';
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
      }
    }

    // Apply theme immediately
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.className = `dark theme-${theme}`;

    // Listen for storage changes to sync theme across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'itunenote-tuner-settings' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          const newTheme = parsed.theme || 'dark';
          document.documentElement.setAttribute('data-theme', newTheme);
          document.documentElement.className = `dark theme-${newTheme}`;
        } catch (error) {
          console.error('Failed to parse theme from storage change:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeInitializer>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeInitializer>
  </QueryClientProvider>
);

export default App;
