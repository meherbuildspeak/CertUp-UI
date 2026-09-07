import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Shield, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50 px-4 sm:px-8 py-4 flex items-center justify-between transition-all">
        
        {/* Left Side: Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-white font-bold text-lg md:text-xl tracking-wide hover:opacity-90 transition"
        >
          <div className="p-1.5 rounded-lg bg-accent/10 border border-accent/20">
            <Shield className="w-5 h-5 text-accent" />
          </div>
          <span>CertUp</span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="flex items-center gap-6 sm:gap-8 text-sm font-medium">
          <Link
            to="/"
            className={`transition duration-200 ${
              isActive('/') ? 'text-white font-semibold' : 'text-muted hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link
            to="/demo"
            className={`transition duration-200 ${
              isActive('/demo') ? 'text-white font-semibold' : 'text-muted hover:text-white'
            }`}
          >
            How it Works
          </Link>
          <Link
            to="/analysis"
            className={`transition duration-200 ${
              isActive('/analysis') ? 'text-white font-semibold' : 'text-muted hover:text-white'
            }`}
          >
            Free Policy Analysis
          </Link>

        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg border border-border text-muted hover:text-white cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] z-30 bg-surface/95 backdrop-blur-lg border-b border-border p-6 flex flex-col space-y-4 animate-in slide-in-from-top duration-200">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`text-base font-medium py-2 ${
              isActive('/') ? 'text-accent font-semibold' : 'text-white'
            }`}
          >
            Home
          </Link>
          <Link
            to="/demo"
            onClick={() => setMobileMenuOpen(false)}
            className={`text-base font-medium py-2 ${
              isActive('/demo') ? 'text-accent font-semibold' : 'text-white'
            }`}
          >
            How it Works
          </Link>
          <Link
            to="/analysis"
            onClick={() => setMobileMenuOpen(false)}
            className={`text-base font-medium py-2 ${
              isActive('/analysis') ? 'text-accent font-semibold' : 'text-white'
            }`}
          >
            Free Policy Analysis
          </Link>

        </div>
      )}
    </>
  )
}
