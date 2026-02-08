import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/i18n/LanguageContext';

export interface FreeInputs {
  rentMonthly: number;
  propertyPrice: number;
  interestRate: number;
  timeHorizonYears: number;
}

interface FreeInputSectionProps {
  inputs: FreeInputs;
  onInputChange: (key: keyof FreeInputs, value: number) => void;
}

export function FreeInputSection({ inputs, onInputChange }: FreeInputSectionProps) {
  const { t } = useLanguage();

  const handleNumberChange = (key: keyof FreeInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    onInputChange(key, numValue);
  };

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          {t.freeEstimate?.inputs?.title || 'Quick Estimate'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Monthly Rent */}
        <div className="space-y-2">
          <Label htmlFor="rent" className="text-sm font-medium text-foreground">
            {t.freeEstimate?.inputs?.monthlyRent || 'Monthly Rent'}
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
            <Input
              id="rent"
              type="number"
              value={inputs.rentMonthly || ''}
              onChange={(e) => handleNumberChange('rentMonthly', e.target.value)}
              className="pl-8"
              placeholder="1,000"
            />
          </div>
        </div>

        {/* Property Price */}
        <div className="space-y-2">
          <Label htmlFor="price" className="text-sm font-medium text-foreground">
            {t.freeEstimate?.inputs?.propertyPrice || 'Property Price'}
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
            <Input
              id="price"
              type="number"
              value={inputs.propertyPrice || ''}
              onChange={(e) => handleNumberChange('propertyPrice', e.target.value)}
              className="pl-8"
              placeholder="250,000"
            />
          </div>
        </div>

        {/* Interest Rate */}
        <div className="space-y-2">
          <Label htmlFor="rate" className="text-sm font-medium text-foreground">
            {t.freeEstimate?.inputs?.interestRate || 'Interest Rate'}
          </Label>
          <div className="relative">
            <Input
              id="rate"
              type="number"
              step="0.1"
              value={inputs.interestRate || ''}
              onChange={(e) => handleNumberChange('interestRate', e.target.value)}
              className="pr-8"
              placeholder="3.5"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
          </div>
        </div>

        {/* Time Horizon - Limited to 5, 7, 10 years */}
        <div className="space-y-2">
          <Label htmlFor="horizon" className="text-sm font-medium text-foreground">
            {t.freeEstimate?.inputs?.timeHorizon || 'Time Horizon'}
          </Label>
          <Select
            value={String(inputs.timeHorizonYears)}
            onValueChange={(val) => onInputChange('timeHorizonYears', parseInt(val))}
          >
            <SelectTrigger id="horizon">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 {t.freeEstimate?.inputs?.years || 'years'}</SelectItem>
              <SelectItem value="7">7 {t.freeEstimate?.inputs?.years || 'years'}</SelectItem>
              <SelectItem value="10">10 {t.freeEstimate?.inputs?.years || 'years'}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
