import { Helmet } from 'react-helmet-async';
import { BASE_URL } from '@/data/articleData';

interface HreflangTagsProps {
  type: 'index' | 'article';
  language: 'en' | 'es';
  enSlug?: string;
  esSlug?: string;
}

export function HreflangTags({ type, language, enSlug, esSlug }: HreflangTagsProps) {
  if (type === 'index') {
    const enUrl = `${BASE_URL}/articles`;
    const esUrl = `${BASE_URL}/es/articles`;
    const canonicalUrl = language === 'en' ? enUrl : esUrl;

    return (
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en" href={enUrl} />
        <link rel="alternate" hrefLang="es" href={esUrl} />
        <link rel="alternate" hrefLang="x-default" href={enUrl} />
      </Helmet>
    );
  }

  // Article type
  const enUrl = enSlug ? `${BASE_URL}/articles/${enSlug}` : undefined;
  const esUrl = esSlug ? `${BASE_URL}/es/articles/${esSlug}` : undefined;
  
  // Determine canonical based on current language
  const canonicalUrl = language === 'en' ? enUrl : esUrl;

  // Only add alternate hreflang if both translations exist
  const hasTranslation = enUrl && esUrl;

  return (
    <Helmet>
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {hasTranslation && (
        <>
          <link rel="alternate" hrefLang="en" href={enUrl} />
          <link rel="alternate" hrefLang="es" href={esUrl} />
          <link rel="alternate" hrefLang="x-default" href={enUrl} />
        </>
      )}
    </Helmet>
  );
}
