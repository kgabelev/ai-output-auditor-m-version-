/**
 * Metrics System Usage Examples
 * Shows how to use the metrics system in different scenarios
 */

import { MetricsDataLayer } from '../utils/metricsDataLayer';
import { metricsStorage } from '../utils/metricsStorage';
import type { MonthlyMetrics, EvaluationRun } from '../types/metrics';

// ============================================================================
// Example 1: Get Current Metrics for Dashboard Display
// ============================================================================
export function example_displayDashboardMetrics() {
  console.log('=== Example 1: Display Dashboard Metrics ===');

  // This is what the useMetrics hook does internally
  const analysis = MetricsDataLayer.getCurrentMetrics();

  console.log('Current Month:', analysis.currentMonth.date);
  console.log('Straight-Through Rate:', analysis.currentMonth.straightThroughRate + '%');
  console.log('False Positive Rate:', analysis.currentMonth.falsePositiveRate + '%');
  console.log('False Negative Rate:', analysis.currentMonth.falseNegativeRate + '%');

  // Get trends
  const strTrend = analysis.trends.find((t) => t.metric === 'straightThroughRate');
  if (strTrend) {
    console.log(`Trend: ${strTrend.trend} (${strTrend.percentageChange}%)`);
  }

  // Get recommendations
  console.log('Top 3 Recommendations:');
  analysis.recommendations.slice(0, 3).forEach((rec, i) => {
    console.log(`  ${i + 1}. ${rec.title} (Priority: ${rec.priority})`);
  });
}

// ============================================================================
// Example 2: Record a New Month's Evaluation Results
// ============================================================================
export function example_recordNewMonth() {
  console.log('=== Example 2: Record New Month ===');

  // After running evaluations in November 2026, record the metrics
  const novemberMetrics: MonthlyMetrics = {
    id: 'metrics-2026-11',
    date: '2026-11-01',
    month: 11,
    year: 2026,
    evaluationRun: {
      id: 'eval-2026-11-15',
      date: '2026-11-15',
      month: 11,
      year: 2026,
      batchSize: 210,
      totalInvoicesProcessed: 840,
      createdAt: new Date().toISOString(),
    },
    straightThroughRate: 87,
    verdictAccuracy: {
      POST: 87,
      POST_WITH_REVIEW: 82,
      HOLD: 78,
      ESCALATE: 80,
      REJECT: 94,
    },
    falsePositiveRate: 0.6,
    falseNegativeRate: 1.1,
    checkCategoryAccuracy: [
      {
        category: 'Duplicate Detection',
        passRate: 90,
        flagRate: 10,
        checksPerformed: 150,
        checksPass: 135,
        checksFail: 15,
      },
      {
        category: 'Amount Reasonableness',
        passRate: 91,
        flagRate: 9,
        checksPerformed: 165,
        checksPass: 150,
        checksFail: 15,
      },
      // ... add all 6 categories
    ],
    averageReviewTimeMinutes: 11,
    totalInvoicesEvaluated: 210,
    verdictDistribution: {
      POST: 183,
      POST_WITH_REVIEW: 18,
      HOLD: 6,
      ESCALATE: 2,
      REJECT: 1,
    },
  };

  // Record and recalculate analysis
  const updated = MetricsDataLayer.addMonthMetrics(novemberMetrics);

  console.log('New month recorded successfully');
  console.log('Updated straight-through rate:', updated.currentMonth.straightThroughRate);
  console.log('Number of recommendations:', updated.recommendations.length);
}

// ============================================================================
// Example 3: Export Metrics for External Analysis
// ============================================================================
export function example_exportMetrics() {
  console.log('=== Example 3: Export Metrics ===');

  // Export as CSV for Excel analysis
  const csv = MetricsDataLayer.exportMetrics('csv');
  console.log('CSV Export:');
  console.log('Filename:', csv.filename);
  console.log('First 200 chars:', csv.content.substring(0, 200));

  // Export as JSON for programmatic use
  const json = MetricsDataLayer.exportMetrics('json');
  console.log('\nJSON Export:');
  console.log('Filename:', json.filename);
  console.log('Size:', json.content.length, 'bytes');

  // Trigger download in browser
  // MetricsDataLayer.downloadMetrics('csv');
}

// ============================================================================
// Example 4: Analyze Improvement Progress
// ============================================================================
export function example_analyzeImprovement() {
  console.log('=== Example 4: Analyze Improvement ===');

  // Check progress on key metrics
  const strImprovement = MetricsDataLayer.calculateImprovement('straightThroughRate');
  console.log(
    `Straight-Through: ${strImprovement.start}% → ${strImprovement.current}% (${strImprovement.percentageChange > 0 ? '+' : ''}${strImprovement.percentageChange.toFixed(1)}%)`
  );

  const fpImprovement = MetricsDataLayer.calculateImprovement('falsePositiveRate');
  console.log(
    `False Positive: ${fpImprovement.start.toFixed(1)}% → ${fpImprovement.current.toFixed(1)}% (${fpImprovement.percentageChange.toFixed(1)}%)`
  );

  // Check if metrics are on track to goals
  const goalStatus = MetricsDataLayer.getGoalStatus();
  goalStatus.forEach((goal) => {
    const status = goal.onTrack ? '✓' : '✗';
    console.log(
      `${status} ${goal.metricName}: ${goal.currentValue.toFixed(1)} / ${goal.targetValue} (${goal.percentToGoal.toFixed(0)}%)`
    );
  });
}

// ============================================================================
// Example 5: Get Category-Specific Insights
// ============================================================================
export function example_categorInsights() {
  console.log('=== Example 5: Category-Specific Insights ===');

  const duplicateInsight = MetricsDataLayer.getCategoryInsights('Duplicate Detection');
  console.log('Duplicate Detection:');
  console.log('  Current:', duplicateInsight.current?.checkCategoryAccuracy.find((c) => c.category === 'Duplicate Detection'));
  console.log('  Previous:', duplicateInsight.previous?.checkCategoryAccuracy.find((c) => c.category === 'Duplicate Detection'));
  console.log('  Trend:', duplicateInsight.trend);
}

// ============================================================================
// Example 6: Get Summary for Header/Badge
// ============================================================================
export function example_dashboardSummary() {
  console.log('=== Example 6: Dashboard Summary ===');

  const summary = MetricsDataLayer.getSummary();
  console.log('Current Month:', summary.currentMonth);
  console.log('Invoices Evaluated:', summary.invoicesEvaluated);
  console.log('Straight-Through Rate:', summary.straightThroughRate + '%');
  console.log('Trend:', summary.trend);

  // Use in dashboard header to show quick metrics
  return summary;
}

// ============================================================================
// Example 7: Custom Analysis with Raw Data
// ============================================================================
export function example_customAnalysis() {
  console.log('=== Example 7: Custom Analysis ===');

  // Get all historical data
  const history = MetricsDataLayer.getHistoricalMetrics(24); // Last 2 years

  // Do custom calculations
  const avgStraightThrough = history.reduce((sum, m) => sum + m.straightThroughRate, 0) / history.length;
  const avgFP = history.reduce((sum, m) => sum + m.falsePositiveRate, 0) / history.length;

  console.log('Average Straight-Through (24 months):', avgStraightThrough.toFixed(1) + '%');
  console.log('Average False Positive (24 months):', avgFP.toFixed(2) + '%');

  // Find best and worst performing months
  const best = history.reduce((max, m) => (m.straightThroughRate > max.straightThroughRate ? m : max));
  const worst = history.reduce((min, m) => (m.straightThroughRate < min.straightThroughRate ? m : min));

  console.log('Best Month:', best.date, best.straightThroughRate + '%');
  console.log('Worst Month:', worst.date, worst.straightThroughRate + '%');
}

// ============================================================================
// Example 8: Direct Storage Access
// ============================================================================
export function example_storageAccess() {
  console.log('=== Example 8: Direct Storage Access ===');

  // Load all stored data
  const stored = metricsStorage.load();
  console.log('Storage version:', stored.version);
  console.log('Last updated:', stored.lastUpdated);
  console.log('Months in storage:', stored.monthlyHistory.length);

  // Get only last 6 months
  const sixMonths = metricsStorage.getHistory(6);
  console.log('Last 6 months:', sixMonths.map((m) => m.date));

  // Get current analysis
  const currentAnalysis = metricsStorage.getCurrentAnalysis();
  console.log('Current analysis date:', currentAnalysis.date);
}

// ============================================================================
// Example 9: Refresh Analysis After External Update
// ============================================================================
export function example_refreshAnalysis() {
  console.log('=== Example 9: Refresh Analysis ===');

  // After some external process updates metrics (e.g., webhook from backend)
  // Manually refresh the analysis
  const updated = MetricsDataLayer.refreshAnalysis();

  console.log('Analysis refreshed at:', updated.date);
  console.log('New recommendations count:', updated.recommendations.length);
  console.log('Insights - Getting Better:', updated.insights.gettingBetter.length);
  console.log('Insights - Needs Work:', updated.insights.needsWork.length);
}

// ============================================================================
// Example 10: Reset for Testing
// ============================================================================
export function example_resetMetrics() {
  console.log('=== Example 10: Reset Metrics ===');

  // Clear all metrics and reload initial data
  MetricsDataLayer.resetMetrics();

  const reset = MetricsDataLayer.getCurrentMetrics();
  console.log('Metrics reset to initial state');
  console.log('Current month:', reset.currentMonth.date);
  console.log('Straight-through rate:', reset.currentMonth.straightThroughRate + '%');
}

// ============================================================================
// Run Examples
// ============================================================================
export function runAllExamples() {
  try {
    example_displayDashboardMetrics();
    console.log('\n');

    example_analyzeImprovement();
    console.log('\n');

    example_categorInsights();
    console.log('\n');

    example_dashboardSummary();
    console.log('\n');

    example_customAnalysis();
    console.log('\n');

    example_storageAccess();
    console.log('\n');

    // Don't run these as they modify state
    // example_recordNewMonth();
    // example_exportMetrics();
    // example_refreshAnalysis();
    // example_resetMetrics();
  } catch (error) {
    console.error('Error running examples:', error);
  }
}

// To use in browser console:
// import { runAllExamples } from './examples/metricsUsageExample';
// runAllExamples();
