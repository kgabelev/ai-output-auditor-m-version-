/**
 * Metrics Storage Strategy
 * MVP: localStorage (offline, browser-based)
 * Upgrade Path: Backend API (replace localStorage calls with API calls)
 */

import type { MonthlyMetrics, MetricsStorageSchema, ExportFormat, MetricsAnalysis } from '../types/metrics';
import { INITIAL_METRICS_STATE } from '../data/metricsHistory';

const STORAGE_KEY = 'aoa_metrics_data';
const STORAGE_VERSION = '1.0.0';

/**
 * Storage interface allows easy upgrade from localStorage to backend
 */
export interface IMetricsStorage {
  load(): MetricsStorageSchema;
  save(data: MetricsStorageSchema): void;
  addMonth(metrics: MonthlyMetrics): void;
  getHistory(months?: number): MonthlyMetrics[];
  getCurrentAnalysis(): MetricsAnalysis;
  updateAnalysis(analysis: MetricsAnalysis): void;
  exportData(format: 'csv' | 'json'): ExportFormat;
  clear(): void;
}

/**
 * localStorage Implementation (MVP)
 * Provides offline storage with no backend required
 */
export class LocalStorageMetricsStorage implements IMetricsStorage {
  constructor(private storageKey: string = STORAGE_KEY) {}

  load(): MetricsStorageSchema {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load metrics from localStorage:', error);
    }

    // Return initial data if nothing stored
    return INITIAL_METRICS_STATE;
  }

  save(data: MetricsStorageSchema): void {
    try {
      data.lastUpdated = new Date().toISOString();
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save metrics to localStorage:', error);
      // Fail silently - app continues to work with in-memory data
    }
  }

  addMonth(metrics: MonthlyMetrics): void {
    const data = this.load();

    // Check if this month already exists
    const existingIdx = data.monthlyHistory.findIndex(
      (m) => m.month === metrics.month && m.year === metrics.year
    );

    if (existingIdx >= 0) {
      // Update existing month
      data.monthlyHistory[existingIdx] = metrics;
    } else {
      // Add new month
      data.monthlyHistory.push(metrics);
      // Keep only last 24 months
      if (data.monthlyHistory.length > 24) {
        data.monthlyHistory = data.monthlyHistory.slice(-24);
      }
    }

    // Update current analysis
    data.monthlyHistory.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    data.currentAnalysis.currentMonth = metrics;
    data.currentAnalysis.monthlyHistory = data.monthlyHistory;
    if (data.monthlyHistory.length > 1) {
      data.currentAnalysis.previousMonth =
        data.monthlyHistory[data.monthlyHistory.length - 2];
    }

    this.save(data);
  }

  getHistory(months: number = 12): MonthlyMetrics[] {
    const data = this.load();
    const history = data.monthlyHistory.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    return history.slice(-months);
  }

  getCurrentAnalysis(): MetricsAnalysis {
    const data = this.load();
    return data.currentAnalysis;
  }

  updateAnalysis(analysis: MetricsAnalysis): void {
    const data = this.load();
    data.currentAnalysis = analysis;
    this.save(data);
  }

  exportData(format: 'csv' | 'json'): ExportFormat {
    const data = this.load();
    const timestamp = new Date().toISOString().split('T')[0];

    if (format === 'json') {
      return {
        type: 'json',
        filename: `aoa-metrics-${timestamp}.json`,
        content: JSON.stringify(data, null, 2),
      };
    }

    // CSV format
    const csvHeader =
      'Date,Month,Year,Straight-Through Rate (%),False Positive Rate (%),False Negative Rate (%),' +
      'POST Accuracy (%),POST_WITH_REVIEW Accuracy (%),HOLD Accuracy (%),' +
      'ESCALATE Accuracy (%),REJECT Accuracy (%),Total Evaluated\n';

    const csvRows = data.monthlyHistory
      .map((m) => {
        const accuracy = m.verdictAccuracy;
        return [
          m.date,
          m.month,
          m.year,
          m.straightThroughRate.toFixed(1),
          m.falsePositiveRate.toFixed(1),
          m.falseNegativeRate.toFixed(1),
          accuracy.POST.toFixed(1),
          accuracy.POST_WITH_REVIEW.toFixed(1),
          accuracy.HOLD.toFixed(1),
          accuracy.ESCALATE.toFixed(1),
          accuracy.REJECT.toFixed(1),
          m.totalInvoicesEvaluated,
        ].join(',');
      })
      .join('\n');

    return {
      type: 'csv',
      filename: `aoa-metrics-${timestamp}.csv`,
      content: csvHeader + csvRows,
    };
  }

  clear(): void {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error('Failed to clear metrics from localStorage:', error);
    }
  }
}

/**
 * Backend Storage Adapter (Upgrade Path)
 * Replace this with actual API calls when backend is ready
 */
export class BackendMetricsStorage implements IMetricsStorage {
  constructor(private apiBaseUrl: string = '/api/metrics') {}

  async load(): Promise<MetricsStorageSchema> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/storage`);
      if (!response.ok) throw new Error('Failed to load metrics');
      return response.json();
    } catch (error) {
      console.error('Failed to load metrics from backend:', error);
      // Fallback to initial data
      return INITIAL_METRICS_STATE;
    }
  }

  async save(data: MetricsStorageSchema): Promise<void> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/storage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to save metrics');
    } catch (error) {
      console.error('Failed to save metrics to backend:', error);
    }
  }

  async addMonth(metrics: MonthlyMetrics): Promise<void> {
    // This would be implemented when backend is ready
    console.log('addMonth not implemented for backend storage');
  }

  async getHistory(months: number = 12): Promise<MonthlyMetrics[]> {
    // This would be implemented when backend is ready
    console.log('getHistory not implemented for backend storage');
    return [];
  }

  async getCurrentAnalysis(): Promise<MetricsAnalysis> {
    // This would be implemented when backend is ready
    console.log('getCurrentAnalysis not implemented for backend storage');
    return INITIAL_METRICS_STATE.currentAnalysis;
  }

  async updateAnalysis(analysis: MetricsAnalysis): Promise<void> {
    // This would be implemented when backend is ready
    console.log('updateAnalysis not implemented for backend storage');
  }

  async exportData(format: 'csv' | 'json'): Promise<ExportFormat> {
    // This would be implemented when backend is ready
    console.log('exportData not implemented for backend storage');
    return { type: format, filename: '', content: '' };
  }

  async clear(): Promise<void> {
    // This would be implemented when backend is ready
    console.log('clear not implemented for backend storage');
  }
}

/**
 * Factory function to get the appropriate storage implementation
 */
export function createMetricsStorage(useBackend: boolean = false): IMetricsStorage {
  if (useBackend) {
    return new BackendMetricsStorage();
  }
  return new LocalStorageMetricsStorage();
}

/**
 * Singleton instance for app-wide use
 */
export const metricsStorage = createMetricsStorage(false); // Use localStorage by default
