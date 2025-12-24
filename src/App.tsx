import { useState } from "react"
import { QueryBuilder } from "@/components/query-builder"
import { ChartDisplay, type ChartType } from "@/components/chart-display"
import { DataTable } from "@/components/data-table"

// Mock data for demo - will be replaced with actual API calls
const MOCK_DATA = [
  { date: "2024-12-19", views: 1250, visitors: 890 },
  { date: "2024-12-20", views: 1480, visitors: 1020 },
  { date: "2024-12-21", views: 980, visitors: 720 },
  { date: "2024-12-22", views: 1120, visitors: 840 },
  { date: "2024-12-23", views: 1890, visitors: 1340 },
  { date: "2024-12-24", views: 2100, visitors: 1580 },
  { date: "2024-12-25", views: 1650, visitors: 1200 },
]

export function App() {
  const [queryResult, setQueryResult] = useState<Record<string, unknown>[]>(MOCK_DATA)
  const [isLoading, setIsLoading] = useState(false)
  const [chartType, setChartType] = useState<ChartType>("area")
  const [error, setError] = useState<string | null>(null)

  const handleQueryExecute = async (sql: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql }),
      })

      if (!response.ok) {
        throw new Error(`Query failed: ${response.statusText}`)
      }

      const result = await response.json()

      // For now, use mock data since AE isn't connected yet
      // In production: setQueryResult(result.rows || result)
      console.log("Query result:", result)
      setQueryResult(MOCK_DATA)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Query failed")
      // Still show mock data for demo
      setQueryResult(MOCK_DATA)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-14 items-center px-4">
          <h1 className="text-lg font-semibold">Visual AE</h1>
          <span className="ml-2 text-sm text-muted-foreground">
            Analytics Engine Dashboard
          </span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="lg:col-span-1">
            <QueryBuilder
              onQueryExecute={handleQueryExecute}
              isLoading={isLoading}
            />
          </div>

          <div className="lg:col-span-1">
            <ChartDisplay
              data={queryResult}
              title="Query Results"
              description={error ? `Error: ${error}` : undefined}
              chartType={chartType}
              onChartTypeChange={setChartType}
            />
          </div>

          <div className="lg:col-span-2">
            <DataTable data={queryResult} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App