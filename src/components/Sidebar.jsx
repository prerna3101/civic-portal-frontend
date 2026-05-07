import { Building2, ClipboardList, FilePlus2, LayoutDashboard, Shield, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

function Sidebar({ role, open, onClose }) {
  const userItems = [
    { to: '/user', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { to: '/user/create-complaint', label: 'Create Complaint', icon: <FilePlus2 size={16} /> },
    { to: '/user/my-complaints', label: 'My Complaints', icon: <ClipboardList size={16} /> },
  ]
  const adminItems = [
    { to: '/admin', label: 'Admin Dashboard', icon: <Shield size={16} /> },
  ]
  const items = role === 'ADMIN' ? adminItems : userItems

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm transition md:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 top-0 z-40 h-full w-72 border-r border-slate-200/70 bg-white/95 p-4 shadow-glass backdrop-blur-xl transition-transform dark:border-slate-700/60 dark:bg-slate-900/95 md:static md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <Building2 size={16} />
            Civic Portal
          </div>
          <button type="button" onClick={onClose} className="btn-secondary px-2 py-2 md:hidden">
            <X size={14} />
          </button>
        </div>
        <nav className="space-y-2">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              end={item.to === '/user' || item.to === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
