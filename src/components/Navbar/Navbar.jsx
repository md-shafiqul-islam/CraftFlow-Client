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

  // 🔒 Lock scroll
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [menuOpen]);

  // 📌 Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const commonNavItems = [
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
        className={`sticky top-0 z-[9999] w-full transition-all duration-300 ${
          scrolled
            ? "bg-base-100/95 backdrop-blur-xl shadow-md border-base-300"
            : "bg-base-100/70 backdrop-blur-md"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-base-200 transition"
              onClick={() => setMenuOpen(true)}
            >
              <Menu />
            </button>

            {/* ✅ Logo ONLY for desktop */}
            <div className="hidden lg:block">
              <CraftFlowLogo />
            </div>
          </div>

          {/* CENTER */}
          <ul className="hidden lg:flex items-center gap-8">
            {commonNavItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `relative text-sm font-medium transition ${
                      isActive
                        ? "text-secondary"
                        : "text-base-content/70 hover:text-secondary"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      <span
                        className={`absolute left-0 -bottom-1 h-[2px] bg-secondary transition-all duration-300 ${
                          isActive ? "w-full" : "w-0"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-base-200 transition"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {user ? (
              <UserMenu />
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 rounded-lg bg-secondary text-base-100 font-medium hover:opacity-90 transition">
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
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-base-100 border-r border-base-300 shadow-xl transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* ✅ HEADER (NO LOGO) */}
          <div className="flex justify-end p-4 border-b border-base-300">
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-md hover:bg-base-200 transition"
            >
              <X size={22} />
            </button>
          </div>

          {/* NAV ITEMS */}
          <div className="flex flex-col gap-2 p-4 flex-1">
            {commonNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-secondary/10 text-secondary"
                      : "text-base-content/70 hover:bg-base-200 hover:text-secondary"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* FOOTER */}
          {!user && (
            <div className="p-4 border-t border-base-300">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button className="w-full py-3 rounded-lg bg-secondary text-base-100 font-medium">
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
