
# Bilingual SEO Implementation Plan (hreflang + Canonical)

## Overview
Add hreflang annotations and proper canonical tags to enable Google to understand the relationship between English and Spanish article pages, avoiding duplicate indexing and strengthening international SEO.

---

## Architecture Approach

The implementation creates a translation mapping system and a reusable `HreflangTags` component that can be used across all article pages.

```text
src/
  data/
    articleData.ts              # UPDATE - Add translation mapping
  components/
    articles/
      HreflangTags.tsx          # NEW - Reusable hreflang component
      ArticleJsonLd.tsx         # UPDATE - Remove canonical (moved to HreflangTags)
      index.ts                  # UPDATE - Export HreflangTags
  pages/
    Articles.tsx                # UPDATE - Add hreflang + canonical for index
    ArticlesEs.tsx              # UPDATE - Add hreflang + canonical for index
    ArticleHouseVsStocks.tsx    # UPDATE - Add HreflangTags component
    ArticleCasaVsBolsa.tsx      # UPDATE - Add HreflangTags component
```

---

## Files to Create

### 1. `src/components/articles/HreflangTags.tsx`
Reusable component that outputs hreflang and canonical link tags via Helmet:

```typescript
interface HreflangTagsProps {
  // For index pages
  type: 'index' | 'article';
  language: 'en' | 'es';
  
  // For article pages only
  enSlug?: string;
  esSlug?: string;
}

// Component logic:
// 1. If type='index':
//    - canonical: /articles (en) or /es/articles (es)
//    - hreflang en => /articles
//    - hreflang es => /es/articles
//    - hreflang x-default => /articles

// 2. If type='article':
//    - canonical: points to self (based on language)
//    - If both enSlug AND esSlug exist:
//      - hreflang en => /articles/{enSlug}
//      - hreflang es => /es/articles/{esSlug}
//      - hreflang x-default => /articles/{enSlug}
//    - If only one slug exists (no translation yet):
//      - Only output canonical, no alternate hreflang
```

Output structure:
```html
<link rel="canonical" href="..." />
<link rel="alternate" hreflang="en" href="..." />
<link rel="alternate" hreflang="es" href="..." />
<link rel="alternate" hreflang="x-default" href="..." />
```

---

## Files to Modify

### 1. `src/data/articleData.ts`
Add translation mapping to link English and Spanish article pairs:

```typescript
// Translation pairs: maps English slug to Spanish slug
export const articleTranslations: Record<string, string> = {
  'house-vs-stocks-what-the-data-really-says': 'casa-vs-bolsa-lo-que-dicen-los-datos',
};

// Helper to get the opposite language slug
export function getTranslationSlug(slug: string, fromLanguage: 'en' | 'es'): string | undefined {
  if (fromLanguage === 'en') {
    return articleTranslations[slug];
  } else {
    // Reverse lookup
    const entry = Object.entries(articleTranslations).find(([_, esSlug]) => esSlug === slug);
    return entry ? entry[0] : undefined;
  }
}
```

### 2. `src/components/articles/ArticleJsonLd.tsx`
Remove the canonical link (it will now be handled by HreflangTags to avoid duplication):

```typescript
// Remove this line from the return:
// <link rel="canonical" href={canonicalUrl} />
```

### 3. `src/components/articles/index.ts`
Add export for new component:

```typescript
export { HreflangTags } from './HreflangTags';
```

### 4. `src/pages/Articles.tsx` (English index)
Add hreflang tags and canonical:

```typescript
<Helmet>
  <html lang="en" />
  <title>...</title>
  <meta name="description" content="..." />
  <link rel="canonical" href="https://homedecision.app/articles" />
  <link rel="alternate" hreflang="en" href="https://homedecision.app/articles" />
  <link rel="alternate" hreflang="es" href="https://homedecision.app/es/articles" />
  <link rel="alternate" hreflang="x-default" href="https://homedecision.app/articles" />
</Helmet>
```

### 5. `src/pages/ArticlesEs.tsx` (Spanish index)
Add hreflang tags and canonical:

```typescript
<Helmet>
  <html lang="es" />
  <title>...</title>
  <meta name="description" content="..." />
  <link rel="canonical" href="https://homedecision.app/es/articles" />
  <link rel="alternate" hreflang="en" href="https://homedecision.app/articles" />
  <link rel="alternate" hreflang="es" href="https://homedecision.app/es/articles" />
  <link rel="alternate" hreflang="x-default" href="https://homedecision.app/articles" />
</Helmet>
```

### 6. `src/pages/ArticleHouseVsStocks.tsx` (English article)
Add HreflangTags component:

```typescript
import { HreflangTags } from '@/components/articles';
import { getTranslationSlug } from '@/data/articleData';

// In component:
const esSlug = getTranslationSlug(ARTICLE_SLUG, 'en');

// In JSX:
<Helmet>
  <html lang="en" />
  ...
</Helmet>
<HreflangTags
  type="article"
  language="en"
  enSlug={ARTICLE_SLUG}
  esSlug={esSlug}
/>
```

### 7. `src/pages/ArticleCasaVsBolsa.tsx` (Spanish article)
Add HreflangTags component:

```typescript
import { HreflangTags } from '@/components/articles';
import { getTranslationSlug } from '@/data/articleData';

// In component:
const enSlug = getTranslationSlug(ARTICLE_SLUG, 'es');

// In JSX (already has lang="es"):
<HreflangTags
  type="article"
  language="es"
  enSlug={enSlug}
  esSlug={ARTICLE_SLUG}
/>
```

---

## Expected Output

### For /articles (English index):
```html
<html lang="en">
<head>
  <link rel="canonical" href="https://homedecision.app/articles" />
  <link rel="alternate" hreflang="en" href="https://homedecision.app/articles" />
  <link rel="alternate" hreflang="es" href="https://homedecision.app/es/articles" />
  <link rel="alternate" hreflang="x-default" href="https://homedecision.app/articles" />
</head>
```

### For /es/articles (Spanish index):
```html
<html lang="es">
<head>
  <link rel="canonical" href="https://homedecision.app/es/articles" />
  <link rel="alternate" hreflang="en" href="https://homedecision.app/articles" />
  <link rel="alternate" hreflang="es" href="https://homedecision.app/es/articles" />
  <link rel="alternate" hreflang="x-default" href="https://homedecision.app/articles" />
</head>
```

### For /articles/house-vs-stocks-what-the-data-really-says:
```html
<html lang="en">
<head>
  <link rel="canonical" href="https://homedecision.app/articles/house-vs-stocks-what-the-data-really-says" />
  <link rel="alternate" hreflang="en" href="https://homedecision.app/articles/house-vs-stocks-what-the-data-really-says" />
  <link rel="alternate" hreflang="es" href="https://homedecision.app/es/articles/casa-vs-bolsa-lo-que-dicen-los-datos" />
  <link rel="alternate" hreflang="x-default" href="https://homedecision.app/articles/house-vs-stocks-what-the-data-really-says" />
</head>
```

### For /es/articles/casa-vs-bolsa-lo-que-dicen-los-datos:
```html
<html lang="es">
<head>
  <link rel="canonical" href="https://homedecision.app/es/articles/casa-vs-bolsa-lo-que-dicen-los-datos" />
  <link rel="alternate" hreflang="en" href="https://homedecision.app/articles/house-vs-stocks-what-the-data-really-says" />
  <link rel="alternate" hreflang="es" href="https://homedecision.app/es/articles/casa-vs-bolsa-lo-que-dicen-los-datos" />
  <link rel="alternate" hreflang="x-default" href="https://homedecision.app/articles/house-vs-stocks-what-the-data-really-says" />
</head>
```

---

## Future-Proofing

When adding a new article pair:

1. Add the English article to `articles` array in `articleData.ts`
2. Add the Spanish article to `articlesEs` array
3. Add the slug mapping to `articleTranslations`:
   ```typescript
   export const articleTranslations: Record<string, string> = {
     'house-vs-stocks-what-the-data-really-says': 'casa-vs-bolsa-lo-que-dicen-los-datos',
     'new-english-slug': 'nuevo-slug-espanol',  // New pair
   };
   ```
4. Use `HreflangTags` component in the new article pages

If a translation doesn't exist yet, the `getTranslationSlug` function returns `undefined`, and `HreflangTags` will only output the canonical (no alternate hreflang to non-existent pages).

---

## Files Summary

| Action | File |
|--------|------|
| CREATE | `src/components/articles/HreflangTags.tsx` |
| MODIFY | `src/data/articleData.ts` |
| MODIFY | `src/components/articles/ArticleJsonLd.tsx` |
| MODIFY | `src/components/articles/index.ts` |
| MODIFY | `src/pages/Articles.tsx` |
| MODIFY | `src/pages/ArticlesEs.tsx` |
| MODIFY | `src/pages/ArticleHouseVsStocks.tsx` |
| MODIFY | `src/pages/ArticleCasaVsBolsa.tsx` |

**Total: 1 new file, 7 modified files**
