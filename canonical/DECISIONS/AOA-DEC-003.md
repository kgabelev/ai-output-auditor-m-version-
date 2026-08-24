# AOA-DEC-003: Product Pivot to Domain Packs

**Date:** August 24, 2026  
**Owner:** Finance Engineering Team  
**Status:** APPROVED

---

## Decision

> **AOA v0.1-alpha will use AP Invoice AI Output Evaluation as the first Domain Pack, while retaining the generic Claim Ledger/evidence architecture as the platform core. The AP workflow is a proving ground for the methodology, not the definition of the entire platform.**

---

## Context

We built the core **RELIANCE Framework** (Claim Ledger + Evidence Graph + Execution Trace + Grader Registry) as a **generic platform** for evaluating any accounting workflow.

However, shipping a "platform" that can do "anything" but doesn't excel at "anything" is a recipe for failure.

**Better approach:** Ship Domain Packs that are **deeply excellent** for specific workflows.

---

## The Two Approaches

### ❌ **Approach A: Generic Platform (Wrong)**
- Build a flexible framework
- Hope firms customize it
- Result: Flexible but shallow, no clear use case, hard to sell

### ✅ **Approach B: Domain Packs (Correct)**
- Ship the AP Invoice Domain Pack v0.1 as the **MVP**
- Prove the methodology works for one workflow really well
- Scale to other domains (Reconciliations, Close, Tax) once AP is locked in
- Each Domain Pack is a complete, opinion-ated evaluation engine

---

## What This Means

### **AP Invoice Domain Pack v0.1**
- **18 criteria** (vendor, GL, amount, detail, policy, tax, audit trail)
- **41 expanded checks** (sub-criteria with deterministic + model graders)
- **Grader map** (function mappings for each criterion)
- **Blocking logic** (critical → escalate, high → flag, low → log)
- **Replay dossier template** (evidence chains for audit)

**Ship Date:** Week 2 (September 1-5)

### **Future Domain Packs**
- **Bank Reconciliation** (Q4 2026)
- **Accrual Reversal** (Q1 2027)
- **Close Controls** (Q1 2027)
- **Revenue Recognition** (Q2 2027)
- **Payroll & Tax** (Q2 2027)

Each pack is independently valuable and certifiable.

---

## Implications

| Area | What Changes |
|------|--------------|
| **Repo Structure** | Add `domain_packs/ap_invoice_validation/v0.1/` |
| **Rubric** | Lock in 18→41 criteria expansion for AP only |
| **Messaging** | "AP Invoice Validator" not "Generic Evaluation Engine" |
| **GTM** | Sell expertise in *one* domain, not everything |
| **Academy** | Foundation course focuses on AP + RELIANCE, then expand |
| **Pricing** | $X per engagement for AP, scale with new domains |

---

## What This Does NOT Change

- ✅ Core RELIANCE Framework (5 objects: Output, Evidence, Execution, Evaluator, Change)
- ✅ Evidence Chain + Replay Dossier design
- ✅ Grader Hierarchy (Deterministic → Retrieval → Model → Human)
- ✅ Professional workflow (HITL, escalation, compliance)
- ✅ AOA-Bench (30 dev + 30 holdout + 40 edge cases per domain)

---

## Success Criteria

- [ ] AP Domain Pack v0.1 launched by Sept 5
- [ ] 50+ golden cases in AOA-Bench (real AI vendor outputs)
- [ ] 20+ seeded errors (known failure modes)
- [ ] 10+ edge cases (boundary conditions)
- [ ] Benchmark results from 3+ vendors (Trullion, Vic.ai, Nanonets)
- [ ] 5-10 advisors testing the AP pack
- [ ] 2-3 pilot firms committed to using it

---

## Related Decisions

- **AOA-DEC-001**: RELIANCE Framework as the core methodology
- **AOA-DEC-002**: Professional reliability architecture
- **AOA-SPIKE-001**: Evaluate Inspect AI as evaluation runtime

---

**Approved by:** Finance Engineering Team  
**Effective Date:** August 24, 2026
