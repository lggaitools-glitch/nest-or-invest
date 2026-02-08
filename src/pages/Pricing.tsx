import { Helmet } from 'react-helmet-async';
import { SiteNavigation } from '@/components/SiteNavigation';
import { Footer } from '@/components/simulator/Footer';
import { PricingCard } from '@/components/PricingCard';
import type { PricingPlan } from '@/types/monetization';
import { useLanguage } from '@/i18n/LanguageContext';

const Pricing = () => {
  const { t } = useLanguage();

  const plans: PricingPlan[] = [
    {
      id: 'free',
      name: t.pricing.plans.free.name,
      price: '€0',
      description: t.pricing.plans.free.description,
      features: t.pricing.plans.free.features,
      cta: t.pricing.plans.free.cta,
      ctaLink: '/simulate',
    },
    {
      id: 'report',
      name: t.pricing.plans.report.name,
      price: '€3.99',
      priceSubtext: t.pricing.plans.report.priceSubtext,
      description: t.pricing.plans.report.description,
      features: t.pricing.plans.report.features,
      cta: t.pricing.plans.report.cta,
      ctaLink: '/report',
    },
    {
      id: 'premium',
      name: t.pricing.plans.premium.name,
      price: '€6.99',
      priceSubtext: t.pricing.plans.premium.priceSubtext,
      description: t.pricing.plans.premium.description,
      features: t.pricing.plans.premium.features,
      cta: t.pricing.plans.premium.cta,
      ctaLink: '/auth?plan=premium',
      highlighted: true,
    },
  ];

  const faqs = t.pricing.faq.items;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>{t.pricing.seo.title}</title>
        <meta name="description" content={t.pricing.seo.description} />
        <link rel="canonical" href="https://homedecision.app/pricing" />
        <meta name="robots" content="index,follow" />
      </Helmet>

      <SiteNavigation />

      <main className="flex-1 container max-w-6xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground font-display mb-4">
            {t.pricing.headline}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.pricing.subheadline}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 animate-slide-up">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="mb-20 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            {t.pricing.comparison.title}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                    {t.pricing.comparison.feature}
                  </th>
                  <th className="text-center py-4 px-4 text-foreground font-semibold">Free</th>
                  <th className="text-center py-4 px-4 text-foreground font-semibold">One-Time Report</th>
                  <th className="text-center py-4 px-4 text-primary font-semibold">Premium</th>
                </tr>
              </thead>
              <tbody>
                {t.pricing.comparison.rows.map((row, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-3 px-4 text-foreground">{row.feature}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{row.free}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{row.report}</td>
                    <td className="py-3 px-4 text-center text-primary font-medium">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            {t.pricing.faq.title}
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
