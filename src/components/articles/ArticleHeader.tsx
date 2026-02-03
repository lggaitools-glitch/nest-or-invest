import { ReactNode } from 'react';
import { AuthorByline } from './AuthorByline';

interface ArticleHeaderProps {
  title: string;
  lead?: ReactNode;
  publishedDate?: string;
  modifiedDate?: string;
  wordCount?: number;
  showByline?: boolean;
  language?: 'en' | 'es';
}

export function ArticleHeader({ 
  title, 
  lead, 
  modifiedDate,
  wordCount,
  showByline = true,
  language = 'en',
}: ArticleHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-display leading-tight mb-4">
        {title}
      </h1>
      
      {lead && (
        <p className="article-lead mb-6">
          {lead}
        </p>
      )}

      {showByline && modifiedDate && wordCount && (
        <AuthorByline 
          wordCount={wordCount} 
          modifiedDate={modifiedDate}
          language={language}
        />
      )}
    </header>
  );
}
