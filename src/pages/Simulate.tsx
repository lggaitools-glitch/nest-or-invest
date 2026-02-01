import { useState, useMemo } from 'react';
import { SiteNavigation } from '@/components/SiteNavigation';
import { Footer } from '@/components/simulator/Footer';
import { InputSection } from '@/components/simulator/InputSection';
import { ResultsDisplay } from '@/components/simulator/ResultsDisplay';
import { WealthChart } from '@/components/simulator/WealthChart';
import { InsightCards } from '@/components/simulator/InsightCards';
import { TransparencySection } from '@/components/simulator/TransparencySection';
import { useLanguage } from '@/i18n/LanguageContext';
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
  generateInsights,
} from '@/lib/calculations';

const Simulate = () => {
  const { t } = useLanguage();
  const [inputs, setInputs] = useState<SimulatorInputs>(DEFAULT_INPUTS);
  const [selectedPreset, setSelectedPreset] = useState('spain');

  const handleInputChange = (key: keyof SimulatorInputs, value: number) => {
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

  // Calculate all derived values and scenarios
  const { derived, rentScenario, buyScenario, outputs, insights } = useMemo(() => {
    const derived = calculateDerivedValues(inputs);
    const rentScenario = calculateRentScenario(inputs, derived);
    const buyScenario = calculateBuyScenario(inputs, derived);
    const outputs = calculateOutputs(rentScenario, buyScenario);
    const insights = generateInsights(inputs, outputs, derived, rentScenario, buyScenario);

    return { derived, rentScenario, buyScenario, outputs, insights };
  }, [inputs]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteNavigation />

      <main className="flex-1 container max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* Page Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-display mb-3">
            {t.simulate.pageTitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            {t.simulate.pageSubtitle}
          </p>
          <p className="text-sm text-muted-foreground/70">
            {t.simulate.helperText}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <InputSection
                inputs={inputs}
                onInputChange={handleInputChange}
                onPresetChange={handlePresetChange}
                selectedPreset={selectedPreset}
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="animate-slide-up">
              <ResultsDisplay
                outputs={outputs}
                timeHorizon={inputs.timeHorizonYears}
                countryId={selectedPreset}
              />
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <WealthChart
                rentData={rentScenario.yearlyData}
                buyData={buyScenario.yearlyData}
                breakEvenYear={outputs.breakEvenYear}
                countryId={selectedPreset}
              />
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <InsightCards insights={insights} countryId={selectedPreset} />
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <TransparencySection />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Simulate;
