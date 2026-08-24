# AP Invoice Validation Domain Pack v0.1

**Status:** Ready for Beta  
**Version:** 0.1-alpha  
**Updated:** August 24, 2026

---

## Executive Summary

The AP Invoice Validation Domain Pack is an **18-criterion, 41-check evaluation framework** for validating AI-generated Accounts Payable invoices against regulatory and policy standards.

**Criteria Categories:**
- Vendor Identification (3)
- GL Coding (3)  
- Amount Accuracy (3)
- Invoice Detail (3)
- Policy & Matching (2)
- Tax & Accrual (2)
- Audit Trail (2)

**Grader Hierarchy:** Deterministic → Retrieval-Grounded → Model-Based → Human

**Regulatory Mapping:** Circular 230 §10.22, AICPA ET §1.300, PCAOB AS 1105, ASC 606

---

## Criteria Specification

### **Category 1: Vendor Identification (3 checks)**

| ID | Criterion | Grader | Input | Evidence | Severity | Blocking | Citation |
|----|-----------|--------|-------|----------|----------|----------|----------|
| AP-001 | Vendor exists in master list | Deterministic | vendor_id, master_list | Lookup result | Critical | ✅ | Circular 230 §10.22 |
| AP-002 | Vendor not on fraud/blocked list | Deterministic | vendor_id, blocked_list | List check | Critical | ✅ | AICPA ET §1.300.001 |
| AP-003 | GL mapping valid for vendor | Deterministic | vendor_id, gl_account | Vendor-GL mapping | High | ✅ | PCAOB AS 1105 |

**Blocking Logic:**
- **Critical**: Auto-escalate to human. Do not post.
- **High**: Flag for review. Can post with approval.

---

### **Category 2: GL Coding (3 checks)**

| ID | Criterion | Grader | Input | Evidence | Severity | Blocking | Citation |
|----|-----------|--------|-------|----------|----------|----------|----------|
| AP-004 | GL account exists | Deterministic | gl_account, chart_of_accounts | CoA lookup | Critical | ✅ | Circular 230 §10.22 |
| AP-005 | GL account type correct | Deterministic | gl_account, account_type | Account classification | High | ✅ | PCAOB AS 1105 |
| AP-006 | Cost center valid | Deterministic | cost_center, valid_cc_list | Cost center lookup | High | ✅ | AICPA ET §1.300 |

**Blocking Logic:**
- **Critical**: Do not post.
- **High**: Flag, can post with approval.

---

### **Category 3: Amount Accuracy (3 checks)**

| ID | Criterion | Grader | Input | Evidence | Severity | Blocking | Citation |
|----|-----------|--------|-------|----------|----------|----------|----------|
| AP-007 | Amount non-zero, positive | Deterministic | amount | Math check | Critical | ✅ | Circular 230 §10.22 |
| AP-008 | Line items sum to total | Deterministic | line_items, total | Math: Σ lines = total | Critical | ✅ | PCAOB AS 1105 |
| AP-009 | Amount within reasonableness | Deterministic | amount, vendor_history | Trend check | Medium | ❌ | AICPA ET §1.300 |

**Note:** AP-009 uses vendor history (e.g., "Max invoice ever = $50k, this is $75k").

---

### **Category 4: Invoice Detail (3 checks)**

| ID | Criterion | Grader | Input | Evidence | Severity | Blocking | Citation |
|----|-----------|--------|-------|----------|----------|----------|----------|
| AP-010 | Invoice number present & unique | Deterministic | invoice_id, prior_invoices | Uniqueness check | Critical | ✅ | Circular 230 §10.22 |
| AP-011 | Invoice date valid | Deterministic | invoice_date | Date range check | High | ✅ | PCAOB AS 1105 |
| AP-012 | Description meaningful | Model | description | Quality rubric | Medium | ❌ | Circular 230 §10.22 |

**Note:** AP-012 uses a model-based rubric (e.g., "Description must be ≥5 words and non-generic").

---

### **Category 5: Policy & Matching (2 checks)**

| ID | Criterion | Grader | Input | Evidence | Severity | Blocking | Citation |
|----|-----------|--------|-------|----------|----------|----------|----------|
| AP-013 | PO required & matched (if policy) | Deterministic | po_number, policy | Policy lookup + match | High | ✅ | Circular 230 §10.22 |
| AP-014 | Policy compliance | Model | entire_invoice, policies | Policy rubric | Medium | ❌ | AICPA ET §1.300 |

**Note:** AP-013 is deterministic IF the firm has a policy; AP-014 is model-based for nuance.

---

### **Category 6: Tax & Accrual (2 checks)**

| ID | Criterion | Grader | Input | Evidence | Severity | Blocking | Citation |
|----|-----------|--------|-------|----------|----------|----------|----------|
| AP-015 | Tax treatment correct | Retrieval | tax_code, service_date | Authority match | High | ✅ | IRS Circular 230 |
| AP-016 | Accrual in correct period | Deterministic | service_date, invoice_date | Cutoff check | High | ✅ | ASC 606 |

**Note:** AP-015 requires retrieval of tax code authority; AP-016 is deterministic (service_date determines period).

---

### **Category 7: Audit Trail (2 checks)**

| ID | Criterion | Grader | Input | Evidence | Severity | Blocking | Citation |
|----|-----------|--------|-------|----------|----------|----------|----------|
| AP-017 | Source document cited | Deterministic | source_url/hash | Document hash | Medium | ❌ | PCAOB AS 1105 |
| AP-018 | AI confidence recorded | Deterministic | confidence_score | Numeric range | Medium | ❌ | Circular 230 §10.22 |

---

## Grader Map

Each criterion maps to a function that produces **evidence** and a **verdict**.

```yaml
AP-001:
  criterion: "Vendor exists in master list"
  grader_type: deterministic
  function: check_vendor_in_master
  inputs:
    - vendor_id (string)
    - master_vendor_list (CSV/JSON)
  outputs:
    - evidence: "Vendor found: {vendor_name} (ID: {vendor_id})"
    - verdict: PASS
    - severity: n/a
  error_output:
    - evidence: "Vendor not found: {vendor_id}. Checked {count} vendors in master list."
    - verdict: FAIL
    - severity: CRITICAL
    - next_steps:
      - "Add vendor to master list"
      - "Verify vendor ID"
      - "Escalate to AP manager"

AP-012:
  criterion: "Description meaningful"
  grader_type: model
  function: evaluate_description_quality
  inputs:
    - description (string)
  rubric:
    - "≥5 words"
    - "Not generic (avoid: 'invoice', 'expense', 'other')"
    - "Clear purpose (e.g., 'Office supplies for Q3 planning')"
  outputs:
    - evidence: "Description quality: {score}/100. Issues: {list}"
    - verdict: PASS / FLAG / FAIL
    - severity: MEDIUM
```

---

## Blocking Logic

**Verdicts:**
- **PASS** → Post immediately (straight-through)
- **FLAG** → Review recommended, can post with approval
- **FAIL** → Do not post, escalate

**Rules:**
```yaml
blocking_rules:
  critical_fail:
    action: "ESCALATE"
    message: "Critical failure in {criterion}. Requires human review."
    escalate_to: ["AP Manager", "Controller"]
    
  high_fail:
    action: "FLAG"
    message: "High severity issue in {criterion}. Recommend review."
    can_approve: true
    approval_required_for: "partner" # or "manager"
    
  medium_fail:
    action: "LOG"
    message: "Medium severity: {criterion}. Monitor trend."
    
  low_fail:
    action: "LOG"
    message: "Low severity: {criterion}."
```

---

## Replay Dossier Template

Every evaluation produces a **Replay Dossier** with:

```markdown
# AOA Replay Dossier — AP Invoice Batch
**Batch ID**: {uuid}
**Timestamp**: {ISO 8601}
**Evaluator**: AOA v0.1-alpha
**Reviewed By**: {Name}

## Summary
- **Total Invoices**: 50
- **Pass Rate**: 88%
- **Critical Failures**: 6
- **High Failures**: 4
- **Medium Failures**: 2
- **Estimated Resolution Time**: 45 min

## Row-Level Results
### Invoice #INV-2026-1234 (FAIL - Critical)
**Verdict**: ESCALATE (do not post)

**Finding**: Vendor AP-001 failed
- **Criterion**: Vendor exists in master list
- **Evidence**: Vendor ID "VENDOR-9999" not found in master list (checked 847 vendors)
- **Severity**: CRITICAL (blocks posting)
- **Regulatory Citation**: Circular 230 §10.22(b)

**Next Steps**:
1. [ ] Verify vendor ID spelling in source document
2. [ ] Check if vendor should be in master list
3. [ ] If new vendor: Add to master list and re-evaluate
4. [ ] If duplicate: Map to existing vendor ID and re-evaluate
5. [ ] If error: Escalate to AP manager with evidence

---

## Evidence Chain
- [Master Vendor List v2026-08-24](link)
- [Chart of Accounts](link)
- [Tax Code Reference](link)
- [Policy: PO Matching Requirements](link)
```

---

## Success Criteria (v0.1)

**Before Beta Launch:**
- [ ] All 18 criteria implemented
- [ ] Grader functions tested (unit tests)
- [ ] 50+ golden cases (should PASS)
- [ ] 20+ seeded errors (should FAIL)
- [ ] 10+ edge cases (boundary conditions)
- [ ] Replay Dossier generation working
- [ ] Regulatory citations verified (Circular 230, AICPA, PCAOB, ASC)

**Beta Testing (Sept 1-15):**
- [ ] 5-10 advisors test the pack
- [ ] 2-3 pilot firms evaluate real data
- [ ] Feedback collected on rubric + UX
- [ ] False positive/negative rates tracked

**v0.1 Locked (Sept 15):**
- [ ] Rubric finalized
- [ ] No more changes without version bump
- [ ] Criteria frozen (for regression testing)
- [ ] Ready for production deployment

---

## Related Documents

- **[AOA-DEC-003](../../DECISIONS/AOA-DEC-003.md)** — Product pivot to Domain Packs
- **[RELIANCE_v2.md](../../RELIANCE_v2.md)** — 5-object reliability architecture
- **[Circular 230 §10.22](../references/circular230-10-22.md)** — Tax preparer standards
- **[AICPA ET §1.300](../references/aicpa-et-1-300.md)** — Professional conduct standards

---

**Status**: Ready for Beta (Sept 1, 2026)
