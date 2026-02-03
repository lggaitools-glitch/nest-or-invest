import { Helmet } from 'react-helmet-async';
import { SiteNavigation } from '@/components/SiteNavigation';
import { Footer } from '@/components/simulator/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { SolutionSection } from '@/components/landing/SolutionSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { VisualSection } from '@/components/landing/VisualSection';
import { TrustSection } from '@/components/landing/TrustSection';
import { AudienceSection } from '@/components/landing/AudienceSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { FinalCTASection } from '@/components/landing/FinalCTASection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col scroll-smooth">
      <Helmet>
        <title>Rent or Buy? Compare Housing Decisions with Data | HomeDecision</title>
        <meta name="description" content="Compare renting vs buying using real numbers. HomeDecision helps you decide based on long-term wealth, not emotions." />
        <link rel="canonical" href="https://homedecision.app/" />
        <meta name="robots" content="index,follow" />
        
        <link rel="alternate" hrefLang="en" href="https://homedecision.app/" />
        <link rel="alternate" hrefLang="x-default" href="https://homedecision.app/" />
        
        <meta property="og:title" content="Rent or Buy? Compare Housing Decisions with Data | HomeDecision" />
        <meta property="og:description" content="Compare renting vs buying using real numbers. HomeDecision helps you decide based on long-term wealth, not emotions." />
        <meta property="og:url" content="https://homedecision.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rent or Buy? Compare Housing Decisions with Data | HomeDecision" />
        <meta name="twitter:description" content="Compare renting vs buying using real numbers. HomeDecision helps you decide based on long-term wealth, not emotions." />
        <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
      </Helmet>
      <SiteNavigation />

      {/* Landing Page Sections */}
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <VisualSection />
      <TrustSection />
      <AudienceSection />
      <FAQSection />
      <FinalCTASection />

      <Footer />
    </div>
  );
};

export default Index;
