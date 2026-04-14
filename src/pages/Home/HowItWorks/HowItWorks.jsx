import { UserPlus, ShieldCheck, ClipboardList, BarChart3 } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: UserPlus,
    title: "Add & Manage Employees",
    description:
      "Admin and HR can add employees, assign roles, and manage profiles from a centralized system.",
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: "Role-Based Access",
    description:
      "Secure dashboards for Admin, HR, and Employees ensure controlled access and data protection.",
  },
  {
    id: 3,
    icon: ClipboardList,
    title: "Track Work & Attendance",
    description:
      "Employees log their work, while the system tracks attendance, tasks, and daily productivity.",
  },
  {
    id: 4,
    icon: BarChart3,
    title: "Analyze & Optimize",
    description:
      "Generate reports, monitor performance, and make data-driven decisions for better growth.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* 🔥 Heading */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            How <span className="text-primary">CraftFlow</span> Works
          </h2>

          <p className="text-base-content/70 text-sm md:text-base">
            A simple and structured workflow designed to help you manage your
            team efficiently from start to finish.
          </p>
        </div>

        {/* 🔥 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="relative bg-base-300 border border-base-300 rounded-2xl p-6 text-center
                hover:shadow-xl hover:border-primary/40 transition-all duration-300"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shadow">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4 mt-4">
                  <Icon className="text-primary size-6" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-base-content mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-base-content/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
