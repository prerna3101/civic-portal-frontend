import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, CircleCheck, CircleDashed, ClipboardList, Plus, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getMyComplaints } from '../services/complaintService.js'

function Dashboard() {
  const { user } = useAuth()
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      try {
        const data = await getMyComplaints()
        setComplaints(Array.isArray(data) ? data : [])
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  const stats = useMemo(() => ({
    total: complaints.length,
    pending: complaints.filter((item) => item.status === 'PENDING').length,
    resolved: complaints.filter((item) => item.status === 'RESOLVED').length,
  }), [complaints])

  if (loading) return <Loader text="Loading dashboard..." />

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200/50 bg-gradient-to-br from-slate-900 via-teal-900 to-emerald-800 p-7 text-white shadow-glass dark:border-slate-700/40 md:p-10">
        <motion.div
          aria-hidden="true"
          className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-emerald-300/25 blur-3xl"
          animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute -bottom-14 left-10 h-44 w-44 rounded-full bg-violet-400/20 blur-3xl"
          animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <p className="text-sm text-emerald-100/90">Welcome, {user?.username}</p>
            <motion.h1
              className="mt-3 bg-gradient-to-r from-emerald-200 via-teal-100 to-violet-200 bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-6xl lg:text-7xl xl:text-8xl"
              initial={{ opacity: 0, y: 26, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ textShadow: '0 0 24px rgba(16,185,129,0.22)' }}
            >
              CIVIC PORTAL
            </motion.h1>
            <motion.p
              className="mt-5 max-w-xl text-base text-zinc-100/90 sm:text-lg"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              Smart Complaint Management System for Better Civic Services
            </motion.p>
            <motion.div
              className="mt-7 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link to="/user/create-complaint" className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(16,185,129,0.35)] transition">
                  <Plus size={16} />
                  Register Complaint
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link to="/user/my-complaints" className="inline-flex items-center gap-2 rounded-2xl border border-zinc-100/30 bg-zinc-50/10 px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(139,92,246,0.25)] backdrop-blur-xl transition hover:bg-zinc-50/20">
                  <ClipboardList size={16} />
                  Track Complaints
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="mx-auto w-full max-w-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative rounded-3xl border border-white/20 bg-white/10 p-6 shadow-glass backdrop-blur-xl">
              <motion.div
                className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-200/45"
                animate={{ scale: [1, 1.12, 1], rotate: [0, 180, 360], opacity: [0.45, 0.9, 0.45] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-200/45"
                animate={{ scale: [1, 1.1, 1], rotate: [360, 180, 0], opacity: [0.45, 0.85, 0.45] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500/90 to-teal-800/90 text-white shadow-[0_12px_30px_rgba(16,185,129,0.35)]"
                animate={{ y: [0, -8, 0], boxShadow: ['0 12px 30px rgba(16,185,129,0.35)', '0 18px 36px rgba(139,92,246,0.28)', '0 12px 30px rgba(16,185,129,0.35)'] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ShieldCheck size={34} />
                <Building2 size={15} className="absolute -right-1 -top-1 rounded-full bg-violet-500 p-0.5" />
                <Sparkles size={15} className="absolute -bottom-1 -left-1 rounded-full bg-emerald-300 p-0.5 text-slate-900" />
              </motion.div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs text-emerald-50">
                <span className="rounded-xl bg-white/10 px-2 py-1">Secure</span>
                <span className="rounded-xl bg-white/10 px-2 py-1">Connected</span>
                <span className="rounded-xl bg-white/10 px-2 py-1">Civic AI</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <article className="panel p-5 transition hover:-translate-y-1"><p className="text-sm text-slate-500 dark:text-slate-300">Total complaints</p><div className="mt-3 flex items-center gap-2"><ClipboardList size={18} className="text-teal-700 dark:text-teal-300" /><span className="text-3xl font-bold">{stats.total}</span></div></article>
        <article className="panel p-5 transition hover:-translate-y-1"><p className="text-sm text-slate-500 dark:text-slate-300">Pending</p><div className="mt-3 flex items-center gap-2"><CircleDashed size={18} className="text-amber-500" /><span className="text-3xl font-bold text-amber-500">{stats.pending}</span></div></article>
        <article className="panel p-5 transition hover:-translate-y-1"><p className="text-sm text-slate-500 dark:text-slate-300">Resolved</p><div className="mt-3 flex items-center gap-2"><CircleCheck size={18} className="text-emerald-500" /><span className="text-3xl font-bold text-emerald-500">{stats.resolved}</span></div></article>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/user/create-complaint"
          className="panel p-5 transition hover:-translate-y-1"
        >
          <div className="mb-3 inline-flex rounded-xl bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"><Plus size={16} /></div>
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">Create Complaint</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Submit a new issue for admin review.</p>
        </Link>
        <Link
          to="/user/my-complaints"
          className="panel p-5 transition hover:-translate-y-1"
        >
          <div className="mb-3 inline-flex rounded-xl bg-violet-100 p-2 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"><ClipboardList size={16} /></div>
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">My Complaints</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Monitor status updates for your complaints.</p>
        </Link>
      </section>
    </div>
  )
}

export default Dashboard
