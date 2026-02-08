import { FileText, Crown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';

export function FreeSimulatorCTA() {
  const { t } = useLanguage();

  const cta = t.freeEstimate?.cta;

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/50 to-accent/20 border border-primary/10">
      <h3 className="text-xl font-semibold text-foreground text-center mb-6">
        {cta?.title || 'Get the Complete Analysis'}
      </h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        {/* One-Time Report Card */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">
                {cta?.reportTitle || 'One-Time Decision Report'}
              </h4>
              <p className="text-lg font-bold text-primary">
                {cta?.reportPrice || '€3.99'}
              </p>
            </div>
          </div>
          <ul className="space-y-2 mb-5">
            {(cta?.reportFeatures || [
              'Full cost over time',
              'Break-even analysis',
              'Charts & graphs',
              'Risk analysis',
              'PDF export',
            ]).map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" className="w-full">
            <Link to="/report">{cta?.reportBtn || 'Get Decision Report'}</Link>
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
              <h4 className="font-semibold text-foreground">
                {cta?.premiumTitle || 'Compare Scenarios'}
              </h4>
              <p className="text-lg font-bold text-primary">
                {cta?.premiumPrice || '€6.99/month'}
              </p>
            </div>
          </div>
          <ul className="space-y-2 mb-5">
            {(cta?.premiumFeatures || [
              'Everything in Report',
              'Unlimited scenarios',
              'Save & compare',
              'Edit assumptions',
            ]).map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
          <Button asChild className="w-full">
            <Link to="/pricing">{cta?.premiumBtn || 'Go Premium'}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
