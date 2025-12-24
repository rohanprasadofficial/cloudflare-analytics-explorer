import { cn } from '@/lib/utils';
import type { Tile, TilePosition } from '@/types/dashboard';

interface DashboardGridProps {
  tiles: Tile[];
  gridColumns: number;
  renderTile: (tile: Tile) => React.ReactNode;
  onTileClick?: (tileId: string) => void;
}

// Calculate row span based on tile positions
function calculateGridRows(tiles: Tile[]): number {
  if (tiles.length === 0) return 1;
  return Math.max(...tiles.map((t) => t.position.y + t.position.height));
}

// Convert position to grid CSS
function getGridStyle(position: TilePosition, gridColumns: number) {
  return {
    gridColumn: `${position.x + 1} / span ${Math.min(position.width, gridColumns - position.x)}`,
    gridRow: `${position.y + 1} / span ${position.height}`,
  };
}

export function DashboardGrid({
  tiles,
  gridColumns,
  renderTile,
  onTileClick,
}: DashboardGridProps) {
  const gridRows = calculateGridRows(tiles);

  return (
    <div
      className={cn(
        'grid gap-4 p-6',
        gridColumns === 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        gridColumns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        gridColumns === 2 && 'grid-cols-1 sm:grid-cols-2'
      )}
      style={{
        gridTemplateRows: `repeat(${gridRows}, minmax(200px, auto))`,
      }}
    >
      {tiles.map((tile) => (
        <div
          key={tile.id}
          style={getGridStyle(tile.position, gridColumns)}
          className="min-h-[200px]"
          onClick={() => onTileClick?.(tile.id)}
        >
          {renderTile(tile)}
        </div>
      ))}
    </div>
  );
}
