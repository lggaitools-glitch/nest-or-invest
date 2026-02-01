import { formatCurrency } from '@/lib/calculations';
import type { SimulatorOutputs } from '@/types/simulator';
import { TrendingUp, TrendingDown, Scale, Home, Building } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/i18n/LanguageContext';

interface ResultsDisplayProps {
  outputs: SimulatorOutputs;
  timeHorizon: number;
  countryId: string;
}

export function ResultsDisplay({ outputs, timeHorizon, countryId }: ResultsDisplayProps) {
  const { t } = useLanguage();
  const isRentWinner = outputs.winner === 'rent';
  const isTie = outputs.winner === 'tie';

  return (
    <div className="space-y-4">
      {/* Winner Banner */}
      <div
        className={cn(
          'card-elevated-lg p-6 text-center',
          isRentWinner
            ? 'bg-gradient-to-br from-accent to-accent/50 border-primary/20'
            : isTie
            ? 'bg-gradient-to-br from-muted to-muted/50'
            : 'bg-gradient-to-br from-success-muted to-success-muted/50 border-success/20'
        )}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          {isTie ? (
            <Scale className="h-6 w-6 text-muted-foreground" />
          ) : isRentWinner ? (
            <Home className="h-6 w-6 text-primary" />
          ) : (
            <Building className="h-6 w-6 text-success" />
          )}
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {t.results.afterYears.replace('{years}', String(timeHorizon))}
          </span>
        </div>
        
        {isTie ? (
          <p className="text-xl font-semibold text-foreground">
            {t.results.bothEqual}
          </p>
        ) : (
          <>
            <p className="text-xl font-semibold text-foreground mb-1">
              {isRentWinner ? t.results.rentingMakesYou : t.results.buyingMakesYou}
            </p>
            <p className="result-number text-primary animate-number">
              {formatCurrency(outputs.difference, countryId)}
            </p>
            <p className="text-lg text-muted-foreground">{t.results.wealthier}</p>
          </>
        )}
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Rent Card */}
        <div
          className={cn(
            'card-elevated p-5 transition-all duration-300',
            isRentWinner && 'ring-2 ring-primary ring-offset-2'
          )}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-accent">
              <Home className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {t.results.rentInvest}
            </span>
          </div>
          <p className="text-3xl font-bold text-foreground font-display">
            {formatCurrency(outputs.netRent, countryId)}
          </p>
          <div className="flex items-center gap-1 mt-2">
            {outputs.netRent >= 0 ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive" />
            )}
            <span
              className={cn(
                'text-sm font-medium',
                outputs.netRent >= 0 ? 'text-success' : 'text-destructive'
              )}
            >
              {t.results.netWorth}
            </span>
          </div>
        </div>

        {/* Buy Card */}
        <div
          className={cn(
            'card-elevated p-5 transition-all duration-300',
            outputs.winner === 'buy' && 'ring-2 ring-success ring-offset-2'
          )}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-success-muted">
              <Building className="h-4 w-4 text-success" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {t.results.buyOwn}
            </span>
          </div>
          <p className="text-3xl font-bold text-foreground font-display">
            {formatCurrency(outputs.netBuy, countryId)}
          </p>
          <div className="flex items-center gap-1 mt-2">
            {outputs.netBuy >= 0 ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive" />
            )}
            <span
              className={cn(
                'text-sm font-medium',
                outputs.netBuy >= 0 ? 'text-success' : 'text-destructive'
              )}
            >
              {t.results.netWorth}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
