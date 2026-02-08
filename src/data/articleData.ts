// Centralized article metadata store
export interface ArticleMetadata {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  publishedDate: string; // ISO format
  modifiedDate: string; // ISO format
  wordCount: number;
  category: string;
  isPublished: boolean;
  language: 'en' | 'es';
}

// English articles
export const articles: ArticleMetadata[] = [
  {
    slug: 'house-vs-stocks-what-the-data-really-says',
    title: 'House vs Stocks: What the Data Really Says About Building Wealth',
    description: 'Buying a home or investing in stocks? We break down real data, long-term behavior, and expert insights to help you make smarter housing decisions.',
    excerpt: 'Buying a home or investing in stocks? Real-world data and behavioral insights show why the answer is more nuanced than most advice suggests.',
    publishedDate: '2025-01-15',
    modifiedDate: '2025-02-03',
    wordCount: 1100,
    category: 'rent-vs-buy-fundamentals',
    isPublished: true,
    language: 'en',
  },
  {
    slug: 'rent-vs-buy-2026-data-driven-decision-guide',
    title: 'Rent vs Buy in 2026: A Data-Driven Decision Guide',
    description: 'Navigate the 2026 housing market with real data on mortgage rates, rent trends, and Spanish market forecasts to make a smarter rent vs buy decision.',
    excerpt: 'With mortgage rates stabilizing and rents climbing in 2026, deciding whether to rent or buy requires careful analysis. This guide synthesizes market data to help you decide.',
    publishedDate: '2026-02-03',
    modifiedDate: '2026-02-03',
    wordCount: 1650,
    category: 'rent-vs-buy-fundamentals',
    isPublished: true,
    language: 'en',
  },
  {
    slug: 'first-time-home-buyer-guide-2026',
    title: 'First-Time Home-Buyer Guide 2026',
    description: 'Everything first-time buyers need to know in 2026: mortgage rates around 6.25%, down payments, hidden costs, and step-by-step guidance for Spain and the US.',
    excerpt: 'Buying your first home in 2026? This guide covers stable mortgage rates, saving strategies, hidden costs, and step-by-step advice for Spain and the US markets.',
    publishedDate: '2026-02-08',
    modifiedDate: '2026-02-08',
    wordCount: 2100,
    category: 'first-time-buyers',
    isPublished: true,
    language: 'en',
  },
];

// Spanish articles
export const articlesEs: ArticleMetadata[] = [
  {
    slug: 'casa-vs-bolsa-lo-que-dicen-los-datos',
    title: 'Casa vs Bolsa: Lo que los datos realmente dicen sobre la creación de riqueza',
    description: '¿Comprar una vivienda o invertir en bolsa? Analizamos datos reales, comportamiento financiero y perspectivas a largo plazo para ayudarte a tomar mejores decisiones inmobiliarias.',
    excerpt: '¿Comprar una vivienda o invertir en bolsa? Datos reales y patrones de comportamiento muestran por qué la respuesta es más compleja de lo que parece.',
    publishedDate: '2025-02-03',
    modifiedDate: '2025-02-03',
    wordCount: 950,
    category: 'rent-vs-buy-fundamentals',
    isPublished: true,
    language: 'es',
  },
  {
    slug: 'alquilar-o-comprar-2026-guia-basada-en-datos',
    title: 'Alquilar o comprar en 2026: una guía de decisiones basada en datos',
    description: 'Navega el mercado inmobiliario de 2026 con datos reales sobre tipos hipotecarios, tendencias de alquiler y previsiones del mercado español para tomar una decisión informada.',
    excerpt: 'Con los tipos hipotecarios estabilizándose y los alquileres subiendo en 2026, decidir si alquilar o comprar exige analizar cuidadosamente los datos actuales.',
    publishedDate: '2026-02-03',
    modifiedDate: '2026-02-03',
    wordCount: 1650,
    category: 'rent-vs-buy-fundamentals',
    isPublished: true,
    language: 'es',
  },
  {
    slug: 'guia-comprar-primera-vivienda-2026',
    title: 'Guía para comprar tu primera vivienda en 2026',
    description: 'Todo lo que los compradores primerizos necesitan saber en 2026: tipos hipotecarios en torno al 6,25 %, entrada, costes ocultos y guía paso a paso para España y EE.UU.',
    excerpt: '¿Compras tu primera vivienda en 2026? Esta guía cubre tipos hipotecarios estables, estrategias de ahorro, costes ocultos y consejos paso a paso para España y EE.UU.',
    publishedDate: '2026-02-08',
    modifiedDate: '2026-02-08',
    wordCount: 2100,
    category: 'first-time-buyers',
    isPublished: true,
    language: 'es',
  },
];

// English article helpers
export function getArticleBySlug(slug: string): ArticleMetadata | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getPublishedArticles(): ArticleMetadata[] {
  return articles.filter((article) => article.isPublished);
}

export function getArticlesByCategory(category: string): ArticleMetadata[] {
  return articles.filter((article) => article.category === category && article.isPublished);
}

// Spanish article helpers
export function getSpanishArticleBySlug(slug: string): ArticleMetadata | undefined {
  return articlesEs.find((article) => article.slug === slug);
}

export function getPublishedSpanishArticles(): ArticleMetadata[] {
  return articlesEs.filter((article) => article.isPublished);
}

export function getSpanishArticlesByCategory(category: string): ArticleMetadata[] {
  return articlesEs.filter((article) => article.category === category && article.isPublished);
}

// Shared helpers
export function calculateReadingTime(wordCount: number): number {
  const wordsPerMinute = 220;
  return Math.ceil(wordCount / wordsPerMinute);
}

export const BASE_URL = 'https://homedecision.app';

export function getCanonicalUrl(slug: string, language: 'en' | 'es' = 'en'): string {
  if (language === 'es') {
    return `${BASE_URL}/es/articles/${slug}`;
  }
  return `${BASE_URL}/articles/${slug}`;
}

// Translation pairs: maps English slug to Spanish slug
export const articleTranslations: Record<string, string> = {
  'house-vs-stocks-what-the-data-really-says': 'casa-vs-bolsa-lo-que-dicen-los-datos',
  'rent-vs-buy-2026-data-driven-decision-guide': 'alquilar-o-comprar-2026-guia-basada-en-datos',
  'first-time-home-buyer-guide-2026': 'guia-comprar-primera-vivienda-2026',
};

// Helper to get the opposite language slug
export function getTranslationSlug(slug: string, fromLanguage: 'en' | 'es'): string | undefined {
  if (fromLanguage === 'en') {
    return articleTranslations[slug];
  }
  // Reverse lookup for Spanish to English
  const entry = Object.entries(articleTranslations).find(([_, esSlug]) => esSlug === slug);
  return entry ? entry[0] : undefined;
}
