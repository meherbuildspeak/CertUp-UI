import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldAlert, ArrowLeft } from 'lucide-react'
import Button from '../components/common/Button'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center p-4 text-center font-serif">
      <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20 mb-6">
        <ShieldAlert className="w-12 h-12 text-accent" />
      </div>
      <h1 className="text-4xl font-extrabold text-white mb-2">404 — Page Not Found</h1>
      <p className="text-muted text-base max-w-md mb-8">
        The compliance page or policy document route you are looking for does not exist or has been moved.
      </p>
      <Link to="/">
        <Button className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to CertUp Home</span>
        </Button>
      </Link>
    </div>
  )
}
