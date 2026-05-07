import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute.jsx'
import AdminLayout from '../layouts/AdminLayout.jsx'
import UserLayout from '../layouts/UserLayout.jsx'
import AdminDashboard from '../pages/AdminDashboard.jsx'
import CreateComplaint from '../pages/CreateComplaint.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Login from '../pages/Login.jsx'
import MyComplaints from '../pages/MyComplaints.jsx'
import NotFound from '../pages/NotFound.jsx'
import Register from '../pages/Register.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/user"
        element={(
          <ProtectedRoute allowedRoles={['USER']}>
            <UserLayout />
          </ProtectedRoute>
        )}
      >
        <Route index element={<Dashboard />} />
        <Route path="create-complaint" element={<CreateComplaint />} />
        <Route path="my-complaints" element={<MyComplaints />} />
      </Route>

      <Route
        path="/admin"
        element={(
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminLayout />
          </ProtectedRoute>
        )}
      >
        <Route index element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
