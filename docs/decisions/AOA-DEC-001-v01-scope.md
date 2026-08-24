# AOA-DEC-001: v0.1 Scope
**Status**: FROZEN
**Date**: 2026-08-22
**Owner**: @kgabelev

---

## 📌 Decision
**AOA v0.1 will be a narrow, bounded evidence-and-calculation assurance product for professional review of AI-generated answers.**

---

## 🎯 Context
The original ambition for AOA was broad: "build an AI fact checker." However, research revealed that:
1. **Universal truth checking** is not feasible in v0.1.
2. **Open-web truth discovery** introduces uncontrollable variables.
3. **Competitive landscape** (Patronus, Giskard, Arize, Galileo, Braintrust) already covers portions of the space.

To differentiate, AOA focuses on the **professional reviewer workflow**:

**Claim → Test → Evidence → Finding → Limitation → Human decision → Audit trail**

---

## ✅ In Scope for v0.1

### Inputs
- AI-generated answer (≤5,000 words).
- Optional: Original question.
- 1–5 supplied public URLs or pasted excerpts.

### Supported Modes
1. **Inspection**: Analyze the AI output for internal consistency.
2. **Evidence-bound**: Verify claims against supplied evidence.
3. **Citation**: Check citations for accessibility, relevance, and entailment.

### Capabilities
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

## ❌ Out of Scope for v0.1
- Universal truth checking.
- Open-web truth discovery.
- GAAP compliance conclusions.
- Tax/legal/investment advice.
- Private workpapers.
- Spreadsheets.
- Browser extension.
- Autonomous rewriting.
- Universal reliability score.

---

## 🔄 Rationale
1. **Credibility**: A narrow scope allows for **measurable release gates** and reduces risk.
2. **Differentiation**: Focuses on the **professional reviewer workflow**, which is underserved by competitors.
3. **Feasibility**: Limits dependencies on external systems (e.g., open-web retrieval).
4. **Scalability**: Enables clear Definition of Done (DoD) criteria for each feature.

---

## 📜 References
- [Release Contract](../../RELEASE_CONTRACT.md)
- [PRD](../../PRD.md)
- [AOA-DEC-002: Competitive Thesis](AOA-DEC-002-competitive-thesis.md)