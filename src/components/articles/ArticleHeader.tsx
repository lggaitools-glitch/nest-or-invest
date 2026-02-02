import { ReactNode } from 'react';

interface ArticleHeaderProps {
  title: string;
  lead?: ReactNode;
}

export function ArticleHeader({ title, lead }: ArticleHeaderProps) {
  return (
    <header className="mb-12">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-display leading-tight mb-6">
        {title}
      </h1>
      {lead && (
        <p className="article-lead">
          {lead}
        </p>
      )}
    </header>
  );
}
