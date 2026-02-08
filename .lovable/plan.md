

# Create Spanish Article: "Guía para comprar tu primera vivienda en 2026"

## Overview

Create the Spanish translation of the First-Time Home-Buyer Guide 2026 article using the **exact content** from the uploaded PDF (`primera_vivienda.pdf`). This article will be linked bidirectionally with its English counterpart through the translation mapping system.

**Proposed slug:** `guia-comprar-primera-vivienda-2026`

**Full URL:** `/es/articles/guia-comprar-primera-vivienda-2026`

**English counterpart:** `/articles/first-time-home-buyer-guide-2026`

---

## Content Structure (from PDF)

| Section | Spanish Title |
|---------|---------------|
| **Lead** | "Comprar tu primera vivienda puede resultar abrumador, pero 2026 ofrece oportunidades..." |
| **H2: Por qué 2026 es especial** | Tipos estables (~6%), ventajas estacionales, más oferta |
| **H2: Paso 1** | Evalúa tus finanzas y fija un presupuesto |
| **H2: Paso 2** | Investiga el mercado y define tus prioridades |
| **H2: Paso 3** | Inicia tu búsqueda y realiza las comprobaciones |
| **H2: Paso 4** | Obtén financiación y formaliza la hipoteca |
| **H2: Paso 5** | Cierre: firma y registra la vivienda |
| **H2: Programas** | Ayudas para 2026 (hipoteca joven, FHA, VA, USDA) |
| **H2: Errores** | Evita los errores habituales |
| **H2: Conclusión** | Comprar tu primera vivienda en 2026 es posible... |

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/pages/ArticleGuiaComprarPrimeraVivienda2026.tsx` | CREATE | New Spanish article page with exact PDF content |
| `src/data/articleData.ts` | MODIFY | Add Spanish article metadata + translation mapping |
| `src/data/topicCategories.ts` | MODIFY | Add Spanish article slug to first-time-buyers category |
| `src/pages/ArticleFirstTimeBuyer2026.tsx` | MODIFY | Add HreflangTags, LanguageSwitcher, AvailableInLanguage |
| `src/App.tsx` | MODIFY | Add route for Spanish article |
| `public/sitemap.xml` | MODIFY | Add Spanish URL entry |

**Total: 1 new file, 5 modified files**

---

## Technical Implementation

### 1. Spanish Article Metadata

Add to `articlesEs` array in `src/data/articleData.ts`:

```typescript
{
  slug: 'guia-comprar-primera-vivienda-2026',
  title: 'Guía para comprar tu primera vivienda en 2026',
  description: 'Todo lo que los compradores primerizos necesitan saber en 2026: tipos hipotecarios en torno al 6,25%, entrada, costes ocultos y guía paso a paso para España y EE.UU.',
  excerpt: '¿Compras tu primera vivienda en 2026? Esta guía cubre tipos hipotecarios estables, estrategias de ahorro, costes ocultos y consejos paso a paso para España y EE.UU.',
  publishedDate: '2026-02-08',
  modifiedDate: '2026-02-08',
  wordCount: 2100,
  category: 'first-time-buyers',
  isPublished: true,
  language: 'es',
}
```

### 2. Translation Mapping

Add to `articleTranslations` in `src/data/articleData.ts`:

```typescript
'first-time-home-buyer-guide-2026': 'guia-comprar-primera-vivienda-2026',
```

### 3. Topic Category Update

Add Spanish article slug to `first-time-buyers` category in `topicCategoriesEs`:

```typescript
{
  id: 'first-time-buyers',
  name: 'Guías para Compradores Primerizos',
  description: 'Guías paso a paso para nuevos compradores de vivienda.',
  articleSlugs: ['guia-comprar-primera-vivienda-2026'],
}
```

### 4. Spanish Article Page

Following the pattern from `ArticleAlquilarOComprar2026.tsx`:

- `<html lang="es">`
- `HreflangTags` with `enSlug` and `esSlug` for bidirectional linking
- `ArticleJsonLd` with `language="es"`
- `ArticleLanguageSwitcher` showing ES active, EN linked
- `AvailableInLanguage` showing "Available in English" notice
- `RelatedReading` with `language="es"` and `basePath="/es/articles"`
- Spanish CTA text: "Simula tu escenario en nuestra calculadora de alquiler vs compra"
- Back link to `/es/articles` with "Volver a Artículos"

### 5. Update English Article

Modify `ArticleFirstTimeBuyer2026.tsx` to add:

- Import `Link`, `ArrowLeft`, `HreflangTags`, `ArticleLanguageSwitcher`, `AvailableInLanguage`
- Import `getTranslationSlug` function
- Add language switcher showing EN active, ES linked
- Add `HreflangTags` component with both slugs
- Add "Available in Spanish" notice
- Add back link to `/articles`

### 6. App Router

```tsx
import ArticleGuiaComprarPrimeraVivienda2026 from "./pages/ArticleGuiaComprarPrimeraVivienda2026";

// Add route in Spanish articles section:
<Route 
  path="/es/articles/guia-comprar-primera-vivienda-2026" 
  element={<ArticleGuiaComprarPrimeraVivienda2026 />} 
/>
```

### 7. Sitemap Entry

```xml
<!-- Spanish Article: Guía para comprar tu primera vivienda en 2026 -->
<url>
  <loc>https://homedecision.app/es/articles/guia-comprar-primera-vivienda-2026</loc>
  <lastmod>2026-02-08</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

---

## SEO Implementation

### Spanish Article
- `<html lang="es">`
- `<title>`: "Guía para comprar tu primera vivienda en 2026 | HomeDecision"
- Self-referencing canonical: `/es/articles/guia-comprar-primera-vivienda-2026`
- `<meta name="robots" content="index,follow">`
- Hreflang tags linking to English version

### English Article (update)
- Add `HreflangTags` linking to Spanish version
- Add `ArticleLanguageSwitcher` for visible language toggle
- Add `AvailableInLanguage` notice

### Hreflang Structure (both pages)
```html
<link rel="alternate" hreflang="en" href="https://homedecision.app/articles/first-time-home-buyer-guide-2026" />
<link rel="alternate" hreflang="es" href="https://homedecision.app/es/articles/guia-comprar-primera-vivienda-2026" />
<link rel="alternate" hreflang="x-default" href="https://homedecision.app/articles/first-time-home-buyer-guide-2026" />
```

---

## Key Callouts (Spanish content from PDF)

1. **Tipos hipotecarios 2026:**
   "EE.UU.: en torno al 6 %, cerca del 6,25 % | España: 3,17 % de media (octubre 2025)"

2. **Regla del 40%:**
   "Las deudas mensuales no deben superar el 40 % de los ingresos netos; la cuota hipotecaria, en torno a un tercio"

3. **Contrato de arras:**
   "Firma el contrato de arras con un 10 % de señal. Si te retiras, pierdes la señal; si el vendedor se retira, te devuelve el doble"

4. **Costes ocultos:**
   "Presupuesta entre un 10 y un 15 % del precio de compra además de la entrada para impuestos, notaría y registro"

---

## Article Content Structure

The Spanish article page will include the exact PDF content:

### Lead Paragraph (verbatim)
"Comprar tu primera vivienda puede resultar abrumador, pero 2026 ofrece oportunidades para los compradores bien preparados. Se espera que los tipos hipotecarios se estabilicen en torno al 6 %, y algunos analistas creen que se mantendrán cerca del 6,25 % durante la mayor parte del año. En España, el tipo hipotecario medio rondaba el 3,17 % en octubre de 2025, y los compradores suelen tener que aportar entre el 10 y el 15 % del precio de compra para cubrir impuestos, notaría y registro. Tanto si buscas en Madrid como en Miami, los fundamentos son los mismos: conoce tu presupuesto, fortalece tu historial crediticio, ahorra una entrada sólida y sigue un proceso disciplinado. Esta guía resume cada paso, resalta los costes ocultos y las ayudas disponibles y ofrece consejos actualizados para que los compradores primerizos tengan éxito en 2026."

### All sections as H2/H3 following PDF structure
- Por qué 2026 es especial para los compradores primerizos
  - Tipos estables, pero aún elevados
  - Ventajas estacionales
  - Más oferta y programas de ayuda
- Paso 1 – Evalúa tus finanzas y fija un presupuesto
  - Calcula cuánto puedes pagar
  - Ahorra para la entrada y los costes finales
  - Refuerza tu crédito y consigue la preaprobación
- Paso 2 – Investiga el mercado y define tus prioridades
- Paso 3 – Inicia tu búsqueda y realiza las comprobaciones pertinentes
  - Visita viviendas y haz preguntas
  - Haz una oferta y negocia
- Paso 4 – Obtén financiación y formaliza la hipoteca
  - Elige el tipo de hipoteca adecuado
  - Cuidado con los costes ocultos
- Paso 5 – Cierre: firma y registra la vivienda
- Programas y ayudas para 2026
- Evita los errores habituales (bulleted list)
- Conclusión

---

## Crawl Path Verification

After implementation:
- Homepage → /es/articles → Spanish article (2 clicks)
- English article ↔ Spanish article (bidirectional via language switcher)
- `/es/articles` hub will automatically show the new article via `getPublishedSpanishArticles()`

