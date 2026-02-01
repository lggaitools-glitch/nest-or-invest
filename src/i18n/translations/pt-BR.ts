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
      rentingBecomesBetter: 'Alugar se torna melhor após este ponto.',
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
    copyright: '© 2024 HomeDecision',
    educational: 'Apenas para fins educacionais',
    disclaimer: 'HomeDecision é uma ferramenta educacional e não fornece aconselhamento financeiro, jurídico ou de investimento. Os resultados dependem das premissas fornecidas pelo usuário e podem não refletir resultados do mundo real.',
  },
  countries: {
    spain: 'Espanha',
    portugal: 'Portugal',
    brazil: 'Brasil',
    custom: 'Personalizado',
  },
  landing: {
    seo: {
      title: 'Alugar ou Comprar? Tome a Decisão Certa | HomeDecision',
      description: 'Compare alugar vs comprar com um simulador racional de patrimônio. HomeDecision mostra qual opção constrói mais patrimônio — baseado nas suas premissas.',
    },
    hero: {
      headline: 'Alugar ou comprar?\nTome a decisão com números, não emoções.',
      subheadline: 'HomeDecision é um simulador racional que compara alugar vs comprar baseado em patrimônio de longo prazo — usando suas premissas, não promessas de vendas.',
      cta: 'Iniciar simulação',
      ctaSecondary: 'Sem cadastro · Grátis',
    },
    problem: {
      headline: 'Comprar uma casa é a maior decisão financeira que a maioria das pessoas toma.',
      intro: 'No entanto, a maioria das decisões são motivadas por:',
      fears: [
        'Medo de "jogar dinheiro fora com aluguel"',
        'Pressão da família, bancos ou corretores',
        'Calculadoras enviesadas que assumem que comprar é sempre melhor',
      ],
      truth: 'A verdade é mais simples — e mais desconfortável: Às vezes alugar constrói mais patrimônio. Às vezes comprar. Depende da matemática.',
      conclusion: 'HomeDecision existe para mostrar essa matemática — de forma clara e honesta.',
    },
    solution: {
      headline: 'Um simulador neutro de alugar vs comprar — construído para clareza',
      intro: 'HomeDecision te ajuda a:',
      bullets: [
        'Comparar Alugar + Investir vs Comprar + Investir',
        'Ver seu patrimônio ao longo do tempo em ambos os cenários',
        'Entender quando (ou se) comprar se torna melhor',
      ],
      assumptions: [
        'Retornos de investimentos',
        'Valorização do imóvel',
        'Reajustes de aluguel',
        'Taxas de financiamento',
      ],
      noBias: [
        'Sem anúncios.',
        'Sem comissões.',
        'Sem viés de "compre agora".',
      ],
    },
    howItWorks: {
      headline: 'Como o simulador funciona',
      steps: [
        {
          title: 'Sua situação',
          description: 'Insira o preço do imóvel, aluguel, condições do financiamento e por quanto tempo você planeja ficar.',
        },
        {
          title: 'Suas premissas',
          description: 'Escolha retornos esperados de investimentos, valorização do imóvel, reajustes de aluguel e custos de manutenção.',
        },
        {
          title: 'Resultados claros',
          description: 'Veja o patrimônio para ambos os cenários, a diferença, e qual opção vence.',
        },
      ],
    },
    visual: {
      headline: 'Veja o quadro completo — não apenas pagamentos mensais',
      body: 'A maioria das calculadoras foca em custos mensais. HomeDecision foca em patrimônio de longo prazo.',
      features: [
        'Curvas de crescimento de patrimônio ao longo do tempo',
        'Pontos de equilíbrio',
        'Total de aluguel pago vs total de juros pagos',
        'Custo de oportunidade de cada decisão',
      ],
      conclusion: 'Porque a melhor decisão nem sempre é a mais popular.',
    },
    trust: {
      headline: 'Construído com transparência',
      bullets: [
        'Todas as premissas são visíveis e ajustáveis',
        'Sem fórmulas ocultas',
        'Conservador por padrão',
        'Educacional — não aconselhamento financeiro',
      ],
      mission: 'Não vendemos financiamentos. Não vendemos imóveis. Não otimizamos para um resultado. Nosso único objetivo é clareza.',
    },
    audience: {
      headline: 'Para quem é o HomeDecision',
      personas: [
        { icon: 'briefcase', text: 'Profissionais decidindo se compram sua primeira casa' },
        { icon: 'users', text: 'Famílias planejando uma mudança de longo prazo' },
        { icon: 'globe', text: 'Expatriados comparando mercados' },
        { icon: 'bar-chart', text: 'Qualquer um que queira uma resposta racional — não opiniões' },
      ],
    },
    faq: {
      headline: 'Perguntas Frequentes',
      items: [
        {
          q: 'Alugar é realmente às vezes melhor que comprar?',
          a: 'Sim. Dependendo dos retornos de investimento, crescimento do aluguel, custos de financiamento e horizonte de tempo, alugar pode levar a um patrimônio maior.',
        },
        {
          q: 'O HomeDecision assume que eu invisto meu dinheiro?',
          a: 'Sim. A comparação só é justa se o capital não utilizado for investido em ambos os cenários.',
        },
        {
          q: 'Isso é aconselhamento financeiro?',
          a: 'Não. HomeDecision é um simulador educacional projetado para ajudá-lo a entender trade-offs.',
        },
        {
          q: 'Posso alterar as premissas?',
          a: 'Sim. O simulador é totalmente personalizável.',
        },
      ],
    },
    finalCta: {
      headline: 'Tome a decisão uma vez — com confiança',
      subheadline: 'Pare de adivinhar. Pare de discutir. Deixe os números falarem.',
      cta: 'Iniciar simulação de alugar vs comprar',
    },
  },
  simulate: {
    pageTitle: 'Simulador Alugar vs Comprar',
    pageSubtitle: 'Compare alugar e comprar baseado em patrimônio de longo prazo, usando suas próprias premissas.',
    helperText: 'Leva ~2 minutos · Ferramenta educacional · Sem cadastro',
    nav: {
      home: 'Início',
      howItWorks: 'Como funciona',
    },
  },
};
