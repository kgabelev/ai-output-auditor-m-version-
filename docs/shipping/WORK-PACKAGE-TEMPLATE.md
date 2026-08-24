# Work Package Template
**Version**: 0.1
**Date**: 2026-08-22

---

## 📌 How to Use This Template
1. **Copy this template** into a new file in the `docs/shipping/` directory.
2. **Fill in all sections** with details specific to your Work Package (WP).
3. **Assign the WP** to a builder (human or AI).
4. **Track progress** using the GitHub issue or project board.

---

## 📄 Template

```markdown
## WP-[ID] — [Title]
**Status**: [Draft/In Progress/Review/Done]
**Priority**: [High/Medium/Low]
**Assigned To**: [Builder Name/ID]
**Created**: [YYYY-MM-DD]
**Due**: [YYYY-MM-DD (if applicable)]

---

### 🎯 Objective
[Clearly state what this WP achieves. Example: "Implement the deterministic arithmetic verification engine."]

### 🤔 Why This Exists
[Explain how this WP reduces risk or adds value to AOA. Example: "Ensures all calculations in AI outputs are reproducible, addressing the risk of arithmetic errors."]

### 📚 Canonical Sources
- [Link to decision records, e.g., AOA-DEC-001-v01-scope.md]
- [Link to relevant docs, e.g., claim-ledger-spec.md]
- [Link to GitHub issues or discussions]

---

### 📥 Inputs
[List all files, data, or resources required to complete this WP. Example:]
- `schemas/claim-ledger.schema.json` (for schema validation)
- `benchmark/dev/arithmetic/*.json` (for test cases)
- Access to the GitHub repository

### 📤 Required Outputs
[List all artifacts, code, docs, or data that must be produced. Example:]
- `app/verification/arithmetic.py` (deterministic arithmetic engine)
- `tests/test_arithmetic.py` (unit tests)
- `benchmark/dev/arithmetic/results.json` (benchmark results)

---

### 📁 Files Allowed to Change
[List files or directories that may be modified. Example:]
- `app/verification/`
- `tests/`
- `benchmark/dev/arithmetic/`

### 🚫 Files Forbidden to Change
[List files or directories that must not be modified. Example:]
- `benchmark/holdout/`
- `schemas/claim-ledger.schema.json`
- `docs/status-taxonomy.md`

---

### ✅ Acceptance Tests
[List all tests that must pass for this WP to be considered done. Example:]
- [ ] `pytest tests/test_arithmetic.py` (all tests pass)
- [ ] `python -m app.verification.arithmetic --input benchmark/dev/arithmetic/case-001.json` (manual verification)

### 📌 Definition of Done (DoD)
[List all criteria that must be met. Use the checklist format:]
- [ ] Artifact `app/verification/arithmetic.py` exists.
- [ ] Tests in `tests/test_arithmetic.py` exist and pass.
- [ ] Benchmark results in `benchmark/dev/arithmetic/results.json` are generated.
- [ ] All acceptance tests pass.
- [ ] No uncommitted changes in the working directory.
- [ ] Documentation is updated (if applicable).
- [ ] Reviewer approval obtained.

---

### 📎 Evidence Required
[List all evidence that must be committed. Example:]
- Screenshot of passing tests.
- Log file from benchmark execution (`logs/arithmetic-benchmark.log`).
- Debug output for edge cases (`scratch/arithmetic-debug.txt`).

### ⚠️ Known Limitations
[List any known limitations or edge cases not addressed in this WP. Example:]
- Only supports integer arithmetic (no floating-point).
- Assumes input is in JSON format.

### 🔗 Dependencies
[List other WPs or tasks that must be completed first. Example:]
- WP-001 (Release Contract) must be frozen.
- WP-003 (Claim Ledger Schema) must be defined.

### 🚨 Escalation Conditions
[Define conditions under which this WP should be escalated. Example:]
- If arithmetic accuracy < 100%, escalate to @kgabelev.
- If tests fail for >24 hours, escalate to the team.

---

### 📝 Notes
[Any additional notes, assumptions, or context.]
```

---

## 📌 Example WP
Here's an example of a filled-out WP for implementing the arithmetic verification engine:

```markdown
## WP-004 — Deterministic Arithmetic Verification Engine
**Status**: Draft
**Priority**: High
**Assigned To**: @kgabelev
**Created**: 2026-08-22
**Due**: 2026-08-25

---

### 🎯 Objective
Implement the deterministic arithmetic verification engine to reproduce calculations in AI outputs.

### 🤔 Why This Exists
Ensures all arithmetic claims in AI outputs are reproducible, addressing the risk of calculation errors. This is a foundational component of AOA's credibility.

### 📚 Canonical Sources
- [AOA-DEC-001: v0.1 Scope](../decisions/AOA-DEC-001-v01-scope.md)
- [Claim Ledger Specification](../claim-ledger-spec.md)
- [Status Taxonomy](../status-taxonomy.md)

---

### 📥 Inputs
- `schemas/claim-ledger.schema.json` (for schema validation)
- `benchmark/dev/arithmetic/*.json` (for test cases)
- Access to the GitHub repository

### 📤 Required Outputs
- `app/verification/arithmetic.py` (deterministic arithmetic engine)
- `tests/test_arithmetic.py` (unit tests)
- `benchmark/dev/arithmetic/results.json` (benchmark results)

---

### 📁 Files Allowed to Change
- `app/verification/`
- `tests/`
- `benchmark/dev/arithmetic/`

### 🚫 Files Forbidden to Change
- `benchmark/holdout/`
- `schemas/claim-ledger.schema.json`
- `docs/status-taxonomy.md`

---

### ✅ Acceptance Tests
- [ ] `pytest tests/test_arithmetic.py` (all tests pass)
- [ ] `python -m app.verification.arithmetic --input benchmark/dev/arithmetic/case-001.json` (manual verification)

### 📌 Definition of Done (DoD)
- [ ] Artifact `app/verification/arithmetic.py` exists.
- [ ] Tests in `tests/test_arithmetic.py` exist and pass.
- [ ] Benchmark results in `benchmark/dev/arithmetic/results.json` are generated.
- [ ] All acceptance tests pass.
- [ ] No uncommitted changes in the working directory.
- [ ] Documentation is updated (if applicable).
- [ ] Reviewer approval obtained.

---

### 📎 Evidence Required
- Screenshot of passing tests.
- Log file from benchmark execution (`logs/arithmetic-benchmark.log`).
- Debug output for edge cases (`scratch/arithmetic-debug.txt`).

### ⚠️ Known Limitations
- Only supports integer arithmetic (no floating-point).
- Assumes input is in JSON format.

### 🔗 Dependencies
- WP-001 (Release Contract) must be frozen.
- WP-003 (Claim Ledger Schema) must be defined.

### 🚨 Escalation Conditions
- If arithmetic accuracy < 100%, escalate to @kgabelev.
- If tests fail for >24 hours, escalate to the team.
```

---

## 📚 References
- [Shipping SOP](SHIPPING-SOP.md)
- [Agent Handoff Protocol](AGENT-HANDOFF-PROTOCOL.md)
- [Definition of Done Checklist](DEFINITION-OF-DONE-CHECKLIST.md)