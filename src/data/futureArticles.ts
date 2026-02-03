// Content roadmap - planned articles for topical authority
// These are internal placeholders and should not be published automatically

export interface FutureArticle {
  slug: string;
  title: string;
  category: string;
  priority: number; // 1 = highest priority
}

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

export function getFutureArticlesByCategory(category: string): FutureArticle[] {
  return futureArticles.filter((article) => article.category === category);
}

export function getRelatedFutureArticles(currentSlug: string, limit: number = 3): FutureArticle[] {
  return futureArticles
    .filter((article) => article.slug !== currentSlug)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, limit);
}
