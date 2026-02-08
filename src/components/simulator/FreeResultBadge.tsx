import { Home, Key, HelpCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/i18n/LanguageContext';

export type FreeVerdict = 'buying' | 'renting' | 'depends';

interface FreeResultBadgeProps {
  verdict: FreeVerdict;
  monthlyRent: number;
  monthlyBuying: number;
  timeHorizonYears: number;
}

export function FreeResultBadge({
  verdict,
  monthlyRent,
  monthlyBuying,
  timeHorizonYears,
}: FreeResultBadgeProps) {
  const { t } = useLanguage();

  const getVerdictConfig = () => {
    switch (verdict) {
      case 'buying':
        return {
          icon: Home,
          label: t.freeEstimate?.result?.buyingCheaper || 'Buying may be cheaper',
          bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
          iconColor: 'text-emerald-600 dark:text-emerald-400',
          borderColor: 'border-emerald-200 dark:border-emerald-800',
        };
      case 'renting':
        return {
          icon: Key,
          label: t.freeEstimate?.result?.rentingSafer || 'Renting may be safer',
          bgColor: 'bg-blue-50 dark:bg-blue-950/30',
          iconColor: 'text-blue-600 dark:text-blue-400',
          borderColor: 'border-blue-200 dark:border-blue-800',
        };
      default:
        return {
          icon: HelpCircle,
          label: t.freeEstimate?.result?.itDepends || 'It depends on your situation',
          bgColor: 'bg-amber-50 dark:bg-amber-950/30',
          iconColor: 'text-amber-600 dark:text-amber-400',
          borderColor: 'border-amber-200 dark:border-amber-800',
        };
    }
  };

  const config = getVerdictConfig();
  const Icon = config.icon;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const basedOnText = (t.freeEstimate?.result?.basedOn || 'based on a {years}-year estimate')
    .replace('{years}', String(timeHorizonYears));

  return (
    <Card className={`${config.bgColor} ${config.borderColor} border-2`}>
      <CardContent className="pt-6 pb-6">
        {/* Verdict Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 mb-2">
            <Icon className={`h-8 w-8 ${config.iconColor}`} />
            <span className="text-xl font-bold text-foreground">{config.label}</span>
          </div>
          <p className="text-sm text-muted-foreground">{basedOnText}</p>
        </div>

        {/* Monthly Cost Comparison */}
        <div className="mb-6">
          <p className="text-sm font-medium text-center text-muted-foreground mb-3">
            {t.freeEstimate?.result?.estimatedMonthly || 'Estimated Monthly Cost'}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background rounded-lg p-4 text-center border border-border">
              <p className="text-xs text-muted-foreground mb-1">
                {t.freeEstimate?.result?.renting || 'Renting'}
              </p>
              <p className="text-lg font-bold text-foreground">
                {formatCurrency(monthlyRent)}
                <span className="text-sm font-normal text-muted-foreground">
                  {t.freeEstimate?.result?.perMonth || '/mo'}
                </span>
              </p>
            </div>
            <div className="bg-background rounded-lg p-4 text-center border border-border">
              <p className="text-xs text-muted-foreground mb-1">
                {t.freeEstimate?.result?.buying || 'Buying'}
              </p>
              <p className="text-lg font-bold text-foreground">
                {formatCurrency(monthlyBuying)}
                <span className="text-sm font-normal text-muted-foreground">
                  {t.freeEstimate?.result?.perMonth || '/mo'}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 p-3 bg-background rounded-lg border border-border">
          <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t.freeEstimate?.disclaimer || 'This is a simplified estimate based on limited assumptions. For a complete analysis, get the full report.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
