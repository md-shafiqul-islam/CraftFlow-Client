import {
  FiHome,
  FiBox,
  FiArrowLeft,
  FiUsers,
  FiCreditCard,
  FiFileText,
  FiUserCheck,
  FiDollarSign,
  FiMail,
} from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { NavLink, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();

  const baseLinkStyle =
    "flex items-center gap-3 py-2.5 px-4 rounded-lg transition font-medium text-sm";

  const activeStyle = "bg-secondary text-base-100 shadow-sm";
  const inactiveStyle =
    "text-base-content/70 hover:bg-base-100 hover:text-secondary";

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* ================= MAIN CONTENT ================= */}
      <div className="drawer-content flex flex-col bg-base-200 min-h-screen">
        {/* Mobile Navbar */}
        <div className="navbar lg:hidden bg-base-100 shadow-sm border-b border-base-300 sticky top-0 z-50">
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-ghost btn-square"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>

          <div className="flex-1">
            <h1 className="text-lg font-extrabold tracking-wide">
              <span className="text-primary">Craft</span>
              <span className="text-secondary">Flow</span>
            </h1>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="w-80 bg-base-200 border-r border-base-300 flex flex-col justify-between min-h-full">
          {/* TOP SECTION */}
          <div>
            {/* Brand */}
            <div className="flex items-center gap-2 p-6 border-b border-base-300">
              <MdOutlineDashboard className="text-2xl text-primary" />
              <h2 className="text-xl font-bold">
                <span className="text-primary">Craft</span>
                <span className="text-secondary">Flow</span>
              </h2>
            </div>

            {/* NAV LINKS */}
            <nav className="p-4 space-y-2">
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `${baseLinkStyle} ${isActive ? activeStyle : inactiveStyle}`
                }
              >
                <FiHome />
                Dashboard
              </NavLink>

              {/* EMPLOYEE */}
              {!roleLoading && role === "Employee" && (
                <>
                  <NavLink
                    to="/dashboard/my-task"
                    className={({ isActive }) =>
                      `${baseLinkStyle} ${
                        isActive ? activeStyle : inactiveStyle
                      }`
                    }
                  >
                    <FiBox />
                    My Tasks
                  </NavLink>

                  <NavLink
                    to="/dashboard/payment-history"
                    className={({ isActive }) =>
                      `${baseLinkStyle} ${
                        isActive ? activeStyle : inactiveStyle
                      }`
                    }
                  >
                    <FiCreditCard />
                    Payment History
                  </NavLink>
                </>
              )}

              {/* HR */}
              {!roleLoading && role === "HR" && (
                <>
                  <NavLink
                    to="/dashboard/employee-list"
                    className={({ isActive }) =>
                      `${baseLinkStyle} ${
                        isActive ? activeStyle : inactiveStyle
                      }`
                    }
                  >
                    <FiUsers />
                    Employees
                  </NavLink>

                  <NavLink
                    to="/dashboard/work-records"
                    className={({ isActive }) =>
                      `${baseLinkStyle} ${
                        isActive ? activeStyle : inactiveStyle
                      }`
                    }
                  >
                    <FiFileText />
                    Work Records
                  </NavLink>
                </>
              )}

              {/* ADMIN */}
              {!roleLoading && role === "Admin" && (
                <>
                  <NavLink
                    to="/dashboard/all-employee-list"
                    className={({ isActive }) =>
                      `${baseLinkStyle} ${
                        isActive ? activeStyle : inactiveStyle
                      }`
                    }
                  >
                    <FiUserCheck />
                    Verified Employees
                  </NavLink>

                  <NavLink
                    to="/dashboard/payroll"
                    className={({ isActive }) =>
                      `${baseLinkStyle} ${
                        isActive ? activeStyle : inactiveStyle
                      }`
                    }
                  >
                    <FiDollarSign />
                    Payroll
                  </NavLink>

                  <NavLink
                    to="/dashboard/messages"
                    className={({ isActive }) =>
                      `${baseLinkStyle} ${
                        isActive ? activeStyle : inactiveStyle
                      }`
                    }
                  >
                    <FiMail />
                    Messages
                  </NavLink>
                </>
              )}
            </nav>
          </div>

          {/* ================= BOTTOM SECTION ================= */}
          <div className="p-4 border-t border-base-300 space-y-4">
            {/* Back to Home */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${baseLinkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <FiArrowLeft />
              Back to Home
            </NavLink>

            {/* USER CARD */}
            <div className="flex items-center gap-3 bg-base-100 p-3 rounded-xl border border-base-300">
              <img
                src={user?.photoURL || "https://i.pravatar.cc/100?u=default"}
                alt="user"
                className="w-10 h-10 rounded-full object-cover border border-secondary"
              />

              <div className="min-w-0">
                <p className="font-medium truncate">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs text-base-content/60 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
