import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-100 p-6 text-center dark:bg-slate-900">
      <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100">404</h1>
      <p className="text-sm text-slate-600 dark:text-slate-300">Page not found.</p>
      <Link
        to="/login"
        className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Go to Login
      </Link>
    </div>
  )
}

export default NotFound
