import React, { useState } from 'react'
import { Shield, X } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

export default function LoginModal({ isOpen, onClose }) {
  const { login, signup } = useAuth()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleClose = () => {
    setMode('login')
    setEmail('')
    setPassword('')
    setCompanyName('')
    setError('')
    onClose()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        await signup(email, password, companyName)
      }
      handleClose()
    } catch (err) {
      setError(err.message || 'Authentication failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={handleClose}
    >
      {/* Modal Card */}
      <div
        className="bg-surface border border-border rounded-xl p-8 max-w-md w-full relative shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted hover:text-white p-1.5 rounded-lg hover:bg-background/60 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="p-3 rounded-2xl bg-accent/10 border border-accent/20 mb-4">
            <Shield className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight mb-1">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-muted text-sm max-w-xs">
            {mode === 'login'
              ? 'Log in to access your compliance dashboard'
              : 'Sign up to get started with CertUp'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Company Name
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Acme Corp"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-accent transition text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-accent transition text-sm"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-accent transition text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent hover:bg-purple-600 text-white font-semibold py-3.5 rounded-xl transition shadow-lg shadow-accent/25 cursor-pointer mt-2 text-base disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        {/* Modal Footer Link */}
        <div className="mt-6 text-center text-xs text-muted">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-accent hover:underline font-semibold bg-transparent border-none p-0 cursor-pointer"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-accent hover:underline font-semibold bg-transparent border-none p-0 cursor-pointer"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
