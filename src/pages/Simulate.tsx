import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { SiteNavigation } from '@/components/SiteNavigation';
import { Footer } from '@/components/simulator/Footer';
import { FreeInputSection, type FreeInputs } from '@/components/simulator/FreeInputSection';
import { FreeResultBadge } from '@/components/simulator/FreeResultBadge';
import { FreeSimulatorCTA } from '@/components/simulator/FreeSimulatorCTA';
import { useLanguage } from '@/i18n/LanguageContext';
import { calculateFreeEstimate } from '@/lib/freeCalculations';

const DEFAULT_FREE_INPUTS: FreeInputs = {
  rentMonthly: 1000,
  propertyPrice: 250000,
  interestRate: 3.5,
  timeHorizonYears: 10,
};

const Simulate = () => {
  const { t } = useLanguage();
  const [inputs, setInputs] = useState<FreeInputs>(DEFAULT_FREE_INPUTS);

  const handleInputChange = (key: keyof FreeInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  // Calculate simplified free estimate
  const result = useMemo(() => {
    return calculateFreeEstimate(inputs);
  }, [inputs]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Free Rent vs Buy Estimate | HomeDecision</title>
        <meta name="description" content="Get a quick directional signal on whether to rent or buy. Free 30-second estimate — no sign-up required." />
        <link rel="canonical" href="https://homedecision.app/simulate" />
        <meta name="robots" content="index,follow" />
        
        <link rel="alternate" hrefLang="en" href="https://homedecision.app/simulate" />
        <link rel="alternate" hrefLang="x-default" href="https://homedecision.app/simulate" />
        
        <meta property="og:title" content="Free Rent vs Buy Estimate | HomeDecision" />
        <meta property="og:description" content="Get a quick directional signal on whether to rent or buy. Free 30-second estimate — no sign-up required." />
        <meta property="og:url" content="https://homedecision.app/simulate" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Rent vs Buy Estimate | HomeDecision" />
        <meta name="twitter:description" content="Get a quick directional signal on whether to rent or buy. Free 30-second estimate — no sign-up required." />
        <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
      </Helmet>
      <SiteNavigation />

      <main className="flex-1 container max-w-xl mx-auto px-4 py-12 md:py-16">
        {/* Page Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground font-display mb-2">
            {t.freeEstimate?.pageTitle || 'Free Quick Estimate'}
          </h1>
          <p className="text-muted-foreground">
            {t.freeEstimate?.pageSubtitle || 'Get a directional signal in 30 seconds'}
          </p>
        </div>

        <div className="space-y-6">
          {/* Input Section - Minimal 4 fields */}
          <div className="animate-slide-up">
            <FreeInputSection
              inputs={inputs}
              onInputChange={handleInputChange}
            />
          </div>

          {/* Result Badge - Simple directional verdict */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <FreeResultBadge
              verdict={result.verdict}
              monthlyRent={result.monthlyRent}
              monthlyBuying={result.monthlyBuying}
              timeHorizonYears={inputs.timeHorizonYears}
            />
          </div>

          {/* Upgrade CTA */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <FreeSimulatorCTA />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Simulate;
