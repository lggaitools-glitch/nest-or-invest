import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function ProblemSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground font-display text-center mb-8">
          {t.landing.problem.headline}
        </h2>
        
        <p className="text-lg text-muted-foreground text-center mb-8">
          {t.landing.problem.intro}
        </p>
        
        <ul className="space-y-4 max-w-xl mx-auto mb-10">
          {t.landing.problem.fears.map((fear, index) => (
            <li 
              key={index} 
              className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border shadow-sm"
            >
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <span className="text-foreground">{fear}</span>
            </li>
          ))}
        </ul>
        
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 md:p-8 text-center">
          <p className="text-lg md:text-xl font-medium text-foreground mb-4">
            {t.landing.problem.truth}
          </p>
          <p className="text-muted-foreground">
            {t.landing.problem.conclusion}
          </p>
        </div>
      </div>
    </section>
  );
}
