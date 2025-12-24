import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface QueryBuilderProps {
  onQueryExecute: (sql: string) => void
  isLoading?: boolean
}

const EXAMPLE_QUERIES = [
  {
    name: "Page views by day",
    sql: `SELECT
  toDate(timestamp) as date,
  count() as views
FROM default
GROUP BY date
ORDER BY date DESC
LIMIT 30`
  },
  {
    name: "Top pages",
    sql: `SELECT
  blob1 as path,
  count() as views
FROM default
GROUP BY path
ORDER BY views DESC
LIMIT 10`
  },
  {
    name: "Views by hour",
    sql: `SELECT
  toHour(timestamp) as hour,
  count() as views
FROM default
GROUP BY hour
ORDER BY hour`
  }
]

export function QueryBuilder({ onQueryExecute, isLoading }: QueryBuilderProps) {
  const [sql, setSql] = useState(EXAMPLE_QUERIES[0].sql)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onQueryExecute(sql)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>SQL Query</CardTitle>
        <CardDescription>
          Write Analytics Engine SQL queries to visualize your data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_QUERIES.map((example) => (
              <Button
                key={example.name}
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setSql(example.sql)}
              >
                {example.name}
              </Button>
            ))}
          </div>

          <Textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            placeholder="SELECT ... FROM your_dataset"
            className="font-mono min-h-[200px]"
          />

          <Button type="submit" disabled={isLoading || !sql.trim()}>
            {isLoading ? "Running..." : "Run Query"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
