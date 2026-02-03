
# Spanish Articles Section Implementation Plan

## Overview
Create a Spanish-language editorial section at `/es/articles` that mirrors the structure, quality, and E-E-A-T standards of the English `/articles` section, treating Spanish content as first-class editorial content.

---

## Architecture Approach

The implementation will create parallel Spanish data structures and components that follow the same patterns as the English editorial system while maintaining full separation of content.

```text
src/
  data/
    articleData.ts              # UPDATE - Add Spanish articles + helpers
    topicCategories.ts          # UPDATE - Add Spanish topic categories
    futureArticles.ts           # UPDATE - Add Spanish future articles
  components/
    articles/
      AuthorByline.tsx          # UPDATE - Support Spanish text
      RelatedReading.tsx        # UPDATE - Support Spanish links
      TopicHub.tsx              # UPDATE - Support Spanish categories
      ArticleJsonLd.tsx         # UPDATE - Support /es/ base path
  pages/
    ArticlesEs.tsx              # NEW - Spanish articles listing page
    ArticleCasaVsBolsa.tsx      # NEW - Spanish article page
  App.tsx                       # UPDATE - Add Spanish routes
```

---

## Files to Create

### 1. `src/pages/ArticlesEs.tsx`
Spanish articles listing page mirroring `/articles`:

- SEO title: "Artículos sobre Vivienda y Decisiones Financieras | HomeDecision"
- Intro text in Spanish (provided in requirements)
- Spanish TopicHub section
- List of published Spanish articles
- `lang="es"` on html element via Helmet

### 2. `src/pages/ArticleCasaVsBolsa.tsx`
Full Spanish article applying E-E-A-T framework:

- ArticleJsonLd with Spanish metadata
- ArticleHeader with Spanish lead paragraph
- Spanish AuthorByline text
- Full article content (provided in requirements)
- Spanish RelatedReading section
- Spanish ArticleCTA linking to /simulate
- Spanish ArticleFooter
- `lang="es"` on html element

---

## Files to Modify

### 1. `src/data/articleData.ts`
Add Spanish articles data structure:

```typescript
export interface ArticleMetadata {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  publishedDate: string;
  modifiedDate: string;
  wordCount: number;
  category: string;
  isPublished: boolean;
  language: 'en' | 'es';  // NEW FIELD
}

// Add Spanish article
export const articlesEs: ArticleMetadata[] = [
  {
    slug: 'casa-vs-bolsa-lo-que-dicen-los-datos',
    title: 'Casa vs Bolsa: Lo que los datos realmente dicen sobre la creación de riqueza',
    description: '¿Comprar una vivienda o invertir en bolsa? Analizamos datos reales...',
    excerpt: '¿Comprar una vivienda o invertir en bolsa? Datos reales y patrones...',
    publishedDate: '2025-02-03',
    modifiedDate: '2025-02-03',
    wordCount: 950,
    category: 'rent-vs-buy-fundamentals',
    isPublished: true,
    language: 'es',
  },
];

// Helper functions for Spanish articles
export function getSpanishArticleBySlug(slug: string): ArticleMetadata | undefined
export function getPublishedSpanishArticles(): ArticleMetadata[]
export function getSpanishCanonicalUrl(slug: string): string
```

### 2. `src/data/topicCategories.ts`
Add Spanish topic categories:

```typescript
export const topicCategoriesEs: TopicCategory[] = [
  {
    id: 'rent-vs-buy-fundamentals',
    name: 'Fundamentos Alquilar vs Comprar',
    description: 'Marcos de decisión para comparar alquiler y compra.',
    articleSlugs: ['casa-vs-bolsa-lo-que-dicen-los-datos'],
  },
  // ... other categories in Spanish
];
```

### 3. `src/data/futureArticles.ts`
Add Spanish content roadmap:

```typescript
export const futureArticlesEs: FutureArticle[] = [
  {
    slug: 'alquilar-vs-comprar-marco-completo',
    title: 'Alquilar vs Comprar: Marco Completo de Decisión',
    category: 'rent-vs-buy-fundamentals',
    priority: 1,
  },
  // ... Spanish equivalents of English roadmap
];
```

### 4. `src/components/articles/AuthorByline.tsx`
Add language prop for Spanish text:

```typescript
interface AuthorBylineProps {
  wordCount: number;
  modifiedDate: string;
  language?: 'en' | 'es';  // NEW
}

// Spanish text:
// "Por HomeDecision Research Team"
// "Revisado para mayor precisión"
// "X min de lectura"
// "Última actualización {date}"
// "Acerca de HomeDecision Research Team"
// About text in Spanish (trust-focused, not salesy)
// "Descubre cómo funciona HomeDecision →"
```

### 5. `src/components/articles/RelatedReading.tsx`
Add language prop for Spanish links and text:

```typescript
interface RelatedReadingProps {
  currentSlug: string;
  language?: 'en' | 'es';  // NEW
  basePath?: string;       // '/articles' or '/es/articles'
}

// Spanish text:
// "Lecturas relacionadas"
// "Leer artículo"
// "Próximamente"
// "Calcula tus números en el simulador"
// "Probar ahora"
```

### 6. `src/components/articles/TopicHub.tsx`
Add language prop for Spanish categories:

```typescript
interface TopicHubProps {
  language?: 'en' | 'es';  // NEW
  basePath?: string;       // '/articles' or '/es/articles'
}

// Use topicCategoriesEs when language='es'
```

### 7. `src/components/articles/ArticleJsonLd.tsx`
Support Spanish base URL:

```typescript
interface ArticleJsonLdProps {
  // existing props...
  language?: 'en' | 'es';  // NEW
}

// When language='es', use:
// canonicalUrl: `${BASE_URL}/es/articles/${slug}`
// Breadcrumb: Home > Artículos > {title}
```

### 8. `src/App.tsx`
Add Spanish routes:

```typescript
import ArticlesEs from "./pages/ArticlesEs";
import ArticleCasaVsBolsa from "./pages/ArticleCasaVsBolsa";

// Add routes:
<Route path="/es/articles" element={<ArticlesEs />} />
<Route path="/es/articles/casa-vs-bolsa-lo-que-dicen-los-datos" element={<ArticleCasaVsBolsa />} />
```

---

## Spanish Article Content Structure

The article at `/es/articles/casa-vs-bolsa-lo-que-dicen-los-datos` will follow this structure:

```text
ArticleLayout
  Helmet (lang="es")
  ArticleJsonLd (Spanish metadata)
  
  ArticleHeader
    H1: "Casa vs Bolsa: Lo que los datos realmente dicen..."
    Lead: (intro paragraphs - no heading)
    AuthorByline (Spanish)
  
  ArticleBody
    H2: "Una perspectiva experta sobre la riqueza a largo plazo"
    H2: "Los dos grandes motores de la riqueza familiar"
      - Bullet list (Spanish)
    H2: "Por qué la vivienda suele funcionar en la práctica"
      - Bullet list (Spanish)
    H2: "El gran mito: 'alquilo e invierto la diferencia'"
    H2: "Cuándo alquilar sí tiene sentido"
      - Bullet list (Spanish)
    H2: "Por qué el consejo genérico no funciona"
    H2: "El valor de la simulación personalizada"
    H2: "Transparencia e independencia"
      - Bullet list (Spanish)
    H2: "Explora tu propio escenario"
  
  RelatedReading (Spanish)
  ArticleCTA
    Text: "Explora tu escenario de alquiler vs compra →"
    Link: /simulate
  ArticleFooter (Spanish)
```

---

## Spanish UI Strings

| Component | English | Spanish |
|-----------|---------|---------|
| AuthorByline | By HomeDecision Research Team | Por HomeDecision Research Team |
| AuthorByline | Reviewed for accuracy | Revisado para mayor precisión |
| AuthorByline | X min read | X min de lectura |
| AuthorByline | Last updated | Última actualización |
| AuthorByline | About... | Acerca de... |
| AuthorByline | Learn how HomeDecision works | Descubre cómo funciona HomeDecision |
| RelatedReading | Related reading | Lecturas relacionadas |
| RelatedReading | Read article | Leer artículo |
| RelatedReading | Coming soon | Próximamente |
| RelatedReading | Run your numbers... | Calcula tus números en el simulador |
| RelatedReading | Try it now | Probar ahora |
| TopicHub | Explore topics | Explorar temas |
| TopicHub | X article(s) | X artículo(s) |
| ArticleFooter | Have feedback... | ¿Tienes comentarios o detectaste un error? Escríbenos a contact@homedecision.app |
| ArticleCTA | Explore your own... | Explora tu escenario de alquiler vs compra |
| Breadcrumb | Articles | Artículos |

---

## Spanish Topic Categories

| English | Spanish |
|---------|---------|
| Rent vs Buy Fundamentals | Fundamentos Alquilar vs Comprar |
| Mortgages & Interest Rates | Hipotecas y Tipos de Interés |
| Hidden Costs & Maintenance | Costes Ocultos y Mantenimiento |
| Opportunity Cost & Investing | Coste de Oportunidad e Inversión |
| Behavioral Finance & Decision Biases | Finanzas Conductuales y Sesgos |
| Scenarios & Case Studies | Escenarios y Casos de Estudio |

---

## SEO & Language Configuration

For Spanish pages:
- Add `<html lang="es">` via Helmet
- Set canonical URL to `/es/articles/{slug}`
- Breadcrumb schema uses Spanish labels
- All meta descriptions in Spanish

---

## Files Summary

| Action | File |
|--------|------|
| CREATE | `src/pages/ArticlesEs.tsx` |
| CREATE | `src/pages/ArticleCasaVsBolsa.tsx` |
| MODIFY | `src/data/articleData.ts` |
| MODIFY | `src/data/topicCategories.ts` |
| MODIFY | `src/data/futureArticles.ts` |
| MODIFY | `src/components/articles/AuthorByline.tsx` |
| MODIFY | `src/components/articles/RelatedReading.tsx` |
| MODIFY | `src/components/articles/TopicHub.tsx` |
| MODIFY | `src/components/articles/ArticleJsonLd.tsx` |
| MODIFY | `src/App.tsx` |

**Total: 2 new files, 8 modified files**

---

## Design Notes

- Spanish content treated as first-class, not secondary
- No auto-translation from English
- Same professional editorial aesthetic
- Same E-E-A-T signals and trust framework
- Prepared for future Spanish articles using same template
- Clean separation between English and Spanish content
