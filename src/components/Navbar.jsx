import { LogOut, Menu, Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../hooks/useTheme.js'
import Modal from './Modal.jsx'

function Navbar({ title, onMenuClick }) {
  const { user, logout } = useAuth()
  const { darkMode, toggleTheme } = useTheme()
  const [confirmLogout, setConfirmLogout] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200/70 bg-white/85 px-4 py-3 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/85 sm:px-6">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onMenuClick} className="btn-secondary px-3 py-2 md:hidden" aria-label="Open menu">
            <Menu size={16} />
          </button>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300 sm:inline">
            {user?.username}
          </span>
          <button type="button" onClick={toggleTheme} className="btn-secondary px-3 py-2" aria-label="Toggle theme">
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button type="button" onClick={() => setConfirmLogout(true)} className="btn-primary">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>
      <Modal
        open={confirmLogout}
        title="Confirm logout"
        description="You are about to sign out from Civic Portal."
        confirmText="Logout"
        onClose={() => setConfirmLogout(false)}
        onConfirm={() => {
          logout()
          setConfirmLogout(false)
        }}
      />
    </>
  )
}

export default Navbar
