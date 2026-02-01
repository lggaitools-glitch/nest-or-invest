import { Header } from '@/components/simulator/Header';
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
      <Header />

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
