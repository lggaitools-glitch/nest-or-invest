import type {
  SimulatorInputs,
  DerivedValues,
  ScenarioRent,
  ScenarioBuy,
  SimulatorOutputs,
  YearlyData,
  Insight,
} from '@/types/simulator';

// PMT formula: calculates monthly payment for a loan
function calculatePMT(rate: number, nper: number, pv: number): number {
  if (rate === 0) return pv / nper;
  const monthlyRate = rate / 100 / 12;
  const totalPayments = nper * 12;
  return (
    (pv * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1)
  );
}

export function calculateDerivedValues(inputs: SimulatorInputs): DerivedValues {
  const loanAmount = inputs.propertyPrice - inputs.downPayment;
  const maintenanceYear = inputs.propertyPrice * (inputs.maintenancePercentAnnual / 100);
  const rentAnnualYear1 = inputs.rentMonthly * 12;
  const monthlyPayment = calculatePMT(inputs.mortgageRate, inputs.mortgageYears, loanAmount);
  const annualMortgagePayment = monthlyPayment * 12;

  return {
    loanAmount,
    maintenanceYear,
    rentAnnualYear1,
    annualMortgagePayment,
  };
}

export function calculateRentScenario(
  inputs: SimulatorInputs,
  derived: DerivedValues
): ScenarioRent {
  const yearlyData: YearlyData[] = [];
  let totalRentPaid = 0;
  let investmentValue = inputs.downPayment;
  const investmentRate = inputs.investmentReturnAnnual / 100;

  for (let year = 0; year <= inputs.timeHorizonYears; year++) {
    if (year === 0) {
      yearlyData.push({
        year,
        rentNetWorth: inputs.downPayment,
        buyNetWorth: 0,
        investmentValue: inputs.downPayment,
        rentPaid: 0,
      });
      continue;
    }

    // Calculate rent for this year (with annual increase)
    const rentThisYear = derived.rentAnnualYear1 * Math.pow(1 + inputs.rentIncreaseAnnual / 100, year - 1);
    totalRentPaid += rentThisYear;

    // Calculate surplus (what renter saves compared to buyer's mortgage payment)
    const surplus = Math.max(0, derived.annualMortgagePayment - rentThisYear);

    // Grow investment: previous value + surplus, then compound
    investmentValue = (investmentValue + surplus) * (1 + investmentRate);

    yearlyData.push({
      year,
      rentNetWorth: investmentValue - totalRentPaid,
      buyNetWorth: 0, // Will be filled by buy scenario
      investmentValue,
      rentPaid: totalRentPaid,
    });
  }

  return {
    initialInvestment: inputs.downPayment,
    investmentFinal: investmentValue,
    totalRentPaid,
    netWorth: investmentValue - totalRentPaid,
    yearlyData,
  };
}

export function calculateBuyScenario(
  inputs: SimulatorInputs,
  derived: DerivedValues
): ScenarioBuy {
  const yearlyData: YearlyData[] = [];
  const yearsToPayMortgage = Math.min(inputs.mortgageYears, inputs.timeHorizonYears);
  
  const mortgageTotalPaid = derived.annualMortgagePayment * yearsToPayMortgage;
  const mortgageInterest = mortgageTotalPaid - derived.loanAmount;
  const maintenanceTotal = derived.maintenanceYear * inputs.timeHorizonYears;
  
  const propertyValueFinal =
    inputs.propertyPrice *
    Math.pow(1 + inputs.propertyAppreciationAnnual / 100, inputs.timeHorizonYears);

  let mortgagePaidSoFar = 0;
  let maintenancePaidSoFar = 0;

  for (let year = 0; year <= inputs.timeHorizonYears; year++) {
    if (year === 0) {
      yearlyData.push({
        year,
        rentNetWorth: 0,
        buyNetWorth: inputs.downPayment, // Initial equity
        propertyValue: inputs.propertyPrice,
        mortgagePaid: 0,
      });
      continue;
    }

    // Calculate property value at this year
    const propertyValue =
      inputs.propertyPrice *
      Math.pow(1 + inputs.propertyAppreciationAnnual / 100, year);

    // Calculate remaining loan balance (simplified - equal principal reduction)
    const principalPaidPerYear = derived.loanAmount / inputs.mortgageYears;
    const principalPaidSoFar = Math.min(year * principalPaidPerYear, derived.loanAmount);
    const remainingLoan = derived.loanAmount - principalPaidSoFar;

    // Add this year's payments
    if (year <= inputs.mortgageYears) {
      mortgagePaidSoFar += derived.annualMortgagePayment;
    }
    maintenancePaidSoFar += derived.maintenanceYear;

    // Equity = Property value - remaining loan
    const equity = propertyValue - remainingLoan;
    
    // Net worth = Equity - total costs paid (interest portion + maintenance)
    const interestPaidSoFar = mortgagePaidSoFar - principalPaidSoFar;
    const netWorth = equity - interestPaidSoFar - maintenancePaidSoFar + inputs.downPayment;

    yearlyData.push({
      year,
      rentNetWorth: 0,
      buyNetWorth: netWorth,
      propertyValue,
      mortgagePaid: mortgagePaidSoFar,
    });
  }

  const netWorth = propertyValueFinal - mortgageInterest - maintenanceTotal;

  return {
    mortgageTotalPaid,
    mortgageInterest,
    maintenanceTotal,
    propertyValueFinal,
    investmentFinal: 0, // MVP v1 = 0
    netWorth,
    yearlyData,
  };
}

export function calculateOutputs(
  rentScenario: ScenarioRent,
  buyScenario: ScenarioBuy
): SimulatorOutputs {
  const difference = rentScenario.netWorth - buyScenario.netWorth;
  
  let winner: 'rent' | 'buy' | 'tie';
  if (Math.abs(difference) < 1000) {
    winner = 'tie';
  } else if (difference > 0) {
    winner = 'rent';
  } else {
    winner = 'buy';
  }

  // Find break-even year
  let breakEvenYear: number | null = null;
  const combinedData = rentScenario.yearlyData.map((rentData, index) => ({
    year: rentData.year,
    rentNetWorth: rentData.rentNetWorth,
    buyNetWorth: buyScenario.yearlyData[index]?.buyNetWorth || 0,
  }));

  for (let i = 1; i < combinedData.length; i++) {
    const prevDiff = combinedData[i - 1].rentNetWorth - combinedData[i - 1].buyNetWorth;
    const currDiff = combinedData[i].rentNetWorth - combinedData[i].buyNetWorth;
    
    if (prevDiff * currDiff < 0) {
      breakEvenYear = combinedData[i].year;
      break;
    }
  }

  return {
    netRent: rentScenario.netWorth,
    netBuy: buyScenario.netWorth,
    difference: Math.abs(difference),
    winner,
    breakEvenYear,
  };
}

export function generateInsights(
  inputs: SimulatorInputs,
  outputs: SimulatorOutputs,
  derived: DerivedValues
): Insight[] {
  const insights: Insight[] = [];

  // Break-even insight
  if (outputs.breakEvenYear) {
    insights.push({
      id: 'breakeven',
      type: 'neutral',
      message: `The scenarios break even around year ${outputs.breakEvenYear}. ${
        outputs.winner === 'buy'
          ? 'Buying becomes better after this point.'
          : 'Renting stays better throughout.'
      }`,
    });
  }

  // Winner insight
  if (outputs.winner === 'rent') {
    insights.push({
      id: 'winner',
      type: 'positive',
      message: `Renting could make you €${outputs.difference.toLocaleString()} wealthier over ${inputs.timeHorizonYears} years, assuming your investments grow at ${inputs.investmentReturnAnnual}% annually.`,
    });
  } else if (outputs.winner === 'buy') {
    insights.push({
      id: 'winner',
      type: 'positive',
      message: `Buying could make you €${outputs.difference.toLocaleString()} wealthier over ${inputs.timeHorizonYears} years, assuming property appreciates at ${inputs.propertyAppreciationAnnual}% annually.`,
    });
  }

  // Investment sensitivity
  const criticalReturn = inputs.propertyAppreciationAnnual + 2;
  if (inputs.investmentReturnAnnual > criticalReturn) {
    insights.push({
      id: 'sensitivity',
      type: 'neutral',
      message: `If investment returns drop below ${criticalReturn.toFixed(1)}%, buying might become the better option.`,
    });
  }

  // Rent vs mortgage payment comparison
  const yearlyRent = inputs.rentMonthly * 12;
  if (derived.annualMortgagePayment > yearlyRent * 1.5) {
    insights.push({
      id: 'cashflow',
      type: 'neutral',
      message: `Your mortgage payment (€${Math.round(derived.annualMortgagePayment / 12).toLocaleString()}/mo) is significantly higher than rent (€${inputs.rentMonthly.toLocaleString()}/mo), freeing up capital for investments.`,
    });
  }

  // Long-term horizon insight
  if (inputs.timeHorizonYears >= 25) {
    insights.push({
      id: 'longterm',
      type: 'neutral',
      message: `Over a ${inputs.timeHorizonYears}-year horizon, compound growth significantly impacts both scenarios. Small changes in assumptions can lead to large differences.`,
    });
  }

  return insights.slice(0, 4);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}
