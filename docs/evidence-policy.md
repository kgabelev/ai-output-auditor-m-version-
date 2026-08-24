# Evidence Policy (v0.1)
**Status**: FROZEN
**Date**: 2026-08-22
**Owner**: @kgabelev

---

## 📌 Purpose
This document defines the **rules and standards** for evidence handling in AOA. It ensures that all evidence used to support or contradict claims is **traceable, reproducible, and reliable**.

---

## 🏗️ Evidence Sources
AOA v0.1 supports the following types of evidence sources:

| **Source Type**       | **Description**                                                                                     | **Example**                                                                 |
|-----------------------|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| Public URL            | Any publicly accessible URL (e.g., PDFs, HTML pages, APIs).                                       | `https://example.com/10k-q2-2026.pdf`                                      |
| Pasted Excerpt        | Text excerpts pasted directly into AOA by the user.                                                | `"Revenue for Q2 2026 was $120M, up 20% from $100M in Q2 2025.`            |

---

## 🔍 Evidence Retrieval Rules

### 1. **URL Retrieval**
- **Supported Protocols**: `https`, `http` (with warnings for non-secure connections).
- **Timeout**: 10 seconds for initial connection, 30 seconds for full retrieval.
- **User-Agent**: Identify as `AOA/0.1` (e.g., `User-Agent: AOA/0.1 (+https://github.com/kgabelev/ai-output-auditor)`).
- **Rate Limiting**: Respect `robots.txt` and rate limits. Retry with exponential backoff.
- **Caching**: Cache retrieved documents for 24 hours to avoid redundant requests.

### 2. **Retrieval Status**
Every retrieval attempt must result in one of the following statuses:

| **Status**      | **Description**                                                                                     |
|-----------------|-----------------------------------------------------------------------------------------------------|
| `success`       | The document was retrieved successfully.                                                          |
| `failure`       | The document could not be retrieved (e.g., 404, 403, DNS failure).                                |
| `timeout`       | The retrieval timed out.                                                                           |

**Rule**: A retrieval `failure` or `timeout` **does not** imply the claim is unsupported. Use `citation_inaccessible` instead.

---

## 📜 Passage Extraction Rules

### 1. **Passage Selection**
- Extract **exact passages** from the source that are relevant to the claim.
- Passages must be **verbatim** (no paraphrasing or summarization).
- Include **sufficient context** to understand the claim (e.g., surrounding sentences or paragraphs).

### 2. **Passage Relevance**
Every passage must be labeled with one of the following relevance levels:

| **Relevance** | **Description**                                                                                     |
|---------------|-----------------------------------------------------------------------------------------------------|
| `high`        | The passage directly supports or contradicts the claim.                                         |
| `medium`      | The passage is related to the claim but does not directly support or contradict it.             |
| `low`         | The passage is tangentially related to the claim.                                                 |
| `none`        | The passage is unrelated to the claim.                                                           |

---

## 🔄 Evidence Comparison Rules

### 1. **Entailment**
- Use **exact string matching** for deterministic claims (e.g., calculations, dates).
- Use **semantic similarity** (with a threshold of ≥0.8) for non-deterministic claims (e.g., facts, opinions).
- **Never** rely solely on the LLM's internal knowledge. Always show the passage.

### 2. **Contradiction Detection**
- A claim is **contradicted** if the evidence explicitly states the opposite.
- A claim is **not supported** if the evidence does not mention it or is ambiguous.

---

## 🚫 Prohibited Evidence Sources
AOA v0.1 **does not** support the following:
- Private URLs (e.g., internal company documents, password-protected pages).
- Dynamic content (e.g., JavaScript-rendered pages without static fallbacks).
- Binary files (e.g., images, videos, spreadsheets).
- Real-time data (e.g., live APIs, streaming data).

---

## 📚 References
- [Status Taxonomy](status-taxonomy.md)
- [Claim Ledger Specification](claim-ledger-spec.md)
- [Release Contract](../RELEASE_CONTRACT.md)