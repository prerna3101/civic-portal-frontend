import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, KeyRound, ShieldCheck, Sparkles, UserRound } from 'lucide-react'
import toast from 'react-hot-toast'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Login() {
  const { login, isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to={user?.role === 'ADMIN' ? '/admin' : '/user'} replace />
  }

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!formData.username.trim() || !formData.password.trim()) {
      toast.error('Username and password are required')
      return
    }
    setLoading(true)
    try {
      const role = await login(formData)
      const fallback = role === 'ADMIN' ? '/admin' : '/user'
      navigate(location.state?.from?.pathname || fallback, { replace: true })
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-emerald-900 p-4 dark:from-slate-950 dark:via-teal-950 dark:to-slate-900 md:p-6">
      <motion.div
        aria-hidden="true"
        className="absolute -left-12 top-16 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl"
        animate={{ y: [0, 14, 0], x: [0, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-14 bottom-10 h-60 w-60 rounded-full bg-violet-400/20 blur-3xl"
        animate={{ y: [0, -12, 0], x: [0, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto grid min-h-[calc(100vh-2rem)] w-full max-w-7xl items-center gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-glass backdrop-blur-xl md:grid-cols-2 md:p-10">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="text-white"
        >
          <motion.div
            className="mb-6 w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-emerald-100"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Civic Grievance Platform
          </motion.div>

          <motion.div
            className="mb-6 flex items-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.05 }}
          >
            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-800 shadow-[0_14px_32px_rgba(16,185,129,0.35)]">
              <motion.span
                className="absolute h-28 w-28 rounded-full border border-emerald-200/45"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5], rotate: [0, 180, 360] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
              />
              <motion.span
                className="absolute h-20 w-20 rounded-full border border-violet-200/45"
                animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.85, 0.45], rotate: [360, 180, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
              <ShieldCheck size={30} />
              <Building2 size={14} className="absolute -right-1 -top-1 rounded-full bg-violet-500 p-0.5" />
              <Sparkles size={14} className="absolute -bottom-1 -left-1 rounded-full bg-emerald-300 p-0.5 text-slate-900" />
            </div>
            <div className="text-sm text-zinc-200/90">Secure | Connected | Transparent</div>
          </motion.div>

          <motion.h1
            className="bg-gradient-to-r from-emerald-200 via-teal-100 to-violet-200 bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ textShadow: '0 0 24px rgba(16,185,129,0.2)' }}
          >
            CIVIC PORTAL
          </motion.h1>
          <motion.p
            className="mt-4 max-w-xl text-lg text-zinc-200/90"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Smart Complaint Management System
          </motion.p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.35)] backdrop-blur-2xl md:p-8"
        >
          <h2 className="text-2xl font-bold text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-zinc-200/90">Sign in to manage civic complaints with confidence.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="relative">
              <UserRound size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" />
              <input
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/20 bg-white/10 py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-300/80 outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-300/25"
              />
            </div>
            <div className="relative">
              <KeyRound size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/20 bg-white/10 py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-300/80 outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-300/25"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(16,185,129,0.35)] transition disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Signing in...' : 'Login'}
              {!loading && <ArrowRight size={16} />}
            </motion.button>
          </form>

          <p className="mt-5 text-center text-sm text-zinc-200/90">
            New here?{' '}
            <Link to="/register" className="font-semibold text-emerald-200 transition hover:text-violet-200 hover:underline">
              Create account
            </Link>
          </p>
        </motion.section>
      </div>
    </div>
  )
}

export default Login
