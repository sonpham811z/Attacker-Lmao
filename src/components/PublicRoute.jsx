import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = ({ user, redirectPath = '/' }) => {
  if (user) return <Navigate to={redirectPath} replace />
  return <Outlet />
}

export default PublicRoute
