import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const HrRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-secondary text-center"></span>
      </div>
    );
  }

  if (!user || role !== "HR") {
    return <Navigate to="/forbidden" state={location.pathname}></Navigate>;
  }

  return children;
};

export default HrRoute;
