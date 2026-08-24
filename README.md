# AI Output Auditor (AOA)

> **Evidence-and-calculation assurance product for professional review of AI-generated answers.**

AOA decomposes AI-generated answers into claims, reproduces deterministic calculations, connects claims to exact evidence, exposes contradictions and unsupported assertions, preserves provenance and limitations, and routes judgment-dependent matters to humans.

This repository contains the **product control system**, including:
- [Release Contract](RELEASE_CONTRACT.md)
- [AOA-Bench](benchmark/README.md)
- [Claim Ledger Schema](schemas/claim-ledger.schema.json)
- [Status Taxonomy](docs/status-taxonomy.md)
- [Shipping SOP](docs/shipping/SHIPPING-SOP.md)

---

## 📌 Repository Structure

```
ai-output-auditor-m-version/
│
├── README.md
├── RELEASE_CONTRACT.md
├── PRD.md
├── CHANGELOG.md
│
├── docs/
│   ├── definition-of-done.md
│   ├── evidence-policy.md
│   ├── status-taxonomy.md
│   ├── claim-ledger-spec.md
│   │
│   ├── decisions/
│   │   ├── AOA-DEC-001-v01-scope.md
│   │   └── AOA-DEC-002-competitive-thesis.md
│   │
│   └── shipping/
│       ├── SHIPPING-SOP.md
│       ├── WORK-PACKAGE-TEMPLATE.md
│       ├── AGENT-HANDOFF-PROTOCOL.md
│       └── DEFINITION-OF-DONE-CHECKLIST.md
│
├── research/
│   ├── source-register.md
│   └── synthesis/
│
├── benchmark/
│   ├── README.md
│   ├── taxonomy.md
│   ├── manifest.json
│   ├── dev/
│   └── holdout/
│
├── schemas/
│   └── claim-ledger.schema.json
│
├── evals/
│   ├── harness/
│   └── results/
│
├── app/
├── tests/
└── .github/
```

---

## 🚀 Getting Started

1. **Read the [Release Contract](RELEASE_CONTRACT.md)** to understand the scope and constraints of AOA v0.1.
2. **Review the [Status Taxonomy](docs/status-taxonomy.md)** for bounded states used in the Claim Ledger.
3. **Explore [AOA-Bench](benchmark/README.md)** for evaluation cases.
4. **Follow the [Shipping SOP](docs/shipping/SHIPPING-SOP.md)** for contributing.

---

## 📜 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.