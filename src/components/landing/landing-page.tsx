import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Database02Icon,
  FilterIcon,
  CodeIcon,
  CheckmarkCircle02Icon,
  Analytics01Icon,
  Layers01Icon,
  ArrowRight01Icon,
} from '@hugeicons/core-free-icons';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className='mt-1'>
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 3h7v7H3V3z" className="fill-zinc-300 dark:fill-zinc-700"/>
              <path d="M14 3h7v7h-7V3z" className="fill-zinc-400 dark:fill-zinc-600"/>
              <path d="M3 14h7v7H3v-7z" className="fill-zinc-400 dark:fill-zinc-600"/>
              <path d="M14 14h7v7h-7v-7z" className="fill-orange-500"/>
            </svg>
            <span className="text-sm font-semibold tracking-wide uppercase">Analytics Explorer</span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              to="/wiki"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Docs
            </Link>
            <a
              href="https://github.com/rohanprasadofficial/cloudflare-analytics-explorer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-zinc-100 py-20 dark:border-zinc-900">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <a
            href="https://developers.cloudflare.com/analytics/analytics-engine/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-medium text-orange-700 transition-colors hover:bg-orange-100 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300 dark:hover:bg-orange-900"
          >
            Built for Cloudflare Analytics Engine
          </a>
          <h1 className="mx-auto mt-2 max-w-3xl text-3xl font-normal tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
            Dashboards for Analytics Engine
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-zinc-500 dark:text-zinc-400">
            Build interactive dashboards to visualize your Cloudflare Analytics Engine data. Connect, query, and explore.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <a
              href="https://developers.cloudflare.com/analytics/analytics-engine/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-zinc-200 bg-white px-5 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Learn About AE
            </a>
            <Link
              to="/explorer"
              className="bg-orange-600 px-5 py-2 text-xs font-medium text-white hover:bg-orange-500"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Two Column */}
      <section className="border-b border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto grid max-w-5xl md:grid-cols-2">
          <div className="border-b border-zinc-100 p-10 md:border-b-0 md:border-r dark:border-zinc-900">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
              Data Sources
            </p>
            <h2 className="mt-3 text-xl text-zinc-900 dark:text-zinc-100">
              <span className="font-medium">Connect & map</span>
              <br />
              <span className="italic text-zinc-500 dark:text-zinc-400">your Analytics Engine datasets.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Auto-discover datasets from your Cloudflare account. Map generic columns like blob1 and double1 to meaningful names for easier querying.
            </p>
            <Link
              to="/explorer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
            >
              Create Data Source
              <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
            </Link>
          </div>
          <div className="p-10">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
              Dashboards
            </p>
            <h2 className="mt-3 text-xl text-zinc-900 dark:text-zinc-100">
              <span className="font-medium">Build & explore</span>
              <br />
              <span className="italic text-zinc-500 dark:text-zinc-400">interactive visualizations.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Create dashboards with drag-and-drop tiles. Choose from multiple chart types, configure filters, and write SQL queries.
            </p>
            <Link
              to="/explorer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
            >
              Create Dashboard
              <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* SQL */}
      <section className="border-b border-zinc-100 py-16 dark:border-zinc-900">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-zinc-400">
            SQL Queries
          </p>
          <h2 className="mt-3 text-center text-2xl font-normal text-zinc-900 dark:text-zinc-100">
            Query with familiar SQL syntax.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500 dark:text-zinc-400">
            Write SQL queries directly against your datasets. Use the visual builder for quick charts or switch to SQL mode for full control.
          </p>

          <div className="mx-auto mt-10 max-w-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
              <span className="font-mono text-xs text-zinc-500">query.sql</span>
            </div>
            <pre className="overflow-x-auto bg-white p-4 font-mono text-sm leading-relaxed text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
{`SELECT
  toDate(timestamp) as date,
  blob2 as country,
  COUNT() as events
FROM website_analytics
WHERE timestamp >= {{date_start}}
  AND timestamp <= {{date_end}}
GROUP BY date, country
ORDER BY date`}
            </pre>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-zinc-100 py-16 dark:border-zinc-900">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-800">
            <FeatureCard
              icon={FilterIcon}
              title="Dynamic Filters"
              description="Add date ranges, dropdowns, and text filters that update all tiles automatically."
            />
            <FeatureCard
              icon={Layers01Icon}
              title="Drag & Drop"
              description="Arrange and resize tiles with a flexible grid layout. Changes save instantly."
            />
            <FeatureCard
              icon={CodeIcon}
              title="Visual & SQL"
              description="Use the visual builder for quick setup or write custom SQL for full control."
            />
            <FeatureCard
              icon={Database02Icon}
              title="Column Mapping"
              description="Map generic column names to meaningful labels for better query readability."
            />
            <FeatureCard
              icon={Analytics01Icon}
              title="Multiple Charts"
              description="Line, bar, area, pie, scatter charts and data tables. Pick what fits your data."
            />
            <FeatureCard
              icon={CheckmarkCircle02Icon}
              title="Self-Hosted"
              description="Runs on Cloudflare Workers. Your API keys stay with you. Your data, your control."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-zinc-100 py-16 dark:border-zinc-900">
        <div className="mx-auto max-w-5xl px-6">
          <div className="bg-zinc-50 px-8 py-12 sm:px-12 sm:py-14 dark:bg-zinc-900">
            <div className="text-center">
              <span className="text-3xl">🚀</span>
              <h2 className="mt-4 text-xl font-medium text-zinc-900 dark:text-zinc-100">
                Start exploring your data
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
                Connect to Analytics Engine, create dashboards, and gain insights.
              </p>
              <Link
                to="/explorer"
                className="mt-5 inline-block bg-orange-600 px-5 py-2 text-xs font-medium text-white hover:bg-orange-500"
              >
                Start Exploring
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-8 sm:grid-cols-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">Product</p>
              <ul className="mt-3 space-y-2">
                <li><Link to="/explorer" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">Dashboards</Link></li>
                <li><Link to="/explorer" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">Data Sources</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">Resources</p>
              <ul className="mt-3 space-y-2">
                <li><Link to="/wiki" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">Documentation</Link></li>
                <li><a href="https://developers.cloudflare.com/analytics/analytics-engine/" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">Analytics Engine</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">Cloudflare</p>
              <ul className="mt-3 space-y-2">
                <li><a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">Cloudflare</a></li>
                <li><a href="https://workers.cloudflare.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">Workers</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">Open Source</p>
              <ul className="mt-3 space-y-2">
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">GitHub</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-zinc-100 pt-6 dark:border-zinc-900">
            <div className="flex items-center gap-2.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 3h7v7H3V3z" className="fill-zinc-300 dark:fill-zinc-700"/>
                <path d="M14 3h7v7h-7V3z" className="fill-zinc-400 dark:fill-zinc-600"/>
                <path d="M3 14h7v7H3v-7z" className="fill-zinc-400 dark:fill-zinc-600"/>
                <path d="M14 14h7v7h-7v-7z" className="fill-orange-500"/>
              </svg>
              <span className="text-sm text-zinc-400">Analytics Explorer</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <span>Built by</span>
              <a
                href="https://x.com/rohanpdofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
              >
                Rohan
                <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: typeof FilterIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 dark:bg-zinc-950">
      <HugeiconsIcon icon={icon} size={20} strokeWidth={1.5} className="text-zinc-400" />
      <h3 className="mt-4 text-xs font-medium uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
}
