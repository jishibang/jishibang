import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
interface PrivateRouteProps {
  children: React.ReactNode;
  workerOnly?: boolean;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, workerOnly = false }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (workerOnly && user?.type !== "worker") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
export default PrivateRoute;
