

# Add New English Article: "First-Time Home-Buyer Guide 2026"

## Overview

Create a new article page using the **exact content** from the uploaded PDF document. This article is a comprehensive step-by-step guide for first-time home buyers in 2026, covering mortgage rates, down payments, hidden costs, and specific programs in Spain and the US.

**Proposed slug:** `first-time-home-buyer-guide-2026`

**Full URL:** `/articles/first-time-home-buyer-guide-2026`

---

## Content Structure (from PDF)

The article contains the following sections that will be implemented verbatim:

| Section | Description |
|---------|-------------|
| **Lead** | "Buying your first home can feel overwhelming, but 2026 brings opportunities..." |
| **Why 2026 is unique** | Stable rates (~6.25%), seasonal advantages, improving inventory |
| **Step 1** | Assess finances and set a budget (affordability, down payment, credit) |
| **Step 2** | Research the market and define priorities |
| **Step 3** | Property search and due diligence (viewing, offers, contrato de arras) |
| **Step 4** | Secure financing (mortgage types, hidden costs) |
| **Step 5** | Closing (sign and register the property) |
| **Programmes** | Spain (hipoteca joven, grants) and US (FHA, VA, USDA) |
| **Common mistakes** | 5 mistakes to avoid |
| **Final thoughts** | Encouragement and summary |

---

## Category Decision

This article fits best in a **new category**: `first-time-buyers`

Reasoning: The existing categories focus on rent vs buy decisions, but this article is about the **buying process itself** - step-by-step guidance for someone who has already decided to buy.

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/pages/ArticleFirstTimeBuyer2026.tsx` | CREATE | New article page with exact PDF content |
| `src/data/articleData.ts` | MODIFY | Add article metadata entry |
| `src/data/topicCategories.ts` | MODIFY | Add "first-time-buyers" category |
| `src/App.tsx` | MODIFY | Add route for new article |
| `public/sitemap.xml` | MODIFY | Add URL entry |

**Total: 1 new file, 4 modified files**

---

## Implementation Details

### 1. Article Metadata

Add to `src/data/articleData.ts`:

```typescript
{
  slug: 'first-time-home-buyer-guide-2026',
  title: 'First-Time Home-Buyer Guide 2026',
  description: 'Everything first-time buyers need to know in 2026: mortgage rates around 6.25%, down payments, hidden costs, and step-by-step guidance for Spain and the US.',
  excerpt: 'Buying your first home in 2026? This guide covers stable mortgage rates, saving strategies, hidden costs, and step-by-step advice for Spain and the US markets.',
  publishedDate: '2026-02-08',
  modifiedDate: '2026-02-08',
  wordCount: 2100,
  category: 'first-time-buyers',
  isPublished: true,
  language: 'en',
}
```

### 2. New Topic Category

Add to both English and Spanish arrays in `src/data/topicCategories.ts`:

**English:**
```typescript
{
  id: 'first-time-buyers',
  name: 'First-Time Buyer Guides',
  description: 'Step-by-step guides for new homebuyers.',
  articleSlugs: ['first-time-home-buyer-guide-2026'],
}
```

**Spanish (placeholder):**
```typescript
{
  id: 'first-time-buyers',
  name: 'Guias para Compradores Primerizos',
  description: 'Guias paso a paso para nuevos compradores de vivienda.',
  articleSlugs: [],
}
```

### 3. Route in App.tsx

```tsx
import ArticleFirstTimeBuyer2026 from "./pages/ArticleFirstTimeBuyer2026";

// Add route:
<Route 
  path="/articles/first-time-home-buyer-guide-2026" 
  element={<ArticleFirstTimeBuyer2026 />} 
/>
```

### 4. Sitemap Entry

```xml
<url>
  <loc>https://homedecision.app/articles/first-time-home-buyer-guide-2026</loc>
  <lastmod>2026-02-08</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

---

## Article Page Structure

Following the exact pattern from `ArticleRentVsBuy2026.tsx`:

```text
+--------------------------------------------------+
| Helmet (SEO meta tags, OG, Twitter)              |
+--------------------------------------------------+
| ArticleJsonLd (structured data)                  |
+--------------------------------------------------+
| ArticleLayout                                    |
|   +----------------------------------------------+
|   | Language Switcher (EN active, no ES yet)    |
|   +----------------------------------------------+
|   | ArticleHeader (title, lead, byline)         |
|   +----------------------------------------------+
|   | Article Body                                 |
|   |   - H2: Why 2026 is unique                  |
|   |     - H3: Stable, but elevated rates        |
|   |     - H3: Seasonal advantages               |
|   |     - H3: Improving inventory               |
|   |   - H2: Step 1 - Assess finances            |
|   |     - H3: Calculate affordability           |
|   |     - H3: Save for down payment             |
|   |     - H3: Strengthen credit                 |
|   |     - ArticleCallout (40% debt rule)        |
|   |   - H2: Step 2 - Research the market        |
|   |   - H2: Step 3 - Property search            |
|   |     - H3: View homes                        |
|   |     - H3: Make an offer                     |
|   |     - ArticleCallout (arras deposit)        |
|   |   - H2: Step 4 - Secure financing           |
|   |     - H3: Mortgage types                    |
|   |     - H3: Hidden costs                      |
|   |     - ArticleCallout (10-15% extra costs)   |
|   |   - H2: Step 5 - Closing                    |
|   |   - H2: Programmes and incentives           |
|   |   - H2: Avoid common mistakes               |
|   |   - H2: Final thoughts                      |
|   +----------------------------------------------+
|   | RelatedReading                               |
|   +----------------------------------------------+
|   | ArticleCTA (simulator link)                 |
|   +----------------------------------------------+
|   | ArticleFooter                               |
|   +----------------------------------------------+
+--------------------------------------------------+
```

---

## Key Callouts (from PDF data)

The following statistics will be highlighted using `ArticleCallout`:

1. **2026 Mortgage Rates:**
   "US: low 6% range, hovering near 6.25% | Spain: 3.17% average (October 2025)"

2. **Debt-to-Income Rule:**
   "Keep total monthly debts under 40% of net income; mortgage around one-third"

3. **Earnest Money (Spain):**
   "Sign contrato de arras with 10% deposit - lose it if you back out; seller pays double if they back out"

4. **Hidden Costs:**
   "Budget 10-15% of purchase price on top of down payment for taxes, notary, registration"

---

## SEO Implementation

Following the established pattern:

- `<html lang="en">`
- Unique `<title>`: "First-Time Home-Buyer Guide 2026 | HomeDecision"
- Unique `<meta name="description">`
- `<meta name="robots" content="index,follow">`
- Self-referencing canonical URL
- Open Graph and Twitter meta tags
- JSON-LD structured data via `ArticleJsonLd`
- **No hreflang tags** (no Spanish translation yet)
- **No AvailableInLanguage** component (no translation available)

---

## E-E-A-T Components

- AuthorByline with reading time and last updated date
- ArticleFooter with feedback email
- RelatedReading linking to other published articles
- ArticleCTA linking to the simulator

---

## Verbatim Content Usage

The article body will use the **exact text** from the PDF, including:
- All section headings (H2, H3)
- All bullet points and numbered lists
- Specific data points (rates, percentages, deposit amounts)
- Programme names (FHA, VA, USDA, hipoteca joven)
- Source references stripped (footnote numbers removed for cleaner display)

---

## Crawl Path Verification

After implementation:
- Homepage -> /articles -> Article (2 clicks)
- /articles hub will automatically show the new article via `getPublishedArticles()`
- New category "First-Time Buyer Guides" will appear in topic hubs

