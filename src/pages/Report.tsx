import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SiteNavigation } from '@/components/SiteNavigation';
import { Footer } from '@/components/simulator/Footer';
import { InputSection } from '@/components/simulator/InputSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/i18n/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { CreditCard, Check, FileText, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import {
  DEFAULT_INPUTS,
  COUNTRY_PRESETS,
  type SimulatorInputs,
} from '@/types/simulator';
import {
  calculateDerivedValues,
  calculateRentScenario,
  calculateBuyScenario,
  calculateOutputs,
} from '@/lib/calculations';
import { generateReportId, calculateReportExpiration, type Report as ReportType } from '@/types/monetization';
import { redirectToReportCheckout } from '@/lib/stripe';

type Step = 'input' | 'payment' | 'success';

const Report = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { addReport } = useUser();

  const [step, setStep] = useState<Step>('input');
  const [inputs, setInputs] = useState<SimulatorInputs>(DEFAULT_INPUTS);
  const [selectedPreset, setSelectedPreset] = useState('spain');
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedReportId, setGeneratedReportId] = useState<string | null>(null);

  const handleInputChange = (key: keyof SimulatorInputs, value: number | string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
    setSelectedPreset('custom');
  };

  const handlePresetChange = (presetId: string) => {
    setSelectedPreset(presetId);
    const preset = COUNTRY_PRESETS.find((p) => p.id === presetId);
    if (preset && preset.values && Object.keys(preset.values).length > 0) {
      setInputs((prev) => ({ ...prev, ...preset.values }));
    }
  };

  const outputs = useMemo(() => {
    const derived = calculateDerivedValues(inputs);
    const rentScenario = calculateRentScenario(inputs, derived);
    const buyScenario = calculateBuyScenario(inputs, derived);
    return calculateOutputs(rentScenario, buyScenario);
  }, [inputs]);

  const handleContinueToPayment = () => {
    if (!email || !email.includes('@')) {
      return;
    }
    setStep('payment');
  };

  const [paymentError, setPaymentError] = useState('');

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentError('');

    const reportId = generateReportId();

    try {
      // Save report data locally before redirecting (will be confirmed on success page)
      const report: ReportType = {
        id: reportId,
        email,
        inputs,
        outputs,
        createdAt: new Date().toISOString(),
        expiresAt: calculateReportExpiration(),
      };
      // Store pending report in sessionStorage so success page can retrieve it
      sessionStorage.setItem('pending_report', JSON.stringify(report));

      await redirectToReportCheckout({
        email,
        reportId,
        inputs: inputs as unknown as Record<string, unknown>,
      });
    } catch (err) {
      // Stripe not configured — fall back to demo mode
      console.warn('Stripe checkout failed, using demo mode:', err);

      const report: ReportType = {
        id: reportId,
        email,
        inputs,
        outputs,
        createdAt: new Date().toISOString(),
        expiresAt: calculateReportExpiration(),
      };
      addReport(report);
      setGeneratedReportId(reportId);
      setStep('success');
    } finally {
      setIsProcessing(false);
    }
  };

  const content = {
    en: {
      pageTitle: 'Get Your Decision Report',
      pageSubtitle: 'A detailed rent vs buy analysis for your specific situation',
      step1Title: '1. Enter Your Details',
      emailLabel: 'Email for report delivery',
      emailPlaceholder: 'your@email.com',
      previewTitle: 'Your report will include:',
      previewFeatures: [
        'Complete wealth comparison over time',
        'Break-even analysis',
        'Detailed charts and visualizations',
        'All key insights explained',
        'PDF export',
      ],
      continueBtn: 'Continue to Payment',
      step2Title: '2. Complete Payment',
      price: '€3.99',
      priceLabel: 'One-time payment',
      payBtn: 'Pay €3.99',
      processing: 'Processing...',
      securePayment: 'Secure payment (demo mode)',
      successTitle: 'Report Generated!',
      successSubtitle: 'Your personalized rent vs buy report is ready.',
      successEmail: 'A link has also been sent to:',
      viewReport: 'View Your Report',
      note: 'This report is locked and cannot be edited. To explore different scenarios, consider Premium.',
    },
    es: {
      pageTitle: 'Obtén Tu Informe de Decisión',
      pageSubtitle: 'Un análisis detallado de alquilar vs comprar para tu situación',
      step1Title: '1. Ingresa Tus Datos',
      emailLabel: 'Email para recibir el informe',
      emailPlaceholder: 'tu@email.com',
      previewTitle: 'Tu informe incluirá:',
      previewFeatures: [
        'Comparación completa de patrimonio',
        'Análisis de punto de equilibrio',
        'Gráficos y visualizaciones',
        'Todos los insights explicados',
        'Exportar a PDF',
      ],
      continueBtn: 'Continuar al Pago',
      step2Title: '2. Completar Pago',
      price: '€3.99',
      priceLabel: 'Pago único',
      payBtn: 'Pagar €3.99',
      processing: 'Procesando...',
      securePayment: 'Pago seguro (modo demo)',
      successTitle: '¡Informe Generado!',
      successSubtitle: 'Tu informe personalizado está listo.',
      successEmail: 'También se ha enviado un enlace a:',
      viewReport: 'Ver Tu Informe',
      note: 'Este informe está bloqueado y no se puede editar. Para explorar diferentes escenarios, considera Premium.',
    },
  };

  const { language } = useLanguage();
  const c = content[language] || content.en;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Get Decision Report – €3.99 | HomeDecision</title>
        <meta name="description" content="Get a detailed, one-time rent vs buy analysis report for €3.99. Full breakdown, charts, and PDF export." />
        <link rel="canonical" href="https://homedecision.app/report" />
        <meta name="robots" content="index,follow" />
      </Helmet>

      <SiteNavigation />

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-display mb-3">
            {c.pageTitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {c.pageSubtitle}
          </p>
        </div>

        {step === 'input' && (
          <div className="grid lg:grid-cols-2 gap-8 animate-slide-up">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">{c.step1Title}</h2>
              <InputSection
                inputs={inputs}
                onInputChange={handleInputChange}
                onPresetChange={handlePresetChange}
                selectedPreset={selectedPreset}
              />
            </div>

            <div className="space-y-6">
              <div className="card-elevated-lg p-6">
                <Label htmlFor="email" className="text-foreground font-medium">
                  {c.emailLabel}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={c.emailPlaceholder}
                  className="mt-2"
                />
              </div>

              <div className="card-elevated-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">{c.previewTitle}</h3>
                <ul className="space-y-3">
                  {c.previewFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={handleContinueToPayment}
                disabled={!email || !email.includes('@')}
                className="w-full"
                size="lg"
              >
                {c.continueBtn}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 'payment' && (
          <div className="max-w-md mx-auto animate-slide-up">
            <div className="card-elevated-lg p-8 text-center">
              <h2 className="text-xl font-semibold text-foreground mb-6">{c.step2Title}</h2>

              <div className="mb-8">
                <div className="text-5xl font-bold text-foreground mb-2">{c.price}</div>
                <div className="text-muted-foreground">{c.priceLabel}</div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full mb-4"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {c.processing}
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    {c.payBtn}
                  </>
                )}
              </Button>

              {paymentError && (
                <p className="text-sm text-destructive flex items-center justify-center gap-1 mb-2">
                  <AlertCircle className="h-4 w-4" />
                  {paymentError}
                </p>
              )}

              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Lock className="h-3 w-3" />
                {c.securePayment}
              </p>
            </div>
          </div>
        )}

        {step === 'success' && generatedReportId && (
          <div className="max-w-md mx-auto animate-slide-up text-center">
            <div className="card-elevated-lg p-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-primary" />
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-2">{c.successTitle}</h2>
              <p className="text-muted-foreground mb-6">{c.successSubtitle}</p>

              <p className="text-sm text-muted-foreground mb-6">
                {c.successEmail}
                <br />
                <span className="font-medium text-foreground">{email}</span>
              </p>

              <Button
                onClick={() => navigate(`/r/${generatedReportId}`)}
                className="w-full mb-4"
                size="lg"
              >
                {c.viewReport}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              <p className="text-xs text-muted-foreground">{c.note}</p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Report;
