

# Remove Portugal Preset

## Overview
Remove Portugal from the country presets, keeping only Spain and Custom options for the simulator.

---

## Files to Modify

### 1. `src/types/simulator.ts`
Remove Portugal preset from COUNTRY_PRESETS array (lines 104-120):

```typescript
export const COUNTRY_PRESETS: CountryPreset[] = [
  {
    id: 'spain',
    name: 'Spain',
    flag: '🇪🇸',
    values: { /* Spain values */ },
  },
  {
    id: 'custom',
    name: 'Custom',
    flag: '⚙️',
    values: {},
  },
];
```

### 2. `src/i18n/types.ts`
Remove portugal from countries interface (line 175):

```typescript
countries: {
  spain: string;
  custom: string;
};
```

### 3. `src/i18n/translations/en.ts`
Remove portugal from countries object (line 120):

```typescript
countries: {
  spain: 'Spain',
  custom: 'Custom',
},
```

### 4. `src/i18n/translations/es.ts`
Remove portugal from countries object (line 120):

```typescript
countries: {
  spain: 'España',
  custom: 'Personalizado',
},
```

---

## Summary

| Action | File |
|--------|------|
| MODIFY | `src/types/simulator.ts` |
| MODIFY | `src/i18n/types.ts` |
| MODIFY | `src/i18n/translations/en.ts` |
| MODIFY | `src/i18n/translations/es.ts` |

**Total: 4 files modified**

---

## Result
After these changes:
- Country preset dropdown will show only Spain and Custom
- Application fully focused on Spanish market

