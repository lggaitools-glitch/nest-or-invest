import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { calculateReadingTime } from '@/data/articleData';

interface AuthorBylineProps {
  wordCount: number;
  modifiedDate: string;
  language?: 'en' | 'es';
}

const translations = {
  en: {
    by: 'By HomeDecision Research Team',
    reviewed: 'Reviewed for accuracy',
    minRead: 'min read',
    lastUpdated: 'Last updated',
    aboutTitle: 'About HomeDecision Research Team',
    aboutText: 'HomeDecision Research Team publishes data-driven housing and financial decision insights. Our goal is to clarify trade-offs in renting, buying, and long-term planning using transparent assumptions and practical reasoning. We do not sell real estate and we do not receive commissions from banks or agents.',
    learnMore: 'Learn how HomeDecision works →',
  },
  es: {
    by: 'Por HomeDecision Research Team',
    reviewed: 'Revisado para mayor precisión',
    minRead: 'min de lectura',
    lastUpdated: 'Última actualización',
    aboutTitle: 'Acerca de HomeDecision Research Team',
    aboutText: 'HomeDecision Research Team publica análisis basados en datos sobre vivienda y decisiones financieras. Nuestro objetivo es aclarar los compromisos entre alquilar, comprar y planificar a largo plazo, utilizando supuestos transparentes y razonamiento práctico. No vendemos inmuebles ni recibimos comisiones de bancos o agentes.',
    learnMore: 'Descubre cómo funciona HomeDecision →',
  },
};

export function AuthorByline({ wordCount, modifiedDate, language = 'en' }: AuthorBylineProps) {
  const readingTime = calculateReadingTime(wordCount);
  const t = translations[language];
  const locale = language === 'es' ? es : undefined;
  const formattedDate = format(new Date(modifiedDate), 'd MMMM, yyyy', { locale });

  return (
    <div className="border-y border-border py-4 my-6">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground mb-3">
        <span>{t.by}</span>
        <span className="hidden sm:inline">·</span>
        <span>{t.reviewed}</span>
        <span className="hidden sm:inline">·</span>
        <span>{readingTime} {t.minRead}</span>
        <span className="hidden sm:inline">·</span>
        <span>{t.lastUpdated} {formattedDate}</span>
      </div>

      <Collapsible>
        <CollapsibleTrigger className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors group">
          <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
          {t.aboutTitle}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 text-sm text-muted-foreground leading-relaxed">
          <p className="mb-3">
            {t.aboutText}
          </p>
          <Link
            to="/simulate"
            className="text-primary hover:underline font-medium inline-flex items-center gap-1"
          >
            {t.learnMore}
          </Link>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
