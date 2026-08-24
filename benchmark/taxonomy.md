# AOA-Bench Taxonomy (v0.1)
**Status**: FROZEN
**Date**: 2026-08-22
**Owner**: @kgabelev

---

## 📌 Overview
This document defines the **taxonomy of defect types, categories, and severities** used in AOA-Bench. It ensures consistency in case design, evaluation, and reporting.

---

## 🏷️ Defect Types

### 1. **Arithmetic Defects**
Defects related to calculations or numerical claims.

| **Defect Type**               | **Description**                                                                                     | **Example**                                                                 | **Severity** |
|-------------------------------|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|--------------|
| `calculation_error`           | Incorrect arithmetic (e.g., addition, subtraction, multiplication, division).                     | `"2 + 2 = 5"` (expected: `4`).                                              | High         |
| `percent_error`               | Incorrect percentage calculation.                                                                 | `"Revenue grew 25%"` (actual growth: 20%).                                  | High         |
| `unit_mismatch`                | Inconsistent or incorrect units.                                                                  | `"Revenue was $10M"` vs. `"€10M"`.                                          | Medium       |
| `rounding_error`              | Incorrect rounding of numbers.                                                                    | `"3.1415926535 ≈ 3.14"` (expected: `3.1416`).                                | Low          |

---

### 2. **Factual Defects**
Defects related to factual claims or statements.

| **Defect Type**               | **Description**                                                                                     | **Example**                                                                 | **Severity** |
|-------------------------------|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|--------------|
| `contradicted_fact`           | Fact explicitly contradicted by evidence.                                                        | `"Revenue was $15M"` (evidence: `$10M`).                                    | High         |
| `unsupported_fact`            | Fact not supported by any supplied evidence.                                                     | `"The CFO is a CFE"` (no evidence provided).                                | Medium       |
| `stale_fact`                  | Fact based on outdated or stale evidence.                                                        | `"Revenue was $10M in 2025"` (evidence: 2024 data).                        | High         |

---

### 3. **Citation Defects**
Defects related to citations or references.

| **Defect Type**               | **Description**                                                                                     | **Example**                                                                 | **Severity** |
|-------------------------------|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|--------------|
| `inaccessible_citation`       | Citation URL cannot be accessed (e.g., 404, timeout).                                            | `"[report.pdf](https://example.com/report.pdf)|` (URL returns 404).        | High         |
| `irrelevant_citation`        | Citation is not relevant to the claim.                                                           | `"Revenue grew"` (citation: weather report).                                 | Medium       |
| `non_entailing_citation`     | Citation does not entail the claim (partial or weak support).                                   | `"Revenue grew"` (citation: "Revenue trends are positive").                  | Medium       |
| `missing_citation`            | Claim lacks a required citation.                                                                 | `"Revenue was $10M"` (no citation provided).                                | Medium       |

---

### 4. **Contradiction Defects**
Defects related to internal inconsistencies in the AI output.

| **Defect Type**               | **Description**                                                                                     | **Example**                                                                 | **Severity** |
|-------------------------------|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|--------------|
| `internal_contradiction`      | Conflicting claims within the same output.                                                       | `"Revenue was $10M"` and `"Revenue was $11M"`.                             | High         |
| `temporal_contradiction`      | Conflicting claims about the same entity at different times.                                    | `"Revenue was $10M in 2025"` and `"Revenue was $12M in 2025"`.             | High         |

---

### 5. **Judgment Defects**
Defects related to claims requiring human judgment.

| **Defect Type**               | **Description**                                                                                     | **Example**                                                                 | **Severity** |
|-------------------------------|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|--------------|
| `judgment_required`           | Claim requires human judgment (e.g., opinions, forecasts).                                       | `"The stock will rise in 2027.``                                             | N/A*         |
| `false_certainty`             | Claim presents a judgment-dependent matter as a fact.                                          | `"The stock will definitely rise in 2027.``                               | High         |

*Judgment-dependent claims are **not defects** but must be routed to human review.

---

### 6. **Clean Cases**
Cases with **no defects** (used as a baseline for precision/recall).

| **Defect Type**               | **Description**                                                                                     | **Example**                                                                 | **Severity** |
|-------------------------------|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|--------------|
| `clean`                       | No defects in the claim or evidence.                                                             | `"The sky is blue.`` (no contradiction or unsupported evidence).           | N/A          |

---

## 📊 Severity Levels

| **Severity** | **Description**                                                                                     | **Example**                                                                 |
|--------------|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| High         | Defects that materially impact the correctness or reliability of the AI output.                  | Calculation errors, contradicted facts, inaccessible citations.            |
| Medium       | Defects that reduce clarity or confidence but do not materially impact correctness.             | Unit mismatches, unsupported facts, non-entailing citations.               |
| Low          | Minor defects that do not impact correctness or reliability.                                    | Rounding errors, minor stylistic issues.                                  |

---

## 🏗️ Case Categories
AOA-Bench organizes cases into the following **categories** (folders in `benchmark/dev/` and `benchmark/holdout/`):

| **Category**      | **Description**                                                                                     | **Defect Types**                                                                 |
|-------------------|-----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| Arithmetic        | Cases involving calculations or numerical claims.                                                 | `calculation_error`, `percent_error`, `unit_mismatch`, `rounding_error`         |
| Facts             | Cases involving factual claims.                                                                  | `contradicted_fact`, `unsupported_fact`, `stale_fact`                            |
| Citations         | Cases involving citations or references.                                                          | `inaccessible_citation`, `irrelevant_citation`, `non_entailing_citation`      |
| Contradictions    | Cases involving internal inconsistencies.                                                        | `internal_contradiction`, `temporal_contradiction`                              |
| Judgment          | Cases involving claims requiring human judgment.                                                    | `judgment_required`, `false_certainty`                                           |
| Clean             | Cases with no defects (baseline).                                                                  | `clean`                                                                          |

---

## 📌 Case Design Rules

### 1. **Overlap**
- Cases should **overlap** in defect types to test AOA’s robustness.
  Example: A single case might include:
  - A `calculation_error` (arithmetic).
  - A `contradicted_fact` (factual).
  - A `non_entailing_citation` (citation).

### 2. **Realism**
- Cases should mimic **real-world AI outputs** (e.g., financial reports, news articles).
- Avoid synthetic or overly simplistic examples.

### 3. **Balance**
- The benchmark should include a **balanced distribution** of:
  - Defect types (arithmetic, factual, citation, etc.).
  - Severity levels (high, medium, low).
  - Categories (arithmetic, facts, citations, etc.).

### 4. **Holdout Freeze**
- The **30 holdout cases** must be **frozen** before semantic tuning begins.
- **No modifications** to holdout cases are allowed after freezing.

---

## 📁 Example Cases

### Example 1: Arithmetic + Factual Defect
```json
{
  "case_id": "AOA-DEV-001",
  "ai_output": "Revenue grew 25% in Q2 2026, from $100M to $125M.",
  "question": "What was the revenue growth in Q2 2026?",
  "claims": [
    {
      "claim_id": "AOA-DEV-001-CLAIM-001",
      "text": "Revenue grew 25% in Q2 2026",
      "type": "calculation",
      "materiality": "high",
      "expected_status": "calculation_mismatch",
      "evidence": [
        {
          "source_url": "https://example.com/10k-q2-2026.pdf",
          "passage": "Revenue for Q2 2026 was $120M, up 20% from $100M in Q2 2025.",
          "relevance": "high",
          "retrieval_status": "success"
        }
      ]
    },
    {
      "claim_id": "AOA-DEV-001-CLAIM-002",
      "text": "Revenue was $125M in Q2 2026",
      "type": "fact",
      "materiality": "high",
      "expected_status": "contradicted_by_evidence",
      "evidence": [
        {
          "source_url": "https://example.com/10k-q2-2026.pdf",
          "passage": "Revenue for Q2 2026 was $120M, up 20% from $100M in Q2 2025.",
          "relevance": "high",
          "retrieval_status": "success"
        }
      ]
    }
  ],
  "metadata": {
    "category": "arithmetic",
    "difficulty": "medium",
    "tags": ["percent_change", "revenue", "contradiction"]
  }
}
```

### Example 2: Citation Defect
```json
{
  "case_id": "AOA-DEV-002",
  "ai_output": "The CFO is a Certified Fraud Examiner (CFE). See [LinkedIn](https://example.com/linkedin).",
  "question": "Is the CFO a CFE?",
  "claims": [
    {
      "claim_id": "AOA-DEV-002-CLAIM-001",
      "text": "The CFO is a Certified Fraud Examiner (CFE).",
      "type": "fact",
      "materiality": "medium",
      "expected_status": "not_supported_in_evidence",
      "evidence": [
        {
          "source_url": "https://example.com/linkedin",
          "passage": "John Doe - CFO at Example Corp. Previous: CPA, MBA.",
          "relevance": "medium",
          "retrieval_status": "success"
        }
      ]
    },
    {
      "claim_id": "AOA-DEV-002-CLAIM-002",
      "text": "See [LinkedIn](https://example.com/linkedin).",
      "type": "citation",
      "materiality": "medium",
      "expected_status": "citation_relevant_support_unresolved",
      "evidence": [
        {
          "source_url": "https://example.com/linkedin",
          "passage": "John Doe - CFO at Example Corp. Previous: CPA, MBA.",
          "relevance": "medium",
          "retrieval_status": "success"
        }
      ]
    }
  ],
  "metadata": {
    "category": "citations",
    "difficulty": "easy",
    "tags": ["citation", "unsupported"]
  }
}
```

### Example 3: Clean Case
```json
{
  "case_id": "AOA-DEV-003",
  "ai_output": "The Earth orbits the Sun.",
  "question": "What is the relationship between the Earth and the Sun?",
  "claims": [
    {
      "claim_id": "AOA-DEV-003-CLAIM-001",
      "text": "The Earth orbits the Sun.",
      "type": "fact",
      "materiality": "low",
      "expected_status": "supported_by_evidence",
      "evidence": [
        {
          "source_url": "https://example.com/astronomy",
          "passage": "The Earth orbits the Sun in an elliptical path.",
          "relevance": "high",
          "retrieval_status": "success"
        }
      ]
    }
  ],
  "metadata": {
    "category": "clean",
    "difficulty": "easy",
    "tags": ["fact", "astronomy"]
  }
}
```

---

## 📚 References
- [AOA-Bench README](README.md)
- [Release Contract](../RELEASE_CONTRACT.md)
- [Status Taxonomy](../docs/status-taxonomy.md)