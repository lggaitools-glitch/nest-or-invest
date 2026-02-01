import { Home, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '@/i18n/LanguageContext';

export function SimulatorHeader() {
  const { t } = useLanguage();

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="p-2 rounded-xl bg-primary/10">
                <div className="flex items-center">
                  <Home className="h-5 w-5 text-primary" />
                  <TrendingUp className="h-4 w-4 text-primary -ml-1" />
                </div>
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground font-display">
                  {t.header.title}
                </h1>
                <p className="text-xs text-muted-foreground">{t.header.subtitle}</p>
              </div>
            </Link>
            <nav className="hidden sm:flex items-center gap-4">
              <Link 
                to="/" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.simulate.nav.home}
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}
