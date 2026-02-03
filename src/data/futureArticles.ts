// Content roadmap - planned articles for topical authority
// These are internal placeholders and should not be published automatically

export interface FutureArticle {
  slug: string;
  title: string;
  category: string;
  priority: number; // 1 = highest priority
}

// English future articles
export const futureArticles: FutureArticle[] = [
  {
    slug: 'rent-vs-buy-the-complete-decision-framework',
    title: 'Rent vs Buy: A Complete Decision Framework',
    category: 'rent-vs-buy-fundamentals',
    priority: 1,
  },
  {
    slug: 'hidden-costs-of-homeownership',
    title: 'The Hidden Costs of Homeownership Most Calculators Ignore',
    category: 'hidden-costs',
    priority: 2,
  },
  {
    slug: 'how-interest-rates-change-rent-vs-buy',
    title: 'How Interest Rates Change the Rent vs Buy Math',
    category: 'mortgages-interest-rates',
    priority: 3,
  },
  {
    slug: 'opportunity-cost-down-payment',
    title: 'The Opportunity Cost of Your Down Payment',
    category: 'opportunity-cost-investing',
    priority: 4,
  },
  {
    slug: 'how-long-should-you-stay-for-buying-to-make-sense',
    title: 'How Long Do You Need to Stay for Buying to Make Sense?',
    category: 'rent-vs-buy-fundamentals',
    priority: 5,
  },
  {
    slug: 'renting-is-not-wasting-money-when-its-smart',
    title: "Renting Is Not Wasting Money — When It's the Smart Choice",
    category: 'rent-vs-buy-fundamentals',
    priority: 6,
  },
  {
    slug: 'behavioral-finance-why-people-dont-invest-the-difference',
    title: "Why People Don't 'Invest the Difference': Behavioral Finance Explained",
    category: 'behavioral-finance',
    priority: 7,
  },
  {
    slug: 'case-study-madrid-rent-vs-buy-example',
    title: 'Case Study: Rent vs Buy Example in Madrid (Scenario-Based)',
    category: 'scenarios-case-studies',
    priority: 8,
  },
];

// Spanish future articles
export const futureArticlesEs: FutureArticle[] = [
  {
    slug: 'alquilar-vs-comprar-marco-completo',
    title: 'Alquilar vs Comprar: Marco Completo de Decisión',
    category: 'rent-vs-buy-fundamentals',
    priority: 1,
  },
  {
    slug: 'costes-ocultos-propiedad-vivienda',
    title: 'Los Costes Ocultos de la Propiedad que las Calculadoras Ignoran',
    category: 'hidden-costs',
    priority: 2,
  },
  {
    slug: 'como-tipos-interes-cambian-calculo',
    title: 'Cómo los Tipos de Interés Cambian el Cálculo de Alquilar vs Comprar',
    category: 'mortgages-interest-rates',
    priority: 3,
  },
  {
    slug: 'coste-oportunidad-entrada',
    title: 'El Coste de Oportunidad de Tu Entrada',
    category: 'opportunity-cost-investing',
    priority: 4,
  },
  {
    slug: 'cuanto-tiempo-quedarte-para-comprar',
    title: '¿Cuánto Tiempo Necesitas Quedarte para que Comprar Tenga Sentido?',
    category: 'rent-vs-buy-fundamentals',
    priority: 5,
  },
  {
    slug: 'alquilar-no-es-tirar-dinero',
    title: 'Alquilar No Es Tirar el Dinero — Cuándo Es la Opción Inteligente',
    category: 'rent-vs-buy-fundamentals',
    priority: 6,
  },
  {
    slug: 'finanzas-conductuales-invertir-diferencia',
    title: 'Por Qué la Gente No Invierte la Diferencia: Finanzas Conductuales',
    category: 'behavioral-finance',
    priority: 7,
  },
  {
    slug: 'caso-estudio-madrid-alquilar-vs-comprar',
    title: 'Caso de Estudio: Alquilar vs Comprar en Madrid',
    category: 'scenarios-case-studies',
    priority: 8,
  },
];

// English helpers
export function getFutureArticlesByCategory(category: string): FutureArticle[] {
  return futureArticles.filter((article) => article.category === category);
}

export function getRelatedFutureArticles(currentSlug: string, limit: number = 3): FutureArticle[] {
  return futureArticles
    .filter((article) => article.slug !== currentSlug)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, limit);
}

// Spanish helpers
export function getSpanishFutureArticlesByCategory(category: string): FutureArticle[] {
  return futureArticlesEs.filter((article) => article.category === category);
}

export function getRelatedSpanishFutureArticles(currentSlug: string, limit: number = 3): FutureArticle[] {
  return futureArticlesEs
    .filter((article) => article.slug !== currentSlug)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, limit);
}
