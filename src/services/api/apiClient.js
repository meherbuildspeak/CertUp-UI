/**
 * Central API Client Wrapper
 * Handles base URL configuration, request headers, error handling, and mock fallback.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

// Helper to simulate asynchronous network latency during mock mode
export const simulateNetworkDelay = (ms = 600) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

class ApiClient {
  constructor(baseUrl = BASE_URL) {
    this.baseUrl = baseUrl
  }

  getHeaders(customHeaders = {}) {
    const token = localStorage.getItem('certup_auth_token')
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...customHeaders,
    }
  }

  async request(endpoint, options = {}) {
    // In mock mode, log requests and return mock handling flag
    if (USE_MOCK) {
      console.log(`[API MOCK REQUEST] ${options.method || 'GET'} -> ${endpoint}`)
      await simulateNetworkDelay()
    }

    const url = `${this.baseUrl}${endpoint}`
    const config = {
      ...options,
      headers: this.getHeaders(options.headers),
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `API Request failed with status ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      if (USE_MOCK) {
        // Suppress network connection errors when running purely in local mock mode
        return null
      }
      console.error(`[API ERROR] ${options.method || 'GET'} ${url}:`, error)
      throw error
    }
  }

  get(endpoint, headers = {}) {
    return this.request(endpoint, { method: 'GET', headers })
  }

  post(endpoint, body, headers = {}) {
    return this.request(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
  }

  put(endpoint, body, headers = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    })
  }

  delete(endpoint, headers = {}) {
    return this.request(endpoint, { method: 'DELETE', headers })
  }
}

export const apiClient = new ApiClient()
