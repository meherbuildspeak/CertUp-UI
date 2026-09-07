import { apiClient, simulateNetworkDelay } from './api/apiClient'
import { mockDashboardStats } from '../data/mockData'

class AnalysisService {
  async submitAnalysisRequest(payload) {
    // Attempt backend API post
    const res = await apiClient.post('/analysis/submit', payload)

    if (res && res.id) {
      return res
    }

    // Mock API Response
    await simulateNetworkDelay(1200)

    const mockResult = {
      id: 'anl_' + Math.random().toString(36).substr(2, 9),
      companyName: payload.companyName,
      companySize: payload.companySize || '10-50 employees',
      industry: payload.industry || 'Technology',
      isoGoal: payload.isoGoal,
      fileCount: payload.files ? payload.files.length : 0,
      createdAt: new Date().toISOString(),
      status: 'COMPLETED',
      results: mockDashboardStats,
    }

    // Store in localStorage for persistence across reloads in demo
    localStorage.setItem('certup_latest_analysis', JSON.stringify(mockResult))

    return {
      success: true,
      data: mockResult,
    }
  }

  async getLatestAnalysis() {
    const res = await apiClient.get('/analysis/latest')
    if (res) return res

    try {
      const stored = localStorage.getItem('certup_latest_analysis')
      if (stored) return JSON.parse(stored)
    } catch {
      // return default mock
    }

    return {
      id: 'anl_default_demo',
      companyName: 'Acme Technologies',
      isoGoal: 'ISO 27001:2022',
      results: mockDashboardStats,
    }
  }
}

export const analysisService = new AnalysisService()
