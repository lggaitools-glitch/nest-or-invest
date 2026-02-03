import { Helmet } from 'react-helmet-async';
import { BASE_URL } from '@/data/articleData';

interface ArticleJsonLdProps {
  title: string;
  description: string;
  slug: string;
  publishedDate: string;
  modifiedDate: string;
  imageUrl?: string;
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  publishedDate,
  modifiedDate,
  imageUrl,
}: ArticleJsonLdProps) {
  const canonicalUrl = `${BASE_URL}/articles/${slug}`;

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
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Articles',
        item: `${BASE_URL}/articles`,
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
