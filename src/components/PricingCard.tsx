import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { PricingPlan } from '@/types/monetization';

interface PricingCardProps {
  plan: PricingPlan;
  className?: string;
}

export function PricingCard({ plan, className }: PricingCardProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border bg-card p-6 shadow-lg',
        plan.highlighted && 'border-primary ring-2 ring-primary',
        className
      )}
    >
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-bold text-foreground">{plan.price}</span>
        {plan.priceSubtext && (
          <span className="ml-1 text-sm text-muted-foreground">{plan.priceSubtext}</span>
        )}
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="h-5 w-5 shrink-0 text-primary" />
            <span className="text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        asChild
        variant={plan.highlighted ? 'default' : 'outline'}
        className="w-full"
      >
        <Link to={plan.ctaLink}>{plan.cta}</Link>
      </Button>
    </div>
  );
}
