import { Link } from "react-router";
import { ShieldOff } from "lucide-react";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <ShieldOff className="h-20 w-20 text-error" />
        </div>
        <h1 className="text-5xl font-bold text-error">403 Forbidden</h1>
        <p className="text-base-content text-lg">
          You don't have permission to access this page.
        </p>
        <Link to="/">
          <button className="btn btn-error text-base-content">Go Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
