import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Download,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Info,
} from 'lucide-react'
import { useAnalysis } from '../hooks/useAnalysis'
import { Badge } from '../components/common/Badge'
import Button from '../components/common/Button'

export default function DashboardPage() {
  const { latestAnalysis } = useAnalysis()
  const [filter, setFilter] = useState('ALL')
  const [isExporting, setIsExporting] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState(null)

  // Parse backend data response structures
  const dashboardData = latestAnalysis?.dashboard || latestAnalysis || {}
  const policy = dashboardData?.policy || latestAnalysis?.upload || {}
  const rawAnalysis = dashboardData?.analysis || latestAnalysis?.analyze || {}
  const analysis = rawAnalysis?.analysis ? { ...rawAnalysis, ...rawAnalysis.analysis } : rawAnalysis

  const companyName = latestAnalysis?.companyName || 'Organization'
  const fileName = policy?.fileName || 'Uploaded Policy PDF'
  const pageCount = policy?.pageCount || 1

  const isRelevantDocument = analysis?.isRelevantDocument !== false
  const documentType = analysis?.documentType || 'Unknown Document'

  const overallScore = analysis?.overallScore ?? 0
  const coveredCount = analysis?.coveredCount ?? 0
  const partialCount = analysis?.partialCount ?? 0
  const missingCount = analysis?.missingCount ?? 0
  const categories = analysis?.categories || []
  const topGaps = analysis?.topGaps || []

  const filteredCategories = categories.filter((cat) => {
    const status = (cat.status || '').toLowerCase()
    if (filter === 'ALL') return true
    if (filter === 'COVERED') return status === 'covered'
    if (filter === 'PARTIAL') return status === 'partial'
    if (filter === 'MISSING') return status === 'missing'
    return true
  })

  const handleExportReport = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      alert(`ISO Audit Readiness Report for ${fileName} exported successfully!`)
    }, 1000)
  }

  const toggleExpand = (catId) => {
    setExpandedCategory(expandedCategory === catId ? null : catId)
  }

  return (
    <div className="min-h-screen bg-background text-white font-serif py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/50">
          <div>
            <div className="flex items-center gap-2 text-xs text-accent font-semibold mb-1">
              <Shield className="w-4 h-4" />
              <span>{companyName} — ISO 27001 Policy Analysis</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <span>{fileName}</span>
              <span className="text-xs bg-surface border border-border px-2.5 py-1 rounded text-muted font-normal">
                {pageCount} Page{pageCount !== 1 ? 's' : ''}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/analysis">
              <Button variant="outline" size="sm">
                Upload New Policy
              </Button>
            </Link>

            <Button
              variant="primary"
              size="sm"
              isLoading={isExporting}
              onClick={handleExportReport}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Audit Report</span>
            </Button>
          </div>
        </div>

        {/* Non-Relevant Document Warning */}
        {!isRelevantDocument && (
          <div className="bg-rose-500/10 border-2 border-rose-500/40 rounded-xl p-6 shadow-xl space-y-3">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <h2 className="text-lg font-bold text-white">Document Not Relevant for ISO Policy Analysis</h2>
            </div>
            <p className="text-rose-200 text-sm leading-relaxed">
              The uploaded file <span className="font-semibold text-white">"{fileName}"</span> does not appear to be a valid organizational or information security policy. Detected document type: <span className="font-semibold text-rose-300">"{documentType}"</span>.
            </p>
            <p className="text-muted text-xs">
              Please upload a valid Information Security Policy, Access Control Policy, Asset Management Policy, Incident Response Policy, or Risk Management Policy.
            </p>
          </div>
        )}

        {/* Stat Cards Overview */}
        {isRelevantDocument && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Card 1: Readiness Score */}
            <div className="bg-surface border border-border rounded-xl p-5 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-muted text-xs font-semibold uppercase tracking-wider">
                  Overall Readiness
                </span>
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-white">{overallScore}%</span>
                <span className={`text-xs font-semibold ${overallScore >= 70 ? 'text-emerald-400' : overallScore >= 40 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {overallScore >= 70 ? 'High Coverage' : overallScore >= 40 ? 'Moderate Gaps' : 'High Priority'}
                </span>
              </div>
              <div className="w-full bg-background rounded-full h-2 mt-3 overflow-hidden border border-border/40">
                <div
                  className="bg-accent h-full rounded-full transition-all duration-500"
                  style={{ width: `${overallScore}%` }}
                ></div>
              </div>
            </div>

            {/* Card 2: Covered Categories */}
            <div className="bg-surface border border-border rounded-xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-muted text-xs font-semibold uppercase tracking-wider">
                  Covered Categories
                </span>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-3xl font-extrabold text-white block mb-1">
                {coveredCount}
              </span>
              <span className="text-emerald-400 text-xs font-medium">Fully Satisfied</span>
            </div>

            {/* Card 3: Partial Categories */}
            <div className="bg-surface border border-border rounded-xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-muted text-xs font-semibold uppercase tracking-wider">
                  Partial Categories
                </span>
                <HelpCircle className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-3xl font-extrabold text-white block mb-1">
                {partialCount}
              </span>
              <span className="text-amber-400 text-xs font-medium">Incomplete details</span>
            </div>

            {/* Card 4: Missing Categories */}
            <div className="bg-surface border border-border rounded-xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-muted text-xs font-semibold uppercase tracking-wider">
                  Missing Categories
                </span>
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
              <span className="text-3xl font-extrabold text-white block mb-1">
                {missingCount}
              </span>
              <span className="text-rose-400 text-xs font-medium">Requires Policy Addition</span>
            </div>

          </div>
        )}

        {/* Category Breakdown & Detailed Results */}
        {isRelevantDocument && categories.length > 0 && (
          <div className="bg-surface border border-border rounded-xl p-6 shadow-xl space-y-6 text-left">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
              <div>
                <h2 className="text-xl font-bold text-white">ISO 27001 Control Category Results</h2>
                <p className="text-muted text-xs mt-0.5">Click any category to inspect evidence, gap analysis, and recommendations</p>
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-2 bg-background p-1 rounded-lg border border-border/60 text-xs">
                {['ALL', 'COVERED', 'PARTIAL', 'MISSING'].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
                      filter === f
                        ? 'bg-accent text-white shadow'
                        : 'text-muted hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Cards List */}
            <div className="space-y-4">
              {filteredCategories.map((cat, idx) => {
                const catId = cat.categoryId || idx
                const isExpanded = expandedCategory === catId
                const status = (cat.status || 'missing').toLowerCase()

                return (
                  <div
                    key={catId}
                    className="bg-background/60 border border-border/60 rounded-xl overflow-hidden transition"
                  >
                    <div
                      onClick={() => toggleExpand(catId)}
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-surface/50 transition"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-white text-base font-bold">{cat.category || cat.categoryId}</span>
                          {cat.humanReviewRequired && (
                            <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] px-2 py-0.5 rounded font-medium flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              <span>Human Review Flagged</span>
                            </span>
                          )}
                        </div>

                        {cat.confidence !== undefined && (
                          <span className="text-muted text-xs block">
                            Confidence: <span className="text-white font-mono">{Math.round((cat.confidence || 0) * 100)}%</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        <Badge variant={status}>
                          {status.toUpperCase()}
                        </Badge>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-muted" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted" />
                        )}
                      </div>
                    </div>

                    {/* Detailed Dropdown Content */}
                    {isExpanded && (
                      <div className="p-5 border-t border-border/40 bg-surface/40 space-y-4 text-xs">
                        
                        {/* Evidence List */}
                        <div>
                          <h4 className="font-semibold text-accent uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5" />
                            <span>Policy Evidence Found</span>
                          </h4>
                          {cat.evidence && cat.evidence.length > 0 ? (
                            <ul className="list-disc list-inside space-y-1 text-white/90 bg-background/50 p-3 rounded-lg border border-border/40">
                              {cat.evidence.map((ev, evIdx) => (
                                <li key={evIdx} className="leading-relaxed">{ev}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-muted italic bg-background/50 p-3 rounded-lg border border-border/40">
                              No explicit policy evidence identified in document for this category.
                            </p>
                          )}
                        </div>

                        {/* Gap Description */}
                        {cat.gap && (
                          <div>
                            <h4 className="font-semibold text-rose-400 uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              <span>Identified Gap</span>
                            </h4>
                            <p className="text-rose-200 bg-rose-500/10 p-3 rounded-lg border border-rose-500/20 leading-relaxed">
                              {cat.gap}
                            </p>
                          </div>
                        )}

                        {/* Recommendation */}
                        {cat.recommendation && (
                          <div>
                            <h4 className="font-semibold text-emerald-400 uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1.5">
                              <Info className="w-3.5 h-3.5" />
                              <span>Remediation Recommendation</span>
                            </h4>
                            <p className="text-emerald-200 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20 leading-relaxed">
                              {cat.recommendation}
                            </p>
                          </div>
                        )}

                      </div>
                    )}
                  </div>
                )
              })}
            </div>

          </div>
        )}

        {/* Top Gaps Summary */}
        {isRelevantDocument && topGaps.length > 0 && (
          <div className="bg-surface border border-border rounded-xl p-6 shadow-xl space-y-6 text-left">
            <div className="pb-4 border-b border-border/60">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <span>Top Identified Compliance Gaps</span>
              </h2>
              <p className="text-muted text-xs mt-0.5">Key missing or incomplete ISO 27001 requirements ranked by urgency</p>
            </div>

            <div className="space-y-4">
              {topGaps.map((gapItem, gapIdx) => (
                <div
                  key={gapIdx}
                  className="bg-background/60 border border-border/60 rounded-xl p-5 space-y-2 hover:border-rose-500/40 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-base">{gapItem.category || gapItem.categoryId}</span>
                    <Badge variant={(gapItem.status || 'missing').toLowerCase()}>
                      {(gapItem.status || 'MISSING').toUpperCase()}
                    </Badge>
                  </div>
                  {gapItem.gap && (
                    <p className="text-muted text-xs leading-relaxed">{gapItem.gap}</p>
                  )}
                  {gapItem.recommendation && (
                    <p className="text-emerald-400 text-xs font-medium">Recommendation: {gapItem.recommendation}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

