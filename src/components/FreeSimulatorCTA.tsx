import { FileText, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';

export function FreeSimulatorCTA() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Want the Full Picture?',
      reportTitle: 'One-Time Report',
      reportPrice: '€3.99',
      reportFeatures: ['Full breakdown', 'PDF export', 'Charts & graphs', 'All insights'],
      reportCta: 'Get Report',
      premiumTitle: 'Compare Scenarios',
      premiumPrice: '€6.99',
      premiumPriceSubtext: '/month',
      premiumFeatures: ['Unlimited scenarios', 'Save & compare', 'Full features', 'Editable assumptions'],
      premiumCta: 'Go Premium',
    },
    es: {
      title: '¿Quieres el panorama completo?',
      reportTitle: 'Informe Único',
      reportPrice: '€3.99',
      reportFeatures: ['Análisis completo', 'Exportar PDF', 'Gráficos', 'Todos los insights'],
      reportCta: 'Obtener Informe',
      premiumTitle: 'Compara Escenarios',
      premiumPrice: '€6.99',
      premiumPriceSubtext: '/mes',
      premiumFeatures: ['Escenarios ilimitados', 'Guardar y comparar', 'Funciones completas', 'Supuestos editables'],
      premiumCta: 'Ir a Premium',
    },
  };

  const t = content[language] || content.en;

  return (
    <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-accent/50 to-accent/20 border border-primary/10">
      <h3 className="text-xl font-semibold text-foreground text-center mb-6">{t.title}</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        {/* One-Time Report Card */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{t.reportTitle}</h4>
              <p className="text-lg font-bold text-primary">{t.reportPrice}</p>
            </div>
          </div>
          <ul className="space-y-2 mb-5">
            {t.reportFeatures.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" className="w-full">
            <Link to="/report">{t.reportCta}</Link>
          </Button>
        </div>

        {/* Premium Card */}
        <div className="bg-card rounded-xl border-2 border-primary p-5 shadow-lg relative">
          <div className="absolute -top-3 right-4">
            <span className="inline-block rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
              Best Value
            </span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Crown className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{t.premiumTitle}</h4>
              <p className="text-lg font-bold text-primary">
                {t.premiumPrice}
                <span className="text-sm font-normal text-muted-foreground">{t.premiumPriceSubtext}</span>
              </p>
            </div>
          </div>
          <ul className="space-y-2 mb-5">
            {t.premiumFeatures.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
          <Button asChild className="w-full">
            <Link to="/pricing">{t.premiumCta}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
