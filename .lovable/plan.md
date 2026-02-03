

# Fix: Add Visible Language Switcher to English Article

## Issue

The English article at `/articles/rent-vs-buy-2026-data-driven-decision-guide` has the correct SEO `hreflang` tags in the HTML `<head>`, but is missing the **visible** language navigation elements that allow users to switch to the Spanish version.

### Current State

The English article has:
- `HreflangTags` component with `esSlug` prop ✓ (SEO tags in `<head>`)

The English article is missing:
- `ArticleLanguageSwitcher` component (visible EN | ES toggle in header) ✗
- `AvailableInLanguage` component ("Also available in Spanish" notice) ✗

### Compare to Spanish Article

The Spanish article correctly implements both:
```tsx
<ArticleLanguageSwitcher
  currentLanguage="es"
  enPath={enPath}
  esPath={`/es/articles/${ARTICLE_SLUG}`}
/>

<AvailableInLanguage
  currentLanguage="es"
  translationPath={enPath}
/>
```

---

## Implementation Plan

### File: `src/pages/ArticleRentVsBuy2026.tsx`

**Changes needed:**

1. **Add imports** for `ArticleLanguageSwitcher` and `AvailableInLanguage`

2. **Add imports** for `Link` from react-router-dom and `ArrowLeft` from lucide-react

3. **Get Spanish translation slug** using `getTranslationSlug()`

4. **Add header row** with back link and language switcher before `ArticleHeader`

5. **Add AvailableInLanguage notice** after `ArticleHeader`

---

## Code Changes

### 1. Update Imports

Add to existing imports:
```tsx
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { 
  // ...existing imports...
  ArticleLanguageSwitcher,
  AvailableInLanguage,
} from '@/components/articles';
import { getArticleBySlug, getTranslationSlug } from '@/data/articleData';
```

### 2. Get Translation Path

Add inside component, after `articleData` check:
```tsx
const esSlug = getTranslationSlug(ARTICLE_SLUG, 'en');
const esPath = esSlug ? `/es/articles/${esSlug}` : undefined;
```

### 3. Add Header Row with Language Switcher

Add before `ArticleHeader`, inside `ArticleLayout`:
```tsx
<div className="flex items-center justify-between mb-8">
  <Link
    to="/articles"
    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors"
  >
    <ArrowLeft className="h-4 w-4" />
    Back to Articles
  </Link>
  <ArticleLanguageSwitcher
    currentLanguage="en"
    enPath={`/articles/${ARTICLE_SLUG}`}
    esPath={esPath}
  />
</div>
```

### 4. Add AvailableInLanguage Notice

Add after `ArticleHeader`:
```tsx
<AvailableInLanguage
  currentLanguage="en"
  translationPath={esPath}
/>
```

---

## Files to Modify

| File | Action | Description |
|------|--------|-------------|
| `src/pages/ArticleRentVsBuy2026.tsx` | MODIFY | Add visible language switcher and translation notice |

**Total: 1 file modified**

---

## Result

After this fix, the English article will have:
- **SEO hreflang tags** in `<head>` (already working) ✓
- **Visible EN \| ES toggle** in header (ES links to Spanish article) ✓
- **"Also available in Spanish" notice** with link ✓
- **Back to Articles link** for navigation consistency ✓

This matches the implementation pattern used in the Spanish article and provides full bilingual navigation for users.

