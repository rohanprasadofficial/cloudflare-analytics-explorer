// Mock query results for different visualization scenarios

export const MOCK_TIMESERIES_DATA = [
  { date: '2024-12-19', views: 1250, visitors: 890, bounceRate: 42 },
  { date: '2024-12-20', views: 1480, visitors: 1020, bounceRate: 38 },
  { date: '2024-12-21', views: 980, visitors: 720, bounceRate: 45 },
  { date: '2024-12-22', views: 1120, visitors: 840, bounceRate: 40 },
  { date: '2024-12-23', views: 1890, visitors: 1340, bounceRate: 35 },
  { date: '2024-12-24', views: 2100, visitors: 1580, bounceRate: 32 },
  { date: '2024-12-25', views: 1650, visitors: 1200, bounceRate: 36 },
];

export const MOCK_TOP_PAGES_DATA = [
  { path: '/home', views: 5420, visitors: 3200, avgDuration: 125 },
  { path: '/products', views: 3890, visitors: 2100, avgDuration: 245 },
  { path: '/about', views: 2340, visitors: 1800, avgDuration: 85 },
  { path: '/contact', views: 1560, visitors: 1200, avgDuration: 65 },
  { path: '/blog', views: 1230, visitors: 890, avgDuration: 320 },
  { path: '/pricing', views: 980, visitors: 720, avgDuration: 180 },
  { path: '/docs', views: 850, visitors: 650, avgDuration: 420 },
];

export const MOCK_COUNTRY_DATA = [
  { country: 'USA', visitors: 4500, percentage: 37.5 },
  { country: 'UK', visitors: 2300, percentage: 19.2 },
  { country: 'Germany', visitors: 1800, percentage: 15.0 },
  { country: 'France', visitors: 1200, percentage: 10.0 },
  { country: 'Canada', visitors: 800, percentage: 6.7 },
  { country: 'Australia', visitors: 600, percentage: 5.0 },
  { country: 'Other', visitors: 800, percentage: 6.6 },
];

export const MOCK_DEVICE_DATA = [
  { device: 'Desktop', visitors: 6200, percentage: 51.7 },
  { device: 'Mobile', visitors: 4800, percentage: 40.0 },
  { device: 'Tablet', visitors: 1000, percentage: 8.3 },
];

export const MOCK_HOURLY_DATA = [
  { hour: '00:00', requests: 120 },
  { hour: '02:00', requests: 85 },
  { hour: '04:00', requests: 65 },
  { hour: '06:00', requests: 180 },
  { hour: '08:00', requests: 420 },
  { hour: '10:00', requests: 680 },
  { hour: '12:00', requests: 750 },
  { hour: '14:00', requests: 820 },
  { hour: '16:00', requests: 690 },
  { hour: '18:00', requests: 540 },
  { hour: '20:00', requests: 380 },
  { hour: '22:00', requests: 220 },
];

export const MOCK_API_ENDPOINTS_DATA = [
  { endpoint: '/api/users', method: 'GET', requests: 12500, avgLatency: 45, errorRate: 0.2 },
  { endpoint: '/api/products', method: 'GET', requests: 8900, avgLatency: 62, errorRate: 0.5 },
  { endpoint: '/api/orders', method: 'POST', requests: 3200, avgLatency: 120, errorRate: 1.2 },
  { endpoint: '/api/auth', method: 'POST', requests: 2800, avgLatency: 85, errorRate: 2.1 },
  { endpoint: '/api/search', method: 'GET', requests: 6500, avgLatency: 95, errorRate: 0.8 },
];

export const MOCK_ERROR_DATA = [
  { type: 'TypeError', message: 'Cannot read property of undefined', occurrences: 245, usersAffected: 89 },
  { type: 'NetworkError', message: 'Failed to fetch', occurrences: 180, usersAffected: 120 },
  { type: 'SyntaxError', message: 'Unexpected token', occurrences: 65, usersAffected: 32 },
  { type: 'RangeError', message: 'Maximum call stack exceeded', occurrences: 28, usersAffected: 15 },
];

export const MOCK_SCATTER_DATA = [
  { loadTime: 120, bounceRate: 25, visitors: 450 },
  { loadTime: 250, bounceRate: 35, visitors: 320 },
  { loadTime: 180, bounceRate: 28, visitors: 520 },
  { loadTime: 450, bounceRate: 55, visitors: 180 },
  { loadTime: 320, bounceRate: 42, visitors: 280 },
  { loadTime: 150, bounceRate: 22, visitors: 620 },
  { loadTime: 280, bounceRate: 38, visitors: 380 },
  { loadTime: 380, bounceRate: 48, visitors: 220 },
  { loadTime: 200, bounceRate: 30, visitors: 480 },
  { loadTime: 520, bounceRate: 62, visitors: 120 },
];

// Stat card mock data
export const MOCK_STAT_DATA = {
  totalViews: 125430,
  previousViews: 118200,
  totalVisitors: 42850,
  previousVisitors: 39200,
  avgBounceRate: 38.5,
  previousBounceRate: 42.1,
  avgLoadTime: 1.85,
  previousLoadTime: 2.12,
};

// Function to simulate query execution with mock data
export function executeMockQuery(query: string, _dataSourceId: string): Record<string, unknown>[] {
  const lowerQuery = query.toLowerCase();

  // Match query patterns to return appropriate mock data
  if (lowerQuery.includes('group by date') || lowerQuery.includes('by day')) {
    return MOCK_TIMESERIES_DATA;
  }
  if (lowerQuery.includes('group by hour') || lowerQuery.includes('by hour')) {
    return MOCK_HOURLY_DATA;
  }
  if (lowerQuery.includes('group by country') || lowerQuery.includes('by country')) {
    return MOCK_COUNTRY_DATA;
  }
  if (lowerQuery.includes('group by device') || lowerQuery.includes('by device')) {
    return MOCK_DEVICE_DATA;
  }
  if (lowerQuery.includes('top pages') || lowerQuery.includes('group by path')) {
    return MOCK_TOP_PAGES_DATA;
  }
  if (lowerQuery.includes('endpoint') || lowerQuery.includes('api')) {
    return MOCK_API_ENDPOINTS_DATA;
  }
  if (lowerQuery.includes('error')) {
    return MOCK_ERROR_DATA;
  }
  if (lowerQuery.includes('scatter') || lowerQuery.includes('correlation')) {
    return MOCK_SCATTER_DATA;
  }

  // Default to timeseries data
  return MOCK_TIMESERIES_DATA;
}

// Helper to get a single stat value
export function getMockStatValue(key: keyof typeof MOCK_STAT_DATA): number {
  return MOCK_STAT_DATA[key];
}
