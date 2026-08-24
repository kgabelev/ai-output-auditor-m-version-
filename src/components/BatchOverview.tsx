import { CheckCircle, AlertCircle, Clock, DollarSign, TrendingUp } from 'lucide-react';

interface BatchOverviewProps {
  invoices: any[];
  verdictResults: any[];
  onSelectInvoice: (idx: number) => void;
}

export function BatchOverview({ invoices, verdictResults, onSelectInvoice }: BatchOverviewProps) {
  // Calculate verdict distribution
  const verdictCounts = {
    POST: verdictResults.filter((v) => v.verdict === 'POST').length,
    POST_WITH_REVIEW: verdictResults.filter((v) => v.verdict === 'POST_WITH_REVIEW').length,
    HOLD: verdictResults.filter((v) => v.verdict === 'HOLD').length,
    ESCALATE: verdictResults.filter((v) => v.verdict === 'ESCALATE').length,
    REJECT: verdictResults.filter((v) => v.verdict === 'REJECT').length,
  };

  // Calculate metrics
  const totalAmount = invoices.reduce((sum, inv) => sum + (inv.amount || 0), 0);
  const holdAmount = invoices
    .filter((_, i) => verdictResults[i].verdict === 'HOLD' || verdictResults[i].verdict === 'ESCALATE')
    .reduce((sum, inv) => sum + (inv.amount || 0), 0);
  const straightThroughAmount = invoices
    .filter((_, i) => verdictResults[i].verdict === 'POST')
    .reduce((sum, inv) => sum + (inv.amount || 0), 0);

  const overallReliance = ((verdictCounts.POST + verdictCounts.POST_WITH_REVIEW) / invoices.length) * 100;
  const estimatedReviewTime = verdictResults.reduce((sum, v) => {
    switch (v.verdict) {
      case 'POST':
        return sum + 0;
      case 'POST_WITH_REVIEW':
        return sum + 3;
      case 'HOLD':
        return sum + 15;
      case 'ESCALATE':
        return sum + 30;
      case 'REJECT':
        return sum + 10;
      default:
        return sum;
    }
  }, 0);

  return (
    <div className="space-y-8">
      {/* Main Verdict Card */}
      <div className="bg-gradient-to-br from-blue-900/30 to-slate-900 border border-blue-500/20 rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Overall Reliance Score</p>
            <div className="flex items-baseline gap-2">
              <p className="text-5xl font-bold text-blue-400">{overallReliance.toFixed(0)}%</p>
              <p className="text-slate-400 text-sm">of batch ready to post</p>
            </div>
          </div>

          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Straight-Through</p>
            <p className="text-4xl font-bold text-green-400">{verdictCounts.POST}</p>
            <p className="text-sm text-slate-400 mt-1">invoices, ${straightThroughAmount.toFixed(0)}</p>
          </div>

          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Needs Attention</p>
            <p className="text-4xl font-bold text-orange-400">{verdictCounts.HOLD + verdictCounts.ESCALATE}</p>
            <p className="text-sm text-slate-400 mt-1">invoices, ${holdAmount.toFixed(0)}</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-700/50 grid grid-cols-3 gap-4 text-center">
          <div>
            <Clock className="w-5 h-5 text-slate-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{estimatedReviewTime}</p>
            <p className="text-xs text-slate-400">min to resolve</p>
          </div>
          <div>
            <DollarSign className="w-5 h-5 text-slate-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">${totalAmount.toFixed(0)}</p>
            <p className="text-xs text-slate-400">batch total</p>
          </div>
          <div>
            <TrendingUp className="w-5 h-5 text-slate-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">↑ 8%</p>
            <p className="text-xs text-slate-400">vs last month</p>
          </div>
        </div>
      </div>

      {/* Verdict Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distribution Chart */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Verdict Distribution</h3>
          <div className="space-y-4">
            {/* POST */}
            <div>
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-white">POST</span>
                </div>
                <span className="text-sm font-semibold text-green-400">{verdictCounts.POST}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(verdictCounts.POST / invoices.length) * 100}%` }}
                />
              </div>
            </div>

            {/* POST WITH REVIEW */}
            <div>
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-white">Post w/ Review</span>
                </div>
                <span className="text-sm font-semibold text-yellow-400">{verdictCounts.POST_WITH_REVIEW}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${(verdictCounts.POST_WITH_REVIEW / invoices.length) * 100}%` }}
                />
              </div>
            </div>

            {/* HOLD */}
            <div>
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-white">Hold for Review</span>
                </div>
                <span className="text-sm font-semibold text-orange-400">{verdictCounts.HOLD}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full"
                  style={{ width: `${(verdictCounts.HOLD / invoices.length) * 100}%` }}
                />
              </div>
            </div>

            {/* ESCALATE */}
            <div>
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-white">Escalate</span>
                </div>
                <span className="text-sm font-semibold text-red-400">{verdictCounts.ESCALATE}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${(verdictCounts.ESCALATE / invoices.length) * 100}%` }}
                />
              </div>
            </div>

            {/* REJECT */}
            {verdictCounts.REJECT > 0 && (
              <div>
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-700" />
                    <span className="text-sm font-medium text-white">Reject</span>
                  </div>
                  <span className="text-sm font-semibold text-red-600">{verdictCounts.REJECT}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-red-700 h-2 rounded-full"
                    style={{ width: `${(verdictCounts.REJECT / invoices.length) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Next Steps</h3>
          <div className="space-y-3">
            {verdictCounts.ESCALATE > 0 && (
              <button
                onClick={() => onSelectInvoice(verdictResults.findIndex((v) => v.verdict === 'ESCALATE'))}
                className="w-full text-left px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors"
              >
                <p className="text-sm font-semibold text-red-400">{verdictCounts.ESCALATE} invoices need judgment</p>
                <p className="text-xs text-slate-400 mt-1">Review escalation reasons and assign to controller</p>
              </button>
            )}

            {verdictCounts.HOLD > 0 && (
              <button
                onClick={() => onSelectInvoice(verdictResults.findIndex((v) => v.verdict === 'HOLD'))}
                className="w-full text-left px-4 py-3 bg-orange-500/10 border border-orange-500/20 rounded-lg hover:bg-orange-500/20 transition-colors"
              >
                <p className="text-sm font-semibold text-orange-400">{verdictCounts.HOLD} invoices on hold</p>
                <p className="text-xs text-slate-400 mt-1">Verify issues, then route or post</p>
              </button>
            )}

            {verdictCounts.POST_WITH_REVIEW > 0 && (
              <button
                onClick={() => onSelectInvoice(verdictResults.findIndex((v) => v.verdict === 'POST_WITH_REVIEW'))}
                className="w-full text-left px-4 py-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg hover:bg-yellow-500/20 transition-colors"
              >
                <p className="text-sm font-semibold text-yellow-400">{verdictCounts.POST_WITH_REVIEW} flagged for review</p>
                <p className="text-xs text-slate-400 mt-1">Quick check, then post if OK</p>
              </button>
            )}

            {verdictCounts.POST > 0 && (
              <button
                onClick={() => onSelectInvoice(verdictResults.findIndex((v) => v.verdict === 'POST'))}
                className="w-full text-left px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-colors"
              >
                <p className="text-sm font-semibold text-green-400">{verdictCounts.POST} ready to post</p>
                <p className="text-xs text-slate-400 mt-1">No review needed, post directly</p>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Invoice List */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        <div className="bg-slate-700/50 px-6 py-4 border-b border-slate-700">
          <h3 className="font-semibold text-white">All Invoices</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/50">
                <th className="text-left px-6 py-3 font-semibold text-slate-300">Invoice</th>
                <th className="text-left px-6 py-3 font-semibold text-slate-300">Vendor</th>
                <th className="text-right px-6 py-3 font-semibold text-slate-300">Amount</th>
                <th className="text-left px-6 py-3 font-semibold text-slate-300">Verdict</th>
                <th className="text-center px-6 py-3 font-semibold text-slate-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.slice(0, 10).map((invoice, idx) => {
                const verdict = verdictResults[idx];
                const verdictColor = {
                  POST: 'text-green-400 bg-green-500/10',
                  POST_WITH_REVIEW: 'text-yellow-400 bg-yellow-500/10',
                  HOLD: 'text-orange-400 bg-orange-500/10',
                  ESCALATE: 'text-red-400 bg-red-500/10',
                  REJECT: 'text-red-600 bg-red-500/20',
                };
                return (
                  <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-3">
                      <p className="font-medium text-white">{invoice.invoiceNumber}</p>
                    </td>
                    <td className="px-6 py-3 text-slate-300">{invoice.vendorName}</td>
                    <td className="text-right px-6 py-3 font-semibold text-white">${invoice.amount?.toFixed(2)}</td>
                    <td className="px-6 py-3">
                      <span className={`px-3 py-1 rounded text-xs font-semibold ${verdictColor[verdict.verdict as keyof typeof verdictColor] || 'text-slate-300'}`}>
                        {verdict.verdict.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="text-center px-6 py-3">
                      <button
                        onClick={() => onSelectInvoice(idx)}
                        className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
                      >
                        Review →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
