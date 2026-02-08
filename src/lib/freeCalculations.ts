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
 * Calculate free estimate with simplified assumptions
 */
export function calculateFreeEstimate(inputs: FreeInputs): FreeEstimateResult {
  const { rentMonthly, propertyPrice, interestRate } = inputs;
  
  // Calculate down payment and loan amount
  const downPayment = propertyPrice * (FREE_ASSUMPTIONS.downPaymentPercent / 100);
  const loanAmount = propertyPrice - downPayment;
  
  // Monthly mortgage payment
  const monthlyMortgage = calculatePMT(
    interestRate,
    FREE_ASSUMPTIONS.mortgageYears,
    loanAmount
  );
  
  // Monthly maintenance cost
  const monthlyMaintenance = (propertyPrice * FREE_ASSUMPTIONS.maintenancePercentAnnual / 100) / 12;
  
  // Total monthly buying cost (mortgage + maintenance)
  const monthlyBuying = Math.round(monthlyMortgage + monthlyMaintenance);
  
  // Determine verdict based on monthly cost comparison
  // Buying is considered "cheaper" if it's within 10% of rent
  // Renting is considered "safer" if buying is more than 30% higher
  let verdict: FreeVerdict;
  
  if (monthlyBuying < rentMonthly * 1.1) {
    verdict = 'buying';
  } else if (monthlyBuying > rentMonthly * 1.3) {
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
