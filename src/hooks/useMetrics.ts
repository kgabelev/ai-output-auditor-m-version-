/**
 * useMetrics Hook
 * Provides metrics data and functions to React components
 * Handles loading, state management, and updates
 */

import { useState, useEffect, useCallback } from 'react';
import { MetricsDataLayer } from '../utils/metricsDataLayer';
import type { MetricsAnalysis, MonthlyMetrics, ExportFormat } from '../types/metrics';

export interface UseMetricsReturn {
  analysis: MetricsAnalysis | null;
  history: MonthlyMetrics[];
  isLoading: boolean;
  error: Error | null;
  refresh: () => void;
  downloadMetrics: (format: 'csv' | 'json') => void;
  exportMetrics: (format: 'csv' | 'json') => ExportFormat | null;
  getGoalStatus: () => Array<{
    metricName: string;
    currentValue: number;
    targetValue: number;
    percentToGoal: number;
    onTrack: boolean;
  }>;
  getSummary: () => {
    currentMonth: string;
    invoicesEvaluated: number;
    straightThroughRate: number;
    falsePositiveRate: number;
    falseNegativeRate: number;
    trend: string;
  };
}

export function useMetrics(): UseMetricsReturn {
  const [analysis, setAnalysis] = useState<MetricsAnalysis | null>(null);
  const [history, setHistory] = useState<MonthlyMetrics[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Initial load
  useEffect(() => {
    try {
      setIsLoading(true);
      const currentAnalysis = MetricsDataLayer.getCurrentMetrics();
      const historicalMetrics = MetricsDataLayer.getHistoricalMetrics(12);

      setAnalysis(currentAnalysis);
      setHistory(historicalMetrics);
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to load metrics');
      setError(error);
      console.error('Failed to load metrics:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(() => {
    try {
      const currentAnalysis = MetricsDataLayer.refreshAnalysis();
      const historicalMetrics = MetricsDataLayer.getHistoricalMetrics(12);

      setAnalysis(currentAnalysis);
      setHistory(historicalMetrics);
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to refresh metrics');
      setError(error);
    }
  }, []);

  const downloadMetrics = useCallback((format: 'csv' | 'json') => {
    try {
      MetricsDataLayer.downloadMetrics(format);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to download metrics');
      setError(error);
    }
  }, []);

  const exportMetrics = useCallback(
    (format: 'csv' | 'json'): ExportFormat | null => {
      try {
        return MetricsDataLayer.exportMetrics(format);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to export metrics');
        setError(error);
        return null;
      }
    },
    []
  );

  const getGoalStatus = useCallback(() => {
    try {
      return MetricsDataLayer.getGoalStatus();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to get goal status');
      setError(error);
      return [];
    }
  }, []);

  const getSummary = useCallback(() => {
    try {
      return MetricsDataLayer.getSummary();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to get summary');
      setError(error);
      return {
        currentMonth: '',
        invoicesEvaluated: 0,
        straightThroughRate: 0,
        falsePositiveRate: 0,
        falseNegativeRate: 0,
        trend: 'unknown',
      };
    }
  }, []);

  return {
    analysis,
    history,
    isLoading,
    error,
    refresh,
    downloadMetrics,
    exportMetrics,
    getGoalStatus,
    getSummary,
  };
}
