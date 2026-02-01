import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

interface FinalCTASectionProps {
  onStartSimulation: () => void;
}

export function FinalCTASection({ onStartSimulation }: FinalCTASectionProps) {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground font-display mb-4">
          {t.landing.finalCta.headline}
        </h2>
        
        <p className="text-lg text-muted-foreground mb-8">
          {t.landing.finalCta.subheadline}
        </p>
        
        <Button 
          size="lg" 
          onClick={onStartSimulation}
          className="text-lg px-8 py-6 h-auto group"
        >
          {t.landing.finalCta.cta}
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
}
