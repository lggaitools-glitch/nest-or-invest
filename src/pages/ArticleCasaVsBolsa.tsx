import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SiteNavigation } from '@/components/SiteNavigation';
import {
  ArticleHeader,
  ArticleSection,
  ArticleCallout,
  ArticleCTA,
  ArticleJsonLd,
  RelatedReading,
} from '@/components/articles';
import { getSpanishArticleBySlug } from '@/data/articleData';

const ARTICLE_SLUG = 'casa-vs-bolsa-lo-que-dicen-los-datos';

export default function ArticleCasaVsBolsa() {
  const articleData = getSpanishArticleBySlug(ARTICLE_SLUG);

  if (!articleData) {
    return null;
  }

  return (
    <>
      <Helmet>
        <html lang="es" />
        <title>{articleData.title} | HomeDecision</title>
        <meta name="description" content={articleData.description} />
      </Helmet>

      <ArticleJsonLd
        title={articleData.title}
        description={articleData.description}
        slug={ARTICLE_SLUG}
        publishedDate={articleData.publishedDate}
        modifiedDate={articleData.modifiedDate}
        language="es"
      />

      <div className="min-h-screen bg-background">
        <SiteNavigation />

        <article className="container max-w-3xl mx-auto px-4 py-12 md:py-16">
          {/* Back Link */}
          <Link
            to="/es/articles"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Artículos
          </Link>

          <ArticleHeader
            title={articleData.title}
            lead={
              <>
                La pregunta de si es mejor comprar una vivienda o invertir en bolsa suele presentarse
                como un simple cálculo matemático. Calculadoras online comparan rentabilidades medias
                y costes hipotecarios y ofrecen una respuesta rápida.
                <br /><br />
                Pero las decisiones de vivienda no se toman en una hoja de Excel. Las toman personas,
                con hábitos, emociones y limitaciones reales. Y los resultados a largo plazo dependen
                tanto del comportamiento como de la rentabilidad teórica.
                <br /><br />
                Este artículo explora qué muestran realmente los datos y los patrones del mundo real,
                y por qué la respuesta correcta depende menos de la teoría y más de cómo viven y
                ahorran las personas.
              </>
            }
            modifiedDate={articleData.modifiedDate}
            wordCount={articleData.wordCount}
            language="es"
          />

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <ArticleSection>
              <h2>Una perspectiva experta sobre la riqueza a largo plazo</h2>
              <p>
                Los planteamientos de este artículo están inspirados en décadas de investigación
                financiera y divulgación realizadas por David Bach, autor superventas del
                New York Times y asesor financiero durante más de 30 años.
              </p>
              <p>
                En una entrevista extensa en The Diary of a CEO, Bach subraya una idea clave:
                la mejor estrategia financiera es aquella que las personas siguen de forma constante.
                Los sistemas automáticos suelen funcionar mejor que los planes que dependen de una
                disciplina perfecta.
              </p>
            </ArticleSection>

            <ArticleSection>
              <h2>Los dos grandes motores de la riqueza familiar</h2>
              <p>
                Al analizar cómo se construye la riqueza a nivel poblacional, dos activos dominan
                claramente los balances familiares:
              </p>
              <ul>
                <li>Inversión a largo plazo en mercados financieros</li>
                <li>Patrimonio inmobiliario en vivienda habitual</li>
              </ul>
              <p>
                No se trata de conceptos opuestos. Históricamente, muchos hogares financieramente
                estables combinan ambos, empezando a menudo por la vivienda y ampliando después
                hacia activos financieros.
              </p>
            </ArticleSection>

            <ArticleSection>
              <h2>Por qué la vivienda suele funcionar en la práctica</h2>
              <p>
                Aunque la vivienda a veces se critica como una inversión de baja rentabilidad,
                los resultados reales muestran una imagen más matizada.
              </p>
              <ul>
                <li>Ahorro forzoso mediante cuotas hipotecarias</li>
                <li>Apalancamiento a través de la entrada inicial</li>
                <li>Protección frente a subidas del alquiler</li>
                <li>Acumulación de patrimonio a largo plazo</li>
                <li>Tratamiento fiscal favorable (según país)</li>
              </ul>
            </ArticleSection>

            <ArticleCallout>
              El gran mito: "alquilo e invierto la diferencia"
              <br /><br />
              En teoría, alquilar e invertir la diferencia puede funcionar. En la práctica,
              la mayoría de los hogares no lo hace de forma constante. El aumento de ingresos
              disponibles suele convertirse en mayor consumo, no en mayor ahorro.
            </ArticleCallout>

            <ArticleSection>
              <h2>Cuándo alquilar sí tiene sentido</h2>
              <p>
                Alquilar puede ser la opción adecuada en situaciones como:
              </p>
              <ul>
                <li>Horizontes temporales cortos</li>
                <li>Alta movilidad geográfica</li>
                <li>Mercados inaccesibles para la compra</li>
                <li>Etapas de transición profesional</li>
              </ul>
            </ArticleSection>

            <ArticleSection>
              <h2>Por qué el consejo genérico no funciona</h2>
              <p>
                Consejos universales ignoran variables clave como precios locales, tipos de interés,
                disciplina de ahorro y horizonte temporal. Pequeños cambios pueden alterar por
                completo el resultado.
              </p>
            </ArticleSection>

            <ArticleSection>
              <h2>El valor de la simulación personalizada</h2>
              <p>
                La pregunta correcta no es qué funciona de media, sino qué ocurre en una situación
                concreta con datos reales a lo largo del tiempo.
              </p>
              <p>
                HomeDecision existe para facilitar este análisis sin vender inmuebles ni
                productos financieros.
              </p>
            </ArticleSection>

            <ArticleSection>
              <h2>Transparencia e independencia</h2>
              <p>HomeDecision es una plataforma independiente:</p>
              <ul>
                <li>No vendemos inmuebles</li>
                <li>No cobramos comisiones de bancos ni agentes</li>
                <li>No promovemos decisiones concretas</li>
              </ul>
            </ArticleSection>

            <ArticleSection>
              <h2>Explora tu propio escenario</h2>
              <p>
                No existe una respuesta universal, pero sí un marco correcto de análisis.
              </p>
            </ArticleSection>
          </div>

          {/* Related Reading */}
          <RelatedReading
            currentSlug={ARTICLE_SLUG}
            language="es"
            basePath="/es/articles"
          />

          {/* CTA */}
          <ArticleCTA
            ctaText="Explora tu escenario de alquiler vs compra"
            ctaLink="/simulate"
            backText="Volver a Artículos"
            backLink="/es/articles"
          />

          {/* Footer */}
          <footer className="mt-12 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              ¿Tienes comentarios o detectaste un error? Escríbenos a contact@homedecision.app
            </p>
          </footer>
        </article>

        {/* Page Footer */}
        <footer className="border-t border-border py-8 mt-12">
          <div className="container max-w-3xl mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} HomeDecision. Solo con fines educativos.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
