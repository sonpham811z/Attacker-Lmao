import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ user, allowedRoles }) => {
  if (!user) return <Navigate to="/login/borrower" replace />

  if (!allowedRoles) return <Outlet />

  // Nếu có role kiểm tra:
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />

  return <Outlet />
}

export default ProtectedRoute
