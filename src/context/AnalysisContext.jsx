import { createContext, useState, useEffect } from 'react'
import { analysisService } from '../services/analysisService'

export const AnalysisContext = createContext(null)

export function AnalysisProvider({ children }) {
  const [latestAnalysis, setLatestAnalysis] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const fetchLatest = async () => {
    try {
      const data = await analysisService.getLatestAnalysis()
      if (data) {
        setLatestAnalysis(data)
      }
    } catch (err) {
      console.error('Failed to load latest analysis:', err)
    }
  }

  useEffect(() => {
    fetchLatest()
  }, [])

  const submitAnalysis = async (payload) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const response = await analysisService.submitAnalysisRequest(payload)
      if (response && response.data) {
        setLatestAnalysis(response.data)
      }
      setIsSubmitting(false)
      return response
    } catch (err) {
      const errorMsg = err.message || 'Failed to submit policy analysis request'
      setError(errorMsg)
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
        setError,
        submitAnalysis,
        refreshLatestAnalysis: fetchLatest,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  )
}

