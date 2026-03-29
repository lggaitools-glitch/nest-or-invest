import type { FreeInputs } from '@/components/simulator/FreeInputSection';
import type { FreeVerdict } from '@/components/simulator/FreeResultBadge';

// Fixed assumptions for free estimate (hidden from user)
const FREE_ASSUMPTIONS = {
  downPaymentPercent: 20,
  mortgageYears: 25,
  rentIncreaseAnnual: 2,
  investmentReturnAnnual: 6,
  propertyAppreciationAnnual: 2,
  maintenancePercentAnnual: 1,
  closingCostsPercent: 10,
  propertyTaxAnnual: 800,
  communityFeesMonthly: 50,
};

export interface FreeEstimateResult {
  monthlyRent: number;
  monthlyBuying: number;
  verdict: FreeVerdict;
}

/**
 * Calculate PMT (monthly payment) for a loan
 */
function calculatePMT(annualRate: number, years: number, principal: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;

  if (monthlyRate === 0) {
    return principal / totalPayments;
  }

  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1)
  );
}

/**
 * Remaining loan balance after n months
 */
function remainingBalance(principal: number, annualRate: number, totalYears: number, monthsPaid: number): number {
  if (annualRate === 0) {
    const totalMonths = totalYears * 12;
    return principal * Math.max(0, 1 - monthsPaid / totalMonths);
  }
  const r = annualRate / 100 / 12;
  const N = totalYears * 12;
  const n = Math.min(monthsPaid, N);
  if (n >= N) return 0;
  return principal * (Math.pow(1 + r, N) - Math.pow(1 + r, n)) / (Math.pow(1 + r, N) - 1);
}

/**
 * Calculate free estimate using actual net worth comparison over the time horizon
 */
export function calculateFreeEstimate(inputs: FreeInputs): FreeEstimateResult {
  const { rentMonthly, propertyPrice, interestRate, timeHorizonYears } = inputs;

  const downPayment = propertyPrice * (FREE_ASSUMPTIONS.downPaymentPercent / 100);
  const loanAmount = propertyPrice - downPayment;
  const monthlyMortgage = calculatePMT(interestRate, FREE_ASSUMPTIONS.mortgageYears, loanAmount);
  const monthlyMaintenance = (propertyPrice * FREE_ASSUMPTIONS.maintenancePercentAnnual / 100) / 12;
  const monthlyBuying = Math.round(monthlyMortgage + monthlyMaintenance);

  // --- Calculate net worth over timeHorizon for both scenarios ---
  const investmentRate = FREE_ASSUMPTIONS.investmentReturnAnnual / 100;
  const closingCosts = propertyPrice * (FREE_ASSUMPTIONS.closingCostsPercent / 100);
  const annualMortgage = monthlyMortgage * 12;
  const annualMaintenance = propertyPrice * FREE_ASSUMPTIONS.maintenancePercentAnnual / 100;
  const annualPropertyTax = FREE_ASSUMPTIONS.propertyTaxAnnual;
  const annualCommunityFees = FREE_ASSUMPTIONS.communityFeesMonthly * 12;
  const annualRent = rentMonthly * 12;

  // Rent scenario: invest the down payment, invest the surplus each year
  let investmentValue = downPayment;
  for (let year = 1; year <= timeHorizonYears; year++) {
    const rentThisYear = annualRent * Math.pow(1 + FREE_ASSUMPTIONS.rentIncreaseAnnual / 100, year - 1);
    const buyerAnnualCost =
      (year <= FREE_ASSUMPTIONS.mortgageYears ? annualMortgage : 0) +
      annualMaintenance + annualPropertyTax + annualCommunityFees;
    const surplus = Math.max(0, buyerAnnualCost - rentThisYear);
    investmentValue = (investmentValue + surplus) * (1 + investmentRate);
  }
  const rentNetWorth = investmentValue;

  // Buy scenario: equity minus cash outflows
  const propertyValueFinal = propertyPrice * Math.pow(1 + FREE_ASSUMPTIONS.propertyAppreciationAnnual / 100, timeHorizonYears);
  const monthsPaid = Math.min(timeHorizonYears, FREE_ASSUMPTIONS.mortgageYears) * 12;
  const loanBalance = remainingBalance(loanAmount, interestRate, FREE_ASSUMPTIONS.mortgageYears, monthsPaid);
  const equity = propertyValueFinal - loanBalance;
  const totalCashOutflows =
    closingCosts +
    annualMaintenance * timeHorizonYears +
    annualPropertyTax * timeHorizonYears +
    annualCommunityFees * timeHorizonYears;
  const buyNetWorth = equity - totalCashOutflows;

  // Determine verdict based on actual net worth comparison
  const difference = rentNetWorth - buyNetWorth;
  const threshold = propertyPrice * 0.02; // 2% of property price as significance threshold

  let verdict: FreeVerdict;
  if (difference < -threshold) {
    verdict = 'buying';
  } else if (difference > threshold) {
    verdict = 'renting';
  } else {
    verdict = 'depends';
  }

  return {
    monthlyRent: rentMonthly,
    monthlyBuying,
    verdict,
  };
}
