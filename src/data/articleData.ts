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
}

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
  },
];

export function getArticleBySlug(slug: string): ArticleMetadata | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getPublishedArticles(): ArticleMetadata[] {
  return articles.filter((article) => article.isPublished);
}

export function getArticlesByCategory(category: string): ArticleMetadata[] {
  return articles.filter((article) => article.category === category && article.isPublished);
}

export function calculateReadingTime(wordCount: number): number {
  const wordsPerMinute = 220;
  return Math.ceil(wordCount / wordsPerMinute);
}

export const BASE_URL = 'https://homedecision.app';

export function getCanonicalUrl(slug: string): string {
  return `${BASE_URL}/articles/${slug}`;
}
