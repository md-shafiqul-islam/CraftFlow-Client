import { Link } from "react-router";
import logo from "../../assets/Logo/craft-flow-logo.png";

const CraftFlowLogo = () => {
  return (
    <Link
      to="/"
      className="group flex items-center gap-2 select-none"
      aria-label="Go to homepage"
    >
      {/* Logo Image */}
      <div className="relative">
        <img
          src={logo}
          alt="CraftFlow Logo"
          className="w-9 h-9 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-105"
        />

        {/* subtle glow */}
        <div className="absolute inset-0 rounded-full bg-primary/10 blur-md opacity-0 group-hover:opacity-100 transition duration-300" />
      </div>

      {/* Text */}
      <h1 className="text-lg sm:text-xl font-extrabold tracking-wide leading-none">
        <span className="text-primary transition-colors duration-300 group-hover:text-secondary">
          Craft
        </span>
        <span className="text-secondary transition-colors duration-300 group-hover:text-primary">
          Flow
        </span>
      </h1>
    </Link>
  );
};

export default CraftFlowLogo;
