import { ChevronLeft, ChevronRight, CheckCircle, AlertCircle, XCircle, HelpCircle } from 'lucide-react';

interface InvoiceDetailProps {
  invoice: any;
  verdict: any;
  index: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  onBack: () => void;
}

const VERDICT_CONFIG = {
  POST: {
    color: 'bg-green-500/10 border-green-500/20',
    textColor: 'text-green-400',
    icon: CheckCircle,
    label: 'POST',
    description: 'Ready to post — no review needed',
    reviewTime: 0,
  },
  POST_WITH_REVIEW: {
    color: 'bg-yellow-500/10 border-yellow-500/20',
    textColor: 'text-yellow-400',
    icon: AlertCircle,
    label: 'POST WITH REVIEW',
    description: 'One minor flag — quick review, then post',
    reviewTime: 3,
  },
  HOLD: {
    color: 'bg-orange-500/10 border-orange-500/20',
    textColor: 'text-orange-400',
    icon: AlertCircle,
    label: 'HOLD FOR REVIEW',
    description: 'Material issues found — investigate before posting',
    reviewTime: 15,
  },
  ESCALATE: {
    color: 'bg-red-500/10 border-red-500/20',
    textColor: 'text-red-400',
    icon: HelpCircle,
    label: 'ESCALATE',
    description: 'Requires human judgment or policy decision',
    reviewTime: 30,
  },
  REJECT: {
    color: 'bg-red-600/10 border-red-600/20',
    textColor: 'text-red-500',
    icon: XCircle,
    label: 'REJECT',
    description: 'Data quality or policy violation — do not post',
    reviewTime: 10,
  },
};

export function InvoiceDetail({
  invoice,
  verdict,
  index,
  total,
  onPrevious,
  onNext,
  onBack,
}: InvoiceDetailProps) {
  const config = VERDICT_CONFIG[verdict.verdict as keyof typeof VERDICT_CONFIG];
  const Icon = config.icon;

  const blockingFailures = verdict.blockingFailures || [];
  const otherFailures = verdict.allChecks.filter((c: any) => c.status === 'flagged' && !blockingFailures.includes(c));
  const passedChecks = verdict.allChecks.filter((c: any) => c.status === 'passed');

  return (
    <div className="space-y-6">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-slate-300 font-medium text-sm transition-colors flex items-center gap-2"
        >
          ← Back to Batch
        </button>
        <p className="text-slate-400 text-sm">
          Invoice {index + 1} of {total}
        </p>
        <div className="flex gap-2">
          <button
            onClick={onPrevious}
            disabled={index === 0}
            className="p-2 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-slate-300" />
          </button>
          <button
            onClick={onNext}
            disabled={index === total - 1}
            className="p-2 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      </div>

      {/* Verdict Card */}
      <div className={`border rounded-lg p-8 ${config.color}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <Icon className={`w-8 h-8 ${config.textColor} flex-shrink-0 mt-1`} />
            <div>
              <p className={`text-2xl font-bold ${config.textColor}`}>{config.label}</p>
              <p className="text-slate-300 text-sm mt-1">{config.description}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-xs uppercase tracking-wide">Est. Review Time</p>
            <p className="text-2xl font-bold text-white mt-1">{config.reviewTime} min</p>
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="font-semibold text-white mb-4 text-sm uppercase">Invoice Summary</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-slate-400">Invoice Number</p>
              <p className="text-white font-semibold">{invoice.invoiceNumber}</p>
            </div>
            <div>
              <p className="text-slate-400">Vendor</p>
              <p className="text-white font-semibold">{invoice.vendorName}</p>
            </div>
            <div>
              <p className="text-slate-400">Amount</p>
              <p className="text-white font-semibold">${invoice.amount?.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-slate-400">GL Account</p>
              <p className="text-white font-semibold">{invoice.glAccount}</p>
            </div>
            <div>
              <p className="text-slate-400">Date</p>
              <p className="text-white font-semibold">{new Date(invoice.invoiceDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-slate-400">AI Confidence</p>
              <p className="text-white font-semibold">{(invoice.overallConfidence * 100).toFixed(0)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="font-semibold text-white mb-4 text-sm uppercase">Key Findings</h3>
          <div className="space-y-3">
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wide">Passed Checks</p>
              <p className="text-2xl font-bold text-green-400 mt-1">{passedChecks.length}</p>
            </div>
            {blockingFailures.length > 0 && (
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wide">Critical Issues</p>
                <p className="text-2xl font-bold text-red-400 mt-1">{blockingFailures.length}</p>
              </div>
            )}
            {otherFailures.length > 0 && (
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wide">Warnings</p>
                <p className="text-2xl font-bold text-yellow-400 mt-1">{otherFailures.length}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checks Detail */}
      {blockingFailures.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-red-400 flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            Critical Issues ({blockingFailures.length})
          </h3>
          {blockingFailures.map((check: any, idx) => (
            <CheckItem key={idx} check={check} severity="critical" />
          ))}
        </div>
      )}

      {otherFailures.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Warnings ({otherFailures.length})
          </h3>
          {otherFailures.map((check: any, idx) => (
            <CheckItem key={idx} check={check} severity="warning" />
          ))}
        </div>
      )}

      {passedChecks.length > 0 && (
        <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5" />
            Passed Checks ({passedChecks.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {passedChecks.map((check: any, idx) => (
              <div key={idx} className="text-sm">
                <p className="text-green-400">✓ {check.name}</p>
                <p className="text-slate-400 text-xs mt-1">{check.evidence}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Steps */}
      {verdict.verdict !== 'POST' && (
        <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-4">What to Do Next</h3>
          <div className="space-y-4">
            {blockingFailures.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-white mb-2">1. Address Critical Issues</p>
                <div className="space-y-2 ml-4">
                  {blockingFailures.map((check: any, idx) => (
                    <div key={idx}>
                      <p className="text-xs text-slate-300 font-medium">{check.name}</p>
                      {check.nextSteps && check.nextSteps.length > 0 && (
                        <ul className="text-xs text-slate-400 mt-1 space-y-1">
                          {check.nextSteps.slice(0, 3).map((step: string, i: number) => (
                            <li key={i}>• {step}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {otherFailures.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-white mb-2">2. Review Warnings</p>
                <div className="space-y-2 ml-4 text-xs text-slate-400">
                  {otherFailures.map((check: any, idx) => (
                    <p key={idx}>• {check.name}: {check.evidence}</p>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-sm font-semibold text-white mb-2">
                {blockingFailures.length > 0 ? '3. Decision' : '2. Decision'}
              </p>
              <div className="flex gap-3 ml-4">
                {verdict.verdict === 'HOLD' && (
                  <>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors">
                      Post (if resolved)
                    </button>
                    <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded transition-colors">
                      Hold (needs more review)
                    </button>
                  </>
                )}
                {verdict.verdict === 'ESCALATE' && (
                  <>
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded transition-colors">
                      Approve & Post
                    </button>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors">
                      Hold
                    </button>
                  </>
                )}
                {verdict.verdict === 'REJECT' && (
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition-colors">
                    Reject & Request Resubmission
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {verdict.verdict === 'POST' && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center">
          <p className="text-white font-semibold mb-4">Ready to post with confidence</p>
          <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
            Post Invoice
          </button>
        </div>
      )}
    </div>
  );
}

function CheckItem({ check, severity }: { check: any; severity: 'critical' | 'warning' }) {
  const borderColor = severity === 'critical' ? 'border-red-500/20 bg-red-500/5' : 'border-yellow-500/20 bg-yellow-500/5';
  const textColor = severity === 'critical' ? 'text-red-400' : 'text-yellow-400';

  return (
    <div className={`border rounded-lg p-4 ${borderColor}`}>
      <div className="flex items-start gap-3 mb-3">
        <AlertCircle className={`w-5 h-5 ${textColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <p className={`font-semibold ${textColor}`}>{check.name}</p>
          <p className="text-slate-300 text-sm mt-1">{check.description}</p>
        </div>
      </div>

      <div className="bg-slate-900/50 rounded p-3 mb-3 text-sm">
        <p className="text-slate-300 font-mono text-xs">{check.evidence}</p>
      </div>

      {check.nextSteps && check.nextSteps.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-slate-300 uppercase mb-2">What to do:</p>
          <ul className="space-y-1 ml-3">
            {check.nextSteps.map((step: string, idx: number) => (
              <li key={idx} className="text-sm text-slate-300">
                {idx + 1}. {step}
              </li>
            ))}
          </ul>
        </div>
      )}

      {check.possibleCauses && check.possibleCauses.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Possible causes:</p>
          <ul className="space-y-1 ml-3">
            {check.possibleCauses.map((cause: string, idx: number) => (
              <li key={idx} className="text-xs text-slate-400">
                • {cause}
              </li>
            ))}
          </ul>
        </div>
      )}

      {check.authority && (
        <div className="mt-3 pt-3 border-t border-slate-700/50">
          <p className="text-xs text-slate-400">
            <strong>Authority:</strong> {check.authority.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}
