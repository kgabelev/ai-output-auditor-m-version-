# AOA Release Contract (v0.1)
**Status**: FROZEN
**Date**: 2026-08-22
**Owner**: @kgabelev

---

## 📥 Inputs
- AI-generated answer (≤5,000 words)
- Optional: Original question
- 1–5 supplied public URLs or pasted excerpts

---

## 🎯 Supported Modes
1. **Inspection**: Analyze the AI output for internal consistency.
2. **Evidence-bound**: Verify claims against supplied evidence.
3. **Citation**: Check citations for accessibility, relevance, and entailment.

---

## ✅ v0.1 Scope (MUST DO)

| **Capability**               | **Description**                                                                 |
|------------------------------|---------------------------------------------------------------------------------|
| Explicit arithmetic          | Reproduce calculations (e.g., `2 + 2 = 4`).                                    |
| Percent calculations         | Verify percent changes (e.g., `(new - old) / old * 100`).                     |
| Simple units/dates           | Normalize and compare units (e.g., `USD` vs. `$`) and dates (e.g., `Q1` vs. `2026-01-01`). |
| Citation accessibility       | Check if URLs are reachable.                                                   |
| Citation relevance           | Assess if the source is about the claimed topic.                              |
| Claim-to-passage support     | Verify if the passage entails the claim.                                       |
| Internal contradictions     | Detect conflicting claims (e.g., "Revenue was $10M" vs. "$11M").              |

---

## ❌ v0.1 Explicit Non-Goals (MUST NOT DO)
- Universal truth checking
- Open-web truth discovery
- GAAP compliance conclusions
- Tax/legal/investment advice
- Private workpapers
- Spreadsheets
- Browser extension
- Autonomous rewriting
- Universal reliability score

---

## 🚪 Gate Rule
**No feature enters v0.1 unless it maps to a requirement above or a Definition of Done (DoD) criterion.**

---

## 📜 Decision Records
- [AOA-DEC-001: Scope](docs/decisions/AOA-DEC-001-v01-scope.md)
- [AOA-DEC-002: Competitive Thesis](docs/decisions/AOA-DEC-002-competitive-thesis.md)