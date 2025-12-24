import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { FilterOption } from '@/types/dashboard';

interface DropdownFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  placeholder?: string;
  className?: string;
}

export function DropdownFilter({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  className,
}: DropdownFilterProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v ?? '')}>
      <SelectTrigger className={cn('h-8 w-40', className)}>
        <SelectValue>{value || placeholder}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value || '_empty_'}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
