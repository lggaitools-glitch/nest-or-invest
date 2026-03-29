

# Connect Supabase & Fix Build Errors

## 1. Connect Supabase

To connect Supabase to your Lovable project:

1. Click the **Supabase** button in the top-right of the Lovable editor (the green database icon)
2. Either **create a new Supabase project** directly from Lovable, or **connect an existing one** by providing your project URL and anon key

Your project already has the Supabase client code in `src/lib/supabase.ts` and auth integration in `src/contexts/UserContext.tsx` — once connected, the environment variables (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) will be automatically injected and everything will work.

## 2. Fix Stripe Build Error

The `redirectToCheckout` method was removed in newer versions of `@stripe/stripe-js`. The fix is to replace it with `stripe.redirectToCheckout` → a mock/placeholder pattern since payments are mocked anyway.

### File: `src/lib/stripe.ts`

Replace `stripe.redirectToCheckout(...)` calls with the Stripe.js v2+ equivalent: create a Checkout Session server-side and use `stripe.redirectToCheckout({ sessionId })`. Since we don't have a server yet, we'll make both functions mock the payment flow by redirecting directly to the success URL — matching the existing "mock payments first" approach.

**Changes:**
- Remove `redirectToCheckout` calls
- Replace with direct `window.location.href` redirects to the success/cancel URLs
- Add console warnings that real Stripe integration requires a backend

---

| File | Action |
|------|--------|
| `src/lib/stripe.ts` | MODIFY — Replace deprecated `redirectToCheckout` with mock redirects |

