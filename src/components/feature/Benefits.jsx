import React from 'react'
import { CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react'

export default function Benefits() {
  return (
    <section className="relative py-20 md:py-24 lg:py-28 border-t border-border/50 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mb-4">
            Built for Growing Teams Seeking Clarity
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed max-w-2xl">
            Save weeks of consultant time and focus on building your core product with complete compliance peace of mind.
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-surface border border-border rounded-xl p-8 flex flex-col items-start text-left hover:border-accent/40 transition duration-300">
            <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 mb-6">
              <ShieldCheck className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">100% Policy Transparency</h3>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Know exactly where every policy stands across 14+ ISO Annex control domains with zero ambiguity.
            </p>
            <div className="space-y-2 mt-auto w-full pt-4 border-t border-border/40 text-xs text-muted">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Information Security - Covered</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Incident Response - Covered</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface border border-border rounded-xl p-8 flex flex-col items-start text-left hover:border-accent/40 transition duration-300">
            <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 mb-6">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Audit Preparedness</h3>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Generate executive compliance reports and gap action items ready to share with external auditors.
            </p>
            <div className="space-y-2 mt-auto w-full pt-4 border-t border-border/40 text-xs text-muted">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Automated ISO 27001 mapping</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>PDF exportable gap reports</span>
              </div>
            </div>
          </div>

          {/* Card 3: Metrics Split (Time Saved & Cost Reduction) */}
          <div className="bg-surface border border-border rounded-xl p-8 flex flex-col justify-between text-left hover:border-accent/40 transition duration-300">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Proven Efficiency Gains</h3>
              <p className="text-muted text-sm leading-relaxed mb-8">
                Drastically accelerate your audit prep cycle without hiring expensive external advisory firms.
              </p>
            </div>

            <div className="bg-background/60 border border-border/60 rounded-xl p-5 shadow-inner">
              <div className="grid grid-cols-2 gap-4 divide-x divide-border/60">
                <div className="flex flex-col">
                  <span className="text-muted text-[10px] font-semibold tracking-wider uppercase mb-1">
                    TIME SAVED
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    6 weeks
                  </span>
                </div>

                <div className="flex flex-col pl-4">
                  <span className="text-muted text-[10px] font-semibold tracking-wider uppercase mb-1">
                    COST SAVINGS
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-accent tracking-tight">
                    $15k+
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
