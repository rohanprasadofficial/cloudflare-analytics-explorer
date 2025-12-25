# Cloudflare Analytics Explorer

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rohanprasadofficial/visual-ae-cloudflare)

A visual dashboard builder for exploring and visualizing data from [Cloudflare Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/). Build custom dashboards with charts, tables, and stat cards using SQL queries against your Analytics Engine datasets.

<img width="1323" height="640" alt="image" src="https://github.com/user-attachments/assets/fa827cbb-b3dc-499c-af1f-05e239b62f88" />


## Features

- **Dashboard Builder** - Create multiple dashboards with drag-and-drop tile layouts
- **Multiple Visualization Types** - Line charts, bar charts, area charts, pie charts, scatter plots, tables, and stat cards
- **SQL Query Editor** - Write custom SQL queries with syntax highlighting and reference documentation
- **Data Source Management** - Configure and manage multiple Analytics Engine datasets
- **Dynamic Filters** - Add time range, text, and dropdown filters to dashboards
- **Column Mapping** - Map dataset columns to meaningful names for visualization
- **Local Storage Persistence** - Dashboards and data sources are saved locally in your browser
- **Built-in Documentation** - Reference guide for Analytics Engine SQL syntax

## Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React 19, TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui |
| Charts | Recharts |
| Backend | Hono (on Cloudflare Workers) |
| Build | Vite 7 |
| Deployment | Cloudflare Workers |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) package manager
- A [Cloudflare account](https://dash.cloudflare.com/) with Analytics Engine enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/rohanprasadofficial/visual-ae-cloudflare.git cloudflare-analytics-explorer
cd cloudflare-analytics-explorer

# Install dependencies
pnpm install
```

### Configuration

1. Copy the example environment file:
   ```bash
   cp .dev.vars.example .dev.vars
   ```

2. Fill in your Cloudflare credentials in `.dev.vars`:
   ```env
   # Your Cloudflare Account ID
   # Find at: https://dash.cloudflare.com -> Select account -> Account ID in sidebar
   CF_ACCOUNT_ID=your_account_id_here

   # Your Cloudflare API Token
   # Create at: https://dash.cloudflare.com/profile/api-tokens
   # Required permissions:
   #   - Account > Analytics > Read
   #   - Account > Analytics Engine > Read
   CF_API_TOKEN=your_api_token_here
   ```

### Development

```bash
# Start the development server
pnpm dev
```

The app will be available at `http://localhost:5173`

### Build & Preview

```bash
# Build for production
pnpm build

# Preview the production build locally
pnpm preview
```

## Deployment

### Deploy to Cloudflare Workers

1. **One-click deploy**: Click the "Deploy to Cloudflare" button above

2. **Manual deployment**:
   ```bash
   # Login to Cloudflare (if not already)
   npx wrangler login

   # Deploy
   pnpm deploy
   ```

3. **Set environment variables** in the Cloudflare dashboard:
   - Go to Workers & Pages > your-worker > Settings > Variables
   - Add `CF_ACCOUNT_ID` and `CF_API_TOKEN` as secrets

## Project Structure

```
cloudflare-analytics-explorer/
├── src/
│   ├── components/
│   │   ├── charts/          # Chart components (line, bar, area, pie, scatter)
│   │   ├── dashboard/       # Dashboard grid and view components
│   │   ├── data-sources/    # Data source management UI
│   │   ├── editors/         # SQL editor component
│   │   ├── filters/         # Filter components (time range, text, dropdown)
│   │   ├── landing/         # Landing page
│   │   ├── layout/          # App layout and sidebar
│   │   ├── modals/          # Modal dialogs
│   │   ├── tiles/           # Dashboard tile components
│   │   ├── ui/              # Base UI components (shadcn)
│   │   └── wiki/            # Built-in documentation
│   ├── data/                # Mock data for development
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and API client
│   ├── types/               # TypeScript type definitions
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Entry point
├── worker/
│   └── index.ts             # Cloudflare Worker API (Hono)
├── public/                  # Static assets
├── wrangler.json            # Cloudflare Workers configuration
└── package.json
```

## API Endpoints

The Worker backend provides these endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/datasets` | GET | List available Analytics Engine datasets |
| `/api/datasets/:id/schema` | GET | Get column schema for a dataset |
| `/api/query` | POST | Execute SQL query against Analytics Engine |

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm deploy` | Deploy to Cloudflare Workers |
| `pnpm lint` | Run ESLint |
| `pnpm cf-typegen` | Generate Cloudflare Worker types |

## License

MIT

---

Built with [Cloudflare Workers](https://workers.cloudflare.com/) and [Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/)
