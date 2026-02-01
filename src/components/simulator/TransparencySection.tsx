import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Shield, Calculator, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function TransparencySection() {
  const { t } = useLanguage();

  return (
    <div className="card-elevated-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-muted-foreground" />
        <h3 className="section-title">{t.transparency.title}</h3>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="assumptions" className="border-border">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">
            <span className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-muted-foreground" />
              {t.transparency.assumptions.title}
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
            <p>
              <strong className="text-foreground">{t.transparency.assumptions.rentScenario}</strong>{' '}
              {t.transparency.assumptions.rentScenarioDesc}
            </p>
            <p>
              <strong className="text-foreground">{t.transparency.assumptions.buyScenario}</strong>{' '}
              {t.transparency.assumptions.buyScenarioDesc}
            </p>
            <p>
              <strong className="text-foreground">{t.transparency.assumptions.simplifications}</strong>{' '}
              {t.transparency.assumptions.simplificationsDesc}
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="formulas" className="border-border">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">
            <span className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-muted-foreground" />
              {t.transparency.formulas.title}
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
            <div className="bg-muted/50 p-3 rounded-lg font-mono text-xs">
              <p className="mb-2">
                <strong className="text-foreground">{t.transparency.formulas.mortgagePayment}</strong>
              </p>
              <p>PMT = P × [r(1+r)^n] / [(1+r)^n - 1]</p>
              <p className="text-xs mt-1">
                {t.transparency.formulas.mortgagePaymentDesc}
              </p>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg font-mono text-xs">
              <p className="mb-2">
                <strong className="text-foreground">{t.transparency.formulas.investmentGrowth}</strong>
              </p>
              <p>FV = PV × (1 + r)^t + C × [(1+r)^t - 1] / r</p>
              <p className="text-xs mt-1">
                {t.transparency.formulas.investmentGrowthDesc}
              </p>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg font-mono text-xs">
              <p className="mb-2">
                <strong className="text-foreground">{t.transparency.formulas.propertyValue}</strong>
              </p>
              <p>FV = Price × (1 + appreciation)^years</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="disclaimer" className="border-border">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">
            <span className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              {t.transparency.disclaimer.title}
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
            <p className="p-3 bg-warning-muted rounded-lg border border-warning/20">
              <strong className="text-foreground">
                {t.transparency.disclaimer.warning}
              </strong>{' '}
              {t.transparency.disclaimer.warningDesc}
            </p>
            <p>{t.transparency.disclaimer.advice}</p>
            <p>{t.transparency.disclaimer.risk}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
