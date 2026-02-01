export type Language = 'en' | 'pt-BR' | 'es';

export interface Translations {
  header: {
    title: string;
    subtitle: string;
    freeVersion: string;
  };
  hero: {
    heading: string;
    description: string;
  };
  inputs: {
    title: string;
    selectCountry: string;
    housing: {
      title: string;
      propertyPrice: string;
      downPayment: string;
      downPaymentHint: string;
      mortgageRate: string;
      mortgageTerm: string;
      monthlyRent: string;
      annualRentIncrease: string;
    };
    financial: {
      title: string;
      investmentReturn: string;
      investmentReturnHint: string;
      propertyAppreciation: string;
      propertyAppreciationHint: string;
      maintenanceCost: string;
      maintenanceCostHint: string;
      timeHorizon: string;
      timeHorizonHint: string;
    };
    units: {
      years: string;
      percent: string;
    };
  };
  results: {
    afterYears: string;
    rentingMakesYou: string;
    buyingMakesYou: string;
    wealthier: string;
    bothEqual: string;
    rentInvest: string;
    buyOwn: string;
    netWorth: string;
  };
  chart: {
    title: string;
    year: string;
    breakEven: string;
    rentLabel: string;
    buyLabel: string;
  };
  insights: {
    title: string;
    breakeven: {
      message: string;
      buyingBetter: string;
      rentingBecomesBetter: string;
      rentingBetter: string;
    };
    winnerRent: string;
    winnerBuy: string;
    sensitivity: string;
    cashflow: string;
    longterm: string;
  };
  transparency: {
    title: string;
    assumptions: {
      title: string;
      rentScenario: string;
      rentScenarioDesc: string;
      buyScenario: string;
      buyScenarioDesc: string;
      simplifications: string;
      simplificationsDesc: string;
    };
    formulas: {
      title: string;
      mortgagePayment: string;
      mortgagePaymentDesc: string;
      investmentGrowth: string;
      investmentGrowthDesc: string;
      propertyValue: string;
    };
    disclaimer: {
      title: string;
      warning: string;
      warningDesc: string;
      advice: string;
      risk: string;
    };
  };
  footer: {
    builtWith: string;
    copyright: string;
    educational: string;
  };
  countries: {
    spain: string;
    portugal: string;
    brazil: string;
    custom: string;
  };
}
