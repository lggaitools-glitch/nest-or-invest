

# Simplify Free Experience & Differentiate Paid Tiers

## Overview

This plan restructures the `/simulate` page from a semi-featured experience with blurred previews into a truly minimal "quick estimate" tool. The goal is to make the Free tier feel helpful but intentionally incomplete, while making the €3.99 report feel significantly richer.

---

## Current State vs Target State

| Feature | Current Free | Target Free | €3.99 Report | Premium |
|---------|-------------|-------------|--------------|---------|
| **Inputs** | 10 fields + presets | 4 fields only | 10 fields (locked after) | 10 fields (editable) |
| **Time horizon** | Up to 40 years | Max 10 years | Full range | Full range |
| **Verdict** | Detailed winner + amounts | Simple badge only | Full verdict | Full verdict |
| **Net worth values** | Shown for both | Hidden | Shown | Shown |
| **Charts** | Blurred preview | Removed entirely | Full charts | Full charts |
| **Insights** | 1 visible + blurred | Removed entirely | All insights | All insights |
| **Break-even** | Shown | Removed | Shown | Shown |
| **Transparency section** | Shown | Removed | Shown | Shown |
| **PDF export** | No | No | Yes | Yes |
| **Layout** | Report-style sections | Calculator-style | Report-style | Report-style |

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/components/simulator/FreeInputSection.tsx` | CREATE | Minimal 4-input calculator component |
| `src/components/simulator/FreeResultBadge.tsx` | CREATE | Simple directional verdict badge |
| `src/pages/Simulate.tsx` | MODIFY | Completely redesign as minimal calculator |
| `src/i18n/translations/en.ts` | MODIFY | Add new free estimate translations |
| `src/i18n/translations/es.ts` | MODIFY | Add Spanish translations |
| `src/i18n/types.ts` | MODIFY | Add new translation types |

**Total: 2 new files, 4 modified files**

---

## Implementation Details

### 1. New Component: FreeInputSection

A simplified input component with only 4 fields:

```text
+----------------------------------+
| FREE QUICK ESTIMATE              |
+----------------------------------+
| Monthly Rent        [€1,000    ] |
| Property Price      [€250,000  ] |
| Interest Rate       [3.5%      ] |
| Time Horizon        [5-10 yrs  ] | ← Max 10 years
+----------------------------------+
```

**Design:**
- Clean, compact calculator style
- No country presets (simplification)
- No sliders (just inputs)
- No "Financial Assumptions" section
- Time horizon dropdown: 5, 7, or 10 years only

**Hidden assumptions (fixed):**
- Down payment: 20% of property price (auto-calculated)
- Mortgage term: 25 years (standard)
- Rent increase: 2% (conservative)
- Investment return: 6% (conservative)
- Property appreciation: 2% (conservative)
- Maintenance: 1% (standard)

### 2. New Component: FreeResultBadge

A simple directional indicator that replaces the detailed `ResultsDisplay`:

```text
+------------------------------------------+
|    🏠  BUYING MAY BE CHEAPER             |
|    based on a 10-year estimate           |
+------------------------------------------+
|                                          |
|  Estimated Monthly Cost                  |
|  ┌──────────────┬──────────────┐        |
|  │   Renting    │    Buying    │        |
|  │   €1,000/mo  │   €1,150/mo  │        |
|  └──────────────┴──────────────┘        |
|                                          |
|  ⚠️ This is a simplified estimate based  |
|     on limited assumptions.              |
+------------------------------------------+
```

**Key elements:**
- Directional badge: "Buying may be cheaper" OR "Renting may be safer"
- Rounded monthly cost comparison ONLY
- No net worth values
- No exact differences
- Prominent disclaimer

**Logic for verdict:**
- If buying cheaper: "Buying may be cheaper"
- If renting cheaper: "Renting may be safer" (softer language)
- If close: "It depends on your situation"

### 3. Redesigned /simulate Page

Complete redesign with calculator-style layout:

```text
+--------------------------------------------------+
| NAVIGATION                                        |
+--------------------------------------------------+
|                                                   |
|          Free Quick Estimate                      |
|    Get a directional signal in 30 seconds         |
|                                                   |
|  +------------------------------------------+    |
|  |           [FreeInputSection]              |    |
|  +------------------------------------------+    |
|                                                   |
|  +------------------------------------------+    |
|  |           [FreeResultBadge]               |    |
|  +------------------------------------------+    |
|                                                   |
|  +------------------------------------------+    |
|  | Want the Complete Analysis?               |    |
|  |                                           |    |
|  | ┌─────────────────┐ ┌─────────────────┐  |    |
|  | │ Decision Report │ │ Premium Compare │  |    |
|  | │ €3.99 one-time  │ │ €6.99/month     │  |    |
|  | │ [Get Report]    │ │ [Go Premium]    │  |    |
|  | └─────────────────┘ └─────────────────┘  |    |
|  +------------------------------------------+    |
|                                                   |
+--------------------------------------------------+
| FOOTER                                            |
+--------------------------------------------------+
```

**Removed from Free:**
- ~~Blurred WealthChart~~
- ~~InsightCards (even partial)~~
- ~~TransparencySection~~
- ~~Break-even year~~
- ~~Detailed net worth values~~
- ~~Country presets~~
- ~~Advanced inputs (investment return, appreciation, etc.)~~

### 4. Updated CTA Section

The upgrade CTA becomes more prominent and clearer:

```text
+--------------------------------------------------+
| 📊 Get the Complete Analysis                      |
+--------------------------------------------------+
| ┌─────────────────────┐ ┌─────────────────────┐  |
| │ ONE-TIME REPORT     │ │ PREMIUM             │  |
| │ €3.99               │ │ €6.99/month         │  |
| │                     │ │                     │  |
| │ ✓ Full cost over    │ │ ✓ Everything in     │  |
| │   time              │ │   Report            │  |
| │ ✓ Break-even year   │ │ ✓ Unlimited         │  |
| │ ✓ Charts & graphs   │ │   scenarios         │  |
| │ ✓ Risk analysis     │ │ ✓ Save & compare    │  |
| │ ✓ PDF export        │ │ ✓ Edit assumptions  │  |
| │                     │ │                     │  |
| │ [Get Decision       │ │ [Compare Scenarios] │  |
| │  Report →]          │ │                     │  |
| └─────────────────────┘ └─────────────────────┘  |
+--------------------------------------------------+
```

---

## Translation Updates

### New Translation Keys (English)

```typescript
freeEstimate: {
  pageTitle: 'Free Quick Estimate',
  pageSubtitle: 'Get a directional signal in 30 seconds',
  inputs: {
    monthlyRent: 'Monthly Rent',
    propertyPrice: 'Property Price',
    interestRate: 'Interest Rate',
    timeHorizon: 'Time Horizon',
    years: 'years',
  },
  result: {
    buyingCheaper: 'Buying may be cheaper',
    rentingSafer: 'Renting may be safer',
    itDepends: 'It depends on your situation',
    basedOn: 'based on a {years}-year estimate',
    estimatedMonthly: 'Estimated Monthly Cost',
    renting: 'Renting',
    buying: 'Buying',
    perMonth: '/mo',
  },
  disclaimer: 'This is a simplified estimate based on limited assumptions. For a complete analysis, get the full report.',
  cta: {
    title: 'Get the Complete Analysis',
    reportTitle: 'One-Time Decision Report',
    reportPrice: '€3.99',
    reportFeatures: [
      'Full cost over time',
      'Break-even analysis',
      'Charts & graphs',
      'Risk analysis',
      'PDF export',
    ],
    reportBtn: 'Get Decision Report',
    premiumTitle: 'Compare Scenarios',
    premiumPrice: '€6.99/month',
    premiumFeatures: [
      'Everything in Report',
      'Unlimited scenarios',
      'Save & compare',
      'Edit assumptions',
    ],
    premiumBtn: 'Go Premium',
  },
},
```

### Spanish Translations

```typescript
freeEstimate: {
  pageTitle: 'Estimación Rápida Gratuita',
  pageSubtitle: 'Obtén una señal direccional en 30 segundos',
  inputs: {
    monthlyRent: 'Alquiler Mensual',
    propertyPrice: 'Precio de la Vivienda',
    interestRate: 'Tipo de Interés',
    timeHorizon: 'Horizonte Temporal',
    years: 'años',
  },
  result: {
    buyingCheaper: 'Comprar puede ser más barato',
    rentingSafer: 'Alquilar puede ser más seguro',
    itDepends: 'Depende de tu situación',
    basedOn: 'basado en una estimación a {years} años',
    estimatedMonthly: 'Coste Mensual Estimado',
    renting: 'Alquilar',
    buying: 'Comprar',
    perMonth: '/mes',
  },
  disclaimer: 'Esta es una estimación simplificada basada en suposiciones limitadas. Para un análisis completo, obtén el informe completo.',
  cta: {
    title: 'Obtén el Análisis Completo',
    reportTitle: 'Informe de Decisión Único',
    reportPrice: '€3.99',
    reportFeatures: [
      'Coste total en el tiempo',
      'Análisis de punto de equilibrio',
      'Gráficos y tablas',
      'Análisis de riesgo',
      'Exportar PDF',
    ],
    reportBtn: 'Obtener Informe',
    premiumTitle: 'Compara Escenarios',
    premiumPrice: '€6.99/mes',
    premiumFeatures: [
      'Todo lo del Informe',
      'Escenarios ilimitados',
      'Guardar y comparar',
      'Editar supuestos',
    ],
    premiumBtn: 'Ir a Premium',
  },
},
```

---

## Calculation Logic for Free Estimate

The free estimate uses simplified calculations with fixed assumptions:

```typescript
// Fixed assumptions for free estimate
const FREE_ASSUMPTIONS = {
  downPaymentPercent: 20,
  mortgageYears: 25,
  rentIncreaseAnnual: 2,
  investmentReturnAnnual: 6,
  propertyAppreciationAnnual: 2,
  maintenancePercentAnnual: 1,
};

// Calculate monthly costs only (simplified)
function calculateFreeEstimate(inputs: FreeInputs) {
  const downPayment = inputs.propertyPrice * 0.2;
  const loanAmount = inputs.propertyPrice - downPayment;
  
  // Monthly mortgage payment (PMT formula)
  const monthlyMortgage = calculatePMT(inputs.interestRate, 25, loanAmount);
  
  // Monthly maintenance cost
  const monthlyMaintenance = (inputs.propertyPrice * 0.01) / 12;
  
  // Total monthly buying cost
  const monthlyBuying = monthlyMortgage + monthlyMaintenance;
  
  // Compare
  const verdict = monthlyBuying < inputs.rentMonthly * 1.1 
    ? 'buying' 
    : monthlyBuying > inputs.rentMonthly * 1.3 
      ? 'renting' 
      : 'depends';
  
  return {
    monthlyRent: inputs.rentMonthly,
    monthlyBuying: Math.round(monthlyBuying),
    verdict,
  };
}
```

---

## Feature Differentiation Matrix (Final)

| Feature | Free Estimate | €3.99 Report | Premium |
|---------|---------------|--------------|---------|
| Inputs | 4 basic fields | 10 fields (locked) | 10 fields (editable) |
| Time horizon | 5-10 years | 5-40 years | 5-40 years |
| Country presets | No | Yes | Yes |
| Verdict type | Directional badge | Full verdict + amount | Full verdict |
| Monthly cost | Yes (rounded) | Yes | Yes |
| Total cost over time | No | Yes | Yes |
| Net worth comparison | No | Yes | Yes |
| Break-even year | No | Yes | Yes |
| Wealth chart | No | Yes | Yes |
| Insights/analysis | No | Yes | Yes |
| Risk analysis | No | Yes | Yes |
| PDF export | No | Yes | Yes |
| Save scenarios | No | No | Yes |
| Compare scenarios | No | No | Yes |
| Edit after generation | N/A | No | Yes |

---

## SEO & Meta Updates

Update meta description for `/simulate`:

```html
<title>Free Rent vs Buy Estimate | HomeDecision</title>
<meta name="description" content="Get a quick directional signal on whether to rent or buy. Free 30-second estimate — no sign-up required." />
```

---

## Implementation Order

1. **Create FreeInputSection component** - Minimal 4-input calculator
2. **Create FreeResultBadge component** - Simple verdict display
3. **Update translation files** - Add all new keys
4. **Redesign Simulate.tsx** - Replace with minimal calculator layout
5. **Update FreeSimulatorCTA** - Clearer differentiation messaging
6. **Test flow** - Verify the experience feels intentionally limited

