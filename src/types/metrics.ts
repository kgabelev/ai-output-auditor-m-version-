/**
 * Metrics Data Model for AOA R&D Tracking
 * Tracks system improvement over time with detailed performance indicators
 */

import type { Verdict } from './index';

export interface EvaluationRun {
  id: string;
  date: string; // ISO date
  month: number; // 1-12
  year: number;
  batchSize: number; // number of invoices evaluated
  totalInvoicesProcessed: number;
  createdAt: string;
}

export interface VerdictAccuracy {
  POST: number; // percentage of POST verdicts that were correct
  POST_WITH_REVIEW: number;
  HOLD: number;
  ESCALATE: number;
  REJECT: number;
}

export interface CheckCategoryAccuracy {
  category: string;
  passRate: number; // 0-100
  flagRate: number; // 0-100
  checksPerformed: number;
  checksPass: number;
  checksFail: number;
}

export interface MonthlyMetrics {
  id: string;
  date: string; // ISO date (first day of month)
  month: number; // 1-12
  year: number;
  evaluationRun: EvaluationRun;
  straightThroughRate: number; // % of invoices that POST without review
  verdictAccuracy: VerdictAccuracy;
  falsePositiveRate: number; // % of items flagged that should have posted
  falseNegativeRate: number; // % of issues missed that posted anyway
  checkCategoryAccuracy: CheckCategoryAccuracy[];
  averageReviewTimeMinutes: number;
  totalInvoicesEvaluated: number;
  verdictDistribution: Record<Verdict, number>; // count by verdict type
}

export interface MetricsTrend {
  metric: string;
  label: string;
  data: { date: string; value: number }[];
  trend: 'improving' | 'declining' | 'stable';
  percentageChange: number; // since first data point
  improvementGoal?: number;
}

export interface MetricsAnalysis {
  runId: string;
  date: string;
  currentMonth: MonthlyMetrics;
  previousMonth?: MonthlyMetrics;
  monthlyHistory: MonthlyMetrics[]; // last 6-12 months
  trends: MetricsTrend[];
  insights: {
    gettingBetter: InsightItem[];
    needsWork: InsightItem[];
    stable: InsightItem[];
  };
  recommendations: Recommendation[];
}

export interface InsightItem {
  checkName: string;
  currentValue: number;
  previousValue?: number;
  changePercent: number;
  description: string;
}

export interface Recommendation {
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  estimatedImpact: string; // e.g., "Reduce FP by 2-3%"
  targetMetric: string;
  suggestedExperiment?: string;
}

export interface MetricsStorageSchema {
  version: string;
  lastUpdated: string;
  monthlyHistory: MonthlyMetrics[];
  currentAnalysis: MetricsAnalysis;
  exportedAt?: string;
}

export interface ExportFormat {
  type: 'csv' | 'json';
  filename: string;
  content: string;
}
