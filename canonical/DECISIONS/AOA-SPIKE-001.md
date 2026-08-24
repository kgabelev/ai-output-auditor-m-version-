# AOA-SPIKE-001: Inspect AI as AOA-Bench Evaluation Runtime

**Date:** August 24, 2026  
**Owner:** Finance Engineering Team  
**Type:** Technical Spike  
**Status:** APPROVED FOR 1-WEEK SPIKE

---

## The Question

Should AOA adopt **Inspect AI** (UK AISI, MIT licensed) as the evaluation infrastructure underneath **AOA-Bench**, or build a custom evaluation harness?

---

## Context

**Inspect AI** is an open-source evaluation framework from the UK AI Safety Institute.

**Inspect primitives:**
```
Dataset → Solver → Scorer
```

- **Dataset**: Labelled benchmark cases
- **Solver**: The thing being evaluated (AI agent, model, tool, etc.)
- **Scorer**: Grader (deterministic, model-based, or custom)

**What Inspect gives us (for free):**
- Reproducible runs
- Model routing (Claude, GPT, Gemini, custom)
- Tool approval gates
- Execution traces with full transcript
- Multiple scorers per task
- Eval logs with replay
- Parallel execution
- Early stopping
- External agent support (Claude Code, Codex, Gemini CLI)
- Custom tooling via MCP

**License:** MIT (commercial use permitted)

---

## The Two Approaches

### **Option A: Custom AOA Harness (Wrong)**

**Effort:** 6-8 weeks  
**Result:** We own the entire eval platform

**Pros:**
- Full control
- Optimized for accounting
- No external dependency

**Cons:**
- Reinventing the wheel (reproducibility, tracing, scoring, etc.)
- 6-8 weeks of engineering
- Bug surface we don't need
- Distracts from actual AOA value (rubric, cases, workflow)

**Risk:** We build a technically correct eval platform and ship it 2 months late.

---

### **Option B: Inspect AI + AOA Layers (Right)**

**Effort:** 1 week (spike) + 2 weeks (integration)  
**Result:** Inspect handles commodity infrastructure; AOA handles professional differentiation

**Pros:**
- Proven open-source infrastructure
- 1-week spike to validate fit
- Leaves 6+ weeks for actual product (rubric, cases, bench, Academy)
- Battle-tested by UK AISI, other researchers
- Can eventually contribute back to Inspect

**Cons:**
- External dependency (but MIT licensed, can fork)
- Learning curve on Inspect API
- Less custom optimization

**Risk:** Low. Inspect is designed for exactly this use case.

---

## Moat Analysis

### **What We Should NOT Build**
❌ Eval loops  
❌ Scoring infrastructure  
❌ Trace collection  
❌ Parallel job runners  
❌ Model routing  
❌ Experiment logging  

(These are **commodity pieces** that Inspect already handles well.)

### **What We SHOULD Build**
✅ Accounting-specific DoDs  
✅ Domain Packs (AP, Reconciliations, Close, Tax, Revenue)  
✅ AOA-Bench benchmark cases  
✅ Evidence schema + Replay Dossier design  
✅ Professional reviewer interface (HITL)  
✅ Judge calibration + drift detection  
✅ Academy curriculum + certification  
✅ Grader Registry (accounting-specific graders)  

**This is where the moat lives.**

---

## The Spike Plan (1 Week)

### **Days 1-2: Inspect Deep Dive**
- [ ] Read Inspect documentation
- [ ] Review UK AISI examples
- [ ] Study Inspect schema (dataset, solver, scorer)
- [ ] Identify integration points with AOA-Bench

### **Days 3-4: Prototype**
- [ ] Create a toy AP Invoice dataset in Inspect format
- [ ] Write a deterministic scorer (e.g., "vendor in master list")
- [ ] Write a model-based scorer (e.g., "description quality")
- [ ] Run eval on 10 sample invoices
- [ ] Inspect logs for quality

### **Day 5: Decision**
- **PASS**: All primitives map to AOA concepts → Adopt Inspect for v0.1
- **FAIL**: Significant gaps → Plan custom harness for v0.2

---

## Integration Points

| AOA Concept | Inspect Primitive | Mapping |
|-------------|-------------------|---------|
| Benchmark cases | Dataset | AOA-Bench dev/holdout/edge cases |
| Gold standard | Target | Expected verdict (PASS/FLAG/FAIL) |
| Invoice evaluation | Solver | Our app or external evaluator |
| 18-criterion rubric | Multiple Scorers | One scorer per criterion |
| Grader function | Custom Scorer | `check_vendor_in_master()`, etc. |
| Replay Dossier | Eval Log | Inspect's transcript + trace |
| Audit trail | Tool Call Log | Inspect's full transcript |
| Regression testing | Eval Sets | dev/holdout separation |

---

## Success Criteria for Spike

✅ **Inspect handles reproducible runs** (same input → same output every time)  
✅ **Inspect handles model routing** (Claude, GPT, custom agents)  
✅ **Inspect handles traces** (full tool call history)  
✅ **Inspect handles scoring** (deterministic, model, human)  
✅ **Custom graders integrate easily** (write Python → register scorer)  
✅ **Inspect logs are comprehensive** (evidence chains possible)  
✅ **Inspect supports external agents** (we can eval Claude Code outputs)  

If **all 7 are true**: Adopt Inspect for v0.1+.  
If **any are false**: Plan custom harness for v0.2.

---

## Timeline

**Week of Aug 26:**
- [ ] Spike (1 week)
- [ ] Decision (Inspect: YES/NO)

**If YES (Inspect):**
- **Week of Sept 2**: Integrate Inspect with AOA-Bench (2 weeks)
- **Week of Sept 15**: Ship AP Domain Pack v0.1 on Inspect runtime

**If NO (Custom):**
- **Week of Sept 2**: Spec custom harness (1 week)
- **Week of Sept 9**: Build custom harness (5-6 weeks)
- **Week of Oct 20**: Ship AP Domain Pack v0.1 on custom runtime

---

## Risk Mitigation

**Risk**: Inspect API changes and breaks our code  
**Mitigation**: MIT licensed → we can fork and maintain locally

**Risk**: Inspect doesn't support accounting-specific features  
**Mitigation**: We can extend Inspect with custom scorers (Python)

**Risk**: Inspect community too small for support  
**Mitigation**: UK AISI maintains it actively; source code is available

---

## Decision Authority

- **Spike approval**: Finance Engineering Lead
- **Adoption decision**: Product Lead + Engineering Lead
- **Fallback plan**: Custom harness spec ready if Inspect fails

---

## Related Decisions

- **[AOA-DEC-003](./AOA-DEC-003.md)** — Product pivot to Domain Packs
- **[RELIANCE_v2.md](../RELIANCE_v2.md)** — 5-object reliability architecture

---

**Status:** Spike approved. Starting Aug 26.  
**Expected Decision Date:** Sept 2, 2026
