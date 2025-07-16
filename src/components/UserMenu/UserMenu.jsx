import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import { LogOut, User, LayoutDashboard } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UserMenu = () => {
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const [open, setOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { data: userInfo } = useQuery({
    queryKey: ["user", user.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
    onError: (error) => {
      console.error("Failed to fetch user info:", error);
    },
  });

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1a237e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await logoutUser();
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been logged out successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: error?.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
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
        role="button"
        aria-label="Toggle user menu"
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-base-300 shadow-lg border border-base-300 rounded-xl z-50 p-4 text-sm space-y-3">
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
              {userInfo.role && (
                <span className="text-[10px] bg-secondary text-white px-2 py-0.5 rounded mt-1 inline-block">
                  {userInfo.role}
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
            type="button"
            className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-base-100 rounded-md w-full transition cursor-pointer"
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
