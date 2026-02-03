
# Add SEO Indexing Guardrails

## Overview
Add proper SEO meta tags to all public pages to ensure Google indexes the correct URLs with canonical links, robots directives, and Open Graph/Twitter cards.

---

## Current Issues Found

| Page | Canonical | Robots | OG Tags | Status |
|------|-----------|--------|---------|--------|
| Homepage (`/`) | Wrong URL in index.html | Missing | In index.html only | Needs fix |
| Simulate (`/simulate`) | Missing | Missing | Missing | Needs all |
| Articles EN (`/articles`) | Has | Missing | Missing | Needs robots + OG |
| Articles ES (`/es/articles`) | Has | Missing | Missing | Needs robots + OG |
| Article pages | Has (via HreflangTags) | Missing | Missing | Needs robots + OG |
| NotFound | N/A | Missing | N/A | Needs noindex |

---

## Files to Modify

### 1. `index.html`
Update the canonical URL and add robots meta tag:

```html
<link rel="canonical" href="https://homedecision.app/" />
<meta name="robots" content="index,follow" />
```

Also update OG URL to match canonical.

---

### 2. `src/pages/Index.tsx`
Add Helmet with SEO tags (canonical already in index.html serves as fallback):

```tsx
import { Helmet } from 'react-helmet-async';

// Inside component:
<Helmet>
  <meta name="robots" content="index,follow" />
</Helmet>
```

---

### 3. `src/pages/Simulate.tsx`
Add complete SEO meta tags:

```tsx
import { Helmet } from 'react-helmet-async';

<Helmet>
  <title>Rent vs Buy Simulator | HomeDecision</title>
  <meta name="description" content="Compare renting vs buying with a personalized wealth simulator..." />
  <link rel="canonical" href="https://homedecision.app/simulate" />
  <meta name="robots" content="index,follow" />
  
  {/* Open Graph */}
  <meta property="og:title" content="Rent vs Buy Simulator | HomeDecision" />
  <meta property="og:description" content="Compare renting vs buying..." />
  <meta property="og:url" content="https://homedecision.app/simulate" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://homedecision.app/og-image.png" />
  
  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Rent vs Buy Simulator | HomeDecision" />
  <meta name="twitter:description" content="Compare renting vs buying..." />
  <meta name="twitter:image" content="https://homedecision.app/og-image.png" />
</Helmet>
```

---

### 4. `src/pages/Articles.tsx`
Add robots and OG/Twitter tags:

```tsx
<Helmet>
  {/* existing tags... */}
  <meta name="robots" content="index,follow" />
  
  {/* Open Graph */}
  <meta property="og:title" content="Housing & Financial Decision Insights | HomeDecision" />
  <meta property="og:description" content="Research-backed articles..." />
  <meta property="og:url" content="https://homedecision.app/articles" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://homedecision.app/og-image.png" />
  
  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Housing & Financial Decision Insights | HomeDecision" />
  <meta name="twitter:description" content="Research-backed articles..." />
  <meta name="twitter:image" content="https://homedecision.app/og-image.png" />
</Helmet>
```

---

### 5. `src/pages/ArticlesEs.tsx`
Same as Articles.tsx but with Spanish content:

```tsx
<Helmet>
  {/* existing tags... */}
  <meta name="robots" content="index,follow" />
  
  {/* Open Graph - Spanish */}
  <meta property="og:title" content="Artículos sobre Vivienda y Decisiones Financieras | HomeDecision" />
  <meta property="og:description" content="En HomeDecision publicamos artículos..." />
  <meta property="og:url" content="https://homedecision.app/es/articles" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://homedecision.app/og-image.png" />
  
  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  ...
</Helmet>
```

---

### 6. `src/pages/ArticleHouseVsStocks.tsx`
Add robots and OG/Twitter tags:

```tsx
<Helmet>
  {/* existing tags... */}
  <meta name="robots" content="index,follow" />
  
  {/* Open Graph */}
  <meta property="og:title" content={`${articleData.title} | HomeDecision`} />
  <meta property="og:description" content={articleData.description} />
  <meta property="og:url" content={`https://homedecision.app/articles/${ARTICLE_SLUG}`} />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="https://homedecision.app/og-image.png" />
  
  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={`${articleData.title} | HomeDecision`} />
  <meta name="twitter:description" content={articleData.description} />
  <meta name="twitter:image" content="https://homedecision.app/og-image.png" />
</Helmet>
```

---

### 7. `src/pages/ArticleCasaVsBolsa.tsx`
Same pattern as English article with Spanish URL:

```tsx
<Helmet>
  {/* existing tags... */}
  <meta name="robots" content="index,follow" />
  
  {/* Open Graph */}
  <meta property="og:title" content={`${articleData.title} | HomeDecision`} />
  <meta property="og:description" content={articleData.description} />
  <meta property="og:url" content={`https://homedecision.app/es/articles/${ARTICLE_SLUG}`} />
  <meta property="og:type" content="article" />
  ...
</Helmet>
```

---

### 8. `src/pages/NotFound.tsx`
Add noindex directive:

```tsx
import { Helmet } from 'react-helmet-async';

<Helmet>
  <meta name="robots" content="noindex,nofollow" />
</Helmet>
```

---

## Summary

| Action | File |
|--------|------|
| MODIFY | `index.html` |
| MODIFY | `src/pages/Index.tsx` |
| MODIFY | `src/pages/Simulate.tsx` |
| MODIFY | `src/pages/Articles.tsx` |
| MODIFY | `src/pages/ArticlesEs.tsx` |
| MODIFY | `src/pages/ArticleHouseVsStocks.tsx` |
| MODIFY | `src/pages/ArticleCasaVsBolsa.tsx` |
| MODIFY | `src/pages/NotFound.tsx` |

**Total: 8 files modified**

---

## Technical Notes

1. **Canonical URLs**: All pages will have proper canonical URLs pointing to `https://homedecision.app/...`

2. **Robots Directive**: 
   - Public pages: `index,follow`
   - NotFound page: `noindex,nofollow`

3. **OG Image**: Using a placeholder path (`/og-image.png`). You may want to create an actual OG image or use the existing lovable default.

4. **React Helmet**: All SEO tags use `react-helmet-async` which is already installed and configured in the app.

5. **index.html Fix**: The canonical URL currently points to the old domain (`nest-or-invest.lovable.app`) - this will be corrected to `homedecision.app`.
