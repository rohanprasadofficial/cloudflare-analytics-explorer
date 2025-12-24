import { useCallback } from 'react';
import { useLocalStorage, STORAGE_KEYS } from './use-local-storage';
import { MOCK_DATA_SOURCES } from '@/data/mock-data-sources';
import type { DataSource, ColumnMapping } from '@/types/dashboard';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getTimestamp(): string {
  return new Date().toISOString();
}

export function useDataSources() {
  const [dataSources, setDataSources] = useLocalStorage<DataSource[]>(
    STORAGE_KEYS.dataSources,
    MOCK_DATA_SOURCES
  );

  // Create a new data source
  const createDataSource = useCallback(
    (
      name: string,
      endpoint: string,
      columnMappings: ColumnMapping[] = []
    ): DataSource => {
      const now = getTimestamp();
      const newDataSource: DataSource = {
        id: `ds-${generateId()}`,
        name,
        endpoint,
        columnMappings,
        createdAt: now,
        updatedAt: now,
      };

      setDataSources((prev) => [...prev, newDataSource]);
      return newDataSource;
    },
    [setDataSources]
  );

  // Update data source
  const updateDataSource = useCallback(
    (id: string, updates: Partial<Omit<DataSource, 'id' | 'createdAt'>>) => {
      setDataSources((prev) =>
        prev.map((ds) =>
          ds.id === id
            ? { ...ds, ...updates, updatedAt: getTimestamp() }
            : ds
        )
      );
    },
    [setDataSources]
  );

  // Delete data source
  const deleteDataSource = useCallback(
    (id: string) => {
      setDataSources((prev) => prev.filter((ds) => ds.id !== id));
    },
    [setDataSources]
  );

  // Duplicate data source
  const duplicateDataSource = useCallback(
    (id: string): DataSource | null => {
      const original = dataSources.find((ds) => ds.id === id);
      if (!original) return null;

      const now = getTimestamp();
      const newDataSource: DataSource = {
        ...original,
        id: `ds-${generateId()}`,
        name: `${original.name} (Copy)`,
        createdAt: now,
        updatedAt: now,
      };

      setDataSources((prev) => [...prev, newDataSource]);
      return newDataSource;
    },
    [dataSources, setDataSources]
  );

  // Get data source by ID
  const getDataSource = useCallback(
    (id: string): DataSource | undefined => {
      return dataSources.find((ds) => ds.id === id);
    },
    [dataSources]
  );

  // Add column mapping to data source
  const addColumnMapping = useCallback(
    (dataSourceId: string, mapping: ColumnMapping) => {
      setDataSources((prev) =>
        prev.map((ds) =>
          ds.id === dataSourceId
            ? {
                ...ds,
                columnMappings: [...ds.columnMappings, mapping],
                updatedAt: getTimestamp(),
              }
            : ds
        )
      );
    },
    [setDataSources]
  );

  // Update column mapping
  const updateColumnMapping = useCallback(
    (dataSourceId: string, sourceColumn: string, updates: Partial<ColumnMapping>) => {
      setDataSources((prev) =>
        prev.map((ds) =>
          ds.id === dataSourceId
            ? {
                ...ds,
                columnMappings: ds.columnMappings.map((mapping) =>
                  mapping.sourceColumn === sourceColumn
                    ? { ...mapping, ...updates }
                    : mapping
                ),
                updatedAt: getTimestamp(),
              }
            : ds
        )
      );
    },
    [setDataSources]
  );

  // Remove column mapping
  const removeColumnMapping = useCallback(
    (dataSourceId: string, sourceColumn: string) => {
      setDataSources((prev) =>
        prev.map((ds) =>
          ds.id === dataSourceId
            ? {
                ...ds,
                columnMappings: ds.columnMappings.filter(
                  (m) => m.sourceColumn !== sourceColumn
                ),
                updatedAt: getTimestamp(),
              }
            : ds
        )
      );
    },
    [setDataSources]
  );

  // Get friendly name for a column
  const getFriendlyColumnName = useCallback(
    (dataSourceId: string, sourceColumn: string): string => {
      const ds = dataSources.find((d) => d.id === dataSourceId);
      const mapping = ds?.columnMappings.find((m) => m.sourceColumn === sourceColumn);
      return mapping?.friendlyName ?? sourceColumn;
    },
    [dataSources]
  );

  // Get source column from friendly name
  const getSourceColumn = useCallback(
    (dataSourceId: string, friendlyName: string): string => {
      const ds = dataSources.find((d) => d.id === dataSourceId);
      const mapping = ds?.columnMappings.find((m) => m.friendlyName === friendlyName);
      return mapping?.sourceColumn ?? friendlyName;
    },
    [dataSources]
  );

  // Reset to mock data
  const resetToDefaults = useCallback(() => {
    setDataSources(MOCK_DATA_SOURCES);
  }, [setDataSources]);

  return {
    // State
    dataSources,

    // CRUD actions
    createDataSource,
    updateDataSource,
    deleteDataSource,
    duplicateDataSource,
    getDataSource,

    // Column mapping actions
    addColumnMapping,
    updateColumnMapping,
    removeColumnMapping,

    // Utility
    getFriendlyColumnName,
    getSourceColumn,
    resetToDefaults,
  };
}
