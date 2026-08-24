# AOA-Bench
**Version**: 0.1
**Date**: 2026-08-22
**Owner**: @kgabelev

---

## 📌 Overview
**AOA-Bench** is the **measuring instrument** for AOA. It consists of **60 cases** (30 development, 30 holdout) designed to evaluate the performance of AOA’s claim extraction, evidence checking, and defect detection capabilities.

---

## 🎯 Purpose
AOA-Bench serves as:
1. **Development Tool**: Guides the tuning of AOA’s semantic and deterministic components.
2. **Release Gate**: Ensures AOA meets minimum performance thresholds before release.
3. **Regression Test**: Prevents performance degradation in future updates.

---

## 📁 Structure

```
benchmark/
│
├── README.md          # This file
├── taxonomy.md        # Taxonomy of defect types
├── manifest.json      # Benchmark metadata and gates
│
├── dev/               # Development cases (30)
│   ├── arithmetic/
│   │   ├── case-001.json
│   │   ├── case-002.json
│   │   └── ...
│   ├── facts/
│   │   ├── case-001.json
│   │   └── ...
│   ├── citations/
│   │   ├── case-001.json
│   │   └── ...
│   ├── contradictions/
│   │   ├── case-001.json
│   │   └── ...
│   ├── judgment/
│   │   ├── case-001.json
│   │   └── ...
│   └── clean/
│       ├── case-001.json
│       └── ...
│
└── holdout/           # Holdout cases (30, frozen)
    ├── arithmetic/
    ├── facts/
    ├── citations/
    ├── contradictions/
    ├── judgment/
    └── clean/
```

---

## 📊 Case Structure
Each case is a JSON file with the following structure:

```json
{
  "case_id": "AOA-DEV-001",
  "ai_output": "Revenue grew 20% in Q2 2026, from $100M to $120M.",
  "question": "What was the revenue growth in Q2 2026?",
  "claims": [
    {
      "claim_id": "AOA-DEV-001-CLAIM-001",
      "text": "Revenue grew 20% in Q2 2026",
      "type": "calculation",
      "materiality": "high",
      "expected_status": "calculation_reproduced",
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
    "difficulty": "easy",
    "tags": ["percent_change", "revenue"]
  }
}
```

---

## 🏷️ Case Categories
AOA-Bench includes cases from the following categories:

| **Category**          | **Description**                                                                                     | **Example**                                                                 |
|-----------------------|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| Arithmetic            | Correct or incorrect calculations (e.g., additions, percentages).                                | `"2 + 2 = 4"` (correct) vs. `"2 + 2 = 5"` (incorrect).                      |
| Facts                 | Supported, contradicted, or unsupported factual claims.                                           | `"Revenue was $10M"` (supported) vs. `"Revenue was $15M"` (contradicted). |
| Citations             | Working, non-entailing, or inaccessible citations.                                                | `"See [report.pdf](https://example.com/report.pdf)|` (accessible vs. 404). |
| Contradictions        | Internal inconsistencies in the AI output.                                                        | `"Revenue was $10M"` and `"Revenue was $11M"` in the same output.          |
| Judgment              | Claims requiring human judgment (e.g., opinions, forecasts).                                     | `"The stock will rise in 2027."`                                             |
| Clean                 | Claims with no defects (baseline for precision/recall).                                          | `"The sky is blue."` (no defect).                                            |

---

## 📈 Metrics
AOA-Bench evaluates the following metrics:

| **Metric**                          | **Description**                                                                                     | **Target (v0.1)** |
|-------------------------------------|-----------------------------------------------------------------------------------------------------|--------------------|
| Claim Extraction Recall             | % of expected claims extracted from the AI output.                                               | ≥90%               |
| Claim Extraction Precision          | % of extracted claims that are valid.                                                             | ≥95%               |
| Material-Defect Recall              | % of material defects detected.                                                                   | ≥75%               |
| High-Severity Finding Precision    | % of high-severity findings that are correct.                                                    | ≥85%               |
| Citation-Entailment Accuracy        | % of citation entailment assessments that are correct.                                          | ≥90%               |
| Judgment Routing Accuracy          | % of judgment-dependent cases correctly routed to human review.                                | 100%               |
| Calculation Exactness               | % of deterministic calculations reproduced exactly.                                             | 100%               |
| False-Assurance Rate               | % of cases where AOA incorrectly assures a claim is supported.                                    | 0%                 |

---

## 🚪 Release Gates
AOA v0.1 **cannot** be released until all of the following gates are passed on the **holdout set**:

- [ ] **Material-Defect Recall**: ≥75%
- [ ] **High-Severity Finding Precision**: ≥85%
- [ ] **Deterministic Arithmetic Correctness**: 100%
- [ ] **Supported Findings with Evidence**: 100% (no `supported` findings without displayed evidence)
- [ ] **Judgment-Dependent Routing**: 100% (all judgment-dependent cases routed to human review)

---

## 🔄 Workflow

### 1. **Development Phase**
- Use the **30 dev cases** to tune AOA’s components.
- Iterate on:
  - Claim extraction prompts.
  - Evidence checker thresholds.
  - Deterministic engine logic.

### 2. **Frozen Phase**
- **Freeze the 30 holdout cases** before semantic tuning begins.
- **Do not** modify the holdout cases or tune AOA based on their results.

### 3. **Evaluation Phase**
- Run AOA on the **holdout cases** to generate results.
- Compare results to expected outputs to calculate metrics.
- **Do not** merge changes to AOA until all gates pass.

---

## 📁 Files

| **File**               | **Description**                                                                                     |
|------------------------|-----------------------------------------------------------------------------------------------------|
| `manifest.json`        | Benchmark metadata, including version, metrics, and gates.                                        |
| `taxonomy.md`          | Taxonomy of defect types and categories.                                                          |
| `dev/*.json`           | Development cases (30).                                                                           |
| `holdout/*.json`       | Holdout cases (30, frozen).                                                                       |

---

## 📚 References
- [Release Contract](../RELEASE_CONTRACT.md)
- [Status Taxonomy](../docs/status-taxonomy.md)
- [Claim Ledger Schema](../schemas/claim-ledger.schema.json)
- [Shipping SOP](../docs/shipping/SHIPPING-SOP.md)