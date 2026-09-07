import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Download,
  Clock,
  ChevronRight,
} from 'lucide-react'
import { useAnalysis } from '../hooks/useAnalysis'
import { Badge } from '../components/common/Badge'
import Button from '../components/common/Button'

export default function DashboardPage() {
  const { latestAnalysis } = useAnalysis()
  const [filter, setFilter] = useState('ALL')
  const [isExporting, setIsExporting] = useState(false)

  const data = latestAnalysis?.results || {
    overallReadiness: 78,
    targetStandard: 'ISO 27001:2022',
    policiesAnalyzed: 14,
    criticalGaps: 3,
    categories: [],
    actionPlan: [],
  }

  const categories = data.categories || []
  const actionPlan = data.actionPlan || []

  const filteredCategories = categories.filter((cat) => {
    if (filter === 'ALL') return true
    if (filter === 'COVERED') return cat.status === 'Covered'
    if (filter === 'PARTIAL') return cat.status === 'Partial'
    if (filter === 'MISSING') return cat.status === 'Missing'
    return true
  })

  const handleExportReport = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      alert('ISO Audit Readiness Report exported successfully (PDF format mock)!')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background text-white font-serif py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/50">
          <div>
            <div className="flex items-center gap-2 text-xs text-accent font-semibold mb-1">
              <Shield className="w-4 h-4" />
              <span>{latestAnalysis?.companyName || 'Acme Technologies'} — ISO Compliance Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Audit Readiness Overview
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/analysis">
              <Button variant="outline" size="sm">
                New Analysis
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

        {/* 4 Key Stat Cards */}
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
              <span className="text-3xl font-extrabold text-white">{data.overallReadiness}%</span>
              <span className="text-emerald-400 text-xs font-semibold">On Track</span>
            </div>
            <div className="w-full bg-background rounded-full h-2 mt-3 overflow-hidden border border-border/40">
              <div
                className="bg-accent h-full rounded-full transition-all duration-500"
                style={{ width: `${data.overallReadiness}%` }}
              ></div>
            </div>
          </div>

          {/* Card 2: Target Framework */}
          <div className="bg-surface border border-border rounded-xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-muted text-xs font-semibold uppercase tracking-wider">
                Target Standard
              </span>
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <span className="text-xl font-bold text-white block mb-1">
              {data.targetStandard}
            </span>
            <span className="text-muted text-xs">Mapped against 114 controls</span>
          </div>

          {/* Card 3: Policies Analyzed */}
          <div className="bg-surface border border-border rounded-xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-muted text-xs font-semibold uppercase tracking-wider">
                Policies Analyzed
              </span>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-3xl font-extrabold text-white block mb-1">
              {data.policiesAnalyzed}
            </span>
            <span className="text-emerald-400 text-xs font-medium">100% verified</span>
          </div>

          {/* Card 4: Critical Gaps */}
          <div className="bg-surface border border-border rounded-xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-muted text-xs font-semibold uppercase tracking-wider">
                Critical Gaps
              </span>
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            </div>
            <span className="text-3xl font-extrabold text-white block mb-1">
              {data.criticalGaps}
            </span>
            <span className="text-rose-400 text-xs font-medium">Requires immediate drafting</span>
          </div>

        </div>

        {/* Control Domain Coverage Table / Grid */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-xl space-y-6 text-left">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
            <div>
              <h2 className="text-xl font-bold text-white">ISO Annex Control Domain Status</h2>
              <p className="text-muted text-xs mt-0.5">Detailed breakdown of policy compliance across Annex control categories</p>
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

          {/* Domain List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCategories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-background/60 border border-border/60 rounded-lg p-4 flex items-center justify-between hover:border-border transition"
              >
                <div className="space-y-1">
                  <span className="text-white text-sm font-semibold block">{cat.name}</span>
                  <div className="w-32 bg-surface rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        cat.status === 'Covered'
                          ? 'bg-emerald-400'
                          : cat.status === 'Partial'
                          ? 'bg-amber-400'
                          : 'bg-rose-400'
                      }`}
                      style={{ width: `${cat.score}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-white">{cat.score}%</span>
                  <Badge variant={cat.status.toLowerCase()}>{cat.status}</Badge>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Prioritized Action Plan */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-xl space-y-6 text-left">
          <div className="pb-4 border-b border-border/60">
            <h2 className="text-xl font-bold text-white">Prioritized Remediation Action Plan</h2>
            <p className="text-muted text-xs mt-0.5">Ordered by audit compliance impact and risk level</p>
          </div>

          <div className="space-y-4">
            {actionPlan.map((action) => (
              <div
                key={action.id}
                className="bg-background/60 border border-border/60 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-accent/40 transition"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <Badge variant={action.priority.toLowerCase()}>{action.priority} Priority</Badge>
                    <span className="text-muted text-xs font-mono">{action.category}</span>
                  </div>
                  <h3 className="text-white font-bold text-base">{action.title}</h3>
                  <p className="text-muted text-xs">{action.impact}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted font-medium">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>~{action.estimatedHours} hrs</span>
                  </div>
                  <Button variant="secondary" size="sm" className="flex items-center gap-1">
                    <span>Remediate</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
