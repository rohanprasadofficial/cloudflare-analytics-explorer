import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TileHeader } from './tile-header';
import { ChartTile } from './chart-tile';
import { TableTile } from './table-tile';
import { StatCardTile } from './stat-card-tile';
import { executeMockQuery } from '@/data/mock-query-results';
import { cn } from '@/lib/utils';
import type { Tile, DataSource, FilterValues } from '@/types/dashboard';

interface TileContainerProps {
  tile: Tile;
  dataSource?: DataSource; // Reserved for future use with real data fetching
  filterValues: FilterValues;
  onEdit: () => void;
  onDelete: () => void;
}

export function TileContainer({
  tile,
  dataSource: _dataSource,
  filterValues,
  onEdit,
  onDelete,
}: TileContainerProps) {
  void _dataSource; // Reserved for future backend integration
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 500));

        // Substitute filter values in query (mock implementation)
        let query = tile.query;
        Object.entries(filterValues).forEach(([param, value]) => {
          const placeholder = `\${${param}}`;
          if (Array.isArray(value)) {
            query = query.replace(placeholder, `'${value[0]}' AND '${value[1]}'`);
          } else {
            query = query.replace(placeholder, `'${value}'`);
          }
        });

        // Execute mock query
        const result = executeMockQuery(query, tile.dataSourceId);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [tile.query, tile.dataSourceId, filterValues]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      const result = executeMockQuery(tile.query, tile.dataSourceId);
      setData(result);
      setIsLoading(false);
    }, 500);
  };

  const renderContent = () => {
    if (error) {
      return (
        <div className="flex h-full items-center justify-center p-4 text-sm text-destructive">
          {error}
        </div>
      );
    }

    switch (tile.chartConfig.type) {
      case 'stat':
        return (
          <StatCardTile
            config={tile.chartConfig.statConfig!}
            data={data}
          />
        );
      case 'table':
        return <TableTile data={data} />;
      default:
        return (
          <ChartTile
            config={tile.chartConfig}
            data={data}
          />
        );
    }
  };

  return (
    <Card className={cn('group flex h-full flex-col overflow-hidden')}>
      <TileHeader
        title={tile.title}
        isLoading={isLoading}
        onEdit={onEdit}
        onDelete={onDelete}
        onRefresh={handleRefresh}
      />
      <CardContent className="flex-1 p-0">
        {renderContent()}
      </CardContent>
    </Card>
  );
}
