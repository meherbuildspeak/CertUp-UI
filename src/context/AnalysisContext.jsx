import { createContext, useState, useEffect } from 'react'
import { analysisService } from '../services/analysisService'

export const AnalysisContext = createContext(null)

export function AnalysisProvider({ children }) {
  const [latestAnalysis, setLatestAnalysis] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const data = await analysisService.getLatestAnalysis()
        setLatestAnalysis(data)
      } catch (err) {
        console.error('Failed to load latest analysis:', err)
      }
    }
    fetchLatest()
  }, [])

  const submitAnalysis = async (formData) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const response = await analysisService.submitAnalysisRequest(formData)
      if (response && response.data) {
        setLatestAnalysis(response.data)
      }
      setIsSubmitting(false)
      return response
    } catch (err) {
      setError(err.message || 'Failed to submit policy analysis request')
      setIsSubmitting(false)
      throw err
    }
  }

  return (
    <AnalysisContext.Provider
      value={{
        latestAnalysis,
        isSubmitting,
        error,
        submitAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  )
}
