import { Hono } from "hono";

// Environment bindings - add Analytics Engine binding here when ready
interface AppEnv {
  // AE: AnalyticsEngineDataset;
}

const app = new Hono<{ Bindings: AppEnv }>();

app.get("/api/health", (c) => c.json({ status: "ok" }));

// Analytics Engine query endpoint
app.post("/api/query", async (c) => {
  const { sql } = await c.req.json<{ sql: string }>();

  // TODO: Add AE binding and execute query
  // const result = await c.env.AE.query(sql);

  return c.json({
    message: "Query endpoint ready",
    sql
  });
});

// List available datasets
app.get("/api/datasets", async (c) => {
  // TODO: Implement dataset listing from AE
  return c.json({
    datasets: [
      { id: "default", name: "Default Dataset" }
    ]
  });
});

export default app;
