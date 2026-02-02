
# Editorial Article Template Improvement Plan

## Overview
Create a reusable, professional editorial article template with proper semantic HTML hierarchy, optimized typography, and consistent styling that can be used for all current and future articles under `/articles`.

---

## Current Issues Identified

1. **Typography plugin not configured** - `@tailwindcss/typography` is installed but not added to `tailwind.config.ts` plugins
2. **Inline prose classes** - Article uses raw `prose` classes without plugin support
3. **No reusable template** - Each article page duplicates layout structure
4. **Missing intro paragraph** - No styled intro/lead paragraph after H1
5. **Quote styling** - Key quote block uses basic italic styling
6. **Inconsistent section spacing** - No clear visual rhythm between sections

---

## Solution Architecture

```text
src/
  components/
    articles/
      ArticleLayout.tsx       # NEW - Reusable article wrapper
      ArticleHeader.tsx       # NEW - H1 + optional subtitle/intro
      ArticleSection.tsx      # NEW - Semantic section wrapper
      ArticleCallout.tsx      # NEW - Highlight/quote blocks
      ArticleCTA.tsx          # NEW - Footer CTA component
  pages/
    Articles.tsx              # Listing page (minor updates)
    ArticleHouseVsStocks.tsx  # Apply new template
```

---

## Files to Create

### 1. `src/components/articles/ArticleLayout.tsx`
Reusable wrapper providing:
- Max-width container optimized for reading (max-w-prose or ~700px)
- Consistent padding and spacing
- Back navigation link
- Article footer with divider
- SEO-friendly semantic structure

### 2. `src/components/articles/ArticleHeader.tsx`
Article header component with:
- Single H1 title with display font
- Optional lead/intro paragraph with larger, distinguished styling
- Clear vertical spacing

### 3. `src/components/articles/ArticleSection.tsx`
Section wrapper ensuring:
- Consistent spacing between major sections
- Semantic HTML structure

### 4. `src/components/articles/ArticleCallout.tsx`
Highlight block for:
- Key insights or quotes
- Subtle background styling (accent color)
- Left border accent
- Visually distinct but not promotional

### 5. `src/components/articles/ArticleCTA.tsx`
Footer CTA section with:
- Divider line
- Soft call-to-action
- Clean separation from article body

---

## Files to Modify

### 1. `tailwind.config.ts`
Add typography plugin to enable proper prose styling:
```js
plugins: [
  require("tailwindcss-animate"),
  require("@tailwindcss/typography")
]
```

### 2. `src/index.css`
Add custom article typography styles:
- `.article-body` - Base article content styling
- `.article-lead` - Lead paragraph styling
- `.article-callout` - Callout block styling
- Proper H2/H3 hierarchy with visual contrast

### 3. `src/pages/ArticleHouseVsStocks.tsx`
Refactor to use new template components:
- Use `ArticleLayout` wrapper
- Use `ArticleHeader` for title
- Add intro lead paragraph (no heading, just introductory text)
- Use `ArticleCallout` for the key quote
- Use `ArticleCTA` for footer
- Maintain exact content wording

---

## Template Structure Applied to Article

```text
ArticleLayout
  ArticleHeader
    H1: "House vs Stocks: What the Data Really Says..."
    Lead: (short intro paragraph - no heading)
  
  ArticleBody (prose styling)
    Section: H2 "Introduction: Why the Rent vs Buy..."
      - 3 paragraphs
    
    Section: H2 "An Expert Perspective..."
      - 2 paragraphs
    
    Section: H2 "The Two Main Drivers..."
      - 1 paragraph + bullet list + 1 paragraph
    
    Section: H2 "Why Homeownership Often Works..."
      - 2 paragraphs + bullet list + 1 paragraph
    
    Section: H2 "The Myth of 'Rent and Invest...'"
      - 3 paragraphs
    
    Section: H2 "When Renting Makes Sense"
      - 1 paragraph + bullet list + 1 paragraph
    
    Section: H2 "Why Generic Advice Fails"
      - 1 paragraph + bullet list + 1 paragraph
    
    Section: H2 "The Role of Personalized Simulation"
      - 2 paragraphs
      - ArticleCallout: "What happens in my situation..."
      - 1 paragraph
    
    Section: H2 "Transparency and Independence"
      - 1 paragraph + bullet list + 1 paragraph
    
    Section: H2 "Explore Your Own Scenario"
      - 3 paragraphs
  
  ArticleCTA
    - Divider
    - Button: "Explore your own rent vs buy scenario"
    - Back link to /articles
```

---

## Typography Styling Details

| Element | Style |
|---------|-------|
| H1 | 2.5-3rem, bold, display font, tight leading |
| H2 | 1.5-1.75rem, semibold, display font, top margin 3rem |
| Lead paragraph | 1.25rem, lighter weight, muted-foreground |
| Body text | 1.125rem, 1.75 line-height, muted-foreground |
| Lists | Proper spacing, accent bullet color |
| Callout | Background accent, left border, padding |

---

## Semantic HTML Structure

```html
<article>
  <header>
    <h1>Title</h1>
    <p class="lead">Intro paragraph</p>
  </header>
  
  <div class="article-body">
    <section>
      <h2>Section Title</h2>
      <p>Content...</p>
    </section>
    <!-- More sections -->
  </div>
  
  <footer>
    <div class="cta">...</div>
  </footer>
</article>
```

---

## Files Summary

| Action | File |
|--------|------|
| CREATE | `src/components/articles/ArticleLayout.tsx` |
| CREATE | `src/components/articles/ArticleHeader.tsx` |
| CREATE | `src/components/articles/ArticleSection.tsx` |
| CREATE | `src/components/articles/ArticleCallout.tsx` |
| CREATE | `src/components/articles/ArticleCTA.tsx` |
| MODIFY | `tailwind.config.ts` |
| MODIFY | `src/index.css` |
| MODIFY | `src/pages/ArticleHouseVsStocks.tsx` |

Total: 5 new files, 3 modified files
