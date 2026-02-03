
# Bilingual Language Switcher Implementation Plan

## Overview
Add a clean EN/ES language switcher for the editorial section that allows users to navigate between English and Spanish versions of articles and index pages, using the existing translation mapping system.

---

## Architecture Approach

The implementation creates two new components and extends the existing translation mapping:

```text
src/
  components/
    articles/
      ArticleLanguageSwitcher.tsx   # NEW - EN|ES toggle for header area
      AvailableInLanguage.tsx       # NEW - "Also available in..." micro-link
      index.ts                      # UPDATE - Export new components
  pages/
    Articles.tsx                    # UPDATE - Add language switcher
    ArticlesEs.tsx                  # UPDATE - Add language switcher  
    ArticleHouseVsStocks.tsx        # UPDATE - Add switcher + micro-link
    ArticleCasaVsBolsa.tsx          # UPDATE - Add switcher + micro-link
  data/
    articleData.ts                  # UPDATE - Add index page translations
```

---

## Files to Create

### 1. `src/components/articles/ArticleLanguageSwitcher.tsx`

A minimal, editorial-style language toggle component.

**Props:**
```typescript
interface ArticleLanguageSwitcherProps {
  currentLanguage: 'en' | 'es';
  enPath?: string;    // Path to English version (undefined if doesn't exist)
  esPath?: string;    // Path to Spanish version (undefined if doesn't exist)
}
```

**Design:**
- Shows: `EN | ES`
- Current language is highlighted (bolder, different color)
- Non-current language is a link if path exists, greyed out if not
- Minimal style matching editorial aesthetic

**Visual Structure:**
```text
Desktop: positioned in top-right of article header area
Mobile: compact row below the title

┌───────────────────────────────────────────────────────────────┐
│                                              [ EN | ES ]      │
│ H1: Article Title                                             │
│ Lead paragraph...                                             │
└───────────────────────────────────────────────────────────────┘
```

**Styling:**
```typescript
// Active language: font-medium text-foreground
// Inactive (clickable): text-muted-foreground hover:text-primary
// Inactive (disabled): text-muted-foreground/50 cursor-not-allowed
// Separator: text-muted-foreground/50
```

### 2. `src/components/articles/AvailableInLanguage.tsx`

A subtle micro-link displayed near the byline.

**Props:**
```typescript
interface AvailableInLanguageProps {
  currentLanguage: 'en' | 'es';
  translationPath?: string;  // Path to translated version (undefined if none)
}
```

**Behavior:**
- On English pages (if ES exists): Shows "Disponible en español →"
- On Spanish pages (if EN exists): Shows "Available in English →"
- If no translation exists: Renders nothing

**Styling:**
- Small text (text-sm)
- Subtle link color (text-primary)
- Arrow indicator
- Placed after the AuthorByline

---

## Files to Modify

### 1. `src/data/articleData.ts`

Add index page translations to the existing mapping:

```typescript
// Extend translation mapping to include index pages
export const articleTranslations: Record<string, string> = {
  // Index pages (use path instead of slug for these)
  '/articles': '/es/articles',
  
  // Article pages (slug-based)
  'house-vs-stocks-what-the-data-really-says': 'casa-vs-bolsa-lo-que-dicen-los-datos',
};

// New helper: get translation for any path (index or article)
export function getTranslationPath(
  currentPath: string, 
  currentLanguage: 'en' | 'es'
): string | undefined {
  // Handle index pages
  if (currentPath === '/articles') {
    return '/es/articles';
  }
  if (currentPath === '/es/articles') {
    return '/articles';
  }
  
  // Handle article pages
  const slug = currentPath.split('/').pop();
  if (!slug) return undefined;
  
  const translationSlug = getTranslationSlug(slug, currentLanguage);
  if (!translationSlug) return undefined;
  
  return currentLanguage === 'en' 
    ? `/es/articles/${translationSlug}`
    : `/articles/${translationSlug}`;
}
```

### 2. `src/components/articles/index.ts`

Add exports for new components:

```typescript
export { ArticleLanguageSwitcher } from './ArticleLanguageSwitcher';
export { AvailableInLanguage } from './AvailableInLanguage';
```

### 3. `src/pages/Articles.tsx` (English index)

Add language switcher to the header area:

```typescript
import { ArticleLanguageSwitcher } from '@/components/articles';

// In the page header section:
<header className="mb-12">
  <div className="flex items-start justify-between gap-4">
    <h1 className="...">Insights</h1>
    <ArticleLanguageSwitcher
      currentLanguage="en"
      enPath="/articles"
      esPath="/es/articles"
    />
  </div>
  <p className="...">...</p>
</header>
```

### 4. `src/pages/ArticlesEs.tsx` (Spanish index)

Add language switcher to the header area:

```typescript
import { ArticleLanguageSwitcher } from '@/components/articles';

// In the page header section:
<header className="mb-12">
  <div className="flex items-start justify-between gap-4">
    <h1 className="...">Artículos</h1>
    <ArticleLanguageSwitcher
      currentLanguage="es"
      enPath="/articles"
      esPath="/es/articles"
    />
  </div>
  <p className="...">...</p>
</header>
```

### 5. `src/pages/ArticleHouseVsStocks.tsx` (English article)

Add language switcher and micro-link:

```typescript
import { ArticleLanguageSwitcher, AvailableInLanguage } from '@/components/articles';
import { getTranslationSlug } from '@/data/articleData';

// Get translation path
const esSlug = getTranslationSlug(ARTICLE_SLUG, 'en');
const esPath = esSlug ? `/es/articles/${esSlug}` : undefined;

// Add switcher in ArticleLayout header area (before ArticleHeader)
<div className="flex justify-end mb-4">
  <ArticleLanguageSwitcher
    currentLanguage="en"
    enPath={`/articles/${ARTICLE_SLUG}`}
    esPath={esPath}
  />
</div>

// Add micro-link after ArticleHeader
<AvailableInLanguage
  currentLanguage="en"
  translationPath={esPath}
/>
```

### 6. `src/pages/ArticleCasaVsBolsa.tsx` (Spanish article)

Add language switcher and micro-link:

```typescript
import { ArticleLanguageSwitcher, AvailableInLanguage } from '@/components/articles';
import { getTranslationSlug } from '@/data/articleData';

// Get translation path
const enSlug = getTranslationSlug(ARTICLE_SLUG, 'es');
const enPath = enSlug ? `/articles/${enSlug}` : undefined;

// Add switcher before ArticleHeader
<div className="flex justify-end mb-4">
  <ArticleLanguageSwitcher
    currentLanguage="es"
    enPath={enPath}
    esPath={`/es/articles/${ARTICLE_SLUG}`}
  />
</div>

// Add micro-link after ArticleHeader
<AvailableInLanguage
  currentLanguage="es"
  translationPath={enPath}
/>
```

---

## Component Specifications

### ArticleLanguageSwitcher Component

```typescript
// src/components/articles/ArticleLanguageSwitcher.tsx

import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ArticleLanguageSwitcherProps {
  currentLanguage: 'en' | 'es';
  enPath?: string;
  esPath?: string;
}

export function ArticleLanguageSwitcher({
  currentLanguage,
  enPath,
  esPath,
}: ArticleLanguageSwitcherProps) {
  const renderLanguage = (
    code: 'en' | 'es',
    label: string,
    path?: string,
    isActive: boolean
  ) => {
    if (isActive) {
      return (
        <span className="font-medium text-foreground">
          {label}
        </span>
      );
    }

    if (path) {
      return (
        <Link
          to={path}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          {label}
        </Link>
      );
    }

    return (
      <span className="text-muted-foreground/50 cursor-not-allowed">
        {label}
      </span>
    );
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      {renderLanguage('en', 'EN', enPath, currentLanguage === 'en')}
      <span className="text-muted-foreground/50">|</span>
      {renderLanguage('es', 'ES', esPath, currentLanguage === 'es')}
    </div>
  );
}
```

### AvailableInLanguage Component

```typescript
// src/components/articles/AvailableInLanguage.tsx

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface AvailableInLanguageProps {
  currentLanguage: 'en' | 'es';
  translationPath?: string;
}

export function AvailableInLanguage({
  currentLanguage,
  translationPath,
}: AvailableInLanguageProps) {
  if (!translationPath) {
    return null;
  }

  const text = currentLanguage === 'en' 
    ? 'Disponible en español' 
    : 'Available in English';

  return (
    <div className="mb-6">
      <Link
        to={translationPath}
        className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
      >
        {text}
        <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
```

---

## Visual Layout

### Index Pages (Desktop)
```text
┌─────────────────────────────────────────────────────────────────┐
│  [SiteNavigation]                                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Insights                                         [ EN | ES ]   │
│                                                                 │
│  At HomeDecision, we publish research-backed articles...        │
│                                                                 │
│  [TopicHub]                                                     │
│  [Article Cards]                                                │
└─────────────────────────────────────────────────────────────────┘
```

### Article Pages (Desktop)
```text
┌─────────────────────────────────────────────────────────────────┐
│  [SiteNavigation]                                               │
├─────────────────────────────────────────────────────────────────┤
│  ← Back to Insights                               [ EN | ES ]   │
│                                                                 │
│  House vs Stocks: What the Data Really Says                     │
│  About Building Wealth                                          │
│                                                                 │
│  Understanding the real trade-offs between...                   │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│  By HomeDecision Research Team · 5 min read · Updated Feb 3     │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Disponible en español →                                        │
│                                                                 │
│  [Article Content]                                              │
└─────────────────────────────────────────────────────────────────┘
```

### Mobile Layout
```text
┌─────────────────────────────────────┐
│  [SiteNavigation]                   │
├─────────────────────────────────────┤
│  ← Back to Insights                 │
│                                     │
│              [ EN | ES ]            │
│                                     │
│  House vs Stocks: What              │
│  the Data Really Says...            │
│                                     │
│  Understanding the real...          │
│                                     │
│  ──────────────────────────────     │
│  By HomeDecision Research Team      │
│  5 min read · Updated Feb 3         │
│  ──────────────────────────────     │
│                                     │
│  Disponible en español →            │
│                                     │
│  [Article Content]                  │
└─────────────────────────────────────┘
```

---

## Mapping Rules (Future-Proof)

When adding new translated articles:

1. Add both articles to their respective arrays in `articleData.ts`
2. Add the slug mapping to `articleTranslations`:
   ```typescript
   export const articleTranslations: Record<string, string> = {
     '/articles': '/es/articles',
     'house-vs-stocks-what-the-data-really-says': 'casa-vs-bolsa-lo-que-dicen-los-datos',
     'new-english-slug': 'nuevo-slug-espanol',  // New pair
   };
   ```
3. Use `getTranslationSlug` to compute paths in page components
4. If no translation exists, pass `undefined` to components (disabled state)

---

## Hreflang Compatibility

The existing hreflang implementation remains unchanged:
- HreflangTags component continues to output `<link rel="alternate" hreflang="...">` in `<head>`
- Language switcher is UI-only and complements (does not replace) hreflang
- Both use the same `articleTranslations` mapping for consistency

---

## Files Summary

| Action | File |
|--------|------|
| CREATE | `src/components/articles/ArticleLanguageSwitcher.tsx` |
| CREATE | `src/components/articles/AvailableInLanguage.tsx` |
| MODIFY | `src/components/articles/index.ts` |
| MODIFY | `src/pages/Articles.tsx` |
| MODIFY | `src/pages/ArticlesEs.tsx` |
| MODIFY | `src/pages/ArticleHouseVsStocks.tsx` |
| MODIFY | `src/pages/ArticleCasaVsBolsa.tsx` |

**Total: 2 new files, 5 modified files**
