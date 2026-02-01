
# HomeDecision Landing Page Implementation Plan

## Overview
Transform the current simulator into a full marketing-ready landing page with SEO optimization, compelling copy sections, and a clear user journey from landing to using the simulator. The landing page will live at `/` while the simulator will be accessible via a "Start simulation" CTA that scrolls to or navigates to the simulator section.

---

## Architecture Decision

### Option: Single-Page with Sections
- Landing page content above the fold with sections
- Simulator embedded lower on the same page
- Smooth scroll navigation between sections
- Better for SEO (single URL, all content indexed)
- Simpler implementation

This approach keeps everything on one page with anchor navigation, which is ideal for conversion and SEO.

---

## File Structure

```text
src/
  components/
    landing/
      HeroSection.tsx          # Above-the-fold hero
      ProblemSection.tsx       # Why this decision is hard
      SolutionSection.tsx      # What HomeDecision does
      HowItWorksSection.tsx    # 3-step process
      VisualSection.tsx        # Results/chart preview
      TrustSection.tsx         # Transparency & trust
      AudienceSection.tsx      # Who it's for
      FAQSection.tsx           # SEO-boosting FAQ accordion
      FinalCTASection.tsx      # Bottom call-to-action
  pages/
    Index.tsx                  # Updated to include all sections
  i18n/
    types.ts                   # Extended with landing page translations
    translations/
      en.ts                    # English landing copy
      pt-BR.ts                 # Portuguese landing copy
      es.ts                    # Spanish landing copy
```

---

## SEO Implementation

### index.html Updates
- Title: "Rent or Buy? Make the Right Housing Decision | HomeDecision"
- Meta description: "Compare renting vs buying with a rational wealth simulator..."
- Open Graph tags updated for social sharing
- Semantic HTML structure (proper heading hierarchy)

### Semantic Structure
- Single `<h1>` in hero section
- `<h2>` for each major section heading
- `<h3>` for subsection headings
- Proper `<section>` elements with aria-labels

---

## Translation Structure Extension

New keys to add to the `Translations` interface:

```text
landing: {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
    ctaSecondary: string;
  };
  problem: {
    headline: string;
    intro: string;
    fears: string[];
    truth: string;
    conclusion: string;
  };
  solution: {
    headline: string;
    bullets: string[];
    noBias: string;
  };
  howItWorks: {
    headline: string;
    steps: { title: string; description: string; }[];
  };
  visual: {
    headline: string;
    body: string;
    features: string[];
    conclusion: string;
  };
  trust: {
    headline: string;
    bullets: string[];
    mission: string;
  };
  audience: {
    headline: string;
    personas: { icon: string; text: string; }[];
  };
  faq: {
    headline: string;
    items: { q: string; a: string; }[];
  };
  finalCta: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  footer: {
    disclaimer: string;
  };
}
```

---

## Component Details

### 1. HeroSection.tsx
- Full-viewport height section
- Large headline with line break styling
- Subheadline paragraph
- Primary CTA button (scrolls to simulator)
- Secondary text "No sign-up required - Free to use"
- Background gradient or subtle pattern

### 2. ProblemSection.tsx
- Centered content layout
- Headline + body text
- List of common fears/pressures (styled as cards or bullet points)
- Highlighted truth statement
- Concluding paragraph about HomeDecision's purpose

### 3. SolutionSection.tsx
- Feature list with icons
- Compare scenarios explanation
- "No ads, no commissions, no bias" callout
- Clean card-based layout

### 4. HowItWorksSection.tsx
- 3-step horizontal layout (responsive to vertical on mobile)
- Step numbers with icons
- Step titles and descriptions
- Visual connection between steps

### 5. VisualSection.tsx
- Preview of chart/results (could show sample data)
- Feature highlights with icons
- Emphasis on long-term wealth focus

### 6. TrustSection.tsx
- Trust badges/icons
- Transparency bullet points
- Mission statement callout

### 7. AudienceSection.tsx
- 4 persona cards with icons
- Clean grid layout

### 8. FAQSection.tsx
- Accordion component (reuse existing)
- 4 FAQ items from the brief
- Schema.org FAQ markup for SEO (optional)

### 9. FinalCTASection.tsx
- Centered headline
- Subheadline text
- Large CTA button
- Background differentiation

---

## Files to Create (9 new files)

| File | Purpose |
|------|---------|
| `src/components/landing/HeroSection.tsx` | Hero with headline, CTA |
| `src/components/landing/ProblemSection.tsx` | Problem statement |
| `src/components/landing/SolutionSection.tsx` | Solution features |
| `src/components/landing/HowItWorksSection.tsx` | 3-step process |
| `src/components/landing/VisualSection.tsx` | Chart preview section |
| `src/components/landing/TrustSection.tsx` | Trust & transparency |
| `src/components/landing/AudienceSection.tsx` | Target audience cards |
| `src/components/landing/FAQSection.tsx` | FAQ accordion |
| `src/components/landing/FinalCTASection.tsx` | Bottom CTA |

## Files to Modify (5 files)

| File | Changes |
|------|---------|
| `index.html` | Update title, meta tags, Open Graph |
| `src/i18n/types.ts` | Add `landing` interface |
| `src/i18n/translations/en.ts` | Add English landing copy |
| `src/i18n/translations/pt-BR.ts` | Add Portuguese landing copy |
| `src/i18n/translations/es.ts` | Add Spanish landing copy |
| `src/pages/Index.tsx` | Integrate all landing sections |
| `src/components/simulator/Footer.tsx` | Add legal disclaimer |

---

## Implementation Order

1. Update `index.html` with SEO metadata
2. Extend translation types with landing page interface
3. Add English translations (full landing copy)
4. Create landing page components (HeroSection through FinalCTASection)
5. Update Index.tsx to integrate all sections with smooth scroll
6. Add Portuguese and Spanish translations
7. Update Footer with legal disclaimer
8. Test responsive layout and all languages

---

## Design Considerations

### Visual Hierarchy
- Hero: Large headline (text-4xl to text-6xl), prominent CTA
- Section headings: text-3xl, centered
- Body text: text-lg, muted foreground
- CTAs: Primary button style, consistent sizing

### Spacing
- Sections: py-16 to py-24 for vertical rhythm
- Container: max-w-4xl for content sections, max-w-6xl for simulator

### Animations
- Fade-in on scroll for each section (can use existing animate-fade-in)
- Smooth scroll behavior for anchor navigation

### Responsive
- Mobile-first approach
- Hero CTA stacks vertically on mobile
- 3-step process becomes vertical on mobile
- Persona cards: 2x2 grid on tablet, single column on mobile
