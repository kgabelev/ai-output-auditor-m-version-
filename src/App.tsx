import { useState } from 'react';
import { ChevronDown, CheckCircle, AlertCircle, XCircle, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { InvoiceUploader } from './components/InvoiceUploader';
import { BatchOverview } from './components/BatchOverview';
import { InvoiceDetail } from './components/InvoiceDetail';
import { ImprovementDashboard } from './components/ImprovementDashboard';
import { AP_INVOICE_CRITERIA, evaluateInvoice } from './rubrics/apInvoiceRubricV2';

export default function App() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [verdictResults, setVerdictResults] = useState<any[]>([]);
  const [selectedInvoiceIdx, setSelectedInvoiceIdx] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'detail' | 'improvement'>('overview');
  const [sortBy, setSortBy] = useState<'verdict' | 'amount' | 'risk' | 'date'>('verdict');

  const handleInvoicesLoaded = (loadedInvoices: any[]) => {
    setInvoices(loadedInvoices);
    const evaluated = loadedInvoices.map((invoice) => evaluateInvoice(invoice));
    setVerdictResults(evaluated);
    setSelectedInvoiceIdx(0);
  };

  const sortedResults = [...verdictResults].sort((a, b) => {
    const invoiceA = invoices[verdictResults.indexOf(a)];
    const invoiceB = invoices[verdictResults.indexOf(b)];

    switch (sortBy) {
      case 'amount':
        return (invoiceB.amount || 0) - (invoiceA.amount || 0);
      case 'risk':
        const riskOrder = { REJECT: 4, ESCALATE: 3, HOLD: 2, POST_WITH_REVIEW: 1, POST: 0 };
        return riskOrder[b.verdict as keyof typeof riskOrder] - riskOrder[a.verdict as keyof typeof riskOrder];
      case 'date':
        return new Date(invoiceB.invoiceDate || 0).getTime() - new Date(invoiceA.invoiceDate || 0).getTime();
      case 'verdict':
      default:
        return 0;
    }
  });

  if (invoices.length === 0) {
    return <InvoiceUploader onInvoicesLoaded={handleInvoicesLoaded} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">AOA — AP Invoice Evaluation</h1>
              <p className="text-sm text-slate-400 mt-1">Period: August 2026 | Entity: Current | Batch: {invoices.length} invoices</p>
            </div>
            <button
              onClick={() => {
                setInvoices([]);
                setVerdictResults([]);
                setSelectedInvoiceIdx(null);
              }}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Load New Batch
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mt-6 border-b border-slate-700">
            <button
              onClick={() => setViewMode('overview')}
              className={`px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                viewMode === 'overview'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              Batch Overview
            </button>
            <button
              onClick={() => setViewMode('detail')}
              className={`px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                viewMode === 'detail'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              Invoice Details
            </button>
            <button
              onClick={() => setViewMode('improvement')}
              className={`px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                viewMode === 'improvement'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              Improvement Tracking
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {viewMode === 'overview' && (
          <BatchOverview
            invoices={invoices}
            verdictResults={verdictResults}
            onSelectInvoice={(idx) => {
              setSelectedInvoiceIdx(idx);
              setViewMode('detail');
            }}
          />
        )}

        {viewMode === 'detail' && selectedInvoiceIdx !== null && (
          <InvoiceDetail
            invoice={invoices[selectedInvoiceIdx]}
            verdict={verdictResults[selectedInvoiceIdx]}
            index={selectedInvoiceIdx}
            total={invoices.length}
            onPrevious={() => setSelectedInvoiceIdx(Math.max(0, selectedInvoiceIdx - 1))}
            onNext={() => setSelectedInvoiceIdx(Math.min(invoices.length - 1, selectedInvoiceIdx + 1))}
            onBack={() => setViewMode('overview')}
          />
        )}

        {viewMode === 'improvement' && (
          <ImprovementDashboard
            verdictResults={verdictResults}
            invoices={invoices}
            verdictRules={AP_INVOICE_CRITERIA}
          />
        )}
      </main>

      <footer className="border-t border-slate-700 bg-slate-900/50 mt-16 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-xs">
          <p>AOA Evaluation Engine v2.0 | Mapped to Circular 230, AICPA ET 1.300, PCAOB AS 1105</p>
          <p className="mt-1">All verdicts are recommendations for review by licensed accountants. Final posting decisions remain with accounting staff.</p>
        </div>
      </footer>
    </div>
  );
}
