// Topic hub categories for /articles page
export interface TopicCategory {
  id: string;
  name: string;
  description: string;
  articleSlugs: string[];
}

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
];

export function getCategoryById(id: string): TopicCategory | undefined {
  return topicCategories.find((category) => category.id === id);
}

export function getCategoryArticleCount(categoryId: string, publishedSlugs: string[]): number {
  const category = getCategoryById(categoryId);
  if (!category) return 0;
  return category.articleSlugs.filter((slug) => publishedSlugs.includes(slug)).length;
}
