export interface SimulatorInputs {
  // Housing Inputs
  propertyPrice: number;
  downPayment: number;
  mortgageRate: number;
  mortgageYears: number;
  rentMonthly: number;
  rentIncreaseAnnual: number;
  
  // Financial Assumptions
  investmentReturnAnnual: number;
  propertyAppreciationAnnual: number;
  maintenancePercentAnnual: number;
  timeHorizonYears: number;
}

export interface DerivedValues {
  loanAmount: number;
  maintenanceYear: number;
  rentAnnualYear1: number;
  annualMortgagePayment: number;
}

export interface ScenarioRent {
  initialInvestment: number;
  investmentFinal: number;
  totalRentPaid: number;
  netWorth: number;
  yearlyData: YearlyData[];
}

export interface ScenarioBuy {
  mortgageTotalPaid: number;
  mortgageInterest: number;
  maintenanceTotal: number;
  propertyValueFinal: number;
  investmentFinal: number;
  netWorth: number;
  yearlyData: YearlyData[];
}

export interface YearlyData {
  year: number;
  rentNetWorth: number;
  buyNetWorth: number;
  rentPaid?: number;
  mortgagePaid?: number;
  propertyValue?: number;
  investmentValue?: number;
}

export interface SimulatorOutputs {
  netRent: number;
  netBuy: number;
  difference: number;
  winner: 'rent' | 'buy' | 'tie';
  breakEvenYear: number | null;
}

export interface InsightData {
  year?: number;
  winner?: 'rent' | 'buy';
  difference?: number;
  years?: number;
  rate?: number;
  mortgage?: number;
  rent?: number;
}

export interface Insight {
  id: string;
  type: 'positive' | 'negative' | 'neutral';
  message: string;
  data?: InsightData;
}

export interface CountryPreset {
  id: string;
  name: string;
  flag: string;
  values: Partial<SimulatorInputs>;
}

export const COUNTRY_PRESETS: CountryPreset[] = [
  {
    id: 'spain',
    name: 'Spain',
    flag: '🇪🇸',
    values: {
      propertyPrice: 250000,
      downPayment: 50000,
      mortgageRate: 3.5,
      mortgageYears: 30,
      rentMonthly: 1000,
      rentIncreaseAnnual: 3,
      investmentReturnAnnual: 7,
      propertyAppreciationAnnual: 2,
      maintenancePercentAnnual: 1,
      timeHorizonYears: 20,
    },
  },
  {
    id: 'portugal',
    name: 'Portugal',
    flag: '🇵🇹',
    values: {
      propertyPrice: 300000,
      downPayment: 60000,
      mortgageRate: 3.8,
      mortgageYears: 30,
      rentMonthly: 1200,
      rentIncreaseAnnual: 4,
      investmentReturnAnnual: 7,
      propertyAppreciationAnnual: 3,
      maintenancePercentAnnual: 1,
      timeHorizonYears: 20,
    },
  },
  {
    id: 'brazil',
    name: 'Brazil',
    flag: '🇧🇷',
    values: {
      propertyPrice: 500000,
      downPayment: 100000,
      mortgageRate: 9,
      mortgageYears: 25,
      rentMonthly: 2500,
      rentIncreaseAnnual: 5,
      investmentReturnAnnual: 10,
      propertyAppreciationAnnual: 4,
      maintenancePercentAnnual: 1.5,
      timeHorizonYears: 15,
    },
  },
  {
    id: 'custom',
    name: 'Custom',
    flag: '⚙️',
    values: {},
  },
];

export const DEFAULT_INPUTS: SimulatorInputs = {
  propertyPrice: 250000,
  downPayment: 50000,
  mortgageRate: 3.5,
  mortgageYears: 30,
  rentMonthly: 1000,
  rentIncreaseAnnual: 3,
  investmentReturnAnnual: 7,
  propertyAppreciationAnnual: 2,
  maintenancePercentAnnual: 1,
  timeHorizonYears: 20,
};
