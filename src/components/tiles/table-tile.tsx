import { cn } from '@/lib/utils';

interface TableTileProps {
  data: Record<string, unknown>[];
  className?: string;
}

function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '-';
  }
  if (typeof value === 'number') {
    return value.toLocaleString();
  }
  return String(value);
}

export function TableTile({ data, className }: TableTileProps) {
  if (!data || data.length === 0) {
    return (
      <div className={cn('flex h-full items-center justify-center text-sm text-muted-foreground', className)}>
        No data available
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div className={cn('h-full overflow-auto', className)}>
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-card">
          <tr className="border-b">
            {columns.map((col) => (
              <th
                key={col}
                className="px-3 py-2 text-left text-xs font-medium text-muted-foreground"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
              {columns.map((col) => (
                <td key={col} className="px-3 py-2">
                  {formatCellValue(row[col])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
