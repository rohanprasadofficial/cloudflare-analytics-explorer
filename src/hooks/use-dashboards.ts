import { useCallback, useMemo } from 'react';
import { useLocalStorage, STORAGE_KEYS } from './use-local-storage';
import { MOCK_DASHBOARDS } from '@/data/mock-dashboards';
import type { Dashboard, Tile, DashboardFilter } from '@/types/dashboard';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getTimestamp(): string {
  return new Date().toISOString();
}

export function useDashboards() {
  const [dashboards, setDashboards] = useLocalStorage<Dashboard[]>(
    STORAGE_KEYS.dashboards,
    MOCK_DASHBOARDS
  );
  const [activeDashboardId, setActiveDashboardId] = useLocalStorage<string | null>(
    STORAGE_KEYS.activeDashboard,
    MOCK_DASHBOARDS[0]?.id ?? null
  );

  // Get active dashboard
  const activeDashboard = useMemo(
    () => dashboards.find((d) => d.id === activeDashboardId) ?? null,
    [dashboards, activeDashboardId]
  );

  // Create a new dashboard
  const createDashboard = useCallback(
    (name: string, description?: string): Dashboard => {
      const now = getTimestamp();
      const newDashboard: Dashboard = {
        id: `dash-${generateId()}`,
        name,
        description,
        tiles: [],
        filters: [],
        gridColumns: 4,
        createdAt: now,
        updatedAt: now,
      };

      setDashboards((prev) => [...prev, newDashboard]);
      setActiveDashboardId(newDashboard.id);
      return newDashboard;
    },
    [setDashboards, setActiveDashboardId]
  );

  // Update dashboard
  const updateDashboard = useCallback(
    (id: string, updates: Partial<Omit<Dashboard, 'id' | 'createdAt'>>) => {
      setDashboards((prev) =>
        prev.map((dashboard) =>
          dashboard.id === id
            ? { ...dashboard, ...updates, updatedAt: getTimestamp() }
            : dashboard
        )
      );
    },
    [setDashboards]
  );

  // Delete dashboard
  const deleteDashboard = useCallback(
    (id: string) => {
      setDashboards((prev) => prev.filter((d) => d.id !== id));

      // If deleting active dashboard, switch to another
      if (activeDashboardId === id) {
        setActiveDashboardId(() => {
          const remaining = dashboards.filter((d) => d.id !== id);
          return remaining[0]?.id ?? null;
        });
      }
    },
    [setDashboards, activeDashboardId, dashboards, setActiveDashboardId]
  );

  // Duplicate dashboard
  const duplicateDashboard = useCallback(
    (id: string): Dashboard | null => {
      const original = dashboards.find((d) => d.id === id);
      if (!original) return null;

      const now = getTimestamp();
      const newDashboard: Dashboard = {
        ...original,
        id: `dash-${generateId()}`,
        name: `${original.name} (Copy)`,
        tiles: original.tiles.map((tile) => ({
          ...tile,
          id: `tile-${generateId()}`,
          createdAt: now,
          updatedAt: now,
        })),
        filters: original.filters.map((filter) => ({
          ...filter,
          id: `filter-${generateId()}`,
        })),
        createdAt: now,
        updatedAt: now,
      };

      setDashboards((prev) => [...prev, newDashboard]);
      return newDashboard;
    },
    [dashboards, setDashboards]
  );

  // Add tile to dashboard
  const addTile = useCallback(
    (dashboardId: string, tile: Omit<Tile, 'id' | 'createdAt' | 'updatedAt'>): Tile => {
      const now = getTimestamp();
      const newTile: Tile = {
        ...tile,
        id: `tile-${generateId()}`,
        createdAt: now,
        updatedAt: now,
      };

      setDashboards((prev) =>
        prev.map((dashboard) =>
          dashboard.id === dashboardId
            ? {
                ...dashboard,
                tiles: [...dashboard.tiles, newTile],
                updatedAt: now,
              }
            : dashboard
        )
      );

      return newTile;
    },
    [setDashboards]
  );

  // Update tile
  const updateTile = useCallback(
    (dashboardId: string, tileId: string, updates: Partial<Omit<Tile, 'id' | 'createdAt'>>) => {
      const now = getTimestamp();
      setDashboards((prev) =>
        prev.map((dashboard) =>
          dashboard.id === dashboardId
            ? {
                ...dashboard,
                tiles: dashboard.tiles.map((tile) =>
                  tile.id === tileId
                    ? { ...tile, ...updates, updatedAt: now }
                    : tile
                ),
                updatedAt: now,
              }
            : dashboard
        )
      );
    },
    [setDashboards]
  );

  // Delete tile
  const deleteTile = useCallback(
    (dashboardId: string, tileId: string) => {
      setDashboards((prev) =>
        prev.map((dashboard) =>
          dashboard.id === dashboardId
            ? {
                ...dashboard,
                tiles: dashboard.tiles.filter((t) => t.id !== tileId),
                updatedAt: getTimestamp(),
              }
            : dashboard
        )
      );
    },
    [setDashboards]
  );

  // Add filter to dashboard
  const addFilter = useCallback(
    (dashboardId: string, filter: Omit<DashboardFilter, 'id'>): DashboardFilter => {
      const newFilter: DashboardFilter = {
        ...filter,
        id: `filter-${generateId()}`,
      };

      setDashboards((prev) =>
        prev.map((dashboard) =>
          dashboard.id === dashboardId
            ? {
                ...dashboard,
                filters: [...dashboard.filters, newFilter],
                updatedAt: getTimestamp(),
              }
            : dashboard
        )
      );

      return newFilter;
    },
    [setDashboards]
  );

  // Update filter
  const updateFilter = useCallback(
    (dashboardId: string, filterId: string, updates: Partial<Omit<DashboardFilter, 'id'>>) => {
      setDashboards((prev) =>
        prev.map((dashboard) =>
          dashboard.id === dashboardId
            ? {
                ...dashboard,
                filters: dashboard.filters.map((filter) =>
                  filter.id === filterId ? { ...filter, ...updates } : filter
                ),
                updatedAt: getTimestamp(),
              }
            : dashboard
        )
      );
    },
    [setDashboards]
  );

  // Delete filter
  const deleteFilter = useCallback(
    (dashboardId: string, filterId: string) => {
      setDashboards((prev) =>
        prev.map((dashboard) =>
          dashboard.id === dashboardId
            ? {
                ...dashboard,
                filters: dashboard.filters.filter((f) => f.id !== filterId),
                updatedAt: getTimestamp(),
              }
            : dashboard
        )
      );
    },
    [setDashboards]
  );

  // Reset to mock data
  const resetToDefaults = useCallback(() => {
    setDashboards(MOCK_DASHBOARDS);
    setActiveDashboardId(MOCK_DASHBOARDS[0]?.id ?? null);
  }, [setDashboards, setActiveDashboardId]);

  return {
    // State
    dashboards,
    activeDashboard,
    activeDashboardId,

    // Dashboard actions
    setActiveDashboardId,
    createDashboard,
    updateDashboard,
    deleteDashboard,
    duplicateDashboard,

    // Tile actions
    addTile,
    updateTile,
    deleteTile,

    // Filter actions
    addFilter,
    updateFilter,
    deleteFilter,

    // Utility
    resetToDefaults,
  };
}
