
# Remove Portuguese Language and Brazil Preset

## Overview
Remove Portuguese (pt-BR) language option and Brazil simulation preset to focus the application on the Spanish market with English and Spanish language support only.

---

## Files to Delete

### 1. `src/i18n/translations/pt-BR.ts`
Delete the entire Portuguese translation file as it will no longer be needed.

---

## Files to Modify

### 1. `src/i18n/types.ts`
Update the Language type and remove Brazil from countries:

```typescript
// Line 1: Change from
export type Language = 'en' | 'pt-BR' | 'es';
// To
export type Language = 'en' | 'es';

// Lines 174-177: Remove brazil from countries interface
countries: {
  spain: string;
  portugal: string;
  custom: string;
};
```

### 2. `src/i18n/translations/index.ts`
Remove Portuguese import and from translations object:

```typescript
// Remove pt-BR import and export
import { en } from './en';
import { es } from './es';
import type { Language, Translations } from '../types';

export const translations: Record<Language, Translations> = {
  en,
  es,
};

export { en, es };
```

### 3. `src/i18n/LanguageContext.tsx`
Update language validation to only accept 'en' and 'es':

```typescript
// Line 18: Change validation
if (stored && (stored === 'en' || stored === 'es')) {
  return stored;
}

// Line 38: Same change
if (stored && (stored === 'en' || stored === 'es')) {
  setLanguageState(stored);
}
```

### 4. `src/components/simulator/LanguageSelector.tsx`
Remove Portuguese from the languages array:

```typescript
const languages: { code: Language; flag: string; name: string }[] = [
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
];
```

### 5. `src/types/simulator.ts`
Remove Brazil preset from COUNTRY_PRESETS:

```typescript
// Remove lines 121-137 (Brazil preset)
export const COUNTRY_PRESETS: CountryPreset[] = [
  {
    id: 'spain',
    name: 'Spain',
    flag: '🇪🇸',
    values: { /* Spain values */ },
  },
  {
    id: 'portugal',
    name: 'Portugal',
    flag: '🇵🇹',
    values: { /* Portugal values */ },
  },
  {
    id: 'custom',
    name: 'Custom',
    flag: '⚙️',
    values: {},
  },
];
```

### 6. `src/i18n/translations/en.ts`
Remove Brazil from countries object:

```typescript
// Lines 118-123: Update to
countries: {
  spain: 'Spain',
  portugal: 'Portugal',
  custom: 'Custom',
},
```

### 7. `src/i18n/translations/es.ts`
Remove Brazil from countries object:

```typescript
// Lines 118-123: Update to
countries: {
  spain: 'España',
  portugal: 'Portugal',
  custom: 'Personalizado',
},
```

### 8. `src/lib/calculations.ts`
Simplify formatCurrency to always use EUR (no more BRL logic):

```typescript
// Lines 318-326: Simplify to
export function formatCurrency(value: number, countryId: string = 'spain'): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
```

### 9. `src/components/simulator/InputSection.tsx`
Remove Brazil currency check (always use €):

```typescript
// Line 87: Change from
const currencySymbol = selectedPreset === 'brazil' ? 'R$' : '€';
// To
const currencySymbol = '€';
```

### 10. `src/components/simulator/WealthChart.tsx`
Remove Brazil currency check (always use €):

```typescript
// Line 60: Change from
const currencySymbol = countryId === 'brazil' ? 'R$' : '€';
// To
const currencySymbol = '€';
```

---

## Summary of Changes

| Action | File |
|--------|------|
| DELETE | `src/i18n/translations/pt-BR.ts` |
| MODIFY | `src/i18n/types.ts` |
| MODIFY | `src/i18n/translations/index.ts` |
| MODIFY | `src/i18n/LanguageContext.tsx` |
| MODIFY | `src/components/simulator/LanguageSelector.tsx` |
| MODIFY | `src/types/simulator.ts` |
| MODIFY | `src/i18n/translations/en.ts` |
| MODIFY | `src/i18n/translations/es.ts` |
| MODIFY | `src/lib/calculations.ts` |
| MODIFY | `src/components/simulator/InputSection.tsx` |
| MODIFY | `src/components/simulator/WealthChart.tsx` |

**Total: 1 file deleted, 10 files modified**

---

## Result
After these changes:
- Language selector will show only English and Spanish
- Simulator presets will show Spain, Portugal, and Custom (no Brazil)
- All currency formatting will use EUR (€)
- Portuguese translation file will be removed
- Application focused on Spanish market with bilingual EN/ES support
