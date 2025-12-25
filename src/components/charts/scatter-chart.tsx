import {
  Scatter,
  ScatterChart as RechartsScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';

interface ScatterChartProps {
  data: Record<string, unknown>[];
  xAxisKey?: string;
  yAxisKeys?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  colors?: string[];
  className?: string;
  sizeKey?: string;
}

const DEFAULT_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

function inferKeys(data: Record<string, unknown>[]): { xKey: string; yKey: string; sizeKey?: string } {
  if (!data.length) return { xKey: '', yKey: '' };

  const firstRow = data[0];
  const keys = Object.keys(firstRow);
  const numericKeys = keys.filter((key) => typeof firstRow[key] === 'number');

  return {
    xKey: numericKeys[0] || keys[0],
    yKey: numericKeys[1] || keys[1],
    sizeKey: numericKeys[2],
  };
}

export function ScatterChart({
  data,
  xAxisKey,
  yAxisKeys,
  showGrid = true,
  colors = DEFAULT_COLORS,
  className,
  sizeKey,
}: ScatterChartProps) {
  const inferred = inferKeys(data);
  const finalXKey = xAxisKey || inferred.xKey;
  const finalYKey = yAxisKeys?.[0] || inferred.yKey;
  const finalSizeKey = sizeKey || inferred.sizeKey;

  const chartConfig: ChartConfig = {
    scatter: {
      label: 'Data Points',
      color: colors[0],
    },
  };

  return (
    <ChartContainer config={chartConfig} className={cn('h-full w-full min-h-0', className)}>
      <RechartsScatterChart margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis
          dataKey={finalXKey}
          type="number"
          name={finalXKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          label={{ value: finalXKey, position: 'insideBottom', offset: -5 }}
        />
        <YAxis
          dataKey={finalYKey}
          type="number"
          name={finalYKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          label={{ value: finalYKey, angle: -90, position: 'insideLeft' }}
        />
        {finalSizeKey && (
          <ZAxis
            dataKey={finalSizeKey}
            type="number"
            range={[50, 400]}
            name={finalSizeKey}
          />
        )}
        <ChartTooltip
          cursor={{ strokeDasharray: '3 3' }}
          content={
            <ChartTooltipContent
              formatter={(value, name) => [`${name}: ${Number(value).toLocaleString()}`]}
            />
          }
        />
        <Scatter
          data={data}
          fill={colors[0]}
          fillOpacity={0.6}
          stroke={colors[0]}
          strokeWidth={1}
          isAnimationActive={false}
        />
      </RechartsScatterChart>
    </ChartContainer>
  );
}
