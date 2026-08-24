/**
 * Core type definitions for AOA (AI Output Auditor)
 * Accountant-focused evaluation framework
 */

export type Verdict = 'POST' | 'POST_WITH_REVIEW' | 'HOLD' | 'ESCALATE' | 'REJECT';
export type VerdictReason = 'compliant' | 'minor_flag' | 'material_issue' | 'judgment_required' | 'data_quality';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type CheckStatus = 'passed' | 'flagged' | 'failed' | 'na';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  vendorId: string;
  vendorName: string;
  amount: number;
  glAccount: string;
  glAccountType: string;
  invoiceDate: string;
  description: string;
  costCenter: string;
  poNumber: string;
  sourceDocument: string;
  documentId: string;
  overallConfidence: number;
  [key: string]: any;
}

export interface Check {
  id: string;
  name: string;
  category: string;
  description: string;
  status: CheckStatus;
  riskLevel: RiskLevel;
  evidence: string;
  authority?: string;
  whyItMatters: string;
  nextSteps?: string[];
  isPassing: boolean;
  isBlocking: boolean;
}

export interface VerdictResult {
  invoice: Invoice;
  verdict: Verdict;
  verdictReason: VerdictReason;
  confidence: number; // 0-100
  riskLevel: RiskLevel;
  estimatedReviewTime: number; // minutes
  checks: Check[];
  evidenceChain: EvidenceItem[];
  nextSteps: NextStep[];
  escalationReason?: string;
  escalationOwner?: string;
}

export interface EvidenceItem {
  source: string; // "vendor master", "GL account", "PO", etc.
  status: 'verified' | 'retrieved' | 'not_found';
  value: string;
  timestamp?: string;
  hash?: string;
  authority?: string;
  citation?: string;
}

export interface NextStep {
  priority: 'high' | 'medium' | 'low';
  action: string;
  reason: string;
  timeEstimate: number; // minutes
  possibleCauses?: string[];
  checkItems?: string[];
}

export interface BatchResult {
  batchId: string;
  period: string;
  entity: string;
  domain: 'ap' | 'reconciliation' | 'accrual' | 'revenue';
  createdAt: string;
  invoices: VerdictResult[];
  summary: BatchSummary;
  comparison?: MonthlyComparison;
}

export interface BatchSummary {
  totalInvoices: number;
  straightThrough: number; // POST
  needsReview: number; // POST_WITH_REVIEW
  onHold: number; // HOLD
  escalated: number; // ESCALATE
  rejected: number; // REJECT
  overallReliance: number; // 0-100, weighted by risk
  averageReviewTime: number; // minutes
  estimatedRiskDollars: number;
}

export interface MonthlyComparison {
  lastMonth: BatchSummary;
  thisMonth: BatchSummary;
  straightThroughTrend: number; // % change
  needsReviewTrend: number;
  escalationTrend: number;
  relianceTrend: number;
}

export interface RubricCriterion {
  id: string;
  category: string;
  name: string;
  description: string;
  whyItMatters: string;
  weight: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  authority: string[];
  checkFunction: (invoice: Invoice, refData?: any) => CheckResult;
}

export interface CheckResult {
  passed: boolean;
  status: CheckStatus;
  evidence: string;
  nextSteps?: string[];
  possibleCauses?: string[];
}

export interface VerdictRules {
  passingChecks: string[]; // check IDs that must pass
  blockingFailures: string[]; // any failure here → HOLD/ESCALATE
  warningThresholds: Record<string, number>; // check ID → warning if value exceeds
  timeEstimates: Record<Verdict, number>; // how long each verdict type takes to resolve
}

export interface RubricMetadata {
  version: string;
  domain: 'ap' | 'reconciliation' | 'accrual' | 'revenue';
  lastUpdated: string;
  basedonResearch: string[];
  appliesTo: string[];
  assumptions: string[];
}

export interface ImprovementMetric {
  date: string;
  verdictAccuracy: Record<Verdict, number>;
  falsePositiveRate: number;
  falseNegativeRate: number;
  missRateHighRisk: number;
  averageReviewTime: number;
  straightThroughRate: number;
}

export interface SpecDefect {
  type: 'spec_defect' | 'grader_defect' | 'input_defect' | 'harness_defect' | 'agent_defect' | 'authority_defect';
  checkId: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  resolution: string;
}
