import { useState } from 'react';
import { Upload, ChevronRight } from 'lucide-react';

const SAMPLE_INVOICES = [
  {
    invoiceNumber: 'INV-2026-0847',
    vendorId: 'VENDOR-001',
    vendorName: 'Office Depot',
    amount: 1250.5,
    glAccount: '6100-001',
    glAccountType: 'Expense',
    glAccountValid: true,
    invoiceDate: '2026-08-15',
    description: 'Office supplies and equipment',
    costCenter: 'ADMIN-01',
    costCenterValid: true,
    requiresCostCenter: true,
    currency: 'USD',
    vendorGLMapping: true,
    requiresPO: true,
    poNumber: 'PO-2026-0892',
    poMatchStatus: 'pass',
    sourceDocument: 'INV-2026-0847.pdf',
    documentId: 'DOC-001',
    overallConfidence: 0.92,
    policyCompliant: true,
    taxTreatment: 'Standard Deduction',
    capitalized: false,
    taxTreatmentCorrect: true,
    periodEnd: '2026-08-31',
    expectedMax: 500000,
  },
  {
    invoiceNumber: 'INV-2026-0848',
    vendorId: 'VENDOR-002',
    vendorName: 'Acme Corp',
    amount: 25000.0,
    glAccount: '5200-002',
    glAccountType: 'Expense',
    glAccountValid: true,
    invoiceDate: '2026-08-20',
    description: 'Consulting services - Strategy review',
    costCenter: 'MARKETING-01',
    costCenterValid: true,
    requiresCostCenter: true,
    currency: 'USD',
    vendorGLMapping: true,
    requiresPO: true,
    poNumber: 'PO-2026-0901',
    poMatchStatus: 'pass',
    sourceDocument: 'INV-2026-0848.pdf',
    documentId: 'DOC-002',
    overallConfidence: 0.88,
    policyCompliant: true,
    taxTreatment: 'Standard Deduction',
    capitalized: false,
    taxTreatmentCorrect: true,
    periodEnd: '2026-08-31',
    expectedMax: 500000,
  },
  {
    invoiceNumber: 'INV-2026-0849',
    vendorId: 'VENDOR-UNKNOWN',
    vendorName: 'Random Vendor XYZ',
    amount: 5500.0,
    glAccount: '9999',
    glAccountType: 'Unknown',
    glAccountValid: false,
    invoiceDate: '2026-08-01',
    description: 'Services',
    costCenter: 'UNKNOWN',
    costCenterValid: false,
    requiresCostCenter: true,
    currency: 'USD',
    vendorGLMapping: false,
    requiresPO: true,
    poNumber: '',
    poMatchStatus: 'mismatch',
    sourceDocument: 'INV-2026-0849.pdf',
    documentId: 'DOC-003',
    overallConfidence: 0.45,
    policyCompliant: false,
    taxTreatment: 'Unknown',
    capitalized: false,
    taxTreatmentCorrect: false,
    periodEnd: '2026-08-31',
    expectedMax: 500000,
  },
  {
    invoiceNumber: 'INV-2026-0850',
    vendorId: 'VENDOR-004',
    vendorName: 'Tech Solutions Inc',
    amount: 125000.0,
    glAccount: '1200-001',
    glAccountType: 'Asset',
    glAccountValid: true,
    invoiceDate: '2026-08-18',
    description: 'Software licenses and implementation',
    costCenter: 'IT-01',
    costCenterValid: true,
    requiresCostCenter: true,
    currency: 'USD',
    vendorGLMapping: true,
    requiresPO: true,
    poNumber: 'PO-2026-0850',
    poMatchStatus: 'pass',
    sourceDocument: 'INV-2026-0850.pdf',
    documentId: 'DOC-004',
    overallConfidence: 0.91,
    policyCompliant: true,
    taxTreatment: 'Capitalized',
    capitalized: true,
    taxTreatmentCorrect: true,
    periodEnd: '2026-08-31',
    expectedMax: 500000,
  },
  {
    invoiceNumber: 'INV-2026-0851',
    vendorId: 'VENDOR-005',
    vendorName: 'Utilities Co',
    amount: 8750.25,
    glAccount: '6300-001',
    glAccountType: 'Expense',
    glAccountValid: true,
    invoiceDate: '2026-08-25',
    description: 'Electric and gas services - August 2026',
    costCenter: 'FACILITIES-01',
    costCenterValid: true,
    requiresCostCenter: true,
    currency: 'USD',
    vendorGLMapping: true,
    requiresPO: false,
    poNumber: '',
    poMatchStatus: 'not_required',
    sourceDocument: 'INV-2026-0851.pdf',
    documentId: 'DOC-005',
    overallConfidence: 0.85,
    policyCompliant: true,
    taxTreatment: 'Standard Deduction',
    capitalized: false,
    taxTreatmentCorrect: true,
    periodEnd: '2026-08-31',
    expectedMax: 500000,
  },
  {
    invoiceNumber: 'INV-2026-0852',
    vendorId: 'VENDOR-UNKNOWN2',
    vendorName: 'New Vendor Inc',
    amount: 3200.0,
    glAccount: '6100-001',
    glAccountType: 'Expense',
    glAccountValid: true,
    invoiceDate: '2026-08-22',
    description: 'Test',
    costCenter: 'ADMIN-01',
    costCenterValid: true,
    requiresCostCenter: true,
    currency: 'USD',
    vendorGLMapping: false,
    requiresPO: true,
    poNumber: '',
    poMatchStatus: 'mismatch',
    sourceDocument: 'INV-2026-0852.pdf',
    documentId: 'DOC-006',
    overallConfidence: 0.42,
    policyCompliant: false,
    taxTreatment: 'Unknown',
    capitalized: false,
    taxTreatmentCorrect: false,
    periodEnd: '2026-08-31',
    expectedMax: 500000,
    vendorBankingChangeWithin30Days: true,
  },
];

interface InvoiceUploaderProps {
  onInvoicesLoaded: (invoices: any[]) => void;
}

export function InvoiceUploader({ onInvoicesLoaded }: InvoiceUploaderProps) {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const text = await file.text();
      let invoices: any[] = [];

      if (file.name.endsWith('.csv')) {
        invoices = parseCSV(text);
      } else if (file.name.endsWith('.json')) {
        invoices = JSON.parse(text);
      }

      if (invoices.length > 0) {
        onInvoicesLoaded(invoices);
      }
    } catch (error) {
      alert('Error parsing file. Please ensure it is valid CSV or JSON.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const parseCSV = (csv: string): any[] => {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',').map((h) => h.trim());
    const invoices: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map((v) => v.trim());
      const invoice: any = {};
      headers.forEach((header, idx) => {
        invoice[header] = values[idx];
      });
      invoices.push(invoice);
    }

    return invoices;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-white">AOA — AI Output Auditor</h1>
          <p className="text-slate-400 mt-2">Professional AP invoice evaluation mapped to Circular 230 & AICPA standards</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Upload Area */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-12">
            <div className="text-center space-y-6">
              <div className="flex justify-center mb-4">
                <Upload className="w-16 h-16 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Load Invoice Batch</h2>
              <p className="text-slate-300">
                Upload CSV or JSON containing AI-generated AP invoices. AOA will evaluate each against 18 criteria covering vendor validation,
                GL coding, amounts, policy compliance, and audit trail.
              </p>

              <div className="relative">
                <input
                  type="file"
                  accept=".csv,.json"
                  onChange={handleFileUpload}
                  disabled={loading}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-12 hover:border-blue-400 transition-colors bg-slate-900/50">
                  <p className="text-slate-300 font-medium">{loading ? 'Loading...' : 'Click to upload or drag and drop'}</p>
                  <p className="text-slate-400 text-sm">CSV or JSON format</p>
                </div>
              </div>

              <div>
                <p className="text-slate-400 text-sm mb-4">Don't have a file? Try sample data:</p>
                <button
                  onClick={() => onInvoicesLoaded(SAMPLE_INVOICES)}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Load Sample Batch (6 invoices)
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Format Guide */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">CSV Format</h3>
              <div className="bg-slate-900/50 rounded p-4 overflow-x-auto mb-4">
                <pre className="text-xs text-slate-300">
{`invoiceNumber,vendorName,amount,glAccount
INV-001,Office Depot,1250.50,6100-001`}
                </pre>
              </div>
              <p className="text-sm text-slate-400">
                Comma-separated file with headers in first row. See sample for complete field list.
              </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">JSON Format</h3>
              <div className="bg-slate-900/50 rounded p-4 overflow-x-auto mb-4">
                <pre className="text-xs text-slate-300">
{`[
  {"invoiceNumber": "INV-001",
   "vendorName": "Office Depot",
   ...}
]`}
                </pre>
              </div>
              <p className="text-sm text-slate-400">Array of objects with invoice data. Load sample to see all fields.</p>
            </div>
          </div>

          {/* What Gets Evaluated */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-6">What AOA Evaluates</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="font-semibold text-green-400 mb-2">✓ Vendor Validation</p>
                <p className="text-sm text-slate-400">Master file lookup, fraud flags, GL mapping</p>
              </div>
              <div>
                <p className="font-semibold text-green-400 mb-2">✓ GL Coding</p>
                <p className="text-sm text-slate-400">Account exists, type matches, cost center valid</p>
              </div>
              <div>
                <p className="font-semibold text-green-400 mb-2">✓ Amount Accuracy</p>
                <p className="text-sm text-slate-400">Non-zero, reasonable, currency correct</p>
              </div>
              <div>
                <p className="font-semibold text-green-400 mb-2">✓ Invoice Detail</p>
                <p className="text-sm text-slate-400">Invoice number unique, date valid, description specific</p>
              </div>
              <div>
                <p className="font-semibold text-green-400 mb-2">✓ Policy Compliance</p>
                <p className="text-sm text-slate-400">Policy violations, PO matching, authorization</p>
              </div>
              <div>
                <p className="font-semibold text-green-400 mb-2">✓ Audit Trail</p>
                <p className="text-sm text-slate-400">Source cited, confidence recorded, tax treatment</p>
              </div>
            </div>
          </div>

          {/* Verdict Types */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-6">How AOA Rates Invoices</h3>
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm font-semibold flex-shrink-0">POST</div>
                <div className="text-sm text-slate-300">Ready to post — no review needed</div>
              </div>
              <div className="flex gap-4">
                <div className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded text-sm font-semibold flex-shrink-0">REVIEW</div>
                <div className="text-sm text-slate-300">One minor flag — quick check, then post</div>
              </div>
              <div className="flex gap-4">
                <div className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded text-sm font-semibold flex-shrink-0">HOLD</div>
                <div className="text-sm text-slate-300">Material issues — investigate before posting</div>
              </div>
              <div className="flex gap-4">
                <div className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm font-semibold flex-shrink-0">ESCALATE</div>
                <div className="text-sm text-slate-300">Requires human judgment or policy decision</div>
              </div>
              <div className="flex gap-4">
                <div className="px-3 py-1 bg-red-600/20 text-red-500 rounded text-sm font-semibold flex-shrink-0">REJECT</div>
                <div className="text-sm text-slate-300">Data quality or policy violation — do not post</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-slate-400 text-sm py-6 border-t border-slate-700">
            <p>All verdicts are recommendations for review by licensed accountants. Final posting decisions remain with accounting staff.</p>
            <p className="mt-2">Mapped to Circular 230 §10.22, AICPA ET 1.300, PCAOB AS 1105</p>
          </div>
        </div>
      </main>
    </div>
  );
}
