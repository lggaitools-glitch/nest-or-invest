import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SiteNavigation } from '@/components/SiteNavigation';
import { TopicHub, ArticleLanguageSwitcher } from '@/components/articles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Clock } from 'lucide-react';
import { getPublishedArticles, calculateReadingTime } from '@/data/articleData';

export default function Articles() {
  const articles = getPublishedArticles();

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Housing & Financial Decision Insights | HomeDecision</title>
        <meta
          name="description"
          content="Research-backed articles to help you make better long-term housing decisions. Understand the real trade-offs behind renting, buying, and investing."
        />
        <link rel="canonical" href="https://homedecision.app/articles" />
        <link rel="alternate" hrefLang="en" href="https://homedecision.app/articles" />
        <link rel="alternate" hrefLang="es" href="https://homedecision.app/es/articles" />
        <link rel="alternate" hrefLang="x-default" href="https://homedecision.app/articles" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <SiteNavigation />

        <main className="container max-w-4xl mx-auto px-4 py-12 md:py-16">
          {/* Page Header */}
          <header className="mb-12">
            <div className="flex items-start justify-between gap-4 mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground font-display">
                Insights
              </h1>
              <ArticleLanguageSwitcher
                currentLanguage="en"
                enPath="/articles"
                esPath="/es/articles"
              />
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              At HomeDecision, we publish research-backed articles to help people make better
              long-term housing decisions. Our goal is not to tell you what to do, but to help
              you understand the real trade-offs behind renting, buying, and investing — using
              data, behavior, and long-term thinking.
            </p>
          </header>

          {/* Topic Hub */}
          <TopicHub />

          {/* Articles List */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-foreground font-display mb-4">Latest articles</h2>
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={`/articles/${article.slug}`}
                className="block group"
              >
                <Card className="transition-all duration-200 hover:shadow-md hover:border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-xl md:text-2xl font-display group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {calculateReadingTime(article.wordCount)} min read
                    </span>
                    <span className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                      Read article
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-8">
          <div className="container max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} HomeDecision. Educational purposes only.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
