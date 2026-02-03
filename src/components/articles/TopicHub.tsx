import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { topicCategories, getCategoryArticleCount } from '@/data/topicCategories';
import { getPublishedArticles } from '@/data/articleData';

export function TopicHub() {
  const publishedSlugs = getPublishedArticles().map((article) => article.slug);

  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-foreground font-display mb-6">Explore topics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topicCategories.map((category) => {
          const articleCount = getCategoryArticleCount(category.id, publishedSlugs);
          const hasArticles = articleCount > 0;

          // Find first published article in category for linking
          const firstArticleSlug = category.articleSlugs.find((slug) =>
            publishedSlugs.includes(slug)
          );

          const CardWrapper = hasArticles && firstArticleSlug
            ? ({ children }: { children: React.ReactNode }) => (
                <Link to={`/articles/${firstArticleSlug}`} className="block group">
                  {children}
                </Link>
              )
            : ({ children }: { children: React.ReactNode }) => <>{children}</>;

          return (
            <CardWrapper key={category.id}>
              <Card
                className={`h-full transition-all duration-200 ${
                  hasArticles
                    ? 'hover:shadow-md hover:border-primary/20 cursor-pointer'
                    : 'opacity-70'
                }`}
              >
                <CardHeader className="pb-2">
                  <CardTitle
                    className={`text-base font-medium ${
                      hasArticles ? 'group-hover:text-primary transition-colors' : ''
                    }`}
                  >
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                  <span
                    className={`text-xs font-medium ${
                      hasArticles ? 'text-primary' : 'text-muted-foreground italic'
                    }`}
                  >
                    {hasArticles
                      ? `${articleCount} article${articleCount > 1 ? 's' : ''}`
                      : 'Coming soon'}
                  </span>
                </CardContent>
              </Card>
            </CardWrapper>
          );
        })}
      </div>
    </section>
  );
}
