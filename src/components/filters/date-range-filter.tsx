import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface DateRangeFilterProps {
  value: [string, string];
  onChange: (value: [string, string]) => void;
  className?: string;
}

export function DateRangeFilter({ value, onChange, className }: DateRangeFilterProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Input
        type="date"
        value={value[0]}
        onChange={(e) => onChange([e.target.value, value[1]])}
        className="h-8 w-36"
      />
      <span className="text-xs text-muted-foreground">to</span>
      <Input
        type="date"
        value={value[1]}
        onChange={(e) => onChange([value[0], e.target.value])}
        className="h-8 w-36"
      />
    </div>
  );
}
