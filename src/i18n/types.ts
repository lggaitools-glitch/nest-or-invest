export type Language = 'en' | 'es';

export interface LandingTranslations {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
    ctaSecondary: string;
  };
  problem: {
    headline: string;
    intro: string;
    fears: string[];
    truth: string;
    conclusion: string;
  };
  solution: {
    headline: string;
    intro: string;
    bullets: string[];
    assumptions: string[];
    noBias: string[];
  };
  howItWorks: {
    headline: string;
    steps: { title: string; description: string }[];
  };
  visual: {
    headline: string;
    body: string;
    features: string[];
    conclusion: string;
  };
  trust: {
    headline: string;
    bullets: string[];
    mission: string;
  };
  audience: {
    headline: string;
    personas: { icon: string; text: string }[];
  };
  faq: {
    headline: string;
    items: { q: string; a: string }[];
  };
  finalCta: {
    headline: string;
    subheadline: string;
    cta: string;
  };
}

export interface SimulateTranslations {
  pageTitle: string;
  pageSubtitle: string;
  helperText: string;
  nav: {
    home: string;
    simulate: string;
    menu: string;
    howItWorks: string;
  };
}

export interface PricingPlanTranslation {
  name: string;
  description: string;
  priceSubtext?: string;
  features: string[];
  cta: string;
}

export interface PricingTranslations {
  seo: {
    title: string;
    description: string;
  };
  headline: string;
  subheadline: string;
  plans: {
    free: PricingPlanTranslation;
    report: PricingPlanTranslation;
    premium: PricingPlanTranslation;
  };
  comparison: {
    title: string;
    feature: string;
    rows: { feature: string; free: string; report: string; premium: string }[];
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
}

export interface FreeEstimateTranslations {
  pageTitle: string;
  pageSubtitle: string;
  inputs: {
    title: string;
    monthlyRent: string;
    propertyPrice: string;
    interestRate: string;
    timeHorizon: string;
    years: string;
  };
  result: {
    buyingCheaper: string;
    rentingSafer: string;
    itDepends: string;
    basedOn: string;
    estimatedMonthly: string;
    renting: string;
    buying: string;
    perMonth: string;
  };
  disclaimer: string;
  cta: {
    title: string;
    reportTitle: string;
    reportPrice: string;
    reportFeatures: string[];
    reportBtn: string;
    premiumTitle: string;
    premiumPrice: string;
    premiumFeatures: string[];
    premiumBtn: string;
  };
}

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
    disclaimer: string;
  };
  countries: {
    spain: string;
    custom: string;
  };
  landing: LandingTranslations;
  simulate: SimulateTranslations;
  pricing: PricingTranslations;
  freeEstimate: FreeEstimateTranslations;
}
