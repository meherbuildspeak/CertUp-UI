import { apiClient, simulateNetworkDelay } from './api/apiClient'

class AuthService {
  async login(email, password) {
    // Try backend API first, fallback to mock user
    const res = await apiClient.post('/auth/login', { email, password })

    if (res && res.token) {
      localStorage.setItem('certup_auth_token', res.token)
      localStorage.setItem('certup_user', JSON.stringify(res.user))
      return res
    }

    // Mock Login Response
    await simulateNetworkDelay(500)
    const mockUser = {
      id: 'usr_101',
      name: email.split('@')[0] || 'User',
      email: email,
      role: 'Compliance Lead',
      company: 'Acme Security Corp',
    }
    const mockToken = 'mock_jwt_token_certup_2026'

    localStorage.setItem('certup_auth_token', mockToken)
    localStorage.setItem('certup_user', JSON.stringify(mockUser))

    return {
      success: true,
      token: mockToken,
      user: mockUser,
    }
  }

  async signup(email, password, companyName = '') {
    const res = await apiClient.post('/auth/signup', { email, password, companyName })

    if (res && res.token) {
      localStorage.setItem('certup_auth_token', res.token)
      localStorage.setItem('certup_user', JSON.stringify(res.user))
      return res
    }

    await simulateNetworkDelay(600)
    const mockUser = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0],
      email: email,
      role: 'Admin',
      company: companyName || 'My Organization',
    }
    const mockToken = 'mock_jwt_token_' + Date.now()

    localStorage.setItem('certup_auth_token', mockToken)
    localStorage.setItem('certup_user', JSON.stringify(mockUser))

    return {
      success: true,
      token: mockToken,
      user: mockUser,
    }
  }

  logout() {
    localStorage.removeItem('certup_auth_token')
    localStorage.removeItem('certup_user')
  }

  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('certup_user')
      return userStr ? JSON.parse(userStr) : null
    } catch {
      return null
    }
  }

  isAuthenticated() {
    return !!localStorage.getItem('certup_auth_token')
  }
}

export const authService = new AuthService()
