import { Check, Settings, Ban } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';

export function SolutionSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground font-display text-center mb-12">
          {t.landing.solution.headline}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* What it helps you do */}
          <Card className="border-border">
            <CardContent className="p-6">
              <p className="font-semibold text-foreground mb-4">{t.landing.solution.intro}</p>
              <ul className="space-y-3">
                {t.landing.solution.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{bullet}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {/* Test assumptions */}
          <Card className="border-border">
            <CardContent className="p-6">
              <p className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Test assumptions like:
              </p>
              <ul className="space-y-2">
                {t.landing.solution.assumptions.map((assumption, index) => (
                  <li key={index} className="text-muted-foreground pl-7">
                    • {assumption}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* No bias callout */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {t.landing.solution.noBias.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 text-muted-foreground"
            >
              <Ban className="h-4 w-4" />
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
