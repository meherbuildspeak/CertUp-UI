import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, FileText } from 'lucide-react'

function Step1Mockup() {
  return (
    <div className="w-full h-full bg-surface/90 border border-border/80 rounded-xl p-4 sm:p-5 text-left flex flex-col justify-center space-y-3 shadow-inner">
      <div className="flex items-center justify-between border-b border-border/60 pb-2">
        <span className="text-white text-xs font-semibold">Company Details</span>
        <span className="text-accent text-[10px] bg-accent/10 border border-accent/20 px-2 py-0.5 rounded">
          Step 1 of 3
        </span>
      </div>

      <div className="space-y-2 text-xs">
        <div className="bg-background/60 p-2 rounded border border-border/40">
          <span className="text-muted block text-[10px]">Company Name</span>
          <span className="text-white font-medium">Acme Security Systems</span>
        </div>

        <div className="bg-background/60 p-2 rounded border border-border/40">
          <span className="text-muted block text-[10px]">Target Framework</span>
          <span className="text-accent font-semibold">ISO 27001:2022</span>
        </div>
      </div>
    </div>
  )
}

function Step2Mockup() {
  return (
    <div className="w-full h-full bg-surface/90 border border-border/80 rounded-xl p-4 sm:p-5 text-left flex flex-col justify-center space-y-2.5 shadow-inner">
      <div className="flex items-center justify-between border-b border-border/60 pb-2">
        <span className="text-white text-xs font-semibold">Uploaded Policy Vault</span>
        <span className="text-emerald-400 text-[10px] font-mono">3 Files Selected</span>
      </div>

      <div className="space-y-1.5 text-xs">
        <div className="flex items-center justify-between p-2 rounded bg-background/60 border border-border/40">
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-accent" />
            <span className="text-white text-[11px]">Information_Security_Policy.pdf</span>
          </div>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        </div>

        <div className="flex items-center justify-between p-2 rounded bg-background/60 border border-border/40">
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-accent" />
            <span className="text-white text-[11px]">Access_Control_V2.pdf</span>
          </div>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        </div>
      </div>
    </div>
  )
}

function Step3Mockup() {
  return (
    <div className="w-full h-full bg-surface/90 border border-border/80 rounded-xl p-4 sm:p-5 text-left flex flex-col justify-center space-y-3 shadow-inner">
      <div className="bg-background/80 border border-border/60 rounded-lg p-3">
        <div className="flex items-center justify-between mb-1.5 text-xs font-semibold">
          <span className="text-white">Policy Coverage</span>
          <span className="text-accent font-mono">78%</span>
        </div>
        <div className="w-full bg-surface rounded-full h-2 overflow-hidden border border-border/40">
          <div className="bg-accent h-full rounded-full w-[78%]"></div>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between p-2 rounded-lg bg-background/60 border border-border/50 text-xs">
          <span className="text-white/90 font-medium text-[11px]">Information Security</span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded-full font-medium">
            Covered
          </span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-background/60 border border-border/50 text-xs">
          <span className="text-white/90 font-medium text-[11px]">Access Control</span>
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] px-2 py-0.5 rounded-full font-medium">
            Partial
          </span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-background/60 border border-border/50 text-xs">
          <span className="text-white/90 font-medium text-[11px]">Cryptography Policy</span>
          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] px-2 py-0.5 rounded-full font-medium">
            Missing
          </span>
        </div>
      </div>
    </div>
  )
}

export default function DemoPage() {
  const steps = [
    {
      number: '1',
      heading: 'Fill in Your Details',
      paragraph: 'Start by telling us basic information about your organization.',
      bullets: [
        'Enter basic company information (Name, Size, Industry)',
        'Automatic evaluation against ISO 27001 standard',
        'Upload your policy documents for instant scanning',
      ],
      mockup: <Step1Mockup />,
    },
    {
      number: '2',
      heading: 'Upload Your Policy Documents',
      paragraph: 'Drop in your existing policies in PDF format.',
      bullets: [
        'Drag and drop or click to upload multiple files',
        'Supports PDF document format (Max 50MB per file)',
        'Documents are encrypted and processed privately',
      ],
      mockup: <Step2Mockup />,
    },
    {
      number: '3',
      heading: 'Get Your Compliance Dashboard',
      paragraph: 'Within minutes, receive a clear, actionable breakdown of your ISO readiness.',
      bullets: [
        'See coverage status for every policy category',
        'Identify gaps, overlaps, and outdated documents',
        'Get a prioritized action plan ranked by impact',
      ],
      mockup: <Step3Mockup />,
    },
  ]

  return (
    <div className="min-h-screen bg-background text-white font-serif">
      
      {/* Top Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted hover:text-white font-medium text-sm transition duration-200"
          >
            <ArrowLeft className="w-4 h-4 text-accent" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
      <div className="border-b border-border/50"></div>

      {/* Header Section */}
      <section className="py-12 md:py-16 px-4 text-center max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          See How CertUp Works
        </h1>

        <p className="text-muted text-base sm:text-lg leading-relaxed max-w-2xl">
          Follow this step-by-step guide to understand exactly how CertUp takes you from scattered policies to ISO compliance readiness.
        </p>
      </section>

      {/* Steps Sequence */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28 mb-24">
        {steps.map((step, index) => {
          const isEven = index % 2 === 1

          return (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            >
              {/* Text Side */}
              <div
                className={`flex flex-col items-start text-left ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-accent text-white font-extrabold flex items-center justify-center text-base mb-4 shadow-lg shadow-accent/25">
                  {step.number}
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
                  {step.heading}
                </h2>

                <p className="text-muted text-base mb-6 leading-relaxed">
                  {step.paragraph}
                </p>

                <div className="space-y-3 w-full">
                  {step.bullets.map((bullet, bulletIdx) => (
                    <div key={bulletIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-white/90 text-sm font-medium">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Mockup Side */}
              <div
                className={`w-full ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="bg-surface border border-border rounded-xl p-3 sm:p-4 aspect-video flex flex-col items-center justify-center relative overflow-hidden shadow-2xl group">
                  {step.mockup}
                </div>
              </div>
            </div>
          )
        })}
      </main>

      {/* Bottom CTA Block */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-surface border border-border rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-accent/15 blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
              Ready to Try It Yourself?
            </h2>
            <p className="text-muted text-base max-w-xl mx-auto mb-6 leading-relaxed">
              Get started with your free policy gap analysis today in just a few minutes.
            </p>
            <Link
              to="/analysis"
              className="inline-flex items-center gap-2.5 bg-accent hover:bg-purple-600 text-white font-semibold px-8 py-3.5 rounded-xl transition duration-200 shadow-lg shadow-accent/25 text-base"
            >
              <span>Start Free Analysis</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
