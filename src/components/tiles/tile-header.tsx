import { HugeiconsIcon } from '@hugeicons/react';
import {
  MoreHorizontalIcon,
  Edit02Icon,
  Delete02Icon,
  RefreshIcon,
  Maximize01Icon,
} from '@hugeicons/core-free-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface TileHeaderProps {
  title: string;
  isLoading?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onRefresh?: () => void;
  onExpand?: () => void;
  className?: string;
}

export function TileHeader({
  title,
  isLoading = false,
  onEdit,
  onDelete,
  onRefresh,
  onExpand,
  className,
}: TileHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between border-b px-4 py-2',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-medium">{title}</h3>
        {isLoading && (
          <div className="size-3 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          className="inline-flex size-6 items-center justify-center rounded-none hover:bg-muted opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100"
        >
          <HugeiconsIcon icon={MoreHorizontalIcon} size={14} strokeWidth={2} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem onClick={onEdit}>
            <HugeiconsIcon icon={Edit02Icon} size={14} strokeWidth={2} />
            <span>Edit</span>
          </DropdownMenuItem>
          {onRefresh && (
            <DropdownMenuItem onClick={onRefresh}>
              <HugeiconsIcon icon={RefreshIcon} size={14} strokeWidth={2} />
              <span>Refresh</span>
            </DropdownMenuItem>
          )}
          {onExpand && (
            <DropdownMenuItem onClick={onExpand}>
              <HugeiconsIcon icon={Maximize01Icon} size={14} strokeWidth={2} />
              <span>Expand</span>
            </DropdownMenuItem>
          )}
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
