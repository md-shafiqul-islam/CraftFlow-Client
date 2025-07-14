import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import { LogOut, User, LayoutDashboard } from "lucide-react";

const UserMenu = () => {
  const { user, logoutUser } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1a237e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser()
          .then(() => {
            Swal.fire({
              title: "Logged out!",
              text: "You have been logged out.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            navigate("/login");
          })
          .catch(() => {
            Swal.fire({
              title: "Error",
              text: "Logout failed. Please try again.",
              icon: "error",
              confirmButtonText: "OK",
              confirmButtonColor: "#d33",
            });
          });
      }
    });
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar */}
      <img
        src={user?.photoURL || "https://i.pravatar.cc/100?u=default"}
        alt="User Avatar"
        className="w-10 h-10 rounded-full border-2 border-secondary cursor-pointer"
        onClick={() => setOpen(!open)}
        title="Account Menu"
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-base-100 shadow-lg border border-base-300 rounded-xl z-50 p-4 text-sm space-y-3">
          {/* User Info */}
          <div className="flex items-center gap-3 border-b pb-3">
            <img
              src={user.photoURL || "https://i.pravatar.cc/100?u=default"}
              alt="User Avatar"
              className="w-12 h-12 rounded-full border border-secondary"
            />
            <div>
              <p className="font-semibold text-accent">
                {user.displayName || "User Name"}
              </p>
              <p className="text-xs text-text-accent truncate">{user.email}</p>
              {user.role && (
                <span className="text-[10px] bg-secondary text-white px-2 py-0.5 rounded mt-1 inline-block">
                  {user.role}
                </span>
              )}
            </div>
          </div>

          {/* Navigation Options */}
          <div className="space-y-2">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 hover:bg-base-200 px-3 py-2 rounded-md transition"
              onClick={() => setOpen(false)}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2 hover:bg-base-200 px-3 py-2 rounded-md transition"
              onClick={() => setOpen(false)}
            >
              <User size={16} />
              Profile
            </Link>
          </div>

          {/* Divider */}
          <hr className="border-base-200" />

          {/* Logout */}
          <button
            onClick={() => {
              setOpen(false);
              handleLogout();
            }}
            className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-base-200 rounded-md w-full transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
