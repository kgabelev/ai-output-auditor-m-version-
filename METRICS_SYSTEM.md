# AOA R&D Metrics System - Implementation Guide

## Overview

The Metrics System is a comprehensive data layer that tracks AOA's (AP Invoice Auditor) performance improvements over time. It provides historical data, trend analysis, insights, and recommendations for the Improvement Dashboard.

**Architecture**: MVP using localStorage for offline capability, with upgrade path to backend API.

---

## System Components

### 1. **Data Model** (`src/types/metrics.ts`)

Core TypeScript interfaces:

- **`MonthlyMetrics`**: Aggregated performance data for a month
  - `straightThroughRate`: % of invoices posted without review
  - `falsePositiveRate`: % of items flagged that should have posted
  - `falseNegativeRate`: % of issues missed that posted anyway
  - `checkCategoryAccuracy[]`: Per-category performance data
  - `verdictAccuracy`: Accuracy by verdict type (POST, HOLD, ESCALATE, etc.)

- **`MetricsAnalysis`**: Complete analysis with trends and recommendations
  - Current month + previous month for comparison
  - Historical data (12+ months)
  - Calculated trends and insights
  - Auto-generated recommendations

- **`MetricsTrend`**: Individual trend with direction and % change
- **`InsightItem`**: Specific observation about a check's performance
- **`Recommendation`**: Actionable improvement suggestion with priority

### 2. **Historical Data** (`src/data/metricsHistory.ts`)

Pre-populated 6 months of data showing realistic improvement trajectory:

```
Month 1 (June):  65% straight-through, 8.2% FP, 2.1% FN
Month 2 (July):  68% straight-through, 6.8% FP, 1.9% FN
Month 3 (Aug):   71% straight-through, 5.4% FP, 1.8% FN
Month 4 (May):   62% straight-through, 9.5% FP, 2.3% FN [backfill]
Month 5 (Sept):  75% straight-through, 3.9% FP, 1.7% FN [projected]
Month 6 (Oct):   85% straight-through, 0.8% FP, 1.2% FN [projected]
```

Each month includes:
- Evaluation run metadata (batch size, invoices processed)
- Verdict accuracy by type
- Check category accuracy (6 categories: Duplicate Detection, Amount Reasonableness, etc.)
- Verdict distribution counts

### 3. **Storage Strategy** (`src/utils/metricsStorage.ts`)

**Interface-based design** allows swapping implementations:

```typescript
interface IMetricsStorage {
  load(): MetricsStorageSchema;
  save(data: MetricsStorageSchema): void;
  addMonth(metrics: MonthlyMetrics): void;
  getHistory(months?: number): MonthlyMetrics[];
  exportData(format: 'csv' | 'json'): ExportFormat;
}
```

**Implementations**:

1. **`LocalStorageMetricsStorage`** (MVP - Active)
   - Stores data in browser localStorage
   - No network required
   - ~100KB limit (plenty for 24 months)
   - Automatic fallback to initial data if storage unavailable

2. **`BackendMetricsStorage`** (Upgrade path)
   - Stub implementation ready for API integration
   - Replace API endpoints with your backend
   - Same interface, no component changes needed

**Usage**:
```typescript
import { metricsStorage } from '../utils/metricsStorage';

// Load current metrics
const data = metricsStorage.load();

// Add new month's data
metricsStorage.addMonth(newMetrics);

// Export for analysis
const csv = metricsStorage.exportData('csv');
```

### 4. **Analysis Engine** (`src/utils/metricsAnalysis.ts`)

Automatically calculates:

- **Trends**: Direction (improving/declining/stable) and % change for each metric
- **Insights**: Identifies checks performing well vs. needing work
- **Recommendations**: Prioritized list of improvements with suggested experiments

Key functions:
```typescript
calculateTrend(values, higherIsBetter)     // Returns direction + % change
generateTrends(history)                     // Calculates all metric trends
analyzeCheckCategories(current, previous)   // Categorizes performance
generateRecommendations(analysis)           // Creates actionable improvements
buildMetricsAnalysis(history)               // Full analysis from history
```

### 5. **Data Layer** (`src/utils/metricsDataLayer.ts`)

Business logic wrapper for operations:

```typescript
MetricsDataLayer.getCurrentMetrics()        // Get latest analysis
MetricsDataLayer.getHistoricalMetrics(12)  // Get last N months
MetricsDataLayer.addMonthMetrics(metrics)   // Add new month + recalculate
MetricsDataLayer.refreshAnalysis()          // Recalculate from current data
MetricsDataLayer.exportMetrics('csv')       // Export for external analysis
MetricsDataLayer.downloadMetrics('json')    // Trigger browser download
MetricsDataLayer.getGoalStatus()            // Check progress vs. targets
MetricsDataLayer.getSummary()               // Dashboard summary data
```

### 6. **React Hook** (`src/hooks/useMetrics.ts`)

Provides metrics to components:

```typescript
const { 
  analysis,           // Full MetricsAnalysis object
  history,            // MonthlyMetrics[] (last 12 months)
  isLoading,          // Loading state
  error,              // Error if load failed
  refresh,            // Manual refresh
  downloadMetrics,    // Export to file
  getGoalStatus,      // Check targets
  getSummary          // Dashboard summary
} = useMetrics();
```

### 7. **Improved Dashboard Component** (`src/components/ImprovementDashboard.tsx`)

Updated to use real metrics data:

- **Key Metrics Cards**: Show current values + trends vs. previous month
- **Check Category Performance**: Real accuracy data for each check
- **Getting Better / Needs Work**: Auto-generated insights from analysis
- **Monthly Trend Charts**: Real historical data with calculated averages
- **Research Roadmap**: Auto-generated recommendations with priorities
- **Export Buttons**: Download CSV or JSON for external analysis

---

## Usage

### For Components

```typescript
import { useMetrics } from '../hooks/useMetrics';

function MyComponent() {
  const { analysis, history, isLoading, error } = useMetrics();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Current Straight-Through Rate: {analysis.currentMonth.straightThroughRate}%</h2>
      <p>Improvement: {analysis.trends[0].percentageChange}%</p>
    </div>
  );
}
```

### For Calculations

```typescript
import { MetricsDataLayer } from '../utils/metricsDataLayer';

// Get current state
const analysis = MetricsDataLayer.getCurrentMetrics();

// Add a new month of data
const newMonth = {
  id: 'metrics-2026-11',
  date: '2026-11-01',
  // ... fill in other fields
};
const updated = MetricsDataLayer.addMonthMetrics(newMonth);

// Export data
MetricsDataLayer.downloadMetrics('csv');

// Check goals
const goals = MetricsDataLayer.getGoalStatus();
```

### For Storage

```typescript
import { metricsStorage } from '../utils/metricsStorage';

// Load
const data = metricsStorage.load();

// Save
metricsStorage.save(data);

// Export
const exported = metricsStorage.exportData('json');
const blob = new Blob([exported.content]);
```

---

## Data Flow

```
Historical Data (metricsHistory.ts)
        ↓
LocalStorageMetricsStorage (MVP)
        ↓
MetricsAnalysis Engine (analyzeMetrics)
        ↓
MetricsDataLayer (business logic)
        ↓
useMetrics Hook (React state)
        ↓
ImprovementDashboard (UI)
```

---

## Key Metrics Explained

### Straight-Through Rate (%)
- **Definition**: % of invoices that receive a POST verdict
- **Good**: 90%+ (minimal human review needed)
- **Poor**: <70% (too many holds/escalations)
- **Improvement Goal**: 95%

### False Positive Rate (%)
- **Definition**: % of flagged items that should have posted
- **Good**: <1% (accurate flagging)
- **Poor**: >5% (over-flagging, wastes time)
- **Improvement Goal**: <1%

### False Negative Rate (%)
- **Definition**: % of issues missed that posted anyway
- **Good**: <0.5% (catches most problems)
- **Poor**: >2% (missing real issues)
- **Improvement Goal**: <0.5%

### Check Accuracy (%)
- **Definition**: Pass rate for each check category
- **Categories**: Duplicate Detection, Amount Reasonableness, Cutoff Accrual, etc.
- **Per-category goals**: 95%+ accuracy

---

## Upgrade Path to Backend

### Step 1: Implement Backend API

```typescript
// Your backend should provide:
GET  /api/metrics/storage         // Get all metrics
POST /api/metrics/storage         // Save all metrics
POST /api/metrics/months          // Add new month
GET  /api/metrics/months?limit=12 // Get history
```

### Step 2: Update Backend Storage Class

```typescript
export class BackendMetricsStorage implements IMetricsStorage {
  async load(): Promise<MetricsStorageSchema> {
    const response = await fetch('/api/metrics/storage');
    return response.json();
  }

  async addMonth(metrics: MonthlyMetrics): Promise<void> {
    await fetch('/api/metrics/months', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metrics)
    });
  }
  // ... implement other methods
}
```

### Step 3: Switch Storage

```typescript
// In metricsStorage.ts
const useBackend = process.env.REACT_APP_BACKEND_ENABLED === 'true';
export const metricsStorage = createMetricsStorage(useBackend);
```

### Step 4: No Component Changes Needed

The interface abstraction means components continue to work unchanged!

---

## Testing & Validation

### Test Historical Data

```typescript
import { HISTORICAL_METRICS } from '../data/metricsHistory';

// Verify improvement trend
const first = HISTORICAL_METRICS[0];
const last = HISTORICAL_METRICS[HISTORICAL_METRICS.length - 1];

expect(last.straightThroughRate).toBeGreaterThan(first.straightThroughRate);
expect(last.falsePositiveRate).toBeLessThan(first.falsePositiveRate);
```

### Test Analysis

```typescript
import { buildMetricsAnalysis } from '../utils/metricsAnalysis';
import { HISTORICAL_METRICS } from '../data/metricsHistory';

const analysis = buildMetricsAnalysis(HISTORICAL_METRICS);

expect(analysis.trends.length).toBeGreaterThan(0);
expect(analysis.recommendations.length).toBeGreaterThan(0);
expect(analysis.insights.gettingBetter.length).toBeGreaterThan(0);
```

### Reset Metrics (for testing)

```typescript
import { MetricsDataLayer } from '../utils/metricsDataLayer';

// Reset to initial state
MetricsDataLayer.resetMetrics();

// Will reload initial data on next load
```

---

## Troubleshooting

### Metrics Not Loading

```typescript
// Check localStorage
console.log(localStorage.getItem('aoa_metrics_data'));

// Check browser console for errors
// useMetrics hook will set error state
```

### Trends Showing as "Stable"

Metrics with <2% change are classified as stable. Adjust threshold in `calculateTrend()` if needed.

### Recommendations Not Generating

- Check that analysis has categories with accuracy <80%
- Or false positive/negative rates outside thresholds
- Mock data includes several "needs work" categories

---

## File Structure

```
src/
├── types/
│   ├── index.ts                 # Core types (existing)
│   └── metrics.ts               # Metrics types (new)
├── data/
│   └── metricsHistory.ts        # Sample data (new)
├── utils/
│   ├── metricsStorage.ts        # Storage implementations (new)
│   ├── metricsAnalysis.ts       # Analysis engine (new)
│   └── metricsDataLayer.ts      # Business logic (new)
├── hooks/
│   └── useMetrics.ts            # React hook (new)
└── components/
    └── ImprovementDashboard.tsx # Updated to use metrics
```

---

## Next Steps

1. **Test the Dashboard**: View Improvement Tracking tab with real historical data
2. **Export Metrics**: Try CSV/JSON export functionality
3. **Add New Month**: Use `MetricsDataLayer.addMonthMetrics()` after monthly evaluation
4. **Backend Integration**: Follow upgrade path when ready
5. **Customize Thresholds**: Adjust improvement goals in `generateRecommendations()`

---

## Key Principles

- **Composable**: Each module has single responsibility
- **Testable**: Pure functions for calculations, mockable storage
- **Upgradeable**: Storage interface allows backend swap without code changes
- **Offline-First**: MVP works without internet, data persists locally
- **Real Data**: Historical data shows meaningful improvement trajectory
- **Actionable**: Recommendations have priorities and suggested experiments

---

## Support

For questions or issues:
1. Check component usage in `ImprovementDashboard.tsx`
2. Review sample data in `metricsHistory.ts`
3. Test with `MetricsDataLayer` utility functions
4. Check browser console for errors in `useMetrics` hook
