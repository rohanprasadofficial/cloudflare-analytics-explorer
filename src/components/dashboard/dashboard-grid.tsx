import { useMemo, useCallback } from 'react';
import {
  ResponsiveGridLayout,
  useContainerWidth,
  type LayoutItem,
  type Layout,
} from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import type { Tile, TilePosition } from '@/types/dashboard';

interface DashboardGridProps {
  tiles: Tile[];
  gridColumns: number;
  renderTile: (tile: Tile) => React.ReactNode;
  onLayoutChange?: (tileId: string, position: TilePosition) => void;
  isEditable?: boolean;
}

// Convert tile positions to react-grid-layout format
function tilesToLayout(tiles: Tile[]): Layout {
  return tiles.map((tile) => ({
    i: tile.id,
    x: tile.position.x,
    y: tile.position.y,
    w: tile.position.width,
    h: tile.position.height,
    minW: 1,
    minH: 1,
    maxW: 4,
    maxH: 4,
  }));
}

// Predefined sizes for different chart types
export const TILE_SIZE_PRESETS = {
  small: { width: 1, height: 1 },      // Single stat
  medium: { width: 2, height: 2 },     // Standard chart
  wide: { width: 3, height: 2 },       // Wide chart
  tall: { width: 2, height: 3 },       // Tall chart
  full: { width: 4, height: 2 },       // Full width
  large: { width: 3, height: 3 },      // Large chart
} as const;

export type TileSizePreset = keyof typeof TILE_SIZE_PRESETS;

// Get recommended size preset for chart type
export function getRecommendedSize(chartType: string): TileSizePreset {
  switch (chartType) {
    case 'stat':
      return 'small';
    case 'table':
      return 'wide';
    case 'pie':
      return 'medium';
    case 'scatter':
      return 'large';
    default:
      return 'medium';
  }
}

export function DashboardGrid({
  tiles,
  gridColumns,
  renderTile,
  onLayoutChange,
  isEditable = true,
}: DashboardGridProps) {
  const { width, containerRef, mounted } = useContainerWidth();
  const layout = useMemo(() => tilesToLayout(tiles), [tiles]);

  // Define responsive breakpoints
  const breakpoints = useMemo(
    () => ({ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }),
    []
  );

  const cols = useMemo(
    () => ({
      lg: gridColumns,
      md: Math.max(gridColumns - 1, 2),
      sm: 2,
      xs: 1,
      xxs: 1,
    }),
    [gridColumns]
  );

  // Create layouts for all breakpoints
  const layouts = useMemo(
    () => ({
      lg: layout,
      md: layout,
      sm: layout.map((l) => ({ ...l, w: Math.min(l.w, 2), x: l.x % 2 })),
      xs: layout.map((l) => ({ ...l, w: 1, x: 0 })),
      xxs: layout.map((l) => ({ ...l, w: 1, x: 0 })),
    }),
    [layout]
  );

  // Only update on drag/resize stop to avoid rapid state updates that cause crashes
  const handleDragStop = useCallback(
    (_layout: Layout, _oldItem: LayoutItem | null, newItem: LayoutItem | null) => {
      if (!onLayoutChange || !newItem) return;

      const originalTile = tiles.find((t) => t.id === newItem.i);
      if (!originalTile) return;

      const posChanged =
        originalTile.position.x !== newItem.x ||
        originalTile.position.y !== newItem.y ||
        originalTile.position.width !== newItem.w ||
        originalTile.position.height !== newItem.h;

      if (posChanged) {
        onLayoutChange(newItem.i, {
          x: newItem.x,
          y: newItem.y,
          width: newItem.w,
          height: newItem.h,
        });
      }
    },
    [onLayoutChange, tiles]
  );

  const handleResizeStop = useCallback(
    (_layout: Layout, _oldItem: LayoutItem | null, newItem: LayoutItem | null) => {
      if (!onLayoutChange || !newItem) return;

      const originalTile = tiles.find((t) => t.id === newItem.i);
      if (!originalTile) return;

      onLayoutChange(newItem.i, {
        x: newItem.x,
        y: newItem.y,
        width: newItem.w,
        height: newItem.h,
      });
    },
    [onLayoutChange, tiles]
  );

  if (tiles.length === 0) {
    return null;
  }

  return (
    <div ref={containerRef} className="p-4">
      {mounted && (
        <ResponsiveGridLayout
          className="layout"
          width={width}
          layouts={layouts}
          breakpoints={breakpoints}
          cols={cols}
          rowHeight={180}
          margin={[16, 16]}
          containerPadding={[0, 0]}
          dragConfig={{ enabled: isEditable, handle: '.tile-drag-handle' }}
          resizeConfig={{ enabled: isEditable, handles: ['se', 'sw', 'ne', 'nw'] }}
          onDragStop={handleDragStop}
          onResizeStop={handleResizeStop}
          compactor={undefined}
        >
          {tiles.map((tile) => (
            <div key={tile.id} className="h-full">
              {renderTile(tile)}
            </div>
          ))}
        </ResponsiveGridLayout>
      )}
    </div>
  );
}
