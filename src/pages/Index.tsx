import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
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
import { Calculator, BookOpen, Globe } from 'lucide-react';

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "HomeDecision",
  "url": "https://homedecision.app/",
  "description": "Compare renting vs buying using real numbers. HomeDecision helps you decide based on long-term wealth, not emotions.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://homedecision.app/simulate"
  }
};

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
        
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
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

      {/* Featured Content Section for SEO Internal Linking */}
      <section className="py-12 bg-muted/30 border-t border-border">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-bold text-center mb-8">Explore More</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              to="/simulate" 
              className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <Calculator className="h-5 w-5 text-primary" />
              <span className="font-medium group-hover:text-primary transition-colors">Rent vs Buy Calculator</span>
            </Link>
            <Link 
              to="/articles" 
              className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-medium group-hover:text-primary transition-colors">Latest Insights</span>
            </Link>
            <Link 
              to="/articles/rent-vs-buy-2026-data-driven-decision-guide" 
              className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-medium group-hover:text-primary transition-colors">2026 Housing Guide</span>
            </Link>
            <Link 
              to="/es/articles" 
              className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <Globe className="h-5 w-5 text-primary" />
              <span className="font-medium group-hover:text-primary transition-colors">Artículos en Español</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
