import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalIcon, Delete02Icon, Edit02Icon, Copy01Icon } from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SidebarNavItemProps {
  label: string;
  sublabel?: string;
  isActive?: boolean;
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

export function SidebarNavItem({
  label,
  sublabel,
  isActive = false,
  onClick,
  onEdit,
  onDelete,
  onDuplicate,
}: SidebarNavItemProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className={cn(
        'group flex items-center gap-1 px-2',
        isActive && 'bg-accent'
      )}
    >
      <button
        onClick={onClick}
        className={cn(
          'flex flex-1 flex-col items-start py-1.5 text-left',
          isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
        )}
      >
        <span className="truncate text-xs">{label}</span>
        {sublabel && (
          <span className="truncate text-[10px] text-muted-foreground">{sublabel}</span>
        )}
      </button>

      <DropdownMenu open={showMenu} onOpenChange={setShowMenu}>
        <DropdownMenuTrigger
          className={cn(
            'inline-flex size-6 items-center justify-center rounded-none hover:bg-muted opacity-0 group-hover:opacity-100',
            showMenu && 'opacity-100'
          )}
        >
          <HugeiconsIcon icon={MoreHorizontalIcon} size={14} strokeWidth={2} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          {onEdit && (
            <DropdownMenuItem onClick={onEdit}>
              <HugeiconsIcon icon={Edit02Icon} size={14} strokeWidth={2} />
              <span>Edit</span>
            </DropdownMenuItem>
          )}
          {onDuplicate && (
            <DropdownMenuItem onClick={onDuplicate}>
              <HugeiconsIcon icon={Copy01Icon} size={14} strokeWidth={2} />
              <span>Duplicate</span>
            </DropdownMenuItem>
          )}
          {onDelete && (
            <>
              {(onEdit || onDuplicate) && <DropdownMenuSeparator />}
              <DropdownMenuItem
                onClick={onDelete}
                className="text-destructive focus:text-destructive"
              >
                <HugeiconsIcon icon={Delete02Icon} size={14} strokeWidth={2} />
                <span>Delete</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
