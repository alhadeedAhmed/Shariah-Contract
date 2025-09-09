import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const ProtectedRoute = ({
  children,
  allow,
}: {
  children: React.ReactNode;
  allow?: Array<string>;
}) => {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  if (allow && role && !allow.includes(role))
    return <Navigate to="/signin" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
