import { Navigate, Outlet } from 'react-router-dom';

const roleToLoginPath = {
  borrower: '/login',
  lender: '/login/lender',
  validator: '/login/validator',
};

const ProtectedRoute = ({ user, allowedRoles }) => {
  // Nếu chưa đăng nhập => chuyển đến trang login tương ứng
  if (!user) {
    // Dự đoán role theo allowedRoles, mặc định dùng '/login'
    const loginPath = allowedRoles?.[0]
      ? roleToLoginPath[allowedRoles[0]] || '/login'
      : '/login';

    return <Navigate to={loginPath} replace />;
  }

  // Nếu không truyền allowedRoles => cho phép
  if (!allowedRoles) return <Outlet />;

  // Nếu user không có quyền phù hợp => redirect đến unauthorized
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
