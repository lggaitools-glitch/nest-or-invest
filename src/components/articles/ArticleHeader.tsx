import { ReactNode } from 'react';
import { Clock, Calendar } from 'lucide-react';

interface ArticleHeaderProps {
  title: string;
  lead?: ReactNode;
  publishedDate?: string;
  readingTime?: number;
}

export function ArticleHeader({ title, lead, publishedDate, readingTime }: ArticleHeaderProps) {
  const formattedDate = publishedDate 
    ? new Date(publishedDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : null;

  return (
    <header className="mb-12">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-display leading-tight mb-4">
        {title}
      </h1>
      
      {(formattedDate || readingTime) && (
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          {formattedDate && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
          )}
          {readingTime && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {readingTime} min read
            </span>
          )}
        </div>
      )}
      
      {lead && (
        <p className="article-lead">
          {lead}
        </p>
      )}
    </header>
  );
}
