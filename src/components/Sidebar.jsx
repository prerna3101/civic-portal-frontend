import { ClipboardList, FilePlus2, LayoutDashboard, Shield } from 'lucide-react'
import { NavLink } from 'react-router-dom'

function Sidebar({ role }) {
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
    <aside className="w-full border-b border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800 md:w-64 md:border-b-0 md:border-r md:p-4">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
        Civic Portal
      </h2>
      <nav className="flex gap-2 overflow-x-auto md:flex-col">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/user' || item.to === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700'
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
