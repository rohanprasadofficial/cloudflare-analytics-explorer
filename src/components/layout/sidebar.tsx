import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  DashboardSpeed01Icon,
  Database02Icon,
  Add01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowDown01Icon,
  BookOpen01Icon,
} from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SidebarNavItem } from './sidebar-nav-item';
import type { Dashboard, DataSource } from '@/types/dashboard';

interface SidebarProps {
  dashboards: Dashboard[];
  dataSources: DataSource[];
  activeDashboardId: string | null;
  onDashboardSelect: (id: string) => void;
  onDashboardCreate: () => void;
  onDashboardDelete: (id: string) => void;
  onDataSourceSelect: (id: string) => void;
  onDataSourceCreate: () => void;
  onDataSourceDelete: (id: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onDocsOpen: () => void;
}

export function Sidebar({
  dashboards,
  dataSources,
  activeDashboardId,
  onDashboardSelect,
  onDashboardCreate,
  onDashboardDelete,
  onDataSourceSelect,
  onDataSourceCreate,
  onDataSourceDelete,
  isCollapsed,
  onToggleCollapse,
  onDocsOpen,
}: SidebarProps) {
  const [dashboardsExpanded, setDashboardsExpanded] = useState(true);
  const [dataSourcesExpanded, setDataSourcesExpanded] = useState(true);

  return (
    <aside
      className={cn(
        'flex flex-col border-r bg-sidebar transition-all duration-200',
        isCollapsed ? 'w-14' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b px-3">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <svg className="size-7" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" rx="20" className="fill-primary"/>
              <path d="M20 75 L20 45 L32 45 L32 75 Z" fill="white"/>
              <path d="M38 75 L38 30 L50 30 L50 75 Z" fill="white"/>
              <path d="M56 75 L56 55 L68 55 L68 75 Z" fill="white"/>
              <path d="M74 75 L74 20 L86 20 L86 75 Z" fill="white"/>
            </svg>
            <span className="text-sm font-semibold">Analytics Explorer</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="size-8"
        >
          <HugeiconsIcon
            icon={isCollapsed ? ArrowRight01Icon : ArrowLeft01Icon}
            size={16}
            strokeWidth={2}
          />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        {/* Dashboards Section */}
        <div className="mb-4">
          <button
            onClick={() => !isCollapsed && setDashboardsExpanded(!dashboardsExpanded)}
            className={cn(
              'flex w-full items-center gap-2 px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground',
              isCollapsed && 'justify-center'
            )}
          >
            <HugeiconsIcon icon={DashboardSpeed01Icon} size={16} strokeWidth={2} />
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left">Dashboards</span>
                <HugeiconsIcon
                  icon={dashboardsExpanded ? ArrowDown01Icon : ArrowRight01Icon}
                  size={14}
                  strokeWidth={2}
                />
              </>
            )}
          </button>

          {!isCollapsed && dashboardsExpanded && (
            <div className="mt-1 space-y-0.5">
              {dashboards.map((dashboard) => (
                <SidebarNavItem
                  key={dashboard.id}
                  label={dashboard.name}
                  isActive={dashboard.id === activeDashboardId}
                  onClick={() => onDashboardSelect(dashboard.id)}
                  onDelete={() => onDashboardDelete(dashboard.id)}
                />
              ))}
              <button
                onClick={onDashboardCreate}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <HugeiconsIcon icon={Add01Icon} size={14} strokeWidth={2} />
                <span>New Dashboard</span>
              </button>
            </div>
          )}
        </div>

        {/* Data Sources Section */}
        <div>
          <button
            onClick={() => !isCollapsed && setDataSourcesExpanded(!dataSourcesExpanded)}
            className={cn(
              'flex w-full items-center gap-2 px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground',
              isCollapsed && 'justify-center'
            )}
          >
            <HugeiconsIcon icon={Database02Icon} size={16} strokeWidth={2} />
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left">Data Sources</span>
                <HugeiconsIcon
                  icon={dataSourcesExpanded ? ArrowDown01Icon : ArrowRight01Icon}
                  size={14}
                  strokeWidth={2}
                />
              </>
            )}
          </button>

          {!isCollapsed && dataSourcesExpanded && (
            <div className="mt-1 space-y-0.5">
              {dataSources.map((ds) => (
                <SidebarNavItem
                  key={ds.id}
                  label={ds.name}
                  sublabel={`${ds.columnMappings.length} columns`}
                  isActive={false}
                  onClick={() => onDataSourceSelect(ds.id)}
                  onDelete={() => onDataSourceDelete(ds.id)}
                />
              ))}
              <button
                onClick={onDataSourceCreate}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <HugeiconsIcon icon={Add01Icon} size={14} strokeWidth={2} />
                <span>New Data Source</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t p-2">
        <button
          onClick={onDocsOpen}
          className={cn(
            'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground',
            isCollapsed && 'justify-center'
          )}
        >
          <HugeiconsIcon icon={BookOpen01Icon} size={16} strokeWidth={2} />
          {!isCollapsed && <span>Documentation</span>}
        </button>
        {!isCollapsed && (
          <p className="mt-2 px-2 text-xs text-muted-foreground">
            Analytics Explorer v0.1.0
          </p>
        )}
      </div>
    </aside>
  );
}
