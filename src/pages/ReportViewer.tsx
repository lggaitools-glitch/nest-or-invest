import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SiteNavigation } from '@/components/SiteNavigation';
import { Footer } from '@/components/simulator/Footer';
import { ResultsDisplay } from '@/components/simulator/ResultsDisplay';
import { WealthChart } from '@/components/simulator/WealthChart';
import { InsightCards } from '@/components/simulator/InsightCards';
import { TransparencySection } from '@/components/simulator/TransparencySection';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/i18n/LanguageContext';
import { Lock, Download, Clock, Crown, AlertCircle, Loader2 } from 'lucide-react';
import { isReportExpired, getReportExpirationDays } from '@/types/monetization';
import { exportReportToPdf } from '@/lib/pdfExport';
import { toast } from 'sonner';
import {
  calculateDerivedValues,
  calculateRentScenario,
  calculateBuyScenario,
  generateInsights,
} from '@/lib/calculations';

const ReportViewer = () => {
  const { id } = useParams<{ id: string }>();
  const { getReport } = useUser();
  const { language } = useLanguage();
  const [isExporting, setIsExporting] = useState(false);

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    try {
      await exportReportToPdf('report-content', 'HomeDecision-Report');
    } catch {
      toast.error(
        language === 'es'
          ? 'Error al generar el PDF. Inténtalo de nuevo.'
          : 'Failed to generate PDF. Please try again.'
      );
    } finally {
      setIsExporting(false);
    }
  };

  const report = id ? getReport(id) : null;

  const content = {
    en: {
      notFound: 'Report Not Found',
      notFoundDesc: 'This report doesn\'t exist or has expired.',
      expired: 'Report Expired',
      expiredDesc: 'This report has expired after {days} days.',
      createNew: 'Create New Report',
      lockedBadge: 'Locked Report',
      expiresIn: 'Expires in {days} days',
      downloadPdf: 'Download PDF',
      upgradeTitle: 'Want to explore more scenarios?',
      upgradeDesc: 'Upgrade to Premium for unlimited comparisons, saved scenarios, and editable assumptions.',
      upgradeBtn: 'Go Premium',
    },
    es: {
      notFound: 'Informe No Encontrado',
      notFoundDesc: 'Este informe no existe o ha expirado.',
      expired: 'Informe Expirado',
      expiredDesc: 'Este informe ha expirado después de {days} días.',
      createNew: 'Crear Nuevo Informe',
      lockedBadge: 'Informe Bloqueado',
      expiresIn: 'Expira en {days} días',
      downloadPdf: 'Descargar PDF',
      upgradeTitle: '¿Quieres explorar más escenarios?',
      upgradeDesc: 'Actualiza a Premium para comparaciones ilimitadas, escenarios guardados y supuestos editables.',
      upgradeBtn: 'Ir a Premium',
    },
  };

  const c = content[language] || content.en;

  // Calculate remaining days
  const getRemainingDays = () => {
    if (!report) return 0;
    const expiresAt = new Date(report.expiresAt);
    const now = new Date();
    const diffTime = expiresAt.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  // Recalculate scenarios for chart/insights
  const { rentScenario, buyScenario, insights } = useMemo(() => {
    if (!report) return { rentScenario: null, buyScenario: null, insights: [] };

    const derived = calculateDerivedValues(report.inputs);
    const rentScenario = calculateRentScenario(report.inputs, derived);
    const buyScenario = calculateBuyScenario(report.inputs, derived);
    const insights = generateInsights(report.inputs, report.outputs, derived, rentScenario, buyScenario);

    return { rentScenario, buyScenario, insights };
  }, [report]);

  // Handle not found
  if (!report) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Helmet>
          <title>Report Not Found | HomeDecision</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <SiteNavigation />
        <main className="flex-1 container max-w-lg mx-auto px-4 py-20 text-center">
          <div className="card-elevated-lg p-8">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">{c.notFound}</h1>
            <p className="text-muted-foreground mb-6">{c.notFoundDesc}</p>
            <Button asChild>
              <Link to="/report">{c.createNew}</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Handle expired
  if (isReportExpired(report)) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Helmet>
          <title>Report Expired | HomeDecision</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <SiteNavigation />
        <main className="flex-1 container max-w-lg mx-auto px-4 py-20 text-center">
          <div className="card-elevated-lg p-8">
            <Clock className="h-12 w-12 text-warning mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">{c.expired}</h1>
            <p className="text-muted-foreground mb-6">
              {c.expiredDesc.replace('{days}', String(getReportExpirationDays()))}
            </p>
            <Button asChild>
              <Link to="/report">{c.createNew}</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const remainingDays = getRemainingDays();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Your Decision Report | HomeDecision</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <SiteNavigation />

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-12 md:py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                <Lock className="h-3 w-3" />
                {c.lockedBadge}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-warning/10 text-xs font-medium text-warning">
                <Clock className="h-3 w-3" />
                {c.expiresIn.replace('{days}', String(remainingDays))}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground font-display">
              Your Rent vs Buy Report
            </h1>
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleDownloadPdf}
            disabled={isExporting}
          >
            {isExporting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {c.downloadPdf}
          </Button>
        </div>

        {/* Results */}
        <div id="report-content" className="space-y-6">
          <div className="animate-slide-up">
            <ResultsDisplay
              outputs={report.outputs}
              timeHorizon={report.inputs.timeHorizonYears}
              countryId="spain"
            />
          </div>

          {rentScenario && buyScenario && (
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <WealthChart
                rentData={rentScenario.yearlyData}
                buyData={buyScenario.yearlyData}
                breakEvenYear={report.outputs.breakEvenYear}
                countryId="spain"
              />
            </div>
          )}

          {insights.length > 0 && (
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <InsightCards insights={insights} countryId="spain" />
            </div>
          )}

          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <TransparencySection />
          </div>

          {/* Upgrade CTA */}
          <div className="animate-slide-up mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">{c.upgradeTitle}</h3>
                </div>
                <p className="text-muted-foreground">{c.upgradeDesc}</p>
              </div>
              <Button asChild>
                <Link to="/pricing">{c.upgradeBtn}</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportViewer;
