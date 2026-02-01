import type { Translations } from '../types';

export const ptBR: Translations = {
  header: {
    title: 'Alugar vs Comprar',
    subtitle: 'Simulador de Patrimônio',
    freeVersion: 'Versão Gratuita',
  },
  hero: {
    heading: 'Você Deve Alugar ou Comprar?',
    description:
      'Compare seu potencial de patrimônio a longo prazo. Ajuste as premissas abaixo para ver qual caminho pode te deixar mais rico.',
  },
  inputs: {
    title: 'Parâmetros da Simulação',
    selectCountry: 'Selecionar país',
    housing: {
      title: 'Moradia',
      propertyPrice: 'Preço do Imóvel',
      downPayment: 'Entrada',
      downPaymentHint: '% do preço do imóvel',
      mortgageRate: 'Taxa de Financiamento',
      mortgageTerm: 'Prazo do Financiamento',
      monthlyRent: 'Aluguel Mensal',
      annualRentIncrease: 'Reajuste Anual do Aluguel',
    },
    financial: {
      title: 'Premissas Financeiras',
      investmentReturn: 'Retorno de Investimentos',
      investmentReturnHint: 'Retorno anual esperado dos investimentos',
      propertyAppreciation: 'Valorização do Imóvel',
      propertyAppreciationHint: 'Valorização anual esperada do imóvel',
      maintenanceCost: 'Custo de Manutenção',
      maintenanceCostHint: 'Manutenção anual como % do valor do imóvel',
      timeHorizon: 'Horizonte de Tempo',
      timeHorizonHint: 'Por quanto tempo você planeja manter',
    },
    units: {
      years: 'anos',
      percent: '%',
    },
  },
  results: {
    afterYears: 'Após {years} anos',
    rentingMakesYou: 'Alugar pode te deixar',
    buyingMakesYou: 'Comprar pode te deixar',
    wealthier: 'mais rico',
    bothEqual: 'Ambos os cenários são aproximadamente iguais',
    rentInvest: 'Alugar + Investir',
    buyOwn: 'Comprar + Ter',
    netWorth: 'Patrimônio Líquido',
  },
  chart: {
    title: 'Patrimônio ao Longo do Tempo',
    year: 'A',
    breakEven: 'Ponto de Equilíbrio',
    rentLabel: 'Alugar + Investir',
    buyLabel: 'Comprar + Ter',
  },
  insights: {
    title: 'Principais Insights',
    breakeven: {
      message: 'Os cenários se equilibram por volta do ano {year}.',
      buyingBetter: 'Comprar se torna melhor após este ponto.',
      rentingBetter: 'Alugar continua sendo melhor ao longo do tempo.',
    },
    winnerRent:
      'Alugar pode te deixar {amount} mais rico em {years} anos, assumindo que seus investimentos cresçam {rate}% ao ano.',
    winnerBuy:
      'Comprar pode te deixar {amount} mais rico em {years} anos, assumindo que o imóvel valorize {rate}% ao ano.',
    sensitivity:
      'Se o retorno dos investimentos cair abaixo de {rate}%, comprar pode se tornar a melhor opção.',
    cashflow:
      'Sua parcela do financiamento ({mortgage}/mês) é significativamente maior que o aluguel ({rent}/mês), liberando capital para investimentos.',
    longterm:
      'Em um horizonte de {years} anos, os juros compostos impactam significativamente ambos os cenários. Pequenas mudanças nas premissas podem levar a grandes diferenças.',
  },
  transparency: {
    title: 'Transparência e Premissas',
    assumptions: {
      title: 'Premissas de Cálculo',
      rentScenario: 'Cenário de Aluguel:',
      rentScenarioDesc:
        'Sua entrada é investida imediatamente. A cada ano, qualquer economia ao pagar aluguel em vez de financiamento é adicionada aos seus investimentos. Os retornos são compostos anualmente na taxa especificada.',
      buyScenario: 'Cenário de Compra:',
      buyScenarioDesc:
        'O valor do imóvel cresce na taxa de valorização especificada. Os custos totais incluem juros do financiamento e manutenção anual. O patrimônio líquido é igual ao valor do imóvel menos o saldo devedor e custos acumulados.',
      simplifications: 'Simplificações:',
      simplificationsDesc:
        'Este modelo usa uma amortização simplificada. Impostos, seguros, custos de fechamento e taxas de transação não estão incluídos. A inflação não é modelada explicitamente—todos os valores estão em termos atuais.',
    },
    formulas: {
      title: 'Fórmulas Principais',
      mortgagePayment: 'Parcela Mensal do Financiamento:',
      mortgagePaymentDesc: 'Onde P = empréstimo, r = taxa mensal, n = total de meses',
      investmentGrowth: 'Crescimento do Investimento:',
      investmentGrowthDesc: 'Crescimento composto com contribuições regulares',
      propertyValue: 'Valor do Imóvel:',
    },
    disclaimer: {
      title: 'Aviso Importante',
      warning: 'Esta é apenas uma ferramenta educacional.',
      warningDesc:
        'Os resultados são projeções baseadas em suas premissas, não aconselhamento financeiro. Os resultados reais variarão com base nas condições de mercado, circunstâncias pessoais e fatores não incluídos neste modelo.',
      advice:
        'Antes de tomar qualquer decisão imobiliária ou de investimento, consulte consultores financeiros qualificados, profissionais tributários e especialistas imobiliários que entendam sua situação financeira completa.',
      risk:
        'Desempenho passado de investimentos e valores de imóveis não garante resultados futuros. Os mercados podem ser voláteis e você pode perder dinheiro em qualquer cenário.',
    },
  },
  footer: {
    builtWith: 'Feito com',
    copyright: '© 2024 Simulador Alugar vs Comprar',
    educational: 'Apenas para fins educacionais',
  },
  countries: {
    spain: 'Espanha',
    portugal: 'Portugal',
    brazil: 'Brasil',
    custom: 'Personalizado',
  },
};
