import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = ({ user, redirectPath = '/' }) => {
  // Nếu đã đăng nhập thì chuyển hướng
  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  // Nếu chưa login, cho vào route con (Outlet)
  return <Outlet />;
};

export default PublicRoute;

