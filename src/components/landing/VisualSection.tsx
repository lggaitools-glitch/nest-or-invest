import { TrendingUp, Target, Calculator, Scale } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const featureIcons = [TrendingUp, Target, Calculator, Scale];

export function VisualSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground font-display text-center mb-6">
          {t.landing.visual.headline}
        </h2>
        
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          {t.landing.visual.body}
        </p>
        
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {t.landing.visual.features.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <div 
                key={index} 
                className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground">{feature}</span>
              </div>
            );
          })}
        </div>
        
        <p className="text-center text-muted-foreground italic">
          {t.landing.visual.conclusion}
        </p>
      </div>
    </section>
  );
}
