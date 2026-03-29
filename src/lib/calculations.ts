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

/**
 * Remaining loan balance after n months using the closed-form formula:
 * B(n) = P * [(1+r)^N - (1+r)^n] / [(1+r)^N - 1]
 */
function remainingBalance(
  principal: number,
  annualRate: number,
  totalYears: number,
  monthsPaid: number
): number {
  if (annualRate === 0) {
    const totalMonths = totalYears * 12;
    return principal * Math.max(0, 1 - monthsPaid / totalMonths);
  }
  const r = annualRate / 100 / 12;
  const N = totalYears * 12;
  const n = Math.min(monthsPaid, N);
  if (n >= N) return 0;
  return (
    principal *
    (Math.pow(1 + r, N) - Math.pow(1 + r, n)) /
    (Math.pow(1 + r, N) - 1)
  );
}

/**
 * For variable-rate mortgages, compute the remaining balance after the initial
 * fixed period, then recalculate the payment for the remaining term at the
 * variable rate (euriborForecast + variableSpread).
 */
export function calculateDerivedValues(inputs: SimulatorInputs): DerivedValues {
  const loanAmount = inputs.propertyPrice - inputs.downPayment;
  const maintenanceYear = inputs.propertyPrice * (inputs.maintenancePercentAnnual / 100);
  const rentAnnualYear1 = inputs.rentMonthly * 12;

  if (inputs.mortgageType === 'variable') {
    const fixedMonthly = calculatePMT(inputs.initialFixedRate, inputs.mortgageYears, loanAmount);
    const annualMortgagePayment = fixedMonthly * 12;

    const effectiveVariableRate = inputs.euriborForecast + inputs.variableSpread;
    const balanceAtTransition = remainingBalance(
      loanAmount,
      inputs.initialFixedRate,
      inputs.mortgageYears,
      inputs.initialFixedYears * 12
    );
    const remainingYears = inputs.mortgageYears - inputs.initialFixedYears;
    const variableMonthly =
      remainingYears > 0
        ? calculatePMT(effectiveVariableRate, remainingYears, balanceAtTransition)
        : 0;
    const annualVariablePayment = variableMonthly * 12;

    return {
      loanAmount,
      maintenanceYear,
      rentAnnualYear1,
      annualMortgagePayment, // fixed-period annual payment
      annualVariablePayment,
      effectiveVariableRate,
    };
  }

  const monthlyPayment = calculatePMT(inputs.mortgageRate, inputs.mortgageYears, loanAmount);
  const annualMortgagePayment = monthlyPayment * 12;

  return {
    loanAmount,
    maintenanceYear,
    rentAnnualYear1,
    annualMortgagePayment,
  };
}

/**
 * Returns the annual mortgage payment for a given year, accounting for
 * fixed vs variable periods when mortgageType === 'variable'.
 */
function getAnnualPaymentForYear(
  year: number,
  inputs: SimulatorInputs,
  derived: DerivedValues
): number {
  if (year > inputs.mortgageYears) return 0;
  if (inputs.mortgageType === 'variable' && year > inputs.initialFixedYears) {
    return derived.annualVariablePayment ?? derived.annualMortgagePayment;
  }
  return derived.annualMortgagePayment;
}

/**
 * Returns the remaining loan balance at the end of the given year,
 * handling two-phase variable-rate amortization.
 */
function getTwoPhaseBalance(
  year: number,
  inputs: SimulatorInputs,
  derived: DerivedValues
): number {
  if (inputs.mortgageType !== 'variable') {
    return remainingBalance(
      derived.loanAmount,
      inputs.mortgageRate,
      inputs.mortgageYears,
      Math.min(year, inputs.mortgageYears) * 12
    );
  }

  // Fixed phase
  if (year <= inputs.initialFixedYears) {
    return remainingBalance(
      derived.loanAmount,
      inputs.initialFixedRate,
      inputs.mortgageYears,
      year * 12
    );
  }

  // Variable phase: balance at transition, then amortize at variable rate
  const balanceAtTransition = remainingBalance(
    derived.loanAmount,
    inputs.initialFixedRate,
    inputs.mortgageYears,
    inputs.initialFixedYears * 12
  );
  const effectiveRate = derived.effectiveVariableRate ?? inputs.mortgageRate;
  const remainingTerm = inputs.mortgageYears - inputs.initialFixedYears;
  const variableMonthsPaid = (year - inputs.initialFixedYears) * 12;

  return remainingBalance(balanceAtTransition, effectiveRate, remainingTerm, variableMonthsPaid);
}

export function calculateRentScenario(
  inputs: SimulatorInputs,
  derived: DerivedValues
): ScenarioRent {
  const yearlyData: YearlyData[] = [];
  let totalRentPaid = 0;
  let investmentValue = inputs.downPayment;
  const investmentRate = inputs.investmentReturnAnnual / 100;

  // The renter also doesn't pay closing costs, property tax, or community fees.
  // The buyer's total annual housing cost = mortgage + maintenance + property tax + community fees.
  // The renter's total annual housing cost = rent.
  // Surplus = buyer's annual cost - renter's annual cost (if positive, renter invests the difference).
  const annualPropertyTax = inputs.propertyTaxAnnual;
  const annualCommunityFees = inputs.communityFeesMonthly * 12;

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

    // Buyer's annual housing cost (mortgage + maintenance + property tax + community fees)
    const buyerAnnualCost =
      getAnnualPaymentForYear(year, inputs, derived) +
      derived.maintenanceYear +
      annualPropertyTax +
      annualCommunityFees;

    // Calculate surplus (what renter saves compared to buyer's total housing cost)
    const surplus = Math.max(0, buyerAnnualCost - rentThisYear);

    // Grow investment: previous value + surplus, then compound
    investmentValue = (investmentValue + surplus) * (1 + investmentRate);

    // Rent net worth = investment portfolio value
    // (Rent is a living expense — buyer also has housing costs)
    yearlyData.push({
      year,
      rentNetWorth: investmentValue,
      buyNetWorth: 0, // Will be filled by buy scenario
      investmentValue,
      rentPaid: totalRentPaid,
    });
  }

  return {
    initialInvestment: inputs.downPayment,
    investmentFinal: investmentValue,
    totalRentPaid,
    netWorth: investmentValue,
    yearlyData,
  };
}

export function calculateBuyScenario(
  inputs: SimulatorInputs,
  derived: DerivedValues
): ScenarioBuy {
  const yearlyData: YearlyData[] = [];
  const yearsToPayMortgage = Math.min(inputs.mortgageYears, inputs.timeHorizonYears);

  const closingCosts = inputs.propertyPrice * (inputs.closingCostsPercent / 100);
  const annualPropertyTax = inputs.propertyTaxAnnual;
  const annualCommunityFees = inputs.communityFeesMonthly * 12;

  // Calculate total mortgage paid across both phases
  let mortgageTotalPaid = 0;
  for (let y = 1; y <= yearsToPayMortgage; y++) {
    mortgageTotalPaid += getAnnualPaymentForYear(y, inputs, derived);
  }

  // Calculate total interest using proper amortization
  const finalBalance = getTwoPhaseBalance(yearsToPayMortgage, inputs, derived);
  const principalPaid = derived.loanAmount - finalBalance;
  const mortgageInterest = mortgageTotalPaid - principalPaid;

  const maintenanceTotal = derived.maintenanceYear * inputs.timeHorizonYears;

  const propertyValueFinal =
    inputs.propertyPrice *
    Math.pow(1 + inputs.propertyAppreciationAnnual / 100, inputs.timeHorizonYears);

  for (let year = 0; year <= inputs.timeHorizonYears; year++) {
    if (year === 0) {
      yearlyData.push({
        year,
        rentNetWorth: 0,
        buyNetWorth: inputs.downPayment - closingCosts, // Initial equity minus closing costs
        propertyValue: inputs.propertyPrice,
        mortgagePaid: 0,
      });
      continue;
    }

    // Calculate property value at this year
    const propertyValue =
      inputs.propertyPrice *
      Math.pow(1 + inputs.propertyAppreciationAnnual / 100, year);

    // Remaining loan balance using proper amortization (handles two-phase)
    const loanBalance = getTwoPhaseBalance(year, inputs, derived);

    // Equity = Property value - Remaining loan
    const equity = propertyValue - loanBalance;

    // Total cash outflows so far: closing costs + maintenance + property tax + community fees
    const totalMaintenanceSoFar = derived.maintenanceYear * year;
    const totalPropertyTaxSoFar = annualPropertyTax * year;
    const totalCommunityFeesSoFar = annualCommunityFees * year;
    const totalCashOutflows =
      closingCosts + totalMaintenanceSoFar + totalPropertyTaxSoFar + totalCommunityFeesSoFar;

    // Buy net worth = equity - cash outflows that reduced your wealth
    const netWorth = equity - totalCashOutflows;

    yearlyData.push({
      year,
      rentNetWorth: 0,
      buyNetWorth: netWorth,
      propertyValue,
      mortgagePaid: Array.from({ length: Math.min(year, inputs.mortgageYears) }, (_, i) =>
        getAnnualPaymentForYear(i + 1, inputs, derived)
      ).reduce((a, b) => a + b, 0),
    });
  }

  // Final net worth uses the same formula as yearly
  const totalPropertyTax = annualPropertyTax * inputs.timeHorizonYears;
  const totalCommunityFees = annualCommunityFees * inputs.timeHorizonYears;
  const finalEquity = propertyValueFinal - finalBalance;
  const netWorth = finalEquity - closingCosts - maintenanceTotal - totalPropertyTax - totalCommunityFees;

  return {
    mortgageTotalPaid,
    mortgageInterest,
    maintenanceTotal,
    propertyValueFinal,
    investmentFinal: 0,
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
  derived: DerivedValues,
  rentScenario: ScenarioRent,
  buyScenario: ScenarioBuy
): Insight[] {
  const insights: Insight[] = [];

  // Break-even insight
  if (outputs.breakEvenYear) {
    const y = outputs.breakEvenYear;
    const rentAtBreakEven = rentScenario.yearlyData[y]?.rentNetWorth;
    const buyAtBreakEven = buyScenario.yearlyData[y]?.buyNetWorth;

    const diffAtBreakEven =
      typeof rentAtBreakEven === 'number' && typeof buyAtBreakEven === 'number'
        ? rentAtBreakEven - buyAtBreakEven
        : null;

    const afterWinner: 'rent' | 'buy' | undefined =
      diffAtBreakEven === null || Math.abs(diffAtBreakEven) < 1e-9
        ? undefined
        : diffAtBreakEven > 0
          ? 'rent'
          : 'buy';

    const afterText =
      afterWinner === 'buy'
        ? 'Buying becomes better after this point.'
        : afterWinner === 'rent'
          ? 'Renting becomes better after this point.'
          : '';

    insights.push({
      id: 'breakeven',
      type: 'neutral',
      message: `The scenarios break even around year ${outputs.breakEvenYear}. ${afterText}`.trim(),
      data: {
        year: outputs.breakEvenYear,
        winner: outputs.winner === 'tie' ? undefined : outputs.winner,
        afterWinner,
      },
    });
  }

  // Winner insight
  if (outputs.winner === 'rent') {
    insights.push({
      id: 'winner',
      type: 'positive',
      message: `Renting could make you €${outputs.difference.toLocaleString()} wealthier over ${inputs.timeHorizonYears} years, assuming your investments grow at ${inputs.investmentReturnAnnual}% annually.`,
      data: {
        winner: 'rent',
        difference: outputs.difference,
        years: inputs.timeHorizonYears,
        rate: inputs.investmentReturnAnnual,
      },
    });
  } else if (outputs.winner === 'buy') {
    insights.push({
      id: 'winner',
      type: 'positive',
      message: `Buying could make you €${outputs.difference.toLocaleString()} wealthier over ${inputs.timeHorizonYears} years, assuming property appreciates at ${inputs.propertyAppreciationAnnual}% annually.`,
      data: {
        winner: 'buy',
        difference: outputs.difference,
        years: inputs.timeHorizonYears,
        rate: inputs.propertyAppreciationAnnual,
      },
    });
  }

  // Investment sensitivity
  const criticalReturn = inputs.propertyAppreciationAnnual + 2;
  if (inputs.investmentReturnAnnual > criticalReturn) {
    insights.push({
      id: 'sensitivity',
      type: 'neutral',
      message: `If investment returns drop below ${criticalReturn.toFixed(1)}%, buying might become the better option.`,
      data: {
        rate: parseFloat(criticalReturn.toFixed(1)),
      },
    });
  }

  // Rent vs mortgage payment comparison
  const yearlyRent = inputs.rentMonthly * 12;
  if (derived.annualMortgagePayment > yearlyRent * 1.5) {
    insights.push({
      id: 'cashflow',
      type: 'neutral',
      message: `Your mortgage payment (€${Math.round(derived.annualMortgagePayment / 12).toLocaleString()}/mo) is significantly higher than rent (€${inputs.rentMonthly.toLocaleString()}/mo), freeing up capital for investments.`,
      data: {
        mortgage: Math.round(derived.annualMortgagePayment / 12),
        rent: inputs.rentMonthly,
      },
    });
  }

  // Variable rate insight
  if (inputs.mortgageType === 'variable' && derived.effectiveVariableRate !== undefined) {
    const effectiveRate = derived.effectiveVariableRate;
    const fixedRate = inputs.initialFixedRate;
    const paymentShock = effectiveRate - fixedRate;

    if (paymentShock > 1) {
      insights.push({
        id: 'variable-rate-shock',
        type: 'negative',
        message: `After the ${inputs.initialFixedYears}-year fixed period, your rate jumps from ${fixedRate.toFixed(1)}% to ${effectiveRate.toFixed(1)}%. This ${paymentShock.toFixed(1)}pp increase could significantly raise your monthly payment.`,
        data: {
          rate: effectiveRate,
        },
      });
    } else {
      insights.push({
        id: 'variable-rate',
        type: 'neutral',
        message: `After the ${inputs.initialFixedYears}-year fixed period, your effective variable rate will be ${effectiveRate.toFixed(1)}% (Euribor ${inputs.euriborForecast}% + ${inputs.variableSpread}% spread).`,
        data: {
          rate: effectiveRate,
        },
      });
    }
  }

  // Long-term horizon insight
  if (inputs.timeHorizonYears >= 25) {
    insights.push({
      id: 'longterm',
      type: 'neutral',
      message: `Over a ${inputs.timeHorizonYears}-year horizon, compound growth significantly impacts both scenarios. Small changes in assumptions can lead to large differences.`,
      data: {
        years: inputs.timeHorizonYears,
      },
    });
  }

  return insights.slice(0, 4);
}

export function formatCurrency(value: number, countryId: string = 'spain'): string {
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
