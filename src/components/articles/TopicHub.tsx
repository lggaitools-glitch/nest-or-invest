import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { topicCategories, topicCategoriesEs, getCategoryArticleCount, getSpanishCategoryArticleCount } from '@/data/topicCategories';
import { getPublishedArticles, getPublishedSpanishArticles } from '@/data/articleData';

interface TopicHubProps {
  language?: 'en' | 'es';
  basePath?: string;
}

const translations = {
  en: {
    title: 'Explore topics',
    article: 'article',
    articles: 'articles',
    comingSoon: 'Coming soon',
  },
  es: {
    title: 'Explorar temas',
    article: 'artículo',
    articles: 'artículos',
    comingSoon: 'Próximamente',
  },
};

export function TopicHub({ language = 'en', basePath = '/articles' }: TopicHubProps) {
  const t = translations[language];
  const categories = language === 'es' ? topicCategoriesEs : topicCategories;
  const publishedSlugs = language === 'es' 
    ? getPublishedSpanishArticles().map((article) => article.slug)
    : getPublishedArticles().map((article) => article.slug);
  
  const getArticleCount = language === 'es' ? getSpanishCategoryArticleCount : getCategoryArticleCount;

  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-foreground font-display mb-6">{t.title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const articleCount = getArticleCount(category.id, publishedSlugs);
          const hasArticles = articleCount > 0;

          // Find first published article in category for linking
          const firstArticleSlug = category.articleSlugs.find((slug) =>
            publishedSlugs.includes(slug)
          );

          const CardWrapper = hasArticles && firstArticleSlug
            ? ({ children }: { children: React.ReactNode }) => (
                <Link to={`${basePath}/${firstArticleSlug}`} className="block group">
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
                      ? `${articleCount} ${articleCount > 1 ? t.articles : t.article}`
                      : t.comingSoon}
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
