/**
 * AP Invoice Validation Rubric v2.0 (Accountant-Focused)
 *
 * Designed for accountants using AI to code invoices.
 * Every check answers: "Can I rely on this?" and "What do I do if it fails?"
 */

import { RubricCriterion, CheckResult, VerdictRules, RubricMetadata } from '../types/index';

export const AP_RUBRIC_METADATA: RubricMetadata = {
  version: '2.0',
  domain: 'ap',
  lastUpdated: '2026-08-24',
  basedonResearch: [
    'Circular 230 §10.22 (IRS preparer diligence)',
    'AICPA ET 1.300.001 (Professional competence)',
    'PCAOB AS 1105 (Audit evidence)',
    'Internal control best practices (COSO)',
  ],
  appliesTo: ['AP invoice coding', 'Vendor master validation', 'GL account assignment', 'Policy compliance'],
  assumptions: [
    'Vendor master is authoritative source for approved vendors',
    'GL chart of accounts is current and complete',
    'PO process is required for amounts over policy threshold',
    'Policy thresholds are firm-specific and configurable',
  ],
};

export const AP_VERDICT_RULES: VerdictRules = {
  passingChecks: [
    'vendor_exists',
    'gl_account_exists',
    'amount_non_zero',
    'invoice_number_present',
    'no_duplicate_detected',
  ],
  blockingFailures: [
    'vendor_fraud_flag',
    'gl_account_inactive',
    'invoice_total_unrecomputable',
    'duplicate_exact_match',
    'banking_change_fraud_hold',
  ],
  warningThresholds: {
    'amount_reasonableness': 500000,
    'description_quality': 10,
  },
  timeEstimates: {
    POST: 0,
    POST_WITH_REVIEW: 3,
    HOLD: 15,
    ESCALATE: 30,
    REJECT: 10,
  },
};

/**
 * VENDOR CHECKS — Can we trust this vendor?
 */

const vendorExistsCriterion: RubricCriterion = {
  id: 'vendor_exists',
  category: 'Vendor Validation',
  name: 'Vendor exists in master file',
  description: 'AI must identify a valid vendor from company master or reference an approved new vendor',
  whyItMatters:
    'Unknown vendors cannot be reconciled to payments, creating duplicate payment risk and compliance issues',
  weight: 10,
  severity: 'critical',
  authority: ['Circular 230 §10.22(b)', 'AICPA ET 1.300.001'],
  checkFunction: (invoice) => {
    const passed = invoice.vendorId && invoice.vendorId.trim().length > 0 && invoice.vendorId !== 'UNKNOWN';
    return {
      passed,
      status: passed ? 'passed' : 'failed',
      evidence: `Vendor ID: ${invoice.vendorId || 'MISSING'}`,
      nextSteps: passed
        ? []
        : [
            'Check invoice for vendor name or ID',
            'Search vendor master for partial matches',
            'Contact AP manager if new vendor',
            'If new vendor, add to master before posting',
          ],
      possibleCauses: ['OCR error on vendor name', 'New vendor not yet in system', 'Vendor name variant'],
    };
  },
};

const vendorFraudFlagCriterion: RubricCriterion = {
  id: 'vendor_fraud_flag',
  category: 'Vendor Validation',
  name: 'Vendor banking details recently changed',
  description:
    'If vendor banking information (remit-to account, address) was modified in past 30 days, hold invoice pending verification',
  whyItMatters: 'Banking change followed by invoice is a signature fraud pattern. Even low-dollar amounts can be test transactions.',
  weight: 10,
  severity: 'critical',
  authority: ['Internal fraud control'],
  checkFunction: (invoice) => {
    const hasRecentChange = invoice.vendorBankingChangeWithin30Days === true;
    const passed = !hasRecentChange;
    return {
      passed,
      status: passed ? 'passed' : 'failed',
      evidence: hasRecentChange
        ? `Vendor ${invoice.vendorName} banking change detected within 30 days`
        : `No recent banking change detected for ${invoice.vendorName}`,
      nextSteps: hasRecentChange
        ? [
            'STOP: Do not post',
            'Contact vendor directly using prior contact info to verify banking change',
            'If verified: document approval and post',
            'If unverified: escalate to controller',
          ]
        : [],
      possibleCauses: ['Legitimate vendor relocation or account consolidation', 'Fraud attempt'],
    };
  },
};

const vendorGLMappingCriterion: RubricCriterion = {
  id: 'vendor_gl_mapping',
  category: 'Vendor Validation',
  name: 'Vendor-GL relationship is known',
  description: 'Vendor coding must align with known vendor-to-GL-account mappings in cost accounting',
  whyItMatters: 'Unexpected vendor-GL pairs can indicate miscoding or vendor misidentification',
  weight: 6,
  severity: 'medium',
  authority: ['AS 1105 — Audit Evidence'],
  checkFunction: (invoice) => {
    const isUnusual = invoice.vendorUnusualForGL === true;
    const passed = !isUnusual;
    return {
      passed,
      status: passed ? 'passed' : 'flagged',
      evidence: `Vendor: ${invoice.vendorName} → GL: ${invoice.glAccount}. Mapping status: ${passed ? 'usual' : 'unusual'}`,
      nextSteps: isUnusual ? ['Verify vendor-GL relationship', 'Check if vendor is cross-charging to multiple departments'] : [],
      possibleCauses: ['New vendor-GL relationship', 'Vendor name change', 'Misidentified vendor'],
    };
  },
};

/**
 * GL ACCOUNT CHECKS — Is the coding right?
 */

const glAccountExistsCriterion: RubricCriterion = {
  id: 'gl_account_exists',
  category: 'GL Account Validation',
  name: 'GL account exists and is active',
  description: 'AI must code to a valid, open GL account; cannot code to closed, reserved, or placeholder accounts',
  whyItMatters:
    'Invalid GL accounts prevent posting and cause close delays. Closed account use indicates lack of current chart of accounts.',
  weight: 10,
  severity: 'critical',
  authority: ['Circular 230 §10.22(b)', 'AS 1105'],
  checkFunction: (invoice) => {
    const passed = invoice.glAccountValid === true;
    return {
      passed,
      status: passed ? 'passed' : 'failed',
      evidence: `GL: ${invoice.glAccount}. Valid: ${passed ? 'YES' : 'NO'}`,
      nextSteps: passed
        ? []
        : [
            'Verify GL account number from current chart of accounts',
            'If typo: correct and repost',
            'If account is closed: select the replacement account per accounting policy',
            'If account does not exist: escalate to controller',
          ],
      possibleCauses: ['OCR misread account number', 'Account was recently closed', 'Typo in GL mapping'],
    };
  },
};

const glAccountTypeCriterion: RubricCriterion = {
  id: 'gl_account_type',
  category: 'GL Account Validation',
  name: 'GL account type matches debit/credit',
  description:
    'Debit transactions must code to asset/expense accounts; credit transactions to liability/income accounts',
  whyItMatters: 'Reversed account types cause trial balance errors and break month-end reconciliation',
  weight: 9,
  severity: 'critical',
  authority: ['AS 1105', 'Circular 230 §10.22(a)'],
  checkFunction: (invoice) => {
    const isDebit = (invoice.amount || 0) > 0;
    const accountType = invoice.glAccountType || '';
    const isExpenseOrAsset = accountType.includes('Expense') || accountType.includes('Asset');
    const passed = isDebit ? isExpenseOrAsset : !isExpenseOrAsset;
    return {
      passed,
      status: passed ? 'passed' : 'failed',
      evidence: `Transaction: ${isDebit ? 'Debit' : 'Credit'} | Account Type: ${accountType} | Match: ${passed ? 'YES' : 'NO'}`,
      nextSteps: passed
        ? []
        : [
            'STOP: This is a fundamental accounting error',
            'Check if amount is correct (may be negative)',
            'Check if GL account is correct',
            'If both correct: contact controller before posting',
          ],
      possibleCauses: ['AI inverted amount sign', 'AI picked wrong GL account', 'Amount is a return/credit and should be negative'],
    };
  },
};

const costCenterValidCriterion: RubricCriterion = {
  id: 'cost_center_valid',
  category: 'GL Account Validation',
  name: 'Cost center / department code is valid',
  description:
    'If cost center allocation is required, code must map to valid cost center; cannot be future-dated or closed',
  whyItMatters: 'Invalid cost centers break departmental P&L reporting and cause reconciliation failures',
  weight: 6,
  severity: 'high',
  authority: ['AS 1105', 'AICPA ET 1.300.001'],
  checkFunction: (invoice) => {
    const requiresCostCenter = invoice.requiresCostCenter !== false;
    const hasCostCenter = invoice.costCenter && invoice.costCenter.trim().length > 0;
    const isCostCenterValid = invoice.costCenterValid !== false;
    const passed = !requiresCostCenter || (hasCostCenter && isCostCenterValid);
    return {
      passed,
      status: passed ? 'passed' : 'flagged',
      evidence: `Cost Center: ${invoice.costCenter || 'MISSING'} | Required: ${requiresCostCenter} | Valid: ${isCostCenterValid}`,
      nextSteps: passed
        ? []
        : [
            requiresCostCenter && !hasCostCenter
              ? 'Cost center required but missing: verify from invoice or contact department manager'
              : 'Cost center invalid: confirm correct code from current department roster',
          ],
      possibleCauses: [
        'Cost center not yet set up in system',
        'Department code variant or abbreviation',
        'Department was reorganized',
      ],
    };
  },
};

/**
 * AMOUNT CHECKS — Is the dollar amount correct?
 */

const amountNonZeroCriterion: RubricCriterion = {
  id: 'amount_non_zero',
  category: 'Amount Validation',
  name: 'Invoice amount is non-zero and positive',
  description: 'Amount must be > 0; credits/reversals must be explicitly marked as negative or documented as reversals',
  whyItMatters: 'Zero or missing amounts have no accounting effect; negative amounts without documentation cause reversals to be missed',
  weight: 10,
  severity: 'critical',
  authority: ['Circular 230 §10.22(a)'],
  checkFunction: (invoice) => {
    const amount = invoice.amount || 0;
    const passed = typeof amount === 'number' && amount !== 0 && !isNaN(amount);
    return {
      passed,
      status: passed ? 'passed' : 'failed',
      evidence: `Amount: ${amount || 'MISSING'} | Type: ${typeof amount}`,
      nextSteps: passed
        ? []
        : [
            'Check original invoice for total amount',
            'Verify amount was not truncated or lost in OCR',
            'If credit/reversal: confirm it is marked as such',
          ],
      possibleCauses: ['OCR failed to extract amount', 'Invoice is a void/zero amount (reject)', 'Data entry error'],
    };
  },
};

const amountReasonablenessCriterion: RubricCriterion = {
  id: 'amount_reasonableness',
  category: 'Amount Validation',
  name: 'Invoice amount is reasonable for vendor',
  description: 'Amount should be within normal range for vendor type (e.g., not a $1M invoice from an office supply vendor)',
  whyItMatters: 'Anomalous amounts can indicate data quality errors or fraud; they always warrant a second look',
  weight: 7,
  severity: 'high',
  authority: ['AS 1105', 'AICPA ET 1.300.001'],
  checkFunction: (invoice) => {
    const amount = Math.abs(invoice.amount || 0);
    const reasonableMax = invoice.expectedMax || 500000;
    const passed = amount > 0 && amount <= reasonableMax;
    return {
      passed,
      status: passed ? 'passed' : 'flagged',
      evidence: `Amount: $${amount.toFixed(2)} | Threshold: $${reasonableMax.toFixed(2)} | Status: ${passed ? 'reasonable' : 'OUTLIER'}`,
      nextSteps: passed
        ? []
        : [
            'Verify amount against original invoice document',
            'Check if this is a bulk/consolidated invoice',
            'Contact vendor if amount seems inconsistent with typical purchases',
            'If legitimate: document reason in exception',
          ],
      possibleCauses: [
        'Large one-time purchase (e.g., equipment)',
        'Consolidated invoice covering multiple shipments',
        'Typo in amount (missing/extra digit)',
        'OCR error on decimal point',
      ],
    };
  },
};

const currencyConsistencyCriterion: RubricCriterion = {
  id: 'currency_consistency',
  category: 'Amount Validation',
  name: 'Currency coding is correct',
  description: 'If multi-currency, currency code must match vendor location; FX rates must be documented',
  whyItMatters: 'FX conversion errors are difficult to catch in reconciliation and can cause material misstatements',
  weight: 6,
  severity: 'medium',
  authority: ['ASC 830 — Foreign Currency Matters'],
  checkFunction: (invoice) => {
    const currency = invoice.currency || 'USD';
    const isForeignCurrency = currency !== 'USD';
    const hasFxRate = !!invoice.fxRate;
    const passed = !isForeignCurrency || hasFxRate;
    return {
      passed,
      status: passed ? 'passed' : 'flagged',
      evidence: `Currency: ${currency} | FX Rate: ${invoice.fxRate || 'NOT PROVIDED'} | Status: ${passed ? 'OK' : 'MISSING FX'}`,
      nextSteps: passed
        ? []
        : [
            'Obtain FX rate from source (vendor quote or company FX service)',
            'Document date of rate quote',
            'Verify rate is reasonable (check vs. published rates)',
            'Re-compute USD equivalent and post',
          ],
      possibleCauses: ['Vendor invoice in foreign currency; rate not yet obtained', 'FX rate data field missing'],
    };
  },
};

/**
 * INVOICE DETAIL CHECKS — Is the documentation sufficient?
 */

const invoiceNumberPresentCriterion: RubricCriterion = {
  id: 'invoice_number_present',
  category: 'Invoice Detail',
  name: 'Vendor invoice number is unique',
  description: 'Must have the vendor-assigned invoice number; cannot be blank, sequential, or system-generated',
  whyItMatters: 'Vendor invoice numbers are the link to the vendor master file and are required for reconciliation and duplicate detection',
  weight: 9,
  severity: 'critical',
  authority: ['Circular 230 §10.22(b)', 'AS 1105'],
  checkFunction: (invoice) => {
    const invoiceNumber = invoice.invoiceNumber || '';
    const passed = invoiceNumber.trim().length > 0 && invoiceNumber !== 'PENDING' && !invoiceNumber.match(/^\d+$/);
    return {
      passed,
      status: passed ? 'passed' : 'failed',
      evidence: `Invoice #: ${invoiceNumber || 'MISSING'}`,
      nextSteps: passed
        ? []
        : [
            'Check original invoice for vendor-assigned invoice number',
            'Do not use sequential numbering; always use vendor number',
            'If invoice has no number: contact vendor or escalate to AP manager',
          ],
      possibleCauses: ['OCR failed to extract invoice number', 'Invoice from vendor that does not issue invoice numbers (rare)'],
    };
  },
};

const invoiceDateValidCriterion: RubricCriterion = {
  id: 'invoice_date_valid',
  category: 'Invoice Detail',
  name: 'Invoice date is reasonable',
  description: 'Date must be in the past and within 90 days of today (older invoices require escalation)',
  whyItMatters: 'Future-dated or very old invoices may indicate data quality issues or processing delays',
  weight: 8,
  severity: 'high',
  authority: ['Circular 230 §10.22(a)', 'AS 1105'],
  checkFunction: (invoice) => {
    const invoiceDate = new Date(invoice.invoiceDate);
    const today = new Date();
    const daysOld = Math.floor((today.getTime() - invoiceDate.getTime()) / (1000 * 60 * 60 * 24));
    const passed = daysOld >= 0 && daysOld <= 180;
    return {
      passed,
      status: passed ? 'passed' : daysOld < 0 ? 'failed' : 'flagged',
      evidence: `Invoice Date: ${invoiceDate.toISOString().split('T')[0]} | Days Old: ${daysOld} | Status: ${passed ? 'OK' : daysOld < 0 ? 'FUTURE' : 'AGING'}`,
      nextSteps: passed
        ? []
        : daysOld < 0
          ? ['STOP: Invoice is future-dated', 'Verify invoice date on original document', 'Contact vendor if incorrect']
          : [
              'Invoice is aging (>180 days old)',
              'Verify with vendor that invoice was not previously submitted',
              'Check if payment has already been made',
              'If legitimate: document reason for delay and post',
            ],
      possibleCauses: [
        daysOld < 0 ? 'OCR error on date' : 'Invoice processing delay',
        daysOld < 0 ? 'System date error' : 'Vendor invoice received late',
      ],
    };
  },
};

const descriptionQualityCriterion: RubricCriterion = {
  id: 'description_quality',
  category: 'Invoice Detail',
  name: 'Description is specific and meaningful',
  description: 'Cannot be blank or generic ("Invoice", "Services", "Supplies"); must describe what was purchased',
  whyItMatters: 'Vague descriptions break audit trails and make it impossible for reviewers to assess whether expenses are appropriate',
  weight: 6,
  severity: 'medium',
  authority: ['Circular 230 §10.22(a)'],
  checkFunction: (invoice) => {
    const desc = (invoice.description || '').trim().toLowerCase();
    const isGeneric =
      desc === '' || desc === 'invoice' || desc === 'services' || desc === 'supplies' || desc.length < 8;
    const passed = !isGeneric;
    return {
      passed,
      status: passed ? 'passed' : 'flagged',
      evidence: `Description: "${invoice.description || 'MISSING'}" | Length: ${desc.length} chars | Specificity: ${isGeneric ? 'TOO GENERIC' : 'ACCEPTABLE'}`,
      nextSteps: passed
        ? []
        : [
            'Check original invoice for detailed line item descriptions',
            'If available: copy line descriptions (e.g., "Office chair, model XYZ, qty 2")',
            'If none available: at minimum note vendor type and month (e.g., "Monthly software subscription - August")',
            'Post with enhanced description',
          ],
      possibleCauses: ['OCR captured only header, not line details', 'Invoice itself lacked detail'],
    };
  },
};

/**
 * POLICY & MATCHING CHECKS
 */

const policyComplianceCriterion: RubricCriterion = {
  id: 'policy_compliance',
  category: 'Policy & Approval',
  name: 'Transaction complies with AP policy',
  description:
    'Must not violate standing policies (e.g., no single expense over limit without PO; no personal expenses; no blocked vendors)',
  whyItMatters: 'Policy violations are compliance findings that will be cited by auditors',
  weight: 8,
  severity: 'high',
  authority: ['Circular 230 §10.22(b)', 'AICPA ET 1.300.001'],
  checkFunction: (invoice) => {
    const passed = invoice.policyCompliant !== false;
    return {
      passed,
      status: passed ? 'passed' : 'failed',
      evidence: `Policy Check: ${passed ? 'COMPLIANT' : 'VIOLATION DETECTED'}`,
      nextSteps: passed
        ? []
        : [
            'Identify which policy was violated',
            'Contact AP manager or controller for guidance',
            'Document reason for exception if approved',
            'Route for formal approval before posting',
          ],
      possibleCauses: ['AI did not have access to all policies', 'Policy is firm-specific and needs manual review'],
    };
  },
};

const poMatchCriterion: RubricCriterion = {
  id: 'po_match',
  category: 'Policy & Approval',
  name: 'Invoice matches PO (if required)',
  description:
    'If PO-required expense, invoice must reference PO and match on vendor, GL account, and amount (within tolerance)',
  whyItMatters: 'PO mismatch indicates authorization failure; prevents three-way matching control from working',
  weight: 9,
  severity: 'high',
  authority: ['Circular 230 §10.22(b)'],
  checkFunction: (invoice) => {
    const requiresPO = invoice.requiresPO !== false;
    const hasPO = invoice.poNumber && invoice.poNumber.trim().length > 0;
    const poMatches = invoice.poMatchStatus === 'pass' || invoice.poMatchStatus === 'approved';
    const passed = !requiresPO || (hasPO && poMatches);
    return {
      passed,
      status: passed ? 'passed' : 'failed',
      evidence: `Requires PO: ${requiresPO} | PO #: ${invoice.poNumber || 'MISSING'} | Match: ${poMatches ? 'VERIFIED' : 'MISMATCH'}`,
      nextSteps: passed
        ? []
        : [
            !hasPO
              ? 'PO is required but missing: obtain PO number from invoice header or contact vendor'
              : 'PO match failed: compare invoice amount, GL account, and vendor to PO line items',
            'If minor variance (<5%): document reason (freight, tax, qty change) and approve',
            'If major variance: escalate to approving manager',
          ],
      possibleCauses: [
        'Invoice missing PO reference',
        'PO number on invoice does not exist in system',
        'Amount variance due to freight/tax not on PO',
        'Qty differs from PO; need receipt verification',
      ],
    };
  },
};

/**
 * DUPLICATE & DATA QUALITY CHECKS
 */

const noDuplicateDetectedCriterion: RubricCriterion = {
  id: 'no_duplicate_detected',
  category: 'Data Quality',
  name: 'Not an exact or suspected duplicate',
  description: 'Duplicate detection checks for exact matches and near-duplicates based on vendor, amount, and date',
  whyItMatters: 'Duplicate payments are fraud risk #1 and are difficult to catch in reconciliation',
  weight: 9,
  severity: 'critical',
  authority: ['Internal control'],
  checkFunction: (invoice) => {
    const isDuplicate = invoice.isDuplicateDetected === true;
    const passed = !isDuplicate;
    return {
      passed,
      status: passed ? 'passed' : 'failed',
      evidence: isDuplicate
        ? `DUPLICATE: Vendor ${invoice.vendorName} | Amount $${invoice.amount} | Date ${invoice.invoiceDate} | Matches prior invoice`
        : `Duplicate check passed (12-month lookback)`,
      nextSteps: passed
        ? []
        : [
            'STOP: Do not post',
            'Confirm with vendor: was this invoice already submitted/paid?',
            'Check payment history: has a payment already been made for this invoice?',
            'If paid: reject this invoice and mark as duplicate',
            'If not paid: repost as separate transaction with different reference',
          ],
      possibleCauses: ['Vendor resubmitted previously processed invoice', 'System error caused duplicate extract', 'User error in data input'],
    };
  },
};

/**
 * TAX & ACCRUAL CHECKS
 */

const taxTreatmentCriterion: RubricCriterion = {
  id: 'tax_treatment',
  category: 'Tax & Accrual',
  name: 'Tax treatment is correct',
  description: 'Expense must be correctly classified for tax purposes; large/recurring expenses must be capitalized if applicable',
  whyItMatters: 'Incorrect tax treatment causes tax return errors and can trigger IRS adjustments',
  weight: 7,
  severity: 'medium',
  authority: ['IRC §263', 'AICPA ET 1.300.001'],
  checkFunction: (invoice) => {
    const passed = invoice.taxTreatmentCorrect !== false;
    return {
      passed,
      status: passed ? 'passed' : 'flagged',
      evidence: `Tax Treatment: ${invoice.taxTreatment || 'Standard Deduction'} | Capitalized: ${invoice.capitalized ? 'YES' : 'NO'}`,
      nextSteps: passed
        ? []
        : [
            'Review invoice amount and nature of expense',
            'Check capitalization policy threshold',
            'Verify with tax team if above threshold',
            'If expense should be capitalized: route to fixed assets team',
          ],
      possibleCauses: ['Expense is above capitalization threshold but coded as expense', 'AI misclassified expense type'],
    };
  },
};

const cutoffAccuralCriterion: RubricCriterion = {
  id: 'cutoff_accrual',
  category: 'Tax & Accrual',
  name: 'Accrual period is correct',
  description: 'Invoice date and goods receipt date must align with fiscal period close; cannot accrue for future periods',
  whyItMatters: 'Period cutoff errors are the #1 audit finding; they cause balance sheet and P&L misstatement',
  weight: 9,
  severity: 'critical',
  authority: ['ASC 606 — Revenue Recognition', 'Circular 230 §10.22(a)'],
  checkFunction: (invoice) => {
    const invoiceDate = new Date(invoice.invoiceDate);
    const periodEnd = new Date(invoice.periodEnd || new Date());
    const passed = invoiceDate <= periodEnd;
    return {
      passed,
      status: passed ? 'passed' : 'failed',
      evidence: `Invoice Date: ${invoiceDate.toISOString().split('T')[0]} | Period End: ${periodEnd.toISOString().split('T')[0]} | ${passed ? 'PASS' : 'FUTURE ACCRUAL'}`,
      nextSteps: passed
        ? []
        : [
            'STOP: Invoice date is after period end',
            'Verify invoice date on original document',
            'If service/goods received in prior period: correct date to receipt date',
            'If invoice is legitimately next period: hold and resubmit next period',
          ],
      possibleCauses: ['OCR misread invoice date', 'Invoice for next period submitted early', 'Period end date incorrect'],
    };
  },
};

/**
 * AUTHORITY & AUDIT TRAIL
 */

const aiSourceCitedCriterion: RubricCriterion = {
  id: 'ai_source_cited',
  category: 'Audit Trail',
  name: 'AI cited its source document',
  description: 'Output must reference which source doc was used; must link to scanned image or original attachment',
  whyItMatters: 'Without source citation, reviewers cannot verify AI was working from actual document vs. hallucinating',
  weight: 7,
  severity: 'medium',
  authority: ['Circular 230 §10.22(b)', 'AS 1105'],
  checkFunction: (invoice) => {
    const hasCitation = invoice.sourceDocument && invoice.sourceDocument.trim().length > 0;
    const passed = hasCitation;
    return {
      passed,
      status: passed ? 'passed' : 'flagged',
      evidence: `Source: ${invoice.sourceDocument || 'MISSING'} | Document ID: ${invoice.documentId || 'N/A'}`,
      nextSteps: passed ? [] : ['Ensure source document (PDF, image) is attached to invoice record before posting'],
      possibleCauses: ['AI did not capture document reference', 'Document attachment missing from system'],
    };
  },
};

const confidenceLevelRecordedCriterion: RubricCriterion = {
  id: 'confidence_recorded',
  category: 'Audit Trail',
  name: 'AI confidence level is recorded',
  description: 'AI must report confidence for this invoice; low-confidence invoices are flagged for manual review',
  whyItMatters: 'Confidence data allows risk-based review: review low-confidence high-value invoices; skim low-confidence low-value ones',
  weight: 7,
  severity: 'medium',
  authority: ['Circular 230 §10.22(b)', 'AICPA ET 1.300.001'],
  checkFunction: (invoice) => {
    const confidence = invoice.overallConfidence || 0;
    const lowConfidenceFields = (invoice.lowConfidenceFields || []).length > 0;
    const passed = confidence >= 0.75 || lowConfidenceFields;
    return {
      passed,
      status: passed ? 'passed' : 'flagged',
      evidence: `Confidence: ${(confidence * 100).toFixed(0)}% | Low-Confidence Fields: ${lowConfidenceFields ? 'YES — FLAGGED' : 'NONE'}`,
      nextSteps: passed
        ? []
        : [
            'Invoice has low confidence; recommend human review even if other checks pass',
            'Check flagged fields (vendor, amount, GL, etc.) against original document',
          ],
      possibleCauses: ['OCR quality poor', 'Invoice format unusual', 'AI model uncertain on coding'],
    };
  },
};

/**
 * Export all criteria
 */

export const AP_INVOICE_CRITERIA: RubricCriterion[] = [
  // Vendor (3)
  vendorExistsCriterion,
  vendorFraudFlagCriterion,
  vendorGLMappingCriterion,

  // GL Account (4)
  glAccountExistsCriterion,
  glAccountTypeCriterion,
  costCenterValidCriterion,

  // Amount (3)
  amountNonZeroCriterion,
  amountReasonablenessCriterion,
  currencyConsistencyCriterion,

  // Invoice Detail (3)
  invoiceNumberPresentCriterion,
  invoiceDateValidCriterion,
  descriptionQualityCriterion,

  // Policy & Matching (2)
  policyComplianceCriterion,
  poMatchCriterion,

  // Data Quality (1)
  noDuplicateDetectedCriterion,

  // Tax & Accrual (2)
  taxTreatmentCriterion,
  cutoffAccuralCriterion,

  // Audit Trail (2)
  aiSourceCitedCriterion,
  confidenceLevelRecordedCriterion,
];

export function evaluateInvoice(
  invoice: any,
  refData?: any
): {
  allChecks: any[];
  criticalFailures: any[];
  blockingFailures: any[];
  verdict: string;
  verdictReason: string;
} {
  const allChecks = AP_INVOICE_CRITERIA.map((criterion) => {
    const result = criterion.checkFunction(invoice, refData);
    return {
      ...criterion,
      ...result,
    };
  });

  const criticalFailures = allChecks.filter((c) => c.severity === 'critical' && !c.passed);
  const blockingFailures = allChecks.filter((c) => AP_VERDICT_RULES.blockingFailures.includes(c.id) && !c.passed);

  let verdict = 'POST';
  let verdictReason = 'compliant';

  if (criticalFailures.length > 0 || blockingFailures.length > 0) {
    verdict = 'HOLD';
    verdictReason = 'material_issue';
  } else if (allChecks.filter((c) => c.status === 'flagged').length > 0) {
    verdict = 'POST_WITH_REVIEW';
    verdictReason = 'minor_flag';
  }

  return {
    allChecks,
    criticalFailures,
    blockingFailures,
    verdict,
    verdictReason,
  };
}
