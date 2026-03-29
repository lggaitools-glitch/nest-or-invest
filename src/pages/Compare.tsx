import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SiteNavigation } from '@/components/SiteNavigation';
import { Footer } from '@/components/simulator/Footer';
import { InputSection } from '@/components/simulator/InputSection';
import { ResultsDisplay } from '@/components/simulator/ResultsDisplay';
import { WealthChart } from '@/components/simulator/WealthChart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/i18n/LanguageContext';
import { Plus, Copy, Trash2, Edit2, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
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
import { generateScenarioId, type Scenario } from '@/types/monetization';

const Compare = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isPremium, scenarios, addScenario, updateScenario, deleteScenario, duplicateScenario } = useUser();
  const { language } = useLanguage();

  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [editingNameId, setEditingNameId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('spain');

  // Redirect if not premium
  useEffect(() => {
    if (!isLoggedIn || !isPremium) {
      navigate('/auth?redirect=/compare&plan=premium');
    }
  }, [isLoggedIn, isPremium, navigate]);

  const content = {
    en: {
      pageTitle: 'Compare Scenarios',
      pageSubtitle: 'Save and compare multiple properties side by side',
      newScenario: 'New Scenario',
      noScenarios: 'No scenarios yet. Create your first one!',
      scenarioName: 'Scenario',
      duplicate: 'Duplicate',
      delete: 'Delete',
    },
    es: {
      pageTitle: 'Comparar Escenarios',
      pageSubtitle: 'Guarda y compara múltiples propiedades lado a lado',
      newScenario: 'Nuevo Escenario',
      noScenarios: 'Sin escenarios. ¡Crea el primero!',
      scenarioName: 'Escenario',
      duplicate: 'Duplicar',
      delete: 'Eliminar',
    },
  };

  const c = content[language] || content.en;

  const selectedScenario = scenarios.find((s) => s.id === selectedScenarioId);

  const { outputs, rentScenario, buyScenario } = useMemo(() => {
    if (!selectedScenario) {
      return { outputs: null, rentScenario: null, buyScenario: null };
    }

    const derived = calculateDerivedValues(selectedScenario.inputs);
    const rentScenario = calculateRentScenario(selectedScenario.inputs, derived);
    const buyScenario = calculateBuyScenario(selectedScenario.inputs, derived);
    const outputs = calculateOutputs(rentScenario, buyScenario);

    return { outputs, rentScenario, buyScenario };
  }, [selectedScenario]);

  const handleCreateScenario = () => {
    const newScenario: Scenario = {
      id: generateScenarioId(),
      name: `${c.scenarioName} ${scenarios.length + 1}`,
      inputs: DEFAULT_INPUTS,
      outputs: calculateOutputs(
        calculateRentScenario(DEFAULT_INPUTS, calculateDerivedValues(DEFAULT_INPUTS)),
        calculateBuyScenario(DEFAULT_INPUTS, calculateDerivedValues(DEFAULT_INPUTS))
      ),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addScenario(newScenario);
    setSelectedScenarioId(newScenario.id);
  };

  const handleInputChange = (key: keyof SimulatorInputs, value: number | string) => {
    if (!selectedScenario) return;

    const newInputs = { ...selectedScenario.inputs, [key]: value };
    const derived = calculateDerivedValues(newInputs);
    const rentScenario = calculateRentScenario(newInputs, derived);
    const buyScenario = calculateBuyScenario(newInputs, derived);
    const outputs = calculateOutputs(rentScenario, buyScenario);

    updateScenario(selectedScenario.id, { inputs: newInputs, outputs });
    setSelectedPreset('custom');
  };

  const handlePresetChange = (presetId: string) => {
    if (!selectedScenario) return;

    setSelectedPreset(presetId);
    const preset = COUNTRY_PRESETS.find((p) => p.id === presetId);
    if (preset && preset.values && Object.keys(preset.values).length > 0) {
      const newInputs = { ...selectedScenario.inputs, ...preset.values };
      const derived = calculateDerivedValues(newInputs);
      const rentScenario = calculateRentScenario(newInputs, derived);
      const buyScenario = calculateBuyScenario(newInputs, derived);
      const outputs = calculateOutputs(rentScenario, buyScenario);

      updateScenario(selectedScenario.id, { inputs: newInputs, outputs });
    }
  };

  const handleDuplicate = (id: string) => {
    const original = scenarios.find((s) => s.id === id);
    if (original) {
      const duplicate = duplicateScenario(id, `${original.name} (Copy)`);
      if (duplicate) {
        setSelectedScenarioId(duplicate.id);
      }
    }
  };

  const handleStartEditName = (scenario: Scenario) => {
    setEditingNameId(scenario.id);
    setEditingName(scenario.name);
  };

  const handleSaveName = () => {
    if (editingNameId && editingName.trim()) {
      updateScenario(editingNameId, { name: editingName.trim() });
    }
    setEditingNameId(null);
    setEditingName('');
  };

  const handleCancelEditName = () => {
    setEditingNameId(null);
    setEditingName('');
  };

  if (!isLoggedIn || !isPremium) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Compare Scenarios | HomeDecision Premium</title>
        <meta name="description" content="Compare multiple rent vs buy scenarios side by side with HomeDecision Premium." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <SiteNavigation />

      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground font-display mb-2">
            {c.pageTitle}
          </h1>
          <p className="text-muted-foreground">{c.pageSubtitle}</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Sidebar - Scenario List */}
          <div className="lg:col-span-3">
            <div className="card-elevated-lg p-4 space-y-3">
              <Button onClick={handleCreateScenario} className="w-full gap-2">
                <Plus className="h-4 w-4" />
                {c.newScenario}
              </Button>

              {scenarios.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">{c.noScenarios}</p>
              ) : (
                <div className="space-y-2">
                  {scenarios.map((scenario) => (
                    <div
                      key={scenario.id}
                      className={cn(
                        'p-3 rounded-lg border cursor-pointer transition-all',
                        selectedScenarioId === scenario.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      )}
                      onClick={() => setSelectedScenarioId(scenario.id)}
                    >
                      {editingNameId === scenario.id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="h-7 text-sm"
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); handleSaveName(); }}>
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); handleCancelEditName(); }}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-foreground text-sm truncate">{scenario.name}</span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100"
                              onClick={(e) => { e.stopPropagation(); handleStartEditName(scenario); }}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 px-2 text-xs"
                              onClick={(e) => { e.stopPropagation(); handleDuplicate(scenario.id); }}
                            >
                              <Copy className="h-3 w-3 mr-1" />
                              {c.duplicate}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 px-2 text-xs text-destructive hover:text-destructive"
                              onClick={(e) => { e.stopPropagation(); deleteScenario(scenario.id); if (selectedScenarioId === scenario.id) setSelectedScenarioId(null); }}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              {c.delete}
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {selectedScenario && outputs && rentScenario && buyScenario ? (
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <InputSection
                    inputs={selectedScenario.inputs}
                    onInputChange={handleInputChange}
                    onPresetChange={handlePresetChange}
                    selectedPreset={selectedPreset}
                  />
                </div>
                <div className="space-y-6">
                  <ResultsDisplay
                    outputs={outputs}
                    timeHorizon={selectedScenario.inputs.timeHorizonYears}
                    countryId={selectedPreset}
                  />
                  <WealthChart
                    rentData={rentScenario.yearlyData}
                    buyData={buyScenario.yearlyData}
                    breakEvenYear={outputs.breakEvenYear}
                    countryId={selectedPreset}
                  />
                </div>
              </div>
            ) : (
              <div className="card-elevated-lg p-12 text-center">
                <p className="text-muted-foreground">
                  {scenarios.length === 0 ? c.noScenarios : 'Select a scenario to view details'}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Compare;
