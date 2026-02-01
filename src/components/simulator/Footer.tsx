import { Heart } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card/50 mt-12">
      <div className="container max-w-6xl mx-auto px-4 py-6">
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
