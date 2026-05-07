import { Navigate, Route, Routes } from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute.jsx'

import AdminLayout from './layouts/AdminLayout.jsx'
import UserLayout from './layouts/UserLayout.jsx'

import AdminDashboard from './pages/AdminDashboard.jsx'
import CreateComplaint from './pages/CreateComplaint.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import MyComplaints from './pages/MyComplaints.jsx'
import NotFound from './pages/NotFound.jsx'
import Register from './pages/Register.jsx'

function App() {

  return (

    <Routes>

      {/* Default Route */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Public Routes */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* USER ROUTES */}
      <Route
        path="/user"
        element={
          <ProtectedRoute allowedRoles={['USER']}>

            <UserLayout />

          </ProtectedRoute>
        }
      >

        {/* User Dashboard */}
        <Route
          index
          element={<Dashboard />}
        />

        {/* Create Complaint */}
        <Route
          path="create-complaint"
          element={<CreateComplaint />}
        />

        {/* My Complaints */}
        <Route
          path="my-complaints"
          element={<MyComplaints />}
        />

      </Route>

      {/* ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>

            <AdminLayout />

          </ProtectedRoute>
        }
      >

        {/* Admin Dashboard */}
        <Route
          index
          element={<AdminDashboard />}
        />

      </Route>

      {/* 404 PAGE */}
      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  )
}

export default App