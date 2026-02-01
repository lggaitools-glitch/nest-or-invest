import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/i18n/LanguageContext';

export function FAQSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container max-w-3xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground font-display text-center mb-12">
          {t.landing.faq.headline}
        </h2>
        
        <Accordion type="single" collapsible className="w-full">
          {t.landing.faq.items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-foreground hover:text-primary">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
