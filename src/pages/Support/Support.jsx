const supports = [
  {
    title: "Getting Started",
    desc: "Learn how to set up your organization, add employees, and configure your dashboard.",
  },
  {
    title: "Managing Employees",
    desc: "Understand how to add, update, verify, and manage employee roles efficiently.",
  },
  {
    title: "Dashboard Usage",
    desc: "Explore how Admin, HR, and Employees interact with their respective dashboards.",
  },
  {
    title: "Common Issues",
    desc: "Troubleshoot login issues, data syncing problems, and permission-related errors.",
  },
  {
    title: "Security & Data Protection",
    desc: "Learn how CraftFlow ensures secure data handling and role-based access control.",
  },
  {
    title: "Contact Support",
    desc: "Reach out to our support team for any technical or system-related assistance.",
  },
];

const Support = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-primary">
            Help & <span className="text-secondary">Support</span>
          </h2>

          <p className="text-base-content/70 mt-3">
            Everything you need to understand and use CraftFlow effectively.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {supports.map((item, i) => (
            <div
              key={i}
              className="p-6 bg-base-100 border border-base-300 rounded-xl hover:border-secondary/40 hover:shadow-md transition"
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

export default Support;
