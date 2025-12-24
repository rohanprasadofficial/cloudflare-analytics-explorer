import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';

interface BarChartProps {
  data: Record<string, unknown>[];
  xAxisKey?: string;
  yAxisKeys?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  colors?: string[];
  className?: string;
  layout?: 'vertical' | 'horizontal';
}

const DEFAULT_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

function inferKeys(data: Record<string, unknown>[]): { xKey: string; yKeys: string[] } {
  if (!data.length) return { xKey: '', yKeys: [] };

  const firstRow = data[0];
  const keys = Object.keys(firstRow);

  const xKey = keys[0];
  const yKeys = keys.slice(1).filter((key) => typeof firstRow[key] === 'number');

  return { xKey, yKeys };
}

export function BarChart({
  data,
  xAxisKey,
  yAxisKeys,
  showLegend = true,
  showGrid = true,
  colors = DEFAULT_COLORS,
  className,
  layout = 'horizontal',
}: BarChartProps) {
  const { xKey, yKeys } = inferKeys(data);
  const finalXKey = xAxisKey || xKey;
  const finalYKeys = yAxisKeys?.length ? yAxisKeys : yKeys;

  const chartConfig: ChartConfig = finalYKeys.reduce((acc, key, index) => {
    acc[key] = {
      label: key.charAt(0).toUpperCase() + key.slice(1),
      color: colors[index % colors.length],
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <ChartContainer config={chartConfig} className={cn('h-full w-full', className)}>
      <RechartsBarChart
        data={data}
        layout={layout}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        {layout === 'horizontal' ? (
          <>
            <XAxis
              dataKey={finalXKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                if (typeof value === 'string' && value.length > 10) {
                  return value.slice(0, 10) + '...';
                }
                return String(value);
              }}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          </>
        ) : (
          <>
            <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              dataKey={finalXKey}
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={100}
              tickFormatter={(value) => {
                if (typeof value === 'string' && value.length > 15) {
                  return value.slice(0, 15) + '...';
                }
                return String(value);
              }}
            />
          </>
        )}
        <ChartTooltip content={<ChartTooltipContent />} />
        {showLegend && finalYKeys.length > 1 && (
          <ChartLegend content={<ChartLegendContent />} />
        )}
        {finalYKeys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={colors[index % colors.length]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
}
