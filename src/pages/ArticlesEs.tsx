import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SiteNavigation } from '@/components/SiteNavigation';
import { TopicHub, ArticleLanguageSwitcher } from '@/components/articles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Clock } from 'lucide-react';
import { getPublishedSpanishArticles, calculateReadingTime } from '@/data/articleData';

export default function ArticlesEs() {
  const articles = getPublishedSpanishArticles();

  return (
    <>
      <Helmet>
        <html lang="es" />
        <title>Guías de Alquiler vs Compra y Estrategias de Patrimonio | HomeDecision</title>
        <meta
          name="description"
          content="Artículos detallados analizando decisiones de alquiler vs compra, vivienda vs inversión, y estrategias de patrimonio a largo plazo."
        />
        <link rel="canonical" href="https://homedecision.app/es/articles" />
        <meta name="robots" content="index,follow" />
        <link rel="alternate" hrefLang="en" href="https://homedecision.app/articles" />
        <link rel="alternate" hrefLang="es" href="https://homedecision.app/es/articles" />
        <link rel="alternate" hrefLang="x-default" href="https://homedecision.app/articles" />
        
        <meta property="og:title" content="Guías de Alquiler vs Compra y Estrategias de Patrimonio | HomeDecision" />
        <meta property="og:description" content="Artículos detallados analizando decisiones de alquiler vs compra, vivienda vs inversión, y estrategias de patrimonio a largo plazo." />
        <meta property="og:url" content="https://homedecision.app/es/articles" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Guías de Alquiler vs Compra y Estrategias de Patrimonio | HomeDecision" />
        <meta name="twitter:description" content="Artículos detallados analizando decisiones de alquiler vs compra, vivienda vs inversión, y estrategias de patrimonio a largo plazo." />
        <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <SiteNavigation />

        <main className="container max-w-4xl mx-auto px-4 py-12 md:py-16">
          {/* Page Header */}
          <header className="mb-12">
            <div className="flex items-start justify-between gap-4 mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground font-display">
                Artículos
              </h1>
              <ArticleLanguageSwitcher
                currentLanguage="es"
                enPath="/articles"
                esPath="/es/articles"
              />
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              En HomeDecision publicamos artículos basados en datos para ayudar a tomar mejores
              decisiones a largo plazo sobre alquiler, compra de vivienda e inversión. Nuestro
              objetivo no es decirte qué hacer, sino ayudarte a entender los verdaderos compromisos
              detrás de cada decisión.
            </p>
          </header>

          {/* Topic Hub */}
          <TopicHub language="es" basePath="/es/articles" />

          {/* Articles List */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-foreground font-display mb-4">Últimos artículos</h2>
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={`/es/articles/${article.slug}`}
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
                      {calculateReadingTime(article.wordCount)} min de lectura
                    </span>
                    <span className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                      Leer artículo
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
            <p>© {new Date().getFullYear()} HomeDecision. Solo con fines educativos.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
