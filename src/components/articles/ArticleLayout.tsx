import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SiteNavigation } from '@/components/SiteNavigation';

interface ArticleLayoutProps {
  children: ReactNode;
}

export function ArticleLayout({ children }: ArticleLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <SiteNavigation />

      <article className="container max-w-3xl mx-auto px-4 py-12 md:py-16">
        {/* Back Link */}
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Insights
        </Link>

        {children}
      </article>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container max-w-3xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} HomeDecision. Educational purposes only.</p>
        </div>
      </footer>
    </div>
  );
}
