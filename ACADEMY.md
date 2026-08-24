# AOA Academy: The Complete Curriculum for AI Output Auditing

*Become certified in systematic verification of AI-generated accounting work. Learn from first principles through production governance.*

---

## Overview

The AOA Academy teaches accounting professionals, compliance officers, and AI governance teams how to evaluate, verify, and control AI-generated accounting output at enterprise scale. Our curriculum is built on three progressive levels, each building toward mastery of the rubric framework and its real-world application.

**What You'll Learn:**
- How AI accounting output fails (and why it matters)
- How to design deterministic verification criteria
- How to tune rubrics for your firm's risk profile
- How to implement governance and kill switches
- How to specialize in high-risk domains (invoicing, accruals, revenue)

**Who This Is For:**
- CPA and accounting firm leaders
- Compliance officers implementing AI governance
- Finance controllers verifying AI tools
- Risk managers designing approval workflows
- Audit partners verifying AI evidence
- Financial AI engineers building autonomous systems

---

## Certification Pathway

```
FOUNDATION LEVEL
(4 weeks online)
     ↓
PRACTITIONER LEVEL
(8 weeks, builds on Foundation)
     ↓
ADVANCED LEVEL
(12 weeks, full governance mastery)
     ↓
DOMAIN ENDORSEMENTS
(2 weeks each, stackable credentials)
```

**Total Time to Full Mastery:** 26 weeks + domain endorsements  
**Flexible Schedule:** Take levels sequentially or batch endorsements  
**Earn As You Go:** Each level is independently valuable and certifiable

---

# LEVEL 1: FOUNDATION (4 Weeks, Online)

## Overview

Master the fundamentals of AI accounting evaluation. Learn the rubric, understand error taxonomy, and apply verification criteria to real invoices. This level is the prerequisite for all advanced study.

**Time Commitment:** 8–10 hours/week (lecture, labs, self-study)  
**Format:** Hybrid (recorded lectures + weekly live labs + async discussion)  
**Prerequisites:** None. Basic accounting knowledge assumed (GL accounts, invoice flow, AP policy).

---

## Learning Objectives

By the end of Foundation, you will be able to:

1. **Explain the 16 criteria** across 5 dimensions (vendor, amount, GL, policy, accrual, audit trail)
2. **Identify error types** using the taxonomy (vendor mismatch, GL invalid, policy violation, etc.)
3. **Classify severity** from low → high → critical
4. **Apply the rubric** to sample invoices and score them consistently
5. **Understand compliance mapping** (Circular 230, AICPA ET, AS 1105, ASC 606)
6. **Read a compliance report** and explain findings to auditors
7. **Triage failures** based on business impact and risk
8. **Export and interpret** the PDF audit trail

---

## Module Breakdown

### Week 1: Why AI Output Verification Matters

**Learning Outcomes:**
- Understand regulatory drivers (Circular 230 §10.22, AICPA ET 1.300.001)
- Know what can go wrong (cost allocation, duplicate payments, period cutoff)
- Learn the economic impact (restatement risk, audit adjustments, reputation)

**Topics:**
1. **Regulatory landscape** (30 min video)
   - IRS diligence requirements for preparers
   - AICPA accuracy standards and CPA liability
   - PCAOB audit evidence expectations
   - ASC 606 period cutoff / accrual misstatement risk

2. **Failure modes in AI accounting** (40 min case studies)
   - Real invoice failures from production systems (anonymized)
   - Vendor master file: mismatches, duplicates, inactive accounts
   - GL mapping: cost allocation errors, invalid accounts
   - Invoice detail: missing POs, future-dated invoices
   - Accruals: period cutoff, tax treatment
   - AI-specific risk: hallucinated vendors, malformed GL strings, confidence gaps

3. **Lab: Spot the 8 failing invoices** (1.5 hrs)
   - Pre-loaded sample dataset
   - Manually review 10 invoices, identify failures
   - Compare your assessment to expert grading
   - Discussion: What did you miss? Why?

4. **Reading assignment:** AICPA guidance on AI use in accounting (40 min)

5. **Live discussion** (1 hr, optional): Q&A on regulatory context

**Knowledge Check:** Quiz on regulatory drivers and failure modes (pass/fail, 70% threshold)

---

### Week 2: The Rubric Framework

**Learning Outcomes:**
- Understand the 16 criteria in detail
- Know the weighting logic and why each criterion matters
- Learn to apply each criterion deterministically

**Topics:**

1. **The Vendor Dimension** (25 min lecture)
   - Criterion 1: Vendor exists in master file
     - Why: Reconciliation, fraud prevention, payment control
     - Deterministic check: vendor ID in master? active? date-effective?
     - Business impact: Wrong vendor → duplicate payment, GL not updated
   - Criterion 2: Vendor-GL mapping valid
     - Why: Cost allocation accuracy
     - Deterministic check: valid GL accounts associated with vendor?
     - Business impact: Misallocation → incorrect departmental P&L

2. **The Amount Dimension** (20 min lecture)
   - Criterion 3: Non-zero, positive
     - Why: Fundamental accounting rule, data quality gate
     - Deterministic check: amount > 0? no unusual decimals?
   - Criterion 4: Within reasonableness bounds
     - Why: Anomaly detection, outlier flagging
     - Deterministic check: vs. historical vendor average, GL posting limits
   - Criterion 5: Currency consistency
     - Why: FX handling, conversion accuracy
     - Deterministic check: currency code matches invoice origin? FX rate valid?

3. **The GL Dimension** (25 min lecture)
   - Criterion 6: Account exists & active
     - Why: GL integrity, close success, period closure
     - Deterministic check: account in COA? not archived? cost center valid?
   - Criterion 7: Account type matches debit/credit
     - Why: Fundamental GL rule, trial balance integrity
     - Deterministic check: asset/liability/equity vs. debit/credit logic
   - Criterion 8: Cost center valid
     - Why: Cost center reporting accuracy
     - Deterministic check: cost center exists? active? user permitted?

4. **The Invoice Detail Dimension** (20 min lecture)
   - Criterion 9: Invoice # present & unique
     - Why: Duplicate payment prevention, audit trail
     - Deterministic check: invoice # populated? unique across period?
   - Criterion 10: Invoice date valid & reasonable
     - Why: Aging accuracy, period cutoff, audit trail
     - Deterministic check: date in past? before posting date? within 30/60/90 day window?
   - Criterion 11: Description meaningful
     - Why: Audit trail, cost justification
     - Deterministic check: description length > 0? no AI hallucinations? references PO/invoice?

5. **The Policy Dimension** (20 min lecture)
   - Criterion 12: Complies with AP policy
     - Why: Risk mitigation, governance
     - Deterministic check: amount vs. approval limit? vendor approved? policy exceptions logged?
   - Criterion 13: PO matched (if required)
     - Why: Approval control, authorization, three-way match
     - Deterministic check: PO ID present? PO amount matches invoice? PO still active?

6. **The Accrual Dimension** (20 min lecture)
   - Criterion 14: Tax treatment correct
     - Why: Tax return accuracy, deductibility
     - Deterministic check: expense category allows deduction? sales tax handled? bad debt reserve?
   - Criterion 15: Accrual in correct period
     - Why: Balance accuracy, no restatements
     - Deterministic check: invoice date in accrual period? not in next period? cutoff check?

7. **The Audit Trail Dimension** (20 min lecture)
   - Criterion 16: AI cites source document
     - Why: Audit trail, document link, evidence chain
     - Deterministic check: AI recorded invoice image path? vendor master lookup date? GL mapping version?
   - Criterion 17: Confidence level recorded
     - Why: Risk-based review focus, low-confidence triage
     - Deterministic check: confidence score populated? low-confidence fields flagged? uncertainty tracked?

8. **Labs: Apply each criterion** (2.5 hrs total)
   - Vendor dimension: 3 invoices, score vendor existence and mapping
   - Amount dimension: 3 invoices with outliers, reasonableness checks
   - GL dimension: 3 invoices with invalid GL, cost center mismatches
   - Invoice detail: 3 invoices with missing/duplicate numbers, bad dates
   - Policy dimension: 3 invoices vs. firm AP policy
   - Accrual dimension: 3 invoices with period cutoff issues
   - Audit trail: 3 invoices with missing source documentation
   - Scoring: Your rubric assessment vs. expert scoring; discuss differences

9. **Weighting logic** (15 min lecture)
   - Why vendor and GL criteria are weighted highest (10 points each)
   - Why approval controls (PO match) are weighted high (9 points)
   - Why secondary factors (description, confidence) are weighted lower (6-7 points)
   - How to think about tradeoffs (low amount + perfect GL vs. high amount + questionable GL)

10. **Reading assignment:** Full rubric specification document with all criteria definitions (1 hour)

11. **Live discussion** (1 hr): Deep dive on weighting, real-world edge cases

**Knowledge Check:** 
- Rubric criterion test (identify criterion for 10 scenarios): 80% threshold
- Lab scoring accuracy: Compare your scores to expert rubric; identify misalignments

---

### Week 3: Error Taxonomy & Severity Classification

**Learning Outcomes:**
- Understand failure modes in detail
- Know how to classify severity (low → high → critical)
- Learn to explain business impact for each error
- Practice prioritizing failures for manual review

**Topics:**

1. **Error Taxonomy by Dimension** (35 min lecture)
   - **Vendor errors:**
     - Vendor does not exist in master file (critical)
     - Vendor inactive or date-not-effective (critical)
     - Vendor-GL mapping invalid (high)
     - Vendor blacklisted or on hold (high)
   - **Amount errors:**
     - Zero or negative amount (critical)
     - Amount exceeds approval limit (high)
     - Amount exceeds historical variance for vendor (medium)
     - Currency mismatch (high)
     - Unusual decimals or scaling (low)
   - **GL errors:**
     - GL account does not exist (critical)
     - GL account archived or inactive (high)
     - Account type mismatch (debit vs. credit) (critical)
     - Cost center invalid (high)
     - GL string malformed (critical)
   - **Invoice detail errors:**
     - Duplicate invoice number (critical)
     - Invoice date in future (critical)
     - Invoice date > 90 days old (high)
     - Missing description (low)
     - Duplicate PO number (high)
   - **Policy errors:**
     - Violates AP policy (high)
     - PO not matched (if required) (high)
     - Approval limit exceeded without escalation (critical)
     - Vendor not approved (high)
   - **Accrual errors:**
     - Invoice in wrong accounting period (critical)
     - Tax treatment not deductible (high)
     - Bad debt reserve not applied (medium)
   - **Audit trail errors:**
     - Source document not cited (medium)
     - Confidence level missing (medium)
     - Low-confidence fields not flagged (low)

2. **Severity tier definitions** (20 min lecture)
   - **CRITICAL:** Must be manual reviewed and corrected before posting. Examples: vendor doesn't exist, GL invalid, duplicate invoice, policy violation, period cutoff.
   - **HIGH:** Should be reviewed before posting unless approved as exception. Examples: vendor inactive, amount outlier, missing PO, approval limit exceeded.
   - **MEDIUM:** Monitor and review in batches; flag for pattern analysis. Examples: missing description, low confidence, unusual timing.
   - **LOW:** Log for audit trail; rarely require action. Examples: description could be better, confidence could be higher.
   - **PASS:** No actionable issue found.

3. **Business impact scoring** (25 min lecture)
   - Vendor errors impact: Reconciliation risk, fraud loss, duplicate payment
   - GL errors impact: Cost allocation, departmental reporting, close delays
   - Invoice detail errors impact: Duplicate payment, aging accuracy, audit trail
   - Policy errors impact: Compliance risk, governance, audit exception
   - Accrual errors impact: Balance sheet accuracy, tax return accuracy, restatement risk

4. **Labs: Classify 20 invoices by severity** (2 hrs)
   - Each invoice has 1–3 errors
   - You classify each error as critical/high/medium/low
   - You explain business impact
   - Compare your severity classification to expert; discuss reasoning

5. **Live discussion** (1.5 hrs): Edge cases, business context, when to escalate

**Knowledge Check:**
- Severity classification quiz: 15 scenarios, classify correctly (80% threshold)
- Lab: Write 3 short impact statements for different error types

---

### Week 4: Rubric Application & Compliance Mapping

**Learning Outcomes:**
- Apply the full 16-criterion rubric to real invoices
- Score invoices end-to-end using weighted criteria
- Understand compliance citations for each criterion
- Read and interpret compliance reports
- Export and explain audit findings

**Topics:**

1. **Compliance mapping** (25 min lecture)
   - Circular 230 §10.22(a): Diligence in preparing documents
   - Circular 230 §10.22(b): Accuracy standards for preparers
   - AICPA ET 1.300.001: Code of Professional Conduct on accuracy
   - AS 1105: PCAOB audit evidence standards
   - ASC 606: Revenue recognition and period cutoff
   - How each criterion maps to one or more regulations
   - Why this matters in audit defense and regulatory inquiry

2. **Scoring methodology** (20 min lecture)
   - Weighted scoring: Each criterion 0–10 points per weight
   - Passing threshold: 80%
   - Critical failures: Any critical error results in automatic fail
   - How partial credit works (e.g., 2/3 of GL validation criteria met = partial points)
   - Overall score calculation and normalization

3. **Report interpretation** (20 min lecture)
   - Summary dashboard: Pass rate, failure rate, average score
   - Issue triage: Critical issues first, then high, then medium
   - Evidence-based findings: Each failure shows the criterion, the evidence, and the citation
   - Audit trail metadata: Who ran the evaluation, when, with what rubric version?

4. **Comprehensive lab: Score 25 invoices end-to-end** (3 hrs)
   - Dataset includes: 10 pass, 8 high-severity fails, 4 medium, 3 low
   - You score each invoice using the full rubric
   - You generate a summary report
   - You identify top failure patterns
   - Compare your scores and patterns to expert analysis
   - Discuss why patterns emerge (vendor quality? AI tool? policy interpretation?)

5. **Export lab: Generate a compliance report** (1 hr)
   - Export your 25-invoice evaluation as PDF
   - Review structure: summary, invoice results, failure analysis, citations
   - Write a 2-paragraph summary of your findings as if for a CFO
   - Imagine presenting this to an auditor; what questions would they ask?

6. **Capstone assignment: Practical test** (2 hrs)
   - You receive 20 real invoices (anonymized, from production systems)
   - You have 90 minutes to score them all
   - You generate a summary report
   - You write a triage memo for the AP manager: which invoices need immediate attention and why?
   - Grading: 80% score threshold to pass

7. **Live discussion & exam prep** (1.5 hrs): Q&A on exam format, rubric edge cases

**Knowledge Check:**
- **CAPSTONE EXAM: Practical evaluation** of 20 production-like invoices
  - Score all 20 correctly within 90 minutes
  - Generate report and triage memo
  - Pass threshold: 80% accuracy on scoring + clear, accurate triage
  - Exam is proctored (live session)

---

## Foundation Exam Format

**Format:** Practical, timed assessment  
**Duration:** 90 minutes  
**Content:** 20 real (anonymized) invoices from production accounting systems  
**Task:**
1. Score each invoice using the 16-criterion rubric
2. Generate summary report with compliance citations
3. Triage failures by severity and business impact
4. Write 2-paragraph memo to AP manager with findings

**Passing Score:** 80%+ accuracy on rubric application + clear, actionable recommendations  
**Retakes:** Unlimited (same exam format, different invoice dataset)

**What You'll Receive After Passing:**
- Foundation Certificate (digital + printable)
- Access to Practitioner-level curriculum
- Badge for LinkedIn/credentials
- Certificate code for your auditors/regulators

---

## Foundation Time Summary

| Component | Hours |
|-----------|-------|
| Recorded lectures | 6 |
| Live labs & discussion | 6 |
| Reading assignments | 4 |
| Lab work & practice | 12 |
| Capstone exam prep & exam | 4 |
| **Total** | **32** |

**Weekly breakdown:** 8 hours/week for 4 weeks (flexible pacing available)

---

# LEVEL 2: PRACTITIONER (8 Weeks)

## Overview

Master rubric design and tuning. Learn to write your own Definition of Done (DoD), design graders for your firm's risk profile, and build domain-specific rubrics. This level assumes complete Foundation competency.

**Time Commitment:** 10–12 hours/week  
**Format:** Recorded lectures + weekly design workshops + peer review  
**Prerequisites:** Foundation certificate (or equivalent expertise)

---

## Learning Objectives

By the end of Practitioner, you will be able to:

1. **Design a 7-layer DoD** for your firm's AP workflow (vendor, amount, GL, policy, accrual, audit trail, governance)
2. **Write deterministic grader logic** in pseudocode and specification language
3. **Tune rubric weights** based on your firm's risk profile
4. **Build rubric variants** for different domains (invoicing, accruals, revenue)
5. **Create a grader design document** that engineers can implement
6. **Run A/B tests** on rubric variants to identify optimal weightings
7. **Document rubric decisions** defensibly for audit purposes
8. **Teach others** to apply your custom rubric consistently

---

## Module Breakdown

### Week 1–2: DoD Design & Specification

**Learning Outcomes:**
- Understand DoD concept (Definition of Done in accounting context)
- Design a 7-layer DoD for your firm
- Write grader specifications
- Validate DoD with stakeholder input

**Topics:**

1. **What is a Definition of Done?** (30 min lecture)
   - DoD in software engineering vs. accounting
   - Why DoD matters for AI verification
   - DoD as a governance artifact (defensible, auditable, vendor-agnostic)
   - Examples from 3 firms with different risk profiles

2. **7-layer DoD framework** (40 min lecture)
   - **Layer 1: Vendor Validation**
     - Invoice vendor ID must exist in active master file
     - Vendor must be approved for the requesting company
     - Vendor must not be on hold or blacklist
     - Vendor GL mapping must be valid for the GL account selected
   - **Layer 2: Amount Validation**
     - Amount must be positive and non-zero
     - Amount must be within 3 SDs of vendor historical average OR ≤ GL approval limit
     - Currency must match vendor default currency
     - No unusual scaling or decimal patterns (flags potential AI hallucination)
   - **Layer 3: GL Validation**
     - GL account must exist in current chart of accounts
     - GL account must be active (not archived)
     - Account type must match debit/credit logic
     - Cost center must be valid and active
     - GL account must allow vendor posting (no cash/bank accounts for payables)
   - **Layer 4: Invoice Detail Validation**
     - Invoice number must be present and non-empty
     - Invoice number must be unique within 12-month rolling window
     - Invoice date must be in the past (not future-dated)
     - Invoice date must be within reasonable window (typically 90 days before posting)
     - Description must be populated (minimum 5 characters, not AI hallucination pattern)
   - **Layer 5: Policy Validation**
     - Invoice must comply with firm AP policy (amount limits, approval hierarchy)
     - If PO is required (per policy), PO number must be present and PO must exist
     - If PO exists, invoice amount must match or be within tolerance
     - Approval must be documented (manager, buyer, CFO as policy requires)
   - **Layer 6: Accrual Validation**
     - Invoice date must fall within designated accrual period
     - Tax treatment must be aligned with GL account (no non-deductible items in deductible GL)
     - If multi-year item, amortization period must be documented
     - Bad debt reserve must be applied if item is high-risk vendor
   - **Layer 7: Audit Trail & Governance**
     - AI system must cite source document (invoice image, OCR output, or manual entry)
     - AI system must record confidence level for each field
     - Low-confidence fields must be flagged for manual review
     - Evaluation must be logged with timestamp, evaluator, rubric version
     - All changes to invoice (initial entry, correction, reversal) must be traceable

3. **Lab: Design your firm's DoD** (3 hrs)
   - You're given a firm profile (size, industry, risk tolerance, AP volume)
   - You write a 7-layer DoD for their AP workflow
   - You identify which layers are mandatory (critical-error gates) vs. guideline-only
   - You estimate the percentage of invoices that will fail each layer
   - You present your DoD to 2–3 peers for feedback

4. **Grader specification lab** (2.5 hrs)
   - For each DoD layer, write pseudocode logic for validation
   - Example: `if vendor_id not in master_file or vendor_active_date > invoice_date: FAIL_CRITICAL`
   - Specify thresholds (e.g., amount reasonableness: historical mean ± 3 SD)
   - Document exceptions (e.g., "if vendor_id not found but vendor_name matches 2+ master records, flag for manual review")
   - Peer review: Does the spec match your DoD? Are edge cases handled?

5. **Stakeholder validation workshop** (1.5 hrs, live)
   - Present your DoD to finance/compliance/AP peers
   - Gather feedback: Are layers too strict? Too lenient? Missing anything?
   - Iterate DoD based on feedback

**Knowledge Check:** Submit your firm's complete 7-layer DoD + grader specifications

---

### Week 2–3: Rubric Design & Weighting

**Learning Outcomes:**
- Understand weighting logic and how it affects outcomes
- Design a rubric variant optimized for your firm's risk profile
- Create weighting frameworks for different domains

**Topics:**

1. **Weighting philosophy** (35 min lecture)
   - Why the Foundation rubric weights vendor and GL at 10 points each
   - Why approval controls are weighted high (PO match: 9 points)
   - Why audit trail is weighted lower (confidence: 7 points)
   - How to reweight for different risk profiles
     - High-risk firm (new vendor onboarding): Boost vendor criteria to 12 points
     - High-volume firm (efficiency > rigor): Reduce accrual layer, boost vendor+GL
     - Public company (audit-heavy): Boost audit trail and accrual, add tax criteria
     - Non-profit (fraud risk): Boost policy and approval, add restricted fund validation

2. **Risk profile assessment** (30 min lecture)
   - Questionnaire: What are your top 5 audit findings? What do regulators focus on?
   - Historical data: Which errors cause restatements? Which cause delays?
   - Vendor composition: New vendors high? High-touch vendors? Blanket POs?
   - GL composition: Many cost centers? Shared GL accounts? Complex allocations?
   - Policy complexity: Strict 3-way matching? Auto-approval? Exception tracking?

3. **Lab: Reweight the rubric** (2.5 hrs)
   - Given 3 firm profiles (high-risk, high-volume, audit-heavy), reweight all 16 criteria
   - Run 100-invoice dataset through each weighting and compare outcomes
   - Which rubric variant catches the most errors? Misses the fewest?
   - Which variant is "too strict" (fails too many good invoices)?

4. **Domain-specific rubrics** (30 min lecture)
   - Invoice validation: Full 16 criteria
   - Accrual reversal: Emphasize accrual layer + audit trail (lower vendor/GL weight)
   - Bank reconciliation: Different criteria entirely (bank account match, amount exactly, cleared vs. pending)
   - Revenue recognition: Heavy on policy + accrual layer, new criteria for revenue GL accounts
   - Tax compliance: New criteria for tax treatment, withholding, bad debt reserve

5. **Lab: Design 2 domain-specific rubrics** (2 hrs)
   - Accrual reversal rubric: What criteria matter most? What gets lower weight?
   - Write specification for domain-specific criteria (e.g., "accrual was originally posted in period X; must reverse in period X+1")
   - Bank reconciliation rubric: Different criteria; full specification
   - Test each on sample data

6. **Rubric documentation template** (20 min lecture)
   - How to write a rubric so an auditor (or future you) understands the reasoning
   - Template: Criterion name, description, weighting, business impact, regulatory citation, exception policy

7. **Live workshop: Rubric review & feedback** (2 hrs)
   - Peers review your rubric reweighting and domain variants
   - Feedback: Is the weighting defensible? Have you missed criteria? Too strict/lenient?

**Knowledge Check:** Submit 2 rubric variants (high-risk and high-volume profiles) with full justification + 1 domain-specific rubric (accrual or bank recon)

---

### Week 3–4: Grader Design & Implementation

**Learning Outcomes:**
- Write a complete grader design document
- Specify all logic in a way engineers can implement
- Handle edge cases and exceptions
- Document the grader for audit defense

**Topics:**

1. **Grader architecture** (30 min lecture)
   - Grader as a decision engine: Input invoice → 16-criterion evaluation → score
   - Data dependencies: Grader needs access to master files (vendors, GL, employees, policies)
   - Failure modes: What if master file is stale? What if GL code is ambiguous?
   - Logging & audit trail: Grader must record all decisions and evidence

2. **Lab: Write a complete grader spec** (4 hrs)
   - You're designing a grader for a mid-sized firm (500 employees, 100 vendors, 100 GL accounts)
   - Write pseudocode for each of the 16 criteria
   - Handle edge cases (e.g., vendor recently merged, GL renamed, policy updated)
   - Specify data dependencies: What tables/files must the grader access?
   - Specify confidence scoring: How confident is the grader in each criterion check?
   - Write error handling: What happens if master file lookup fails?

3. **Integration patterns** (25 min lecture)
   - Grader as standalone CLI tool (read CSV → output scored CSV)
   - Grader as API endpoint (POST invoice → JSON response with scores)
   - Grader as embedded library (integrate into AR/AP system)
   - Grader as workflow trigger (invoice score → auto-approve/flag/escalate)

4. **Lab: Design a grader integration** (2 hrs)
   - Your firm uses NetSuite for AP
   - Design how the grader would integrate (pull invoices from NetSuite, score, post scores back)
   - Specify data format in/out
   - Design the workflow: When does grading happen? Auto or manual trigger?
   - Plan the audit trail: How do you prove the grader scored every invoice?

5. **Exception handling & edge cases** (30 min lecture)
   - Vendor merge: Old vendor ID no longer active, but invoice references it
   - GL change: Account was valid on invoice date but archived before review
   - Policy change: Approval limit was 50K on invoice date, now 25K
   - Master file lag: New vendor added to master yesterday; invoice references it from last week
   - Currency: Invoice in foreign currency; FX rate lookup fails

6. **Lab: Design exception handling** (1.5 hrs)
   - For each edge case above, design how the grader should behave
   - Should it fail strict? Flag for manual review? Look up historical data?
   - Document your logic and reasoning

7. **Grader design document template** (20 min lecture)
   - Architecture diagram
   - Data model (what fields the grader needs from the invoice)
   - Decision logic for each criterion (pseudocode or flowchart)
   - Exception policy and fallbacks
   - Logging & audit trail specification
   - Test plan (how to validate the grader works)

8. **Live workshop: Grader design presentations** (1.5 hrs)
   - Peer review of your grader design
   - Questions: Have you thought about scalability? What's the performance requirement?

**Knowledge Check:** Submit complete grader design document (10–15 pages) with architecture, logic, exception handling, and test plan

---

### Week 4–5: Testing & A/B Experimentation

**Learning Outcomes:**
- Design tests for rubric variants
- Run A/B tests on real data
- Measure rubric accuracy, false positive rate, coverage
- Iterate rubric based on test results

**Topics:**

1. **Rubric testing framework** (30 min lecture)
   - Accuracy: % of invoices scored correctly (vs. expert ground truth)
   - Precision: Of invoices flagged as fail, how many are actually bad? (avoid false positives)
   - Recall: Of actually bad invoices, how many did we catch? (minimize false negatives)
   - F1 score: Harmonic mean of precision and recall
   - Coverage: % of invoices with a scoring decision (not "unknown")

2. **Ground truth labeling** (25 min lecture)
   - How to build a ground truth dataset for testing
   - Recruit 2–3 expert accountants to label invoices as pass/fail
   - Measure inter-rater reliability (Cohen's kappa)
   - Resolve disagreements via discussion or subject matter expert

3. **Lab: Build a ground truth dataset** (2 hrs)
   - You're given 100 invoices
   - You label each as pass/fail based on the Foundation rubric
   - A peer reviews your labels; you resolve disagreements
   - This becomes your ground truth dataset

4. **A/B testing methodology** (35 min lecture)
   - Rubric Variant A: Standard weighting (Foundation rubric)
   - Rubric Variant B: Your customized weighting
   - Run both variants against the 100-invoice ground truth dataset
   - Compare: Which variant has higher accuracy? Lower false positive rate?
   - Calculate statistical significance (is the difference real or just noise?)

5. **Lab: Run A/B test** (3 hrs)
   - Test 3 rubric variants: standard, high-risk, high-volume
   - For each, calculate accuracy, precision, recall, F1 score
   - Identify which variant catches the most errors while avoiding false positives
   - Write a 1-page summary: "Which rubric should we use and why?"

6. **Iteration & refinement** (20 min lecture)
   - Based on A/B results, adjust weights or criteria
   - Re-test on the same ground truth dataset
   - Does the new variant improve accuracy?
   - Does it reduce false positives?

7. **Lab: Iterate your rubric** (1.5 hrs)
   - Based on your A/B test results, propose 2 adjustments to your rubric
   - Re-run both variants and compare to baseline
   - Document the changes and their impact on accuracy

8. **Performance & scale** (20 min lecture)
   - Grader must score 500 invoices in <5 seconds
   - Plan data dependencies and caching to avoid slow master file lookups
   - Consider batch processing vs. real-time scoring
   - Design monitoring: How do you track if the grader degrades over time?

**Knowledge Check:** Submit A/B test results with accuracy metrics + rubric improvement proposal + implementation plan

---

### Week 5–6: Defensibility & Audit Trail

**Learning Outcomes:**
- Document your rubric for audit defense
- Build audit trail logging into grader
- Prepare for external audit questions
- Create regulatory correspondence templates

**Topics:**

1. **Audit trail requirements** (30 min lecture)
   - What auditors ask: "Why did you score this invoice as fail?"
   - What regulators ask: "How do you ensure consistent evaluation?"
   - Audit trail must capture: Who scored it, when, with which rubric version, what evidence triggered the failure
   - Example: "Invoice 12345 failed Criterion 6 (GL account does not exist in master file as of 2026-08-24) under Rubric v1.2. Evaluated by system grader on 2026-08-24 at 14:32 UTC. Evidence: GL account 'X123' not found in COA_2026-08-24.xlsx."

2. **Rubric defensibility** (25 min lecture)
   - Alignment with Circular 230 and AICPA standards
   - Precedent: Other firms use similar rubrics (cite examples)
   - Independence: Rubric is vendor-agnostic, not self-serving
   - Consistency: All invoices scored by the same criteria
   - Transparency: Rubric is documented and available for audit review
   - Proportionality: Weighting reflects actual business risk (not arbitrary)

3. **Lab: Write your rubric defense memo** (1.5 hrs)
   - 3-page memo to your audit partner
   - Explain your rubric: Why these criteria? Why these weights?
   - Defend against likely audit questions: "How is this better than vendor confidence scores?"
   - Cite regulatory guidance
   - Include sample failing invoice with evidence trail

4. **Audit trail implementation** (30 min lecture)
   - Log every grader decision: Criterion name, pass/fail, evidence, timestamp, rubric version
   - Store logs immutably (append-only)
   - Provide query interface: "Show me all invoices that failed Criterion 6 in August"
   - Export logs as audit evidence: CSV for spreadsheet review, JSON for system integration

5. **Lab: Design audit logging spec** (2 hrs)
   - What data must be logged for each invoice evaluation?
   - How is the log stored and queried?
   - How do you prove the log hasn't been tampered with?
   - Write a query spec: "Pull all invoices failing criterion 6, group by vendor, export to CSV"

6. **Regulatory correspondence** (30 min lecture)
   - How to respond to IRS inquiries about AI verification
   - AICPA inquiry response template
   - Audit adjustment defense: "We caught this error with our rubric; here's the evidence"
   - Restatement prevention: How to use rubric scores to avoid earnings misstatement

7. **Lab: Write 2 regulatory correspondence templates** (1 hr)
   - IRS letter: "What procedures do you use to verify AI-generated AP entries?"
   - Audit response: "The attached rubric evaluation shows 97% of invoices are correct; here are the 6 exceptions we corrected"

**Knowledge Check:** Submit audit defense memo + audit logging spec + 2 regulatory correspondence templates

---

### Week 6–7: Real-World Implementation

**Learning Outcomes:**
- Plan grader deployment in your firm
- Build rollout plan and change management
- Train AP team on the new rubric
- Measure success and iterate

**Topics:**

1. **Deployment planning** (30 min lecture)
   - Pilot phase: Test grader on 500 invoices, 2-week window
   - Measure: Accuracy, precision, recall, time to score, false positive rate
   - Stakeholder feedback: AP manager, finance controller, audit partner
   - Adjust rubric based on pilot results
   - Production rollout: Score 100% of invoices starting [date]

2. **Change management** (25 min lecture)
   - Announce to AP team: "New verification step starting [date]"
   - Training: 2-hour session on what the rubric is, why it matters, how to act on results
   - Support: Designate a rubric "power user" for Q&A
   - Feedback loop: Weekly check-ins first month, monthly after
   - Incentives: Reward low failure rate? Celebrate improvements?

3. **Lab: Design your deployment plan** (2 hrs)
   - Write a 2-week pilot plan (which invoices, which metrics to track?)
   - Write a 2-page rollout memo to finance leadership
   - Design the AP team training agenda (outline only)
   - Plan for feedback and iteration

4. **Monitoring & dashboard** (30 min lecture)
   - Real-time metrics: Daily pass rate, failure breakdown by criterion, failure breakdown by vendor
   - Trend analysis: Is pass rate improving over time? (May indicate AI tool improvement or rubric calibration)
   - Anomaly detection: Sudden spike in failures → investigate (policy change? new vendor wave? AI tool update?)
   - Vendor metrics: Which vendors have highest failure rate? Why?

5. **Lab: Design your monitoring dashboard** (1 hr)
   - What metrics should be on the dashboard?
   - What's the alerting threshold (e.g., if pass rate < 85%, investigate)?
   - Who sees what (AP manager: all metrics; CFO: summary only)?

6. **Continuous improvement** (20 min lecture)
   - Monthly rubric review: Adjust weights or criteria based on real data?
   - Quarterly audit trail analysis: Are the failed invoices actually problematic or false positives?
   - Annual refresh: Rubric v1.1 reflects 1 year of data + feedback
   - Vendor feedback: "Your rubric is too strict on currency validation—we often get late-posted FX rates"

7. **Live workshop: Implementation & scaling** (1.5 hrs)
   - Peer feedback on your deployment plan
   - Common pitfalls: Overoptimizing too early, not training AP team, ignoring vendor feedback

**Knowledge Check:** Submit complete deployment + monitoring plan (with dashboard specs)

---

### Week 7–8: Capstone Project

**Learning Outcomes:**
- Design and document a complete custom rubric
- Defend it against peer and expert review
- Prepare for Practitioner exam

**Topics:**

1. **Capstone assignment: Design a complete rubric for your firm** (12–15 hrs)
   - Situation: You work at [specific firm profile: Big Four, mid-size regional, nonprofit, etc.]
   - Task: Design a complete rubric variant optimized for your firm's risk profile
   - Deliverables:
     - 7-layer DoD (2 pages)
     - Reweighted 16-criterion rubric with justification (3 pages)
     - Grader design document with pseudocode (5 pages)
     - Audit logging specification (2 pages)
     - A/B test results on sample data (2 pages)
     - Audit defense memo (2 pages)
     - Deployment & monitoring plan (2 pages)
     - **Total: 18–20 page professional document**

2. **Capstone review meeting** (1 hr, live)
   - You present your rubric to 2 peers and 1 instructor
   - Peers ask challenging questions: "Why this weighting?" "Have you thought about X risk?"
   - Instructor asks: "How would you defend this to an auditor?"
   - Feedback: Strengths, gaps, areas for improvement

3. **Capstone exam: Write a custom rubric** (6 hrs, take-home)
   - You're given a firm profile (industry, size, risk tolerance, AP volume, historical issues)
   - You design a complete 16-criterion rubric with custom weighting
   - You write a 10-page grader design document
   - You run A/B test (provided dataset) and report results
   - You write an audit defense memo
   - **Passing score: 80%+ on rubric quality, defensibility, completeness**

**Knowledge Check:** Capstone exam (write custom rubric with supporting documentation)

---

## Practitioner Exam Format

**Format:** Take-home capstone project + live defense  
**Duration:** 6 hours for written work; 1 hour for defense meeting  
**Content:**
1. Custom rubric design (16 criteria with justified weighting)
2. Grader design document (architecture, logic, exceptions)
3. A/B test results (accuracy, precision, recall on sample dataset)
4. Audit defense memo (regulatory citations, defensibility)
5. Live defense (peer + instructor review, Q&A)

**Passing Score:** 80%+ on technical quality, defensibility, completeness, and oral presentation  
**Retakes:** One retake offered; if failed second time, must wait 6 months before reapplying

**What You'll Receive:**
- Practitioner Certificate (digital + printable)
- Rubric design recognized in your name (used internally)
- Access to Advanced-level curriculum
- LinkedIn badge + credentials
- Testimonial from instructors for your firm's leadership

---

## Practitioner Time Summary

| Component | Hours |
|-----------|-------|
| Recorded lectures & workshops | 12 |
| Lab work (DoD, rubric, grader design) | 20 |
| A/B testing & iteration | 12 |
| Audit trail & defensibility | 8 |
| Implementation planning | 6 |
| Capstone project | 20 |
| Capstone defense | 2 |
| **Total** | **80** |

**Weekly breakdown:** 10 hours/week for 8 weeks

---

# LEVEL 3: ADVANCED (12 Weeks)

## Overview

Master controls, governance, and autonomous system design. Learn to implement kill switches, audit oversight, compliance frameworks, and real-time risk management. Design a fully controlled AP workflow that meets regulatory expectations. This level assumes complete Practitioner competency.

**Time Commitment:** 12–14 hours/week  
**Format:** Lectures + design workshops + capstone project (controlled workflow design)  
**Prerequisites:** Practitioner certificate

---

## Learning Objectives

By the end of Advanced, you will be able to:

1. **Design a complete controls framework** for AI-generated AP (preventive, detective, corrective controls)
2. **Implement kill switches & circuit breakers** for risky invoices
3. **Build governance & oversight structures** (who reviews what, escalation paths)
4. **Create compliance mappings** to COSO Internal Control Framework
5. **Design audit trail & monitoring** for regulatory defense
6. **Manage model decay & drift** (when the AI tool's quality degrades over time)
7. **Build autonomy limits & approval workflows** (when to auto-approve, when to escalate)
8. **Design exception handling & variance investigation** processes
9. **Plan audit coverage & sampling** strategies
10. **Create incident response playbooks** (what to do if the grader fails catastrophically)

---

## Module Breakdown

### Week 1–2: Controls Framework & COSO Alignment

**Learning Outcomes:**
- Understand COSO Internal Control Framework (5 components)
- Design preventive controls (stop bad invoices before posting)
- Design detective controls (catch errors after posting)
- Design corrective controls (fix and restate)

**Topics:**

1. **COSO Internal Control Framework overview** (35 min lecture)
   - Component 1: Control Environment (tone at top, ethics, competence)
   - Component 2: Risk Assessment (identify AI-specific risks)
   - Component 3: Control Activities (prevent/detect/correct)
   - Component 4: Information & Communication (logging, transparency)
   - Component 5: Monitoring & Evaluation (ongoing testing, improvement)
   - How AI creates new risks and control needs

2. **AI-specific risk identification** (30 min lecture)
   - Confidently wrong errors: AI system high confidence, but invoice is invalid
   - Model drift: AI quality degrades over time (new vendors, policy changes, environment drift)
   - Vendor concentration: AI performs well on large vendors, poorly on small vendors
   - Edge cases: Unusual invoices (multi-year, multi-currency, reversals) that AI struggles with
   - Systemic failures: Entire batch of invoices wrong (corrupted data, policy rollback, vendor master update)

3. **Preventive controls** (40 min lecture)
   - Control Activity: Run grader before posting
     - Process: Invoice entered in AP system → grader evaluates → one of three outcomes:
       - Auto-pass: Post immediately (low-risk vendors, typical invoices)
       - Flag for review: Hold, wait for human decision (medium-risk)
       - Auto-reject: Block posting, return to data entry (high-risk, critical failures)
     - Parameters: What triggers each outcome? Risk score threshold, vendor risk tier, amount threshold
   - Control Activity: Vendor risk tier assignment
     - Process: New vendor onboarding → assign risk tier (low/medium/high)
     - Low-risk: Established vendors, high volume, good history → auto-pass all invoices
     - Medium-risk: New vendors, moderate volume, some issues → flag for review
     - High-risk: Sanctioned vendors, low volume, many issues → auto-reject or escalate to procurement
   - Control Activity: Policy compliance gate
     - Process: Grader checks AP policy compliance before posting
     - Examples: No invoices > $50K without CFO approval; no future-dated invoices; no duplicate invoice #s
   - Control Activity: GL account lockdown
     - Process: Some GL accounts (e.g., cash, bank) are never available for invoice posting
     - Grader automatically rejects any invoice to a locked GL
   - Strength: These controls prevent bad data from entering the system in the first place

4. **Detective controls** (40 min lecture)
   - Control Activity: Post-posting grader audit (weekly)
     - Process: Every Friday, re-grade all invoices posted that week
     - Outcome: If grading changed or new issues found, escalate (likely due to master file update)
     - Goal: Catch errors that weren't caught at posting time
   - Control Activity: Exception reports
     - Process: Daily report of invoices that failed grader but were manually approved anyway
     - Owners: Finance controller, AP manager review daily
     - Goal: Ensure exceptions are intentional and documented
   - Control Activity: Reconciliation controls
     - Process: Invoice total in AP system should match graded invoice total; differences highlighted
     - Owners: Accounting team investigates discrepancies
   - Control Activity: Vendor reconciliation
     - Process: Invoices by vendor should reconcile to vendor statements; reconcile weekly
     - Owners: AP team; high-variance vendors escalated to buyer
   - Control Activity: Bank reconciliation
     - Process: Paid invoices should reconcile to cleared checks; differences flagged
     - Owners: Treasury; unmatched items investigated within 5 days
   - Strength: These controls catch errors that slip past preventive controls

5. **Corrective controls** (30 min lecture)
   - Control Activity: Invoice reversal & restatement
     - Process: If invoice discovered to be wrong after posting, reverse it (DR/CR entry)
     - Owner: Finance controller approves reversal
     - Goal: Don't let bad invoices sit; fix them quickly
   - Control Activity: Variance investigation & resolution
     - Process: Anything that doesn't reconcile gets investigated
     - Owners: AP team for invoices, reconciliation team for GL accounts
     - SLA: All variances investigated within 5 business days
   - Control Activity: Audit trail correction
     - Process: If grader made an error, log the correction (not delete the original)
     - Owners: Grader development team; change tracked in rubric version history
   - Strength: These controls minimize the impact of errors that slip past preventive & detective controls

6. **Lab: Design your controls framework** (3 hrs)
   - You're given a firm profile (Big Four, mid-size, nonprofit, etc.)
   - Design preventive controls (3 specific examples)
   - Design detective controls (3 specific examples)
   - Design corrective controls (2 specific examples)
   - Write a COSO alignment memo explaining how your controls map to COSO components
   - Estimate the cost/benefit: How much does this framework cost? What's the risk reduction?

7. **Live workshop: Controls design review** (1.5 hrs)
   - Peer feedback on your controls framework
   - Questions: What happens if a control fails? Is the backup control sufficient?

**Knowledge Check:** Submit controls framework with COSO alignment + cost/benefit analysis

---

### Week 2–3: Kill Switches & Circuit Breakers

**Learning Outcomes:**
- Understand kill switch design
- Implement circuit breaker logic (fail-safe, fail-open, fail-manual)
- Specify emergency procedures
- Document escalation paths

**Topics:**

1. **Kill switch concept** (30 min lecture)
   - Kill switch: A hard stop that prevents bad invoices from posting
   - Why needed: Catastrophic grader failure, data corruption, system compromise
   - Examples:
     - Grader confidence < 60% → kill switch engaged, require manual review
     - Grader fails 50% of invoices in a batch → kill switch engaged, stop processing
     - Master file corrupted → kill switch engaged, require manual data entry
     - AI tool updates without testing → kill switch engaged, use previous version
   - Philosophy: Better to stop 100% of invoices for 1 hour than to post 10 bad invoices

2. **Circuit breaker patterns** (35 min lecture)
   - **Fail-safe:** If grader fails or is unavailable, stop posting, require manual approval
     - Scenario: Grader system down
     - Action: AP system halts; all invoices require manual approval from finance controller
     - SLA: Resume within 1 hour (escalated to IT if not)
   - **Fail-open:** If grader fails, allow posting with extra scrutiny
     - Scenario: Grader service slow (5+ minute response time)
     - Action: Allow posting, but flag for extra review; post invoice with "grader unavailable" note
     - Risk: Some bad invoices post, but they're flagged for follow-up review
   - **Fail-manual:** If grader detection confidence < threshold, escalate to human
     - Scenario: Grader uncertain about vendor validity (60% confidence)
     - Action: Escalate to AP manager; they manually verify vendor; then post
     - SLA: Manager reviews within 30 minutes

3. **Kill switch specifications** (30 min lecture)
   - **Kill Switch 1: Grader reliability**
     - Trigger: Grader response time > 30 seconds OR grader fails to return a score
     - Action: Halt invoice posting; escalate to IT
     - Manual override: Finance manager can force-post after manual review
   - **Kill Switch 2: Batch failure rate**
     - Trigger: Grader fails > 50% of invoices in a batch
     - Action: Stop processing; investigate root cause
     - Likely causes: Master file update, policy change, AI tool update
     - Resolution: Verify the issue, adjust grader settings, resume
   - **Kill Switch 3: Confidence threshold**
     - Trigger: Average grader confidence < 70%
     - Action: Escalate to compliance team; don't auto-post; require manual review
     - Example: New AI vendor with unknown quality
   - **Kill Switch 4: Unexpected exceptions**
     - Trigger: Grader encounters error it's never seen before (new error type)
     - Action: Log error, alert support team, escalate to VP Finance
     - Goal: Catch novel failure modes early

4. **Lab: Design kill switch logic** (2.5 hrs)
   - You're designing for a firm with 500 invoices/day, $50M AP annual
   - Define 4 kill switches with specific trigger thresholds
   - For each, specify:
     - Trigger condition (exact metric and threshold)
     - Automatic action (what the system does)
     - Human action (who intervenes and when)
     - Manual override (how to force-continue if needed)
     - SLA (how fast to respond)
   - Document the escalation path (AP manager → Controller → VP Finance → CIO)

5. **Emergency procedures** (20 min lecture)
   - Scenario 1: Grader system down for 30+ minutes
     - Step 1: Alert finance leadership
     - Step 2: Manually review and approve invoices (do not use grader)
     - Step 3: Record each manual approval with timestamp and approver
     - Step 4: When grader resumes, re-grade all manually-approved invoices
     - Step 5: Investigate why grader was down; prevent recurrence
   - Scenario 2: Batch of 100 invoices fails grader quality check (>70% fail rate)
     - Step 1: Stop processing; quarantine the batch
     - Step 2: Investigate: Is it a vendor data quality issue? Policy change? AI tool issue?
     - Step 3: Get AP manager to spot-check 5 invoices manually
     - Step 4: If confirmed bad, escalate to procurement (vendor data issue) or IT (system issue)
     - Step 5: Do not post any invoices from this batch until resolved
   - Scenario 3: Grader starts failing 30% of invoices (vs. usual 5%)
     - Step 1: Likely cause: Master file updated (vendors, GL, policies)
     - Step 2: Check logs; compare today's master to yesterday's
     - Step 3: Identify the change; assess impact
     - Step 4: Adjust grader weighting if needed; re-test on sample invoices
     - Step 5: Resume normal processing with monitoring

6. **Lab: Write emergency procedures** (1.5 hrs)
   - Document 3 emergency scenarios with step-by-step procedures
   - For each, specify:
     - Who gets notified and when?
     - What data needs to be preserved?
     - How long can invoices be blocked?
     - How to resume normal processing?

7. **Live workshop: Kill switch testing** (1 hr)
   - Discuss: Have you tested kill switches? What happened?
   - Common mistakes: Kill switch too sensitive (false alarms), too loose (doesn't catch failures)
   - Best practices: Test kill switches quarterly, document results

**Knowledge Check:** Submit kill switch specifications + emergency procedures + testing plan

---

### Week 3–4: Governance & Approval Workflows

**Learning Outcomes:**
- Design approval workflows based on risk
- Implement role-based access control
- Create escalation paths and SLAs
- Document governance structure

**Topics:**

1. **Risk-based approval workflows** (35 min lecture)
   - Low-risk invoices (auto-pass)
     - Criteria: Vendor risk tier = low, amount < $5K, GL not restricted, policy compliant
     - Action: Auto-approve, post immediately
     - Audit trail: Logged as "system-approved"
     - No human intervention needed
   - Medium-risk invoices (flag for review)
     - Criteria: Vendor risk tier = medium OR amount $5–50K OR low-confidence fields
     - Action: Hold for 24 hours; AP manager reviews and approves or rejects
     - SLA: Manager approval within 1 business day
     - If no approval within SLA, escalate to controller
   - High-risk invoices (escalate for approval)
     - Criteria: Vendor risk tier = high OR amount > $50K OR grader failed critical criterion
     - Action: Hold for review; escalate to controller or VP Finance
     - SLA: Approval within 2 business days
     - If no approval within SLA, escalate to CEO (likely policy exception)
   - Exceptions (manual override)
     - Criteria: Invoice fails grader but has business justification (e.g., one-time vendor, emergency purchase)
     - Action: AP manager or controller can force-approve with written explanation
     - Requirement: Must record exception reason in system; audit team reviews exceptions monthly
     - Risk: Manual overrides can accumulate; must monitor and escalate patterns

2. **Role-based access control** (25 min lecture)
   - **AP Clerk** (lowest privilege)
     - Can enter invoices, run grader, see scoring results
     - Cannot override grader decisions or approve invoices
   - **AP Manager** (medium privilege)
     - Can approve medium-risk invoices
     - Can view exception reports
     - Cannot force-post high-risk invoices; cannot change grader settings
   - **Finance Controller** (high privilege)
     - Can approve all invoices including high-risk
     - Can review exception reports and audit trail
     - Cannot change grader settings (need IT)
   - **Compliance Officer** (audit privilege)
     - Read-only access to all data and audit trails
     - Can run reports, export data, spot-check invoices
     - Cannot approve invoices or change settings
   - **Grader Admin** (system privilege)
     - Can adjust grader settings, update weighting, change thresholds
     - Must have approval from compliance officer before changes
     - All grader changes logged and auditable

3. **Escalation paths & SLAs** (30 min lecture)
   - Invoice submitted → grader scores → one of three paths:
     - **Path A: Auto-pass** (low-risk)
       - Outcome: Posted immediately
       - SLA: N/A (system automatic)
     - **Path B: Require approval** (medium-risk)
       - Escalates to: AP manager
       - Deadline: 1 business day
       - If not approved: Escalate to controller
       - Deadline: 1 additional business day
       - If not approved: Hold or reject (do not auto-post)
     - **Path C: Escalate immediately** (high-risk)
       - Escalates to: Controller
       - Deadline: 2 business days
       - If not approved: Escalate to VP Finance/CFO
       - Deadline: 1 business day
       - If not approved: Hold or reject
   - Vendor payment is delayed if approval SLA is missed
   - Exceptions logged, reviewed, and reported to audit

4. **Lab: Design your approval workflow** (3 hrs)
   - Define risk tiers for your firm's vendors (low/medium/high)
   - Define approval requirements for each risk tier + amount combination
   - Create a decision tree: "Given vendor tier and amount, what approval is needed?"
   - Write SLAs for each approval path
   - Design role definitions (who can do what)
   - Design exception process (when can someone override?)

5. **Governance structure & committee** (25 min lecture)
   - **Monthly Governance Meeting** (1 hour)
     - Attendees: AP Manager, Finance Controller, Compliance Officer, VP Finance
     - Agenda:
       - Review exception report: How many invoices were manually overridden? Why?
       - Review failure trends: Are certain vendors failing more? Certain GL accounts?
       - Review grader performance: Is accuracy on target? Any degradation?
       - Review audit findings: Did auditors or regulators flag anything?
       - Approve any grader setting changes for next month
     - Outcome: Documented decisions, action items, next month's thresholds
   - **Quarterly Audit Review** (90 min)
     - Attendees: All governance committee + internal auditors
     - Agenda:
       - Deep dive on top 10 failed invoices: Were they correctly flagged?
       - Review audit trail completeness: Can we defend all decisions?
       - Review exception trends: Any patterns in manual overrides?
       - Stress test: How would we handle a grader failure? Do kill switches work?
       - Audit observation: Any concerns for external audit?
     - Outcome: Audit report, remediation plan if needed

6. **Lab: Document your governance structure** (2 hrs)
   - Write the charter for your monthly governance meeting (mission, attendees, agenda, frequency)
   - Define the roles and responsibilities (who owns what)
   - Write the approval matrix (for each invoice type, who must approve?)
   - Create a 1-page escalation path flowchart

7. **Compliance evidence collection** (20 min lecture)
   - Every month, generate:
     - Exception report (invoices approved despite grader failure)
     - Audit trail report (all invoices scored, by grader version)
     - Performance report (pass rate, failure breakdown, confidence levels)
     - Governance meeting minutes (decisions, changes, approvals)
   - Store these artifacts: Evidence of systematic verification for auditors/regulators

**Knowledge Check:** Submit approval workflow + governance structure + compliance evidence template

---

### Week 4–5: Audit Trail & Monitoring

**Learning Outcomes:**
- Build audit trail infrastructure
- Design monitoring & alerting
- Create dashboard for governance
- Plan audit preparation

**Topics:**

1. **Audit trail requirements** (35 min lecture)
   - **What to log:**
     - Invoice data: ID, vendor, amount, GL, date, description, PO
     - Grader input: Which fields were used? Which master files were consulted?
     - Grader output: Score, pass/fail, reasoning for each criterion
     - Grader version: Which rubric version? Which master file versions?
     - Grader confidence: Confidence for each criterion
     - Approval: Who approved it? When? Manual override reason?
     - Posting: When was it posted? To which GL account? Amount?
     - Any subsequent reversals or corrections
   - **How to log:**
     - Immutable append-only log (no deletions, only additions)
     - Timestamp every entry (UTC, ISO 8601 format)
     - Hash of previous entry (detect tampering)
     - Stored in central repository (database, data warehouse, cloud storage)
   - **How long to keep:**
     - Retention: 7 years (SOX requirement for public companies, IRS standard)
     - Backup: Daily backups; restore capability tested quarterly
     - Access: Controlled; audit team can query, but cannot modify

2. **Audit trail schema** (30 min lecture)
   - Table: `invoice_grading_log`
     - Fields: log_id, timestamp, invoice_id, vendor_id, amount, gl_account, invoice_date, grader_version, rubric_version
     - Fields: criterion_1_pass, criterion_1_evidence, criterion_1_confidence, ... (repeat for 16 criteria)
     - Fields: overall_score, pass_fail, approval_status, approver_id, approval_reason, posted_date
   - Example row: Invoice #12345 scored on 2026-08-24 at 14:32 UTC with Rubric v1.2; Vendor exists (pass, confidence 99%), GL exists (pass, confidence 98%), Amount reasonable (fail, confidence 85%), ... overall score 87%, approved by ap_manager@firm.com, posted on 2026-08-24 at 15:00 UTC
   - Query: "Show me all invoices from vendor X that failed criterion 6"; "Show me all manual overrides in August"; "Which grader version was used for invoices posted between date A and date B?"

3. **Lab: Design audit logging system** (2 hrs)
   - Database schema: Create tables for invoice, grading, approval, posting logs
   - Query library: Write SQL for 10 common audit queries
   - Data retention policy: When to archive old logs? How to secure backups?
   - Compliance: Show how to export logs for external audit

4. **Real-time monitoring & alerting** (35 min lecture)
   - **Daily dashboard:**
     - Pass rate: % of invoices scored as pass (target: 85–95%)
     - Failure breakdown: Which criteria are failing most? (Vendor? GL? Policy?)
     - Manual override count: How many manual approvals today? (target: < 5% of invoices)
     - Processing time: How long is grading taking? (target: < 5 sec per invoice)
     - Grader availability: Is grader system up? Any errors?
   - **Alerts:**
     - If pass rate < 80%: Alert AP manager (potential issue)
     - If pass rate > 98%: Alert compliance officer (grader too lenient?)
     - If manual overrides > 10%: Alert controller (too many exceptions)
     - If grader response time > 30 sec: Alert IT (performance degradation)
     - If grader fails to score an invoice: Alert immediately (system error)
   - **Weekly report:**
     - Top 10 failing vendors: Which vendors have highest failure rate?
     - Top 10 failing GL accounts: Which GL accounts are causing issues?
     - Trend analysis: Is quality improving, degrading, or stable?
     - Exception analysis: What business reasons are cited for manual overrides?
   - **Monthly governance review:**
     - Summarize all metrics; compare to last month
     - Identify any concerning trends
     - Propose rubric adjustments if needed
     - Plan for next month

5. **Lab: Design monitoring dashboard** (2 hrs)
   - Define KPIs (key performance indicators)
   - Design visual layout: Which metrics on which dashboard?
   - Define alerting thresholds for each metric
   - Write SQL queries for each metric
   - Create sample dashboard screenshots (can be low-fidelity)

6. **Audit preparation** (30 min lecture)
   - **Before audit:**
     - Extract full audit trail for audit period (e.g., Jan–Jun 2026)
     - Summarize: Total invoices, pass rate, failure breakdown
     - Prepare sampling list: Pull statistical sample of passed invoices + all failed invoices
     - Prepare documentation: Rubric, grader spec, governance meeting minutes, exception memos
     - Prepare management letter: What did you do? What issues did you find? How did you respond?
   - **During audit:**
     - Auditor may ask: "Show me 5 invoices that failed. How do we know the grader was correct?"
     - You provide: Full audit trail for those 5 invoices + expert review (did the grader assess correctly?)
     - Auditor may ask: "What if the grader itself is wrong? How do we know?"
     - You provide: A/B test results + ground truth labeling (we validated the grader against expert assessment)
     - Auditor may ask: "What controls do you have if the grader fails?"
     - You provide: Kill switch specs + emergency procedures + control effectiveness test results

7. **Lab: Prepare an audit response package** (2 hrs)
   - Given a sample 100-invoice dataset:
     - Generate full audit trail extract
     - Calculate summary statistics
     - Pull statistical sample (30 passed + all failed for audit review)
     - Prepare documentation: Rubric, grader spec, governance minutes
     - Write a 2-page "AI Verification Summary" for auditor

**Knowledge Check:** Submit audit trail schema + monitoring dashboard specs + sample audit response package

---

### Week 5–6: Model Decay & Continuous Improvement

**Learning Outcomes:**
- Understand model decay and drift
- Implement monitoring for quality degradation
- Design rubric refresh cycles
- Plan vendor and policy updates

**Topics:**

1. **Model decay concept** (30 min lecture)
   - **Definition:** Over time, the grader's performance degrades because:
     - New vendors enter master file (grader hasn't seen them)
     - Policy changes (old rubric weights no longer match new policy)
     - AI tool updates (vendor releases new model; quality changes unpredictably)
     - Environmental drift (invoices become different: new languages, new formats, new exceptions)
   - **Examples:**
     - Month 1: Grader 85% accuracy on validation set
     - Month 3: Grader 82% accuracy on new invoices (slight decay)
     - Month 6: Grader 78% accuracy (noticeable decay)
     - Root cause: New vendors (30% of current volume); they're failing vendor checks
     - Solution: Update vendor master file, re-test grader, adjust weighting if needed

2. **Monitoring for decay** (30 min lecture)
   - Track grader performance over time (weekly)
     - Compare: % of invoices passing grader today vs. last month
     - Compare: % of manual overrides today vs. last month
     - Compare: Confidence levels today vs. last month (declining confidence suggests drift)
   - Alert if: Pass rate drops > 5% week-to-week OR confidence drops > 10% month-to-month
   - Investigation: When decay is detected, ask:
     - Did vendor master change? (Check master file update log)
     - Did policy change? (Check policy document version history)
     - Did AI tool update? (Check vendor release notes)
     - Did invoice patterns change? (Check sample invoices from this month vs. last month)

3. **Lab: Design decay detection system** (2 hrs)
   - Write queries to track grader accuracy over time
   - Define alert thresholds (at what decay % do we investigate?)
   - Create a weekly decay report (performance this week vs. historical average)
   - Simulate: Given 12 months of grading data, detect when decay occurs

4. **Rubric refresh cycles** (25 min lecture)
   - **Quarterly refresh:**
     - Review monthly governance reports from last quarter
     - Identify any patterns (which criteria are failing most? which vendors?)
     - Investigate: Is it a data quality issue, a policy change, or a rubric issue?
     - Decision: Adjust weighting? Add new criterion? Change threshold?
     - Test: A/B test old rubric vs. new on historical data
     - Approve: Finance controller signs off on new rubric
     - Deploy: New rubric starts in next month
   - **Annual refresh:**
     - Full audit trail review (past 12 months)
     - Expert ground truth validation: Pull 100 random invoices; expert accountants re-grade them
     - Compare: How did our rubric perform vs. expert assessment?
     - Identify: Any criteria that were wrong? Over-weighted? Under-weighted?
     - Redesign: Build new rubric based on annual learnings
     - Version: Rubric v1.x → v2.0 (major version bump if significant changes)

5. **Lab: Simulate rubric refresh** (2 hrs)
   - Given 12 months of grading data + monthly governance reports
   - Identify patterns: Which criteria are causing issues?
   - Propose rubric changes (reweight 3 criteria, add 1 new criterion, change 1 threshold)
   - Test: A/B test old rubric vs. new on historical data; show improvement
   - Document: Write a quarterly refresh summary

6. **Vendor master & policy updates** (20 min lecture)
   - Vendor master changes (weekly):
     - New vendors added: Automatically assign risk tier (usually "medium" until history built)
     - Vendors merged or renamed: Update mapping; re-grade recent invoices from that vendor
     - Vendors inactivated: Set effective date; flag any invoices after that date
     - Risk tier changes: If a vendor's risk profile changes, adjust approval workflow
   - Policy updates (monthly):
     - Approval limits change: Adjust thresholds in grader
     - New policy added: Add new criterion or sub-criterion to rubric
     - Policy removed: Deprecate criterion or reduce weighting
     - Policy clarification: Document interpretation; update grader logic

7. **Continuous improvement process** (20 min lecture)
   - Monthly:
     - Governance meeting: Review metrics, identify issues, plan adjustments
   - Quarterly:
     - Rubric review: A/B test, decide on changes, deploy new rubric version
   - Annually:
     - Full validation: Expert re-grading of sample, compare to rubric, design new rubric
   - As-needed:
     - Emergency updates: If critical bug found (e.g., criteria not being calculated correctly), fix immediately

8. **Lab: Design continuous improvement process** (1.5 hrs)
   - Create a calendar showing when reviews happen (monthly, quarterly, annual)
   - Define the process for each review (what data to collect, what to analyze, what decisions to make)
   - Write templates: Monthly governance agenda, quarterly rubric review memo, annual validation plan

**Knowledge Check:** Submit decay detection system + quarterly refresh example + continuous improvement calendar

---

### Week 6–7: Exception Management & Variance Investigation

**Learning Outcomes:**
- Design exception tracking and approval
- Build variance investigation procedures
- Create SLAs and accountability
- Document patterns and trends

**Topics:**

1. **Exception taxonomy** (30 min lecture)
   - **Policy exception:** Invoice fails grader but has legitimate business reason
     - Example: New vendor relationship (vendor not yet in master); approved by procurement
     - Action: AP manager approves with business justification; logged as exception
     - SLA: Must be documented within 24 hours of posting
   - **Data quality exception:** Invoice fails grader due to data entry error, not a real problem
     - Example: Vendor code typo (missing digit), but context makes it clear which vendor
     - Action: Correct the data, re-grade, usually passes; if still fails, escalate
     - SLA: Correction within 48 hours
   - **System exception:** Grader fails, but invoice is actually fine
     - Example: Grader confidence < 70% due to ambiguous vendor name, but AP manager verified it manually
     - Action: Log as system exception; update grader if needed
     - SLA: Must be analyzed for pattern (is this happening a lot?)
   - **Unknown/unclear:** Invoice fails but reason is not obvious
     - Example: Vendor appears valid, amount reasonable, but grader gave low confidence
     - Action: Escalate to compliance; deep investigate; may reveal grader bug or unusual invoice
     - SLA: Investigate within 5 business days

2. **Exception approval workflow** (25 min lecture)
   - Invoice fails grader → AP manager must decide:
     - Option A: Reject the invoice (return to data entry for correction)
     - Option B: Override grader (approve anyway), log exception
   - If Option B (override), AP manager must:
     - Select exception type: Policy, data quality, system, or unclear
     - Document reason: "New vendor not yet in master; approved by procurement"
     - Provide evidence: Link to procurement approval email or document
     - Set risk level: Low (not concerning), medium (will monitor), or high (needs investigation)
   - Finance controller approves all high-risk exceptions:
     - Reviews AP manager's justification
     - May ask for additional documentation
     - Approves or rejects (if rejects, invoice is rejected)
   - Exceptions logged in central repository; reviewed monthly in governance meeting

3. **Variance investigation procedures** (30 min lecture)
   - **Monthly exception review:**
     - Count: How many invoices were overridden? (target: < 5% of volume)
     - Type breakdown: How many policy exceptions vs. data quality vs. system?
     - Vendor breakdown: Which vendors have most exceptions? (May indicate vendor data quality issue)
     - Trend: Is exception rate increasing? (May indicate grader decay or policy change)
   - **Investigation triggers:**
     - If > 10% of invoices are exceptions: Investigate root cause
     - If same vendor has > 20% exception rate: Investigate vendor data quality
     - If new grader version has > 2x exception rate of old version: Revert or re-calibrate
   - **Investigation process:**
     - Review sample of exceptions (10–20 random ones)
     - For each: Is the exception justified? Could it have been prevented?
     - Look for patterns: Are most exceptions from one vendor? One GL? One amount range?
     - Root cause analysis: Why is this happening?
     - Corrective action: Fix vendor data? Update rubric? Retrain AP team?

4. **Lab: Design exception management** (2 hrs)
   - Create an exception tracking form (fields: invoice ID, reason, evidence link, approver, date)
   - Write the exception approval workflow (AP manager reviews, controller approves if needed)
   - Design a monthly exception report (count, type breakdown, vendor breakdown, trend analysis)
   - Write investigation procedures for when exceptions exceed target rate

5. **Variance investigation for GL/financial reporting** (25 min lecture)
   - **Three-way reconciliation:**
     - Invoice entered in AP system
     - GL entry posted to accounting system
     - Vendor statement received
     - All three should reconcile (same vendor, same amount, same date)
   - **Reconciliation process (weekly):**
     - Pull AP invoices from past week
     - Pull GL postings from past week
     - Pull vendor statements
     - Compare: Do they match?
     - Variances: Investigate and resolve within 5 business days
   - **Common variances:**
     - Timing: Invoice posted in AP this week, but GL won't post until next week (expected)
     - Rounding: FX conversion causes $0.01 difference (expected, acceptable)
     - Duplicate: Invoice posted twice (error; reverse one entry)
     - Missing: Invoice in AP but no GL entry (error; investigate)
     - Extra: GL entry but no invoice (error; investigate)

6. **Lab: Design three-way reconciliation** (1.5 hrs)
   - Create a reconciliation worksheet (invoice ID, vendor, amount, date; GL account, amount, date; vendor statement)
   - Write procedures for matching and investigating variances
   - Design a weekly reconciliation report (# matched, # variance, # in progress, # resolved)

7. **Accountability & trending** (20 min lecture)
   - Each exception owner is identified: Who submitted the invoice? Who overrode the grader?
   - Accountability:
     - AP clerk: Responsible for accurate data entry; too many data quality exceptions → coaching
     - AP manager: Responsible for accurate exception decisions; too many policy exceptions → review authority
     - Procurement: Responsible for vendor master data quality; too many vendor exceptions → improve processes
   - Trending:
     - Track exceptions by owner over time
     - Recognize improvements (exception rate down)
     - Flag degradation (exception rate up)
     - Use as input to annual performance reviews (Do you follow the grader? Do you override appropriately?)

**Knowledge Check:** Submit exception management procedures + three-way reconciliation process + sample monthly exception report

---

### Week 7–8: Incident Response & Crisis Management

**Learning Outcomes:**
- Prepare for grader failure scenarios
- Design incident response playbooks
- Plan recovery and communication
- Document lessons learned

**Topics:**

1. **Incident severity levels** (25 min lecture)
   - **Severity 1 (Critical):** Grader completely down; invoices cannot be scored
     - Impact: AP process halted; invoices backup
     - Response: Immediate (within 15 minutes)
     - Escalation: IT, Finance VP, CFO
   - **Severity 2 (High):** Grader inconsistently scoring; some invoices may be incorrectly scored
     - Impact: Risk of bad invoices posting
     - Response: Urgent (within 1 hour)
     - Escalation: Compliance officer, Finance Controller
   - **Severity 3 (Medium):** Grader performance degraded; still working, but quality down
     - Impact: More invoices flagged for review; longer approval times
     - Response: Within business day
     - Escalation: Governance meeting, plan for fix
   - **Severity 4 (Low):** Minor grader bug (e.g., confidence score not calculated correctly)
     - Impact: Audit trail slightly inaccurate, but operational impact minimal
     - Response: Plan fix for next release
     - Escalation: Grader development team

2. **Incident response playbooks** (35 min lecture)
   - **Playbook 1: Grader System Down**
     - Detection: Grader service unreachable; IT monitoring alerts immediately
     - Immediate actions (first 15 min):
       - Notify: Finance VP, AP Manager, Compliance Officer
       - Activate: Fail-safe mode (halt invoice processing, require manual approval)
       - Preserve: Screenshot current system state for investigation
     - Investigation (15–60 min):
       - IT diagnoses: Why is grader down? (Server crash? Database failure? Network issue?)
       - Estimate: How long to fix? (< 1 hour? 1–4 hours? > 4 hours?)
     - Mitigation (ongoing):
       - If < 1 hour estimated: Wait for fix
       - If 1–4 hours: Activate manual processing (all invoices require AP manager approval; bypass grader)
       - If > 4 hours: Escalate to executive team; consider delaying invoice posting or using backup system
     - Recovery: When grader is back up:
       - Test: Run grader on 10 test invoices; verify scoring is correct
       - Regrade: Re-grade all invoices submitted while grader was down
       - Reconcile: Verify GL posting is accurate; no corrupted data
     - Communicate: Update finance team on status every 30 minutes until resolved
   - **Playbook 2: Batch Failure (> 50% fail rate)**
     - Detection: Monitoring alert; governance dashboard shows > 50% fail rate
     - Immediate actions (first 30 min):
       - Halt: Stop automatic processing; require manual review of all invoices
       - Investigate: Pull sample of failed invoices; what's the common cause?
       - Preserve: Save the batch for analysis
     - Root cause analysis (next 1–2 hours):
       - Check logs: What changed? (Master file update? Policy change? AI tool update?)
       - Compare: Today's invoices vs. yesterday's; what's different?
       - Verify: Is the grader actually failing correctly, or is it a false alarm?
     - Decision (within 4 hours):
       - If grader is correct (invoices actually bad): Acknowledge; work with AP team to resolve
       - If grader is wrong (invoices are good but grader is failing): Identify bug; disable grader or adjust settings
       - If ambiguous: Escalate to subject matter expert (accountant, AI expert) for review
     - Recovery: Reprocess invoices once root cause is fixed
   - **Playbook 3: Audit Discovery (Auditor finds error the grader missed)**
     - Scenario: External audit finds an invoice error that the grader scored as pass
     - Immediate actions:
       - Understand: What was the error? Why did grader miss it?
       - Scope: How many other invoices might have the same issue?
       - Assess: Is this a grader bug or an exceptional edge case?
     - Investigation:
       - Review grader logic for that criterion: Is it correct?
       - Back-test: Re-grade all invoices with current grader; how many have same issue?
       - Root cause: Is the rubric insufficient? Is the implementation buggy?
     - Fix:
       - If bug: Identify, fix, re-test on historical data
       - If rubric gap: Add new criterion or adjust weighting; A/B test; deploy
       - If exceptional edge case: Document; note as limitation; plan for manual review of similar invoices
     - Communication to auditor:
       - Timeline: When did we discover the issue?
       - Scope: How many invoices affected?
       - Impact: Did it result in material misstatement?
       - Fix: What did we do? Is it fixed now?
       - Prevention: How will we prevent this in the future?

3. **Lab: Write incident response playbooks** (2.5 hrs)
   - Write detailed playbook for 3 Severity 1–2 incidents:
     - Grader system down
     - Batch failure (> 50% invoices failing)
     - Discovery of audit error
   - For each playbook, include:
     - Definition of incident
     - Severity level and response time SLA
     - Detection mechanism
     - Immediate actions (first hour)
     - Investigation steps
     - Decision criteria
     - Recovery steps
     - Communication plan

4. **Crisis communication** (20 min lecture)
   - Keep stakeholders informed (every 30 minutes for Severity 1, every 2 hours for Severity 2)
   - Update format:
     - What's the status?
     - What's the root cause (if known)?
     - What's the ETA for fix?
     - What actions are being taken?
   - Escalation communication:
     - If > 1 hour: Notify executive team
     - If > 4 hours: Consider public disclosure (if firm has external audit)
     - If > 1 business day: Board-level notification may be needed (depends on materiality)

5. **Post-incident reviews** (20 min lecture)
   - Within 48 hours of resolution: Hold post-incident review with team
   - Questions:
     - What caused the incident?
     - How did we detect it?
     - Was our response appropriate?
     - What could we have done better?
     - What process improvements should we make?
   - Outputs:
     - Incident report (1–2 pages)
     - Root cause analysis
     - Corrective actions (1–3 specific improvements)
     - Timeline for implementing corrections

6. **Lab: Write post-incident review** (1 hr)
   - Given a scenario (grader was down for 2 hours; invoice batch backup resulted)
   - Write incident report: What happened? Why? How did we respond?
   - Root cause analysis: Was it an IT infrastructure issue? A data issue? A rubric issue?
   - Corrective actions: Specific improvements to prevent recurrence

**Knowledge Check:** Submit incident response playbooks (3 scenarios) + sample post-incident review + crisis communication template

---

### Week 8–9: Compliance & Audit Defense

**Learning Outcomes:**
- Prepare for external audit
- Document compliance evidence
- Respond to regulator inquiries
- Build defendable control framework

**Topics:**

1. **Audit preparation** (30 min lecture)
   - **Before audit engagement:**
     - Notify auditors: We have AI-generated AP entries; here's our verification process
     - Provide overview: Hand over rubric, grader spec, sample audit trail
     - Set expectations: Here's what you can expect; here's what we've documented
   - **During audit planning:**
     - Auditors understand: AP process now involves AI; they need to audit both the AI output AND the verification process
     - Planning questions: How many invoices are AI-generated? What volume? What materiality threshold?
     - Risk assessment: Are AI-generated invoices higher or lower risk than manual?
   - **Audit procedures:**
     - Sampling: Auditors will pull a sample of AI-generated invoices for detailed testing
     - Verification: For each invoice, they'll verify:
       - AI grading score makes sense (is the vendor ID correct? GL account correct?)
       - Our verification process worked (did we catch any errors? If yes, how?)
       - Compliance: Is the invoice compliant with policy?
     - Audit trail: They'll review grader logs; verify system integrity; check for missing logs
     - Controls: They'll test kill switches, escalation procedures, exception handling

2. **Audit evidence checklist** (25 min lecture)
   - Prepare these artifacts for audit:
     - Rubric specification (current version, signed by Finance VP)
     - Grader design document (architecture, logic, exceptions)
     - Grader testing results (A/B test, accuracy metrics)
     - Audit trail sample (50 invoices, showing full log for each)
     - Exception report (all manual overrides for audit period)
     - Exception analysis (why were they overridden? Was it appropriate?)
     - Controls documentation (COSO alignment, kill switches, governance procedures)
     - Governance meeting minutes (all decisions, all approvals documented)
     - Management letter (summary of AI verification process)
     - Incident log (any grader failures? How were they resolved?)

3. **Lab: Prepare audit evidence package** (2.5 hrs)
   - Given a 100-invoice sample (50 passed, 30 failed, 20 exceptions):
     - Extract full audit trail for each invoice
     - Prepare exception analysis: For each exception, explain why it was overridden
     - Document controls: Show how kill switches would catch errors
     - Write management letter: 2-page summary of AI verification program
     - Compile all evidence into a binder (organized by audit topic)

4. **Regulator inquiry responses** (30 min lecture)
   - **IRS inquiry:** "What procedures do you use to verify AI-generated invoices?"
     - Response: Hand over rubric, sample audit trail, exception analysis
     - Key message: We use a systematic, documented process; every invoice is evaluated against consistent criteria
   - **AICPA inquiry:** "Do you comply with Circular 230 §10.22 for AI verification?"
     - Response: Our rubric is mapped to Circular 230 requirements; here's the mapping
     - Key message: We exercise due diligence over accuracy; we have documented procedures
   - **SEC/PCAOB inquiry** (if public company): "Are your financial statements supported by adequate evidence?"
     - Response: Our AI-generated AP was verified using this framework; we can provide evidence for any invoice
     - Key message: We have comprehensive audit evidence; no material AP entries are unverified
   - **State CPA Board** (if disciplinary inquiry): "Why didn't you catch this error?"
     - Response: Depends on the error:
       - If our grader should have caught it: Acknowledge; show how we fixed the process; show that no other invoices have the same error
       - If it's an exceptional edge case: Acknowledge; explain why it's exceptional; show that similar invoices are monitored manually
       - If it's not actually an error: Provide evidence (audit trail, expert review, regulatory citations) showing we were correct

5. **Lab: Write regulator response letters** (2 hrs)
   - Write 2–3 sample letters:
     - IRS: Respond to inquiry about AI verification procedures
     - AICPA: Respond to inquiry about Circular 230 compliance
     - Auditor: Respond to audit adjustment proposal (we say the invoice is correct; here's our evidence)

6. **Continuous compliance monitoring** (25 min lecture)
   - Monthly compliance checklist:
     - Audit trail completeness: Are all invoices logged? Any missing entries?
     - Control effectiveness: Did our controls catch the errors they're supposed to?
     - Exception appropriateness: Were exceptions justified?
     - Regulatory changes: Any new compliance requirements we need to address?
   - Quarterly compliance review:
     - Compare to Circular 230 §10.22: Are we still compliant?
     - Compare to AICPA ET 1.300.001: Are we maintaining accuracy standards?
     - Compare to COSO Internal Control Framework: Are our controls still effective?
   - Annual compliance assessment:
     - Full review: Are we still in compliance with all applicable standards?
     - Audit trail review: Did anyone circumvent controls? Any gaps in logging?
     - Remediation: If any gaps found, fix within 30 days

**Knowledge Check:** Submit audit evidence checklist + sample audit response package + compliance monitoring calendar

---

### Week 9–10: Vendor Integration & Scalability

**Learning Outcomes:**
- Design API for third-party grader access
- Plan scaling to multiple entities/vendors
- Implement multi-tenancy if needed
- Monitor performance and reliability

**Topics:**

1. **API design for grader** (30 min lecture)
   - Endpoint: POST `/api/grade`
   - Input: Invoice data (vendor ID, amount, GL, date, description, etc.)
   - Output: Score, pass/fail, criterion details, confidence levels
   - Authentication: API key; track usage per firm
   - Rate limiting: Max 100 invoices/second per firm (prevent abuse)
   - Versioning: `/api/v1/grade` allows backward compatibility as rubric changes
   - Error handling: Return clear error messages if input is invalid or grader fails

2. **Scaling to multiple entities** (30 min lecture)
   - Single entity (your firm): Simpler; grader operates on single vendor master, single GL, single policy
   - Multi-entity (multiple firms using your grader):
     - Need separate master files for each firm (vendor masters are different)
     - Need separate policies for each firm
     - Need separate audit trails for each firm
     - Need separate exception handling for each firm
   - Database design:
     - Add `firm_id` to all key tables
     - Vendor master scoped to firm: Only firm's vendors
     - GL master scoped to firm: Only firm's GL accounts
     - Policy scoped to firm: Only firm's policies
   - Grader logic: Query `where firm_id = X` for all master file lookups
   - API authentication: Firm's API key determines which firm's data they can access

3. **Multi-tenancy considerations** (25 min lecture)
   - Data isolation: Firm A cannot see Firm B's invoices, audit trails, or exceptions
   - Performance: Grader must efficiently serve multiple firms in parallel (thousands of invoices/hour)
   - Customization: Each firm can have custom rubric (v1.2 for firm A, v1.3 for firm B)
   - Regulatory: Each firm's audit trail must be separate and secure
   - Cost: Grader resources shared across firms, but metered per firm (billing based on usage)

4. **Lab: Design multi-tenant grader** (2 hrs)
   - Database schema: Add firm_id to all tables; ensure data isolation
   - API design: Show how firm_id is passed in requests
   - Audit trail: How to ensure firm A cannot access firm B's logs?
   - Performance: Estimate performance (max invoices/hour) on shared infrastructure
   - Monitoring: How to track usage and costs per firm?

5. **Performance & reliability** (30 min lecture)
   - Target performance: Score 500 invoices/minute (1 invoice/second)
   - Bottlenecks:
     - Master file lookups: If vendor master has 10K vendors, lookup is fast (hash table)
     - GL lookups: Same; if GL master has 1K accounts, lookup is O(1)
     - Policy evaluation: Usually fast; just conditional logic
     - Confidence scoring: May be complex; can be expensive if using ML
   - Caching:
     - Cache vendor master in memory; update when vendor master changes (daily)
     - Cache GL master in memory; update when GL changes (weekly)
     - Cache policy rules; update when policy changes (monthly)
   - Reliability:
     - Redundancy: Run grader on 2+ servers; if one fails, failover to other
     - Monitoring: Track latency, error rate, availability
     - SLA: Grader should be up 99.9% of time (< 1 hour downtime/month)

6. **Lab: Performance testing & optimization** (2 hrs)
   - Design performance test:
     - Generate 10K invoices (mix of vendors, GLS, amounts)
     - Grade them; measure: time, throughput, CPU/memory usage
   - Identify bottlenecks (which step is slowest?)
   - Propose optimization (cache master files, parallelize grading, use faster lookups)
   - Re-test; measure improvement

**Knowledge Check:** Submit multi-tenant grader design + API specification + performance test results

---

### Week 10–11: Advanced Topics & Domain Specialization

**Learning Outcomes:**
- Design specialized rubrics for different domains
- Implement machine learning for rubric optimization
- Plan for future AI capabilities
- Advise executives on AI governance

**Topics:**

1. **Domain specialization** (30 min lecture)
   - Different domains have different risks:
     - **AP Invoices:** Vendor accuracy, amount validation, period cutoff (our base rubric)
     - **Accrual reversals:** Period cutoff is critical; GL must reverse same account as original accrual
     - **Bank reconciliation:** Amount and date must match exactly; cleared status must be accurate
     - **Revenue recognition:** GL account type and amount must align with contract terms; cutoff critical
     - **Tax provisions:** Tax GL must be correct; deductibility must be verified; basis calculations critical
   - Each domain needs different weighting or different criteria

2. **Lab: Design domain-specific rubrics** (3 hrs)
   - Design 2 domain-specific rubrics:
     - **Accrual reversal rubric:**
       - Criterion: Reversal GL matches original accrual GL (weight: 12)
       - Criterion: Reversal amount equals original accrual amount (weight: 11)
       - Criterion: Reversal date is in correct period (weight: 10)
       - Other criteria: Description, audit trail, policy compliance (lower weights)
     - **Bank reconciliation rubric:**
       - Criterion: Amount matches exactly (weight: 12)
       - Criterion: Date matches (or within 1–2 days) (weight: 11)
       - Criterion: Cleared status matches bank statement (weight: 10)
       - Other criteria: GL account (must be bank/cash), description, audit trail
   - For each, write rubric spec and test on sample data

3. **ML-based rubric optimization** (25 min lecture)
   - Advanced: Use machine learning to learn optimal rubric weights
   - Approach:
     - Collect: 1000 invoices, each labeled as pass/fail by expert accountants (ground truth)
     - Train: ML model to predict expert's pass/fail decision using 16 criteria as features
     - Weights: Model learns which criteria matter most (implicit weighting)
     - Compare: Does ML-optimized rubric beat hand-tuned rubric?
   - Benefit: ML can discover weighting that humans might miss
   - Risk: ML is a black box; not as defensible as hand-tuned rubric
   - Use case: After hand-tuned rubric stabilizes, experiment with ML to see if you can improve

4. **Lab: Design ML-based optimization** (1.5 hrs)
   - Outline the ML approach:
     - Data collection: How many invoices needed? How to label?
     - Model selection: Logistic regression? Random forest? Other?
     - Training: How to prevent overfitting?
     - Evaluation: Cross-validation; compare to current rubric
     - Deployment: How would you use ML weights in production?

5. **Future AI capabilities** (25 min lecture)
   - Today: Rubric-based scoring (deterministic)
   - Tomorrow: Probabilistic scoring (ML model predicts probability of correctness)
   - Beyond: Multimodal AI (analyze invoice image + GL master + vendor data + policy in one model)
   - Impact on controls:
     - Probabilistic: Requires different decision thresholds (confidence score instead of pass/fail)
     - Multimodal: More accurate, but less interpretable (harder to explain why it failed)
     - Governance: Need to update controls framework as AI capabilities evolve

6. **Executive advisory** (20 min lecture)
   - How to advise CFO/CRO on AI governance:
     - Recommend: Build verification framework before deploying AI widely
     - Warn: Vendor confidence scores are self-serving; use independent verification
     - Warn: AI tools degrade over time; plan for monitoring and retraining
     - Recommend: Implement controls early; prevents future audit complications
     - Recommend: Document everything; auditors will ask for evidence
     - Recommend: Plan for exception management; perfect accuracy is unachievable

7. **Lab: Write executive briefing** (1.5 hrs)
   - 2-page briefing to CFO on AI governance best practices
   - Key points:
     - Why AI verification matters (regulatory, risk management)
     - What a best-practice framework looks like (our 3-level curriculum)
     - What it costs (rough estimates: design phase, ongoing monitoring)
     - What it achieves (audit evidence, risk reduction, competitive advantage)

**Knowledge Check:** Submit 2 domain-specific rubrics + ML optimization outline + executive briefing

---

### Week 11–12: Capstone Project & Comprehensive Control Design

**Learning Outcomes:**
- Design a complete, production-grade control framework
- Integrate all components (rubric, grader, governance, monitoring, incident response)
- Defend against external audit and regulator scrutiny
- Prepare for implementation

**Topics:**

1. **Capstone assignment: Design a comprehensive control framework** (15–20 hrs)
   - Situation: Large accounting firm implementing AI for AP processing
   - Scope: Design end-to-end framework covering:
     - Risk assessment and control strategy
     - Rubric design and grader specification
     - Preventive, detective, corrective controls
     - Governance and approval workflows
     - Monitoring and alerting dashboard
     - Audit trail and evidence collection
     - Incident response playbooks
     - Compliance evidence package
     - Training and communication plan
     - Continuous improvement process
   - Deliverables: 30–40 page comprehensive control framework document
     - Executive summary (2 pages)
     - Risk assessment (2 pages)
     - Control strategy (3 pages)
     - Rubric specification (5 pages)
     - Grader design (5 pages)
     - Governance procedures (5 pages)
     - Monitoring and alerting (3 pages)
     - Audit trail specification (3 pages)
     - Incident response playbooks (4 pages)
     - Compliance evidence (2 pages)
     - Training plan (1 page)
     - Appendices: Workflows, decision trees, sample reports

2. **Capstone review sessions** (2 hrs, live)
   - Week 1: You present rubric and grader design (1 hr)
   - Week 2: You present governance and controls framework (1 hr)
   - Peer feedback and expert guidance on each component

3. **Advanced exam: Design and defend a control framework** (8 hrs, take-home)
   - You're given a firm profile and scenario
   - Task: Design a complete, production-ready control framework
   - Components:
     - Risk assessment (identify top 10 AP risks)
     - Custom rubric (justify weighting)
     - Control design (preventive, detective, corrective)
     - Governance (approval workflow, roles)
     - Monitoring (dashboard, KPIs)
     - Audit defense (evidence package, regulatory response)
   - Grading: Technical quality (60%), defensibility (20%), completeness (20%)
   - Passing score: 80%+

4. **Final oral defense** (1 hr, live)
   - You present your control framework to panel
   - Panel: 1 instructor, 1 audit partner, 1 compliance officer
   - Questions:
     - Why did you design it this way?
     - How would you defend this to an auditor?
     - What's your contingency if this control fails?
     - How would you staff this (who owns what)?
   - Evaluation: Technical depth, business understanding, ability to defend decisions

**Knowledge Check:** Advanced exam (design comprehensive control framework) + oral defense

---

## Advanced Exam Format

**Format:** Take-home capstone project + live oral defense  
**Duration:** 8 hours for written work; 1 hour for defense meeting  
**Content:**
1. Risk assessment (identify AP risks specific to firm scenario)
2. Custom rubric design with detailed weighting justification
3. Complete control framework (preventive, detective, corrective)
4. Governance procedures with approval workflows
5. Monitoring dashboard and KPI specifications
6. Audit trail and evidence collection design
7. Incident response playbooks
8. Compliance evidence package
9. Training and communication plan
10. Oral defense (demonstrate mastery and ability to advise leadership)

**Passing Score:** 80%+ on technical quality, defensibility, completeness, and oral presentation  
**Retakes:** One retake offered; if failed second time, must wait 12 months before reapplying

**What You'll Receive:**
- Advanced Certificate (digital + printable)
- Recognized as "AOA Certified" in your industry
- Access to Domain Endorsements
- LinkedIn badge + premium credentials
- Speaker invitation for AOA community events
- Opportunity to review peer capstones (mentor role)

---

## Advanced Time Summary

| Component | Hours |
|-----------|-------|
| Recorded lectures & workshops | 18 |
| Lab work (controls, grader, governance) | 32 |
| Monitoring & compliance design | 12 |
| Incident response & audit defense | 12 |
| Vendor integration & scalability | 6 |
| Advanced topics & domain specialization | 8 |
| Capstone project | 25 |
| Capstone review & defense | 3 |
| **Total** | **116** |

**Weekly breakdown:** 12–14 hours/week for 12 weeks

---

# DOMAIN ENDORSEMENTS (2 Weeks Each)

After completing the Advanced level, earn domain-specific endorsements. Each endorsement demonstrates expertise in a specialized area of AI accounting verification.

---

## Domain Endorsement: AP Invoice Validation

**Duration:** 2 weeks (12 hours/week)  
**Prerequisites:** Advanced certificate  
**Format:** Intensive lab work + practical exam on real (anonymized) invoices

**Topics:**
- Vendor master data quality and validation
- Invoice duplicate detection (invoice number, vendor, amount combination)
- GL account validation and mapping
- Currency and FX rate validation
- Amount reasonableness and outlier detection
- PO matching and three-way match logic
- Policy compliance checks (approval limits, vendor restrictions)
- Description validation (avoiding AI hallucinations)
- Audit trail requirements for invoice supporting documentation

**Capstone Exam:**
- You receive 50 real invoices from a production AP system (anonymized)
- You score each invoice using the AP Invoice Validation rubric
- You identify failures and triage by severity
- You write a memo to the AP manager: "Here are the 8 invoices you need to review"
- Passing score: 85%+ accuracy on scoring

**What You'll Receive:**
- AP Invoice Validation Endorsement (credential showing specialization)
- Certificate that can be appended to your AOA credential
- LinkedIn badge for AP expertise
- Invitation to contribute to AP Invoice rubric improvements
- Peer recognition in AOA community

---

## Domain Endorsement: Bank Reconciliation

**Duration:** 2 weeks (12 hours/week)  
**Prerequisites:** Advanced certificate  
**Format:** Intensive lab work + practical exam on real bank reconciliation data

**Topics:**
- Bank statement matching (amount, date, cleared status)
- Reconciling items (in-transit deposits, outstanding checks)
- Bank fees and interest (GL posting accuracy)
- Reconciliation variance investigation procedures
- Multi-bank scenarios (multiple cash accounts, subsidiaries)
- Currency and FX handling in bank recon
- Audit trail for bank reconciliation (which transactions settled? when?)
- Fraud detection in bank recon (duplicate deposits, missing items)

**Capstone Exam:**
- You receive a month's bank statements + AP posting data (anonymized)
- You reconcile the bank account
- You identify reconciling items (5–10 are expected; more suggests issues)
- You investigate any unusual items
- You write a reconciliation memo: "Account is reconciled; 2 items under investigation"
- Passing score: 95%+ on reconciliation accuracy (any material variance fails)

**What You'll Receive:**
- Bank Reconciliation Endorsement
- Certificate + LinkedIn badge
- Recognition as specialized in treasury/cash controls
- Invitation to contribute to bank recon rubric improvements

---

## Domain Endorsement: Accrual Reversal

**Duration:** 2 weeks (12 hours/week)  
**Prerequisites:** Advanced certificate  
**Format:** Intensive lab work + practical exam on real accrual reversals

**Topics:**
- Accrual identification (which GL entries are accruals?)
- Reversal logic (reverse in next period, same GL, opposite amount)
- Period cutoff validation (accrual in period 1, invoice in period 2)
- GL account type matching (accrual GL must match invoice GL)
- Amount validation (reversal amount matches accrual amount)
- Description validation (accrual reversal description must reference original accrual)
- Multi-period accruals (amortization, capitalization)
- Audit trail for accrual lifecycle (created, reversed, possibly re-accrued)

**Capstone Exam:**
- You receive 50 accrual entries + reversals from a production close (anonymized)
- For each accrual, verify:
   - Was it correctly accrued in period 1?
   - Was it correctly reversed in period 2?
   - Did the invoice match the accrual?
- You identify any errors (incorrect amounts, wrong GL, missing reversals)
- You write a memo: "46 accrual reversals are correct; 4 need investigation"
- Passing score: 90%+ accuracy

**What You'll Receive:**
- Accrual Reversal Endorsement
- Certificate + LinkedIn badge
- Recognition as specialized in financial close processes
- Invitation to improve accrual reversal rubric

---

## Domain Endorsement: Revenue Recognition

**Duration:** 2 weeks (12 hours/week)  
**Prerequisites:** Advanced certificate  
**Format:** Intensive lab work + practical exam on real revenue transactions

**Topics:**
- Revenue GL account validation (must be revenue, not AR or deferred)
- ASC 606 compliance (performance obligation, contract terms, cutoff)
- Revenue recognition timing (invoice date vs. performance date vs. GL posting date)
- Amount validation (invoiced amount vs. contractual amount, discounts)
- Customer master data quality
- Sales order matching (revenue GL must reference sales order)
- Deferred revenue handling (liability GL for unperformed obligations)
- Audit trail for revenue lifecycle (order, invoice, GL posting)
- Tax implications (nexus, entity type, deductions)

**Capstone Exam:**
- You receive 50 revenue entries from a production AR system (anonymized)
- For each entry, verify:
   - Is the GL account correct (revenue, not AR)?
   - Is the amount consistent with contract and invoice?
   - Is the timing correct (within correct fiscal period)?
   - Is ASC 606 compliance evident?
- You identify errors and flag for revenue team
- You write a memo: "45 entries are compliant; 5 require revenue team review"
- Passing score: 90%+ accuracy

**What You'll Receive:**
- Revenue Recognition Endorsement
- Certificate + LinkedIn badge
- Recognition as expert in revenue control processes
- Invitation to contribute to revenue recognition rubric

---

## Domain Endorsement: Payroll & Tax Withholding

**Duration:** 2 weeks (12 hours/week)  
**Prerequisites:** Advanced certificate  
**Format:** Intensive lab work + practical exam on payroll transactions

**Topics:**
- Employee master data quality
- Gross-to-net calculations (withholding, deductions)
- Tax compliance (federal, state, local, FICA, FUTA)
- GL posting accuracy (salary expense vs. tax payable vs. deduction liabilities)
- Payroll period cutoff (which employees in which pay period?)
- Multi-state payroll (different tax rules by state)
- Year-to-date validation (cumulative withholding, max withholding)
- Audit trail for payroll (timesheets, approval, posting, payments)

**Capstone Exam:**
- You receive 100 payroll entries from a production payroll system (anonymized)
- For each entry, verify:
   - Gross amount is reasonable (vs. salary, overtime)
   - Withholding amounts are correct (FICA, federal, state)
   - GL posting is correct (expense, payables, liabilities)
   - Tax compliance is evident (W-4 data, exemptions)
- You identify errors and flag for compliance review
- You write a memo: "95 entries are compliant; 5 require payroll/tax review"
- Passing score: 90%+ accuracy

**What You'll Receive:**
- Payroll & Tax Withholding Endorsement
- Certificate + LinkedIn badge
- Recognition as expert in payroll controls
- Invitation to contribute to payroll rubric

---

## Endorsement Stacking

You can earn multiple endorsements:
- **Foundation + 1 Endorsement:** 6 weeks total (AP expert)
- **Practitioner + 1 Endorsement:** 10 weeks total
- **Advanced + 1 Endorsement:** 14 weeks total (full specialist)
- **Advanced + 3 Endorsements:** 20 weeks total (master specialist)

Endorsements are stackable on your credential. Your title becomes:
- AOA Certified (Foundation only)
- AOA Certified Practitioner (Practitioner + 1 Endorsement)
- AOA Certified Advanced (Advanced + 1+ Endorsements)
- AOA Master Certified (Advanced + 3+ Endorsements)

---

# Summary: AOA Academy Curriculum

## Time Commitment by Level

| Level | Duration | Hours/Week | Prerequisites | Focus |
|-------|----------|-----------|----------------|-------|
| **Foundation** | 4 weeks | 8–10 | None | Learn the rubric; evaluate invoices |
| **Practitioner** | 8 weeks | 10–12 | Foundation | Design and tune rubrics; build graders |
| **Advanced** | 12 weeks | 12–14 | Practitioner | Controls, governance, compliance |
| **Endorsement** | 2 weeks | 12–15 | Advanced | Specialize in one domain |
| **Total Mastery** | 26 weeks + | 10–15/week | None | Full AI accounting governance expertise |

## Certification Pathway

```
Start → Foundation (4 wks) → Exam (pass/fail)
          ↓ (PASS)
        Practitioner (8 wks) → Capstone (pass/fail)
          ↓ (PASS)
        Advanced (12 wks) → Comprehensive Control Design (pass/fail)
          ↓ (PASS)
        Choose Endorsements (2 wks each)
          AP Invoice Validation
          Bank Reconciliation
          Accrual Reversal
          Revenue Recognition
          Payroll & Tax
        ↓
        AOA Master Certified (with endorsements)
```

## What Each Level Unlocks

**Foundation Certificate:**
- Prove you understand AI accounting verification
- Can evaluate invoices using industry-standard rubric
- Can read and interpret audit evidence
- Basic job qualification for audit/finance roles

**Practitioner Certificate:**
- Design and tune rubrics for your firm
- Build grader specifications engineers can implement
- A/B test rubric variants
- Defend your rubric to auditors and regulators

**Advanced Certificate:**
- Design complete control frameworks
- Implement governance and kill switches
- Prepare for external audit and regulatory scrutiny
- Advise executives on AI governance strategy

**Domain Endorsements:**
- Specialized expertise in one domain (AP, bank recon, accruals, revenue, payroll)
- Recognized expert credential
- Invitation to contribute to rubric improvements
- Peer leadership and mentoring

---

## Delivery Format

**Lectures:** Recorded, self-paced (can rewatch)  
**Labs:** Hands-on practice with real (anonymized) data  
**Discussions:** Weekly live sessions for Q&A (optional, recorded for async access)  
**Exams:** Practical, scenario-based assessments  
**Capstones:** Design projects with peer and expert review  

**Platform:** Learning management system (LMS) with progress tracking, discussion forums, resource library

**Community:** Peer networking, discussion board, monthly virtual meetups for AOA alumni

**Career Support:** Job board for AOA Certified professionals, testimonial assistance, resume review

---

## Who Should Enroll

- **CPA/Audit Partners** → Advanced level (design governance)
- **Finance Controllers** → Practitioner level (implement rubrics)
- **Compliance Officers** → Advanced level (controls & audit defense)
- **AP Managers** → Foundation level (learn evaluation) + maybe Endorsement (specialize)
- **AI Engineers** → Practitioner level (design graders)
- **Auditors** → Advanced level (understand AI controls)
- **Accounting Vendors** → Practitioner level (understand verification)

---

## Pricing (Example)

- **Foundation:** $1,500
- **Practitioner:** $2,500 (or $3,500 bundle with Foundation)
- **Advanced:** $3,500 (or $6,500 bundle with Foundation + Practitioner)
- **Domain Endorsement:** $800 each (or $2,000 for 3-endorsement bundle)
- **Full Mastery Bundle:** $12,000 (all 3 levels + 3 endorsements; 50% off regular pricing)

---

## Success Metrics

- **Exam pass rate:** Target 85% first attempt
- **Time to completion:** Foundation avg 4 weeks, Practitioner avg 8 weeks, Advanced avg 12 weeks
- **Post-certification employment:** Track job placements, salary outcomes
- **Firm implementation:** Track how many firms implement rubrics designed in curriculum
- **Auditor feedback:** Survey auditors on whether AOA-certified framework is defensible
- **Regulatory recognition:** Track any regulatory endorsement or citation of AOA standards
- **Alumni satisfaction:** NPS score target: 70+

---

## Future Roadmap

- **Year 2:** Add specialized tracks (forensic accounting verification, tax verification)
- **Year 3:** Develop train-the-trainer program (let accounting firms deliver curriculum internally)
- **Year 4:** Build integration partnerships (connect rubric design to accounting system APIs)
- **Year 5:** Seek AICPA accreditation (make AOA certificate recognized by profession)

---

**The AOA Academy: Where accounting professionals master AI governance.**

