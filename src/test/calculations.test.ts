import { describe, expect, it } from 'vitest';
import { calculateBuyScenario, calculateDerivedValues, calculateOutputs, calculateRentScenario } from '@/lib/calculations';
import { DEFAULT_INPUTS } from '@/types/simulator';

function runScenario(overrides = {}) {
  const inputs = { ...DEFAULT_INPUTS, ...overrides };
  const derived = calculateDerivedValues(inputs);
  const rent = calculateRentScenario(inputs, derived);
  const buy = calculateBuyScenario(inputs, derived);
  const outputs = calculateOutputs(rent, buy);
  return { inputs, derived, rent, buy, outputs };
}

describe('calculator sanity checks', () => {
  it('keeps fixed-rate mortgage payment stable', () => {
    const { derived } = runScenario();
    expect(derived.annualMortgagePayment).toBeGreaterThan(0);
    expect(derived.annualVariablePayment).toBeUndefined();
  });

  it('computes a second payment phase for variable mortgages', () => {
    const { derived } = runScenario({
      mortgageType: 'variable',
      initialFixedYears: 2,
      initialFixedRate: 2.5,
      variableSpread: 0.99,
      euriborForecast: 2.5,
    });

    expect(derived.annualMortgagePayment).toBeGreaterThan(0);
    expect(derived.annualVariablePayment).toBeGreaterThan(0);
    expect(derived.effectiveVariableRate).toBeCloseTo(3.49, 2);
  });

  it('handles zero-interest mortgages without NaN output', () => {
    const { buy, rent, outputs } = runScenario({ mortgageRate: 0 });
    expect(Number.isFinite(buy.netWorth)).toBe(true);
    expect(Number.isFinite(rent.netWorth)).toBe(true);
    expect(['buy', 'rent', 'tie']).toContain(outputs.winner);
  });

  it('does not produce negative remaining-value style corruption in a short horizon', () => {
    const { buy } = runScenario({ timeHorizonYears: 5 });
    for (const year of buy.yearlyData) {
      expect(Number.isFinite(year.buyNetWorth)).toBe(true);
    }
  });

  it('keeps no-appreciation scenario worse for buying than default scenario', () => {
    const base = runScenario();
    const flat = runScenario({ propertyAppreciationAnnual: 0 });
    expect(flat.buy.netWorth).toBeLessThan(base.buy.netWorth);
  });
});
