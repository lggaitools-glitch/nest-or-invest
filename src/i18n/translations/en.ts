import type { Translations } from '../types';

export const en: Translations = {
  header: {
    title: 'Rent vs Buy',
    subtitle: 'Wealth Simulator',
    freeVersion: 'Free Version',
  },
  hero: {
    heading: 'Should You Rent or Buy?',
    description:
      'Compare your long-term wealth potential. Adjust the assumptions below to see which path could make you wealthier.',
  },
  inputs: {
    title: 'Simulation Parameters',
    selectCountry: 'Select country',
    housing: {
      title: 'Housing',
      propertyPrice: 'Property Price',
      downPayment: 'Down Payment',
      downPaymentHint: '% of property price',
      mortgageRate: 'Mortgage Rate',
      mortgageTerm: 'Mortgage Term',
      monthlyRent: 'Monthly Rent',
      annualRentIncrease: 'Annual Rent Increase',
    },
    financial: {
      title: 'Financial Assumptions',
      investmentReturn: 'Investment Return',
      investmentReturnHint: 'Expected annual return on investments',
      propertyAppreciation: 'Property Appreciation',
      propertyAppreciationHint: 'Expected annual property value growth',
      maintenanceCost: 'Maintenance Cost',
      maintenanceCostHint: 'Annual maintenance as % of property value',
      timeHorizon: 'Time Horizon',
      timeHorizonHint: 'How long you plan to hold',
    },
    units: {
      years: 'yrs',
      percent: '%',
    },
  },
  results: {
    afterYears: 'After {years} years',
    rentingMakesYou: 'Renting could make you',
    buyingMakesYou: 'Buying could make you',
    wealthier: 'wealthier',
    bothEqual: 'Both scenarios are roughly equal',
    rentInvest: 'Rent + Invest',
    buyOwn: 'Buy + Own',
    netWorth: 'Net Worth',
  },
  chart: {
    title: 'Wealth Over Time',
    year: 'Y',
    breakEven: 'Break-even',
    rentLabel: 'Rent + Invest',
    buyLabel: 'Buy + Own',
  },
  insights: {
    title: 'Key Insights',
    breakeven: {
      message: 'The scenarios break even around year {year}.',
      buyingBetter: 'Buying becomes better after this point.',
      rentingBetter: 'Renting stays better throughout.',
    },
    winnerRent:
      'Renting could make you {amount} wealthier over {years} years, assuming your investments grow at {rate}% annually.',
    winnerBuy:
      'Buying could make you {amount} wealthier over {years} years, assuming property appreciates at {rate}% annually.',
    sensitivity:
      'If investment returns drop below {rate}%, buying might become the better option.',
    cashflow:
      'Your mortgage payment ({mortgage}/mo) is significantly higher than rent ({rent}/mo), freeing up capital for investments.',
    longterm:
      'Over a {years}-year horizon, compound growth significantly impacts both scenarios. Small changes in assumptions can lead to large differences.',
  },
  transparency: {
    title: 'Transparency & Assumptions',
    assumptions: {
      title: 'Calculation Assumptions',
      rentScenario: 'Rent Scenario:',
      rentScenarioDesc:
        'Your down payment is invested immediately. Each year, any savings from paying rent instead of a mortgage are added to your investments. Returns compound annually at your specified rate.',
      buyScenario: 'Buy Scenario:',
      buyScenarioDesc:
        'Property value grows at the specified appreciation rate. Total costs include mortgage interest and annual maintenance. Net worth equals property value minus remaining loan and accumulated costs.',
      simplifications: 'Simplifications:',
      simplificationsDesc:
        'This model uses a simplified amortization. Taxes, insurance, closing costs, and transaction fees are not included. Inflation is not explicitly modeled—all values are in today\'s terms.',
    },
    formulas: {
      title: 'Key Formulas',
      mortgagePayment: 'Monthly Mortgage Payment:',
      mortgagePaymentDesc: 'Where P = loan, r = monthly rate, n = total months',
      investmentGrowth: 'Investment Growth:',
      investmentGrowthDesc: 'Compound growth with regular contributions',
      propertyValue: 'Property Value:',
    },
    disclaimer: {
      title: 'Important Disclaimer',
      warning: 'This is an educational tool only.',
      warningDesc:
        'The results are projections based on your assumptions, not financial advice. Actual outcomes will vary based on market conditions, personal circumstances, and factors not included in this model.',
      advice:
        'Before making any real estate or investment decisions, consult with qualified financial advisors, tax professionals, and real estate experts who understand your complete financial situation.',
      risk:
        'Past performance of investments and property values does not guarantee future results. Markets can be volatile, and you could lose money in either scenario.',
    },
  },
  footer: {
    builtWith: 'Built with',
    copyright: '© 2024 Rent vs Buy Simulator',
    educational: 'Educational purposes only',
  },
  countries: {
    spain: 'Spain',
    portugal: 'Portugal',
    brazil: 'Brazil',
    custom: 'Custom',
  },
};
