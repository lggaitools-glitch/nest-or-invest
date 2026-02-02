import { ReactNode } from 'react';

interface ArticleCalloutProps {
  children: ReactNode;
}

export function ArticleCallout({ children }: ArticleCalloutProps) {
  return (
    <blockquote className="article-callout">
      {children}
    </blockquote>
  );
}
