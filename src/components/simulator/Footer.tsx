import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card/50 mt-12">
      <div className="container max-w-6xl mx-auto px-4 py-6">
        {/* Navigation Links for SEO */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/simulate" className="text-muted-foreground hover:text-foreground transition-colors">
            Simulator
          </Link>
          <Link to="/report" className="text-muted-foreground hover:text-foreground transition-colors">
            Report (€3.99)
          </Link>
          <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link to="/articles" className="text-muted-foreground hover:text-foreground transition-colors">
            Articles
          </Link>
          <Link to="/es/articles" className="text-muted-foreground hover:text-foreground transition-colors">
            Artículos
          </Link>
        </nav>

        {/* Legal Disclaimer */}
        <p className="text-xs text-muted-foreground text-center mb-6 max-w-3xl mx-auto">
          {t.footer.disclaimer}
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-1">
            {t.footer.builtWith} <Heart className="h-4 w-4 text-destructive" />
          </p>
          <div className="flex items-center gap-4">
            <span>{t.footer.copyright}</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">{t.footer.educational}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
