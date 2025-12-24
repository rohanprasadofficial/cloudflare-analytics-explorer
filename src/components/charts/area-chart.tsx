import {
  Area,
  AreaChart as RechartsAreaChart,
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

interface AreaChartProps {
  data: Record<string, unknown>[];
  xAxisKey?: string;
  yAxisKeys?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  colors?: string[];
  className?: string;
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

  // First key is usually x-axis, rest are y-axis values
  const xKey = keys[0];
  const yKeys = keys.slice(1).filter((key) => typeof firstRow[key] === 'number');

  return { xKey, yKeys };
}

export function AreaChart({
  data,
  xAxisKey,
  yAxisKeys,
  showLegend = true,
  showGrid = true,
  colors = DEFAULT_COLORS,
  className,
}: AreaChartProps) {
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
      <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        <XAxis
          dataKey={finalXKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
            if (typeof value === 'string' && value.includes('-')) {
              return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }
            return String(value);
          }}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {finalYKeys.map((key, index) => (
          <Area
            key={key}
            dataKey={key}
            type="monotone"
            fill={colors[index % colors.length]}
            fillOpacity={0.3}
            stroke={colors[index % colors.length]}
            strokeWidth={2}
            stackId="1"
          />
        ))}
      </RechartsAreaChart>
    </ChartContainer>
  );
}
