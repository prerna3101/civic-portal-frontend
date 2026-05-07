import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { loginUser } from '../services/authService.js'
import { getToken, removeToken, setToken } from '../utils/auth.js'
import { decodeJwt } from '../utils/jwtDecode.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('civic_dark_mode') === 'true'
  )

  // Restore session on refresh
  useEffect(() => {

    const token = getToken()

    if (token) {

      try {

        const payload = decodeJwt(token)

        setUser({
          username: payload.sub || payload.username,
          role: payload.role,
          token,
        })

      } catch (error) {

        console.error('Invalid token:', error)

        removeToken()
        setUser(null)
      }
    }

    setLoading(false)

  }, [])

  // Dark mode handling
  useEffect(() => {

    document.documentElement.classList.toggle('dark', darkMode)

    localStorage.setItem(
      'civic_dark_mode',
      String(darkMode)
    )

  }, [darkMode])

  // LOGIN
  const login = async (credentials) => {

    try {

      const data = await loginUser(credentials)

      // backend token response
      const token =
        data.token ||
        data.jwt ||
        data.accessToken

      if (!token) {
        throw new Error('Token not found in response')
      }

      // decode JWT
      const payload = decodeJwt(token)

      // save token
      setToken(token)

      // save user state
      setUser({
        username: payload.sub || payload.username,
        role: payload.role,
        token,
      })

      toast.success('Login successful')

      return payload.role

    } catch (error) {

      console.error(error)

      toast.error('Login failed')

      throw error
    }
  }

  // LOGOUT
  const logout = () => {

    removeToken()

    setUser(null)

    toast.success('Logged out successfully')
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      darkMode,
      setDarkMode,
      login,
      logout,
      isAuthenticated: Boolean(user),
    }),
    [user, loading, darkMode]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {

  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    )
  }

  return context
}