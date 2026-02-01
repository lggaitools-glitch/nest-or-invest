import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Shield, Calculator, AlertTriangle } from 'lucide-react';

export function TransparencySection() {
  return (
    <div className="card-elevated-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-muted-foreground" />
        <h3 className="section-title">Transparency & Assumptions</h3>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="assumptions" className="border-border">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">
            <span className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-muted-foreground" />
              Calculation Assumptions
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
            <p>
              <strong className="text-foreground">Rent Scenario:</strong> Your
              down payment is invested immediately. Each year, any savings from
              paying rent instead of a mortgage are added to your investments.
              Returns compound annually at your specified rate.
            </p>
            <p>
              <strong className="text-foreground">Buy Scenario:</strong>{' '}
              Property value grows at the specified appreciation rate. Total
              costs include mortgage interest and annual maintenance. Net worth
              equals property value minus remaining loan and accumulated costs.
            </p>
            <p>
              <strong className="text-foreground">Simplifications:</strong> This
              model uses a simplified amortization. Taxes, insurance, closing
              costs, and transaction fees are not included. Inflation is not
              explicitly modeled—all values are in today's terms.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="formulas" className="border-border">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">
            <span className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-muted-foreground" />
              Key Formulas
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
            <div className="bg-muted/50 p-3 rounded-lg font-mono text-xs">
              <p className="mb-2">
                <strong className="text-foreground">Monthly Mortgage Payment:</strong>
              </p>
              <p>PMT = P × [r(1+r)^n] / [(1+r)^n - 1]</p>
              <p className="text-xs mt-1">
                Where P = loan, r = monthly rate, n = total months
              </p>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg font-mono text-xs">
              <p className="mb-2">
                <strong className="text-foreground">Investment Growth:</strong>
              </p>
              <p>FV = PV × (1 + r)^t + C × [(1+r)^t - 1] / r</p>
              <p className="text-xs mt-1">
                Compound growth with regular contributions
              </p>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg font-mono text-xs">
              <p className="mb-2">
                <strong className="text-foreground">Property Value:</strong>
              </p>
              <p>FV = Price × (1 + appreciation)^years</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="disclaimer" className="border-border">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">
            <span className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Important Disclaimer
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
            <p className="p-3 bg-warning-muted rounded-lg border border-warning/20">
              <strong className="text-foreground">
                This is an educational tool only.
              </strong>{' '}
              The results are projections based on your assumptions, not
              financial advice. Actual outcomes will vary based on market
              conditions, personal circumstances, and factors not included in
              this model.
            </p>
            <p>
              Before making any real estate or investment decisions, consult
              with qualified financial advisors, tax professionals, and real
              estate experts who understand your complete financial situation.
            </p>
            <p>
              Past performance of investments and property values does not
              guarantee future results. Markets can be volatile, and you could
              lose money in either scenario.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
