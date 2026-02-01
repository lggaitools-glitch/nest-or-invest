

# Separating Landing Page from Simulator - Implementation Plan

## Overview

This plan restructures the application to have a clean separation between the marketing landing page (`/`) and the simulation tool (`/simulate`). The landing page will focus on conversion and SEO, while the simulation page will contain all calculation logic, charts, and results.

---

## Current State

The current `Index.tsx` contains both:
- Landing page sections (Hero, Problem, Solution, etc.)
- Full simulator (inputs, results, chart, insights)
- Scroll-based navigation between them

## Target State

```text
/              → Pure landing page with CTAs linking to /simulate
/simulate      → Full simulation tool (all calculation logic)
```

---

## Architecture Changes

```text
src/
  pages/
    Index.tsx              # Landing page only (no simulator)
    Simulate.tsx           # NEW - Full simulator page
    NotFound.tsx           # Unchanged
  components/
    landing/               # All landing sections (unchanged)
    simulator/             # All simulator components
      SimulatorHeader.tsx  # NEW - Navigation header for /simulate
      Header.tsx           # Modified for landing page
    NavLink.tsx            # Unchanged
```

---

## Files to Create

### 1. `src/pages/Simulate.tsx`
New page containing the full simulator with:
- Minimal navigation header (Logo linking to `/`, "Home" link)
- Page header with H1 "Rent vs Buy Simulator" and subheadline
- Helper text: "Takes ~2 minutes - Educational tool - No sign-up required"
- Two-column layout (inputs left, results right)
- Bottom chart section
- Transparency footer

### 2. `src/components/simulator/SimulatorHeader.tsx`
New minimal header for the simulator page with:
- Logo linking to `/`
- "Home" link
- Language selector
- No "Free Version" badge (cleaner for tool page)

---

## Files to Modify

### 1. `src/App.tsx`
Add new route for `/simulate`:
```tsx
<Route path="/simulate" element={<Simulate />} />
```

### 2. `src/pages/Index.tsx`
Remove all simulator logic and components:
- Remove simulator state management
- Remove calculation imports
- Keep only landing sections
- Update CTAs to navigate to `/simulate` instead of scrolling

### 3. `src/components/landing/HeroSection.tsx`
Change from `onStartSimulation` callback to `Link` navigation:
- Remove `onStartSimulation` prop
- Use `react-router-dom`'s `Link` to navigate to `/simulate`

### 4. `src/components/landing/FinalCTASection.tsx`
Same change as HeroSection:
- Remove `onStartSimulation` prop
- Use `Link` to `/simulate`

### 5. `src/i18n/types.ts`
Add new translation keys for simulator page:
- `simulate.pageTitle`: "Rent vs Buy Simulator"
- `simulate.pageSubtitle`: "Compare renting and buying..."
- `simulate.helperText`: "Takes ~2 minutes..."
- `simulate.nav.home`: "Home"

### 6. Translation files (`en.ts`, `pt-BR.ts`, `es.ts`)
Add translations for new simulator page keys.

---

## Detailed Component Structure

### Simulate.tsx Layout

```text
+------------------------------------------+
| SimulatorHeader                          |
| [Logo → /] [Home] [How it works?] [Lang] |
+------------------------------------------+
|                                          |
|     H1: Rent vs Buy Simulator            |
|     Subheadline: Compare renting...      |
|     Helper: Takes ~2 min - Educational   |
|                                          |
+-------------------+----------------------+
| INPUT SECTION     | RESULTS SECTION      |
|                   |                      |
| Your situation    | [Winner Banner]      |
| - Property price  |                      |
| - Down payment    | [Rent Card][Buy Card]|
| - Monthly rent    |                      |
| - Mortgage rate   +----------------------+
| - Mortgage years  | INSIGHT CARDS        |
|                   |                      |
| Your assumptions  | - Break-even         |
| - Investment %    | - Winner details     |
| - Appreciation %  | - Sensitivity        |
| - Rent increase % |                      |
| - Maintenance %   |                      |
| - Time horizon    |                      |
|                   |                      |
+-------------------+----------------------+
|                                          |
|     WEALTH CHART                         |
|     [Line chart with break-even]         |
|                                          |
+------------------------------------------+
|     TRANSPARENCY SECTION                 |
+------------------------------------------+
|     FOOTER with disclaimer               |
+------------------------------------------+
```

### Mobile Layout (stacked)
```text
[Header]
[Page Title]
[Inputs]
[Results]
[Chart]
[Transparency]
[Footer]
```

---

## Implementation Order

1. **Update translation types and files**
   - Add `simulate` section to types
   - Add translations for all 3 languages

2. **Create SimulatorHeader component**
   - Minimal navigation with logo and home link
   - Language selector

3. **Create Simulate.tsx page**
   - Move all simulator logic from Index.tsx
   - Use SimulatorHeader instead of Header
   - Add page title section with proper H1

4. **Update App.tsx routing**
   - Add `/simulate` route

5. **Simplify Index.tsx**
   - Remove simulator logic
   - Keep only landing sections

6. **Update landing CTAs**
   - HeroSection: Use Link to /simulate
   - FinalCTASection: Use Link to /simulate

7. **Test both pages**
   - Verify landing page renders correctly
   - Verify simulator page has all functionality
   - Test navigation between pages
   - Test language switching on both pages

---

## Translation Keys to Add

```typescript
simulate: {
  pageTitle: string;      // "Rent vs Buy Simulator"
  pageSubtitle: string;   // "Compare renting and buying..."
  helperText: string;     // "Takes ~2 minutes - Educational - No sign-up"
  nav: {
    home: string;         // "Home"
    howItWorks: string;   // "How it works"
  };
}
```

---

## Technical Considerations

### State Management
- Simulator state stays local to Simulate.tsx
- No shared state between landing and simulator pages
- Country preset and inputs managed independently on simulator page

### SEO Impact
- `/` focuses on marketing content and keywords
- `/simulate` is the functional tool page
- Both pages will have proper meta tags

### Navigation Flow
```text
User lands on / → Reads landing content → Clicks CTA → Arrives at /simulate
```

### Existing Components Reused
All existing simulator components work unchanged:
- `InputSection.tsx`
- `ResultsDisplay.tsx`
- `WealthChart.tsx`
- `InsightCards.tsx`
- `TransparencySection.tsx`
- `Footer.tsx`
- `LanguageSelector.tsx`

---

## Files Summary

| Action | File |
|--------|------|
| CREATE | `src/pages/Simulate.tsx` |
| CREATE | `src/components/simulator/SimulatorHeader.tsx` |
| MODIFY | `src/App.tsx` |
| MODIFY | `src/pages/Index.tsx` |
| MODIFY | `src/components/landing/HeroSection.tsx` |
| MODIFY | `src/components/landing/FinalCTASection.tsx` |
| MODIFY | `src/i18n/types.ts` |
| MODIFY | `src/i18n/translations/en.ts` |
| MODIFY | `src/i18n/translations/pt-BR.ts` |
| MODIFY | `src/i18n/translations/es.ts` |

Total: 2 new files, 8 modified files

