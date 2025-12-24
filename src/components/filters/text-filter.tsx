import { useState, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon, Cancel01Icon } from '@hugeicons/core-free-icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TextFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

export function TextFilter({
  value,
  onChange,
  placeholder = 'Filter...',
  className,
  debounceMs = 300,
}: TextFilterProps) {
  const [localValue, setLocalValue] = useState(value);

  // Sync local value with prop
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce the onChange
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localValue, value, onChange, debounceMs]);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className={cn('relative', className)}>
      <HugeiconsIcon
        icon={Search01Icon}
        size={14}
        strokeWidth={2}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="h-8 w-40 pl-7 pr-7"
      />
      {localValue && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="absolute right-1 top-1/2 size-5 -translate-y-1/2"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={12} strokeWidth={2} />
        </Button>
      )}
    </div>
  );
}
