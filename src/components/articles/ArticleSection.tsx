import { ReactNode } from 'react';

interface ArticleSectionProps {
  children: ReactNode;
}

export function ArticleSection({ children }: ArticleSectionProps) {
  return (
    <section className="mb-10">
      {children}
    </section>
  );
}
