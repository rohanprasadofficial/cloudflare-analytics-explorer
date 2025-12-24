import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { ColumnMappingEditor } from '@/components/data-sources/column-mapping-editor';
import type { DataSource, ColumnMapping } from '@/types/dashboard';

interface DataSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, endpoint: string, mappings: ColumnMapping[]) => void;
  dataSource?: DataSource | null;
  mode: 'create' | 'edit';
}

export function DataSourceModal({
  isOpen,
  onClose,
  onSave,
  dataSource,
  mode,
}: DataSourceModalProps) {
  const [name, setName] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [mappings, setMappings] = useState<ColumnMapping[]>([]);

  // Reset form when modal opens/closes or dataSource changes
  useEffect(() => {
    if (isOpen) {
      if (dataSource) {
        setName(dataSource.name);
        setEndpoint(dataSource.endpoint);
        setMappings(dataSource.columnMappings);
      } else {
        setName('');
        setEndpoint('');
        setMappings([]);
      }
    }
  }, [isOpen, dataSource]);

  const handleSave = () => {
    if (name.trim() && endpoint.trim()) {
      onSave(name.trim(), endpoint.trim(), mappings);
      onClose();
    }
  };

  const handleClose = () => {
    setName('');
    setEndpoint('');
    setMappings([]);
    onClose();
  };

  const isValid = name.trim() !== '' && endpoint.trim() !== '';

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <AlertDialogContent className="max-h-[90vh] overflow-auto sm:max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {mode === 'create' ? 'New Data Source' : 'Edit Data Source'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Configure a connection to your Cloudflare Analytics Engine dataset and
            map column names.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-6 py-4">
          <Field>
            <FieldLabel htmlFor="ds-name">Name</FieldLabel>
            <Input
              id="ds-name"
              placeholder="Web Analytics"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <FieldDescription>
              A friendly name to identify this data source
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="ds-endpoint">Endpoint</FieldLabel>
            <Input
              id="ds-endpoint"
              placeholder="/api/analytics"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
            />
            <FieldDescription>
              The API endpoint for querying this dataset
            </FieldDescription>
          </Field>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Column Mappings
            </label>
            <p className="mb-3 text-xs text-muted-foreground">
              Map Analytics Engine columns (blob1, double1, etc.) to friendly names
            </p>
            <ColumnMappingEditor mappings={mappings} onChange={setMappings} />
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSave} disabled={!isValid}>
            {mode === 'create' ? 'Create' : 'Save Changes'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
