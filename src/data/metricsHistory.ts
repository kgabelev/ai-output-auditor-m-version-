/**
 * Historical Metrics Data - 6 Months of AOA Performance
 * Used to initialize the metrics dashboard with realistic improvement trajectory
 */

import type { MonthlyMetrics, EvaluationRun, CheckCategoryAccuracy } from '../types/metrics';

const generateEvaluationRun = (date: string, batchSize: number): EvaluationRun => ({
  id: `eval-${date}`,
  date,
  month: new Date(date).getMonth() + 1,
  year: new Date(date).getFullYear(),
  batchSize,
  totalInvoicesProcessed: batchSize * 4, // assume 4 similar batches per month
  createdAt: date,
});

// Category accuracy data showing improvement over time
const generateCheckCategoryAccuracy = (month: number): CheckCategoryAccuracy[] => {
  const baseData: Record<string, { passRate: number; checksPerformed: number }> = {
    'Duplicate Detection': {
      passRate: 65 + month * 3.5, // 65% → 86%
      checksPerformed: 142,
    },
    'Amount Reasonableness': {
      passRate: 72 + month * 2.8, // 72% → 89%
      checksPerformed: 156,
    },
    'Cutoff Accrual': {
      passRate: 88 + month * 1.2, // 88% → 95%
      checksPerformed: 89,
    },
    'Policy Compliance': {
      passRate: 55 + month * 3, // 55% → 73%
      checksPerformed: 198,
    },
    'Vendor GL Mapping': {
      passRate: 68 + month * 3.2, // 68% → 87%
      checksPerformed: 127,
    },
    'Description Quality': {
      passRate: 74 + month * 2.6, // 74% → 89%
      checksPerformed: 114,
    },
  };

  return Object.entries(baseData).map(([category, data]) => ({
    category,
    passRate: Math.min(98, data.passRate), // cap at 98%
    flagRate: Math.max(2, 100 - data.passRate),
    checksPerformed: data.checksPerformed,
    checksPass: Math.floor((data.checksPerformed * data.passRate) / 100),
    checksFail: Math.ceil((data.checksPerformed * (100 - data.passRate)) / 100),
  }));
};

export const HISTORICAL_METRICS: MonthlyMetrics[] = [
  // Month 1: June 2026
  {
    id: 'metrics-2026-06',
    date: '2026-06-01',
    month: 6,
    year: 2026,
    evaluationRun: generateEvaluationRun('2026-06-01', 185),
    straightThroughRate: 65,
    verdictAccuracy: {
      POST: 65,
      POST_WITH_REVIEW: 72,
      HOLD: 58,
      ESCALATE: 61,
      REJECT: 88,
    },
    falsePositiveRate: 8.2,
    falseNegativeRate: 2.1,
    checkCategoryAccuracy: generateCheckCategoryAccuracy(1),
    averageReviewTimeMinutes: 18,
    totalInvoicesEvaluated: 185,
    verdictDistribution: {
      POST: 120,
      POST_WITH_REVIEW: 35,
      HOLD: 20,
      ESCALATE: 8,
      REJECT: 2,
    },
  },

  // Month 2: July 2026
  {
    id: 'metrics-2026-07',
    date: '2026-07-01',
    month: 7,
    year: 2026,
    evaluationRun: generateEvaluationRun('2026-07-01', 192),
    straightThroughRate: 68,
    verdictAccuracy: {
      POST: 68,
      POST_WITH_REVIEW: 75,
      HOLD: 62,
      ESCALATE: 64,
      REJECT: 89,
    },
    falsePositiveRate: 6.8,
    falseNegativeRate: 1.9,
    checkCategoryAccuracy: generateCheckCategoryAccuracy(2),
    averageReviewTimeMinutes: 17,
    totalInvoicesEvaluated: 192,
    verdictDistribution: {
      POST: 130,
      POST_WITH_REVIEW: 38,
      HOLD: 17,
      ESCALATE: 5,
      REJECT: 2,
    },
  },

  // Month 3: August 2026 (current - partial)
  {
    id: 'metrics-2026-08-partial',
    date: '2026-08-01',
    month: 8,
    year: 2026,
    evaluationRun: generateEvaluationRun('2026-08-15', 156),
    straightThroughRate: 71,
    verdictAccuracy: {
      POST: 71,
      POST_WITH_REVIEW: 76,
      HOLD: 66,
      ESCALATE: 68,
      REJECT: 90,
    },
    falsePositiveRate: 5.4,
    falseNegativeRate: 1.8,
    checkCategoryAccuracy: generateCheckCategoryAccuracy(3),
    averageReviewTimeMinutes: 16,
    totalInvoicesEvaluated: 156,
    verdictDistribution: {
      POST: 111,
      POST_WITH_REVIEW: 28,
      HOLD: 12,
      ESCALATE: 4,
      REJECT: 1,
    },
  },

  // Month 4: May 2026 (backfill data)
  {
    id: 'metrics-2026-05',
    date: '2026-05-01',
    month: 5,
    year: 2026,
    evaluationRun: generateEvaluationRun('2026-05-01', 178),
    straightThroughRate: 62,
    verdictAccuracy: {
      POST: 62,
      POST_WITH_REVIEW: 70,
      HOLD: 54,
      ESCALATE: 58,
      REJECT: 87,
    },
    falsePositiveRate: 9.5,
    falseNegativeRate: 2.3,
    checkCategoryAccuracy: generateCheckCategoryAccuracy(0),
    averageReviewTimeMinutes: 19,
    totalInvoicesEvaluated: 178,
    verdictDistribution: {
      POST: 110,
      POST_WITH_REVIEW: 38,
      HOLD: 22,
      ESCALATE: 6,
      REJECT: 2,
    },
  },

  // Month 5: Projected improvements if trend continues
  {
    id: 'metrics-2026-09-proj',
    date: '2026-09-01',
    month: 9,
    year: 2026,
    evaluationRun: generateEvaluationRun('2026-09-01', 198),
    straightThroughRate: 75,
    verdictAccuracy: {
      POST: 75,
      POST_WITH_REVIEW: 78,
      HOLD: 70,
      ESCALATE: 72,
      REJECT: 91,
    },
    falsePositiveRate: 3.9,
    falseNegativeRate: 1.7,
    checkCategoryAccuracy: generateCheckCategoryAccuracy(4),
    averageReviewTimeMinutes: 15,
    totalInvoicesEvaluated: 198,
    verdictDistribution: {
      POST: 148,
      POST_WITH_REVIEW: 32,
      HOLD: 12,
      ESCALATE: 4,
      REJECT: 2,
    },
  },

  // Month 6: Target state
  {
    id: 'metrics-2026-10-proj',
    date: '2026-10-01',
    month: 10,
    year: 2026,
    evaluationRun: generateEvaluationRun('2026-10-01', 205),
    straightThroughRate: 85,
    verdictAccuracy: {
      POST: 85,
      POST_WITH_REVIEW: 81,
      HOLD: 76,
      ESCALATE: 78,
      REJECT: 93,
    },
    falsePositiveRate: 0.8,
    falseNegativeRate: 1.2,
    checkCategoryAccuracy: generateCheckCategoryAccuracy(6),
    averageReviewTimeMinutes: 12,
    totalInvoicesEvaluated: 205,
    verdictDistribution: {
      POST: 174,
      POST_WITH_REVIEW: 20,
      HOLD: 8,
      ESCALATE: 2,
      REJECT: 1,
    },
  },
];

// Sort chronologically (oldest first)
HISTORICAL_METRICS.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export const INITIAL_METRICS_STATE = {
  version: '1.0.0',
  lastUpdated: new Date().toISOString(),
  monthlyHistory: HISTORICAL_METRICS,
  currentAnalysis: {
    runId: HISTORICAL_METRICS[HISTORICAL_METRICS.length - 1].evaluationRun.id,
    date: new Date().toISOString(),
    currentMonth: HISTORICAL_METRICS[HISTORICAL_METRICS.length - 1],
    previousMonth: HISTORICAL_METRICS[HISTORICAL_METRICS.length - 2],
    monthlyHistory: HISTORICAL_METRICS,
    trends: [],
    insights: {
      gettingBetter: [],
      needsWork: [],
      stable: [],
    },
    recommendations: [],
  },
};
