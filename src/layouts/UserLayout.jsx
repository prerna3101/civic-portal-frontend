import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'

function UserLayout() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <div className="md:flex">
        <Sidebar role="USER" />
        <div className="flex-1">
          <Navbar title="User Portal" />
          <main className="p-4 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default UserLayout
