import React from 'react'
import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background text-muted text-sm py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-border/40">
          
          {/* Brand & Description (2 Cols) */}
          <div className="md:col-span-2 flex flex-col items-start text-left">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="p-1.5 rounded-lg bg-accent/10 border border-accent/20">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xl font-bold text-white tracking-wide">
                CertUp
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-sm">
              AI-powered policy analysis and ISO compliance readiness. Transform policy chaos into audit readiness with clarity and confidence.
            </p>
          </div>

          {/* Product Links */}
          <div className="flex flex-col items-start text-left space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-1">
              Product
            </h4>
            <Link to="/#features" className="hover:text-white transition duration-200">
              Features
            </Link>
            <Link to="/analysis" className="hover:text-white transition duration-200">
              Policy Analysis
            </Link>
            <Link to="/demo" className="hover:text-white transition duration-200">
              How It Works
            </Link>

          </div>

          {/* Frameworks Links */}
          <div className="flex flex-col items-start text-left space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-1">
              Frameworks
            </h4>
            <a href="#iso-27001" className="hover:text-white transition duration-200">
              ISO 27001
            </a>
          </div>

          {/* Company Links */}
          <div className="flex flex-col items-start text-left space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-1">
              Company
            </h4>
            <a href="#about" className="hover:text-white transition duration-200">
              About Us
            </a>
            <a href="#contact" className="hover:text-white transition duration-200">
              Contact
            </a>
            <a href="#privacy" className="hover:text-white transition duration-200">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white transition duration-200">
              Terms of Service
            </a>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} CertUp. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition duration-200">
              Privacy
            </a>
            <a href="#terms" className="hover:text-white transition duration-200">
              Terms
            </a>
            <a href="#security" className="hover:text-white transition duration-200">
              Security
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
