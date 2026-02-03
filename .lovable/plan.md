
# E-E-A-T Article Framework Implementation Plan

## Overview
Implement a comprehensive E-E-A-T framework for the `/articles` section including JSON-LD structured data, author bylines, reading time calculations, topic hub navigation, and related article recommendations.

---

## Current State Analysis
- Editorial template system exists with `ArticleLayout`, `ArticleHeader`, `ArticleSection`, `ArticleCallout`, `ArticleCTA` components
- Single article published at `/articles/house-vs-stocks-what-the-data-really-says`
- Basic reading time (hardcoded) and publication date already displayed
- No structured data, author bylines, or internal linking system

---

## Implementation Architecture

```text
src/
  components/
    articles/
      ArticleJsonLd.tsx           # NEW - JSON-LD structured data
      AuthorByline.tsx            # NEW - Byline + About section
      RelatedReading.tsx          # NEW - Related articles section
      ArticleFooter.tsx           # NEW - Feedback section
      TopicHub.tsx                # NEW - Category cards for /articles
      index.ts                    # UPDATE - Export new components
  data/
    articleData.ts                # NEW - Centralized article metadata
    topicCategories.ts            # NEW - Topic hub data
    futureArticles.ts             # NEW - Content roadmap (internal)
  pages/
    Articles.tsx                  # UPDATE - Add topic hub section
    ArticleHouseVsStocks.tsx      # UPDATE - Apply full E-E-A-T framework
```

---

## Files to Create

### 1. `src/data/articleData.ts`
Centralized article metadata store containing:
- slug, title, description, excerpt
- publishedDate, modifiedDate
- wordCount (for reading time calculation)
- category/topic tags
- canonicalUrl

### 2. `src/data/topicCategories.ts`
Topic hub categories:
- Rent vs Buy Fundamentals
- Mortgages & Interest Rates
- Hidden Costs & Maintenance
- Opportunity Cost & Investing
- Behavioral Finance & Decision Biases
- Scenarios & Case Studies

Each with short description and list of article slugs.

### 3. `src/data/futureArticles.ts`
Content roadmap with planned articles:
1. rent-vs-buy-the-complete-decision-framework
2. hidden-costs-of-homeownership
3. how-interest-rates-change-rent-vs-buy
4. opportunity-cost-down-payment
5. how-long-should-you-stay-for-buying-to-make-sense
6. renting-is-not-wasting-money-when-its-smart
7. behavioral-finance-why-people-dont-invest-the-difference
8. case-study-madrid-rent-vs-buy-example

### 4. `src/components/articles/ArticleJsonLd.tsx`
Component that injects JSON-LD into `<head>` via react-helmet-async:

**Article Schema (schema.org/Article):**
- @type: "Article"
- headline: H1 title
- description: meta description
- author: { @type: "Organization", name: "HomeDecision Research Team" }
- publisher: { @type: "Organization", name: "HomeDecision", logo: site logo URL }
- datePublished, dateModified
- mainEntityOfPage: canonical URL
- image: omitted if no hero image

**BreadcrumbList Schema:**
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "position": 1, "name": "Home", "item": "https://homedecision.app" },
    { "position": 2, "name": "Articles", "item": "https://homedecision.app/articles" },
    { "position": 3, "name": "Article Title" }
  ]
}
```

### 5. `src/components/articles/AuthorByline.tsx`
Byline block with:
- Format: "By HomeDecision Research Team · Reviewed for accuracy · X min read · Last updated Date"
- Collapsible "About the author" section using existing Collapsible UI component
- About text: trust-focused description (no sales language)
- Subtle link: "Learn how HomeDecision works" pointing to /simulate

### 6. `src/components/articles/RelatedReading.tsx`
Related articles section:
- Lists 3-6 related articles (when available)
- Shows "Coming soon" placeholder for unpublished articles
- Always includes: "Run your numbers in the simulator" linking to /simulate
- Clean card-based design matching existing aesthetic

### 7. `src/components/articles/ArticleFooter.tsx`
Footer section with:
- Feedback line: "Have feedback or spotted an issue? Email us at contact@homedecision.app"
- Plain text, no mailto link

### 8. `src/components/articles/TopicHub.tsx`
Topic hub for /articles page:
- Section title: "Explore topics"
- Grid of category cards
- Each card shows: category name, 1-sentence description, article count or "Coming soon"
- Non-spammy, clean editorial design

---

## Files to Modify

### 1. `src/components/articles/index.ts`
Add exports for new components:
- ArticleJsonLd
- AuthorByline
- RelatedReading
- ArticleFooter
- TopicHub

### 2. `src/components/articles/ArticleHeader.tsx`
Update to:
- Calculate reading time from wordCount (220 words/minute) instead of hardcoded value
- Accept modifiedDate prop for "Last updated"
- Integrate AuthorByline component

### 3. `src/pages/Articles.tsx`
Add:
- TopicHub section below intro text
- Keep existing article list

### 4. `src/pages/ArticleHouseVsStocks.tsx`
Apply full E-E-A-T framework:
- Add ArticleJsonLd component with structured data
- Update ArticleHeader with modifiedDate
- Replace hardcoded readingTime with wordCount-based calculation
- Add RelatedReading section before ArticleCTA
- Add ArticleFooter with feedback line

---

## Reading Time Calculation

```typescript
function calculateReadingTime(wordCount: number): number {
  const wordsPerMinute = 220;
  return Math.ceil(wordCount / wordsPerMinute);
}
```

For the existing article, approximate word count: ~1,100 words = 5 min read

---

## Structured Data Output Example

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "House vs Stocks: What the Data Really Says About Building Wealth",
      "description": "Buying a home or investing in stocks? We break down real data...",
      "author": {
        "@type": "Organization",
        "name": "HomeDecision Research Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "HomeDecision",
        "logo": {
          "@type": "ImageObject",
          "url": "https://homedecision.app/favicon.png"
        }
      },
      "datePublished": "2025-01-15",
      "dateModified": "2025-02-03",
      "mainEntityOfPage": "https://homedecision.app/articles/house-vs-stocks-what-the-data-really-says"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [...]
    }
  ]
}
```

---

## Author Byline Visual Structure

```text
┌─────────────────────────────────────────────────────────────┐
│ By HomeDecision Research Team · Reviewed for accuracy       │
│ 5 min read · Last updated February 3, 2025                  │
├─────────────────────────────────────────────────────────────┤
│ ▼ About HomeDecision Research Team                          │
│   HomeDecision Research Team publishes data-driven housing  │
│   and financial decision insights. Our goal is to clarify   │
│   trade-offs in renting, buying, and long-term planning     │
│   using transparent assumptions and practical reasoning.    │
│   We do not sell real estate and we do not receive          │
│   commissions from banks or agents.                         │
│                                                             │
│   Learn how HomeDecision works →                            │
└─────────────────────────────────────────────────────────────┘
```

---

## Topic Hub Visual Structure

```text
┌── Explore topics ──────────────────────────────────────────┐
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │ Rent vs Buy     │  │ Mortgages &     │  │ Hidden      │ │
│  │ Fundamentals    │  │ Interest Rates  │  │ Costs       │ │
│  │ Core decision   │  │ How financing   │  │ What        │ │
│  │ frameworks      │  │ affects choice  │  │ calculators │ │
│  │ 1 article       │  │ Coming soon     │  │ miss        │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │ Opportunity     │  │ Behavioral      │  │ Scenarios   │ │
│  │ Cost & Invest   │  │ Finance         │  │ & Cases     │ │
│  │ Trade-offs of   │  │ Why people      │  │ Real-world  │ │
│  │ capital         │  │ don't act       │  │ examples    │ │
│  │ Coming soon     │  │ rationally      │  │ Coming soon │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Files Summary

| Action | File |
|--------|------|
| CREATE | `src/data/articleData.ts` |
| CREATE | `src/data/topicCategories.ts` |
| CREATE | `src/data/futureArticles.ts` |
| CREATE | `src/components/articles/ArticleJsonLd.tsx` |
| CREATE | `src/components/articles/AuthorByline.tsx` |
| CREATE | `src/components/articles/RelatedReading.tsx` |
| CREATE | `src/components/articles/ArticleFooter.tsx` |
| CREATE | `src/components/articles/TopicHub.tsx` |
| MODIFY | `src/components/articles/index.ts` |
| MODIFY | `src/components/articles/ArticleHeader.tsx` |
| MODIFY | `src/pages/Articles.tsx` |
| MODIFY | `src/pages/ArticleHouseVsStocks.tsx` |

**Total: 8 new files, 4 modified files**

---

## Technical Notes

- JSON-LD injected via `react-helmet-async` using `<script type="application/ld+json">`
- Collapsible "About" section uses existing `@radix-ui/react-collapsible` component
- Base URL for canonical URLs: `https://homedecision.app`
- Logo URL for publisher: `https://homedecision.app/favicon.png`
- All dates use ISO format internally, formatted for display with `date-fns` (already installed)
