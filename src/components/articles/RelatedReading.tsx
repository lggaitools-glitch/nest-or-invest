import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPublishedArticles, getPublishedSpanishArticles, calculateReadingTime } from '@/data/articleData';
import { getRelatedFutureArticles, getRelatedSpanishFutureArticles } from '@/data/futureArticles';

interface RelatedReadingProps {
  currentSlug: string;
  language?: 'en' | 'es';
  basePath?: string;
}

const translations = {
  en: {
    title: 'Related reading',
    readArticle: 'Read article',
    comingSoon: 'Coming soon',
    simulatorTitle: 'Run your numbers in the simulator',
    simulatorCta: 'Try it now',
  },
  es: {
    title: 'Lecturas relacionadas',
    readArticle: 'Leer artículo',
    comingSoon: 'Próximamente',
    simulatorTitle: 'Calcula tus números en el simulador',
    simulatorCta: 'Probar ahora',
  },
};

export function RelatedReading({ currentSlug, language = 'en', basePath = '/articles' }: RelatedReadingProps) {
  const t = translations[language];
  
  const publishedArticles = language === 'es' 
    ? getPublishedSpanishArticles().filter((article) => article.slug !== currentSlug)
    : getPublishedArticles().filter((article) => article.slug !== currentSlug);
  
  const futureArticles = language === 'es'
    ? getRelatedSpanishFutureArticles(currentSlug, 3 - publishedArticles.length)
    : getRelatedFutureArticles(currentSlug, 3 - publishedArticles.length);

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="text-xl font-bold text-foreground font-display mb-6">{t.title}</h2>

      <div className="space-y-4">
        {/* Published articles */}
        {publishedArticles.map((article) => (
          <Link
            key={article.slug}
            to={`${basePath}/${article.slug}`}
            className="block group"
          >
            <Card className="transition-all duration-200 hover:shadow-md hover:border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {calculateReadingTime(article.wordCount)} min {language === 'es' ? 'de lectura' : 'read'}
                </span>
                <span className="inline-flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                  {t.readArticle}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}

        {/* Future articles (Coming soon) */}
        {futureArticles.map((article) => (
          <Card key={article.slug} className="opacity-60">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-muted-foreground">
                {article.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <span className="text-sm text-muted-foreground italic">{t.comingSoon}</span>
            </CardContent>
          </Card>
        ))}

        {/* Always show simulator link */}
        <Link
          to="/simulate"
          className="block group mt-6"
        >
          <Card className="bg-primary/5 border-primary/20 transition-all duration-200 hover:shadow-md hover:bg-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-primary group-hover:text-primary/80 transition-colors">
                {t.simulatorTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                {t.simulatorCta}
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </CardContent>
          </Card>
        </Link>
      </div>
    </section>
  );
}
