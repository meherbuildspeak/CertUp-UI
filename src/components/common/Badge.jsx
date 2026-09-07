import React from 'react'

export function Badge({ children, variant = 'covered', className = '' }) {
  const variants = {
    covered: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    partial: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    missing: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    purple: 'bg-accent/10 text-accent border-accent/20',
    high: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    low: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  }

  return (
    <span
      className={`inline-flex items-center border px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${
        variants[variant] || variants.purple
      } ${className}`}
    >
      {children}
    </span>
  )
}
