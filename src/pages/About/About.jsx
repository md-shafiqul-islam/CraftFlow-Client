const About = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-primary">
            About <span className="text-secondary">CraftFlow</span>
          </h2>

          <p className="text-base-content/70 mt-3">
            A modern employee management system built for clarity, control, and
            scalability.
          </p>
        </div>

        <div className="space-y-6 text-base-content/70 leading-relaxed">
          <p>
            CraftFlow is a modern Employee Management System designed to
            simplify workforce operations for companies of all sizes. It
            centralizes employee data, task management, payroll, and performance
            tracking into a single platform.
          </p>

          <p>
            The system is built with role-based architecture, allowing Admins,
            HR teams, and Employees to access only what they need, ensuring
            security and efficiency.
          </p>

          <p>
            Our goal is to reduce manual HR workload and bring transparency to
            employee performance, attendance, and salary processing.
          </p>

          <div className="p-6 bg-base-100 border border-base-300 rounded-xl hover:border-secondary/40">
            <h3 className="text-lg font-semibold text-base-content mb-2">
              Why CraftFlow?
            </h3>
            <ul className="list-disc ml-5 space-y-2 text-sm">
              <li>Centralized employee data management</li>
              <li>Real-time employee tracking system</li>
              <li>Automated payroll processing</li>
              <li>Secure role-based dashboards</li>
              <li>Scalable for growing teams</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
