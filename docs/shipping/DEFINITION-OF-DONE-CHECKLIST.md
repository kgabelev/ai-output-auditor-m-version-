# Definition of Done (DoD) Checklist
**Version**: 0.1
**Date**: 2026-08-22
**Owner**: @kgabelev

---

## 📌 Purpose
This checklist defines the **minimum criteria** for a Work Package (WP) to be considered **Done**. All items must be checked off before a WP can be merged or closed.

---

## ✅ Universal DoD Checklist
For **every WP**, the following must be true:

### 1. **Artifact Existence**
- [ ] The primary artifact (e.g., file, code, doc) exists in the correct location.
- [ ] The artifact follows the repository's naming conventions (e.g., `WP-[ID]-[name].md`).

### 2. **Tests**
- [ ] Automated tests exist for the artifact (if applicable).
- [ ] All tests pass locally.
- [ ] Tests are committed to the repository (e.g., `tests/test_[wp-id].py`).

### 3. **Evidence**
- [ ] All required evidence (e.g., logs, benchmarks, screenshots) is committed.
- [ ] Evidence is stored in the appropriate directory (e.g., `logs/`, `evidence/`).
- [ ] Evidence is referenced in the WP.

### 4. **Repo State**
- [ ] No uncommitted changes in the working directory (`git status` is clean).
- [ ] Branch is up-to-date with `main` (`git pull origin main` has been run).
- [ ] No merge conflicts exist.

### 5. **Documentation**
- [ ] README or relevant docs are updated (if applicable).
- [ ] Changes are documented in the [CHANGELOG](../../CHANGELOG.md) (for significant updates).

### 6. **Review**
- [ ] Approved by at least one human reviewer.
- [ ] Reviewer has verified all DoD criteria.

---

## 📌 Role-Specific DoD Checklists

### 🤖 AI Builder DoD
If the WP was completed by an AI builder, the following additional criteria apply:

- [ ] **Human Review**: A human has reviewed the AI's work.
- [ ] **Evidence of Execution**: Logs or output files prove the AI ran the required tasks (e.g., `logs/[wp-id]-execution.log`).
- [ ] **Blockers Resolved**: All blockers documented by the AI have been addressed or escalated.

### 👤 Human Builder DoD
If the WP was completed by a human builder, the following additional criteria apply:

- [ ] **Peer Review**: Another human has reviewed the work (unless explicitly waived).
- [ ] **Agent Handoff Notes**: If handing off to an AI, all intermediate work is committed and documented.

---

## 📝 WP-Specific DoD Checklists
Some WPs may have **additional criteria** beyond the universal checklist. These are defined in the WP itself under the **Definition of Done (DoD)** section.

### Example: WP-001 (Release Contract)
- [ ] All scope and non-goals are explicitly defined.
- [ ] Decision records (AOA-DEC-001, AOA-DEC-002) are frozen.
- [ ] No engineering work has started without mapping to a Release Contract requirement.

### Example: WP-002 (AOA-Bench)
- [ ] 60 cases exist (30 dev, 30 holdout).
- [ ] Holdout cases are frozen before semantic tuning.
- [ ] All cases include:
  - AI output.
  - Claims with expected statuses.
  - Evidence passages.
- [ ] Manifest file (`benchmark/manifest.json`) is valid and up-to-date.

### Example: WP-003 (Claim Ledger)
- [ ] Schema file (`schemas/claim-ledger.schema.json`) is valid JSON Schema.
- [ ] All bounded states are defined in the [Status Taxonomy](../status-taxonomy.md).
- [ ] Schema tests pass (e.g., `pytest tests/test_schema.py`).

### Example: WP-004 (Deterministic Engine)
- [ ] Arithmetic engine (`app/verification/arithmetic.py`) exists.
- [ ] Tests (`tests/test_arithmetic.py`) cover all supported operations.
- [ ] Benchmark results (`benchmark/dev/arithmetic/results.json`) show 100% accuracy.
- [ ] All edge cases (e.g., integer overflow, division by zero) are handled or documented as limitations.

---

## 🚫 Common Pitfalls
Avoid these mistakes when marking a WP as Done:

1. **Missing Tests**: Skipping tests for "obvious" code. Always write tests.
2. **Uncommitted Changes**: Forgetting to `git add` or `git commit` files.
3. **Outdated Branch**: Not pulling the latest `main` before merging.
4. **No Evidence**: Failing to commit logs, debug output, or screenshots.
5. **No Review**: Merging without human approval.
6. **Scope Creep**: Adding features not defined in the WP or Release Contract.

---

## 📚 References
- [Shipping SOP](SHIPPING-SOP.md)
- [Work Package Template](WORK-PACKAGE-TEMPLATE.md)
- [Agent Handoff Protocol](AGENT-HANDOFF-PROTOCOL.md)