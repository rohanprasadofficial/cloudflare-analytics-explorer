import { AreaChart } from '@/components/charts/area-chart';
import { BarChart } from '@/components/charts/bar-chart';
import { LineChart } from '@/components/charts/line-chart';
import { PieChart } from '@/components/charts/pie-chart';
import { ScatterChart } from '@/components/charts/scatter-chart';
import { cn } from '@/lib/utils';
import type { ChartConfig, ChartType } from '@/types/dashboard';

interface ChartTileProps {
  config: ChartConfig;
  data: Record<string, unknown>[];
  className?: string;
}

export function ChartTile({ config, data, className }: ChartTileProps) {
  if (!data || data.length === 0) {
    return (
      <div className={cn('flex h-full items-center justify-center text-sm text-muted-foreground', className)}>
        No data available
      </div>
    );
  }

  const chartProps = {
    data,
    xAxisKey: config.xAxisKey,
    yAxisKeys: config.yAxisKeys,
    showLegend: config.showLegend,
    showGrid: config.showGrid,
    colors: config.colors,
    className: cn('h-full w-full', className),
  };

  const chartComponents: Record<Exclude<ChartType, 'table' | 'stat'>, React.ReactElement> = {
    area: <AreaChart {...chartProps} />,
    bar: <BarChart {...chartProps} />,
    line: <LineChart {...chartProps} />,
    pie: <PieChart {...chartProps} />,
    scatter: <ScatterChart {...chartProps} />,
  };

  const ChartComponent = chartComponents[config.type as Exclude<ChartType, 'table' | 'stat'>];

  if (!ChartComponent) {
    return (
      <div className={cn('flex h-full items-center justify-center text-sm text-muted-foreground', className)}>
        Unknown chart type: {config.type}
      </div>
    );
  }

  return ChartComponent;
}
