import type { Insight } from '@/types/simulator';
import { Lightbulb, TrendingUp, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/i18n/LanguageContext';
import { formatCurrency } from '@/lib/calculations';

interface InsightCardsProps {
  insights: Insight[];
  countryId: string;
}

export function InsightCards({ insights, countryId }: InsightCardsProps) {
  const { t } = useLanguage();

  if (insights.length === 0) return null;

  const getIcon = (type: Insight['type']) => {
    switch (type) {
      case 'positive':
        return <TrendingUp className="h-5 w-5" />;
      case 'negative':
        return <AlertCircle className="h-5 w-5" />;
      case 'neutral':
      default:
        return <Lightbulb className="h-5 w-5" />;
    }
  };

  const getStyles = (type: Insight['type']) => {
    switch (type) {
      case 'positive':
        return 'bg-success-muted border-success/30 text-success';
      case 'negative':
        return 'bg-warning-muted border-warning/30 text-warning';
      case 'neutral':
      default:
        return 'bg-accent border-primary/20 text-primary';
    }
  };

  // Translate insight messages
  const translateMessage = (insight: Insight): string => {
    const { id, message, data } = insight;

    if (!data) return message;

    switch (id) {
      case 'breakeven':
        const baseMsg = t.insights.breakeven.message.replace('{year}', String(data.year));
        const afterWinner = data.afterWinner ?? data.winner;
        const suffix =
          afterWinner === 'buy'
            ? t.insights.breakeven.buyingBetter
            : afterWinner === 'rent'
              ? t.insights.breakeven.rentingBecomesBetter
              : '';

        return suffix ? `${baseMsg} ${suffix}` : baseMsg;
      
      case 'winner':
        if (data.winner === 'rent') {
          return t.insights.winnerRent
            .replace('{amount}', formatCurrency(data.difference, countryId))
            .replace('{years}', String(data.years))
            .replace('{rate}', String(data.rate));
        } else {
          return t.insights.winnerBuy
            .replace('{amount}', formatCurrency(data.difference, countryId))
            .replace('{years}', String(data.years))
            .replace('{rate}', String(data.rate));
        }
      
      case 'sensitivity':
        return t.insights.sensitivity.replace('{rate}', String(data.rate));
      
      case 'cashflow':
        return t.insights.cashflow
          .replace('{mortgage}', formatCurrency(data.mortgage, countryId))
          .replace('{rent}', formatCurrency(data.rent, countryId));
      
      case 'longterm':
        return t.insights.longterm.replace('{years}', String(data.years));
      
      default:
        return message;
    }
  };

  return (
    <div className="card-elevated-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Info className="h-5 w-5 text-muted-foreground" />
        <h3 className="section-title">{t.insights.title}</h3>
      </div>
      <div className="grid gap-3">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={cn(
              'flex items-start gap-3 p-4 rounded-lg border transition-all duration-300 hover:shadow-sm',
              getStyles(insight.type)
            )}
          >
            <div className="flex-shrink-0 mt-0.5">{getIcon(insight.type)}</div>
            <p className="text-sm text-foreground leading-relaxed">
              {translateMessage(insight)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
