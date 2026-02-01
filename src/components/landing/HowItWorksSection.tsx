import { ClipboardList, Sliders, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const stepIcons = [ClipboardList, Sliders, BarChart3];

export function HowItWorksSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground font-display text-center mb-12">
          {t.landing.howItWorks.headline}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {t.landing.howItWorks.steps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <div 
                key={index} 
                className="relative flex flex-col items-center text-center"
              >
                {/* Step number */}
                <div className="absolute -top-2 -left-2 md:static md:mb-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
                
                {/* Connector line (hidden on mobile) */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-[calc(50%+4rem)] w-[calc(100%-8rem)] h-0.5 bg-border" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
