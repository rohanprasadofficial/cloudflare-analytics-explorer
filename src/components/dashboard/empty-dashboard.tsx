import { HugeiconsIcon } from '@hugeicons/react';
import { ChartLineData01Icon, Add01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';

interface EmptyDashboardProps {
  onAddTile: () => void;
}

export function EmptyDashboard({ onAddTile }: EmptyDashboardProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-12 text-center">
      <div className="mb-6 rounded-full bg-muted p-6">
        <HugeiconsIcon
          icon={ChartLineData01Icon}
          size={48}
          strokeWidth={1.5}
          className="text-muted-foreground"
        />
      </div>

      <h3 className="mb-2 text-lg font-semibold">No tiles yet</h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">
        Start building your dashboard by adding tiles. Each tile can display
        charts, tables, or statistics from your data sources.
      </p>

      <Button onClick={onAddTile}>
        <HugeiconsIcon icon={Add01Icon} size={16} strokeWidth={2} />
        <span>Add Your First Tile</span>
      </Button>

      <div className="mt-12 grid max-w-2xl grid-cols-3 gap-6 text-left">
        <div className="space-y-2">
          <div className="text-sm font-medium">Charts</div>
          <p className="text-xs text-muted-foreground">
            Area, bar, line, pie, and scatter charts to visualize trends and
            distributions.
          </p>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium">Tables</div>
          <p className="text-xs text-muted-foreground">
            Data tables with sorting and filtering for detailed exploration.
          </p>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium">Stats</div>
          <p className="text-xs text-muted-foreground">
            Single value displays with comparisons to highlight key metrics.
          </p>
        </div>
      </div>
    </div>
  );
}
