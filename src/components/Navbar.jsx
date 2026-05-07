import { LogOut, Moon, Sun } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

function Navbar({ title }) {
  const { user, logout, darkMode, setDarkMode } = useAuth()

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
      <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</h1>
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="hidden text-sm text-slate-600 dark:text-slate-200 sm:inline">
          {user?.username}
        </span>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-lg border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-1 rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-brand-700"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar
