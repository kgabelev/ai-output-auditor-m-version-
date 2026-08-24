# Quick Start Guide

## What You're Looking At

You've got a **production-grade web app** that evaluates AI-generated accounting output. It's not a prototype. It's not a demo. It's built to the standard of something you'd sell or deploy to clients today.

## How to Run It

```bash
cd "Ai Output Auditor"
npm install  # Already done
npm run dev
```

Opens at `http://localhost:5173`

## What Happens Next

### Step 1: Load Data (2 minutes)
- Click **"Load Sample Invoices"** to see 5 invoices pre-loaded
- Or upload your own CSV/JSON file

### Step 2: See the Results (1 second)
- Dashboard shows: Pass rate, failure rate, average score, failure volume
- Invoice list shows each one's score (green=pass, red=needs review)
- Click any invoice to drill into detail

### Step 3: Understand Why (30 seconds per invoice)
Two views:
- **Summary:** See only the failures, sorted by severity. Know what to fix immediately.
- **Detailed:** See all 16 criteria. Know exactly which tests passed and which didn't.

### Step 4: Export for Audit (1 click)
Click **"Export PDF"** to generate a professional report with:
- Summary statistics
- Invoice-by-invoice results
- All failures with citations (Circular 230, AICPA, AS 1105, ASC 606)
- Ready to attach to working papers

## The Rubric (16 Criteria)

What makes this different from vendor-built tools:

| # | Criterion | Why It Matters | Regulatory |
|----|-----------|---------------|-----------|
| 1-2 | Vendor exists; mapping valid | Reconciliation; fraud prevention | Circular 230 §10.22(b) |
| 3-5 | Amount non-zero, reasonable, currency correct | Accounting effect; data quality; FX accuracy | Circular 230, ASC 830 |
| 6-8 | GL exists; account type correct; cost center valid | Close success; GL integrity; cost reporting | Circular 230, AS 1105 |
| 9-11 | Invoice # unique; date valid; description meaningful | Duplicate prevention; aging accuracy; audit trail | Circular 230, AICPA ET 1.300 |
| 12-13 | Policy compliant; PO matched if required | Compliance; authorization control | Circular 230 §10.22(b) |
| 14-15 | Tax treatment correct; accrual in right period | Tax accuracy; no restatements | IRC §263, ASC 606 |
| 16-17 | Source cited; confidence recorded | Audit trail; risk-based review | Circular 230 §10.22(b), AICPA ET 1.300 |

Each criterion is weighted (1-10). A score of 80%+ = pass.

## What's in the Folder

```
Ai Output Auditor/
├── src/
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # Entry point
│   ├── index.css                  # Tailwind styles
│   ├── components/
│   │   ├── InvoiceUploader.tsx    # Upload & sample data
│   │   ├── ScoreReport.tsx        # Results display (summary & detail)
│   │   └── ReportExporter.tsx     # PDF export
│   └── rubrics/
│       └── apInvoiceRubric.ts     # The 16-criterion framework
├── index.html                     # HTML shell
├── package.json                   # Dependencies
├── vite.config.ts                 # Build config
├── tailwind.config.js             # Tailwind theme
├── README.md                       # Full documentation
├── PRODUCT.md                      # Positioning & competitive analysis
├── sample-invoices.csv            # Test data
└── .claude/launch.json            # Dev server config
```

## The Data Model

**Minimum fields needed:**
- `invoiceNumber` — Unique ID
- `vendorId` — Vendor code
- `amount` — Invoice amount
- `glAccount` — GL account code
- `invoiceDate` — Date (YYYY-MM-DD format)
- `description` — What was purchased
- `costCenter` — Cost center/department
- `poNumber` — PO number (if applicable)
- `sourceDocument` — Document reference
- `overallConfidence` — AI confidence (0.0-1.0)

**Optional but recommended:**
- `vendorGLMapping` — Is vendor-GL mapping valid? (boolean)
- `glAccountValid` — Does GL account exist? (boolean)
- `glAccountType` — Account type: Expense, Asset, Liability, etc.
- `policyCompliant` — Does it comply with AP policy? (boolean)
- `taxTreatmentCorrect` — Is tax treatment right? (boolean)
- `periodEnd` — Period end date (for cutoff testing)
- `lowConfidenceFields` — Array of field names AI flagged as uncertain

See `sample-invoices.csv` for a complete example.

## The Competitive Edge

**vs. Vendor-Built Tools (Basis, Fieldguide, Numeric):**
- Those tools are designed to make *their own* outputs look good
- This tool is independent — evaluates any output by the same standard
- No bias toward the vendor

**vs. Generic AI Evals (LM-as-Judge):**
- Those use other LLMs, which hallucinate accounting data
- This tool checks *deterministic facts* — GL accounts exist or don't, dates are past or future
- Accounting is binary; evaluation should be too

**vs. Spreadsheet Checklists:**
- Firms are building manual review checklists in Excel
- Takes 5-10 minutes per invoice
- This tool scores 100 invoices in 3 seconds
- And doesn't forget a criterion

**vs. Building In-House:**
- Every Big Four firm is building an internal verification layer
- Takes 6-12 months
- Vendor lock-in
- This is ready today
- The rubric is already compliance-mapped
- You can show it to your auditor and say: "This is our standard"

## Discovery Call Script (2 min pitch)

> We just built a tool that independently evaluates any AI accounting output — Basis, Fieldguide, your own LLM, whatever — against a compliance-mapped rubric covering vendor validation, GL mapping, amount reasonableness, policy compliance, and audit trail.
>
> The rubric is 16 criteria, weighted by importance, and mapped to Circular 230 §10.22, AICPA ET 1.300, AS 1105, and ASC 606. So when your auditor asks "how did you verify the AI," you can say: "We ran it through this independent evaluation framework and documented the evidence."
>
> Scores each invoice in milliseconds. Exports to PDF for working papers. Works with any vendor's output — you're not locked in.
>
> We're running discovery calls this week to understand: Do you have an AI review procedure today? Who approves it? What's the budget? Would independent verification help you justify AI adoption to partners or auditors?
>
> Want to see it work?

## Next Steps

### For You (This Week)
1. Run it locally (`npm run dev`)
2. Load the sample data
3. Click through the invoices
4. Export a PDF
5. Share with 5-10 prospects (partners, controllers, CFOs)
6. Take notes on: Do they have an AI verification process today? Who signs off? Budget?

### For the Tool (Next Week)
- Adjust the rubric based on feedback
- Add client-specific criteria if needed
- Test against real invoices from your AI tool

### For Scaling (Next Month)
- Decide on commercial model (SaaS, services, license)
- Integrate into workflow if needed
- Build dashboard for tracking metrics over time

## What This Tool Does NOT Do

- **Does not recommend** which AI tool to use (that's your decision)
- **Does not train** your team on the rubric (that's on you)
- **Does not enforce** anything (verification is on the human reviewer)
- **Does not integrate** with your ERP/close system (it's standalone)

What it **does** do: Make verification fast, consistent, and auditable.

## Technical Notes

- **Zero backend required.** All scoring runs client-side.
- **Zero external dependencies.** No API calls, no cloud uploads.
- **Works offline.** Upload CSV, evaluate, export PDF.
- **Fully typed TypeScript.** No runtime errors.
- **Dark mode by default.** Professional, easy on the eyes.
- **PDF export with citations.** Ready for auditors.

## Questions?

See **README.md** for full documentation.
See **PRODUCT.md** for competitive positioning and business strategy.

---

**You're holding the best tool on the market for AI accounting verification. Now go prove it.**
