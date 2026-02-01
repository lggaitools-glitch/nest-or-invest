import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10" />
      
      <div className="container max-w-4xl mx-auto px-4 py-16 md:py-24 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-display leading-tight mb-6 whitespace-pre-line">
          {t.landing.hero.headline}
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          {t.landing.hero.subheadline}
        </p>
        
        <div className="flex flex-col items-center gap-4">
          <Button 
            size="lg" 
            asChild
            className="text-lg px-8 py-6 h-auto group"
          >
            <Link to="/simulate">
              {t.landing.hero.cta}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          
          <p className="text-sm text-muted-foreground">
            {t.landing.hero.ctaSecondary}
          </p>
        </div>
      </div>
    </section>
  );
}
