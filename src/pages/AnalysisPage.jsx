import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Lock, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react'
import Input from '../components/common/Input'
import TextArea from '../components/common/TextArea'
import FileUploadZone from '../components/common/FileUploadZone'
import Button from '../components/common/Button'
import { useAnalysis } from '../hooks/useAnalysis'

export default function AnalysisPage() {
  const navigate = useNavigate()
  const { submitAnalysis, isSubmitting } = useAnalysis()

  const [companyName, setCompanyName] = useState('')
  const [companySize, setCompanySize] = useState('')
  const [industry, setIndustry] = useState('')
  const [isoGoal, setIsoGoal] = useState('')
  const [files, setFiles] = useState([])

  const [formErrors, setFormErrors] = useState({})
  const [submittedResult, setSubmittedResult] = useState(null)

  const validate = () => {
    const errors = {}
    if (!companyName.trim()) {
      errors.companyName = 'Company name is required.'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      const result = await submitAnalysis({
        companyName,
        companySize,
        industry,
        isoGoal: 'ISO 27001',
        files,
      })
      setSubmittedResult(result?.data || { companyName })
    } catch (err) {
      console.error('Submission failed:', err)
    }
  }

  return (
    <div className="min-h-screen bg-background text-white font-serif">
      
      {/* Top Back Navigation Bar */}
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

      {/* Page Hero Section */}
      <section className="py-12 md:py-16 px-4 text-center max-w-4xl mx-auto flex flex-col items-center">
        <div className="p-3 rounded-2xl bg-accent/10 border border-accent/20 mb-5 shadow-lg shadow-accent/10">
          <Shield className="w-8 h-8 text-accent" />
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Start Your Free ISO Analysis
        </h1>

        <p className="text-muted text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
          Share your company details and policy documents. Our AI engine will analyze them against ISO standards and deliver a comprehensive gap analysis.
        </p>


      </section>

      {/* Main Analysis Form Card */}
      <main className="max-w-2xl mx-auto px-4 pb-20">
        <div className="bg-surface border border-border rounded-xl p-6 sm:p-8 shadow-2xl">
          
          {submittedResult ? (
            <div className="text-center py-12 space-y-6 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent text-accent flex items-center justify-center mx-auto shadow-lg shadow-accent/20">
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Analysis Request Submitted!
                </h2>
                <p className="text-muted text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{companyName}</span>. Our AI analysis engine has processed your documents and generated your customized readiness profile.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="w-full sm:w-auto flex items-center gap-2"
                >
                  <span>View Compliance Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmittedResult(null)
                    setCompanyName('')
                    setCompanySize('')
                    setIndustry('')
                    setIsoGoal('')
                    setFiles([])
                  }}
                  className="w-full sm:w-auto"
                >
                  Submit Another Request
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              
              {/* Section 1: Company Information */}
              <div>
                <h2 className="text-white font-bold text-xl mb-6">
                  Company Information
                </h2>

                <div className="space-y-4">
                  <Input
                    label="Company Name"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter your company name"
                    error={formErrors.companyName}
                  />

                  <Input
                    label="Company Size"
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                    placeholder="e.g., 10-50 employees"
                  />

                  <Input
                    label="Industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g., Technology, Healthcare, Finance"
                  />
                </div>
              </div>



              {/* Section 3: Policy Documents */}
              <div className="pt-4 border-t border-border/40">
                <h2 className="text-white font-bold text-xl mb-4">
                  Policy Documents
                </h2>

                <FileUploadZone files={files} onFilesChange={setFiles} />
              </div>

              {/* Form Actions */}
              <div className="pt-4">
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  fullWidth
                  size="lg"
                >
                  Start Free Analysis
                </Button>
                
                <p className="text-muted text-xs text-center mt-4 leading-relaxed">
                  By submitting, you agree to our secure data handling practices. Your documents are encrypted and processed privately.
                </p>
              </div>

            </form>
          )}

        </div>
      </main>

    </div>
  )
}
