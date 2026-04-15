import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

const Page404 = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-base-200 px-4 overflow-hidden">
      {/* 🔥 Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[300px] h-[300px] bg-primary/20 blur-3xl rounded-full top-[-80px] left-[-80px]" />
        <div className="absolute w-[300px] h-[300px] bg-secondary/20 blur-3xl rounded-full bottom-[-80px] right-[-80px]" />
      </div>

      {/* 🔥 Content */}
      <div className="relative text-center max-w-xl mx-auto">
        {/* 404 */}
        <h1 className="text-[90px] md:text-[120px] font-extrabold text-primary leading-none tracking-tight">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-base-content">
          Oops! Page not found
        </h2>

        {/* Description */}
        <p className="mt-3 text-base md:text-lg text-base-content/70">
          The page you're looking for doesn’t exist or might have been moved.
          Let’s get you back to managing your team efficiently.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Back Home */}
          <Link to="/">
            <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition cursor-pointer">
              <ArrowLeft size={18} />
              Back to Home
            </button>
          </Link>

          {/* Go Dashboard */}
          <Link to="/dashboard">
            <button className="px-6 py-3 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition cursor-pointer">
              Go to Dashboard
            </button>
          </Link>
        </div>

        {/* Small hint */}
        <p className="mt-6 text-sm text-base-content/50">
          If you think this is a mistake, please contact support.
        </p>
      </div>
    </section>
  );
};

export default Page404;
