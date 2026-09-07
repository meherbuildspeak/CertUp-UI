import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24 lg:py-28 border-t border-border/50 bg-background text-center">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[650px] h-[320px] bg-accent/15 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Shield Icon Container */}
        <div className="p-3.5 rounded-2xl bg-accent/10 border border-accent/20 mb-6 shadow-lg shadow-accent/10">
          <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mb-4">
          Ready to Achieve ISO Compliance?
        </h2>

        {/* Subtitle */}
        <p className="text-muted text-base sm:text-lg leading-relaxed max-w-xl mb-8">
          Start your free policy gap analysis today. No credit card required. Results in minutes.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 w-full sm:w-auto">
          <Link
            to="/analysis"
            className="w-full sm:w-auto bg-accent hover:bg-purple-600 text-white font-semibold px-8 py-3.5 rounded-xl transition duration-200 flex items-center justify-center gap-2.5 shadow-lg shadow-accent/25 text-base"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <Link
            to="/demo"
            className="w-full sm:w-auto border border-accent/40 bg-accent/5 hover:bg-accent/15 text-accent font-semibold px-8 py-3.5 rounded-xl transition duration-200 flex items-center justify-center text-base"
          >
            Schedule a Demo
          </Link>
        </div>



      </div>
    </section>
  )
}
