import Forbidden from "../../../components/Forbidden/Forbidden";
import useUserRole from "../../../hooks/useUserRole";
import AdminDashboard from "./AdminDashboard";
import EmployeeDashboard from "./EmployeeDashboard";
import HRDashboard from "./HRDashboard";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner text-secondary"></span>
      </div>
    );
  }

  if (role === "Employee") {
    return <EmployeeDashboard />;
  } else if (role === "HR") {
    return <HRDashboard />;
  } else if (role === "Admin") {
    return <AdminDashboard />;
  } else {
    return <Forbidden />;
  }
};

export default DashboardHome;
