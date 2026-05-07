import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-5">
      <section className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
          Welcome, {user?.username}
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Use the portal to create and track complaints in real time.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/user/create-complaint"
          className="rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-slate-800"
        >
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
            Create Complaint
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Submit a new issue for admin review.
          </p>
        </Link>
        <Link
          to="/user/my-complaints"
          className="rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-slate-800"
        >
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
            My Complaints
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Monitor status updates for your complaints.
          </p>
        </Link>
      </section>
    </div>
  )
}

export default Dashboard
