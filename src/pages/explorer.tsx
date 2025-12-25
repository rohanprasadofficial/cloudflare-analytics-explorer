import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/app-layout';
import { DashboardView } from '@/components/dashboard/dashboard-view';
import { DataSourceList } from '@/components/data-sources/data-source-list';
import { CreateDashboardModal } from '@/components/modals/create-dashboard-modal';
import { DeleteConfirmModal } from '@/components/modals/delete-confirm-modal';
import { DataSourceModal } from '@/components/modals/data-source-modal';
import { TileEditorModal } from '@/components/modals/tile-editor-modal';
import { FilterConfigModal } from '@/components/modals/filter-config-modal';
import { useDashboards } from '@/hooks/use-dashboards';
import { useDataSources } from '@/hooks/use-data-sources';
import type { Tile, ColumnMapping, TilePosition, DashboardFilter } from '@/types/dashboard';

type ViewMode = 'dashboard' | 'dataSources';

interface DeleteState {
  isOpen: boolean;
  type: 'dashboard' | 'dataSource' | 'tile' | null;
  id: string | null;
  name: string;
}

interface DataSourceModalState {
  isOpen: boolean;
  mode: 'create' | 'edit';
  id: string | null;
}

interface TileModalState {
  isOpen: boolean;
  mode: 'create' | 'edit';
  tileId: string | null;
}

export function ExplorerPage() {
  const navigate = useNavigate();

  // View state
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [selectedDataSourceId, setSelectedDataSourceId] = useState<string | null>(null);

  // Modal states
  const [createDashboardOpen, setCreateDashboardOpen] = useState(false);
  const [deleteState, setDeleteState] = useState<DeleteState>({
    isOpen: false,
    type: null,
    id: null,
    name: '',
  });
  const [dataSourceModal, setDataSourceModal] = useState<DataSourceModalState>({
    isOpen: false,
    mode: 'create',
    id: null,
  });
  const [tileModal, setTileModal] = useState<TileModalState>({
    isOpen: false,
    mode: 'create',
    tileId: null,
  });
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  // Hooks
  const {
    dashboards,
    activeDashboard,
    activeDashboardId,
    setActiveDashboardId,
    createDashboard,
    updateDashboard,
    deleteDashboard,
    duplicateDashboard,
    addTile,
    updateTile,
    deleteTile,
  } = useDashboards();

  const {
    dataSources,
    createDataSource,
    updateDataSource,
    deleteDataSource,
    duplicateDataSource,
    getDataSource,
  } = useDataSources();

  // Dashboard handlers
  const handleDashboardSelect = useCallback((id: string) => {
    setActiveDashboardId(id);
    setViewMode('dashboard');
  }, [setActiveDashboardId]);

  const handleDashboardCreate = useCallback(() => {
    setCreateDashboardOpen(true);
  }, []);

  const handleDashboardCreateConfirm = useCallback((name: string, description?: string) => {
    createDashboard(name, description);
    setViewMode('dashboard');
  }, [createDashboard]);

  const handleDashboardDelete = useCallback((id: string) => {
    const dashboard = dashboards.find((d) => d.id === id);
    setDeleteState({
      isOpen: true,
      type: 'dashboard',
      id,
      name: dashboard?.name || 'this dashboard',
    });
  }, [dashboards]);

  const handleDashboardDuplicate = useCallback(() => {
    if (activeDashboardId) {
      duplicateDashboard(activeDashboardId);
    }
  }, [activeDashboardId, duplicateDashboard]);

  const handleManageFilters = useCallback(() => {
    setFilterModalOpen(true);
  }, []);

  const handleFiltersSave = useCallback(
    (filters: DashboardFilter[]) => {
      if (activeDashboardId) {
        updateDashboard(activeDashboardId, { filters });
      }
    },
    [activeDashboardId, updateDashboard]
  );

  // Data source handlers
  const handleDataSourceSelect = useCallback((id: string) => {
    setSelectedDataSourceId(id);
    setViewMode('dataSources');
  }, []);

  const handleDataSourceCreate = useCallback(() => {
    setDataSourceModal({ isOpen: true, mode: 'create', id: null });
  }, []);

  const handleDataSourceEdit = useCallback((id: string) => {
    setDataSourceModal({ isOpen: true, mode: 'edit', id });
  }, []);

  const handleDataSourceDelete = useCallback((id: string) => {
    const ds = getDataSource(id);
    setDeleteState({
      isOpen: true,
      type: 'dataSource',
      id,
      name: ds?.name || 'this data source',
    });
  }, [getDataSource]);

  const handleDataSourceDuplicate = useCallback((id: string) => {
    duplicateDataSource(id);
  }, [duplicateDataSource]);

  const handleDataSourceSave = useCallback(
    (name: string, endpoint: string, mappings: ColumnMapping[]) => {
      if (dataSourceModal.mode === 'edit' && dataSourceModal.id) {
        updateDataSource(dataSourceModal.id, { name, endpoint, columnMappings: mappings });
      } else {
        createDataSource(name, endpoint, mappings);
      }
    },
    [dataSourceModal, createDataSource, updateDataSource]
  );

  // Tile handlers
  const handleTileAdd = useCallback(() => {
    setTileModal({ isOpen: true, mode: 'create', tileId: null });
  }, []);

  const handleTileEdit = useCallback((tileId: string) => {
    setTileModal({ isOpen: true, mode: 'edit', tileId });
  }, []);

  const handleTileDelete = useCallback((tileId: string) => {
    const tile = activeDashboard?.tiles.find((t) => t.id === tileId);
    setDeleteState({
      isOpen: true,
      type: 'tile',
      id: tileId,
      name: tile?.title || 'this tile',
    });
  }, [activeDashboard]);

  const handleTileSave = useCallback(
    (tileData: Omit<Tile, 'id' | 'createdAt' | 'updatedAt'>) => {
      if (!activeDashboardId) return;

      if (tileModal.mode === 'edit' && tileModal.tileId) {
        updateTile(activeDashboardId, tileModal.tileId, tileData);
      } else {
        addTile(activeDashboardId, tileData);
      }
    },
    [activeDashboardId, tileModal, addTile, updateTile]
  );

  const handleTilePositionChange = useCallback(
    (tileId: string, position: TilePosition) => {
      if (!activeDashboardId) return;
      updateTile(activeDashboardId, tileId, { position });
    },
    [activeDashboardId, updateTile]
  );

  // Delete confirmation handler
  const handleDeleteConfirm = useCallback(() => {
    if (!deleteState.id) return;

    switch (deleteState.type) {
      case 'dashboard':
        deleteDashboard(deleteState.id);
        break;
      case 'dataSource':
        deleteDataSource(deleteState.id);
        break;
      case 'tile':
        if (activeDashboardId) {
          deleteTile(activeDashboardId, deleteState.id);
        }
        break;
    }

    setDeleteState({ isOpen: false, type: null, id: null, name: '' });
  }, [deleteState, deleteDashboard, deleteDataSource, deleteTile, activeDashboardId]);

  // Get current tile for editing
  const currentTile = tileModal.tileId
    ? activeDashboard?.tiles.find((t) => t.id === tileModal.tileId)
    : null;

  // Get current data source for editing
  const currentDataSource = dataSourceModal.id
    ? getDataSource(dataSourceModal.id)
    : null;

  return (
    <>
      <AppLayout
        dashboards={dashboards}
        dataSources={dataSources}
        activeDashboardId={activeDashboardId}
        onDashboardSelect={handleDashboardSelect}
        onDashboardCreate={handleDashboardCreate}
        onDashboardDelete={handleDashboardDelete}
        onDataSourceSelect={handleDataSourceSelect}
        onDataSourceCreate={handleDataSourceCreate}
        onDataSourceDelete={handleDataSourceDelete}
        onDocsOpen={() => navigate('/wiki')}
      >
        {viewMode === 'dashboard' && activeDashboard ? (
          <DashboardView
            dashboard={activeDashboard}
            dataSources={dataSources}
            onDashboardUpdate={(updates) => updateDashboard(activeDashboard.id, updates)}
            onDashboardDuplicate={handleDashboardDuplicate}
            onDashboardDelete={() => handleDashboardDelete(activeDashboard.id)}
            onTileAdd={handleTileAdd}
            onTileEdit={handleTileEdit}
            onTileDelete={handleTileDelete}
            onTilePositionChange={handleTilePositionChange}
            onManageFilters={handleManageFilters}
          />
        ) : viewMode === 'dataSources' ? (
          <DataSourceList
            dataSources={dataSources}
            selectedId={selectedDataSourceId}
            onSelect={setSelectedDataSourceId}
            onCreate={handleDataSourceCreate}
            onEdit={handleDataSourceEdit}
            onDelete={handleDataSourceDelete}
            onDuplicate={handleDataSourceDuplicate}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <p>Select a dashboard or create a new one</p>
          </div>
        )}
      </AppLayout>

      {/* Modals */}
      <CreateDashboardModal
        isOpen={createDashboardOpen}
        onClose={() => setCreateDashboardOpen(false)}
        onConfirm={handleDashboardCreateConfirm}
      />

      <DeleteConfirmModal
        isOpen={deleteState.isOpen}
        onClose={() => setDeleteState({ isOpen: false, type: null, id: null, name: '' })}
        onConfirm={handleDeleteConfirm}
        title={`Delete ${deleteState.type === 'dashboard' ? 'Dashboard' : deleteState.type === 'dataSource' ? 'Data Source' : 'Tile'}?`}
        description={`Are you sure you want to delete this ${deleteState.type}? This action cannot be undone.`}
        itemName={deleteState.name}
      />

      <DataSourceModal
        isOpen={dataSourceModal.isOpen}
        onClose={() => setDataSourceModal({ isOpen: false, mode: 'create', id: null })}
        onSave={handleDataSourceSave}
        dataSource={currentDataSource}
        mode={dataSourceModal.mode}
      />

      <TileEditorModal
        isOpen={tileModal.isOpen}
        onClose={() => setTileModal({ isOpen: false, mode: 'create', tileId: null })}
        onSave={handleTileSave}
        tile={currentTile}
        dataSources={dataSources}
        filters={activeDashboard?.filters || []}
        mode={tileModal.mode}
      />

      <FilterConfigModal
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        filters={activeDashboard?.filters || []}
        onSave={handleFiltersSave}
      />
    </>
  );
}
