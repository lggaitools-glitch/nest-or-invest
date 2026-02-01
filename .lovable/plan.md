

# Unified Sitewide Navigation Component

## Overview
Create a single, reusable navigation component (`SiteNavigation.tsx`) that will serve as the standard header for all current and future pages. This replaces the need for separate `Header.tsx` and `SimulatorHeader.tsx` components.

---

## Architecture

```text
src/
  components/
    SiteNavigation.tsx    # NEW - Single source of truth for navigation
    simulator/
      Header.tsx          # DEPRECATED - Will be removed
      SimulatorHeader.tsx # DEPRECATED - Will be removed
```

---

## Component Features

The unified `SiteNavigation` component will include:

- **Logo** - Links to home (`/`)
- **Navigation dropdown** - Menu with Home and Simulate options
- **Active route highlighting** - Shows which page is currently active
- **Language selector** - Consistent across all pages
- **Optional badge** - Can show "Free Version" or other badges via prop

---

## Files to Create

### `src/components/SiteNavigation.tsx`
A new component combining the best of both headers:
- Dropdown menu from `SimulatorHeader`
- Clean styling that works on both pages
- Uses `useLocation` to highlight active route
- Fully translated via i18n

---

## Files to Modify

### `src/pages/Index.tsx`
- Replace `Header` import with `SiteNavigation`

### `src/pages/Simulate.tsx`
- Replace `SimulatorHeader` import with `SiteNavigation`

---

## Files to Delete (cleanup)

### `src/components/simulator/Header.tsx`
- No longer needed after migration

### `src/components/simulator/SimulatorHeader.tsx`
- No longer needed after migration

---

## Component Usage

Any new page simply imports and uses the navigation:

```tsx
import { SiteNavigation } from '@/components/SiteNavigation';

const NewPage = () => (
  <div>
    <SiteNavigation />
    {/* Page content */}
  </div>
);
```

---

## Benefits

- Single source of truth for navigation
- Easy to add new menu items in one place
- Any new page automatically gets consistent navigation
- Simpler codebase with fewer duplicate components

---

## Files Summary

| Action | File |
|--------|------|
| CREATE | `src/components/SiteNavigation.tsx` |
| MODIFY | `src/pages/Index.tsx` |
| MODIFY | `src/pages/Simulate.tsx` |
| DELETE | `src/components/simulator/Header.tsx` |
| DELETE | `src/components/simulator/SimulatorHeader.tsx` |

Total: 1 new file, 2 modified files, 2 deleted files

