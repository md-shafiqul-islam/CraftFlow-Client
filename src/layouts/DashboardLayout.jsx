import {
  FiHome,
  FiBox,
  FiArrowLeft,
  FiUsers,
  FiCreditCard,
  FiFileText,
  FiUserCheck,
} from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { NavLink, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Mobile sidebar toggle */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-100 lg:hidden shadow-sm">
          <div className="flex-none">
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>

          <div className="flex-1">
            <h1 className="text-xl font-extrabold select-none tracking-wide">
              <span className="text-primary">Craft</span>
              <span className="text-secondary">Flow</span>
            </h1>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      {/* Desktop Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <div className="menu p-4 w-80 h-full bg-base-200 text-base-content border-r border-base-300 flex flex-col justify-between">
          <div>
            {/* App title */}
            <div className="flex items-center mb-8 p-2">
              <MdOutlineDashboard className="text-2xl text-primary" />
              <h2 className="text-xl font-bold ml-2 text-primary">
                <span className="text-primary">Craft</span>
                <span className="text-secondary">Flow</span>
              </h2>
            </div>

            {/* Navigation links */}
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-2 px-4 rounded-md ${
                      isActive
                        ? "bg-secondary text-base-100"
                        : "hover:bg-base-100"
                    }`
                  }
                >
                  <FiHome className="text-lg" />
                  Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/my-task"
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-2 px-4 rounded-md ${
                      isActive
                        ? "bg-secondary text-base-100"
                        : "hover:bg-base-100"
                    }`
                  }
                >
                  <FiBox className="text-lg" />
                  My Tasks
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/payment-history"
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-2 px-4 rounded-md ${
                      isActive
                        ? "bg-secondary text-base-100"
                        : "hover:bg-base-100"
                    }`
                  }
                >
                  <FiCreditCard className="text-lg" />
                  Payment History
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/employee-list"
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-2 px-4 rounded-md ${
                      isActive
                        ? "bg-secondary text-base-100"
                        : "hover:bg-base-100"
                    }`
                  }
                >
                  <FiUsers className="text-lg" />
                  Employee List
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/work-records"
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-2 px-4 rounded-md ${
                      isActive
                        ? "bg-secondary text-base-100"
                        : "hover:bg-base-100"
                    }`
                  }
                >
                  <FiFileText className="text-lg" />
                  Work Records
                </NavLink>
              </li>

              {/* Admin's Links */}
              {!roleLoading && role === "Admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/all-employee-list"
                      className={({ isActive }) =>
                        `flex items-center gap-2 py-2 px-4 rounded-md ${
                          isActive
                            ? "bg-secondary text-base-100"
                            : "hover:bg-base-100"
                        }`
                      }
                    >
                      <FiUserCheck className="text-lg" />
                      All Employee List
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Bottom: User Profile Info */}
          <div className="mt-auto pt-4 border-t border-base-300">
            {/* Back to Home Link */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 py-2 px-4 rounded-md ${
                  isActive ? "bg-secondary text-base-100" : "hover:bg-base-100"
                }`
              }
            >
              <FiArrowLeft className="text-lg" />
              Back to Home
            </NavLink>

            {/* User Info */}
            <div className="flex items-center gap-3 mt-6 p-2 bg-base-100 rounded-lg">
              <img
                src={user?.photoURL}
                alt="user"
                className="w-10 h-10 rounded-full object-cover border border-secondary"
              />
              <div>
                <p className="font-medium">{user?.displayName}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
