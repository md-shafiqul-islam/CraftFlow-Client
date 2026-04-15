import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import { LogOut, LayoutDashboard } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UserMenu = () => {
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const [open, setOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { data: userInfo } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/me?email=${user.email}`);
      return res.data;
    },
  });

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "You will be signed out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
    });

    if (!result.isConfirmed) return;

    try {
      await logoutUser();

      Swal.fire({
        icon: "success",
        title: "Logged out",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/login");
    } catch (error) {
      Swal.fire("Error", error?.message || "Logout failed", "error");
    }
  };

  // 🔒 Close on outside click
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
      {/* 🔥 Avatar */}
      <button onClick={() => setOpen(!open)} className="relative">
        <img
          src={user?.photoURL || "https://i.pravatar.cc/100?u=default"}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover border-2 border-secondary hover:scale-105 transition"
        />

        {/* online dot */}
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-base-100 rounded-full"></span>
      </button>

      {/* 🔥 Dropdown */}
      <div
        className={`absolute right-0 mt-3 w-72 origin-top-right transition-all duration-200 ${
          open
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
      >
        <div className="bg-base-100 border border-base-300 rounded-2xl shadow-xl overflow-hidden">
          {/* 👤 USER INFO */}
          <div className="px-5 py-4 border-b border-base-300 flex items-center gap-3">
            <img
              src={user.photoURL || "https://i.pravatar.cc/100?u=default"}
              className="w-12 h-12 rounded-full object-cover"
              alt=""
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-base-content truncate">
                {user.displayName || "User"}
              </p>
              <p className="text-xs text-base-content/60 truncate">
                {user.email}
              </p>

              {userInfo?.role && (
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">
                  {userInfo.role}
                </span>
              )}
            </div>
          </div>

          {/* 📌 MENU */}
          <div className="p-2 space-y-1">
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 transition"
            >
              <LayoutDashboard size={18} />
              <span className="text-sm">Dashboard</span>
            </Link>
          </div>

          {/* 🔻 DIVIDER */}
          <div className="border-t border-base-300" />

          {/* 🚪 LOGOUT */}
          <div className="p-2">
            <button
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
