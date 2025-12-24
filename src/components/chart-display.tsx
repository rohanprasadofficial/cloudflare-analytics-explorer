import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export type ChartType = "area" | "bar"

interface ChartDisplayProps {
  data: Record<string, unknown>[]
  title?: string
  description?: string
  chartType?: ChartType
  onChartTypeChange?: (type: ChartType) => void
}

function getChartConfig(data: Record<string, unknown>[]): {
  config: ChartConfig
  xKey: string
  valueKeys: string[]
} {
  if (!data.length) {
    return { config: {}, xKey: "", valueKeys: [] }
  }

  const keys = Object.keys(data[0])
  // First key is usually the x-axis (date, time, category)
  const xKey = keys[0]
  // Remaining numeric keys are values to chart
  const valueKeys = keys.slice(1).filter((key) => {
    const val = data[0][key]
    return typeof val === "number"
  })

  const colors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ]

  const config: ChartConfig = {}
  valueKeys.forEach((key, i) => {
    config[key] = {
      label: key.charAt(0).toUpperCase() + key.slice(1),
      color: colors[i % colors.length],
    }
  })

  return { config, xKey, valueKeys }
}

export function ChartDisplay({
  data,
  title = "Query Results",
  description,
  chartType = "area",
  onChartTypeChange,
}: ChartDisplayProps) {
  const { config, xKey, valueKeys } = getChartConfig(data)

  if (!data.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Run a query to see results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center text-muted-foreground">
            No data to display
          </div>
        </CardContent>
      </Card>
    )
  }

  const formatXAxis = (value: string) => {
    // Try to format as date if it looks like one
    if (value && value.match(/^\d{4}-\d{2}-\d{2}/)) {
      return new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    }
    return value
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {onChartTypeChange && (
          <div className="flex gap-1">
            <Button
              variant={chartType === "area" ? "default" : "secondary"}
              size="sm"
              onClick={() => onChartTypeChange("area")}
            >
              Area
            </Button>
            <Button
              variant={chartType === "bar" ? "default" : "secondary"}
              size="sm"
              onClick={() => onChartTypeChange("bar")}
            >
              Bar
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[300px] w-full">
          {chartType === "area" ? (
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey={xKey}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatXAxis}
                tickMargin={8}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              {valueKeys.map((key) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  fill={`var(--color-${key})`}
                  stroke={`var(--color-${key})`}
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey={xKey}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatXAxis}
                tickMargin={8}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              {valueKeys.map((key) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={`var(--color-${key})`}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
