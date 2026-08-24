# AOA Product Requirements Document (PRD)
**Version**: 0.1
**Date**: 2026-08-22
**Owner**: @kgabelev

---

## 🎯 Product Thesis
>AOA makes an AI-generated answer **professionally reviewable**.

It decomposes the answer into claims, reproduces what can be deterministically reproduced, connects claims to exact evidence, exposes contradictions and unsupported assertions, preserves provenance and limitations, and routes judgment-dependent matters to humans.

---

## 🔍 Core Differentiation
We are **not** claiming to be the first:
- Hallucination detector
- Groundedness evaluator
- Citation checker
- LLM-evaluation platform

Our differentiation is the **professional reviewer workflow**:

**Claim → Test → Evidence → Finding → Limitation → Human decision → Audit trail**

---

## 📦 v0.1 Deliverables

### 1. **Deterministic Verification Engine**
- Arithmetic
- Totals
- Percent changes
- Unit normalization
- Date normalization

**Outputs**: `calculation_reproduced`, `calculation_mismatch`, `cannot_compute`

---

### 2. **Evidence Acquisition System**
- URL parser
- Retrieval
- Timestamps
- Document date
- Source identity
- Passage preservation
- Retrieval status
- Timeouts/errors

**Critical Invariant**: Retrieval failure ≠ unsupported claim → Use `citation_inaccessible` or `unable_to_assess`.

---

### 3. **Claim Extraction**
- Atomic claims
- Exact answer spans
- Type (fact, calculation, citation, judgment)
- Materiality (high, medium, low)
- Stable claim IDs

**Rule**: An extracted claim must always trace back to the precise original answer text.

---

### 4. **Semantic Evidence Checker**
- Claim ↔ Passage entailment
- Outputs: `supported`, `contradicted`, `unresolved/review`
- **Must show the actual passage** that drove the assessment.

**Rule**: The LLM is not allowed to become its own invisible oracle.

---

### 5. **Reviewer Experience**
**First Screen Answers**:
- What is wrong or uncertain?
- What did AOA actually check?
- What evidence did it use?
- What calculation did it reproduce?
- What couldn't it determine?
- Where do I need to exercise judgment?

**Contestability Trail**:
- Correct / Incorrect / Needs Context

---

## 📊 Evaluation Metrics (AOA-Bench)
- Claim extraction recall
- Claim extraction precision
- Material-defect recall
- High-severity finding precision
- Citation-entailment accuracy
- Judgment routing accuracy
- Calculation exactness
- **False-assurance rate**

---

## 🚨 Release Gates
- ≥75% material-defect recall
- ≥85% high-severity precision
- 100% deterministic arithmetic correctness within supported grammar
- 0 `supported` findings without displayed evidence
- 100% judgment-dependent cases routed away from fabricated factual certainty

---

## 🎯 User Persona
**Primary User**: Professional reviewing AI-generated public-company/finance-adjacent analysis against supplied primary evidence.

**External Promise**: Make this AI answer reviewable in minutes.