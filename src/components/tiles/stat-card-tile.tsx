import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUp01Icon, ArrowDown01Icon } from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';
import type { StatCardConfig } from '@/types/dashboard';
import { MOCK_STAT_DATA } from '@/data/mock-query-results';

interface StatCardTileProps {
  config: StatCardConfig;
  data?: Record<string, unknown>[];
  className?: string;
}

function formatValue(
  value: number,
  format?: StatCardConfig['format'],
  prefix?: string,
  suffix?: string
): string {
  let formatted: string;

  switch (format) {
    case 'currency':
      formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
      break;
    case 'percent':
      formatted = value.toFixed(1);
      break;
    default:
      formatted = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: value % 1 === 0 ? 0 : 2,
      }).format(value);
  }

  return `${prefix || ''}${formatted}${suffix || ''}`;
}

export function StatCardTile({ config, data, className }: StatCardTileProps) {
  // Get values from data or mock
  const currentValue =
    (data?.[0]?.[config.valueKey] as number) ??
    (MOCK_STAT_DATA[config.valueKey as keyof typeof MOCK_STAT_DATA] as number) ??
    0;

  const previousValue = config.comparisonKey
    ? ((data?.[0]?.[config.comparisonKey] as number) ??
        (MOCK_STAT_DATA[config.comparisonKey as keyof typeof MOCK_STAT_DATA] as number))
    : undefined;

  // Calculate change percentage
  const changePercent =
    previousValue !== undefined && previousValue !== 0
      ? ((currentValue - previousValue) / previousValue) * 100
      : undefined;

  const isPositive = changePercent !== undefined && changePercent >= 0;

  return (
    <div className={cn('flex h-full flex-col justify-center p-4', className)}>
      {config.label && (
        <span className="mb-1 text-xs text-muted-foreground">{config.label}</span>
      )}

      <div className="text-3xl font-bold">
        {formatValue(currentValue, config.format, config.prefix, config.suffix)}
      </div>

      {changePercent !== undefined && (
        <div className="mt-2 flex items-center gap-1">
          <span
            className={cn(
              'flex items-center gap-0.5 text-sm font-medium',
              isPositive ? 'text-green-600' : 'text-red-600'
            )}
          >
            <HugeiconsIcon
              icon={isPositive ? ArrowUp01Icon : ArrowDown01Icon}
              size={14}
              strokeWidth={2}
            />
            {Math.abs(changePercent).toFixed(1)}%
          </span>
          {config.comparisonLabel && (
            <span className="text-xs text-muted-foreground">
              {config.comparisonLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
