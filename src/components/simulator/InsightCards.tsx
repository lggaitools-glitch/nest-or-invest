import type { Insight } from '@/types/simulator';
import { Lightbulb, TrendingUp, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InsightCardsProps {
  insights: Insight[];
}

export function InsightCards({ insights }: InsightCardsProps) {
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

  return (
    <div className="card-elevated-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Info className="h-5 w-5 text-muted-foreground" />
        <h3 className="section-title">Key Insights</h3>
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
              {insight.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
