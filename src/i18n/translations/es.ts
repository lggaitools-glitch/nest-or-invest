import type { Translations } from '../types';

export const es: Translations = {
  header: {
    title: 'Alquilar vs Comprar',
    subtitle: 'Simulador de Patrimonio',
    freeVersion: 'Versión Gratuita',
  },
  hero: {
    heading: '¿Deberías Alquilar o Comprar?',
    description:
      'Compara tu potencial de patrimonio a largo plazo. Ajusta las suposiciones a continuación para ver qué camino podría hacerte más rico.',
  },
  inputs: {
    title: 'Parámetros de Simulación',
    selectCountry: 'Seleccionar país',
    housing: {
      title: 'Vivienda',
      propertyPrice: 'Precio del Inmueble',
      downPayment: 'Entrada',
      downPaymentHint: '% del precio del inmueble',
      mortgageRate: 'Tasa Hipotecaria',
      mortgageTerm: 'Plazo de Hipoteca',
      monthlyRent: 'Alquiler Mensual',
      annualRentIncrease: 'Aumento Anual del Alquiler',
    },
    financial: {
      title: 'Supuestos Financieros',
      investmentReturn: 'Retorno de Inversiones',
      investmentReturnHint: 'Retorno anual esperado de las inversiones',
      propertyAppreciation: 'Apreciación del Inmueble',
      propertyAppreciationHint: 'Crecimiento anual esperado del valor del inmueble',
      maintenanceCost: 'Costo de Mantenimiento',
      maintenanceCostHint: 'Mantenimiento anual como % del valor del inmueble',
      timeHorizon: 'Horizonte de Tiempo',
      timeHorizonHint: 'Por cuánto tiempo planeas mantener',
    },
    units: {
      years: 'años',
      percent: '%',
    },
  },
  results: {
    afterYears: 'Después de {years} años',
    rentingMakesYou: 'Alquilar podría dejarte',
    buyingMakesYou: 'Comprar podría dejarte',
    wealthier: 'más rico',
    bothEqual: 'Ambos escenarios son aproximadamente iguales',
    rentInvest: 'Alquilar + Invertir',
    buyOwn: 'Comprar + Poseer',
    netWorth: 'Patrimonio Neto',
  },
  chart: {
    title: 'Patrimonio a lo Largo del Tiempo',
    year: 'A',
    breakEven: 'Punto de Equilibrio',
    rentLabel: 'Alquilar + Invertir',
    buyLabel: 'Comprar + Poseer',
  },
  insights: {
    title: 'Ideas Clave',
    breakeven: {
      message: 'Los escenarios se equilibran alrededor del año {year}.',
      buyingBetter: 'Comprar se vuelve mejor después de este punto.',
      rentingBecomesBetter: 'Alquilar se vuelve mejor después de este punto.',
      rentingBetter: 'Alquilar sigue siendo mejor en general.',
    },
    winnerRent:
      'Alquilar podría hacerte {amount} más rico en {years} años, asumiendo que tus inversiones crezcan al {rate}% anual.',
    winnerBuy:
      'Comprar podría hacerte {amount} más rico en {years} años, asumiendo que el inmueble se aprecie al {rate}% anual.',
    sensitivity:
      'Si los retornos de inversión caen por debajo del {rate}%, comprar podría convertirse en la mejor opción.',
    cashflow:
      'Tu pago hipotecario ({mortgage}/mes) es significativamente más alto que el alquiler ({rent}/mes), liberando capital para inversiones.',
    longterm:
      'En un horizonte de {years} años, el crecimiento compuesto impacta significativamente ambos escenarios. Pequeños cambios en las suposiciones pueden llevar a grandes diferencias.',
  },
  transparency: {
    title: 'Transparencia y Supuestos',
    assumptions: {
      title: 'Supuestos de Cálculo',
      rentScenario: 'Escenario de Alquiler:',
      rentScenarioDesc:
        'Tu entrada se invierte inmediatamente. Cada año, cualquier ahorro al pagar alquiler en lugar de hipoteca se añade a tus inversiones. Los retornos se componen anualmente a tu tasa especificada.',
      buyScenario: 'Escenario de Compra:',
      buyScenarioDesc:
        'El valor del inmueble crece a la tasa de apreciación especificada. Los costos totales incluyen intereses hipotecarios y mantenimiento anual. El patrimonio neto es igual al valor del inmueble menos el préstamo restante y costos acumulados.',
      simplifications: 'Simplificaciones:',
      simplificationsDesc:
        'Este modelo usa una amortización simplificada. Impuestos, seguros, costos de cierre y tarifas de transacción no están incluidos. La inflación no se modela explícitamente—todos los valores están en términos actuales.',
    },
    formulas: {
      title: 'Fórmulas Clave',
      mortgagePayment: 'Pago Hipotecario Mensual:',
      mortgagePaymentDesc: 'Donde P = préstamo, r = tasa mensual, n = meses totales',
      investmentGrowth: 'Crecimiento de Inversión:',
      investmentGrowthDesc: 'Crecimiento compuesto con contribuciones regulares',
      propertyValue: 'Valor del Inmueble:',
    },
    disclaimer: {
      title: 'Aviso Importante',
      warning: 'Esta es solo una herramienta educativa.',
      warningDesc:
        'Los resultados son proyecciones basadas en tus suposiciones, no asesoramiento financiero. Los resultados reales variarán según las condiciones del mercado, circunstancias personales y factores no incluidos en este modelo.',
      advice:
        'Antes de tomar cualquier decisión inmobiliaria o de inversión, consulta con asesores financieros calificados, profesionales fiscales y expertos inmobiliarios que entiendan tu situación financiera completa.',
      risk:
        'El rendimiento pasado de inversiones y valores de propiedades no garantiza resultados futuros. Los mercados pueden ser volátiles y podrías perder dinero en cualquier escenario.',
    },
  },
  footer: {
    builtWith: 'Hecho con',
    copyright: '© 2024 HomeDecision',
    educational: 'Solo para fines educativos',
    disclaimer: 'HomeDecision es una herramienta educativa y no proporciona asesoramiento financiero, legal o de inversión. Los resultados dependen de las suposiciones proporcionadas por el usuario y pueden no reflejar resultados del mundo real.',
  },
  countries: {
    spain: 'España',
    portugal: 'Portugal',
    brazil: 'Brasil',
    custom: 'Personalizado',
  },
  landing: {
    seo: {
      title: '¿Alquilar o Comprar? Toma la Decisión Correcta | HomeDecision',
      description: 'Compara alquilar vs comprar con un simulador racional de patrimonio. HomeDecision muestra qué opción construye más patrimonio — basado en tus suposiciones.',
    },
    hero: {
      headline: '¿Alquilar o comprar?\nToma la decisión con números, no emociones.',
      subheadline: 'HomeDecision es un simulador racional que compara alquilar vs comprar basado en patrimonio a largo plazo — usando tus suposiciones, no promesas de ventas.',
      cta: 'Iniciar simulación',
      ctaSecondary: 'Sin registro · Gratis',
    },
    problem: {
      headline: 'Comprar una casa es la mayor decisión financiera que la mayoría toma.',
      intro: 'Sin embargo, la mayoría de decisiones están impulsadas por:',
      fears: [
        'Miedo a "tirar el dinero en alquiler"',
        'Presión de familia, bancos o agentes',
        'Calculadoras sesgadas que asumen que comprar siempre es mejor',
      ],
      truth: 'La verdad es más simple — y más incómoda: A veces alquilar construye más patrimonio. A veces comprar. Depende de las matemáticas.',
      conclusion: 'HomeDecision existe para mostrar esas matemáticas — clara y honestamente.',
    },
    solution: {
      headline: 'Un simulador neutral de alquilar vs comprar — construido para claridad',
      intro: 'HomeDecision te ayuda a:',
      bullets: [
        'Comparar Alquilar + Invertir vs Comprar + Invertir',
        'Ver tu patrimonio a lo largo del tiempo en ambos escenarios',
        'Entender cuándo (o si) comprar se vuelve mejor',
      ],
      assumptions: [
        'Retornos de inversión',
        'Apreciación de la propiedad',
        'Aumentos de alquiler',
        'Tasas hipotecarias',
      ],
      noBias: [
        'Sin anuncios.',
        'Sin comisiones.',
        'Sin sesgo de "compra ahora".',
      ],
    },
    howItWorks: {
      headline: 'Cómo funciona el simulador',
      steps: [
        {
          title: 'Tu situación',
          description: 'Ingresa el precio de la propiedad, alquiler, términos hipotecarios y cuánto tiempo planeas quedarte.',
        },
        {
          title: 'Tus suposiciones',
          description: 'Elige retornos de inversión esperados, apreciación de la propiedad, aumentos de alquiler y costos de mantenimiento.',
        },
        {
          title: 'Resultados claros',
          description: 'Ve el patrimonio para ambos escenarios, la diferencia y qué opción gana.',
        },
      ],
    },
    visual: {
      headline: 'Ve el panorama completo — no solo pagos mensuales',
      body: 'La mayoría de calculadoras se enfocan en costos mensuales. HomeDecision se enfoca en patrimonio a largo plazo.',
      features: [
        'Curvas de crecimiento de patrimonio a lo largo del tiempo',
        'Puntos de equilibrio',
        'Total de alquiler pagado vs total de intereses pagados',
        'Costo de oportunidad de cada decisión',
      ],
      conclusion: 'Porque la mejor decisión no siempre es la más popular.',
    },
    trust: {
      headline: 'Construido con transparencia',
      bullets: [
        'Todas las suposiciones son visibles y ajustables',
        'Sin fórmulas ocultas',
        'Conservador por defecto',
        'Educativo — no asesoramiento financiero',
      ],
      mission: 'No vendemos hipotecas. No vendemos propiedades. No optimizamos para un resultado. Nuestro único objetivo es claridad.',
    },
    audience: {
      headline: 'Para quién es HomeDecision',
      personas: [
        { icon: 'briefcase', text: 'Profesionales decidiendo si comprar su primera casa' },
        { icon: 'users', text: 'Familias planeando una mudanza a largo plazo' },
        { icon: 'globe', text: 'Expatriados comparando mercados' },
        { icon: 'bar-chart', text: 'Cualquiera que quiera una respuesta racional — no opiniones' },
      ],
    },
    faq: {
      headline: 'Preguntas Frecuentes',
      items: [
        {
          q: '¿Alquilar es realmente a veces mejor que comprar?',
          a: 'Sí. Dependiendo de los retornos de inversión, crecimiento del alquiler, costos hipotecarios y horizonte de tiempo, alquilar puede llevar a un patrimonio mayor.',
        },
        {
          q: '¿HomeDecision asume que invierto mi dinero?',
          a: 'Sí. La comparación solo es justa si el capital no utilizado se invierte en ambos escenarios.',
        },
        {
          q: '¿Es esto asesoramiento financiero?',
          a: 'No. HomeDecision es un simulador educativo diseñado para ayudarte a entender trade-offs.',
        },
        {
          q: '¿Puedo cambiar las suposiciones?',
          a: 'Sí. El simulador es totalmente personalizable.',
        },
      ],
    },
    finalCta: {
      headline: 'Toma la decisión una vez — con confianza',
      subheadline: 'Deja de adivinar. Deja de discutir. Deja que los números hablen.',
      cta: 'Iniciar simulación de alquilar vs comprar',
    },
  },
};
