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
  HreflangTags,
  RelatedReading,
  ArticleLanguageSwitcher,
  AvailableInLanguage,
} from '@/components/articles';
import { getSpanishArticleBySlug, getTranslationSlug } from '@/data/articleData';

const ARTICLE_SLUG = 'alquilar-o-comprar-2026-guia-basada-en-datos';

export default function ArticleAlquilarOComprar2026() {
  const articleData = getSpanishArticleBySlug(ARTICLE_SLUG);

  if (!articleData) {
    return null;
  }

  const enSlug = getTranslationSlug(ARTICLE_SLUG, 'es');
  const enPath = enSlug ? `/articles/${enSlug}` : undefined;

  return (
    <>
      <Helmet>
        <html lang="es" />
        <title>{articleData.title} | HomeDecision</title>
        <meta name="description" content={articleData.description} />
        <meta name="robots" content="index,follow" />
        
        <meta property="og:title" content={`${articleData.title} | HomeDecision`} />
        <meta property="og:description" content={articleData.description} />
        <meta property="og:url" content={`https://homedecision.app/es/articles/${ARTICLE_SLUG}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${articleData.title} | HomeDecision`} />
        <meta name="twitter:description" content={articleData.description} />
        <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
      </Helmet>

      <HreflangTags
        type="article"
        language="es"
        enSlug={enSlug}
        esSlug={ARTICLE_SLUG}
      />

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
          {/* Back Link + Language Switcher */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/es/articles"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a Artículos
            </Link>
            <ArticleLanguageSwitcher
              currentLanguage="es"
              enPath={enPath}
              esPath={`/es/articles/${ARTICLE_SLUG}`}
            />
          </div>

          <ArticleHeader
            title={articleData.title}
            lead="En 2026 el mercado de la vivienda se presenta muy distinto al frenético periodo impulsado por la pandemia que lo precedió. Los tipos hipotecarios han bajado respecto a los máximos de 2023–24, pero siguen estando muy por encima de los niveles ultrabajos que muchos compradores recuerdan. Los alquileres continúan aumentando, impulsados por la escasez de viviendas disponibles y la expiración de contratos de alquiler firmados durante la pandemia. Con la previsión de que tanto los precios de venta como los alquileres marquen nuevos récords, decidir si alquilar o comprar exige analizar cuidadosamente los datos actuales en lugar de fiarse de la intuición. Esta guía sintetiza investigaciones de analistas del mercado, especialistas hipotecarios y expertos en política de vivienda para ayudarte a tomar una decisión neutral y basada en números, y después te orienta para usar el simulador de HomeDecision de alquiler frente a compra para que introduzcas tus propios datos."
            modifiedDate={articleData.modifiedDate}
            wordCount={articleData.wordCount}
            language="es"
          />

          <AvailableInLanguage
            currentLanguage="es"
            translationPath={enPath}
          />

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <h2>Por qué 2026 es un momento único</h2>
            <p>
              <strong>Los precios seguirán subiendo, pero más despacio.</strong> Los analistas coinciden en que los precios de la vivienda en España seguirán subiendo en 2026, aunque las subidas serán menores que el repunte de dos dígitos de 2025. BBVA Research prevé un incremento del 5,3 %, mientras que CaixaBank Research calcula un crecimiento de alrededor del 6,3 %. La escasez de vivienda asequible es estructural: España construye sólo unas 100 000 viviendas nuevas al año, muy por debajo de la demanda, lo que mantiene tensos tanto el mercado de compraventa como el de alquiler.
            </p>
            <p>
              <strong>La presión sobre los alquileres se intensifica.</strong> Alrededor de 600 000 contratos de alquiler firmados durante la pandemia caducarán en 2026. Según el portal Pisos.com, el crecimiento de los alquileres rondará el 6 % porque la oferta sigue siendo insuficiente. Las estimaciones gubernamentales indican que muchos propietarios renegociarán los contratos a precios más altos, y el índice de actualización de rentas del INE se espera que se mantenga por debajo de la inflación, aunque podría seguir empujando los alquileres al alza. La alta competencia significa que a veces más de 50 candidatos optan a cada anuncio.
            </p>

            <ArticleSection>
              <h2>Los tipos hipotecarios se estabilizan pero no volverán a mínimos</h2>
              <p>
                En España, el Euríbor a 12 meses—referencia de muchas hipotecas variables—cayó hasta alrededor del 2,08 % a mediados de 2025 y se prevé que se sitúe en torno al 2 % en 2026. Unos tipos más bajos incrementan el poder adquisitivo, aunque la mayoría de los analistas espera estabilidad y no desplomes. El crecimiento de la concesión de hipotecas será modesto (en torno al 0,4 % en 2026), y los préstamos a tipo fijo o mixto siguen siendo populares por la certeza que aportan.
              </p>
            </ArticleSection>

            <ArticleCallout>
              <strong>Referencia clave:</strong> Euríbor al 2,08 % a mediados de 2025, proyectado ~2 % para 2026. Hipotecas variables típicamente al 3–4 %, tipos fijos al 3–3,5 %.
            </ArticleCallout>

            <ArticleSection>
              <h2>Hipoteca frente a alquiler: costes mensuales en 2026</h2>
              <p>
                Comparar pagos mensuales es un buen punto de partida, pero la historia no es tan simple como «la hipoteca es más barata que el alquiler».
              </p>

              <h3>Los alquileres medios siguen subiendo</h3>
              <ul>
                <li><strong>Estudios:</strong> A principios de 2026, los estudios en España se alquilan por alrededor de 550 € al mes de media, con un rango de 400 € en ciudades pequeñas hasta 800 € en barrios prime de Madrid o Barcelona.</li>
                <li><strong>Apartamentos de una habitación:</strong> A nivel nacional, espera pagar aproximadamente 720 € al mes, con precios que van desde 500 € en zonas periféricas hasta 1 100 € en distritos de alta demanda.</li>
                <li><strong>Viviendas de dos dormitorios:</strong> La media es de 1 020 € al mes, pero puede superar 1 600 € en los núcleos urbanos más caros.</li>
                <li><strong>Precio por metro cuadrado:</strong> Los anuncios muestran una media nacional de 14,40 € por metro cuadrado, y los alquileres de contratos nuevos aumentan alrededor del 10 % anual.</li>
              </ul>

              <h3>Los pagos hipotecarios dependen del tipo y la entrada</h3>
              <p>
                La previsión de que el Euríbor baje hacia el 2 % debería mantener las hipotecas variables en torno al 3–4 %, según el margen que aplique cada banco. Los préstamos fijos y mixtos siguen siendo los más populares porque ofrecen certeza en las cuotas.
              </p>
              <p>
                Los asesores hipotecarios recomiendan destinar menos del 30 % de los ingresos del hogar al pago de la vivienda. Los compradores con deudas variables elevadas o ingresos irregulares pueden encontrar condiciones de aprobación más estrictas.
              </p>
            </ArticleSection>

            <ArticleCallout>
              <strong>Ejemplo:</strong> Una vivienda de 250 000 € financiada al 80 % con un tipo fijo del 3,5 % a 25 años generaría una cuota mensual de unos 1 000 €, sin contar impuestos y seguros. En algunos barrios de Madrid, ese pago es comparable o incluso inferior al alquiler de una vivienda similar.
            </ArticleCallout>

            <ArticleSection>
              <h2>Costes ocultos: más allá del pago mensual</h2>

              <h3>Costes de comprar</h3>
              <p>
                En España, los costes de adquisición suelen añadir alrededor de un 15 % al precio de la vivienda en concepto de impuestos y tasas. Estos costes incluyen:
              </p>
              <ul>
                <li><strong>Impuesto de Transmisiones o IVA:</strong> Varía según la comunidad y si la vivienda es nueva o de segunda mano.</li>
                <li><strong>Gastos de notaría y registro:</strong> Obligatorios para formalizar la escritura.</li>
                <li><strong>Tasas de tasación y del banco:</strong> El banco exige una tasación y puede cobrar comisiones de apertura.</li>
                <li><strong>Seguro del hogar:</strong> A menudo exigido por los bancos y esencial para proteger la inversión.</li>
              </ul>

              <h3>Costes de alquilar</h3>
              <p>
                Los inquilinos suelen pagar una fianza (de uno a dos meses de renta), además de honorarios de agencia y gastos de mudanza. Pueden enfrentarse a subidas periódicas del alquiler (vinculadas al índice del INE) y deben presupuestar para suministros y seguro del inquilino. En ciudades de alta demanda como Madrid y Barcelona la tasa de vacantes efectivas es del 2–3 %, por lo que la competencia puede obligar a ofrecer fianzas más altas o aceptar criterios de selección más estrictos.
              </p>
            </ArticleSection>

            <ArticleSection>
              <h2>El coste de esperar: ¿cuándo entrar en el mercado?</h2>
              <p>
                Con la previsión de que tanto los alquileres como los precios de venta sigan subiendo, esperar un año más puede resultar caro. Las principales instituciones pronostican un crecimiento de los precios de la vivienda en España de entre el 5 % y el 6 % en 2026. A ese ritmo, una vivienda de 300 000 € hoy podría costar entre 315 000 € y 318 000 € el año que viene.
              </p>
              <p>
                Un incremento del alquiler en torno al 6 % significa que los inquilinos también podrían pagar más al renovar. Aunque se prevé que el Euríbor baje, las reducciones de tipo podrían compensar sólo marginalmente la subida de los precios. Dado que la falta de vivienda es estructural y la construcción de nuevas unidades es limitada, es poco probable que se produzcan bajadas de precios sin un shock económico importante. Comprar antes puede permitir fijar un precio más bajo y protegerse de futuras subidas de alquiler.
              </p>
            </ArticleSection>

            <ArticleCallout>
              Tratar de predecir el mercado rara vez funciona. Lo que importa es si la compra encaja en tu presupuesto y planes de vida, no si los precios podrían bajar un 2 % el próximo trimestre.
            </ArticleCallout>

            <ArticleSection>
              <h2>Construir patrimonio frente a pagar alquiler</h2>
              <p>
                La principal ventaja financiera de la propiedad es la acumulación de patrimonio. Cada pago de hipoteca incrementa tu participación en la vivienda, mientras que los pagos de alquiler no generan patrimonio. En 2024, el propietario medio en EE. UU. ganó unos 23 500 $ en plusvalía, y el patrimonio neto medio de los propietarios es muy superior al de los inquilinos. Aunque estas cifras proceden de EE. UU., el principio es universal: el aumento del valor de la vivienda puede incrementar significativamente el patrimonio con el tiempo.
              </p>
              <p>
                La vivienda también ofrece una protección frente a la inflación y puede aprovecharse mediante refinanciación o venta.
              </p>
            </ArticleSection>

            <ArticleSection>
              <h2>Consideraciones de estilo de vida y flexibilidad</h2>
              <p>No todo es dinero. Ten en cuenta:</p>
              <ul>
                <li><strong>Estabilidad frente a flexibilidad:</strong> Comprar ofrece estabilidad a largo plazo y la libertad de reformar o personalizar tu vivienda, pero te ata a un lugar durante años. Alquilar permite mudarse con facilidad, algo importante si tu empleo o situación familiar puede cambiar.</li>
                <li><strong>Responsabilidades de mantenimiento:</strong> Los propietarios deben reservar tiempo y dinero para reparaciones y mantenimiento; estos costes suelen correr a cargo del arrendador cuando se alquila. Los inquilinos suelen poder recurrir a su casero para las reparaciones.</li>
                <li><strong>Factores emocionales:</strong> Muchos propietarios mencionan el orgullo de ser dueños, el sentimiento de comunidad y la posibilidad de personalizar su vivienda como beneficios no financieros.</li>
              </ul>
            </ArticleSection>

            <ArticleSection>
              <h2>Consideraciones locales para Madrid y España</h2>

              <h3>El mercado de Madrid</h3>
              <p>
                Madrid sigue registrando un fuerte aumento de precios. Idealista informa de que a finales de 2025 los precios de la vivienda en Madrid y Valencia crecían más de un 15 % interanual. Los analistas esperan que estas subidas de doble dígito se moderen, aunque sigan por encima de la media nacional. La alta demanda y la oferta limitada mantienen caros los barrios céntricos, pero las zonas periféricas pueden ofrecer entradas más asequibles con rendimientos superiores al 7 %.
              </p>

              <h3>Otras regiones y rentabilidades</h3>
              <p>
                La investigación de Investropa de enero de 2026 indica que la rentabilidad bruta media del alquiler en España es de alrededor del 6,3 %, con barrios obreros que ofrecen retornos mayores. Murcia encabeza las grandes ciudades con rentabilidades cercanas al 7,4 %, mientras que las de Valencia suelen superar el 6 %, y los barrios periféricos de Madrid pueden sobrepasar el 7 %. Los distritos prime de Madrid y Barcelona ofrecen rentabilidades más bajas (3–4 %) porque los precios son elevados. Estas cifras ayudan a los inversores a evaluar los posibles retornos frente a los costes hipotecarios y la rentabilidad de oportunidades alternativas.
              </p>
            </ArticleSection>

            <ArticleSection>
              <h2>Cómo usar el simulador de alquiler frente a compra de HomeDecision</h2>
              <p>
                HomeDecision.app se diseñó para sustituir la especulación por matemáticas. El simulador te permite introducir el precio de la vivienda, entrada, alquiler, tipo de interés, impuesto sobre bienes inmuebles, mantenimiento, horizonte temporal y otras variables para proyectar el coste a largo plazo de alquilar frente a comprar. Una vez introduces tus datos y supuestos, la herramienta calcula el coste neto presente de cada escenario, ajustando por la acumulación de capital, el coste de oportunidad y el crecimiento del alquiler. Para obtener resultados más precisos:
              </p>
              <ol>
                <li><strong>Reúne datos locales:</strong> Consulta precios actuales de viviendas en el barrio deseado y comprueba los alquileres recientes de propiedades similares.</li>
                <li><strong>Estima incrementos realistas del alquiler:</strong> Una suposición conservadora en 2026 podría ser un aumento de 4–6 %, pero ajusta según tu mercado local.</li>
                <li><strong>Introduce tus condiciones de financiación:</strong> Si planeas hipotecarte, elige un tipo realista (por ejemplo, un 3–4 % fijo o variable) y fija un plazo acorde a tu plan.</li>
                <li><strong>Define un horizonte temporal:</strong> Comprar tiene más sentido cuanto más tiempo vayas a quedarte; si planeas mudarte en pocos años, puede que alquilar siga siendo más barato.</li>
                <li><strong>Compara escenarios:</strong> Ejecuta varias simulaciones—varía el alquiler, el tipo de interés, el horizonte temporal y el crecimiento esperado del precio de la vivienda para ver qué variables son más determinantes. La herramienta ofrece un gráfico claro que muestra cuándo se produce el punto de equilibrio.</li>
              </ol>
            </ArticleSection>

            <ArticleSection>
              <h2>Conclusión</h2>
              <p>
                Decidir si alquilar o comprar en 2026 depende de equilibrar la asequibilidad, las tendencias del mercado y las circunstancias personales. Las previsiones apuntan a que los precios de venta y alquiler en España seguirán subiendo, aunque a un ritmo menor que en 2025, y los tipos de interés deberían estabilizarse con el Euríbor aproximándose al 2 %. Comprar permite acumular patrimonio y protegerse contra la inflación, pero requiere un desembolso inicial y compromiso a largo plazo.
              </p>
              <p>
                Alquilar ofrece flexibilidad, pero te expone a subidas continuas del alquiler y no genera activos. Combinando los datos más recientes del mercado con la calculadora de HomeDecision podrás tomar una decisión informada y basada en datos que se ajuste a tu economía y estilo de vida.
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
            ctaText="Simula tu escenario de alquiler vs compra para 2026"
            ctaLink="/simulate"
            backText="Volver a Artículos"
            backLink="/es/articles"
          />

          {/* Footer */}
          <footer className="mt-12 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              ¿Has detectado un error o tienes sugerencias? Escríbenos a contact@homedecision.app
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
