import { Eye, Code, Shield, GraduationCap } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const bulletIcons = [Eye, Code, Shield, GraduationCap];

export function TrustSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground font-display text-center mb-12">
          {t.landing.trust.headline}
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {t.landing.trust.bullets.map((bullet, index) => {
            const Icon = bulletIcons[index];
            return (
              <div 
                key={index} 
                className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border"
              >
                <Icon className="h-5 w-5 text-primary shrink-0" />
                <span className="text-foreground">{bullet}</span>
              </div>
            );
          })}
        </div>
        
        <div className="bg-gradient-to-br from-primary/5 to-secondary/10 rounded-xl p-6 md:p-8 text-center border border-primary/10">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t.landing.trust.mission}
          </p>
        </div>
      </div>
    </section>
  );
}
