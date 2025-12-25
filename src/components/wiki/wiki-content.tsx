import { cn } from '@/lib/utils';

// Reusable components for wiki content
function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-6">
      {children}
    </section>
  );
}

function H1({ children }: { children: React.ReactNode }) {
  return <h1 className="mb-4 text-2xl font-bold tracking-tight">{children}</h1>;
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 mt-8 text-xl font-semibold tracking-tight first:mt-0">{children}</h2>;
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-2 mt-6 text-lg font-medium">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{children}</p>;
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
      {children}
    </code>
  );
}

function CodeBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="mb-4 overflow-hidden rounded-lg border bg-zinc-950">
      {title && (
        <div className="border-b bg-zinc-900 px-4 py-2 text-xs text-zinc-400">{title}</div>
      )}
      <pre className="overflow-x-auto p-4 text-xs text-zinc-100">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="mb-4 overflow-hidden rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-2 text-left font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2 text-muted-foreground">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function List({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <ul className="mb-4 list-inside list-disc space-y-1 text-sm text-muted-foreground">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function Callout({ type = 'info', children }: { type?: 'info' | 'warning' | 'tip'; children: React.ReactNode }) {
  return (
    <div className={cn(
      'mb-4 rounded-lg border p-4 text-sm',
      type === 'info' && 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200',
      type === 'warning' && 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200',
      type === 'tip' && 'border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950 dark:text-green-200'
    )}>
      {children}
    </div>
  );
}

function Steps({ items }: { items: { title: string; content: React.ReactNode }[] }) {
  return (
    <div className="mb-4 space-y-4">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
            {i + 1}
          </div>
          <div className="flex-1 pt-0.5">
            <div className="font-medium">{item.title}</div>
            <div className="mt-1 text-sm text-muted-foreground">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Content sections
export function WikiContent({ activeSection }: { activeSection: string }) {
  const sections: Record<string, React.ReactNode> = {
    // Getting Started
    'getting-started': <GettingStartedSection />,
    'quick-start': <QuickStartSection />,
    'prerequisites': <PrerequisitesSection />,
    'credentials': <CredentialsSection />,
    'configuration': <ConfigurationSection />,

    // Concepts
    'concepts': <ConceptsSection />,
    'dummy-data': <DummyDataSection />,
    'analytics-engine': <AnalyticsEngineSection />,

    // Data Sources
    'data-sources': <DataSourcesSection />,
    'creating-data-source': <CreatingDataSourceSection />,
    'column-mapping': <ColumnMappingSection />,

    // Dashboards
    'dashboards': <DashboardsSection />,
    'creating-dashboard': <CreatingDashboardSection />,
    'dashboard-layout': <DashboardLayoutSection />,

    // Tiles
    'tiles': <TilesSection />,
    'creating-tiles': <CreatingTilesSection />,
    'visual-types': <VisualTypesSection />,
    'configuring-visuals': <ConfiguringVisualsSection />,

    // Filters
    'filters': <FiltersSection />,
    'filter-types': <FilterTypesSection />,
    'using-filters': <UsingFiltersSection />,

    // SQL
    'sql': <SqlSection />,
    'basic-queries': <BasicQueriesSection />,
    'time-queries': <TimeQueriesSection />,
    'aggregations': <AggregationsSection />,
    'multi-series': <MultiSeriesSection />,
    'datetime-functions': <DateTimeFunctionsSection />,
    'string-functions': <StringFunctionsSection />,
    'math-functions': <MathFunctionsSection />,
    'conditional-functions': <ConditionalFunctionsSection />,

    // Deployment
    'deployment': <DeploymentSection />,
    'cloudflare-workers': <CloudflareWorkersSection />,

    // Troubleshooting
    'troubleshooting': <TroubleshootingSection />,
    'common-issues': <CommonIssuesSection />,
  };

  return (
    <article className="prose prose-sm max-w-none">
      {sections[activeSection] || <GettingStartedSection />}
    </article>
  );
}

// Section Components
function GettingStartedSection() {
  return (
    <Section id="getting-started">
      <H1>Getting Started with Analytics Explorer</H1>
      <P>
        Analytics Explorer is a dashboard builder for Cloudflare Analytics Engine. Build beautiful,
        interactive dashboards to visualize your Analytics Engine data with a drag-and-drop interface.
      </P>
      <H3>What you can do</H3>
      <List items={[
        'Connect to your Analytics Engine datasets',
        'Create dashboards with multiple visualization tiles',
        'Write SQL queries to fetch and display data',
        'Configure filters for dynamic data exploration',
        'Drag and resize tiles to customize layouts',
      ]} />
    </Section>
  );
}

function QuickStartSection() {
  return (
    <Section id="quick-start">
      <H1>Quick Start</H1>
      <P>Get up and running in minutes with these simple steps.</P>

      <CodeBlock title="Terminal">{`# 1. Clone and install dependencies
git clone <repo-url>
cd cloudflare-analytics-explorer
pnpm install

# 2. Configure your credentials
cp ".dev.vars copy.example" .dev.vars
# Edit .dev.vars with your CF_ACCOUNT_ID and CF_API_TOKEN

# 3. Start the development server
pnpm dev

# Open http://localhost:5173`}</CodeBlock>

      <Callout type="tip">
        Don't have credentials yet? The app works with dummy data until you configure them.
        See the <strong>Cloudflare Credentials</strong> section for setup instructions.
      </Callout>
    </Section>
  );
}

function PrerequisitesSection() {
  return (
    <Section id="prerequisites">
      <H1>Prerequisites</H1>
      <P>Before you begin, make sure you have the following:</P>

      <Table
        headers={['Requirement', 'Description']}
        rows={[
          ['Cloudflare Account', 'With Analytics Engine enabled on your account'],
          ['Analytics Engine Dataset', 'At least one dataset with data written to it'],
          ['Node.js 18+', 'Required for local development'],
          ['pnpm', 'Package manager (install with npm install -g pnpm)'],
        ]}
      />
    </Section>
  );
}

function CredentialsSection() {
  return (
    <Section id="credentials">
      <H1>Cloudflare Credentials</H1>
      <P>You need two pieces of information to connect to your Analytics Engine data.</P>

      <H2>1. Find Your Account ID</H2>
      <Steps items={[
        { title: 'Log in to Cloudflare', content: 'Go to dash.cloudflare.com and sign in' },
        { title: 'Select your account', content: 'Click on the account you want to use' },
        { title: 'Copy the Account ID', content: 'Find it in the URL or right sidebar under "Account ID"' },
      ]} />

      <H2>2. Create an API Token</H2>
      <Steps items={[
        { title: 'Go to API Tokens', content: 'Navigate to dash.cloudflare.com/profile/api-tokens' },
        { title: 'Create Custom Token', content: 'Click "Create Token" then "Create Custom Token"' },
        {
          title: 'Configure Permissions',
          content: (
            <div>
              <List items={[
                'Account → Analytics → Read',
                'Account → Analytics Engine → Read',
              ]} />
            </div>
          )
        },
        { title: 'Copy the Token', content: 'Important: Copy it immediately - you won\'t see it again!' },
      ]} />

      <Callout type="warning">
        Keep your API token secure. Never commit it to version control or share it publicly.
      </Callout>
    </Section>
  );
}

function ConfigurationSection() {
  return (
    <Section id="configuration">
      <H1>Configuration</H1>

      <H2>Local Development</H2>
      <P>Create a <Code>.dev.vars</Code> file in the project root:</P>
      <CodeBlock title=".dev.vars">{`CF_ACCOUNT_ID=your_account_id_here
CF_API_TOKEN=your_api_token_here`}</CodeBlock>

      <P>Then start the development server:</P>
      <CodeBlock title="Terminal">{`pnpm dev`}</CodeBlock>

      <H2>Production Deployment</H2>
      <P>Set secrets using Wrangler CLI:</P>
      <CodeBlock title="Terminal">{`npx wrangler secret put CF_ACCOUNT_ID
# Enter your account ID when prompted

npx wrangler secret put CF_API_TOKEN
# Enter your API token when prompted`}</CodeBlock>
    </Section>
  );
}

function ConceptsSection() {
  return (
    <Section id="concepts">
      <H1>Core Concepts</H1>
      <P>Understanding the key concepts will help you get the most out of Analytics Explorer.</P>

      <H3>Data Sources</H3>
      <P>Data sources connect to your Analytics Engine datasets and define column mappings.</P>

      <H3>Dashboards</H3>
      <P>Dashboards are collections of tiles arranged in a grid layout.</P>

      <H3>Tiles</H3>
      <P>Tiles are individual visualizations that display data from SQL queries.</P>

      <H3>Filters</H3>
      <P>Filters allow users to dynamically change query parameters across all tiles.</P>
    </Section>
  );
}

function DummyDataSection() {
  return (
    <Section id="dummy-data">
      <H1>Understanding Dummy Data</H1>
      <P>When you first open Analytics Explorer, you'll see pre-configured examples:</P>

      <List items={[
        <><strong>[Dummy] Sample Analytics</strong> - A sample data source</>,
        <><strong>[Dummy] Sample Dashboard</strong> - A dashboard with example tiles</>,
      ]} />

      <P>
        These use mock data to demonstrate the app's capabilities when the API isn't configured.
      </P>

      <H2>Using Real Data</H2>
      <Steps items={[
        { title: 'Configure credentials', content: 'Add your CF_ACCOUNT_ID and CF_API_TOKEN' },
        { title: 'Delete dummy items', content: 'Click on the dummy items and delete them' },
        { title: 'Create your own', content: 'Create new data sources and dashboards!' },
      ]} />
    </Section>
  );
}

function AnalyticsEngineSection() {
  return (
    <Section id="analytics-engine">
      <H1>Analytics Engine Columns</H1>
      <P>Analytics Engine uses generic column names that you map to meaningful names.</P>

      <Table
        headers={['Column Type', 'Range', 'Purpose']}
        rows={[
          ['blob1 - blob20', 'String', 'Text data (URLs, countries, user agents)'],
          ['double1 - double20', 'Number', 'Numeric data (counts, durations, sizes)'],
          ['index1', 'String', 'High-cardinality grouping key'],
          ['timestamp', 'DateTime', 'Event timestamp (auto-populated)'],
        ]}
      />

      <H3>Example Mapping</H3>
      <Table
        headers={['Source Column', 'Friendly Name', 'Description']}
        rows={[
          ['blob1', 'Page URL', 'The visited page'],
          ['blob2', 'Country', 'Visitor country code'],
          ['double1', 'Page Views', 'View count'],
          ['double2', 'Duration (ms)', 'Time on page'],
        ]}
      />
    </Section>
  );
}

function DataSourcesSection() {
  return (
    <Section id="data-sources">
      <H1>Data Sources</H1>
      <P>
        Data sources are connections to your Analytics Engine datasets. They define which
        dataset to query and how to interpret the generic column names.
      </P>
    </Section>
  );
}

function CreatingDataSourceSection() {
  return (
    <Section id="creating-data-source">
      <H1>Creating a Data Source</H1>
      <Steps items={[
        { title: 'Click "+ New Data Source"', content: 'Find this button in the sidebar' },
        { title: 'Select Dataset', content: 'Choose from auto-discovered datasets or enter manually' },
        { title: 'Set Display Name', content: 'Give it a friendly name like "Website Analytics"' },
        { title: 'Configure Column Mappings', content: 'Map generic columns to meaningful names' },
        { title: 'Save', content: 'Click Create to save your data source' },
      ]} />
    </Section>
  );
}

function ColumnMappingSection() {
  return (
    <Section id="column-mapping">
      <H1>Column Mapping</H1>
      <P>Column mappings make it easier to write queries and understand your data.</P>

      <H3>Mapping Fields</H3>
      <Table
        headers={['Field', 'Description']}
        rows={[
          ['Source Column', 'The actual column name (e.g., blob1, double1)'],
          ['Friendly Name', 'A readable name (e.g., "Page URL", "Views")'],
          ['Type', 'blob (string), double (number), or index'],
          ['Description', 'Optional description of the column\'s purpose'],
        ]}
      />

      <Callout type="tip">
        Good column mappings make it much easier to write queries. Take time to set meaningful names!
      </Callout>
    </Section>
  );
}

function DashboardsSection() {
  return (
    <Section id="dashboards">
      <H1>Dashboards</H1>
      <P>
        Dashboards are collections of tiles arranged in a flexible grid layout. Each dashboard
        can have its own set of filters that apply to all tiles.
      </P>
    </Section>
  );
}

function CreatingDashboardSection() {
  return (
    <Section id="creating-dashboard">
      <H1>Creating a Dashboard</H1>
      <Steps items={[
        { title: 'Click "+ New Dashboard"', content: 'Find this in the sidebar under Dashboards' },
        { title: 'Enter a Name', content: 'Give your dashboard a descriptive name' },
        { title: 'Add Description (optional)', content: 'Help others understand the dashboard\'s purpose' },
        { title: 'Start Adding Tiles', content: 'Click "+ Add Tile" to create visualizations' },
      ]} />
    </Section>
  );
}

function DashboardLayoutSection() {
  return (
    <Section id="dashboard-layout">
      <H1>Dashboard Layout</H1>
      <P>Dashboards use a responsive 4-column grid layout.</P>

      <H3>Arranging Tiles</H3>
      <List items={[
        'Drag tiles using the grip handle to reposition',
        'Resize tiles by dragging the corners',
        'Tiles snap to the grid automatically',
        'Changes save automatically',
      ]} />

      <H3>Tile Sizes</H3>
      <Table
        headers={['Size', 'Columns', 'Best For']}
        rows={[
          ['Small', '1 column', 'Stat cards, small metrics'],
          ['Medium', '2 columns', 'Standard charts'],
          ['Large', '3-4 columns', 'Wide tables, detailed charts'],
        ]}
      />
    </Section>
  );
}

function TilesSection() {
  return (
    <Section id="tiles">
      <H1>Tiles & Visuals</H1>
      <P>
        Tiles are the building blocks of dashboards. Each tile displays data from a SQL
        query as a chart, table, or metric card.
      </P>
    </Section>
  );
}

function CreatingTilesSection() {
  return (
    <Section id="creating-tiles">
      <H1>Creating Tiles</H1>
      <Steps items={[
        { title: 'Open your dashboard', content: 'Click on a dashboard in the sidebar' },
        { title: 'Click "+ Add Tile"', content: 'Opens the tile editor modal' },
        { title: 'Set Title', content: 'Give the tile a descriptive name' },
        { title: 'Select Data Source', content: 'Choose which dataset to query' },
        { title: 'Choose Visual Type', content: 'Select the chart type' },
        { title: 'Write SQL Query', content: 'Enter your Analytics Engine SQL' },
        { title: 'Configure Visual', content: 'Set X/Y axes, legend, etc.' },
        { title: 'Save', content: 'Click Create to add the tile' },
      ]} />
    </Section>
  );
}

function VisualTypesSection() {
  return (
    <Section id="visual-types">
      <H1>Visual Types</H1>
      <Table
        headers={['Type', 'Best For', 'Required Data']}
        rows={[
          ['Area', 'Time series with filled area', 'X (date/time), Y (numbers)'],
          ['Line', 'Time series trends', 'X (date/time), Y (numbers)'],
          ['Bar', 'Categorical comparisons', 'X (categories), Y (numbers)'],
          ['Pie', 'Distribution/proportions', 'Category, Value'],
          ['Scatter', 'Correlation between metrics', 'X (number), Y (number)'],
          ['Table', 'Raw data display', 'Any columns'],
          ['Stat', 'Single KPI/metric', 'Single value'],
        ]}
      />
    </Section>
  );
}

function ConfiguringVisualsSection() {
  return (
    <Section id="configuring-visuals">
      <H1>Configuring Visuals</H1>
      <P>After selecting a visual type, configure these options:</P>

      <H3>Common Settings</H3>
      <Table
        headers={['Setting', 'Description']}
        rows={[
          ['X Axis', 'The dimension column (usually date or category)'],
          ['Y Axis', 'The metric column(s) to display'],
          ['Legend', 'Show or hide the chart legend'],
          ['Grid', 'Show or hide grid lines'],
        ]}
      />

      <H3>Stat Card Settings</H3>
      <Table
        headers={['Setting', 'Description']}
        rows={[
          ['Value Key', 'Column containing the main value'],
          ['Label', 'Text displayed above the value'],
          ['Format', 'Number, currency, or percent'],
          ['Prefix/Suffix', 'Text before/after the value'],
        ]}
      />
    </Section>
  );
}

function FiltersSection() {
  return (
    <Section id="filters">
      <H1>Filters</H1>
      <P>
        Filters let users dynamically change what data is displayed across all tiles.
        They're configured per-dashboard and inject values into SQL queries using placeholders.
      </P>

      <H2>Managing Filters</H2>
      <Steps items={[
        { title: 'Open Dashboard Menu', content: 'Click the ⋯ menu button in the dashboard header' },
        { title: 'Select "Manage Filters"', content: 'Opens the filter configuration modal' },
        { title: 'Add Filters', content: 'Click "Add Filter" to create new filter controls' },
        { title: 'Configure Each Filter', content: 'Set the type, parameter name, and options' },
        { title: 'Save', content: 'Filters appear in the dashboard header' },
      ]} />

      <Callout type="tip">
        The <strong>parameter name</strong> is what you'll use in your SQL queries. Keep it short and lowercase
        (e.g., <Code>date_range</Code>, <Code>country</Code>, <Code>search</Code>).
      </Callout>
    </Section>
  );
}

function FilterTypesSection() {
  return (
    <Section id="filter-types">
      <H1>Filter Types</H1>
      <P>Choose the right filter type for your use case:</P>

      <Table
        headers={['Type', 'Variables', 'Use Case']}
        rows={[
          ['Date Range', '{{param_start}}, {{param_end}}', 'Time-based filtering with specific dates'],
          ['Time Range', 'INTERVAL {{param}}', 'Quick time presets (last 1hr, last 7 days)'],
          ['Dropdown', '{{param}}', 'Categorical selection (country, status, etc.)'],
          ['Text', '{{param}}', 'Search/filter by text input'],
        ]}
      />

      <H2>Date Range Filter</H2>
      <P>Two date pickers for selecting start and end dates. Ideal for time-series data.</P>
      <CodeBlock title="Example: Filter by date range">{`SELECT toDate(timestamp) as date, COUNT() as events
FROM my_dataset
WHERE timestamp >= {{date_range_start}}
  AND timestamp <= {{date_range_end}}
GROUP BY date`}</CodeBlock>

      <H2>Time Range Filter</H2>
      <P>A dropdown with preset time intervals like "Last 15 minutes", "Last 1 hour", "Last 7 days". Uses Analytics Engine's INTERVAL syntax.</P>
      <CodeBlock title="Example: Filter by time range">{`SELECT toDate(timestamp) as date, COUNT() as events
FROM my_dataset
WHERE timestamp >= NOW() - INTERVAL {{time_range}}
GROUP BY date`}</CodeBlock>

      <Callout type="info">
        Time Range values use Analytics Engine SQL format: <Code>'15' MINUTE</Code>, <Code>'1' HOUR</Code>, <Code>'7' DAY</Code>.
        The <Code>INTERVAL</Code> keyword is included automatically when you copy the variable from the tile editor.
      </Callout>

      <H2>Dropdown Filter</H2>
      <P>A select menu with predefined options. Configure label/value pairs in the filter settings.</P>
      <CodeBlock title="Example: Filter by country">{`SELECT blob1 as page, COUNT() as views
FROM my_dataset
WHERE blob2 = {{country}}
GROUP BY page
ORDER BY views DESC`}</CodeBlock>

      <Callout type="tip">
        Add an "All" option with an empty value to allow users to see unfiltered data.
        Handle it in your query: <Code>{"WHERE ({{country}} = '' OR blob2 = {{country}})"}</Code>
      </Callout>

      <H2>Text Filter</H2>
      <P>Free-form text input with automatic debouncing. Great for search functionality.</P>
      <CodeBlock title="Example: Search pages">{`SELECT blob1 as page, COUNT() as views
FROM my_dataset
WHERE blob1 LIKE '%' || {{search}} || '%'
GROUP BY page`}</CodeBlock>
    </Section>
  );
}

function UsingFiltersSection() {
  return (
    <Section id="using-filters">
      <H1>Using Filters in Queries</H1>
      <P>
        Filter values are injected into your SQL queries using placeholder syntax. When users change
        filter values, all tiles automatically re-run their queries with the new values.
      </P>

      <H2>Placeholder Syntax</H2>
      <Table
        headers={['Filter Type', 'Syntax', 'Example']}
        rows={[
          ['Date Range (start)', '{{param_start}}', '{{date_range_start}}'],
          ['Date Range (end)', '{{param_end}}', '{{date_range_end}}'],
          ['Time Range', 'INTERVAL {{param}}', 'INTERVAL {{time_range}}'],
          ['Dropdown', '{{param}}', '{{country}}'],
          ['Text', '{{param}}', '{{search}}'],
        ]}
      />

      <H2>Finding Available Variables</H2>
      <P>
        When editing a tile in SQL mode, you'll see a blue <strong>"Filter Variables"</strong> section
        that shows all available filter placeholders. Click any variable to copy it to your clipboard.
      </P>

      <Callout type="tip">
        The tile editor shows both column names (from your data source) and filter variables,
        making it easy to build queries without remembering exact names.
      </Callout>

      <H2>Complete Example</H2>
      <CodeBlock title="Query with multiple filters">{`SELECT
  toDate(timestamp) as date,
  blob2 as country,
  COUNT() as events,
  SUM(double1) as total_value
FROM my_dataset
WHERE timestamp >= {{date_range_start}}
  AND timestamp <= {{date_range_end}}
  AND ({{country}} = '' OR blob2 = {{country}})
  AND blob1 LIKE '%' || {{search}} || '%'
GROUP BY date, country
ORDER BY date`}</CodeBlock>

      <H2>How It Works</H2>
      <List items={[
        'Placeholders are replaced with actual filter values before the query runs',
        'String values are automatically quoted',
        'Date values are formatted as ISO strings',
        'Empty filter values can be handled with OR conditions',
      ]} />

      <Callout type="warning">
        Make sure your filter parameter names exactly match the placeholders in your queries.
        Parameter names are case-sensitive.
      </Callout>
    </Section>
  );
}

function SqlSection() {
  return (
    <Section id="sql">
      <H1>SQL Reference</H1>
      <P>
        Analytics Engine uses a SQL-like query language. Here are common patterns and examples.
      </P>
    </Section>
  );
}

function BasicQueriesSection() {
  return (
    <Section id="basic-queries">
      <H1>Basic Queries</H1>

      <CodeBlock title="Count all events">{`SELECT COUNT() as total FROM my_dataset`}</CodeBlock>

      <CodeBlock title="Events by day">{`SELECT
  toDate(timestamp) as date,
  COUNT() as events
FROM my_dataset
GROUP BY date
ORDER BY date`}</CodeBlock>

      <CodeBlock title="Top 10 pages">{`SELECT
  blob1 as page,
  COUNT() as views
FROM my_dataset
GROUP BY page
ORDER BY views DESC
LIMIT 10`}</CodeBlock>
    </Section>
  );
}

function TimeQueriesSection() {
  return (
    <Section id="time-queries">
      <H1>Time-Based Queries</H1>
      <P>Analytics Engine uses a specific INTERVAL syntax for time-based filtering.</P>

      <H2>INTERVAL Syntax</H2>
      <P>The correct format is <Code>INTERVAL 'number' UNIT</Code> with the number in single quotes:</P>
      <Table
        headers={['Duration', 'Syntax']}
        rows={[
          ['15 minutes', "INTERVAL '15' MINUTE"],
          ['1 hour', "INTERVAL '1' HOUR"],
          ['24 hours', "INTERVAL '24' HOUR"],
          ['7 days', "INTERVAL '7' DAY"],
          ['30 days', "INTERVAL '30' DAY"],
        ]}
      />

      <H2>Relative Time Filters</H2>
      <CodeBlock title="Last 7 days">{`WHERE timestamp >= NOW() - INTERVAL '7' DAY`}</CodeBlock>

      <CodeBlock title="Last 24 hours">{`WHERE timestamp >= NOW() - INTERVAL '24' HOUR`}</CodeBlock>

      <CodeBlock title="Last 15 minutes">{`WHERE timestamp >= NOW() - INTERVAL '15' MINUTE`}</CodeBlock>

      <H2>Absolute Date Ranges</H2>
      <CodeBlock title="Specific date range">{`WHERE timestamp BETWEEN '2024-01-01' AND '2024-01-31'`}</CodeBlock>

      <H2>With Filter Placeholders</H2>
      <CodeBlock title="Date range filter">{`WHERE timestamp >= {{date_start}} AND timestamp <= {{date_end}}`}</CodeBlock>

      <CodeBlock title="Time range filter (quick presets)">{`WHERE timestamp >= NOW() - INTERVAL {{time_range}}`}</CodeBlock>

      <Callout type="warning">
        Always use single quotes around the number in INTERVAL syntax: <Code>INTERVAL '7' DAY</Code> not <Code>INTERVAL 7 DAY</Code>.
      </Callout>
    </Section>
  );
}

function AggregationsSection() {
  return (
    <Section id="aggregations">
      <H1>Aggregations</H1>
      <P>Analytics Engine supports various aggregate functions for data summarization.</P>

      <H2>Basic Aggregations</H2>
      <Table
        headers={['Function', 'Description', 'Example']}
        rows={[
          ['COUNT()', 'Count all rows', 'COUNT()'],
          ['COUNT(DISTINCT col)', 'Count unique values', 'COUNT(DISTINCT blob1)'],
          ['SUM(col)', 'Sum of values', 'SUM(double1)'],
          ['AVG(col)', 'Average of values', 'AVG(double1)'],
          ['MIN(col)', 'Minimum value', 'MIN(double1)'],
          ['MAX(col)', 'Maximum value', 'MAX(double1)'],
        ]}
      />

      <CodeBlock title="Multiple aggregations">{`SELECT
  COUNT() as events,
  SUM(double1) as total,
  AVG(double2) as average,
  MIN(double3) as minimum,
  MAX(double3) as maximum
FROM my_dataset`}</CodeBlock>

      <H2>Advanced Aggregations</H2>
      <Table
        headers={['Function', 'Description']}
        rows={[
          ['argMax(arg, val)', 'Returns arg where val is maximum'],
          ['argMin(arg, val)', 'Returns arg where val is minimum'],
          ['first_value(col)', 'First value in group'],
          ['last_value(col)', 'Last value in group'],
          ['topK(N)(col)', 'Most common N values (default 10)'],
          ['quantileExactWeighted(q)(col, weight)', 'Weighted quantile'],
        ]}
      />

      <CodeBlock title="Find page with most views">{`SELECT
  argMax(blob1, double1) as top_page,
  MAX(double1) as max_views
FROM my_dataset`}</CodeBlock>

      <CodeBlock title="Top 5 most common pages">{`SELECT
  topK(5)(blob1) as top_pages
FROM my_dataset`}</CodeBlock>

      <H2>Conditional Aggregations</H2>
      <P>Count or sum only rows matching a condition:</P>
      <Table
        headers={['Function', 'Description']}
        rows={[
          ['countIf(condition)', 'Count rows where condition is true'],
          ['sumIf(col, condition)', 'Sum where condition is true'],
          ['avgIf(col, condition)', 'Average where condition is true'],
        ]}
      />

      <CodeBlock title="Conditional counting">{`SELECT
  COUNT() as total,
  countIf(double1 > 100) as high_value_count,
  sumIf(double1, blob2 = 'US') as us_total
FROM my_dataset`}</CodeBlock>

      <Callout type="info">
        Note: Analytics Engine uses <Code>COUNT()</Code> without arguments, unlike standard SQL which requires <Code>COUNT(*)</Code>.
      </Callout>
    </Section>
  );
}

function MultiSeriesSection() {
  return (
    <Section id="multi-series">
      <H1>Multi-Series Charts</H1>
      <P>To create charts with multiple lines (e.g., by category), use a <Code>series</Code> column:</P>

      <CodeBlock title="Multi-series query">{`SELECT
  toDate(timestamp) as time,
  COUNT() as value,
  blob2 as series  -- This becomes separate lines
FROM my_dataset
GROUP BY time, series
ORDER BY time`}</CodeBlock>

      <P>The app automatically pivots this data into wide format for charting.</P>
    </Section>
  );
}

function DateTimeFunctionsSection() {
  return (
    <Section id="datetime-functions">
      <H1>Date & Time Functions</H1>
      <P>Analytics Engine provides comprehensive date and time functions for temporal data manipulation.</P>

      <H2>Current Time</H2>
      <Table
        headers={['Function', 'Description', 'Example']}
        rows={[
          ['now()', 'Returns current DateTime', 'WHERE timestamp > now() - INTERVAL \'1\' HOUR'],
          ['today()', 'Returns current Date', 'WHERE toDate(timestamp) = today()'],
        ]}
      />

      <H2>Time Extraction</H2>
      <P>Extract specific components from datetime values:</P>
      <Table
        headers={['Function', 'Description', 'Returns']}
        rows={[
          ['toYear(datetime)', 'Extract year', '2024'],
          ['toMonth(datetime)', 'Extract month (1-12)', '12'],
          ['toDayOfWeek(datetime)', 'Day of week (1=Mon, 7=Sun)', '3'],
          ['toDayOfMonth(datetime)', 'Day of month', '25'],
          ['toHour(datetime)', 'Extract hour (0-23)', '14'],
          ['toMinute(datetime)', 'Extract minute', '30'],
          ['toSecond(datetime)', 'Extract second', '45'],
        ]}
      />

      <H2>Time Rounding</H2>
      <P>Round datetime values to specific intervals for grouping:</P>
      <Table
        headers={['Function', 'Description']}
        rows={[
          ['toStartOfMinute(datetime)', 'Round down to start of minute'],
          ['toStartOfFiveMinutes(datetime)', 'Round down to nearest 5 minutes'],
          ['toStartOfTenMinutes(datetime)', 'Round down to nearest 10 minutes'],
          ['toStartOfFifteenMinutes(datetime)', 'Round down to nearest 15 minutes'],
          ['toStartOfHour(datetime)', 'Round down to start of hour'],
          ['toStartOfDay(datetime)', 'Round down to start of day'],
          ['toDate(datetime)', 'Convert to Date (removes time)'],
          ['toStartOfWeek(datetime)', 'Round down to start of week'],
          ['toStartOfMonth(datetime)', 'Round down to start of month'],
          ['toStartOfYear(datetime)', 'Round down to start of year'],
        ]}
      />

      <H2>Custom Intervals</H2>
      <CodeBlock title="Using toStartOfInterval">{`SELECT
  toStartOfInterval(timestamp, INTERVAL '30' MINUTE) as time_bucket,
  COUNT() as events
FROM my_dataset
GROUP BY time_bucket
ORDER BY time_bucket`}</CodeBlock>

      <H2>Formatting</H2>
      <CodeBlock title="Format datetime as string">{`SELECT
  formatDateTime(timestamp, '%Y-%m-%d %H:%M') as formatted_time,
  toYYYYMM(timestamp) as year_month
FROM my_dataset`}</CodeBlock>

      <Callout type="tip">
        Use <Code>toDate(timestamp)</Code> for daily grouping and <Code>toStartOfHour(timestamp)</Code> for hourly grouping in time series charts.
      </Callout>
    </Section>
  );
}

function StringFunctionsSection() {
  return (
    <Section id="string-functions">
      <H1>String Functions</H1>
      <P>Analytics Engine provides functions for text processing and manipulation.</P>

      <H2>Basic String Functions</H2>
      <Table
        headers={['Function', 'Description', 'Example']}
        rows={[
          ['length(str)', 'Returns string length (UTF-8)', 'length(blob1) > 10'],
          ['empty(str)', 'Returns true if empty', 'NOT empty(blob1)'],
          ['lower(str)', 'Convert to lowercase (ASCII)', 'lower(blob1)'],
          ['lowerUTF8(str)', 'Convert to lowercase (Unicode)', 'lowerUTF8(blob1)'],
          ['upper(str)', 'Convert to uppercase (ASCII)', 'upper(blob1)'],
          ['upperUTF8(str)', 'Convert to uppercase (Unicode)', 'upperUTF8(blob1)'],
        ]}
      />

      <H2>String Matching</H2>
      <Table
        headers={['Function', 'Description', 'Example']}
        rows={[
          ['startsWith(str, prefix)', 'Check if starts with prefix', "startsWith(blob1, '/api/')"],
          ['endsWith(str, suffix)', 'Check if ends with suffix', "endsWith(blob1, '.html')"],
          ['position(haystack, needle)', 'Find position (1-based, 0 if not found)', "position(blob1, 'error') > 0"],
        ]}
      />

      <H2>Substring Extraction</H2>
      <CodeBlock title="Extract substring">{`SELECT
  substring(blob1, 1, 50) as truncated_url,
  position(blob1, '?') as query_start
FROM my_dataset
WHERE length(blob1) > 50`}</CodeBlock>

      <H2>String Formatting</H2>
      <CodeBlock title="Format function">{`SELECT
  format('User {} from {}', blob1, blob2) as description
FROM my_dataset`}</CodeBlock>

      <Callout type="info">
        Use <Code>lowerUTF8()</Code> and <Code>upperUTF8()</Code> for proper Unicode handling with international characters.
      </Callout>
    </Section>
  );
}

function MathFunctionsSection() {
  return (
    <Section id="math-functions">
      <H1>Mathematical Functions</H1>
      <P>Analytics Engine provides functions for numeric calculations.</P>

      <H2>Available Functions</H2>
      <Table
        headers={['Function', 'Description', 'Example']}
        rows={[
          ['intDiv(a, b)', 'Integer division (rounds down)', 'intDiv(double1, 100)'],
          ['log(x) / ln(x)', 'Natural logarithm', 'log(double1 + 1)'],
          ['pow(base, exp)', 'Power/exponentiation', 'pow(double1, 2)'],
          ['round(x[, n])', 'Round to n decimal places', 'round(double1, 2)'],
          ['floor(x[, n])', 'Round down to n decimals', 'floor(double1)'],
          ['ceil(x[, n])', 'Round up to n decimals', 'ceil(double1)'],
        ]}
      />

      <H2>Examples</H2>
      <CodeBlock title="Rounding values">{`SELECT
  round(AVG(double1), 2) as avg_rounded,
  floor(double1 / 1000) as thousands,
  ceil(double2) as rounded_up
FROM my_dataset`}</CodeBlock>

      <CodeBlock title="Calculating percentages">{`SELECT
  blob1 as category,
  COUNT() as count,
  round(COUNT() * 100.0 / SUM(COUNT()) OVER (), 2) as percentage
FROM my_dataset
GROUP BY category`}</CodeBlock>

      <H2>Arithmetic Operators</H2>
      <Table
        headers={['Operator', 'Description']}
        rows={[
          ['+', 'Addition'],
          ['-', 'Subtraction'],
          ['*', 'Multiplication'],
          ['/', 'Division'],
          ['%', 'Modulus (remainder)'],
        ]}
      />
    </Section>
  );
}

function ConditionalFunctionsSection() {
  return (
    <Section id="conditional-functions">
      <H1>Conditional Functions</H1>
      <P>Use conditional logic in your queries to transform and categorize data.</P>

      <H2>if() Function</H2>
      <P>Returns different values based on a condition:</P>
      <CodeBlock title="Syntax">{`if(condition, true_expression, false_expression)`}</CodeBlock>

      <CodeBlock title="Example: Categorize values">{`SELECT
  blob1 as page,
  double1 as response_time,
  if(double1 > 1000, 'Slow', 'Fast') as performance
FROM my_dataset`}</CodeBlock>

      <H2>Nested Conditions</H2>
      <CodeBlock title="Multiple categories">{`SELECT
  blob1 as page,
  double1 as response_time,
  if(double1 > 2000, 'Critical',
    if(double1 > 1000, 'Slow',
      if(double1 > 500, 'Normal', 'Fast')
    )
  ) as performance_tier
FROM my_dataset`}</CodeBlock>

      <H2>Conditional Aggregation</H2>
      <P>Use <Code>countIf</Code>, <Code>sumIf</Code>, and <Code>avgIf</Code> for conditional aggregates:</P>
      <CodeBlock title="Conditional counts">{`SELECT
  toDate(timestamp) as date,
  COUNT() as total_requests,
  countIf(double1 > 1000) as slow_requests,
  countIf(double1 <= 1000) as fast_requests,
  round(countIf(double1 > 1000) * 100.0 / COUNT(), 2) as slow_percentage
FROM my_dataset
GROUP BY date
ORDER BY date`}</CodeBlock>

      <CodeBlock title="Conditional sums">{`SELECT
  blob2 as country,
  SUM(double1) as total_value,
  sumIf(double1, blob3 = 'premium') as premium_value,
  sumIf(double1, blob3 = 'free') as free_value
FROM my_dataset
GROUP BY country`}</CodeBlock>

      <H2>Comparison Operators</H2>
      <Table
        headers={['Operator', 'Description']}
        rows={[
          ['=', 'Equals'],
          ['<> or !=', 'Not equals'],
          ['<', 'Less than'],
          ['>', 'Greater than'],
          ['<=', 'Less than or equal'],
          ['>=', 'Greater than or equal'],
          ['IN (a, b, c)', 'Value in list'],
          ['NOT IN (a, b, c)', 'Value not in list'],
          ['BETWEEN a AND b', 'Value in range (inclusive)'],
        ]}
      />

      <H2>Boolean Operators</H2>
      <CodeBlock title="Combining conditions">{`SELECT *
FROM my_dataset
WHERE (blob2 = 'US' OR blob2 = 'UK')
  AND double1 > 100
  AND NOT empty(blob1)`}</CodeBlock>

      <Callout type="tip">
        Conditional aggregations like <Code>countIf()</Code> are more efficient than filtering with WHERE when you need multiple conditional counts from the same dataset.
      </Callout>
    </Section>
  );
}

function DeploymentSection() {
  return (
    <Section id="deployment">
      <H1>Deployment</H1>
      <P>Analytics Explorer can be deployed to Cloudflare Workers for production use.</P>
    </Section>
  );
}

function CloudflareWorkersSection() {
  return (
    <Section id="cloudflare-workers">
      <H1>Deploy to Cloudflare Workers</H1>

      <Steps items={[
        {
          title: 'Set secrets',
          content: (
            <CodeBlock>{`npx wrangler secret put CF_ACCOUNT_ID
npx wrangler secret put CF_API_TOKEN`}</CodeBlock>
          )
        },
        {
          title: 'Deploy',
          content: <CodeBlock>{`pnpm run deploy`}</CodeBlock>
        },
      ]} />

      <P>Your app will be available at <Code>https://cloudflare-analytics-explorer.&lt;your-subdomain&gt;.workers.dev</Code></P>
    </Section>
  );
}

function TroubleshootingSection() {
  return (
    <Section id="troubleshooting">
      <H1>Troubleshooting</H1>
      <P>Common issues and their solutions.</P>
    </Section>
  );
}

function CommonIssuesSection() {
  return (
    <Section id="common-issues">
      <H1>Common Issues</H1>

      <H3>"Missing configuration" Error</H3>
      <List items={[
        'Ensure .dev.vars exists with both CF_ACCOUNT_ID and CF_API_TOKEN',
        'Restart the dev server after adding credentials',
      ]} />

      <H3>"Query execution failed"</H3>
      <List items={[
        'Check SQL syntax (Analytics Engine SQL, not standard SQL)',
        'Verify dataset name is correct',
        'Ensure your API token has Analytics Engine read permissions',
      ]} />

      <H3>No Datasets Showing</H3>
      <List items={[
        'Verify you\'ve written data to at least one dataset',
        'Check API token permissions include Analytics Engine read access',
        'Try the manual entry option if auto-discovery fails',
      ]} />

      <H3>Charts Show Nothing</H3>
      <List items={[
        'Verify your query returns data (test in SQL mode first)',
        'Check X/Y axis column names match your query output',
        'For numeric columns, ensure values aren\'t returned as strings',
      ]} />

      <H3>Filters Not Working</H3>
      <List items={[
        'Ensure parameter names in filters match placeholders in queries',
        'Use {{param}} format (double curly braces)',
        'For date ranges, use {{param_start}} and {{param_end}}',
        'For time ranges, use INTERVAL {{param}} (e.g., INTERVAL {{time_range}})',
      ]} />
    </Section>
  );
}
