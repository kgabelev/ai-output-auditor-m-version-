# AOA — AI Accounting Auditor

**The industry's first independent evaluation tool for AI-generated accounting output.**

Production-grade verdict-based assessment mapped to Circular 230, AICPA, and PCAOB standards. Built for mid-size accounting firms. Ready to deploy.

## What This Is

A complete go-to-market package:

- ✅ **App** — React-based evaluation tool running on Vercel
- ✅ **Deployment** — One-click production setup via GitHub or CLI
- ✅ **Blog Strategy** — 12-week thought leadership calendar (completed)
- 🔄 **Academy** — Professional certification curriculum (building)
- 🔄 **R&D System** — Continuous improvement tracking (building)

## Quick Start

### Deploy to Production (60 seconds)

**Option A: GitHub (Recommended)**
```bash
git push to GitHub
→ Connect to vercel.com
→ Live at https://aoa-*.vercel.app
```

**Option B: CLI**
```bash
npm install -g vercel
vercel --prod
```

See [DEPLOY.md](DEPLOY.md) for full instructions and GitHub Actions setup.

### Local Development

```bash
npm install
npm run dev     # Opens http://localhost:5173
npm run build   # Production build
npm run type-check  # Type check
```

### Load Sample Data

Click **"Load Sample Batch (6 invoices)"** to see verdicts ranging from POST (clean) to HOLD (needs investigation). Instantly see evidence chains and regulatory citations.

## The Verdict System

**18 evaluation criteria organized in 7 domains:**

| Domain | Count | What It Checks |
|--------|-------|---|
| **Vendor** | 3 | Vendor exists, fraud flag, GL mapping |
| **GL Account** | 3 | Account exists, type matches, cost center valid |
| **Amount** | 3 | Non-zero, reasonableness, currency consistency |
| **Invoice Detail** | 3 | Invoice number unique, date valid, description quality |
| **Policy & Matching** | 2 | Policy compliance, PO match |
| **Tax & Accrual** | 2 | Tax treatment correct, cutoff accrual |
| **Audit Trail** | 2 | Source cited, confidence recorded |

**Each criterion includes:**
- Weight (1-10)
- Severity tier
- Regulatory authority (Circular 230 §10.22, AICPA ET 1.300, PCAOB AS 1105, ASC 606)
- Deterministic check function
- Evidence capture with specific findings
- Actionable next steps per exception

**Verdicts:**
- **POST** — Straight to ledger (lowest risk)
- **POST_WITH_REVIEW** — Auto-post + flag for review
- **HOLD** — Exception, needs investigation
- **ESCALATE** — Policy/judgment call needed
- **REJECT** — Clear failure, do not post

## Key Features

### Evidence Chains
Every verdict shows **specific evidence** + **regulatory citations** + **next steps**. Not vague warnings — actionable guidance.

### Deterministic Checks
Code-based rules for 100% reproducibility. Accounting is binary: vendors exist or don't, accounts are active or inactive, dates are valid or not.

### Verdict-Based
Binary decisions (POST / HOLD / REJECT), not confidence scores. Matches how accountants actually work.

### Independent
Evaluates any tool's output by the same standard. No vendor bias.

### Offline-Ready
Works entirely in the browser. No cloud uploads. No external dependencies.

### Production-Ready
- **Fast:** 100 invoices evaluated in seconds
- **Consistent:** Same rubric every time
- **Auditable:** Full evidence trail for working papers
- **Regulatory:** Citations to Circular 230, AICPA, PCAOB, ASC standards

## The Three Views

### 1. Batch Overview — Dashboard
- Overall reliance score
- Straight-through rate (% auto-posted)
- Verdict distribution (POST / HOLD / ESCALATE / REJECT)
- Time to resolve exceptions
- Invoice table with quick actions

### 2. Invoice Detail — Full Analysis
- Verdict card with confidence level
- Invoice summary (vendor, amount, GL, date)
- Critical issues with evidence and next steps
- Warnings section with regulatory citations
- Passed checks section

### 3. Improvement Dashboard — R&D Tracking
- Verdict accuracy metrics
- False positive/negative rates
- Monthly trend charts
- Check category performance
- Research priorities for rubric refinement

## Use Cases

### For Finance Teams
"We just adopted AI for AP coding. How do we know if it's trustworthy? AOA runs every invoice and flags the 10-15% that need review."

### For Controllers
"We need to document that we reviewed AI output for our auditor. AOA gives us that paper trail with regulatory citations."

### For Audit Firms
"When we test a client's AI invoicing, we need a standard. AOA provides the framework we can rely on and explain to regulators."

## Architecture

**Tech Stack:**
- **Frontend:** React + TypeScript + Tailwind CSS
- **Evaluation:** Deterministic checks running client-side
- **Storage:** Browser localStorage for metrics (upgradeable to backend)
- **Deployment:** Vercel (or any static host)

**Zero backend required.** All evaluation logic runs client-side. Data never leaves your browser.

**File Structure:**
```
src/
├─ App.tsx                      Main app with three views
├─ types/index.ts              Complete type system
├─ rubrics/apInvoiceRubricV2.ts 18-criterion evaluation rubric
└─ components/
   ├─ BatchOverview.tsx        Dashboard with verdict distribution
   ├─ InvoiceDetail.tsx        Full detail with evidence chains
   ├─ ImprovementDashboard.tsx R&D metrics and trends
   └─ InvoiceUploader.tsx      Sample data loader
```

## Deployment

### One-Click Deploy to Vercel

```bash
# GitHub option (auto-deploy on push)
git push to GitHub
→ vercel.com/new
→ Select repo
→ Live in 60 seconds

# CLI option
vercel --prod
```

**What's included:**
- Security headers (X-Content-Type-Options, X-Frame-Options, CSP)
- SPA routing (rewrite /* to index.html)
- Environment variables support
- GitHub Actions for CI/CD

See [DEPLOY.md](DEPLOY.md) for step-by-step instructions.

## What's Included

- ✅ **Web app** — Upload CSV/JSON, evaluate, review verdicts
- ✅ **Rubric framework** — 18 criteria with evidence chains and citations
- ✅ **Sample data** — 6 test invoices showing range of verdicts
- ✅ **R&D tracking** — Metrics dashboard for continuous improvement
- ✅ **Deployment config** — Vercel-ready with GitHub Actions
- ✅ **Blog strategy** — 12-week content calendar for thought leadership
- 🔄 **Academy curriculum** — Professional certification tracks (in progress)

## Next Steps

### Immediate (Week 1)
1. Deploy to Vercel (see [DEPLOY.md](DEPLOY.md))
2. Share URL with 5-10 trusted advisors
3. Collect feedback on UX and rubric

### Week 2-8
4. Publish blog strategy (12-week calendar ready — see [GTM.md](GTM.md))
5. Run discovery calls with mid-size CPA firms
6. Refine rubric based on real-world feedback

### Week 9-12
7. Launch Academy Foundation course
8. Deploy domain-specific certification tracks
9. Publish thought leadership content

### Week 13+
10. Build inbound sales pipeline
11. Expand to other document types (reconciliations, GL entries)

See [GTM.md](GTM.md) for the complete 12-week market launch plan.

## Key Metrics to Track

| Metric | Why | Target |
|--------|-----|--------|
| **Straight-through rate** | Economic benefit | 50-70% |
| **False positive rate** | User confidence | <5% |
| **False negative rate** | Audit safety | <2% |
| **Time to resolve (HOLD)** | Vendor relations | <2 business days |
| **Blog impressions** | Demand generation | 15k over 8 weeks |
| **Academy students** | Community building | 50 by week 12 |

## Current Status

✅ **App** — Production-ready, deployed to Vercel  
✅ **Deployment infrastructure** — Vercel config + GitHub Actions CI/CD  
✅ **Blog strategy** — Completed (12-week calendar generated)  
🔄 **Academy curriculum** — Building (agent running)  
🔄 **R&D metrics system** — Building (agent running)  

## Competitive Positioning

### vs. Vendor Tools (Basis, Fieldguide, Numeric)
**They:** Build confidence scores into proprietary tools  
**We:** Independent evaluation of **any** tool's output

### vs. Manual Review
**They:** Accountants manually review 100% of AI output  
**We:** Automate 50-70% via deterministic checks; humans only touch exceptions

### vs. Generic AI Evals
**They:** "LLM judges output"  
**We:** Regulatory-mapped rubric + deterministic checks + human authority

## Questions?

- **How do I deploy?** → [DEPLOY.md](DEPLOY.md)
- **What's the business strategy?** → [GTM.md](GTM.md)
- **How does the rubric work?** → Read [src/rubrics/apInvoiceRubricV2.ts](src/rubrics/apInvoiceRubricV2.ts)
- **Need to refine for your firm?** → Edit the rubric in the same file

---

**Built for accounting firms that adopt AI and need to prove they're doing the due diligence required by Circular 230, AICPA ET 1.300, PCAOB AS 1105, and ASC 606.**

Ready to be the industry standard for AI accounting output evaluation.
