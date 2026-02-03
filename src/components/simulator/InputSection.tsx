import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { COUNTRY_PRESETS, type SimulatorInputs } from '@/types/simulator';
import { Home, TrendingUp, Percent, Calendar, Banknote, Building } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface InputSectionProps {
  inputs: SimulatorInputs;
  onInputChange: (key: keyof SimulatorInputs, value: number) => void;
  onPresetChange: (presetId: string) => void;
  selectedPreset: string;
}

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
  hint?: string;
  icon?: React.ReactNode;
}

function InputField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  hint,
  icon,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="input-label flex items-center gap-2">
          {icon}
          {label}
        </Label>
        <div className="flex items-center gap-1">
          <Input
            type="number"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            className="w-24 text-right h-8 text-sm"
            min={min}
            max={max}
            step={step}
          />
          <span className="text-sm text-muted-foreground w-8">{unit}</span>
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min}
        max={max}
        step={step}
        className="mt-2"
      />
      {hint && <p className="input-hint">{hint}</p>}
    </div>
  );
}

export function InputSection({
  inputs,
  onInputChange,
  onPresetChange,
  selectedPreset,
}: InputSectionProps) {
  const { t } = useLanguage();

  // Get currency symbol based on selected preset
  const currencySymbol = '€';

  return (
    <div className="card-elevated-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="section-title">{t.inputs.title}</h2>
        <Select value={selectedPreset} onValueChange={onPresetChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder={t.inputs.selectCountry} />
          </SelectTrigger>
          <SelectContent>
            {COUNTRY_PRESETS.map((preset) => (
              <SelectItem key={preset.id} value={preset.id}>
                <span className="flex items-center gap-2">
                  <span>{preset.flag}</span>
                  <span>{t.countries[preset.id as keyof typeof t.countries] || preset.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Housing Inputs */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {t.inputs.housing.title}
        </h3>
        <div className="grid gap-6">
          <InputField
            label={t.inputs.housing.propertyPrice}
            value={inputs.propertyPrice}
            onChange={(v) => onInputChange('propertyPrice', v)}
            min={50000}
            max={2000000}
            step={10000}
            unit={currencySymbol}
            icon={<Building className="h-4 w-4 text-muted-foreground" />}
          />
          <InputField
            label={t.inputs.housing.downPayment}
            value={inputs.downPayment}
            onChange={(v) => onInputChange('downPayment', v)}
            min={0}
            max={inputs.propertyPrice}
            step={5000}
            unit={currencySymbol}
            hint={`${((inputs.downPayment / inputs.propertyPrice) * 100).toFixed(0)}% ${t.inputs.housing.downPaymentHint}`}
            icon={<Banknote className="h-4 w-4 text-muted-foreground" />}
          />
          <InputField
            label={t.inputs.housing.mortgageRate}
            value={inputs.mortgageRate}
            onChange={(v) => onInputChange('mortgageRate', v)}
            min={0}
            max={15}
            step={0.1}
            unit={t.inputs.units.percent}
            icon={<Percent className="h-4 w-4 text-muted-foreground" />}
          />
          <InputField
            label={t.inputs.housing.mortgageTerm}
            value={inputs.mortgageYears}
            onChange={(v) => onInputChange('mortgageYears', v)}
            min={5}
            max={40}
            step={1}
            unit={t.inputs.units.years}
            icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
          />
          <InputField
            label={t.inputs.housing.monthlyRent}
            value={inputs.rentMonthly}
            onChange={(v) => onInputChange('rentMonthly', v)}
            min={200}
            max={10000}
            step={50}
            unit={currencySymbol}
            icon={<Home className="h-4 w-4 text-muted-foreground" />}
          />
          <InputField
            label={t.inputs.housing.annualRentIncrease}
            value={inputs.rentIncreaseAnnual}
            onChange={(v) => onInputChange('rentIncreaseAnnual', v)}
            min={0}
            max={10}
            step={0.5}
            unit={t.inputs.units.percent}
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
      </div>

      {/* Financial Assumptions */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {t.inputs.financial.title}
        </h3>
        <div className="grid gap-6">
          <InputField
            label={t.inputs.financial.investmentReturn}
            value={inputs.investmentReturnAnnual}
            onChange={(v) => onInputChange('investmentReturnAnnual', v)}
            min={0}
            max={15}
            step={0.5}
            unit={t.inputs.units.percent}
            hint={t.inputs.financial.investmentReturnHint}
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          />
          <InputField
            label={t.inputs.financial.propertyAppreciation}
            value={inputs.propertyAppreciationAnnual}
            onChange={(v) => onInputChange('propertyAppreciationAnnual', v)}
            min={-5}
            max={10}
            step={0.5}
            unit={t.inputs.units.percent}
            hint={t.inputs.financial.propertyAppreciationHint}
            icon={<Building className="h-4 w-4 text-muted-foreground" />}
          />
          <InputField
            label={t.inputs.financial.maintenanceCost}
            value={inputs.maintenancePercentAnnual}
            onChange={(v) => onInputChange('maintenancePercentAnnual', v)}
            min={0}
            max={5}
            step={0.25}
            unit={t.inputs.units.percent}
            hint={t.inputs.financial.maintenanceCostHint}
            icon={<Home className="h-4 w-4 text-muted-foreground" />}
          />
          <InputField
            label={t.inputs.financial.timeHorizon}
            value={inputs.timeHorizonYears}
            onChange={(v) => onInputChange('timeHorizonYears', v)}
            min={5}
            max={40}
            step={1}
            unit={t.inputs.units.years}
            hint={t.inputs.financial.timeHorizonHint}
            icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
      </div>
    </div>
  );
}
