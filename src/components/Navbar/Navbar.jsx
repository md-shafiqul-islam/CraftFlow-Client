import { Link, NavLink } from "react-router";
import { use, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import CraftFlowLogo from "../CraftFlowLogo/CraftFlowLogo";
import useAuth from "../../hooks/useAuth";
import UserMenu from "../UserMenu/UserMenu";
import { ThemeContext } from "../../contexts/ThemeContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = use(ThemeContext);
  const { user } = useAuth();

  const commonNavItems = [
    { name: "Home", path: "/" },
    { name: "Contact Us", path: "/contact-us" },
    ...(user ? [{ name: "Dashboard", path: "/dashboard" }] : []),
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-base-200/80 via-base-300/60 to-base-200/40 shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          {/* Left: Logo + Mobile Toggle */}
          <div className="flex justify-center items-center gap-5">
            <button
              className="lg:hidden cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>

            <CraftFlowLogo />
          </div>

          {/* Middle: Desktop Nav Items */}
          <ul className="hidden lg:flex justify-center items-center gap-5">
            {commonNavItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md font-semibold transition-colors ${
                      isActive
                        ? "bg-base-100 text-secondary"
                        : "hover:bg-base-100 text-accent"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right: Theme Toggle */}
          <div className="flex justify-center items-center gap-5">
            <button
              onClick={toggleTheme}
              className="btn btn-sm btn-outline rounded-full"
              title="Toggle Theme"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {user ? (
              <UserMenu />
            ) : (
              <>
                <Link to="/login">
                  <button className="btn btn-outline text-primary font-bold">
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute mt-16 bg-base-300 w-fit rounded-r-xl shadow-lg p-5">
            <ul className="flex flex-col gap-3">
              {commonNavItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex px-3 py-2 rounded-md font-semibold transition-colors ${
                        isActive
                          ? "bg-base-100 text-secondary"
                          : "hover:bg-base-100 text-accent"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
