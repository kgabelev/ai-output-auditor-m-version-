# Agent Handoff Protocol
**Version**: 0.1
**Date**: 2026-08-22
**Owner**: @kgabelev

---

## 📌 Purpose
This document defines the **protocol for handing off work between builders** (human or AI) in AOA. It ensures continuity, traceability, and accountability when transitioning tasks.

---

## 🤖 When to Use This Protocol
Use this protocol when:
1. A human builder hands off a Work Package (WP) to an AI builder (or vice versa).
2. An AI builder reaches a blocker and needs human intervention.
3. A WP is paused and resumed by a different builder.

---

## 📝 Handoff Checklist

### 1. **Current Builder (Before Handoff)**
- [ ] **Document Progress**: Update the WP with:
  - Completed tasks.
  - Open questions or blockers.
  - Assumptions made.
- [ ] **Commit Intermediate Work**: Push all intermediate files to the repo, including:
  - Code (`app/`, `tests/`).
  - Logs (`logs/`).
  - Debug output (`scratch/`).
  - Benchmark results (`benchmark/`).
- [ ] **Generate Evidence**: Include screenshots, logs, or other evidence of progress.
- [ ] **Update Status**: Change the WP status to `Review` or `Blocked`.
- [ ] **Notify Next Builder**: Tag the next builder in the WP or GitHub issue.

### 2. **Next Builder (After Handoff)**
- [ ] **Review WP**: Read the WP and all updates from the current builder.
- [ ] **Review Evidence**: Check all committed files, logs, and debug output.
- [ ] **Clarify Open Questions**: Ask for clarification on any blockers or assumptions.
- [ ] **Confirm Understanding**: Reply to the WP or GitHub issue confirming understanding.
- [ ] **Update Status**: Change the WP status to `In Progress`.

---

## 📁 Handoff Artifacts
The following artifacts must be included in every handoff:

| **Artifact**               | **Description**                                                                                     | **Location**               |
|---------------------------|-----------------------------------------------------------------------------------------------------|----------------------------|
| Work Package (WP)         | Updated with progress, blockers, and assumptions.                                                 | `docs/shipping/WP-[ID].md` |
| Code                       | All code changes (committed or uncommitted).                                                      | `app/`, `tests/`           |
| Logs                       | Log files from execution (e.g., test logs, benchmark logs).                                       | `logs/`                    |
| Debug Output               | Debug files, error traces, or intermediate results.                                               | `scratch/`                 |
| Benchmark Results          | Results from benchmark execution.                                                                  | `benchmark/`               |
| Screenshots                | Visual evidence (e.g., test results, UI states).                                                 | `evidence/`                |

---

## 🚨 Blockers and Escalation

### 1. **Identifying Blockers**
If the current builder encounters a blocker, they must:
- Document the blocker in the WP under **Open Questions/Blockers**.
- Include:
  - Description of the issue.
  - Steps taken to resolve it.
  - Error messages or logs.
  - Suggested next steps (if any).

### 2. **Escalation Path**
| **Blocker Type**               | **Escalation To**       | **Timeframe**               |
|--------------------------------|--------------------------|-----------------------------|
| Technical (e.g., bug)          | @kgabelev                | Immediate                   |
| Design (e.g., unclear spec)    | @kgabelev                | Within 24 hours              |
| Dependency (e.g., WP not done)| WP Owner                 | Within 48 hours              |
| Priority Conflict              | @kgabelev                | Immediate                   |

### 3. **Escalation Process**
1. **Current Builder**: Posts the blocker in the WP or GitHub issue.
2. **Next Builder**: Attempts to resolve or clarifies the blocker.
3. **Escalation**: If unresolved, tag the escalation target (e.g., `@kgabelev`).
4. **Resolution**: Escalation target provides guidance or reassigns the WP.

---

## 📌 Example Handoff

### Scenario
AI Builder (`Devin`) is working on **WP-004 (Deterministic Arithmetic Verification Engine)** but encounters a blocker with floating-point precision. It hands off to Human Builder (`@kgabelev`).

### Current Builder (Devin) Actions
1. **Update WP-004**:
   ```markdown
   ## WP-004 — Deterministic Arithmetic Verification Engine
   **Status**: Blocked
   **Assigned To**: @kgabelev
   
   ### Open Questions/Blockers
   - [ ] Floating-point precision: The engine fails to reproduce calculations with floating-point numbers (e.g., `0.1 + 0.2 = 0.30000000000000004`).
     - **Steps Taken**: Tried using Python's `decimal` module, but it breaks integer tests.
     - **Error**: `AssertionError: 0.1 + 0.2 != 0.3`
     - **Logs**: See `logs/arithmetic-float-error.log`.
     - **Suggested Next Steps**: Use `decimal` for floats and `int` for integers, or round to 6 decimal places.
   
   ### Evidence
   - Debug output: `scratch/arithmetic-debug.txt`
   - Log file: `logs/arithmetic-float-error.log`
   ```

2. **Commit Files**:
   - `app/verification/arithmetic.py` (current state)
   - `tests/test_arithmetic.py` (failing test)
   - `logs/arithmetic-float-error.log`
   - `scratch/arithmetic-debug.txt`

3. **Notify Next Builder**: Tag `@kgabelev` in the GitHub issue for WP-004.

### Next Builder (@kgabelev) Actions
1. **Review WP-004**: Read the updates and open questions.
2. **Review Evidence**: Check the logs and debug output.
3. **Clarify**: Post a comment: "@Devin Should we support floating-point in v0.1, or defer to v0.2?"
4. **Confirm Understanding**: Wait for Devin's response or escalate if no reply within 24 hours.
5. **Update Status**: Change WP-004 status to `In Progress` once clarified.

---

## 📚 References
- [Shipping SOP](SHIPPING-SOP.md)
- [Work Package Template](WORK-PACKAGE-TEMPLATE.md)
- [Definition of Done Checklist](DEFINITION-OF-DONE-CHECKLIST.md)