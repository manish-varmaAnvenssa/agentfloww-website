import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import api from '../utils/api'
import { loginUser } from '../utils/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        // For now, we'll check if user data exists in localStorage
        const userData = localStorage.getItem('user')
        if (userData) {
          setUser(JSON.parse(userData))
        }
      }
    } catch (error) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const result = await loginUser({ email, password })
      
      if (result.success) {
        // Create a simple token (you can implement proper JWT later)
        const token = btoa(`${email}:${Date.now()}`)
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(result.user))
        setUser(result.user)
        
        toast.success('Login successful!')
        
        return { success: true }
      } else {
        toast.error(result.error || 'Login failed')
        return { success: false, error: result.error }
      }
    } catch (error) {
      const message = 'Login failed. Please try again.'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    toast.success('Logged out successfully')
    // Let the component handle navigation
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isBlogger: user?.role === 'blogger',
    isNewsroom: user?.role === 'newsroom',
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 