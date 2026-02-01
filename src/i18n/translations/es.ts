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
    copyright: '© 2024 Simulador Alquilar vs Comprar',
    educational: 'Solo para fines educativos',
  },
  countries: {
    spain: 'España',
    portugal: 'Portugal',
    brazil: 'Brasil',
    custom: 'Personalizado',
  },
};
