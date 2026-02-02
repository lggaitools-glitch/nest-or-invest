import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface ArticleCTAProps {
  ctaText: string;
  ctaLink: string;
  backText?: string;
  backLink?: string;
}

export function ArticleCTA({ 
  ctaText, 
  ctaLink, 
  backText = "Back to Insights", 
  backLink = "/articles" 
}: ArticleCTAProps) {
  return (
    <footer className="mt-16">
      <Separator className="mb-8" />
      
      <div className="space-y-8">
        <Button asChild size="lg" className="gap-2">
          <Link to={ctaLink}>
            {ctaText}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>

        <div>
          <Link
            to={backLink}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {backText}
          </Link>
        </div>
      </div>
    </footer>
  );
}
