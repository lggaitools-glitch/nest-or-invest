
# Multi-Language Support Implementation Plan

## Overview
Add language selection (English, Portuguese-Brazilian, Spanish) to the simulator. Language selection is purely for UI text translation - **currency will always be EUR** regardless of language selected. Currency only changes when selecting a different country preset (Spain/Portugal = EUR, Brazil = BRL).

## Key Clarification
- **Language** = controls text/labels only (en, pt-BR, es)
- **Country preset** = controls currency symbol AND default values
- User can select Spanish language but simulate with Brazil preset (BRL currency)

---

## Architecture

### File Structure
```text
src/
  i18n/
    types.ts              # TypeScript interfaces
    translations/
      en.ts               # English translations
      pt-BR.ts            # Portuguese (Brazil) translations  
      es.ts               # Spanish translations
      index.ts            # Export aggregator
    LanguageContext.tsx   # Context provider + useTranslation hook
  components/
    simulator/
      LanguageSelector.tsx  # New language dropdown
```

### Currency Formatting Logic
The `formatCurrency` function will be updated to accept a country code:

| Country Preset | Currency | Symbol | Format |
|----------------|----------|--------|--------|
| Spain | EUR | € | €250,000 |
| Portugal | EUR | € | €300,000 |
| Brazil | BRL | R$ | R$500.000 |

---

## Translation Scope

All user-facing text will be translated, organized by component:

**Header**: App title, subtitle, badge text  
**Hero Section**: Main heading, description  
**Input Section**: All labels, hints, section titles  
**Results Display**: Winner messages, scenario names  
**Chart**: Title, axis labels, legend  
**Insights**: All dynamic insight messages  
**Transparency**: All accordion content  
**Footer**: All text  

---

## Technical Implementation

### 1. Translation Types (`src/i18n/types.ts`)
Define TypeScript interfaces ensuring type-safe access to all translation keys.

### 2. Translation Files
Create three translation files (en.ts, pt-BR.ts, es.ts) with identical structure containing all UI text. Example structure:

```text
{
  header: { title, subtitle, freeVersion },
  hero: { heading, description },
  inputs: { 
    title, 
    housing: { title, propertyPrice, downPayment, ... },
    financial: { title, investmentReturn, ... }
  },
  results: { afterYears, rentingMakesYou, buyingMakesYou, ... },
  chart: { title, year, breakEven, rentLabel, buyLabel },
  insights: { breakeven, winnerRent, winnerBuy, sensitivity, ... },
  transparency: { ... },
  footer: { ... }
}
```

### 3. Language Context (`src/i18n/LanguageContext.tsx`)
- Create LanguageProvider wrapping the app
- Store language preference in localStorage
- Export `useLanguage()` hook returning:
  - `language`: current language code
  - `setLanguage`: function to change language
  - `t`: translation object for current language

### 4. Currency Formatting Update (`src/lib/calculations.ts`)
Modify `formatCurrency(value, countryId)` to:
- Accept country preset ID
- Return EUR formatting for Spain/Portugal
- Return BRL formatting for Brazil

### 5. Language Selector (`src/components/simulator/LanguageSelector.tsx`)
Dropdown in Header showing:
- 🇬🇧 English
- 🇧🇷 Portugues (BR)
- 🇪🇸 Espanol

### 6. Component Updates
Each component will:
- Import `useLanguage` hook
- Replace hardcoded strings with `t.section.key`
- Pass country ID to formatCurrency where needed

---

## Files to Create (7)
1. `src/i18n/types.ts`
2. `src/i18n/translations/en.ts`
3. `src/i18n/translations/pt-BR.ts`
4. `src/i18n/translations/es.ts`
5. `src/i18n/translations/index.ts`
6. `src/i18n/LanguageContext.tsx`
7. `src/components/simulator/LanguageSelector.tsx`

## Files to Modify (9)
1. `src/main.tsx` - Wrap with LanguageProvider
2. `src/lib/calculations.ts` - Update formatCurrency, insight messages
3. `src/components/simulator/Header.tsx` - Add LanguageSelector
4. `src/components/simulator/InputSection.tsx` - Use translations
5. `src/components/simulator/ResultsDisplay.tsx` - Use translations
6. `src/components/simulator/WealthChart.tsx` - Use translations
7. `src/components/simulator/InsightCards.tsx` - Use translations
8. `src/components/simulator/TransparencySection.tsx` - Use translations
9. `src/components/simulator/Footer.tsx` - Use translations
10. `src/pages/Index.tsx` - Use translations for hero, pass country to children

---

## Implementation Order
1. Create i18n types and context infrastructure
2. Create English translations (baseline)
3. Create Portuguese-Brazilian translations
4. Create Spanish translations
5. Update formatCurrency to accept country code
6. Add LanguageProvider to app entry
7. Create LanguageSelector component
8. Update Header with language selector
9. Update all remaining components to use translations
10. Test all three languages with different country presets
