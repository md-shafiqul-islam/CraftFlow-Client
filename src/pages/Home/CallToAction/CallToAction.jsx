import { ArrowRight, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router";

const CallToAction = () => {
  return (
    <section className="py-20 bg-base-200 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[300px] h-[300px] bg-base-300/20 blur-3xl rounded-full top-[-80px] left-[-80px]" />
        <div className="absolute w-[300px] h-[300px] bg-base-200/20 blur-3xl rounded-full bottom-[-80px] right-[-80px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-base-content">
          Ready to Manage Your Team{" "}
          <span className="text-primary">Smarter?</span>
        </h2>

        {/* Subtext */}
        <p className="text-base-content/70 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
          CraftFlow helps Admins, HR, and Employees work together in one unified
          system — track tasks, manage payroll, and improve productivity
          effortlessly.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary CTA */}
          <Link to="/dashboard">
            <button className="group flex items-center gap-2 px-7 py-3 rounded-lg bg-primary text-white font-semibold shadow-md hover:shadow-xl hover:bg-primary/90 transition-all duration-300">
              Go to Dashboard
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </button>
          </Link>

          {/* Login */}
          <Link to="/login">
            <button className="flex items-center gap-2 px-7 py-3 rounded-lg border border-base-300 text-base-content hover:bg-base-100 transition">
              <LogIn size={18} />
              Login
            </button>
          </Link>

          {/* Register (optional future route) */}
          <Link to="/register">
            <button className="flex items-center gap-2 px-7 py-3 rounded-lg bg-secondary text-white font-medium hover:opacity-90 transition">
              <UserPlus size={18} />
              Get Started
            </button>
          </Link>
        </div>

        {/* Bottom note */}
        <p className="text-xs text-base-content/50 mt-10">
          Secure • Role-based • Production-ready workforce management system
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
