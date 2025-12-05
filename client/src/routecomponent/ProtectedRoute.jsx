import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, isAuthenticatedT, role }) => {
  if (role === "admin" && isAuthenticated) {
    return <Outlet />;
  }

  if (role === "user" && isAuthenticatedT) {
    return <Outlet />;
  }

  return <Navigate to="/signIn" replace />;
};

export default ProtectedRoute;
