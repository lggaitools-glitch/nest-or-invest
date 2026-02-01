import { Briefcase, Users, Globe, BarChart } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  briefcase: Briefcase,
  users: Users,
  globe: Globe,
  'bar-chart': BarChart,
};

export function AudienceSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground font-display text-center mb-12">
          {t.landing.audience.headline}
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-6">
          {t.landing.audience.personas.map((persona, index) => {
            const Icon = iconMap[persona.icon] || Briefcase;
            return (
              <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-foreground">{persona.text}</span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
