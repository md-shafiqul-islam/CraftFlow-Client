import { Link, NavLink } from "react-router";
import { use, useState, useEffect } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import CraftFlowLogo from "../CraftFlowLogo/CraftFlowLogo";
import useAuth from "../../hooks/useAuth";
import UserMenu from "../UserMenu/UserMenu";
import { ThemeContext } from "../../contexts/ThemeContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { theme, toggleTheme } = use(ThemeContext);
  const { user } = useAuth();

  // 🔒 Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // 📌 Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Use Cases", path: "/use-cases" },
    { name: "Support", path: "/support" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact-us" },
    ...(user ? [{ name: "Dashboard", path: "/dashboard" }] : []),
  ];

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-base-100/95 backdrop-blur-xl shadow-md"
            : "bg-base-100/80 backdrop-blur-md"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          {/* LEFT */}
          <div className="flex items-center gap-2">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-base-200"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu />
            </button>

            {/* Logo only desktop */}
            <div className="hidden lg:block">
              <CraftFlowLogo />
            </div>
          </div>

          {/* CENTER (Desktop) */}
          <ul className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition ${
                      isActive
                        ? "text-secondary"
                        : "text-base-content/70 hover:text-secondary"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* RIGHT */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-base-200"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Auth */}
            {user ? (
              <UserMenu />
            ) : (
              <Link to="/login">
                <button className="px-3 sm:px-4 py-2 text-sm rounded-lg bg-secondary text-white font-medium hover:opacity-90 transition">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* ================= OVERLAY ================= */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 max-w-xs bg-base-100 shadow-2xl transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* HEADER */}
          <div className="flex justify-end p-4 border-b border-base-300">
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-md hover:bg-base-200"
            >
              <X size={22} />
            </button>
          </div>

          {/* NAV ITEMS */}
          <div className="flex flex-col gap-2 p-4 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm ${
                    isActive
                      ? "bg-secondary/10 text-secondary"
                      : "text-base-content/70 hover:bg-base-200"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* 🔥 LOGIN ALWAYS VISIBLE */}
          {!user && (
            <div className="p-4 border-t border-base-300 bg-base-100">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button className="w-full py-3 rounded-lg bg-secondary text-white font-medium">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
