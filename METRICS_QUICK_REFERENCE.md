# AOA Metrics System - Quick Reference Guide

## Import Statements

```typescript
// React Hook
import { useMetrics } from './hooks/useMetrics';

// Business Logic
import { MetricsDataLayer } from './utils/metricsDataLayer';

// Storage
import { metricsStorage } from './utils/metricsStorage';

// Types
import type { MonthlyMetrics, MetricsAnalysis, Recommendation } from './types/metrics';

// Data
import { HISTORICAL_METRICS } from './data/metricsHistory';
```

## React Hook Usage

```typescript
function Dashboard() {
  const {
    analysis,           // MetricsAnalysis | null
    history,            // MonthlyMetrics[]
    isLoading,          // boolean
    error,              // Error | null
    refresh,            // () => void
    downloadMetrics,    // (format: 'csv' | 'json') => void
    exportMetrics,      // (format: 'csv' | 'json') => ExportFormat | null
    getGoalStatus,      // () => GoalStatus[]
    getSummary          // () => Summary
  } = useMetrics();
}
```

## Common Operations

### Get Current Metrics
```typescript
const analysis = MetricsDataLayer.getCurrentMetrics();
const currentMonth = analysis.currentMonth;
console.log(currentMonth.straightThroughRate); // 85
console.log(currentMonth.falsePositiveRate);   // 0.8
```

### Get Historical Data
```typescript
const last12Months = MetricsDataLayer.getHistoricalMetrics(12);
const last6Months = MetricsDataLayer.getHistoricalMetrics(6);
const allData = MetricsDataLayer.getHistoricalMetrics(100);
```

### Add New Month
```typescript
const newMonth: MonthlyMetrics = {
  id: 'metrics-2026-11',
  date: '2026-11-01',
  month: 11,
  year: 2026,
  straightThroughRate: 87,
  falsePositiveRate: 0.6,
  // ... other fields
};

const updated = MetricsDataLayer.addMonthMetrics(newMonth);
```

### Export Data
```typescript
// Get export objects
const csv = MetricsDataLayer.exportMetrics('csv');
const json = MetricsDataLayer.exportMetrics('json');

// Trigger browser download
MetricsDataLayer.downloadMetrics('csv');
MetricsDataLayer.downloadMetrics('json');
```

### Calculate Improvement
```typescript
const strImprovement = MetricsDataLayer.calculateImprovement('straightThroughRate');
const fpImprovement = MetricsDataLayer.calculateImprovement('falsePositiveRate');
const fnImprovement = MetricsDataLayer.calculateImprovement('falseNegativeRate');

// Returns: { start, current, change, percentageChange, isPositive }
console.log(`${strImprovement.start}% → ${strImprovement.current}%`);
```

### Check Goal Status
```typescript
const goals = MetricsDataLayer.getGoalStatus();
goals.forEach(goal => {
  console.log(`${goal.metricName}: ${goal.currentValue} / ${goal.targetValue}`);
  // Goals: 95% straight-through, <1% FP, <0.5% FN
});
```

### Get Category Insights
```typescript
const insight = MetricsDataLayer.getCategoryInsights('Duplicate Detection');
console.log(insight.current);   // Current month category data
console.log(insight.previous);  // Previous month category data
console.log(insight.trend);     // 'improving' | 'declining' | 'stable'
```

### Get Dashboard Summary
```typescript
const summary = MetricsDataLayer.getSummary();
// Returns:
// {
//   currentMonth: '2026-10-01',
//   invoicesEvaluated: 205,
//   straightThroughRate: 85,
//   falsePositiveRate: 0.8,
//   falseNegativeRate: 1.2,
//   trend: 'improving'
// }
```

### Refresh Analysis
```typescript
const updated = MetricsDataLayer.refreshAnalysis();
```

### Reset Metrics
```typescript
MetricsDataLayer.resetMetrics(); // Clears localStorage, reloads initial data
```

## Data Structure Cheatsheet

### MonthlyMetrics
```typescript
{
  id: string,
  date: string,                          // '2026-11-01'
  month: number,                         // 1-12
  year: number,
  straightThroughRate: number,           // 0-100
  falsePositiveRate: number,             // 0-100
  falseNegativeRate: number,             // 0-100
  verdictAccuracy: {
    POST: number,
    POST_WITH_REVIEW: number,
    HOLD: number,
    ESCALATE: number,
    REJECT: number
  },
  checkCategoryAccuracy: CheckCategoryAccuracy[],
  averageReviewTimeMinutes: number,
  totalInvoicesEvaluated: number,
  verdictDistribution: Record<Verdict, number>,
  evaluationRun: EvaluationRun
}
```

### MetricsAnalysis
```typescript
{
  runId: string,
  date: string,
  currentMonth: MonthlyMetrics,
  previousMonth?: MonthlyMetrics,
  monthlyHistory: MonthlyMetrics[],
  trends: MetricsTrend[],
  insights: {
    gettingBetter: InsightItem[],
    needsWork: InsightItem[],
    stable: InsightItem[]
  },
  recommendations: Recommendation[]
}
```

### MetricsTrend
```typescript
{
  metric: string,                        // 'straightThroughRate'
  label: string,                         // 'Straight-Through Rate (%)'
  data: { date: string; value: number }[],
  trend: 'improving' | 'declining' | 'stable',
  percentageChange: number,              // e.g., 20.5
  improvementGoal?: number               // e.g., 95
}
```

### Recommendation
```typescript
{
  priority: 'high' | 'medium' | 'low',
  title: string,                         // 'Reduce False Positive Rate'
  description: string,
  estimatedImpact: string,               // 'Reduce FP by 2-4%'
  targetMetric: string,                  // 'falsePositiveRate'
  suggestedExperiment?: string           // 'Run golden case set...'
}
```

## Storage API

```typescript
// Load all data
const data = metricsStorage.load();

// Save data
metricsStorage.save(data);

// Add/update month
metricsStorage.addMonth(metricsMonth);

// Get history
const months = metricsStorage.getHistory(12);

// Get current analysis
const analysis = metricsStorage.getCurrentAnalysis();

// Update analysis
metricsStorage.updateAnalysis(newAnalysis);

// Export
const exported = metricsStorage.exportData('csv'); // or 'json'

// Clear
metricsStorage.clear();
```

## localStorage Keys

```typescript
// Main storage key
'aoa_metrics_data'  // Contains full MetricsStorageSchema

// What's stored:
{
  version: '1.0.0',
  lastUpdated: '2026-11-15T10:30:00Z',
  monthlyHistory: MonthlyMetrics[],
  currentAnalysis: MetricsAnalysis,
  exportedAt?: string
}
```

## Analysis Functions

```typescript
import { 
  calculateTrend,
  generateTrends,
  analyzeCheckCategories,
  generateRecommendations,
  buildMetricsAnalysis
} from './utils/metricsAnalysis';

// Calculate single trend
const { trend, percentageChange } = calculateTrend([65, 68, 71, 75], true);

// Generate all trends from history
const trends = generateTrends(monthlyHistory);

// Analyze categories
const { gettingBetter, needsWork } = analyzeCheckCategories(current, previous);

// Generate recommendations
const recs = generateRecommendations(analysis);

// Build complete analysis
const fullAnalysis = buildMetricsAnalysis(monthlyHistory);
```

## Sample Data Access

```typescript
import { HISTORICAL_METRICS, INITIAL_METRICS_STATE } from './data/metricsHistory';

// Access 6 months of sample data
HISTORICAL_METRICS.forEach(month => {
  console.log(`${month.date}: ${month.straightThroughRate}%`);
});

// Get initial state
const initialState = INITIAL_METRICS_STATE;
```

## Component Integration Pattern

```typescript
import { useMetrics } from './hooks/useMetrics';

export function ImprovementDashboard() {
  const { analysis, isLoading, error } = useMetrics();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!analysis) return null;

  return (
    <div>
      <MetricCard value={analysis.currentMonth.straightThroughRate} />
      <TrendChart data={analysis.trends} />
      <InsightsList insights={analysis.insights} />
      <RecommendationsList recs={analysis.recommendations} />
    </div>
  );
}
```

## TypeScript Types to Know

```typescript
type Verdict = 'POST' | 'POST_WITH_REVIEW' | 'HOLD' | 'ESCALATE' | 'REJECT';
type Trend = 'improving' | 'declining' | 'stable';
type Priority = 'high' | 'medium' | 'low';
type ExportFormat = 'csv' | 'json';
```

## Console Testing

```typescript
// In browser console (F12):
const { MetricsDataLayer } = await import('./utils/metricsDataLayer.ts');
const analysis = MetricsDataLayer.getCurrentMetrics();
console.log(analysis);

// Check localStorage
console.log(JSON.parse(localStorage.getItem('aoa_metrics_data')));

// Reset and reload
MetricsDataLayer.resetMetrics();
location.reload();
```

## Environment Setup

```typescript
// Create metrics file structure:
src/
├── types/metrics.ts
├── data/metricsHistory.ts
├── utils/
│   ├── metricsStorage.ts
│   ├── metricsAnalysis.ts
│   └── metricsDataLayer.ts
├── hooks/useMetrics.ts
└── examples/metricsUsageExample.ts
```

## Common Patterns

### Display Current Metrics
```typescript
const { analysis } = useMetrics();
<h2>{analysis.currentMonth.straightThroughRate}%</h2>
```

### Show Trend with Direction
```typescript
const trend = analysis.trends.find(t => t.metric === 'straightThroughRate');
<p>{trend.trend === 'improving' ? '↑' : '↓'} {trend.percentageChange}%</p>
```

### List Recommendations
```typescript
analysis.recommendations.map(rec => (
  <div key={rec.title}>
    <h3>{rec.title}</h3>
    <p>{rec.description}</p>
  </div>
))
```

### Export Data
```typescript
<button onClick={() => downloadMetrics('csv')}>
  Export CSV
</button>
```

### Check Goal Progress
```typescript
const goals = getGoalStatus();
goals.forEach(goal => {
  const percent = (goal.percentToGoal).toFixed(0);
  <ProgressBar value={percent} max={100} />
})
```

## Performance Tips

1. **Lazy Load**: Use `useMetrics()` only in components that need it
2. **Memoize**: Wrap analysis access in `useMemo` if used multiple times
3. **Export Offline**: Export doesn't need network, can be cached
4. **Batch Updates**: Add multiple months before recalculating
5. **Check Selectors**: Use specific history lengths (6 vs 24 months)

## Debugging

```typescript
// Enable verbose logging
window.DEBUG_METRICS = true;

// Check what's stored
localStorage.getItem('aoa_metrics_data');

// Validate data structure
import { HISTORICAL_METRICS } from './data/metricsHistory';
console.log('Sample data length:', HISTORICAL_METRICS.length);
console.log('Fields:', Object.keys(HISTORICAL_METRICS[0]));

// Test analysis
import { buildMetricsAnalysis } from './utils/metricsAnalysis';
const test = buildMetricsAnalysis(HISTORICAL_METRICS);
console.log('Trends:', test.trends.length);
console.log('Recommendations:', test.recommendations.length);
```

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot read metrics` | localStorage blocked | Check privacy settings |
| `Analysis is undefined` | useMetrics still loading | Check `isLoading` state |
| `No trends found` | <2 months data | Add more months |
| `Export failed` | Pop-up blocker | Allow pop-ups from site |
| `Old data showing` | Stale cache | Clear cache & reload |

---

**Last Updated**: August 2026  
**Version**: 1.0.0  
**Status**: Production Ready
