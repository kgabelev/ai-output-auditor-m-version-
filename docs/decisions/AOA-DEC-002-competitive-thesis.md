# AOA-DEC-002: Competitive Thesis
**Status**: FROZEN
**Date**: 2026-08-22
**Owner**: @kgabelev

---

## 📌 Decision
**AOA will not position itself as the first hallucination detector, groundedness evaluator, citation checker, or LLM-evaluation platform.**

Instead, AOA’s differentiation is the **professional reviewer workflow**:

**Claim → Test → Evidence → Finding → Limitation → Human decision → Audit trail**

---

## 🎯 Context
The competitive landscape includes tools that overlap with portions of AOA’s original ambition:

| **Competitor**  | **Overlap with AOA**                                                                 |
|-----------------|--------------------------------------------------------------------------------------|
| Patronus        | Hallucination detection, groundedness evaluation.                                  |
| Giskard         | LLM testing and evaluation.                                                         |
| Arize           | AI observability and evaluation.                                                    |
| Galileo         | LLM evaluation and monitoring.                                                     |
| Braintrust      | LLM evaluation platform.                                                           |

However, none of these tools focus on the **end-to-end workflow for professional reviewers** who need to:
1. Decompose AI outputs into claims.
2. Reproduce deterministic calculations.
3. Connect claims to exact evidence.
4. Expose contradictions and unsupported assertions.
5. Route judgment-dependent matters to humans.
6. Preserve provenance and limitations.

---

## ✅ AOA’s Differentiation

### 1. **Workflow-Centric**
AOA is designed around the **professional reviewer’s process**, not just detection or evaluation.

### 2. **Bounded Scope**
AOA v0.1 explicitly **does not** attempt to:
- Check universal truth.
- Discover truth on the open web.
- Provide compliance conclusions (e.g., GAAP, tax, legal).
- Offer investment advice.

Instead, it focuses on **what it can deterministically demonstrate** (e.g., calculations, contradictions) and **what it can connect to supplied evidence**.

### 3. **Traceability**
Every claim, finding, and status in AOA is **fully traceable** to:
- The exact span in the AI output.
- The exact passage in the evidence.
- The exact calculation or logic used.

### 4. **Contestability**
AOA provides a **clear audit trail** for reviewers to:
- See what was checked.
- See what evidence was used.
- Override or correct findings.
- Escalate judgment-dependent matters.

---

## 🔄 Rationale
1. **Avoids Overlap**: By focusing on the workflow, AOA complements rather than competes with existing tools.
2. **Addresses a Gap**: Professional reviewers (e.g., analysts, auditors) need a tool tailored to their process.
3. **Reduces Risk**: A bounded scope limits exposure to edge cases and external dependencies.
4. **Enables Scalability**: Clear workflows and traceability make it easier to onboard new users and builders.

---

## 📊 Competitive Comparison

| **Feature**               | **AOA** | **Patronus** | **Giskard** | **Arize** | **Galileo** | **Braintrust** |
|---------------------------|---------|--------------|-------------|-----------|-------------|---------------|
| Hallucination Detection   | ❌      | ✅           | ✅          | ✅        | ✅          | ✅            |
| Groundedness Evaluation   | ❌      | ✅           | ✅          | ✅        | ✅          | ✅            |
| Citation Checking         | ✅      | ❌           | ❌          | ❌        | ❌          | ❌            |
| Calculation Verification  | ✅      | ❌           | ❌          | ❌        | ❌          | ❌            |
| Claim Extraction          | ✅      | ❌           | ❌          | ❌        | ❌          | ❌            |
| Professional Workflow     | ✅      | ❌           | ❌          | ❌        | ❌          | ❌            |
| Audit Trail               | ✅      | ❌           | ❌          | ❌        | ❌          | ❌            |

---

## 📜 References
- [Release Contract](../../RELEASE_CONTRACT.md)
- [PRD](../../PRD.md)
- [AOA-DEC-001: v0.1 Scope](AOA-DEC-001-v01-scope.md)