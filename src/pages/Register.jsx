import { useState } from 'react'
import { UserPlus } from 'lucide-react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell.jsx'
import { registerUser } from '../services/authService.js'

function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!formData.username.trim() || !formData.password.trim()) {
      toast.error('All fields are required')
      return
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      await registerUser({
        username: formData.username,
        password: formData.password,
      })
      toast.success('Registered successfully. Please login.')
      navigate('/login')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Create account"
      subtitle="Register to submit and track complaints efficiently."
      footer={(
        <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
          Already have an account? <Link to="/login" className="font-semibold text-brand-600 hover:underline">Login</Link>
        </p>
      )}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="input-ui" />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="input-ui" />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="input-ui" />
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Registering...' : 'Register'}
          {!loading && <UserPlus size={16} />}
        </button>
      </form>
    </AuthShell>
  )
}

export default Register
