import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from 'recharts';
import type { YearlyData } from '@/types/simulator';
import { formatCurrency } from '@/lib/calculations';
import { useLanguage } from '@/i18n/LanguageContext';

interface WealthChartProps {
  rentData: YearlyData[];
  buyData: YearlyData[];
  breakEvenYear: number | null;
  countryId: string;
}

export function WealthChart({ rentData, buyData, breakEvenYear, countryId }: WealthChartProps) {
  const { t } = useLanguage();

  // Combine data for chart
  const chartData = rentData.map((rent, index) => ({
    year: rent.year,
    rent: Math.round(rent.rentNetWorth),
    buy: Math.round(buyData[index]?.buyNetWorth || 0),
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-medium text-foreground mb-2">
            {t.chart.year}{label}
          </p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">
                {entry.dataKey === 'rent' ? t.chart.rentLabel : t.chart.buyLabel}:
              </span>
              <span className="font-medium text-foreground">
                {formatCurrency(entry.value, countryId)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const currencySymbol = countryId === 'brazil' ? 'R$' : '€';

  return (
    <div className="card-elevated-lg p-6">
      <h3 className="section-title mb-4">{t.chart.title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              opacity={0.5}
            />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={(value) => `${t.chart.year}${value}`}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={(value) =>
                value >= 1000000
                  ? `${currencySymbol}${(value / 1000000).toFixed(1)}M`
                  : `${currencySymbol}${(value / 1000).toFixed(0)}K`
              }
              width={70}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => (
                <span className="text-sm text-foreground">
                  {value === 'rent' ? t.chart.rentLabel : t.chart.buyLabel}
                </span>
              )}
            />
            {breakEvenYear && (
              <ReferenceLine
                x={breakEvenYear}
                stroke="hsl(var(--muted-foreground))"
                strokeDasharray="5 5"
                label={{
                  value: t.chart.breakEven,
                  position: 'top',
                  fill: 'hsl(var(--muted-foreground))',
                  fontSize: 11,
                }}
              />
            )}
            <Line
              type="monotone"
              dataKey="rent"
              name="rent"
              stroke="hsl(var(--rent-color))"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="buy"
              name="buy"
              stroke="hsl(var(--buy-color))"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
