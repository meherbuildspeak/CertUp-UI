/**
 * Central API Client Wrapper
 * Handles base URL configuration, request headers, error handling, and mock fallback.
 */

// Normalize Base URL: strip trailing slashes and guarantee /api path suffix
const rawBase = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000/api').trim().replace(/\/+$/, '')
const BASE_URL = rawBase.endsWith('/api') ? rawBase : `${rawBase}/api`
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

// Helper to simulate asynchronous network latency during mock mode
export const simulateNetworkDelay = (ms = 600) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

class ApiClient {
  constructor(baseUrl = BASE_URL) {
    const trimmed = (baseUrl || BASE_URL).trim().replace(/\/+$/, '')
    this.baseUrl = trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`
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

    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
    const url = `${this.baseUrl}${path}`
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

  async postMultipart(endpoint, formData) {
    if (USE_MOCK) {
      console.log(`[API MOCK MULTIPART] POST -> ${endpoint}`)
      await simulateNetworkDelay()
      return null
    }

    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
    const url = `${this.baseUrl}${path}`
    const token = localStorage.getItem('certup_auth_token')
    const headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `API Request failed with status ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`[API ERROR] POST MULTIPART ${url}:`, error)
      throw error
    }
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
