import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32 bg-background">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[350px] bg-accent/15 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        
        {/* Top Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-6 shadow-sm">
          <Shield className="w-3.5 h-3.5" />
          <span>AI-Powered ISO Compliance Readiness</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6 max-w-3xl">
          Transform Policy Chaos into <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-accent">Audit Readiness</span>
        </h1>

        {/* Subtitle */}
        <p className="text-muted text-base sm:text-lg leading-relaxed max-w-2xl mb-10 font-serif">
          CertUp scans your existing company documents, maps them against ISO requirements, and generates a prioritized roadmap to compliance in minutes.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            to="/analysis"
            className="w-full sm:w-auto bg-accent hover:bg-purple-600 text-white font-semibold px-8 py-4 rounded-xl transition duration-200 flex items-center justify-center gap-2.5 shadow-lg shadow-accent/25 text-base"
          >
            <span>Start Free Analysis</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            to="/demo"
            className="w-full sm:w-auto border border-accent/40 bg-accent/5 hover:bg-accent/15 text-accent font-semibold px-8 py-4 rounded-xl transition duration-200 flex items-center justify-center text-base"
          >
            See How It Works
          </Link>
        </div>

      </div>
    </section>
  )
}
