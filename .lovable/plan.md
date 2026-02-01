

# Navigation Dropdown Implementation Plan

## Overview
Replace the current plain text navigation link in the SimulatorHeader with a polished dropdown menu containing "Home" and "Simulate" options. This will provide better UX and a more professional look.

---

## Current State
The SimulatorHeader has a simple inline text link:
```
[Logo] [Home link]                    [Language Selector]
```

## Target State
A dropdown menu with navigation options:
```
[Logo]                    [Menu ▼] [Language Selector]
                           ├─ Home
                           └─ Simulate
```

---

## Implementation Approach

Use the existing `DropdownMenu` component from shadcn/ui (already available in the project) to create a clean navigation dropdown with:
- A trigger button with "Menu" text and a chevron icon
- Dropdown items for "Home" (links to `/`) and "Simulate" (links to `/simulate`)
- Active state highlighting for the current page

---

## Translation Updates

Add a new key for "Simulate" navigation label:

| Key | English | Portuguese | Spanish |
|-----|---------|------------|---------|
| `simulate.nav.simulate` | Simulate | Simular | Simular |
| `simulate.nav.menu` | Menu | Menu | Menú |

---

## Files to Modify

### 1. `src/components/simulator/SimulatorHeader.tsx`
- Import `DropdownMenu` components from shadcn/ui
- Import `useLocation` from react-router-dom to detect current page
- Replace the plain nav link with a dropdown menu
- Add "Home" and "Simulate" menu items with proper routing
- Highlight the active page in the dropdown

### 2. `src/i18n/types.ts`
- Add `simulate` and `menu` keys to the `SimulateTranslations.nav` interface

### 3. `src/i18n/translations/en.ts`
- Add English translations for new nav keys

### 4. `src/i18n/translations/pt-BR.ts`
- Add Portuguese translations for new nav keys

### 5. `src/i18n/translations/es.ts`
- Add Spanish translations for new nav keys

---

## Component Structure

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="sm">
      <Menu icon /> Menu <ChevronDown />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem asChild>
      <Link to="/">
        <Home icon /> Home
      </Link>
    </DropdownMenuItem>
    <DropdownMenuItem asChild>
      <Link to="/simulate">
        <Calculator icon /> Simulate
      </Link>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

## Design Details

- Dropdown trigger: Ghost button with "Menu" text, menu icon, and chevron
- Menu width: Auto-fit content
- Alignment: Right-aligned (`align="end"`)
- Active page: Highlighted with accent background color
- Icons: Home icon for home, Calculator/TrendingUp for simulate
- Mobile-friendly: Works on all screen sizes

---

## Files Summary

| Action | File |
|--------|------|
| MODIFY | `src/components/simulator/SimulatorHeader.tsx` |
| MODIFY | `src/i18n/types.ts` |
| MODIFY | `src/i18n/translations/en.ts` |
| MODIFY | `src/i18n/translations/pt-BR.ts` |
| MODIFY | `src/i18n/translations/es.ts` |

Total: 5 files modified

