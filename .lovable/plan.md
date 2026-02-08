

# HomeDecision Hybrid Monetization Implementation

## Overview

This plan restructures HomeDecision.app from a free-only tool into a hybrid monetization model with three tiers: Free, One-time Report (€3.99), and Premium Subscription (€6.99/month).

---

## Architecture Overview

```text
+--------------------------------------------------+
|                   PUBLIC ROUTES                   |
+--------------------------------------------------+
| /           → Landing page (existing)             |
| /simulate   → Free quick simulation               |
| /report     → One-time report purchase flow       |
| /pricing    → Plan comparison                     |
| /r/:id      → Unique report viewer (guest access) |
+--------------------------------------------------+

+--------------------------------------------------+
|               AUTHENTICATED ROUTES                |
+--------------------------------------------------+
| /compare    → Premium scenario comparison         |
| /auth       → Login/signup flow                   |
+--------------------------------------------------+
```

---

## Implementation Phases

### Phase 1: Core Types and State Management

**New File: `src/types/monetization.ts`**

Define types for the monetization system:
- `UserPlan`: 'free' | 'report_owner' | 'premium'
- `Report`: id, inputs, outputs, createdAt, expiresAt
- `Scenario`: id, name, inputs, outputs, createdAt (for Premium)
- `PricingPlan`: id, name, price, features, type

**New File: `src/contexts/UserContext.tsx`**

Create a context for user state that tracks:
- Current user (null for guests)
- Active subscription status
- Purchased reports (stored in localStorage for now)

---

### Phase 2: Free Simulation Page — `/simulate`

**Modify: `src/pages/Simulate.tsx`**

Transform into the free entry experience:

**Features to keep:**
- All editable inputs (rent, price, rate, years)
- Country presets
- Real-time calculations

**Features to show (limited):**
- Winner verdict (Rent vs Buy)
- Basic monthly cost comparison
- Simple net worth difference

**Features to hide:**
- Detailed charts (show blurred preview)
- Insight cards (show 1 insight, blur rest)
- Transparency section (keep visible - builds trust)

**New CTA Section at bottom:**
```text
+----------------------------------------------+
| 📊 Want the Full Picture?                    |
+----------------------------------------------+
| ┌────────────────────┐ ┌──────────────────┐  |
| │ One-Time Report    │ │ Compare Scenarios│  |
| │ €3.99              │ │ €6.99/month      │  |
| │ • Full breakdown   │ │ • Unlimited      │  |
| │ • PDF export       │ │ • Save & compare │  |
| │ • Charts & graphs  │ │ • Full features  │  |
| │ [Get Report]       │ │ [Go Premium]     │  |
| └────────────────────┘ └──────────────────┘  |
+----------------------------------------------+
```

---

### Phase 3: One-Time Report Page — `/report`

**New File: `src/pages/Report.tsx`**

A dedicated flow for one-time report purchase:

**Step 1: Input Collection**
- Reuse `InputSection` component
- Add email field for report delivery
- Preview of what they'll get

**Step 2: Payment (Mocked)**
- Display price: €3.99
- Mock payment button
- On "payment success": generate unique report ID

**Step 3: Report Generated**
- Redirect to `/r/{reportId}`
- Show success message with link
- Email notification (placeholder text)

**Report Features:**
- Full breakdown (same depth as current simulate)
- All charts visible
- All insights visible
- PDF export button
- "Report locked" badge

**Restrictions (clearly communicated):**
- Inputs are read-only after generation
- Cannot edit assumptions
- Cannot compare scenarios
- Link expires in 7 days

**Upgrade messaging:**
```text
"This report shows one scenario. To explore alternatives 
and compare properties, upgrade to Premium."
```

---

### Phase 4: Report Viewer Page — `/r/:id`

**New File: `src/pages/ReportViewer.tsx`**

Guest-accessible page to view a purchased report:

- Retrieve report from localStorage by ID
- Display full report content
- Show "locked" badge on inputs
- Include PDF export button
- Display expiration countdown
- Show upgrade CTA at bottom

If report not found or expired:
- Show friendly error
- Offer to create new report

---

### Phase 5: Premium Compare Page — `/compare`

**New File: `src/pages/Compare.tsx`**

The flagship Premium experience:

**Features:**
- Scenario manager sidebar
- Create new scenario
- Duplicate existing scenario
- Compare up to 4 scenarios side-by-side
- Editable assumptions on each
- Comparison charts (overlay multiple scenarios)
- Saved history (localStorage for now)

**Layout:**
```text
+--------------------------------------------------+
| SCENARIOS           │ COMPARISON VIEW            |
+---------------------+----------------------------+
| [+ New Scenario]    │ ┌──────┬──────┬──────┐    |
|                     │ │ Apt A│ Apt B│ Apt C│    |
| ○ Madrid Apartment  │ ├──────┼──────┼──────┤    |
| ● Barcelona Flat    │ │ ...  │ ...  │ ...  │    |
| ○ Valencia House    │ └──────┴──────┴──────┘    |
|                     │                            |
| [Edit] [Duplicate]  │ 📊 Comparison Chart        |
|                     │ [unified wealth over time] |
+--------------------------------------------------+
```

**Gate:** Redirect to `/auth?redirect=/compare` if not logged in with Premium.

---

### Phase 6: Pricing Page — `/pricing`

**New File: `src/pages/Pricing.tsx`**

Clear plan comparison with:

**Three-column layout:**

| Free | One-Time Report | Premium |
|------|-----------------|---------|
| €0 | €3.99 (once) | €6.99/month |
| Quick simulation | Full detailed report | Unlimited scenarios |
| Single scenario | PDF export | Compare properties |
| Basic verdict | Charts & insights | Saved history |
| No saving | One-time access | Editable assumptions |
| | 7-day link | Priority support |
| [Try Free] | [Get Report] | [Start Premium] |

**Design requirements:**
- Make Premium clearly the best value
- One-Time Report for "just need one answer" users
- No feature overlap between tiers
- FAQ section below plans

---

### Phase 7: Authentication — `/auth`

**New File: `src/pages/Auth.tsx`**

Login/Signup page for Premium access:

- Email/password form
- Tab toggle: Login | Sign Up
- "Forgot password" link
- Social login buttons (disabled state for v1)
- Redirect handling via query param

**Note:** Full Supabase integration will be needed later. For now, create the UI with mock auth state stored in localStorage.

---

### Phase 8: Navigation Updates

**Modify: `src/components/SiteNavigation.tsx`**

Update navigation menu:
- Home (existing)
- Try Free → /simulate
- Pricing → /pricing
- [Login] button (top right, when not logged in)
- [Account] dropdown (when logged in)

**Modify: `src/components/simulator/Footer.tsx`**

Add footer links:
- Simulate (Free)
- Reports (€3.99)
- Premium
- Pricing

---

### Phase 9: Translations

**Modify: `src/i18n/translations/en.ts` and `src/i18n/translations/es.ts`**

Add new translation keys for:
- Pricing page content
- Report page content
- Premium features
- CTA messaging
- Error states

---

## File Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/types/monetization.ts` | CREATE | Monetization types |
| `src/contexts/UserContext.tsx` | CREATE | User/subscription context |
| `src/pages/Simulate.tsx` | MODIFY | Add restrictions + CTAs |
| `src/pages/Report.tsx` | CREATE | Report purchase flow |
| `src/pages/ReportViewer.tsx` | CREATE | Guest report viewer |
| `src/pages/Compare.tsx` | CREATE | Premium comparison |
| `src/pages/Pricing.tsx` | CREATE | Pricing page |
| `src/pages/Auth.tsx` | CREATE | Login/signup page |
| `src/components/SiteNavigation.tsx` | MODIFY | Update nav links |
| `src/components/simulator/Footer.tsx` | MODIFY | Add footer links |
| `src/components/FreeSimulatorCTA.tsx` | CREATE | Upgrade CTA component |
| `src/components/BlurredPreview.tsx` | CREATE | Blur overlay for locked content |
| `src/components/PricingCard.tsx` | CREATE | Reusable pricing card |
| `src/App.tsx` | MODIFY | Add new routes |
| `src/i18n/translations/en.ts` | MODIFY | Add translations |
| `src/i18n/translations/es.ts` | MODIFY | Add Spanish translations |
| `public/sitemap.xml` | MODIFY | Add new URLs |

**Total: 9 new files, 7 modified files**

---

## Technical Decisions

### Data Persistence (Mocked for v1)

For this initial implementation without Supabase:

- **Reports:** Stored in localStorage with unique UUID
- **Scenarios:** Stored in localStorage per "user"
- **User state:** Mocked in localStorage
- **Payment:** Mock confirmation stored in localStorage

This allows full UI/UX development and testing before integrating real backends.

### Report ID Format

Generate UUID-like IDs: `rpt_${timestamp}_${random}`

Example: `rpt_1707321600_a7f3b2`

### URL Structure

- `/simulate` - Free experience
- `/report` - Purchase flow
- `/r/:reportId` - View purchased report
- `/compare` - Premium (requires auth)
- `/pricing` - Plan comparison
- `/auth` - Login/signup

---

## Upgrade CTA Placement Strategy

CTAs appear at natural decision points:

1. **After Free simulation result** - "Want the full breakdown?"
2. **On blurred chart** - "Unlock this chart for €3.99"
3. **On blurred insights** - "See all insights with Premium"
4. **Report page footer** - "Compare more properties with Premium"
5. **Header** - Subtle "Upgrade" link when free user

**Not random.** Always contextual and helpful.

---

## Feature Non-Overlap Matrix

| Feature | Free | Report | Premium |
|---------|------|--------|---------|
| Run simulation | 1x | 1x locked | Unlimited |
| Edit inputs | Yes | No | Yes |
| Basic verdict | Yes | Yes | Yes |
| Full charts | No | Yes | Yes |
| All insights | 1 only | Yes | Yes |
| PDF export | No | Yes | Yes |
| Save scenarios | No | No | Yes |
| Compare scenarios | No | No | Yes |
| Editable assumptions | Limited | Locked | Full |

---

## Consistent Language

Throughout the app, use:
- "One-time report" (not "per simulation report")
- "Compare scenarios" for Premium features
- "Quick simulation" for free tier
- "Premium" (not "Pro" or "Plus")
- "€3.99 once" / "€6.99/month"

---

## Next Steps After This Implementation

1. **Enable Supabase** - Real user authentication
2. **Enable Stripe** - Real payment processing
3. **PDF Generation** - Actual PDF export
4. **Email Delivery** - Send report links
5. **Analytics** - Track conversion funnels

