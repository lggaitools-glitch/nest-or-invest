# HomeDecision Launch Checklist

HomeDecision is **not growth-ready yet**. Treat this as a correctness-first product until the calculator is verified.

## Launch blockers

### 1. Calculator verification
- [ ] Validate fixed-rate mortgage outputs against an external spreadsheet/calculator
- [ ] Validate variable-rate mortgage outputs across phase transition
- [ ] Verify break-even logic on edge cases
- [ ] Verify zero-interest, short-horizon, and no-appreciation scenarios
- [ ] Confirm buy vs rent net worth framing is intentional and documented

### 2. Real payment flow
- [ ] Replace mocked Stripe checkout with real Checkout Sessions via Lovable Edge Function
- [ ] Verify report purchase flow end to end
- [ ] Verify premium subscription flow end to end
- [ ] Handle cancel / failed payment / duplicate payment states

### 3. Auth and persistence QA
- [ ] Signup
- [ ] Login
- [ ] Session persistence
- [ ] Logout
- [ ] Password reset
- [ ] Email confirmation flow

### 4. Report QA
- [ ] Generate report
- [ ] Open report from direct link
- [ ] Verify report expiry behavior
- [ ] Verify PDF export on desktop
- [ ] Verify PDF export on mobile

### 5. Production QA
- [ ] Mobile responsive pass
- [ ] Desktop pass
- [ ] EN pass
- [ ] ES pass
- [ ] No broken routes
- [ ] No obvious console/runtime errors

## Important right after launch
- [ ] Analytics (Plausible or PostHog)
- [ ] Error tracking (Sentry)
- [ ] Privacy policy
- [ ] Terms
- [ ] Financial disclaimer review
- [ ] Support/contact path

## Current recommendation
Do **not** push traffic until section 1 is completed and signed off.
