import { Pie, PieChart as RechartsPieChart, Cell, Label } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';

interface PieChartProps {
  data: Record<string, unknown>[];
  xAxisKey?: string;
  yAxisKeys?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  colors?: string[];
  className?: string;
  innerRadius?: number;
  showLabel?: boolean;
}

const DEFAULT_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

function inferKeys(data: Record<string, unknown>[]): { nameKey: string; valueKey: string } {
  if (!data.length) return { nameKey: '', valueKey: '' };

  const firstRow = data[0];
  const keys = Object.keys(firstRow);

  // Find the first string key for name, first number key for value
  const nameKey = keys.find((key) => typeof firstRow[key] === 'string') || keys[0];
  const valueKey = keys.find((key) => typeof firstRow[key] === 'number') || keys[1];

  return { nameKey, valueKey };
}

export function PieChart({
  data,
  xAxisKey,
  yAxisKeys,
  showLegend = true,
  colors = DEFAULT_COLORS,
  className,
  innerRadius = 0,
  showLabel = false,
}: PieChartProps) {
  const { nameKey, valueKey } = inferKeys(data);
  const finalNameKey = xAxisKey || nameKey;
  const finalValueKey = yAxisKeys?.[0] || valueKey;

  // Calculate total for percentage labels
  const total = data.reduce((sum, item) => sum + (Number(item[finalValueKey]) || 0), 0);

  // Build chart config from data
  const chartConfig = data.reduce<ChartConfig>((acc, item, index) => {
    const name = String(item[finalNameKey]);
    acc[name] = {
      label: name,
      color: colors[index % colors.length],
    };
    return acc;
  }, {});

  return (
    <ChartContainer config={chartConfig} className={cn('h-full w-full min-h-0', className)}>
      <RechartsPieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value) => [
                `${Number(value).toLocaleString()} (${((Number(value) / total) * 100).toFixed(1)}%)`,
              ]}
            />
          }
        />
        {showLegend && <ChartLegend content={<ChartLegendContent nameKey={finalNameKey} />} />}
        <Pie
          data={data}
          dataKey={finalValueKey}
          nameKey={finalNameKey}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius="80%"
          paddingAngle={2}
          label={
            showLabel
              ? ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`
              : undefined
          }
          labelLine={showLabel}
          isAnimationActive={false}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
          {innerRadius > 0 && (
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-2xl font-bold"
                      >
                        {total.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 20}
                        className="fill-muted-foreground text-xs"
                      >
                        Total
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          )}
        </Pie>
      </RechartsPieChart>
    </ChartContainer>
  );
}
