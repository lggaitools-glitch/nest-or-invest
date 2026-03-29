import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SiteNavigation } from '@/components/SiteNavigation';
import { Footer } from '@/components/simulator/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import { XCircle, ArrowRight, RotateCcw } from 'lucide-react';

const PaymentCancel = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();

  const plan = searchParams.get('plan');

  const content = {
    en: {
      title: 'Payment Cancelled',
      subtitle: 'Your payment was not completed. No charges were made.',
      retryReport: 'Try Again',
      retryPremium: 'Try Premium Again',
      goHome: 'Back to Home',
    },
    es: {
      title: 'Pago Cancelado',
      subtitle: 'Tu pago no fue completado. No se realizó ningún cargo.',
      retryReport: 'Intentar de Nuevo',
      retryPremium: 'Intentar Premium de Nuevo',
      goHome: 'Volver al Inicio',
    },
  };

  const c = content[language] || content.en;
  const isPremium = plan === 'premium';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Payment Cancelled | HomeDecision</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <SiteNavigation />

      <main className="flex-1 container max-w-md mx-auto px-4 py-16">
        <div className="card-elevated-lg p-8 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center mx-auto mb-6">
            <XCircle className="h-8 w-8 text-amber-600 dark:text-amber-400" />
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">{c.title}</h1>
          <p className="text-muted-foreground mb-8">{c.subtitle}</p>

          <div className="space-y-3">
            <Button
              onClick={() => navigate(isPremium ? '/auth?plan=premium' : '/report')}
              className="w-full"
              size="lg"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {isPremium ? c.retryPremium : c.retryReport}
            </Button>

            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full"
              size="lg"
            >
              {c.goHome}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentCancel;
