import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { 
  ArticleLayout, 
  ArticleHeader, 
  ArticleCallout, 
  ArticleCTA,
  ArticleJsonLd,
  HreflangTags,
  ArticleLanguageSwitcher,
  AvailableInLanguage,
  RelatedReading,
  ArticleFooter,
} from '@/components/articles';
import { getSpanishArticleBySlug, getTranslationSlug } from '@/data/articleData';

const ARTICLE_SLUG = 'guia-comprar-primera-vivienda-2026';
const EN_SLUG = 'first-time-home-buyer-guide-2026';

export default function ArticleGuiaComprarPrimeraVivienda2026() {
  const articleData = getSpanishArticleBySlug(ARTICLE_SLUG);

  if (!articleData) {
    return null;
  }

  const enPath = `/articles/${EN_SLUG}`;
  const esPath = `/es/articles/${ARTICLE_SLUG}`;

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
        enSlug={EN_SLUG}
        esSlug={ARTICLE_SLUG}
      />

      <ArticleJsonLd
        title={articleData.title}
        description={articleData.description}
        slug={articleData.slug}
        publishedDate={articleData.publishedDate}
        modifiedDate={articleData.modifiedDate}
        language="es"
      />

      <ArticleLayout>
        <div className="flex items-center justify-between mb-6">
          <Link 
            to="/es/articles" 
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Artículos
          </Link>
          <ArticleLanguageSwitcher
            currentLanguage="es"
            enPath={enPath}
            esPath={esPath}
          />
        </div>

        <AvailableInLanguage
          currentLanguage="es"
          translationPath={enPath}
        />

        <ArticleHeader 
          title={articleData.title}
          lead="Comprar tu primera vivienda puede resultar abrumador, pero 2026 ofrece oportunidades para los compradores bien preparados. Se espera que los tipos hipotecarios se estabilicen en torno al 6 %, y algunos analistas creen que se mantendrán cerca del 6,25 % durante la mayor parte del año. En España, el tipo hipotecario medio rondaba el 3,17 % en octubre de 2025, y los compradores suelen tener que aportar entre el 10 y el 15 % del precio de compra para cubrir impuestos, notaría y registro. Tanto si buscas en Madrid como en Miami, los fundamentos son los mismos: conoce tu presupuesto, fortalece tu historial crediticio, ahorra una entrada sólida y sigue un proceso disciplinado. Esta guía resume cada paso, resalta los costes ocultos y las ayudas disponibles y ofrece consejos actualizados para que los compradores primerizos tengan éxito en 2026."
          modifiedDate={articleData.modifiedDate}
          wordCount={articleData.wordCount}
        />

        {/* Article Content */}
        <div className="article-body">
          
          <h2>Por qué 2026 es especial para los compradores primerizos</h2>
          
          <h3>Tipos estables, pero aún elevados</h3>
          <p>
            Los expertos prevén que los tipos hipotecarios se mantengan en torno al 6 % a principios de 2026 y en torno al 6,25 % durante buena parte del año. Esto significa que los compradores deben prever cuotas mensuales más altas que a principios de la década de 2020, aunque inferiores a los picos superiores al 7 % de 2025. En España, las hipotecas están referenciadas al Euríbor; la tasa media fue del 3,17 % en octubre de 2025. La mayoría de las entidades financian entre el 70 y el 80 % del valor de la vivienda, por lo que el resto se debe aportar como entrada.
          </p>

          <ArticleCallout>
            <p><strong>Tipos hipotecarios 2026:</strong> EE.UU.: en torno al 6 %, cerca del 6,25 % | España: 3,17 % de media (octubre 2025)</p>
          </ArticleCallout>

          <h3>Ventajas estacionales</h3>
          <p>
            Los expertos inmobiliarios señalan que el primer trimestre suele ofrecer precios más bajos y menos competencia que las ajetreadas temporadas de primavera y verano. Los compradores que inician la búsqueda a principios de año deben probar distintos escenarios de tipos y fijar límites claros de presupuesto porque los precios suelen subir a medida que se acerca la primavera. Quienes se preparan con antelación estarán listos para actuar rápidamente cuando aparezca una vivienda atractiva en el mercado.
          </p>

          <h3>Más oferta y programas de ayuda</h3>
          <p>
            Los analistas creen que en 2026 saldrán al mercado más viviendas, lo que inclinará ligeramente las condiciones a favor de los compradores. En España, los programas públicos siguen apoyando a los jóvenes mediante subvenciones y avales parciales; los planes nacionales reducen las barreras de entrada, por lo que mantenerse al día de las ayudas regionales puede disminuir la aportación inicial necesaria. En Estados Unidos, los compradores primerizos pueden optar a préstamos de la FHA, VA o USDA, que requieren aportaciones iniciales más bajas.
          </p>

          <h2>Paso 1 – Evalúa tus finanzas y fija un presupuesto</h2>

          <h3>Calcula cuánto puedes pagar</h3>
          <p>
            Los organismos supervisores recomiendan que el total de las deudas mensuales, incluida la hipoteca, no supere aproximadamente el 40 % de tus ingresos netos. Muchas entidades recomiendan que la cuota hipotecaria se sitúe en torno a un tercio de los ingresos mensuales. Calcula los ingresos de tu hogar y tu endeudamiento actual y utiliza un simulador hipotecario para estimar las cuotas bajo distintos escenarios de tipos.
          </p>

          <ArticleCallout>
            <p><strong>Regla del 40 %:</strong> Las deudas mensuales no deben superar el 40 % de los ingresos netos; la cuota hipotecaria, en torno a un tercio.</p>
          </ArticleCallout>

          <h3>Ahorra para la entrada y los costes finales</h3>
          <p>
            La compra de una vivienda suele requerir mucho más efectivo que el precio anunciado. En España, los compradores necesitan aproximadamente un 20 % del precio como entrada y entre un 10 y un 15 % adicional para impuestos y tasas, como el Impuesto de Transmisiones Patrimoniales (ITP), el Impuesto sobre el Valor Añadido (IVA), el Impuesto sobre Actos Jurídicos Documentados (IAJD), la notaría y el registro. Por lo general, los bancos financian hasta el 80 % del valor de tasación o de compraventa; algunas hipotecas jóvenes permiten financiar hasta el 90 % y ofrecen plazos de hasta 40 años. Los no residentes suelen necesitar aportaciones superiores.
          </p>
          <p>
            En Estados Unidos, muchos programas para compradores primerizos permiten aportaciones iniciales tan bajas como el 3,5 % (FHA), el 0 % (VA) o el 0 % (USDA en zonas rurales). Aun así, conviene ahorrar para los costes de cierre, que pueden oscilar entre el 2 y el 5 % del importe del préstamo, y reservar dinero para la mudanza, las inspecciones y un fondo de emergencia.
          </p>

          <h3>Refuerza tu crédito y consigue la preaprobación</h3>
          <p>
            Los prestamistas examinan detenidamente tu puntuación crediticia, tus niveles de endeudamiento y tu historial laboral. Los profesionales hipotecarios recomiendan revisar el informe de crédito, amortizar saldos rotativos y corregir posibles errores para optar a los mejores tipos. Reúne al menos 30 días de nóminas y dos meses de extractos bancarios y solicita una preaprobación, no sólo una precalificación. Una carta de preaprobación completa fortalece tu oferta y te ayuda a actuar con rapidez cuando encuentres la vivienda adecuada.
          </p>

          <h2>Paso 2 – Investiga el mercado y define tus prioridades</h2>
          <p>
            Antes de comenzar la búsqueda de vivienda, elabora una lista clara de deseos. Piensa en la ubicación, el tipo de inmueble, el número de dormitorios y baños, la proximidad al trabajo o a los colegios, y características como el espacio exterior o la eficiencia energética. En España, los expertos recomiendan definir tu presupuesto, el tipo de vivienda y los barrios deseados y tener en cuenta los impuestos y tasas al calcular la accesibilidad. Un piso en el centro de Madrid puede costar mucho más que una vivienda de tamaño similar en un pueblo de las afueras. Investiga los precios de venta recientes y las tendencias del mercado en tu zona objetivo y analiza la velocidad de venta de los inmuebles.
          </p>
          <p>
            El primer trimestre del año puede ofrecer ventajas: los precios suelen ser un poco más bajos antes de la primavera y puede haber menos competencia, aunque los compradores tempranos pueden encontrarse con una selección más limitada. Configura alertas para los nuevos listados y colabora con un agente experto para detectar oportunidades con rapidez.
          </p>

          <h2>Paso 3 – Inicia tu búsqueda y realiza las comprobaciones pertinentes</h2>

          <h3>Visita viviendas y haz preguntas</h3>
          <p>
            Comienza a visitar inmuebles dentro de tu presupuesto. Lleva una lista de verificación para evaluar la distribución, posibles problemas estructurales, almacenamiento, orientación, ruido y luz natural. Pregunta por las cuotas comunitarias, los impuestos municipales, las normas de la comunidad de propietarios, las derramas previstas y la calificación energética. Las guías inmobiliarias recomiendan contar con un agente de confianza, programar varias visitas e inspeccionar la vivienda a fondo. En España, los compradores deben verificar que la vivienda esté libre de cargas, que la titularidad del vendedor sea válida y que no haya deudas con la comunidad.
          </p>

          <h3>Haz una oferta y negocia</h3>
          <p>
            Basa tu oferta en los precios de venta comparables y en tu presupuesto. No dudes en negociar el precio, las contingencias o las reparaciones. En España, una vez que se llega a un acuerdo, normalmente se firma un contrato de arras y se paga alrededor del 10 % del precio como reserva. Si te retiras por motivos no contemplados en el contrato, puedes perder esta señal; si el vendedor se retira, suele devolverte el doble.
          </p>

          <ArticleCallout>
            <p><strong>Contrato de arras:</strong> Firma el contrato de arras con un 10 % de señal. Si te retiras, pierdes la señal; si el vendedor se retira, te devuelve el doble.</p>
          </ArticleCallout>

          <h2>Paso 4 – Obtén financiación y formaliza la hipoteca</h2>
          <p>
            Una vez aceptada tu oferta, necesitas la aprobación formal de la hipoteca y una tasación de la vivienda. Reúne tu identificación, nóminas, declaraciones fiscales y extractos bancarios. La tasación confirma el valor de la propiedad; si es inferior al precio de venta, quizá debas renegociar o aumentar tu entrada.
          </p>

          <h3>Elige el tipo de hipoteca adecuado</h3>
          <p>
            Las hipotecas españolas suelen ser de tipo variable (vinculadas al Euríbor), tipo fijo o mixto. Una hipoteca variable suele comenzar con cuotas más bajas, pero puede aumentar si suben los tipos, mientras que una hipoteca fija ofrece certeza pero puede resultar más cara cuando los tipos son bajos. Las hipotecas mixtas fijan el tipo durante los primeros años y luego se convierten en variables. La mayoría de los bancos exigen que las deudas mensuales, incluida la nueva hipoteca, no superen el 40 % de los ingresos netos. Los residentes pueden conseguir plazos de hasta 40 años, mientras que los no residentes suelen obtener 15–20 años.
          </p>
          <p>
            En Estados Unidos, puedes elegir entre préstamos convencionales de 30 años, préstamos a 15 años con tipos más bajos, hipotecas de tipo variable o préstamos respaldados por el gobierno como FHA, VA o USDA. Compara los tipos de interés, los plazos, los puntos y los costes de cierre. Considera si te conviene pagar puntos para reducir el tipo y si se requiere un seguro hipotecario.
          </p>

          <h3>Cuidado con los costes ocultos</h3>
          <p>
            Además del precio de compra, deberás pagar impuestos (ITP o IVA e IAJD en España), honorarios de notaría y registro, gastos de tasación y posiblemente la comisión del agente. Estos gastos suelen añadir entre un 10 y un 15 % al precio de compra. Los expertos también recomiendan reservar dinero para reparaciones, gastos de mudanza y seguros, ya que las primas han subido en muchas regiones.
          </p>

          <ArticleCallout>
            <p><strong>Costes ocultos:</strong> Presupuesta entre un 10 y un 15 % del precio de compra además de la entrada para impuestos, notaría y registro.</p>
          </ArticleCallout>

          <h2>Paso 5 – Cierre: firma y registra la vivienda</h2>
          <p>
            El paso final consiste en firmar la escritura pública ante notario y abonar el resto del precio de compra. Lee el contrato detenidamente o pide a un abogado que lo revise. Tras la firma, registra la escritura en el registro de la propiedad y paga los impuestos correspondientes. No prever los honorarios registrales o el impuesto de actos jurídicos documentados puede retrasar el proceso. Una vez registrado, recibirás las llaves y podrás celebrar que eres propietario.
          </p>

          <h2>Programas y ayudas para 2026</h2>
          <p>
            En España, los programas para jóvenes compradores siguen activos en 2026. Algunas comunidades ofrecen subvenciones directas o tipos de interés reducidos, mientras que los planes nacionales proporcionan avales públicos que reducen la entrada necesaria. Consulta con tu oficina de vivienda regional para conocer los requisitos y los plazos. Algunos bancos (como Bankinter y las cajas de ahorros) ofrecen productos de "hipoteca joven" que financian hasta el 90 % del precio y amplían los plazos hasta 40 años.
          </p>
          <p>
            En Estados Unidos, los compradores primerizos pueden optar a ayudas para la entrada a través de agencias estatales de vivienda, subvenciones locales y créditos fiscales. Los préstamos federales como FHA, VA y USDA requieren aportaciones iniciales más bajas y pueden permitir que el vendedor cubra parte de los costes de cierre. Algunas empresas y organizaciones comunitarias también ofrecen asistencia; explorar estas opciones puede reducir el dinero que necesitas de entrada.
          </p>

          <h2>Evita los errores habituales</h2>
          <p>
            Los profesionales inmobiliarios advierten que los compradores primerizos suelen:
          </p>
          <ul>
            <li><strong>No hacer presupuesto:</strong> No definir un presupuesto realista y olvidar incluir impuestos, tasas y gastos de mudanza puede frustrar la compra.</li>
            <li><strong>Descuidar las inspecciones y la debida diligencia:</strong> Comprar sin inspeccionar a fondo la vivienda o sin revisar la documentación puede acarrear sorpresas costosas.</li>
            <li><strong>No negociar:</strong> Muchos compradores aceptan el precio de salida o las condiciones del banco sin negociar. No dudes en pedir reparaciones, ajustes de precio o mejores condiciones hipotecarias.</li>
            <li><strong>Prescindir de asesoramiento profesional:</strong> Evitar un abogado o un intermediario hipotecario puede ahorrar dinero al principio, pero causar errores. Los profesionales saben detectar problemas y garantizar que la documentación sea correcta.</li>
            <li><strong>Ignorar los detalles del contrato:</strong> Lee siempre la letra pequeña. Comprender tus obligaciones y penalizaciones en el contrato de arras y en el de la hipoteca ayuda a evitar la pérdida de la señal o gastos inesperados.</li>
          </ul>

          <h2>Conclusión</h2>
          <p>
            Comprar tu primera vivienda en 2026 es posible con una buena preparación. Empieza pronto, evalúa tus finanzas con honestidad, refuerza tu historial crediticio y ahorra tanto para la entrada como para los costes de cierre. Investiga los barrios, define tus prioridades y trabaja con profesionales de confianza que te acompañen durante el proceso. Los tipos hipotecarios estables en torno al 6–6,25 %, junto con el aumento de la oferta y los programas vigentes, convierten este año en un momento prometedor para dar el paso hacia la propiedad.
          </p>
        </div>

        <RelatedReading 
          currentSlug={ARTICLE_SLUG} 
          language="es"
          basePath="/es/articles"
        />

        <ArticleCTA 
          ctaText="Simula tu escenario en nuestra calculadora de alquiler vs compra"
          ctaLink="/simulate"
        />

        <ArticleFooter />
      </ArticleLayout>
    </>
  );
}
