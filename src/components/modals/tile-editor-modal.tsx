import { useState, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ChartLineData01Icon,
  ChartHistogramIcon,
  ChartLineData02Icon,
  PieChartIcon,
  ChartScatterIcon,
  Table01Icon,
  Analytics01Icon,
} from '@hugeicons/core-free-icons';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { TILE_SIZE_PRESETS, getRecommendedSize, type TileSizePreset } from '@/components/dashboard/dashboard-grid';
import type { Tile, DataSource, ChartType, ChartConfig, TilePosition, StatCardConfig } from '@/types/dashboard';

interface TileEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tile: Omit<Tile, 'id' | 'createdAt' | 'updatedAt'>) => void;
  tile?: Tile | null;
  dataSources: DataSource[];
  mode: 'create' | 'edit';
}

const CHART_TYPES: { type: ChartType; label: string; icon: typeof ChartLineData01Icon; description: string }[] = [
  { type: 'area', label: 'Area', icon: ChartLineData01Icon, description: 'Stacked area chart' },
  { type: 'bar', label: 'Bar', icon: ChartHistogramIcon, description: 'Vertical bar chart' },
  { type: 'line', label: 'Line', icon: ChartLineData02Icon, description: 'Line chart with points' },
  { type: 'pie', label: 'Pie', icon: PieChartIcon, description: 'Pie or donut chart' },
  { type: 'scatter', label: 'Scatter', icon: ChartScatterIcon, description: 'XY scatter plot' },
  { type: 'table', label: 'Table', icon: Table01Icon, description: 'Data table view' },
  { type: 'stat', label: 'Stat', icon: Analytics01Icon, description: 'Single value display' },
];

const SIZE_PRESET_INFO: { preset: TileSizePreset; label: string; description: string }[] = [
  { preset: 'small', label: 'Small', description: '1×1 - Single stat' },
  { preset: 'medium', label: 'Medium', description: '2×2 - Standard chart' },
  { preset: 'wide', label: 'Wide', description: '3×2 - Wide chart' },
  { preset: 'tall', label: 'Tall', description: '2×3 - Tall chart' },
  { preset: 'full', label: 'Full Width', description: '4×2 - Full width' },
  { preset: 'large', label: 'Large', description: '3×3 - Large chart' },
];

const DEFAULT_POSITION: TilePosition = { x: 0, y: 0, width: 2, height: 2 };

// Default stat config used for initialization
const _DEFAULT_STAT_CONFIG: StatCardConfig = {
  valueKey: 'value',
  label: 'Value',
  format: 'number',
};
void _DEFAULT_STAT_CONFIG; // suppress unused warning

export function TileEditorModal({
  isOpen,
  onClose,
  onSave,
  tile,
  dataSources,
  mode,
}: TileEditorModalProps) {
  const [title, setTitle] = useState('');
  const [dataSourceId, setDataSourceId] = useState('');
  const [query, setQuery] = useState('');
  const [chartType, setChartType] = useState<ChartType>('area');
  const [position, setPosition] = useState<TilePosition>(DEFAULT_POSITION);
  const [sizePreset, setSizePreset] = useState<TileSizePreset>('medium');
  const [showLegend, setShowLegend] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  // Stat card specific
  const [statValueKey, setStatValueKey] = useState('');
  const [statLabel, setStatLabel] = useState('');
  const [statFormat, setStatFormat] = useState<'number' | 'currency' | 'percent'>('number');

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (tile) {
        setTitle(tile.title);
        setDataSourceId(tile.dataSourceId);
        setQuery(tile.query);
        setChartType(tile.chartConfig.type);
        setPosition(tile.position);
        // Find matching preset or default to medium
        const matchingPreset = (Object.entries(TILE_SIZE_PRESETS) as [TileSizePreset, { width: number; height: number }][])
          .find(([, size]) => size.width === tile.position.width && size.height === tile.position.height)?.[0] || 'medium';
        setSizePreset(matchingPreset);
        setShowLegend(tile.chartConfig.showLegend ?? true);
        setShowGrid(tile.chartConfig.showGrid ?? true);
        if (tile.chartConfig.statConfig) {
          setStatValueKey(tile.chartConfig.statConfig.valueKey);
          setStatLabel(tile.chartConfig.statConfig.label || '');
          setStatFormat(tile.chartConfig.statConfig.format || 'number');
        }
      } else {
        setTitle('');
        setDataSourceId(dataSources[0]?.id || '');
        setQuery('SELECT date, views, visitors FROM analytics GROUP BY date');
        setChartType('area');
        setPosition(DEFAULT_POSITION);
        setSizePreset('medium');
        setShowLegend(true);
        setShowGrid(true);
        setStatValueKey('');
        setStatLabel('');
        setStatFormat('number');
      }
    }
  }, [isOpen, tile, dataSources]);

  // Handle chart type change and suggest size
  const handleChartTypeChange = (type: ChartType) => {
    setChartType(type);
    // Auto-suggest recommended size for the chart type
    const recommended = getRecommendedSize(type);
    setSizePreset(recommended);
    setPosition({ ...position, ...TILE_SIZE_PRESETS[recommended] });
  };

  // Handle size preset change
  const handleSizePresetChange = (preset: TileSizePreset) => {
    setSizePreset(preset);
    setPosition({ ...position, ...TILE_SIZE_PRESETS[preset] });
  };

  const handleSave = () => {
    if (!title.trim() || !dataSourceId || !query.trim()) return;

    const chartConfig: ChartConfig = {
      type: chartType,
      showLegend,
      showGrid,
    };

    if (chartType === 'stat') {
      chartConfig.statConfig = {
        valueKey: statValueKey || 'value',
        label: statLabel || title,
        format: statFormat,
      };
    }

    onSave({
      title: title.trim(),
      dataSourceId,
      query: query.trim(),
      chartConfig,
      position,
    });
    onClose();
  };

  const selectedDataSource = dataSources.find((ds) => ds.id === dataSourceId);

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="max-h-[90vh] overflow-auto sm:max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {mode === 'create' ? 'Add Tile' : 'Edit Tile'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Configure your visualization tile with data source and chart settings.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="tile-title">Title</FieldLabel>
              <Input
                id="tile-title"
                placeholder="Traffic Overview"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="tile-datasource">Data Source</FieldLabel>
              <Select value={dataSourceId} onValueChange={(v) => v && setDataSourceId(v)}>
                <SelectTrigger id="tile-datasource">
                  <SelectValue>{dataSources.find(ds => ds.id === dataSourceId)?.name || 'Select data source'}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {dataSources.map((ds) => (
                    <SelectItem key={ds.id} value={ds.id}>
                      {ds.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          {/* Query */}
          <Field>
            <FieldLabel htmlFor="tile-query">SQL Query</FieldLabel>
            <Textarea
              id="tile-query"
              placeholder="SELECT date, views, visitors FROM analytics GROUP BY date"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={4}
              className="font-mono text-sm"
            />
            {selectedDataSource && (
              <FieldDescription>
                Available columns: {selectedDataSource.columnMappings.map((m) => m.friendlyName).join(', ')}
              </FieldDescription>
            )}
          </Field>

          {/* Chart Type */}
          <div>
            <label className="mb-2 block text-sm font-medium">Chart Type</label>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
              {CHART_TYPES.map(({ type, label, icon, description }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleChartTypeChange(type)}
                  className={cn(
                    'flex flex-col items-center gap-1 rounded border p-3 text-center transition-colors',
                    chartType === type
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'hover:bg-muted/50'
                  )}
                  title={description}
                >
                  <HugeiconsIcon icon={icon} size={20} strokeWidth={2} />
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stat Card Config */}
          {chartType === 'stat' && (
            <div className="rounded border bg-muted/30 p-4">
              <h4 className="mb-3 text-sm font-medium">Stat Card Settings</h4>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field>
                  <FieldLabel htmlFor="stat-value">Value Key</FieldLabel>
                  <Input
                    id="stat-value"
                    placeholder="totalViews"
                    value={statValueKey}
                    onChange={(e) => setStatValueKey(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="stat-label">Label</FieldLabel>
                  <Input
                    id="stat-label"
                    placeholder="Total Views"
                    value={statLabel}
                    onChange={(e) => setStatLabel(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="stat-format">Format</FieldLabel>
                  <Select value={statFormat} onValueChange={(v) => v && setStatFormat(v as typeof statFormat)}>
                    <SelectTrigger id="stat-format">
                      <SelectValue>{statFormat}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="currency">Currency</SelectItem>
                      <SelectItem value="percent">Percent</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </div>
          )}

          {/* Chart Options */}
          {chartType !== 'stat' && chartType !== 'table' && (
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showLegend}
                  onChange={(e) => setShowLegend(e.target.checked)}
                  className="rounded border"
                />
                <span className="text-sm">Show Legend</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showGrid}
                  onChange={(e) => setShowGrid(e.target.checked)}
                  className="rounded border"
                />
                <span className="text-sm">Show Grid</span>
              </label>
            </div>
          )}

          {/* Size Presets */}
          <div>
            <label className="mb-2 block text-sm font-medium">Size</label>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {SIZE_PRESET_INFO.map(({ preset, label, description }) => {
                const size = TILE_SIZE_PRESETS[preset];
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleSizePresetChange(preset)}
                    className={cn(
                      'flex flex-col items-center gap-2 rounded border p-3 transition-colors',
                      sizePreset === preset
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'hover:bg-muted/50'
                    )}
                    title={description}
                  >
                    {/* Visual size representation */}
                    <div className="grid h-8 w-12 grid-cols-4 gap-0.5">
                      {Array.from({ length: 4 * 3 }).map((_, i) => {
                        const col = i % 4;
                        const row = Math.floor(i / 4);
                        const isActive = col < size.width && row < size.height;
                        return (
                          <div
                            key={i}
                            className={cn(
                              'rounded-sm',
                              isActive
                                ? sizePreset === preset
                                  ? 'bg-primary'
                                  : 'bg-muted-foreground/40'
                                : 'bg-muted/50'
                            )}
                          />
                        );
                      })}
                    </div>
                    <span className="text-xs">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSave}
            disabled={!title.trim() || !dataSourceId || !query.trim()}
          >
            {mode === 'create' ? 'Add Tile' : 'Save Changes'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
