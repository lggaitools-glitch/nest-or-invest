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
      rentingBecomesBetter: 'Renting becomes better after this point.',
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
    copyright: '© 2024 HomeDecision',
    educational: 'Educational purposes only',
    disclaimer: 'HomeDecision is an educational tool and does not provide financial, legal, or investment advice. Results depend on user-provided assumptions and may not reflect real-world outcomes.',
  },
  countries: {
    spain: 'Spain',
    portugal: 'Portugal',
    brazil: 'Brazil',
    custom: 'Custom',
  },
  landing: {
    seo: {
      title: 'Rent or Buy? Make the Right Housing Decision | HomeDecision',
      description: 'Compare renting vs buying with a rational wealth simulator. HomeDecision shows which option builds more net worth — based on your assumptions.',
    },
    hero: {
      headline: 'Rent or buy?\nMake the decision with numbers, not emotions.',
      subheadline: 'HomeDecision is a rational simulator that compares renting vs buying based on long-term wealth — using your assumptions, not sales promises.',
      cta: 'Start the simulation',
      ctaSecondary: 'No sign-up required · Free to use',
    },
    problem: {
      headline: 'Buying a home is the biggest financial decision most people ever make.',
      intro: 'Yet most decisions are driven by:',
      fears: [
        'Fear of "throwing money away on rent"',
        'Pressure from family, banks, or agents',
        'Biased calculators that assume buying is always better',
      ],
      truth: 'The truth is simpler — and more uncomfortable: Sometimes renting builds more wealth. Sometimes buying does. It depends on the math.',
      conclusion: 'HomeDecision exists to show that math — clearly and honestly.',
    },
    solution: {
      headline: 'A neutral rent vs buy simulator — built for clarity',
      intro: 'HomeDecision helps you:',
      bullets: [
        'Compare Rent + Invest vs Buy + Invest',
        'See your net worth over time in both scenarios',
        'Understand when (or if) buying becomes better',
      ],
      assumptions: [
        'Investment returns',
        'Property appreciation',
        'Rent increases',
        'Mortgage rates',
      ],
      noBias: [
        'No ads.',
        'No commissions.',
        'No "buy now" bias.',
      ],
    },
    howItWorks: {
      headline: 'How the simulator works',
      steps: [
        {
          title: 'Your situation',
          description: 'Enter property price, rent, mortgage terms, and how long you plan to stay.',
        },
        {
          title: 'Your assumptions',
          description: 'Choose expected investment returns, property appreciation, rent increases, and maintenance costs.',
        },
        {
          title: 'Clear results',
          description: 'See net worth for both scenarios, the difference, and which option wins.',
        },
      ],
    },
    visual: {
      headline: 'See the full picture — not just monthly payments',
      body: 'Most calculators focus on monthly costs. HomeDecision focuses on long-term wealth.',
      features: [
        'Wealth growth curves over time',
        'Break-even points',
        'Total rent paid vs total interest paid',
        'Opportunity cost of each decision',
      ],
      conclusion: 'Because the best decision isn\'t always the most popular one.',
    },
    trust: {
      headline: 'Built on transparency',
      bullets: [
        'All assumptions are visible and adjustable',
        'No hidden formulas',
        'Conservative by default',
        'Educational — not financial advice',
      ],
      mission: 'We don\'t sell mortgages. We don\'t sell properties. We don\'t optimize for one outcome. Our only goal is clarity.',
    },
    audience: {
      headline: 'Who HomeDecision is for',
      personas: [
        { icon: 'briefcase', text: 'Professionals deciding whether to buy their first home' },
        { icon: 'users', text: 'Families planning a long-term move' },
        { icon: 'globe', text: 'Expats comparing markets' },
        { icon: 'bar-chart', text: 'Anyone who wants a rational answer — not opinions' },
      ],
    },
    faq: {
      headline: 'Frequently Asked Questions',
      items: [
        {
          q: 'Is renting really sometimes better than buying?',
          a: 'Yes. Depending on investment returns, rent growth, mortgage costs, and time horizon, renting can lead to higher net worth.',
        },
        {
          q: 'Does HomeDecision assume I invest my money?',
          a: 'Yes. The comparison is fair only if unused capital is invested in both scenarios.',
        },
        {
          q: 'Is this financial advice?',
          a: 'No. HomeDecision is an educational simulator designed to help you understand trade-offs.',
        },
        {
          q: 'Can I change assumptions?',
          a: 'Yes. The simulator is fully customizable.',
        },
      ],
    },
    finalCta: {
      headline: 'Make the decision once — with confidence',
      subheadline: 'Stop guessing. Stop arguing. Let the numbers speak.',
      cta: 'Start the rent vs buy simulation',
    },
  },
  simulate: {
    pageTitle: 'Rent vs Buy Simulator',
    pageSubtitle: 'Compare renting and buying based on long-term net worth, using your own assumptions.',
    helperText: 'Takes ~2 minutes · Educational tool · No sign-up required',
    nav: {
      home: 'Home',
      howItWorks: 'How it works',
    },
  },
};
