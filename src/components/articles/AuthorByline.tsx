import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { calculateReadingTime } from '@/data/articleData';

interface AuthorBylineProps {
  wordCount: number;
  modifiedDate: string;
}

export function AuthorByline({ wordCount, modifiedDate }: AuthorBylineProps) {
  const readingTime = calculateReadingTime(wordCount);
  const formattedDate = format(new Date(modifiedDate), 'MMMM d, yyyy');

  return (
    <div className="border-y border-border py-4 my-6">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground mb-3">
        <span>By HomeDecision Research Team</span>
        <span className="hidden sm:inline">·</span>
        <span>Reviewed for accuracy</span>
        <span className="hidden sm:inline">·</span>
        <span>{readingTime} min read</span>
        <span className="hidden sm:inline">·</span>
        <span>Last updated {formattedDate}</span>
      </div>

      <Collapsible>
        <CollapsibleTrigger className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors group">
          <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
          About HomeDecision Research Team
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 text-sm text-muted-foreground leading-relaxed">
          <p className="mb-3">
            HomeDecision Research Team publishes data-driven housing and financial decision
            insights. Our goal is to clarify trade-offs in renting, buying, and long-term
            planning using transparent assumptions and practical reasoning. We do not sell
            real estate and we do not receive commissions from banks or agents.
          </p>
          <Link
            to="/simulate"
            className="text-primary hover:underline font-medium inline-flex items-center gap-1"
          >
            Learn how HomeDecision works →
          </Link>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
