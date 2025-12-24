import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Add01Icon, Search01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataSourceItem } from './data-source-item';
import type { DataSource } from '@/types/dashboard';

interface DataSourceListProps {
  dataSources: DataSource[];
  selectedId?: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export function DataSourceList({
  dataSources,
  selectedId,
  onSelect,
  onCreate,
  onEdit,
  onDelete,
  onDuplicate,
}: DataSourceListProps) {
  const [search, setSearch] = useState('');

  const filteredSources = dataSources.filter((ds) =>
    ds.name.toLowerCase().includes(search.toLowerCase()) ||
    ds.endpoint.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold">Data Sources</h2>
          <p className="text-sm text-muted-foreground">
            Configure connections to your Analytics Engine datasets
          </p>
        </div>
        <Button onClick={onCreate}>
          <HugeiconsIcon icon={Add01Icon} size={16} strokeWidth={2} />
          <span>New Data Source</span>
        </Button>
      </div>

      {/* Search */}
      <div className="border-b px-6 py-3">
        <div className="relative">
          <HugeiconsIcon
            icon={Search01Icon}
            size={16}
            strokeWidth={2}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search data sources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-auto p-6">
        {filteredSources.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-sm text-muted-foreground">
              {search ? 'No data sources match your search' : 'No data sources configured yet'}
            </p>
            {!search && (
              <Button variant="outline" className="mt-4" onClick={onCreate}>
                <HugeiconsIcon icon={Add01Icon} size={14} strokeWidth={2} />
                <span>Create your first data source</span>
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSources.map((ds) => (
              <DataSourceItem
                key={ds.id}
                dataSource={ds}
                isSelected={ds.id === selectedId}
                onClick={() => onSelect(ds.id)}
                onEdit={() => onEdit(ds.id)}
                onDelete={() => onDelete(ds.id)}
                onDuplicate={() => onDuplicate(ds.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
