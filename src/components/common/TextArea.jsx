import React from 'react'

export default function TextArea({
  label,
  error,
  hint,
  id,
  rows = 4,
  className = '',
  required = false,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="w-full text-left">
      {label && (
        <label htmlFor={inputId} className="block text-white text-sm font-semibold mb-2">
          {label} {required && <span className="text-accent">*</span>}
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        required={required}
        className={`w-full bg-background border ${
          error ? 'border-rose-500' : 'border-border'
        } rounded-lg px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-accent transition duration-200 text-sm resize-y ${className}`}
        {...props}
      />
      {error && <p className="text-rose-400 text-xs mt-1 font-medium">{error}</p>}
      {hint && !error && <p className="text-muted text-xs mt-1.5">{hint}</p>}
    </div>
  )
}
