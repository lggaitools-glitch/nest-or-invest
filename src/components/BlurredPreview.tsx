import { ReactNode } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface BlurredPreviewProps {
  children: ReactNode;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
  blurAmount?: 'sm' | 'md' | 'lg';
}

export function BlurredPreview({
  children,
  title = 'Unlock Full Analysis',
  description = 'Get the complete breakdown with charts, insights, and PDF export.',
  ctaText = 'Get Report – €3.99',
  ctaLink = '/report',
  className,
  blurAmount = 'md',
}: BlurredPreviewProps) {
  const blurClasses = {
    sm: 'blur-[2px]',
    md: 'blur-[6px]',
    lg: 'blur-[10px]',
  };

  return (
    <div className={cn('relative overflow-hidden rounded-xl', className)}>
      {/* Blurred content */}
      <div className={cn('pointer-events-none select-none', blurClasses[blurAmount])}>
        {children}
      </div>

      {/* Overlay with CTA */}
      <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
        <div className="text-center max-w-sm px-6 py-8">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <Button asChild>
            <Link to={ctaLink}>{ctaText}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
