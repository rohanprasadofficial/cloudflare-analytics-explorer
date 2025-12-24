import type { DataSource } from '@/types/dashboard';

export const MOCK_DATA_SOURCES: DataSource[] = [
  {
    id: 'ds-1',
    name: 'Web Analytics',
    endpoint: '/api/analytics',
    columnMappings: [
      { sourceColumn: 'blob1', friendlyName: 'Page URL', columnType: 'blob', description: 'The full URL of the page' },
      { sourceColumn: 'blob2', friendlyName: 'User Agent', columnType: 'blob', description: 'Browser user agent string' },
      { sourceColumn: 'blob3', friendlyName: 'Referrer', columnType: 'blob', description: 'Referring URL' },
      { sourceColumn: 'blob4', friendlyName: 'Country', columnType: 'blob', description: 'Visitor country code' },
      { sourceColumn: 'blob5', friendlyName: 'City', columnType: 'blob', description: 'Visitor city' },
      { sourceColumn: 'blob6', friendlyName: 'Device Type', columnType: 'blob', description: 'desktop, mobile, tablet' },
      { sourceColumn: 'double1', friendlyName: 'Page Views', columnType: 'double', description: 'Number of page views' },
      { sourceColumn: 'double2', friendlyName: 'Unique Visitors', columnType: 'double', description: 'Unique visitor count' },
      { sourceColumn: 'double3', friendlyName: 'Bounce Rate', columnType: 'double', description: 'Percentage of single-page visits' },
      { sourceColumn: 'double4', friendlyName: 'Avg Duration (s)', columnType: 'double', description: 'Average session duration in seconds' },
      { sourceColumn: 'double5', friendlyName: 'Load Time (ms)', columnType: 'double', description: 'Page load time in milliseconds' },
      { sourceColumn: 'index1', friendlyName: 'Session ID', columnType: 'index', description: 'Unique session identifier' },
    ],
    createdAt: '2024-12-20T00:00:00Z',
    updatedAt: '2024-12-20T00:00:00Z',
  },
  {
    id: 'ds-2',
    name: 'API Metrics',
    endpoint: '/api/metrics',
    columnMappings: [
      { sourceColumn: 'blob1', friendlyName: 'Endpoint', columnType: 'blob', description: 'API endpoint path' },
      { sourceColumn: 'blob2', friendlyName: 'Method', columnType: 'blob', description: 'HTTP method (GET, POST, etc.)' },
      { sourceColumn: 'blob3', friendlyName: 'Status Code', columnType: 'blob', description: 'HTTP response status code' },
      { sourceColumn: 'blob4', friendlyName: 'Error Message', columnType: 'blob', description: 'Error message if any' },
      { sourceColumn: 'double1', friendlyName: 'Request Count', columnType: 'double', description: 'Total number of requests' },
      { sourceColumn: 'double2', friendlyName: 'Avg Latency (ms)', columnType: 'double', description: 'Average response time' },
      { sourceColumn: 'double3', friendlyName: 'Error Rate (%)', columnType: 'double', description: 'Percentage of failed requests' },
      { sourceColumn: 'double4', friendlyName: 'P95 Latency (ms)', columnType: 'double', description: '95th percentile latency' },
      { sourceColumn: 'double5', friendlyName: 'P99 Latency (ms)', columnType: 'double', description: '99th percentile latency' },
      { sourceColumn: 'index1', friendlyName: 'Request ID', columnType: 'index', description: 'Unique request identifier' },
    ],
    createdAt: '2024-12-21T00:00:00Z',
    updatedAt: '2024-12-21T00:00:00Z',
  },
  {
    id: 'ds-3',
    name: 'Error Tracking',
    endpoint: '/api/errors',
    columnMappings: [
      { sourceColumn: 'blob1', friendlyName: 'Error Type', columnType: 'blob', description: 'Type of error (JS, API, etc.)' },
      { sourceColumn: 'blob2', friendlyName: 'Error Message', columnType: 'blob', description: 'Error message text' },
      { sourceColumn: 'blob3', friendlyName: 'Stack Trace', columnType: 'blob', description: 'Error stack trace' },
      { sourceColumn: 'blob4', friendlyName: 'Page URL', columnType: 'blob', description: 'URL where error occurred' },
      { sourceColumn: 'blob5', friendlyName: 'Browser', columnType: 'blob', description: 'Browser name and version' },
      { sourceColumn: 'double1', friendlyName: 'Occurrences', columnType: 'double', description: 'Number of times error occurred' },
      { sourceColumn: 'double2', friendlyName: 'Users Affected', columnType: 'double', description: 'Number of unique users affected' },
      { sourceColumn: 'index1', friendlyName: 'Error ID', columnType: 'index', description: 'Unique error identifier' },
    ],
    createdAt: '2024-12-22T00:00:00Z',
    updatedAt: '2024-12-22T00:00:00Z',
  },
];

// Helper to get available columns for Analytics Engine
export const ANALYTICS_ENGINE_COLUMNS = {
  blobs: Array.from({ length: 20 }, (_, i) => `blob${i + 1}`),
  doubles: Array.from({ length: 20 }, (_, i) => `double${i + 1}`),
  indexes: Array.from({ length: 20 }, (_, i) => `index${i + 1}`),
};

export function getColumnType(columnName: string): 'blob' | 'double' | 'index' | null {
  if (columnName.startsWith('blob')) return 'blob';
  if (columnName.startsWith('double')) return 'double';
  if (columnName.startsWith('index')) return 'index';
  return null;
}
