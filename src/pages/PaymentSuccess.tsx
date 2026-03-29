import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SiteNavigation } from '@/components/SiteNavigation';
import { Footer } from '@/components/simulator/Footer';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/i18n/LanguageContext';
import { CheckCircle, ArrowRight, Crown } from 'lucide-react';
import type { Report } from '@/types/monetization';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addReport, upgradeToPremium } = useUser();
  const { language } = useLanguage();
  const [processed, setProcessed] = useState(false);

  const reportId = searchParams.get('report_id');
  const plan = searchParams.get('plan');

  useEffect(() => {
    if (processed) return;

    if (plan === 'premium') {
      upgradeToPremium();
      setProcessed(true);
      return;
    }

    if (reportId) {
      // Retrieve pending report from sessionStorage
      const pendingReportJson = sessionStorage.getItem('pending_report');
      if (pendingReportJson) {
        try {
          const report: Report = JSON.parse(pendingReportJson);
          addReport(report);
          sessionStorage.removeItem('pending_report');
        } catch {
          // Report data was invalid, user can still view from the link
        }
      }
      setProcessed(true);
    }
  }, [reportId, plan, processed, addReport, upgradeToPremium]);

  const content = {
    en: {
      reportTitle: 'Payment Successful!',
      reportSubtitle: 'Your personalized rent vs buy report is ready.',
      viewReport: 'View Your Report',
      premiumTitle: 'Welcome to Premium!',
      premiumSubtitle: 'Your premium subscription is now active. Enjoy unlimited scenarios and comparisons.',
      goToCompare: 'Start Comparing',
    },
    es: {
      reportTitle: '¡Pago Exitoso!',
      reportSubtitle: 'Tu informe personalizado de alquilar vs comprar está listo.',
      viewReport: 'Ver Tu Informe',
      premiumTitle: '¡Bienvenido a Premium!',
      premiumSubtitle: 'Tu suscripción premium está activa. Disfruta de escenarios y comparaciones ilimitadas.',
      goToCompare: 'Empezar a Comparar',
    },
  };

  const c = content[language] || content.en;
  const isPremium = plan === 'premium';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Payment Successful | HomeDecision</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <SiteNavigation />

      <main className="flex-1 container max-w-md mx-auto px-4 py-16">
        <div className="card-elevated-lg p-8 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center mx-auto mb-6">
            {isPremium ? (
              <Crown className="h-8 w-8 text-primary" />
            ) : (
              <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            )}
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">
            {isPremium ? c.premiumTitle : c.reportTitle}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isPremium ? c.premiumSubtitle : c.reportSubtitle}
          </p>

          <Button
            onClick={() => navigate(isPremium ? '/compare' : `/r/${reportId}`)}
            className="w-full"
            size="lg"
          >
            {isPremium ? c.goToCompare : c.viewReport}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
