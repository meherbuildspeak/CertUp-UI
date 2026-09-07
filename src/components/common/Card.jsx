import React from 'react'

export function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`bg-surface border border-border rounded-xl p-6 shadow-xl ${
        hover ? 'hover:border-border/80 hover:shadow-2xl transition duration-200 group' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
