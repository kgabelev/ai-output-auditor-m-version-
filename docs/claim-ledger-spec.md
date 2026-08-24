# Claim Ledger Specification (v0.1)
**Status**: FROZEN
**Date**: 2026-08-22
**Owner**: @kgabelev

---

## 📌 Overview
The **Claim Ledger** is the core artifact of AOA. It tracks all claims extracted from an AI-generated answer, their associated evidence, findings, and metadata. This document specifies the structure, rules, and validation criteria for the Claim Ledger.

---

## 🏗️ Structure
The Claim Ledger is a JSON object conforming to the [Claim Ledger Schema](../schemas/claim-ledger.schema.json). It consists of:
1. **Audit Metadata**: Unique identifier, timestamp, and versioning.
2. **Input**: The AI-generated answer, optional question, and supplied sources.
3. **Claims**: Array of claims with their spans, types, statuses, evidence, and findings.

---

## 📜 Claim Structure
Each claim in the Claim Ledger must include:

### Required Fields
| **Field**       | **Type**   | **Description**                                                                                     |
|-----------------|------------|-----------------------------------------------------------------------------------------------------|
| `claim_id`      | String     | Unique identifier (e.g., `AOA-CLAIM-001`).                                                        |
| `text`          | String     | Exact claim text from the AI output.                                                               |
| `span`          | Object     | Start and end indices of the claim in the AI output.                                               |
| `type`          | String     | One of: `fact`, `calculation`, `citation`, `judgment`.                                             |
| `status`        | String     | One of the [bounded states](status-taxonomy.md).                                                  |
| `metadata`      | Object     | Timestamp, model version, checker version, and input hash.                                         |

### Optional Fields
| **Field**       | **Type**   | **Description**                                                                                     |
|-----------------|------------|-----------------------------------------------------------------------------------------------------|
| `materiality`   | String     | Impact level: `high`, `medium`, or `low`.                                                          |
| `evidence`      | Array      | Array of evidence objects (source URL, passage, relevance, retrieval status).                   |
| `findings`      | Array      | Array of finding objects (finding ID, type, message, severity).                                   |

---

## 🔍 Evidence Structure
Each evidence object must include:

| **Field**            | **Type**   | **Description**                                                                                     |
|----------------------|------------|-----------------------------------------------------------------------------------------------------|
| `source_url`         | String     | URL of the source document.                                                                       |
| `passage`            | String     | Exact passage from the source.                                                                    |
| `relevance`          | String     | Relevance level: `high`, `medium`, `low`, or `none`.                                               |
| `retrieval_status`   | String     | One of: `success`, `failure`, `timeout`.                                                           |

---

## ⚠️ Findings Structure
Each finding object must include:

| **Field**       | **Type**   | **Description**                                                                                     |
|-----------------|------------|-----------------------------------------------------------------------------------------------------|
| `finding_id`    | String     | Unique identifier (e.g., `AOA-FINDING-001`).                                                       |
| `type`          | String     | One of: `error`, `warning`, `info`.                                                                |
| `message`       | String     | Human-readable description of the finding.                                                        |
| `severity`      | String     | Severity level: `high`, `medium`, or `low`.                                                        |

---

## 📏 Validation Rules
1. **Claim ID Uniqueness**: All `claim_id` values must be unique within a Claim Ledger.
2. **Span Validity**: The `span.start` and `span.end` indices must be within the bounds of the AI output.
3. **Status Validity**: The `status` must be one of the [bounded states](status-taxonomy.md).
4. **Evidence Integrity**: Every `supported_by_evidence`, `contradicted_by_evidence`, or `citation_relevant_support_unresolved` status must include at least one evidence object.
5. **Finding Integrity**: Every `error` or `warning` finding must include a non-empty `message`.

---

## 🧪 Example Claim Ledger
```json
{
  "audit_id": "AOA-AUDIT-001",
  "input": {
    "ai_output": "Revenue grew 20% in Q2 2026, from $100M to $120M.",
    "question": "What was the revenue growth in Q2 2026?",
    "sources": ["https://example.com/10k-q2-2026.pdf"]
  },
  "claims": [
    {
      "claim_id": "AOA-CLAIM-001",
      "text": "Revenue grew 20% in Q2 2026",
      "span": { "start": 0, "end": 22 },
      "type": "calculation",
      "materiality": "high",
      "status": "calculation_reproduced",
      "evidence": [
        {
          "source_url": "https://example.com/10k-q2-2026.pdf",
          "passage": "Revenue for Q2 2026 was $120M, up 20% from $100M in Q2 2025.",
          "relevance": "high",
          "retrieval_status": "success"
        }
      ],
      "findings": [],
      "metadata": {
        "timestamp": "2026-08-22T12:00:00Z",
        "model_version": "v0.1",
        "checker_version": "v0.1",
        "input_hash": "a1b2c3d4..."
      }
    }
  ]
}
```

---

## 📚 References
- [Claim Ledger Schema](../schemas/claim-ledger.schema.json)
- [Status Taxonomy](status-taxonomy.md)
- [Release Contract](../RELEASE_CONTRACT.md)