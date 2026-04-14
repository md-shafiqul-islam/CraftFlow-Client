const cases = [
  {
    title: "Startup Team Management",
    desc: "Small teams can manage employees, assign tasks, and track productivity without complex tools.",
  },
  {
    title: "HR Workflow Automation",
    desc: "HR teams can automate onboarding, verification, and employee lifecycle management.",
  },
  {
    title: "Remote Workforce Tracking",
    desc: "Track remote employees' working hours, tasks, and performance from anywhere.",
  },
  {
    title: "Payroll Transparency",
    desc: "Ensure accurate salary processing with clear breakdown and approval workflows.",
  },
  {
    title: "Performance Monitoring",
    desc: "Evaluate employee productivity using real-time analytics and reports.",
  },
  {
    title: "Organization Scaling",
    desc: "Easily scale from small teams to large organizations with structured role-based access.",
  },
];

const UseCases = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-primary">
            Real-World <span className="text-secondary">Use Cases</span>
          </h2>

          <p className="text-base-content/70 mt-3">
            Discover how CraftFlow simplifies employee management across
            different business scenarios.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-base-100 border border-base-300 hover:border-secondary/40 hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-base-content mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-base-content/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
