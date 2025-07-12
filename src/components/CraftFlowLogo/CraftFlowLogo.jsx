import { Link } from "react-router";
import logo from "../../assets/Logo/craft-flow-logo.png";

const CraftFlowLogo = () => {
  return (
    <div>
      <Link to="/" className="flex justify-center items-center gap-2">
        <img
          className="w-10 h-10 cursor-pointer"
          src={logo}
          alt="Craft-Flow Logo"
        />
        <h1 className="text-xl font-extrabold select-none tracking-wide">
          <span className="text-primary">Craft</span>
          <span className="text-secondary">Flow</span>
        </h1>
      </Link>
    </div>
  );
};

export default CraftFlowLogo;
