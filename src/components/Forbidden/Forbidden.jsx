import { Link } from "react-router";
import { ShieldAlert, ArrowLeft, LayoutDashboard } from "lucide-react";

const Forbidden = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-base-200 px-4 overflow-hidden">
      {/* 🔥 Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[300px] h-[300px] bg-error/20 blur-3xl rounded-full top-[-80px] left-[-80px]" />
        <div className="absolute w-[300px] h-[300px] bg-primary/20 blur-3xl rounded-full bottom-[-80px] right-[-80px]" />
      </div>

      {/* 🔥 Content */}
      <div className="relative text-center max-w-lg mx-auto">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl bg-error/10 border border-error/20">
            <ShieldAlert className="h-14 w-14 text-error" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-error mb-3">
          403 - Access Denied
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-base-content/70">
          You don’t have permission to access this resource. This area is
          restricted based on your role or authorization level.
        </p>

        {/* Extra hint */}
        <p className="mt-3 text-sm text-base-content/50">
          If you believe this is a mistake, please contact your administrator.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Go Home */}
          <Link to="/">
            <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition">
              <ArrowLeft size={18} />
              Back to Home
            </button>
          </Link>

          {/* Dashboard */}
          <Link to="/dashboard">
            <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition">
              <LayoutDashboard size={18} />
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Forbidden;
