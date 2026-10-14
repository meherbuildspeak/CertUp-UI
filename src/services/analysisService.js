import { apiClient } from './api/apiClient'

class AnalysisService {
  async uploadPolicy(file) {
    const formData = new FormData()
    formData.append('policy', file)
    return await apiClient.postMultipart('/policies/upload', formData)
  }

  async analyzePolicy(policyId) {
    return await apiClient.post(`/policies/${policyId}/analyze`, {})
  }

  async getDashboard(policyId) {
    return await apiClient.get(`/dashboard/${policyId}`)
  }

  async submitAnalysisRequest({ file, companyName }) {
    if (!file) {
      throw new Error('Please select a PDF policy file to upload.')
    }

    // Step 1: Upload PDF
    const uploadRes = await this.uploadPolicy(file)
    if (!uploadRes || !uploadRes.success || !uploadRes.policy?.id) {
      throw new Error(uploadRes?.message || 'Failed to upload policy PDF')
    }

    const policyId = uploadRes.policy.id

    // Step 2: Analyze policy
    const analyzeRes = await this.analyzePolicy(policyId)
    if (!analyzeRes || !analyzeRes.success) {
      throw new Error(analyzeRes?.message || 'Policy analysis failed')
    }

    // Step 3: Fetch Dashboard data
    const dashboardRes = await this.getDashboard(policyId)

    const fullResult = {
      policyId,
      companyName: companyName || 'Organization',
      upload: uploadRes.policy,
      analyze: analyzeRes,
      dashboard: dashboardRes?.success ? dashboardRes : null,
    }

    localStorage.setItem('certup_latest_policy_id', policyId)
    localStorage.setItem('certup_latest_analysis', JSON.stringify(fullResult))

    return {
      success: true,
      data: fullResult,
    }
  }

  async getLatestAnalysis() {
    try {
      const policyId = localStorage.getItem('certup_latest_policy_id')
      if (policyId) {
        const dashboard = await this.getDashboard(policyId)
        if (dashboard && dashboard.success) {
          const stored = localStorage.getItem('certup_latest_analysis')
          const parsed = stored ? JSON.parse(stored) : {}
          return {
            ...parsed,
            policyId,
            dashboard,
          }
        }
      }

      // Try fetching all policies to get the most recent one
      const policiesRes = await apiClient.get('/policies')
      if (policiesRes && policiesRes.success && policiesRes.policies?.length > 0) {
        const latestPolicy = policiesRes.policies[0]
        const dashboard = await this.getDashboard(latestPolicy._id)
        if (dashboard && dashboard.success) {
          return {
            policyId: latestPolicy._id,
            dashboard,
          }
        }
      }
    } catch (err) {
      console.error('Failed to load latest analysis from backend:', err)
    }

    // Fallback if stored in local storage
    try {
      const stored = localStorage.getItem('certup_latest_analysis')
      if (stored) return JSON.parse(stored)
    } catch {
      // return empty state
    }

    return null
  }
}

export const analysisService = new AnalysisService()

