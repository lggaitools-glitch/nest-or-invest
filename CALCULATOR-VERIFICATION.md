# HomeDecision Calculator Verification

Date: 2026-04-16
Status: **verification pass started, not signed off**

## Goal
Validate HomeDecision's calculator against trusted mortgage math and identify anything that still breaks trust before launch.

## Reference formulas used

### Fixed-rate mortgage payment
- Monthly payment = `P * r * (1+r)^N / ((1+r)^N - 1)`
- `P` = loan principal
- `r` = monthly rate
- `N` = total months

### Fixed-rate remaining balance after `n` months
- Balance = `P * ((1+r)^N - (1+r)^n) / ((1+r)^N - 1)`

### Variable-rate (two-phase) mortgage
1. Amortize original loan during the initial fixed period
2. Compute remaining balance at transition
3. Recalculate payment using variable rate on the remaining balance over remaining term

## Reference scenario matrix

### A. Fixed-rate baseline
Inputs:
- Property price: €250,000
- Down payment: €50,000
- Loan: €200,000
- Mortgage rate: 3.5%
- Term: 30 years

Expected reference values:
- Monthly payment: **€898.09**
- Balance after 1 year: **€196,161.74**
- Balance after 2 years: **€192,186.97**
- Balance after 5 years: **€179,394.15**
- Balance after 10 years: **€154,853.75**
- Balance after 20 years: **€90,820.80**
- Balance after 30 years: **€0.00**

### B. Variable-rate baseline
Inputs:
- Loan: €200,000
- Term: 30 years
- Initial fixed period: 2 years
- Initial fixed rate: 2.5%
- Euribor forecast: 2.5%
- Spread: 0.99%
- Effective variable rate: **3.49%**

Expected reference values:
- Fixed-period monthly payment: **€790.24**
- Balance at transition (end of year 2): **€190,816.07**
- Variable-period monthly payment: **€890.63**
- Balance after year 3: **€186,722.87**
- Balance after year 5: **€178,095.84**
- Balance after year 10: **€153,704.56**
- Balance after year 20: **€90,109.64**
- Balance after year 30: **€0.00**

## What looks correct so far

### 1. Core fixed-rate amortization
The app's payment math is directionally consistent with standard mortgage formulas.

### 2. Two-phase variable-rate structure
The app now models:
- an initial fixed period
- a transition balance
- a recalculated payment for the remaining term

That is the right high-level structure for a Spain-oriented MVP.

## Trust-breaking issues still found

### 1. Cash-flow asymmetry still biases results
**Severity: High**

The app only invests the monthly surplus for the renter when buying is more expensive:
- renter invests `max(0, buyer_cost - rent)`
- buyer does **not** invest anything when buying is cheaper than renting

That means the comparison is asymmetric.

Example sanity check:
- Rent set to **€2,500/mo**
- Mortgage roughly **€898/mo**
- The app still returns **renting wins** in the tested scenario

That is a major trust problem. If buying is cheaper month to month, the buyer should also be able to invest the difference, or the model should explicitly state that it is not doing cash-flow reinvestment symmetrically.

### 2. Buy net worth framing still mixes wealth and expenses in a debatable way
**Severity: Medium-High**

Current buy net worth is effectively:
- equity
- minus closing costs
- minus maintenance
- minus property tax
- minus community fees

This may be acceptable for a conservative ownership model, but it needs to be explicit because it is not the only valid framing.

The issue is not just the formula, it's that the rent side and buy side are not treated as mirror-image cash-flow systems.

### 3. No selling costs on exit
**Severity: High**

The buy case still does not include exit friction such as:
- agent commission
- municipal capital gains / local transaction costs
- other sale-related costs

This can materially overstate buy-side end wealth.

### 4. No capital gains / tax handling
**Severity: Medium**

The app still ignores tax consequences for either side.
This may be acceptable in an MVP if clearly disclosed, but not if the product presents itself as decision-grade.

### 5. Variable-rate model still uses a flat forecast, not path-based repricing
**Severity: Medium**

The current variable-rate implementation is acceptable for a first approximation, but it assumes one average Euribor forecast for the whole floating period.
Real variable mortgages reprice periodically and can move materially.

This is not a launch blocker by itself if disclosed, but it is still a simplification.

## Recommendation

## Do not treat calculator verification as complete yet.

The biggest remaining issue is the **asymmetric cash-flow reinvestment logic**. That alone is enough to keep HomeDecision out of growth mode.

## Next fixes before sign-off
1. Make monthly cash-flow reinvestment symmetric
   - if renting is cheaper, renter invests the difference
   - if buying is cheaper, buyer invests the difference
   - or explicitly remove reinvestment from both sides
2. Add selling costs to the buy exit case
3. Re-run scenario matrix after those fixes
4. Only then do a final decision on soft launch readiness
