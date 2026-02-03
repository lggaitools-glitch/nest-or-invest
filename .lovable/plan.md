

# SEO, Indexing & Metadata Hardening Plan

## Audit Summary

After reviewing all pages and configuration files, here are the findings:

### Current State Assessment

| Page | Title | Description | Canonical | Robots | hreflang | Status |
|------|-------|-------------|-----------|--------|----------|--------|
| Homepage (`/`) | In index.html only | In index.html only | Correct | index,follow | Missing | Needs page-level Helmet |
| Simulator (`/simulate`) | Has but needs update | Has but needs update | Correct | index,follow | Missing | Needs update |
| Articles EN (`/articles`) | Has but needs update | Has but needs update | Correct | index,follow | Has | Needs title/desc update |
| Articles ES (`/es/articles`) | Has (Spanish) | Has (Spanish) | Correct | index,follow | Has | Needs title/desc update |
| Article EN | Has | Has | Has (via HreflangTags) | index,follow | Has | OK |
| Article ES | Has (Spanish) | Has (Spanish) | Has (via HreflangTags) | index,follow | Has | OK |
| NotFound | Missing | Missing | N/A | noindex,nofollow | N/A | Needs title/desc |

### Issues Identified

1. **Homepage Missing Page-Level SEO**: Relies on index.html fallback; needs Helmet tags with hreflang
2. **Simulate Page**: Title/description need update per requirements
3. **Articles Hub Pages**: Titles/descriptions need update per requirements
4. **Homepage Missing hreflang**: No language alternates for multilingual SEO
5. **404 Page Missing Title**: Should have a descriptive title
6. **Robots.txt**: Already correct (blocking auth/admin pages, has sitemap directive)
7. **Sitemap.xml**: Already correct (all public pages, correct structure)

---

## Implementation Plan

### Phase 1: Page-Level Metadata Updates

#### 1.1 Update `index.html`
Update homepage title and description per requirements:

```html
<title>Rent or Buy? Compare Housing Decisions with Data | HomeDecision</title>
<meta name="description" content="Compare renting vs buying using real numbers. HomeDecision helps you decide based on long-term wealth, not emotions." />
```

#### 1.2 Update `src/pages/Index.tsx`
Add complete Helmet tags with hreflang support:

```tsx
<Helmet>
  <title>Rent or Buy? Compare Housing Decisions with Data | HomeDecision</title>
  <meta name="description" content="Compare renting vs buying using real numbers. HomeDecision helps you decide based on long-term wealth, not emotions." />
  <link rel="canonical" href="https://homedecision.app/" />
  <meta name="robots" content="index,follow" />
  
  {/* hreflang - homepage serves as x-default */}
  <link rel="alternate" hrefLang="en" href="https://homedecision.app/" />
  <link rel="alternate" hrefLang="x-default" href="https://homedecision.app/" />
  
  {/* Open Graph */}
  <meta property="og:title" content="Rent or Buy? Compare Housing Decisions with Data | HomeDecision" />
  <meta property="og:description" content="Compare renting vs buying using real numbers. HomeDecision helps you decide based on long-term wealth, not emotions." />
  <meta property="og:url" content="https://homedecision.app/" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
  
  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Rent or Buy? Compare Housing Decisions with Data | HomeDecision" />
  <meta name="twitter:description" content="Compare renting vs buying using real numbers. HomeDecision helps you decide based on long-term wealth, not emotions." />
  <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
</Helmet>
```

#### 1.3 Update `src/pages/Simulate.tsx`
Update title and description per requirements:

```tsx
<Helmet>
  <title>Rent vs Buy Calculator - Free Wealth Simulation | HomeDecision</title>
  <meta name="description" content="Use our free rent vs buy calculator to simulate long-term net worth and make a smarter housing decision." />
  <link rel="canonical" href="https://homedecision.app/simulate" />
  <meta name="robots" content="index,follow" />
  
  {/* hreflang */}
  <link rel="alternate" hrefLang="en" href="https://homedecision.app/simulate" />
  <link rel="alternate" hrefLang="x-default" href="https://homedecision.app/simulate" />
  
  {/* OG + Twitter tags updated with new title/description */}
</Helmet>
```

#### 1.4 Update `src/pages/Articles.tsx`
Update title and description per requirements:

```tsx
<Helmet>
  <html lang="en" />
  <title>Rent vs Buy Insights & Data-Driven Guides | HomeDecision</title>
  <meta name="description" content="In-depth articles analyzing rent vs buy decisions, housing vs investing, and long-term wealth strategies." />
  {/* Keep existing canonical and hreflang - they are correct */}
</Helmet>
```

#### 1.5 Update `src/pages/ArticlesEs.tsx`
Create Spanish-specific title and description (not reused from English):

```tsx
<Helmet>
  <html lang="es" />
  <title>Guias de Alquiler vs Compra y Estrategias de Patrimonio | HomeDecision</title>
  <meta name="description" content="Articulos detallados analizando decisiones de alquiler vs compra, vivienda vs inversion, y estrategias de patrimonio a largo plazo." />
  {/* Keep existing canonical and hreflang - they are correct */}
</Helmet>
```

#### 1.6 Update `src/pages/NotFound.tsx`
Add title and improve robots directive:

```tsx
<Helmet>
  <title>Page Not Found | HomeDecision</title>
  <meta name="description" content="The page you're looking for doesn't exist. Return to HomeDecision to explore rent vs buy tools and insights." />
  <meta name="robots" content="noindex,follow" />
</Helmet>
```

Note: Using `noindex,follow` allows crawlers to follow links on the 404 page back to valid pages, which is the recommended practice.

---

### Phase 2: Verify Existing Correct Implementations

The following are already correctly implemented and require no changes:

| File | Status | Notes |
|------|--------|-------|
| `public/robots.txt` | Correct | Blocks auth/admin pages, has sitemap directive |
| `public/sitemap.xml` | Correct | All public pages included with correct priorities |
| `HreflangTags.tsx` | Correct | Proper canonical and hreflang logic |
| `ArticleHouseVsStocks.tsx` | Correct | Has unique title, description, canonical, robots, OG |
| `ArticleCasaVsBolsa.tsx` | Correct | Has unique Spanish title, description, canonical, robots, OG |

---

## Summary of Changes

| File | Action | Changes |
|------|--------|---------|
| `index.html` | MODIFY | Update title and description |
| `src/pages/Index.tsx` | MODIFY | Add complete Helmet with title, description, canonical, robots, hreflang, OG/Twitter |
| `src/pages/Simulate.tsx` | MODIFY | Update title, description; add hreflang |
| `src/pages/Articles.tsx` | MODIFY | Update title and description |
| `src/pages/ArticlesEs.tsx` | MODIFY | Update title and description (Spanish-specific) |
| `src/pages/NotFound.tsx` | MODIFY | Add title, description; change robots to noindex,follow |

**Total: 6 files modified**

---

## Technical Notes

1. **Canonical URLs**: All pages will have self-referencing canonicals pointing to their own URL

2. **hreflang Implementation**:
   - Homepage: `en` + `x-default` (no Spanish homepage version currently exists)
   - Simulate: `en` + `x-default` (no Spanish version currently exists)
   - Article hubs: `en` + `es` + `x-default` (both versions exist)
   - Individual articles: `en` + `es` + `x-default` (when translation exists)

3. **404 Handling**: Using `noindex,follow` is best practice - prevents indexing the 404 page but allows crawlers to follow links back to valid pages

4. **No Internal Pages Exist**: The routes mentioned (`/login`, `/auth`, `/dashboard`, etc.) don't exist in the current app, so no `noindex` tags needed for them. The `robots.txt` disallow rules serve as a precaution for future additions.

5. **Article Structure**: Both article pages already have proper H1 (article title) and logical H2/H3 hierarchy with internal links to `/simulate` and article hubs.

---

## Validation Checklist

After implementation, verify:

- [ ] `/robots.txt` returns 200 and contains sitemap directive
- [ ] `/sitemap.xml` returns 200 and validates as XML
- [ ] Each page has unique title and description
- [ ] Canonicals are self-referencing (not pointing to homepage)
- [ ] Spanish pages have Spanish metadata (not English)
- [ ] Internal pages (if added) would be noindex
- [ ] 404 page has noindex,follow

