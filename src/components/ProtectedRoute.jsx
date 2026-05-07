import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Loader from './Loader.jsx'

function ProtectedRoute({ children, allowedRoles = [] }) {

  const {
    user,
    loading,
    isAuthenticated,
  } = useAuth()

  const location = useLocation()

  // Loading state
  if (loading) {
    return (
      <Loader text="Checking authentication..." />
    )
  }

  // Not logged in
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    )
  }

  // Role based protection
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user?.role)
  ) {

    // redirect based on role
    if (user?.role === 'ADMIN') {
      return <Navigate to="/admin" replace />
    }

    return <Navigate to="/user" replace />
  }

  // Authorized access
  return children
}

export default ProtectedRoute