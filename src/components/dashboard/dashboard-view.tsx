import { useState, useCallback } from 'react';
import { DashboardHeader } from './dashboard-header';
import { DashboardGrid } from './dashboard-grid';
import { EmptyDashboard } from './empty-dashboard';
import { FilterBar } from '@/components/filters/filter-bar';
import { TileContainer } from '@/components/tiles/tile-container';
import type { Dashboard, DataSource, FilterValues, Tile } from '@/types/dashboard';

interface DashboardViewProps {
  dashboard: Dashboard;
  dataSources: DataSource[];
  onDashboardUpdate: (updates: Partial<Dashboard>) => void;
  onDashboardDuplicate: () => void;
  onDashboardDelete: () => void;
  onTileAdd: () => void;
  onTileEdit: (tileId: string) => void;
  onTileDelete: (tileId: string) => void;
}

export function DashboardView({
  dashboard,
  dataSources,
  onDashboardUpdate,
  onDashboardDuplicate,
  onDashboardDelete,
  onTileAdd,
  onTileEdit,
  onTileDelete,
}: DashboardViewProps) {
  // Initialize filter values from dashboard defaults
  const [filterValues, setFilterValues] = useState<FilterValues>(() => {
    const initial: FilterValues = {};
    dashboard.filters.forEach((filter) => {
      if (filter.defaultValue !== undefined) {
        initial[filter.parameterName] = filter.defaultValue;
      }
    });
    return initial;
  });

  const [refreshKey, setRefreshKey] = useState(0);

  const handleTitleChange = useCallback(
    (name: string) => {
      onDashboardUpdate({ name });
    },
    [onDashboardUpdate]
  );

  const handleRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const handleFilterChange = useCallback((values: FilterValues) => {
    setFilterValues(values);
  }, []);

  const handleFilterReset = useCallback(() => {
    const initial: FilterValues = {};
    dashboard.filters.forEach((filter) => {
      if (filter.defaultValue !== undefined) {
        initial[filter.parameterName] = filter.defaultValue;
      }
    });
    setFilterValues(initial);
  }, [dashboard.filters]);

  const getDataSource = useCallback(
    (id: string) => dataSources.find((ds) => ds.id === id),
    [dataSources]
  );

  const renderTile = useCallback(
    (tile: Tile) => {
      const dataSource = getDataSource(tile.dataSourceId);
      return (
        <TileContainer
          key={`${tile.id}-${refreshKey}`}
          tile={tile}
          dataSource={dataSource}
          filterValues={filterValues}
          onEdit={() => onTileEdit(tile.id)}
          onDelete={() => onTileDelete(tile.id)}
        />
      );
    },
    [getDataSource, filterValues, refreshKey, onTileEdit, onTileDelete]
  );

  return (
    <div className="flex h-full flex-col">
      <DashboardHeader
        dashboard={dashboard}
        onTitleChange={handleTitleChange}
        onAddTile={onTileAdd}
        onRefresh={handleRefresh}
        onDuplicate={onDashboardDuplicate}
        onDelete={onDashboardDelete}
        onSettings={() => {}}
      />

      {dashboard.filters.length > 0 && (
        <FilterBar
          filters={dashboard.filters}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={handleFilterReset}
        />
      )}

      {dashboard.tiles.length === 0 ? (
        <EmptyDashboard onAddTile={onTileAdd} />
      ) : (
        <div className="flex-1 overflow-auto">
          <DashboardGrid
            tiles={dashboard.tiles}
            gridColumns={dashboard.gridColumns}
            renderTile={renderTile}
          />
        </div>
      )}
    </div>
  );
}
