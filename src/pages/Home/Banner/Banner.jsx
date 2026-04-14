import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 md:px-6 lg:px-8 bg-base-200 overflow-hidden">
      {/* 🔥 Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[400px] h-[400px] bg-primary/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-accent/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* 🔥 Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
          ⚡ Employee Management System
        </div>

        {/* 🔥 Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-base-content leading-tight mb-6">
          Manage Employees,{" "}
          <span className="text-primary inline-block min-w-[260px] md:min-w-[320px]">
            <Typewriter
              words={[
                "Track Performance",
                "Automate Payroll",
                "Monitor Attendance",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1500}
            />
          </span>
        </h1>

        {/* 🔥 Subtext */}
        <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto mb-10">
          CraftFlow helps you manage employees, track attendance, handle
          payroll, and monitor performance — all from one centralized dashboard.
        </p>

        {/* 🔥 CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          <a
            href="/dashboard"
            className="px-7 py-3 rounded-lg bg-primary text-white font-semibold shadow-md hover:shadow-lg hover:bg-primary/90 transition-all duration-300"
          >
            🚀 Go to Dashboard
          </a>

          <a
            href="/contact-us"
            className="px-7 py-3 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300"
          >
            Request Demo
          </a>
        </div>

        {/* 🔥 Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-base-100/60 backdrop-blur-md border border-base-300 rounded-xl p-5 shadow-sm">
            <h3 className="text-2xl font-bold text-primary">500+</h3>
            <p className="text-sm text-base-content/70">Employees Managed</p>
          </div>

          <div className="bg-base-100/60 backdrop-blur-md border border-base-300 rounded-xl p-5 shadow-sm">
            <h3 className="text-2xl font-bold text-primary">24/7</h3>
            <p className="text-sm text-base-content/70">Attendance Tracking</p>
          </div>

          <div className="bg-base-100/60 backdrop-blur-md border border-base-300 rounded-xl p-5 shadow-sm">
            <h3 className="text-2xl font-bold text-primary">100%</h3>
            <p className="text-sm text-base-content/70">Payroll Accuracy</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
