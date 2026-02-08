

# Fix Mobile Header Layout Issues

## Problems Identified

1. **Hamburger menu overlapping logo**: The header elements are competing for space on mobile, causing the navigation dropdown to overlap with the logo/branding area.

2. **Language selector too wide on mobile**: The `LanguageSelector` component has a fixed `w-[140px]` width, but on mobile the language name is hidden (`hidden sm:inline`), leaving an oversized box showing only a flag emoji.

---

## Solution Overview

The fix involves:
1. **Hiding the app title/subtitle on small screens** to make room for navigation
2. **Making the language selector compact on mobile** (flag-only with auto-width)
3. **Reducing gaps between header elements on mobile**
4. **Ensuring proper flex-shrink behavior** to prevent overflow

---

## Technical Changes

### File: `src/components/SiteNavigation.tsx`

**Changes:**
- Add `min-w-0` and `flex-shrink-0` to logo section for proper flex behavior
- Hide the title/subtitle text on very small screens (`hidden xs:block` or `hidden sm:block`)
- Reduce `gap-3` to `gap-1 sm:gap-3` on mobile for nav items
- Ensure the logo image remains visible but text collapses

**Current (problematic):**
```tsx
<Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
  <img src={logo} alt="HomeDecision Logo" className="h-10 w-10" />
  <div>
    <h1 className="text-lg font-bold text-foreground font-display">
      {t.header.title}
    </h1>
    <p className="text-xs text-muted-foreground">{t.header.subtitle}</p>
  </div>
</Link>
```

**After fix:**
```tsx
<Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity min-w-0">
  <img src={logo} alt="HomeDecision Logo" className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0" />
  <div className="hidden sm:block min-w-0">
    <h1 className="text-lg font-bold text-foreground font-display truncate">
      {t.header.title}
    </h1>
    <p className="text-xs text-muted-foreground truncate">{t.header.subtitle}</p>
  </div>
</Link>
```

**Changes to nav container:**
```tsx
<div className="flex items-center gap-1 sm:gap-3">
```

---

### File: `src/components/simulator/LanguageSelector.tsx`

**Changes:**
- Replace fixed `w-[140px]` with responsive `w-auto sm:w-[140px]`
- Adjust padding for mobile with `px-2 sm:px-3`

**Current (problematic):**
```tsx
<SelectTrigger className="w-[140px] h-8 text-sm">
```

**After fix:**
```tsx
<SelectTrigger className="w-auto sm:w-[140px] h-8 text-sm px-2 sm:px-3">
```

This ensures:
- On mobile: dropdown auto-sizes to fit the flag emoji only (compact)
- On desktop: dropdown maintains the 140px width with full language name

---

## Visual Comparison

### Before (Mobile):
```
┌────────────────────────────────────┐
│ [Logo] HomeDecision  [≡][🇬🇧     ][Sign In] │  ← Cramped, overlapping
│        Smart Decisions                       │
└────────────────────────────────────┘
```

### After (Mobile):
```
┌────────────────────────────────────┐
│ [Logo]     [≡] [🇬🇧] [→]          │  ← Clean, spaced properly
└────────────────────────────────────┘
```

### After (Desktop - unchanged):
```
┌──────────────────────────────────────────────┐
│ [Logo] HomeDecision  [≡ Menu ▼][🇬🇧 English][Sign In]│
│        Smart Decisions                                │
└──────────────────────────────────────────────┘
```

---

## Summary of File Changes

| File | Changes |
|------|---------|
| `src/components/SiteNavigation.tsx` | Hide title/subtitle on mobile, reduce gaps, smaller logo on mobile |
| `src/components/simulator/LanguageSelector.tsx` | Auto-width on mobile, responsive padding |

**Total: 2 files modified**

