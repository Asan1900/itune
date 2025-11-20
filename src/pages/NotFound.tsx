import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();
  useEffect(() => {
    document.title = `${t('app.title')} — 404`;
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname, t]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-6">
        <h1 className="text-5xl font-bold mb-4 text-foreground">404</h1>
        <p className="text-lg text-muted-foreground mb-6">{t('notfound.message')}</p>
        <Button asChild>
          <Link to="/">{t('notfound.back')}</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
