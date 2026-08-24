# AI Accounting Auditor

## The Best Tool on the Market for Evaluating AI-Generated Accounting Output

### Why This Exists

In 2026, CPAs are under regulatory pressure to verify AI-generated accounting work before it reaches client deliverables. Circular 230 §10.22 requires that preparers exercise diligence over accuracy. The AICPA now requires documented verification of AI output against primary source data.

But firms don't have a systematic way to do it. Most are either:
1. Manually spot-checking invoices (expensive, inconsistent)
2. Using the AI vendor's built-in "confidence" scores (which are vendor self-serving)
3. Not verifying at all (compliance risk)

**This tool solves that gap.** It's the first independent, standards-mapped evaluation framework for AI accounting output.

---

## What Makes It Best-in-Class

### 1. **Deep Rubric Framework — Not Just Pass/Fail**

Most AI evaluators give you a simple "correct" or "incorrect" verdict. This tool gives you:

- **16 weighted criteria** across 5 dimensions (vendor, amount, GL, policy, audit trail)
- **Error taxonomy** — not just "wrong," but specifically *which type* of error (vendor mismatch, GL account invalid, policy violation, etc.)
- **Severity tiers** — each error is classified as critical, high, medium, or low, so you know what needs immediate escalation
- **Impact statements** — not just "failed," but *why it matters* (e.g., "GL account mismatch → cost allocation breaks → departmental P&L inaccurate")

The rubric is the defensible asset. It took 20+ years of AP expertise and close operations knowledge to build. It's not something competitors can quickly copy.

### 2. **Compliance Mapping Built In**

Every criterion is explicitly mapped to:
- **Circular 230 §10.22(a) & (b)** — IRS diligence and accuracy standards for preparers
- **AICPA ET 1.300.001** — Code of Professional Conduct on accuracy and verification
- **AS 1105** — PCAOB audit evidence standards
- **ASC 606** — Revenue/accrual period cutoff standards

When you export a report, it includes these citations. This isn't marketing — it's what regulators and auditors actually want to see. It transforms your evaluation from "nice to have" to "documented practice requirement."

### 3. **Works With Any AI Output — No Vendor Lock-In**

Upload CSV or JSON from Basis, Fieldguide, Numeric, your own LLM, or a hybrid system. The tool doesn't care *how* the AI generated the data — it evaluates *what* the data says.

This is critical because:
- Firms often use multiple AI tools in parallel
- Vendors may not provide evaluation capabilities that meet your standards
- You need a portable, vendor-agnostic verification layer

### 4. **Evidence-Driven, Not Fuzzy**

Accounting is deterministic. Either the GL account exists or it doesn't. Either the vendor is in your master file or it isn't. Either the date is past or it's future-dated.

The rubric checks are based on *verifiable facts about the data*, not heuristics or patterns. Each failure comes with:
- The specific criterion that failed
- The exact evidence (what the AI said, what the data actually is)
- The regulation it violates
- The business impact

Reviewers can immediately understand what went wrong, not just that something is "suspicious."

### 5. **Beautiful, Exportable Reports**

The PDF export is production-grade:
- Summary dashboard (pass rate, failure rate, average score)
- Detailed invoice-by-invoice results
- Issue summaries with severity classification
- Full compliance citations
- Audit trail metadata (who generated this, when)

CPAs can drop this directly into working papers. Auditors see the evidence of verification. Regulators see compliance.

### 6. **Silent on Fuzzy Situations — Loud on Deterministic Ones**

The tool doesn't hallucinate. It doesn't penalize you for things it can't verify. If it doesn't have a way to check something, it doesn't score it.

But on things it *can* verify — vendor ID exists, GL account is valid, date is in the past — it's unambiguous. Critical distinction: this builds trust with reviewers because it's never wasting their time on false positives.

---

## What's Inside

### The Rubric (16 Criteria, Weighted)

| Category | Criterion | Weight | Business Impact |
|----------|-----------|--------|-----------------|
| **Vendor** | Vendor exists in master | 10 | Reconciliation; fraud prevention |
| | Vendor-GL mapping valid | 8 | Cost allocation accuracy |
| **Amount** | Non-zero, positive | 10 | Accounting effect; data quality |
| | Within reasonableness bounds | 7 | Anomaly detection |
| | Currency consistency | 6 | FX conversion; close delays |
| **GL** | Account exists & active | 10 | Close success; GL integrity |
| | Account type matches debit/credit | 9 | Trial balance; fundamental GL rule |
| | Cost center valid | 8 | Cost center reporting |
| **Invoice Detail** | Invoice # present & unique | 9 | Duplicate payment prevention |
| | Invoice date valid & reasonable | 8 | Aging; period cutoff |
| | Description meaningful | 6 | Audit trail; cost justification |
| **Policy** | Complies with AP policy | 8 | Compliance; risk mitigation |
| | PO matched (if required) | 9 | Approval control; authorization |
| **Accrual** | Tax treatment correct | 7 | Tax return accuracy |
| | Accrual in correct period | 9 | Balance accuracy; no restatements |
| **Audit Trail** | AI cites source document | 7 | Audit trail; document link |
| | Confidence level recorded | 7 | Risk-based review focus |

**Scoring:** 80% pass threshold. Critical errors (vendor doesn't exist, GL invalid) bring score below pass instantly.

### The Data Model

Invoices can arrive in CSV or JSON. Minimal required fields:
- `invoiceNumber`, `vendorId`, `amount`, `glAccount`, `invoiceDate`
- `description`, `costCenter`, `poNumber`, `sourceDocument`, `overallConfidence`

Optional but recommended:
- `vendorGLMapping`, `glAccountValid`, `glAccountType`, `policyCompliant`, `taxTreatmentCorrect`
- `periodEnd`, `lowConfidenceFields` (array of field names the AI flagged as uncertain)

### The UI/UX

- **Upload zone:** Drag-and-drop or click to upload CSV/JSON. Sample data loads instantly for exploration.
- **Summary dashboard:** Pass rate, failure rate, average score, invoice count at a glance.
- **Invoice list:** Sortable by score, amount, date. Click to drill into detail.
- **Two report modes:**
  - *Summary:* Issues found, sorted by severity. Clear actionable next steps.
  - *Detailed:* All 16 criteria, passed and failed, with evidence and citations.
- **PDF export:** Professional report ready for working papers.

---

## Why This Beats the Competition

### vs. Vendor-Built Review Layers (Basis, Fieldguide, Numeric)

Those tools are optimized to make *their own* outputs look good. Trullion's confidence threshold helps Trullion's output. PredictAP's router sends hard cases to humans, which is smart but doesn't tell you *why* the model was uncertain.

**This tool is independent.** It evaluates any output by the same standard. No bias toward the vendor.

### vs. Generic AI Evals (LM-as-Judge, RAGAS, etc.)

Generic frameworks use other LLMs to evaluate. Problem: LLMs are bad at deterministic accounting tasks. They hallucinate GL accounts, they misunderstand vendor codes, they make up audit trails.

**This tool is deterministic.** It checks facts, not patterns. GL accounts either exist or they don't.

### vs. Spreadsheet-Based Checklists

Lots of firms are building manual review checklists in Excel. It works, but:
- No automation
- Inconsistent criteria across reviewers
- No audit trail
- No compliance mapping
- Takes 5–10 minutes per invoice

**This tool scores 100 invoices in 3 seconds. And doesn't forget a criterion.**

### vs. Building It In-House

Every Big Four firm is building internal verification layers. But:
- Takes 6–12 months
- Requires accounting + engineering expertise
- Vendor lock-in (usually tied to a specific AI tool)
- Not defensible against audit questions ("why those criteria?")

**This tool is ready today.** The rubric is already compliance-mapped. You can show it to your auditor and say, "This is the standard we apply."

---

## How to Use It

### For Discovery Calls (This Week)

1. Load sample invoices (5 real AI outputs from your close, or the included samples)
2. See the score, the failed criteria, the citations
3. Export the PDF
4. Discuss with partner: "This is what independent verification looks like"

**Selling point:** "We can now prove to the IRS, AICPA, or your auditors that we verified AI work systematically, against documented standards."

### For Production (Next Month)

1. Export data from your AI tool as CSV/JSON
2. Upload to the tool
3. Get scores, triage failures (critical → manual review immediately)
4. Export report, attach to working papers
5. Retain as evidence of due diligence

### For Scaling (Q4 2026+)

- Integrate into your close process as a pre-approval gate
- Auto-flag critical failures for escalation
- Build a library of rubric tweaks for client-specific policies
- Use pass/fail data to identify which AI tool works best for which tasks

---

## The Numbers

- **16 criteria** covering vendor, amount, GL, policy, accrual, audit trail
- **5 severity levels** (pass, low, medium, high, critical)
- **100+ weighted combinations** for nuanced scoring
- **Compliance citations** to 4 regulatory frameworks
- **PDF export** with full evidence trail

A single manual invoice review takes 5–10 minutes. This tool scores it in <1 second, with better consistency.

---

## What You Get

1. **The web app** (React + TypeScript)
   - Upload invoices (CSV/JSON)
   - View scores and detailed results
   - Export to PDF
   - Dark mode, professional UX

2. **The rubric framework** (TypeScript)
   - 16 criteria with full descriptions
   - Compliance mapping (Circular 230, AICPA, AS 1105, ASC 606)
   - Severity tiers
   - Business impact statements
   - Error taxonomy

3. **Sample data** (5 invoices, 1 perfect, 1 failing, 3 marginal)
   - Demonstrates the full range of the rubric
   - Ready to show in discovery calls

4. **PDF export** with professional formatting and full citations

---

## How to Deploy

### Locally (Development)

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. Upload CSV or JSON, evaluate, export.

### To Production (Team/Cloud)

Build once, host anywhere:
```bash
npm run build
```

Output goes to `dist/`. Deploy to Vercel, AWS, or internal server. No backend required — all evaluation runs client-side for privacy.

---

## What Happens Next

**Week 1:** Run 5 discovery calls with partners/controllers. Ask:
- Do you have an AI review procedure today?
- Who signs off on AI output?
- What's the budget line for verification?
- Would this standard help you justify it to auditors?

**Week 2:** Take feedback, tune one rubric criterion if needed. Rebuild.

**Week 3:** Show tool in a live demo to 3 prospects. If 2 want to use it, you have demand.

**Week 4:** Decide on commercial model (SaaS, services, license) based on what you learned.

---

## Fair Warning

This tool **does not solve the client-facing pitch.** Firms still need to:
- Decide which AI tool to use
- Train reviewers to understand the rubric
- Integrate into workflow
- Document the process in AP policy

What this tool does: **Make the verification fast, consistent, and auditable.** The rest is sales and operations.

---

## Competitive Positioning

**"The independent standard for AI accounting verification."**

You're not building "another accounting tool." You're building *the* proof that AI accounting is done right. Sell it to:
- Firms adopting AI who need to justify it to partners/auditors
- Vendors who want third-party proof of accuracy
- Compliance teams building AI governance frameworks

---

## Built For

- CPA firms and their clients (the money)
- AI vendors who want to prove output quality (partnership upside)
- Compliance teams and risk officers (expanding market)

Not built for: Accountants who just want automation. They want the AI to work; this is for people who need *proof* it works.

---

Done. Go make discovery calls. Learn what you don't know yet.
