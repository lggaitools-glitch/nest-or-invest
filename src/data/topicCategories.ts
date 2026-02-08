// Topic hub categories for /articles page
export interface TopicCategory {
  id: string;
  name: string;
  description: string;
  articleSlugs: string[];
}

// English topic categories
export const topicCategories: TopicCategory[] = [
  {
    id: 'rent-vs-buy-fundamentals',
    name: 'Rent vs Buy Fundamentals',
    description: 'Core decision frameworks for comparing renting and buying.',
    articleSlugs: ['house-vs-stocks-what-the-data-really-says'],
  },
  {
    id: 'mortgages-interest-rates',
    name: 'Mortgages & Interest Rates',
    description: 'How financing affects the rent vs buy calculation.',
    articleSlugs: [],
  },
  {
    id: 'hidden-costs',
    name: 'Hidden Costs & Maintenance',
    description: 'What most rent vs buy calculators miss.',
    articleSlugs: [],
  },
  {
    id: 'opportunity-cost-investing',
    name: 'Opportunity Cost & Investing',
    description: 'Trade-offs between down payments and market returns.',
    articleSlugs: [],
  },
  {
    id: 'behavioral-finance',
    name: 'Behavioral Finance & Decision Biases',
    description: 'Why people don\'t act rationally with housing decisions.',
    articleSlugs: [],
  },
  {
    id: 'scenarios-case-studies',
    name: 'Scenarios & Case Studies',
    description: 'Real-world examples and location-specific analysis.',
    articleSlugs: [],
  },
  {
    id: 'first-time-buyers',
    name: 'First-Time Buyer Guides',
    description: 'Step-by-step guides for new homebuyers.',
    articleSlugs: ['first-time-home-buyer-guide-2026'],
  },
];

// Spanish topic categories
export const topicCategoriesEs: TopicCategory[] = [
  {
    id: 'rent-vs-buy-fundamentals',
    name: 'Fundamentos Alquilar vs Comprar',
    description: 'Marcos de decisión para comparar alquiler y compra.',
    articleSlugs: ['casa-vs-bolsa-lo-que-dicen-los-datos'],
  },
  {
    id: 'mortgages-interest-rates',
    name: 'Hipotecas y Tipos de Interés',
    description: 'Cómo la financiación afecta el cálculo de alquiler vs compra.',
    articleSlugs: [],
  },
  {
    id: 'hidden-costs',
    name: 'Costes Ocultos y Mantenimiento',
    description: 'Lo que la mayoría de calculadoras no tienen en cuenta.',
    articleSlugs: [],
  },
  {
    id: 'opportunity-cost-investing',
    name: 'Coste de Oportunidad e Inversión',
    description: 'Compromisos entre la entrada y la rentabilidad del mercado.',
    articleSlugs: [],
  },
  {
    id: 'behavioral-finance',
    name: 'Finanzas Conductuales y Sesgos',
    description: 'Por qué las personas no actúan racionalmente con decisiones de vivienda.',
    articleSlugs: [],
  },
  {
    id: 'scenarios-case-studies',
    name: 'Escenarios y Casos de Estudio',
    description: 'Ejemplos reales y análisis específicos por ubicación.',
    articleSlugs: [],
  },
  {
    id: 'first-time-buyers',
    name: 'Guías para Compradores Primerizos',
    description: 'Guías paso a paso para nuevos compradores de vivienda.',
    articleSlugs: ['guia-comprar-primera-vivienda-2026'],
  },
];

// English helpers
export function getCategoryById(id: string): TopicCategory | undefined {
  return topicCategories.find((category) => category.id === id);
}

export function getCategoryArticleCount(categoryId: string, publishedSlugs: string[]): number {
  const category = getCategoryById(categoryId);
  if (!category) return 0;
  return category.articleSlugs.filter((slug) => publishedSlugs.includes(slug)).length;
}

// Spanish helpers
export function getSpanishCategoryById(id: string): TopicCategory | undefined {
  return topicCategoriesEs.find((category) => category.id === id);
}

export function getSpanishCategoryArticleCount(categoryId: string, publishedSlugs: string[]): number {
  const category = getSpanishCategoryById(categoryId);
  if (!category) return 0;
  return category.articleSlugs.filter((slug) => publishedSlugs.includes(slug)).length;
}
