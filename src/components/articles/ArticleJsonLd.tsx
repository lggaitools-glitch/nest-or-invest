import { Helmet } from 'react-helmet-async';
import { BASE_URL } from '@/data/articleData';

interface ArticleJsonLdProps {
  title: string;
  description: string;
  slug: string;
  publishedDate: string;
  modifiedDate: string;
  imageUrl?: string;
  language?: 'en' | 'es';
}

const breadcrumbLabels = {
  en: {
    home: 'Home',
    articles: 'Articles',
  },
  es: {
    home: 'Inicio',
    articles: 'Artículos',
  },
};

export function ArticleJsonLd({
  title,
  description,
  slug,
  publishedDate,
  modifiedDate,
  imageUrl,
  language = 'en',
}: ArticleJsonLdProps) {
  const basePath = language === 'es' ? '/es/articles' : '/articles';
  const articlesPath = language === 'es' ? `${BASE_URL}/es/articles` : `${BASE_URL}/articles`;
  const canonicalUrl = `${articlesPath}/${slug}`;
  const labels = breadcrumbLabels[language];

  const articleSchema = {
    '@type': 'Article',
    headline: title,
    description: description,
    author: {
      '@type': 'Organization',
      name: 'HomeDecision Research Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HomeDecision',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/favicon.png`,
      },
    },
    datePublished: publishedDate,
    dateModified: modifiedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    }),
  };

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: labels.home,
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: labels.articles,
        item: articlesPath,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
      },
    ],
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [articleSchema, breadcrumbSchema],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
}
