import { createContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    const authed = authService.isAuthenticated()
    setUser(currentUser)
    setIsAuthenticated(authed)
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const res = await authService.login(email, password)
    if (res && res.user) {
      setUser(res.user)
      setIsAuthenticated(true)
      setIsLoginModalOpen(false)
    }
    return res
  }

  const signup = async (email, password, companyName) => {
    const res = await authService.signup(email, password, companyName)
    if (res && res.user) {
      setUser(res.user)
      setIsAuthenticated(true)
      setIsLoginModalOpen(false)
    }
    return res
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    setIsAuthenticated(false)
  }

  const openLoginModal = () => setIsLoginModalOpen(true)
  const closeLoginModal = () => setIsLoginModalOpen(false)

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
