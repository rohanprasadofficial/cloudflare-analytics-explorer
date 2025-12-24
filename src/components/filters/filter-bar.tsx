import { HugeiconsIcon } from '@hugeicons/react';
import { RefreshIcon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { DateRangeFilter } from './date-range-filter';
import { DropdownFilter } from './dropdown-filter';
import { TextFilter } from './text-filter';
import { cn } from '@/lib/utils';
import type { DashboardFilter, FilterValues } from '@/types/dashboard';

interface FilterBarProps {
  filters: DashboardFilter[];
  values: FilterValues;
  onChange: (values: FilterValues) => void;
  onReset: () => void;
  className?: string;
}

export function FilterBar({
  filters,
  values,
  onChange,
  onReset,
  className,
}: FilterBarProps) {
  const handleFilterChange = (parameterName: string, value: string | [string, string]) => {
    onChange({
      ...values,
      [parameterName]: value,
    });
  };

  const renderFilter = (filter: DashboardFilter) => {
    const value = values[filter.parameterName];

    switch (filter.type) {
      case 'dateRange':
        return (
          <DateRangeFilter
            key={filter.id}
            value={(value as [string, string]) || ['', '']}
            onChange={(v) => handleFilterChange(filter.parameterName, v)}
          />
        );
      case 'dropdown':
        return (
          <DropdownFilter
            key={filter.id}
            value={(value as string) || ''}
            onChange={(v) => handleFilterChange(filter.parameterName, v)}
            options={filter.options || []}
            placeholder={filter.name}
          />
        );
      case 'text':
        return (
          <TextFilter
            key={filter.id}
            value={(value as string) || ''}
            onChange={(v) => handleFilterChange(filter.parameterName, v)}
            placeholder={filter.name}
          />
        );
      default:
        return null;
    }
  };

  if (filters.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-4 border-b bg-muted/30 px-6 py-3',
        className
      )}
    >
      {filters.map((filter) => (
        <div key={filter.id} className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {filter.name}:
          </span>
          {renderFilter(filter)}
        </div>
      ))}

      <Button variant="ghost" size="sm" onClick={onReset} className="ml-auto">
        <HugeiconsIcon icon={RefreshIcon} size={14} strokeWidth={2} />
        <span>Reset</span>
      </Button>
    </div>
  );
}
