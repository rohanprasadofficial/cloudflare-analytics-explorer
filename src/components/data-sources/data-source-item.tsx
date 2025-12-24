import { HugeiconsIcon } from '@hugeicons/react';
import { Database02Icon, MoreHorizontalIcon, Edit02Icon, Delete02Icon, Copy01Icon } from '@hugeicons/core-free-icons';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { DataSource } from '@/types/dashboard';

interface DataSourceItemProps {
  dataSource: DataSource;
  isSelected?: boolean;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export function DataSourceItem({
  dataSource,
  isSelected = false,
  onClick,
  onEdit,
  onDelete,
  onDuplicate,
}: DataSourceItemProps) {
  const blobCount = dataSource.columnMappings.filter((m) => m.columnType === 'blob').length;
  const doubleCount = dataSource.columnMappings.filter((m) => m.columnType === 'double').length;
  const indexCount = dataSource.columnMappings.filter((m) => m.columnType === 'index').length;

  return (
    <div
      className={cn(
        'group flex items-center gap-3 rounded border p-3 transition-colors hover:bg-muted/50',
        isSelected && 'border-primary bg-primary/5'
      )}
    >
      <button onClick={onClick} className="flex flex-1 items-center gap-3 text-left">
        <div className="rounded bg-muted p-2">
          <HugeiconsIcon icon={Database02Icon} size={20} strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium">{dataSource.name}</div>
          <div className="truncate text-xs text-muted-foreground">
            {dataSource.endpoint}
          </div>
          <div className="mt-1 flex gap-1">
            {blobCount > 0 && (
              <Badge variant="secondary" className="text-[10px]">
                {blobCount} blob
              </Badge>
            )}
            {doubleCount > 0 && (
              <Badge variant="secondary" className="text-[10px]">
                {doubleCount} double
              </Badge>
            )}
            {indexCount > 0 && (
              <Badge variant="secondary" className="text-[10px]">
                {indexCount} index
              </Badge>
            )}
          </div>
        </div>
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger
          className="inline-flex size-8 items-center justify-center rounded-none hover:bg-muted opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100"
        >
          <HugeiconsIcon icon={MoreHorizontalIcon} size={16} strokeWidth={2} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={onEdit}>
            <HugeiconsIcon icon={Edit02Icon} size={14} strokeWidth={2} />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDuplicate}>
            <HugeiconsIcon icon={Copy01Icon} size={14} strokeWidth={2} />
            <span>Duplicate</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onDelete}
            className="text-destructive focus:text-destructive"
          >
            <HugeiconsIcon icon={Delete02Icon} size={14} strokeWidth={2} />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
