import { TrendingUp, AlertCircle, CheckCircle, Download } from 'lucide-react';
import { useMetrics } from '../hooks/useMetrics';

interface ImprovementDashboardProps {
  verdictResults: any[];
  invoices: any[];
  verdictRules: any[];
}

export function ImprovementDashboard({ verdictResults, invoices, verdictRules }: ImprovementDashboardProps) {
  const { analysis, isLoading, error, downloadMetrics, getSummary } = useMetrics();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-4"></div>
          <p className="text-slate-400">Loading metrics...</p>
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
        <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
        <p className="text-red-400">Failed to load metrics: {error?.message || 'Unknown error'}</p>
      </div>
    );
  }

  // Calculate accuracy metrics
  const verdictCounts = {
    POST: verdictResults.filter((v) => v.verdict === 'POST').length,
    POST_WITH_REVIEW: verdictResults.filter((v) => v.verdict === 'POST_WITH_REVIEW').length,
    HOLD: verdictResults.filter((v) => v.verdict === 'HOLD').length,
    ESCALATE: verdictResults.filter((v) => v.verdict === 'ESCALATE').length,
    REJECT: verdictResults.filter((v) => v.verdict === 'REJECT').length,
  };

  const current = analysis.currentMonth;
  const falsePositiveRate = current.falsePositiveRate.toFixed(1);
  const falseNegativeRate = current.falseNegativeRate.toFixed(1);
  const straightThroughRate = current.straightThroughRate.toFixed(1);

  // Calculate improvement trends
  const previousMonth = analysis.previousMonth;
  const strTrend = previousMonth ? ((current.straightThroughRate - previousMonth.straightThroughRate) * 100).toFixed(1) : '0';
  const fpTrend = previousMonth ? ((previousMonth.falsePositiveRate - current.falsePositiveRate) * 100).toFixed(1) : '0';
  const fnTrend = previousMonth ? ((previousMonth.falseNegativeRate - current.falseNegativeRate) * 100).toFixed(1) : '0';

  // Get check category distribution from current metrics
  const checkCategoryAccuracy = current.checkCategoryAccuracy;
  const checkCategories: Record<string, { passRate: number; passed: number; failed: number }> = {};
  checkCategoryAccuracy.forEach((cat) => {
    checkCategories[cat.category] = {
      passRate: cat.passRate,
      passed: cat.checksPass,
      failed: cat.checksFail,
    };
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Improvement Tracking & R&D</h2>
        <p className="text-slate-400">
          How accurate is AOA? What's getting better? What needs work? This dashboard tracks the system's performance over time.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">Straight-Through Rate</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-green-400">{straightThroughRate}%</p>
            <p className={`text-sm ${Number(strTrend) >= 0 ? 'text-green-400/70' : 'text-red-400/70'}`}>
              {Number(strTrend) >= 0 ? '↑' : '↓'} {Number(strTrend) >= 0 ? '+' : ''}{strTrend}%
            </p>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {verdictCounts.POST} of {verdictResults.length} invoices posted without review
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">False Positive Rate</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-orange-400">{falsePositiveRate}%</p>
            <p className={`text-sm ${Number(fpTrend) >= 0 ? 'text-green-400/70' : 'text-red-400/70'}`}>
              {Number(fpTrend) >= 0 ? '↓' : '↑'} {Number(fpTrend) >= 0 ? '-' : '+'}
              {Math.abs(Number(fpTrend)).toFixed(1)}%
            </p>
          </div>
          <p className="text-xs text-slate-400 mt-2">Items flagged but were actually OK</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">False Negative Rate</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-red-400">{falseNegativeRate}%</p>
            <p className={`text-sm ${Number(fnTrend) >= 0 ? 'text-green-400/70' : 'text-red-400/70'}`}>
              {Number(fnTrend) >= 0 ? '↓' : '↑'} {Number(fnTrend) >= 0 ? '-' : '+'}
              {Math.abs(Number(fnTrend)).toFixed(1)}%
            </p>
          </div>
          <p className="text-xs text-slate-400 mt-2">Issues we missed that posted anyway</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">Check Accuracy</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-blue-400">
              {(checkCategoryAccuracy.reduce((sum, c) => sum + c.passRate, 0) / checkCategoryAccuracy.length).toFixed(1)}%
            </p>
            <p className="text-sm text-blue-400/70">avg across all checks</p>
          </div>
          <p className="text-xs text-slate-400 mt-2">Average pass rate across {checkCategoryAccuracy.length} check categories</p>
        </div>
      </div>

      {/* Verdict Accuracy */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Verdict Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div>
            <p className="text-sm font-medium text-green-400 mb-2">POST</p>
            <p className="text-2xl font-bold text-white">{verdictCounts.POST}</p>
            <p className="text-xs text-slate-400 mt-1">invoices</p>
          </div>
          <div>
            <p className="text-sm font-medium text-yellow-400 mb-2">POST w/ Review</p>
            <p className="text-2xl font-bold text-white">{verdictCounts.POST_WITH_REVIEW}</p>
            <p className="text-xs text-slate-400 mt-1">invoices</p>
          </div>
          <div>
            <p className="text-sm font-medium text-orange-400 mb-2">HOLD</p>
            <p className="text-2xl font-bold text-white">{verdictCounts.HOLD}</p>
            <p className="text-xs text-slate-400 mt-1">invoices</p>
          </div>
          <div>
            <p className="text-sm font-medium text-red-400 mb-2">ESCALATE</p>
            <p className="text-2xl font-bold text-white">{verdictCounts.ESCALATE}</p>
            <p className="text-xs text-slate-400 mt-1">invoices</p>
          </div>
          <div>
            <p className="text-sm font-medium text-red-600 mb-2">REJECT</p>
            <p className="text-2xl font-bold text-white">{verdictCounts.REJECT}</p>
            <p className="text-xs text-slate-400 mt-1">invoices</p>
          </div>
        </div>
      </div>

      {/* Check Category Performance */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Check Category Performance</h3>
        <div className="space-y-6">
          {Object.entries(checkCategories)
            .sort((a, b) => b[1].failed - a[1].failed)
            .map(([category, stats]) => {
              const passRate = stats.passRate.toFixed(0);
              return (
                <div key={category}>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm font-medium text-white">{category}</p>
                    <span className={`text-sm font-semibold ${Number(passRate) >= 95 ? 'text-green-400' : 'text-orange-400'}`}>
                      {passRate}% pass
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3 flex overflow-hidden">
                    <div
                      className="bg-green-500 h-full"
                      style={{ width: `${passRate}%` }}
                    />
                    {Number(passRate) < 100 && (
                      <div className="bg-orange-500 h-full flex-1" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {stats.passed} passed, {stats.failed} flagged
                  </p>
                </div>
              );
            })}
        </div>
      </div>

      {/* Improvement Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5" />
            Getting Better
          </h3>
          <ul className="space-y-2">
            {analysis.insights.gettingBetter.length > 0 ? (
              analysis.insights.gettingBetter.slice(0, 3).map((insight, i) => (
                <li key={i} className="text-sm text-slate-300">
                  <strong>{insight.checkName}:</strong> {insight.description}
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-400 italic">No improvements detected yet</li>
            )}
          </ul>
        </div>

        <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-400 flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5" />
            Needs Work
          </h3>
          <ul className="space-y-2">
            {analysis.insights.needsWork.length > 0 ? (
              analysis.insights.needsWork.slice(0, 3).map((insight, i) => (
                <li key={i} className="text-sm text-slate-300">
                  <strong>{insight.checkName}:</strong> {insight.description}
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-400 italic">All checks performing well</li>
            )}
          </ul>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          Monthly Improvement Trend
        </h3>
        <div className="space-y-6">
          {/* Straight-Through Rate */}
          {analysis.trends.find((t) => t.metric === 'straightThroughRate') && (
            <div>
              <p className="text-sm font-medium text-white mb-2">Straight-Through Rate</p>
              <div className="flex items-end gap-1 h-24">
                {analysis.monthlyHistory.map((month, i) => {
                  const maxValue = 100;
                  const pct = (month.straightThroughRate / maxValue) * 100;
                  return (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-green-500 to-green-600 rounded-t opacity-70 hover:opacity-100 transition-opacity"
                      style={{ height: `${Math.max(5, pct)}%` }}
                      title={`${month.date}: ${month.straightThroughRate.toFixed(1)}%`}
                    />
                  );
                })}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {analysis.monthlyHistory.length > 0
                  ? `${analysis.monthlyHistory[0].date} → ${analysis.monthlyHistory[analysis.monthlyHistory.length - 1].date}: ${analysis.monthlyHistory[0].straightThroughRate.toFixed(0)}% → ${analysis.monthlyHistory[analysis.monthlyHistory.length - 1].straightThroughRate.toFixed(0)}% (↑ ${(analysis.monthlyHistory[analysis.monthlyHistory.length - 1].straightThroughRate - analysis.monthlyHistory[0].straightThroughRate).toFixed(0)} points)`
                  : 'No data'}
              </p>
            </div>
          )}

          {/* False Positive Rate */}
          {analysis.trends.find((t) => t.metric === 'falsePositiveRate') && (
            <div>
              <p className="text-sm font-medium text-white mb-2">False Positive Rate</p>
              <div className="flex items-end gap-1 h-24">
                {analysis.monthlyHistory.map((month, i) => {
                  const maxValue = 10; // scale to fit chart
                  const pct = (month.falsePositiveRate / maxValue) * 100;
                  return (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-red-500 to-red-600 rounded-t opacity-70 hover:opacity-100 transition-opacity"
                      style={{ height: `${Math.max(5, pct)}%` }}
                      title={`${month.date}: ${month.falsePositiveRate.toFixed(2)}%`}
                    />
                  );
                })}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {analysis.monthlyHistory.length > 0
                  ? `${analysis.monthlyHistory[0].date} → ${analysis.monthlyHistory[analysis.monthlyHistory.length - 1].date}: ${analysis.monthlyHistory[0].falsePositiveRate.toFixed(1)}% → ${analysis.monthlyHistory[analysis.monthlyHistory.length - 1].falsePositiveRate.toFixed(1)}% (↓ ${((analysis.monthlyHistory[0].falsePositiveRate - analysis.monthlyHistory[analysis.monthlyHistory.length - 1].falsePositiveRate) / analysis.monthlyHistory[0].falsePositiveRate * 100).toFixed(0)}% reduction)`
                  : 'No data'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Research Roadmap */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Next Research Priorities</h3>
        <div className="space-y-4">
          {analysis.recommendations.length > 0 ? (
            analysis.recommendations.slice(0, 3).map((rec, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div
                    className={`flex items-center justify-center h-8 w-8 rounded-full text-white text-sm font-semibold ${
                      rec.priority === 'high'
                        ? 'bg-red-600'
                        : rec.priority === 'medium'
                          ? 'bg-yellow-600'
                          : 'bg-blue-600'
                    }`}
                  >
                    {idx + 1}
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-white">{rec.title}</p>
                  <p className="text-sm text-slate-400 mt-1">{rec.description}</p>
                  {rec.suggestedExperiment && (
                    <p className="text-sm text-slate-500 mt-2 italic">Experiment: {rec.suggestedExperiment}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-sm">All metrics are performing well!</p>
          )}
        </div>
      </div>

      {/* Feedback to Team */}
      <div className="bg-slate-700/30 border border-slate-700 rounded-lg p-6">
        <div className="text-center mb-4">
          <p className="text-slate-300 mb-4">
            This data is calculated from your current batch and historical performance. After posting these invoices and marking any issues, these metrics will improve automatically.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => downloadMetrics('csv')}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={() => downloadMetrics('json')}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export JSON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
