/**
 * Metrics Data Layer - Business Logic
 * Manages metrics data lifecycle, calculations, and persistence
 * Can be used from React components or backend services
 */

import { metricsStorage } from './metricsStorage';
import { buildMetricsAnalysis, generateRecommendations } from './metricsAnalysis';
import type { MonthlyMetrics, MetricsAnalysis, ExportFormat } from '../types/metrics';

export class MetricsDataLayer {
  /**
   * Load current metrics state
   */
  static getCurrentMetrics(): MetricsAnalysis {
    try {
      const storage = metricsStorage.load();
      return storage.currentAnalysis;
    } catch (error) {
      console.error('Failed to load current metrics:', error);
      throw error;
    }
  }

  /**
   * Get historical metrics (default: last 12 months)
   */
  static getHistoricalMetrics(months: number = 12): MonthlyMetrics[] {
    return metricsStorage.getHistory(months);
  }

  /**
   * Add a new month's metrics and recalculate analysis
   */
  static addMonthMetrics(metrics: MonthlyMetrics): MetricsAnalysis {
    metricsStorage.addMonth(metrics);

    // Recalculate analysis with updated history
    const history = metricsStorage.getHistory(24);
    const analysis = buildMetricsAnalysis(history);

    // Save updated analysis
    metricsStorage.updateAnalysis(analysis);

    return analysis;
  }

  /**
   * Refresh analysis based on current data
   * (e.g., after receiving feedback about accuracy)
   */
  static refreshAnalysis(): MetricsAnalysis {
    const history = metricsStorage.getHistory(24);
    const analysis = buildMetricsAnalysis(history);
    metricsStorage.updateAnalysis(analysis);
    return analysis;
  }

  /**
   * Export metrics in specified format
   */
  static exportMetrics(format: 'csv' | 'json'): ExportFormat {
    return metricsStorage.exportData(format);
  }

  /**
   * Get download URL and trigger download
   */
  static downloadMetrics(format: 'csv' | 'json'): void {
    const exported = this.exportMetrics(format);

    // Create blob
    const blob = new Blob([exported.content], {
      type: format === 'json' ? 'application/json' : 'text/csv',
    });

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = exported.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Get specific insights for a category
   */
  static getCategoryInsights(category: string): {
    current: MonthlyMetrics | undefined;
    previous: MonthlyMetrics | undefined;
    trend: 'improving' | 'declining' | 'stable' | 'unknown';
  } {
    const analysis = this.getCurrentMetrics();
    const current = analysis.currentMonth;
    const previous = analysis.previousMonth;

    const currentCat = current.checkCategoryAccuracy.find((c) => c.category === category);
    const previousCat = previous?.checkCategoryAccuracy.find((c) => c.category === category);

    let trend: 'improving' | 'declining' | 'stable' | 'unknown' = 'unknown';
    if (currentCat && previousCat) {
      const change = currentCat.passRate - previousCat.passRate;
      if (Math.abs(change) < 2) {
        trend = 'stable';
      } else {
        trend = change > 0 ? 'improving' : 'declining';
      }
    }

    return { current, previous, trend };
  }

  /**
   * Calculate improvement since period start
   */
  static calculateImprovement(
    metric: 'straightThroughRate' | 'falsePositiveRate' | 'falseNegativeRate'
  ): {
    start: number;
    current: number;
    change: number;
    percentageChange: number;
    isPositive: boolean;
  } {
    const history = this.getHistoricalMetrics(24);
    if (history.length === 0) {
      return { start: 0, current: 0, change: 0, percentageChange: 0, isPositive: false };
    }

    const first = history[0][metric];
    const last = history[history.length - 1][metric];
    const change = last - first;
    const percentageChange = first !== 0 ? (change / first) * 100 : 0;

    // For false positive/negative rates, lower is better
    const isPositive =
      metric === 'straightThroughRate' ? change > 0 : change < 0;

    return {
      start: first,
      current: last,
      change,
      percentageChange,
      isPositive,
    };
  }

  /**
   * Check if system is meeting improvement goals
   */
  static getGoalStatus(): {
    metricName: string;
    currentValue: number;
    targetValue: number;
    percentToGoal: number;
    onTrack: boolean;
  }[] {
    const current = this.getCurrentMetrics().currentMonth;

    return [
      {
        metricName: 'Straight-Through Rate',
        currentValue: current.straightThroughRate,
        targetValue: 95,
        percentToGoal: Math.min(100, (current.straightThroughRate / 95) * 100),
        onTrack: current.straightThroughRate >= 85,
      },
      {
        metricName: 'False Positive Rate',
        currentValue: current.falsePositiveRate,
        targetValue: 1,
        percentToGoal: Math.min(100, ((1 / (current.falsePositiveRate + 1)) * 1) * 100),
        onTrack: current.falsePositiveRate <= 1.5,
      },
      {
        metricName: 'False Negative Rate',
        currentValue: current.falseNegativeRate,
        targetValue: 0.5,
        percentToGoal: Math.min(100, ((0.5 / (current.falseNegativeRate + 1)) * 1) * 100),
        onTrack: current.falseNegativeRate <= 0.8,
      },
    ];
  }

  /**
   * Reset all metrics (for testing/reset scenario)
   */
  static resetMetrics(): void {
    metricsStorage.clear();
  }

  /**
   * Get metrics summary for dashboard header
   */
  static getSummary(): {
    currentMonth: string;
    invoicesEvaluated: number;
    straightThroughRate: number;
    falsePositiveRate: number;
    falseNegativeRate: number;
    trend: string;
  } {
    const current = this.getCurrentMetrics().currentMonth;
    const history = this.getHistoricalMetrics(24);

    let trend = 'stable';
    if (history.length > 1) {
      const prev = history[history.length - 2];
      const strChange = current.straightThroughRate - prev.straightThroughRate;
      if (strChange > 3) trend = 'improving';
      else if (strChange < -3) trend = 'declining';
    }

    return {
      currentMonth: current.date,
      invoicesEvaluated: current.totalInvoicesEvaluated,
      straightThroughRate: current.straightThroughRate,
      falsePositiveRate: current.falsePositiveRate,
      falseNegativeRate: current.falseNegativeRate,
      trend,
    };
  }
}
