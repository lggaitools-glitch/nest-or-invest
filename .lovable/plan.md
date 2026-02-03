

# Add New Spanish Article: "Alquilar o comprar en 2026: una guía de decisiones basada en datos"

## Article Overview

This is the Spanish version of the existing English article "Rent vs Buy in 2026: A Data-Driven Decision Guide". The PDF content is a native Spanish article (not a translation) focusing on the 2026 Spanish housing market with specific data on:
- 2026 market forecasts (BBVA 5.3%, CaixaBank 6.3%)
- Euribor projections (~2.08% mid-2025, ~2% by 2026)
- Spanish rental data (studios €550, 1-bed €720, 2-bed €1,020)
- Madrid-specific market insights (15%+ YoY price growth, 7%+ yields in outer districts)
- Regional yield comparisons (Murcia 7.4%, Valencia 6%+)

**Proposed URL slug:** `alquilar-o-comprar-2026-guia-basada-en-datos`

**Full path:** `/es/articles/alquilar-o-comprar-2026-guia-basada-en-datos`

---

## Implementation Plan

### Phase 1: Add Article Metadata

**File: `src/data/articleData.ts`**

Add new entry to the `articlesEs` array:

```typescript
{
  slug: 'alquilar-o-comprar-2026-guia-basada-en-datos',
  title: 'Alquilar o comprar en 2026: una guía de decisiones basada en datos',
  description: 'Navega el mercado inmobiliario de 2026 con datos reales sobre tipos hipotecarios, tendencias de alquiler y previsiones del mercado español para tomar una decisión informada.',
  excerpt: 'Con los tipos hipotecarios estabilizándose y los alquileres subiendo en 2026, decidir si alquilar o comprar exige analizar cuidadosamente los datos actuales.',
  publishedDate: '2026-02-03',
  modifiedDate: '2026-02-03',
  wordCount: 1650,
  category: 'rent-vs-buy-fundamentals',
  isPublished: true,
  language: 'es',
}
```

Also add translation mapping in `articleTranslations`:
```typescript
'rent-vs-buy-2026-data-driven-decision-guide': 'alquilar-o-comprar-2026-guia-basada-en-datos',
```

---

### Phase 2: Create Article Page Component

**New File: `src/pages/ArticleAlquilarOComprar2026.tsx`**

Following the existing Spanish article pattern (ArticleCasaVsBolsa.tsx), create a new page using the EXACT PDF content with:

| Section | Content from PDF |
|---------|------------------|
| **Lead Paragraph** | "En 2026 el mercado de la vivienda se presenta muy distinto..." |
| **H2: Por qué 2026 es un momento único** | Price forecasts, rent pressure, structural housing shortage |
| **H2: Los tipos hipotecarios se estabilizan** | Euribor 2.08% mid-2025, projected 2% by 2026, 0.4% lending growth |
| **H2: Hipoteca frente a alquiler: costes mensuales** | H3 for rents (studios €550, etc.) and H3 for mortgages (example: €250k at 3.5%) |
| **H2: Costes ocultos** | Buying costs (~15%) and renting costs |
| **H2: El coste de esperar** | €300k → €315k-€318k example |
| **H2: Construir patrimonio frente a pagar alquiler** | Equity accumulation, US stat ($23,500 in 2024) |
| **H2: Consideraciones de estilo de vida y flexibilidad** | 3 lifestyle factors |
| **H2: Consideraciones locales para Madrid y España** | Madrid 15%+ YoY, Murcia 7.4% yield, etc. |
| **H2: Cómo usar el simulador de HomeDecision** | 5-step numbered list |
| **H2: Conclusión** | Summary paragraph |

**E-E-A-T Elements included:**
- AuthorByline with "Por HomeDecision Research Team · Revisado para mayor precisión · X min de lectura · Última actualización"
- Expandable "Acerca de HomeDecision Research Team" box with link to /simulate
- Footer: "¿Has detectado un error o tienes sugerencias? Escríbenos a contact@homedecision.app"

**SEO Implementation:**
- `<html lang="es">`
- Unique `<title>`: "Alquilar o comprar en 2026: una guía de decisiones basada en datos | HomeDecision"
- Unique `<meta name="description">`: ~150 characters in Spanish
- Self-referencing `<link rel="canonical">` to Spanish URL
- `<meta name="robots" content="index,follow">`
- `hreflang` tags: es, en, x-default (linking to English counterpart)
- Open Graph and Twitter meta tags in Spanish
- JSON-LD structured data via `ArticleJsonLd` with `language="es"`

---

### Phase 3: Add Route to App

**File: `src/App.tsx`**

Add import and route:

```tsx
import ArticleAlquilarOComprar2026 from "./pages/ArticleAlquilarOComprar2026";

// In Routes under Spanish articles section:
<Route 
  path="/es/articles/alquilar-o-comprar-2026-guia-basada-en-datos" 
  element={<ArticleAlquilarOComprar2026 />} 
/>
```

---

### Phase 4: Update English Article

**File: `src/pages/ArticleRentVsBuy2026.tsx`**

Update `HreflangTags` to include the Spanish translation:

```tsx
<HreflangTags
  type="article"
  language="en"
  enSlug={ARTICLE_SLUG}
  esSlug="alquilar-o-comprar-2026-guia-basada-en-datos"
/>
```

---

### Phase 5: Update Sitemap

**File: `public/sitemap.xml`**

Add new entry:

```xml
<!-- Spanish Article: Alquilar o Comprar 2026 -->
<url>
  <loc>https://homedecision.app/es/articles/alquilar-o-comprar-2026-guia-basada-en-datos</loc>
  <lastmod>2026-02-03</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/pages/ArticleAlquilarOComprar2026.tsx` | CREATE | New Spanish article page with exact PDF content |
| `src/data/articleData.ts` | MODIFY | Add metadata + translation mapping |
| `src/App.tsx` | MODIFY | Add route for new Spanish article |
| `src/pages/ArticleRentVsBuy2026.tsx` | MODIFY | Update HreflangTags with Spanish slug |
| `public/sitemap.xml` | MODIFY | Add URL entry for SEO |

**Total: 1 new file, 4 modified files**

---

## SEO Compliance Checklist

- [x] `<html lang="es">`
- [x] Unique title in Spanish: "Alquilar o comprar en 2026: una guía de decisiones basada en datos | HomeDecision"
- [x] Unique description in Spanish (~150 characters)
- [x] Self-referencing canonical URL to Spanish path
- [x] `<meta name="robots" content="index,follow">`
- [x] hreflang tags: es + en + x-default (linked to English counterpart)
- [x] Open Graph meta tags in Spanish
- [x] Twitter Card meta tags in Spanish
- [x] JSON-LD structured data with `language="es"` (Article + BreadcrumbList)
- [x] Semantic H1 (title) + H2/H3 hierarchy
- [x] Internal links to /simulate and /es/articles
- [x] Added to sitemap.xml with priority 0.7 and changefreq monthly
- [x] Translation mapping added for bidirectional language switching

---

## E-E-A-T Compliance Checklist

- [x] Byline: "Por HomeDecision Research Team · Revisado para mayor precisión · X min de lectura · Última actualización {fecha}"
- [x] Expandable "Acerca de HomeDecision Research Team" section
- [x] Link to simulator: "Descubre cómo funciona HomeDecision" → /simulate
- [x] Footer feedback line: "¿Has detectado un error o tienes sugerencias? Escríbenos a contact@homedecision.app"

---

## Bilingual Integration

- [x] Language switcher showing EN | ES with ES highlighted as active
- [x] EN clickable (links to English counterpart)
- [x] Translation mapping in `articleTranslations` for bidirectional linking
- [x] English article updated with hreflang pointing to Spanish version

---

## Related Reading Section

The RelatedReading component will automatically:
- Show other published Spanish articles (currently: "Casa vs Bolsa")
- Fill remaining slots with "Próximamente" placeholders
- Always include simulator link: "Calcula tus números en el simulador → Probar ahora"

---

## Article Content Structure

The article will use exact PDF content with these components:
- `ArticleLayout` - Consistent page wrapper with navigation
- `ArticleHeader` - Title, lead paragraph, AuthorByline
- `ArticleSection` - Semantic content sections
- `ArticleCallout` - Key statistics highlights
- `ArticleCTA` - Simulator call-to-action at bottom
- `ArticleJsonLd` - Structured data with Spanish breadcrumbs
- `HreflangTags` - Bilingual SEO with translation link
- `RelatedReading` - Links to other Spanish articles + simulator
- `ArticleLanguageSwitcher` - EN/ES toggle in header
- `AvailableInLanguage` - "Also available in English" notice

