import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Add01Icon,
  Settings02Icon,
  RefreshIcon,
  Edit02Icon,
  Delete02Icon,
  Copy01Icon,
  MoreHorizontalIcon,
} from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Dashboard } from '@/types/dashboard';

interface DashboardHeaderProps {
  dashboard: Dashboard;
  onTitleChange: (title: string) => void;
  onAddTile: () => void;
  onRefresh: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onSettings: () => void;
}

export function DashboardHeader({
  dashboard,
  onTitleChange,
  onAddTile,
  onRefresh,
  onDuplicate,
  onDelete,
  onSettings,
}: DashboardHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(dashboard.name);

  const handleTitleSubmit = () => {
    if (editedTitle.trim() && editedTitle !== dashboard.name) {
      onTitleChange(editedTitle.trim());
    } else {
      setEditedTitle(dashboard.name);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSubmit();
    } else if (e.key === 'Escape') {
      setEditedTitle(dashboard.name);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-3">
        {isEditing ? (
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleTitleSubmit}
            onKeyDown={handleKeyDown}
            className="h-8 w-64 text-lg font-semibold"
            autoFocus
          />
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="group flex items-center gap-2 text-lg font-semibold hover:text-primary"
          >
            {dashboard.name}
            <HugeiconsIcon
              icon={Edit02Icon}
              size={14}
              strokeWidth={2}
              className="opacity-0 group-hover:opacity-100"
            />
          </button>
        )}
        {dashboard.description && (
          <span className="text-sm text-muted-foreground">
            {dashboard.description}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <HugeiconsIcon icon={RefreshIcon} size={14} strokeWidth={2} />
          <span>Refresh</span>
        </Button>

        <Button size="sm" onClick={onAddTile}>
          <HugeiconsIcon icon={Add01Icon} size={14} strokeWidth={2} />
          <span>Add Tile</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            className="inline-flex size-8 items-center justify-center rounded-none hover:bg-muted"
          >
            <HugeiconsIcon icon={MoreHorizontalIcon} size={16} strokeWidth={2} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onClick={onSettings}>
              <HugeiconsIcon icon={Settings02Icon} size={14} strokeWidth={2} />
              <span>Settings</span>
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
    </div>
  );
}
