/**
 * Metrics Analysis Utilities
 * Calculates trends, insights, and recommendations from historical data
 */

import type {
  MonthlyMetrics,
  MetricsTrend,
  MetricsAnalysis,
  InsightItem,
  Recommendation,
} from '../types/metrics';

/**
 * Calculate trend direction and percentage change
 */
export function calculateTrend(
  values: number[],
  higherIsBetter: boolean = true
): {
  trend: 'improving' | 'declining' | 'stable';
  percentageChange: number;
} {
  if (values.length < 2) {
    return { trend: 'stable', percentageChange: 0 };
  }

  const first = values[0];
  const last = values[values.length - 1];
  const change = last - first;
  const percentageChange = ((change / first) * 100).toFixed(1);

  const threshold = 2; // % threshold for "stable"

  if (Math.abs(Number(percentageChange)) < threshold) {
    return { trend: 'stable', percentageChange: Number(percentageChange) };
  }

  const isImproving = higherIsBetter ? change > 0 : change < 0;

  return {
    trend: isImproving ? 'improving' : 'declining',
    percentageChange: Number(percentageChange),
  };
}

/**
 * Extract metric values from history for trend calculation
 */
function extractMetricValues(
  history: MonthlyMetrics[],
  metricKey: keyof MonthlyMetrics
): number[] {
  return history
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((m) => {
      const value = m[metricKey];
      if (typeof value === 'number') return value;
      return 0;
    });
}

/**
 * Generate trends from historical metrics
 */
export function generateTrends(history: MonthlyMetrics[]): MetricsTrend[] {
  if (history.length < 2) return [];

  const trends: MetricsTrend[] = [];
  const sorted = [...history].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Straight-through rate trend
  const strValues = extractMetricValues(sorted, 'straightThroughRate');
  const strTrend = calculateTrend(strValues, true);
  trends.push({
    metric: 'straightThroughRate',
    label: 'Straight-Through Rate (%)',
    data: sorted.map((m, i) => ({
      date: m.date,
      value: strValues[i],
    })),
    trend: strTrend.trend,
    percentageChange: strTrend.percentageChange,
    improvementGoal: 95, // Target for straight-through
  });

  // False positive rate trend
  const fpValues = extractMetricValues(sorted, 'falsePositiveRate');
  const fpTrend = calculateTrend(fpValues, false); // lower is better
  trends.push({
    metric: 'falsePositiveRate',
    label: 'False Positive Rate (%)',
    data: sorted.map((m, i) => ({
      date: m.date,
      value: fpValues[i],
    })),
    trend: fpTrend.trend,
    percentageChange: fpTrend.percentageChange,
    improvementGoal: 1, // Target false positive rate
  });

  // False negative rate trend
  const fnValues = extractMetricValues(sorted, 'falseNegativeRate');
  const fnTrend = calculateTrend(fnValues, false); // lower is better
  trends.push({
    metric: 'falseNegativeRate',
    label: 'False Negative Rate (%)',
    data: sorted.map((m, i) => ({
      date: m.date,
      value: fnValues[i],
    })),
    trend: fnTrend.trend,
    percentageChange: fnTrend.percentageChange,
    improvementGoal: 0.5, // Target false negative rate
  });

  // Average review time trend
  const artValues = extractMetricValues(sorted, 'averageReviewTimeMinutes');
  const artTrend = calculateTrend(artValues, false); // lower is better
  trends.push({
    metric: 'averageReviewTimeMinutes',
    label: 'Avg Review Time (minutes)',
    data: sorted.map((m, i) => ({
      date: m.date,
      value: artValues[i],
    })),
    trend: artTrend.trend,
    percentageChange: artTrend.percentageChange,
  });

  return trends;
}

/**
 * Analyze check category performance
 */
export function analyzeCheckCategories(
  currentMonth: MonthlyMetrics,
  previousMonth?: MonthlyMetrics
): { gettingBetter: InsightItem[]; needsWork: InsightItem[] } {
  const insights = { gettingBetter: [] as InsightItem[], needsWork: [] as InsightItem[] };

  const categoriesMap = new Map<string, { current: number; previous?: number }>();

  // Collect current month data
  currentMonth.checkCategoryAccuracy.forEach((cat) => {
    categoriesMap.set(cat.category, { current: cat.passRate });
  });

  // Add previous month data if available
  if (previousMonth) {
    previousMonth.checkCategoryAccuracy.forEach((cat) => {
      const existing = categoriesMap.get(cat.category);
      if (existing) {
        existing.previous = cat.passRate;
      }
    });
  }

  // Categorize improvements
  categoriesMap.forEach((values, category) => {
    const change = values.previous ? values.current - values.previous : 0;
    const changePercent = values.previous ? ((change / values.previous) * 100).toFixed(1) : '0';

    const insight: InsightItem = {
      checkName: category,
      currentValue: values.current,
      previousValue: values.previous,
      changePercent: Number(changePercent),
      description: formatInsightDescription(category, values.current, change),
    };

    if (values.current >= 95) {
      insights.gettingBetter.push(insight);
    } else if (values.current < 75) {
      insights.needsWork.push(insight);
    }
  });

  // Sort by impact
  insights.gettingBetter.sort((a, b) => b.changePercent - a.changePercent);
  insights.needsWork.sort((a, b) => a.currentValue - b.currentValue);

  return insights;
}

function formatInsightDescription(category: string, passRate: number, change: number): string {
  if (passRate >= 95) {
    return `Excellent performance at ${passRate.toFixed(1)}%. Minimal false positives.`;
  } else if (passRate >= 85) {
    return `Good performance at ${passRate.toFixed(1)}%. Room for optimization.`;
  } else if (change > 0) {
    return `Improving trend. Current rate ${passRate.toFixed(1)}%, up ${change.toFixed(1)} points.`;
  } else if (change < 0) {
    return `Needs attention. Current rate ${passRate.toFixed(1)}%, down ${Math.abs(change).toFixed(1)} points.`;
  }
  return `Current performance at ${passRate.toFixed(1)}%.`;
}

/**
 * Generate recommendations based on current state
 */
export function generateRecommendations(analysis: MetricsAnalysis): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const current = analysis.currentMonth;

  // High false positive rate
  if (current.falsePositiveRate > 3) {
    recommendations.push({
      priority: 'high',
      title: 'Reduce False Positive Rate',
      description: `Current FP rate is ${current.falsePositiveRate.toFixed(1)}%. Investigate most common false flags.`,
      estimatedImpact: 'Reduce FP by 2-4%',
      targetMetric: 'falsePositiveRate',
      suggestedExperiment:
        'Run golden case set on top 3 flagging categories with stakeholders',
    });
  }

  // Low straight-through rate
  if (current.straightThroughRate < 75) {
    recommendations.push({
      priority: 'high',
      title: 'Improve Straight-Through Rate',
      description: `Only ${current.straightThroughRate.toFixed(1)}% of invoices post without review. Identify unnecessary holds.`,
      estimatedImpact: 'Increase straight-through by 8-12%',
      targetMetric: 'straightThroughRate',
      suggestedExperiment: 'Analyze HOLD verdicts for over-flagging patterns',
    });
  }

  // Problematic categories
  const weakCategories = current.checkCategoryAccuracy
    .filter((cat) => cat.passRate < 80)
    .sort((a, b) => a.passRate - b.passRate)
    .slice(0, 3);

  weakCategories.forEach((cat) => {
    recommendations.push({
      priority: cat.passRate < 70 ? 'high' : 'medium',
      title: `Calibrate ${cat.category}`,
      description: `Pass rate at ${cat.passRate.toFixed(1)}%. Review threshold and rules with business stakeholders.`,
      estimatedImpact: `Improve ${cat.category} accuracy by 5-8%`,
      targetMetric: `checkCategory-${cat.category}`,
      suggestedExperiment: `Review last 20 ${cat.category} flags with process owner`,
    });
  });

  // High false negative rate
  if (current.falseNegativeRate > 1.5) {
    recommendations.push({
      priority: 'medium',
      title: 'Investigate False Negatives',
      description: `Missing ${current.falseNegativeRate.toFixed(1)}% of issues. Review missed cases.`,
      estimatedImpact: 'Reduce FN by 0.5-1%',
      targetMetric: 'falseNegativeRate',
      suggestedExperiment: 'Analyze 10 most recent false negatives for patterns',
    });
  }

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

/**
 * Build complete analysis from history
 */
export function buildMetricsAnalysis(history: MonthlyMetrics[]): MetricsAnalysis {
  if (history.length === 0) {
    throw new Error('No historical metrics available');
  }

  const sorted = [...history].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const currentMonth = sorted[sorted.length - 1];
  const previousMonth = sorted.length > 1 ? sorted[sorted.length - 2] : undefined;

  const trends = generateTrends(sorted);
  const categoryInsights = analyzeCheckCategories(currentMonth, previousMonth);
  const recommendations = generateRecommendations({
    runId: currentMonth.evaluationRun.id,
    date: new Date().toISOString(),
    currentMonth,
    previousMonth,
    monthlyHistory: sorted,
    trends,
    insights: { ...categoryInsights, stable: [] },
    recommendations: [],
  });

  return {
    runId: currentMonth.evaluationRun.id,
    date: new Date().toISOString(),
    currentMonth,
    previousMonth,
    monthlyHistory: sorted,
    trends,
    insights: {
      gettingBetter: categoryInsights.gettingBetter,
      needsWork: categoryInsights.needsWork,
      stable: [],
    },
    recommendations,
  };
}
