import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 p-6 text-center dark:bg-slate-950">
      <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100">404</h1>
      <p className="text-sm text-slate-600 dark:text-slate-300">Page not found.</p>
      <Link to="/login" className="btn-primary">
        Go to Login
      </Link>
    </div>
  )
}

export default NotFound
