import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import PageTransition from '../components/PageTransition.jsx'
import Sidebar from '../components/Sidebar.jsx'

function UserLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="md:flex">
        <Sidebar role="USER" open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1">
          <Navbar title="Citizen Workspace" onMenuClick={() => setIsSidebarOpen(true)} />
          <main className="p-4 sm:p-6">
            <PageTransition>
              <Outlet />
            </PageTransition>
          </main>
        </div>
      </div>
    </div>
  )
}

export default UserLayout
