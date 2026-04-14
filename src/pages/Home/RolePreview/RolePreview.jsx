import { Shield, Users, User } from "lucide-react";

const roles = [
  {
    id: 1,
    title: "Admin Panel",
    icon: Shield,
    features: [
      "Manage all employees & roles",
      "Approve payroll & salary requests",
      "Monitor system-wide analytics",
      "Control company operations",
    ],
  },
  {
    id: 2,
    title: "HR Dashboard",
    icon: Users,
    features: [
      "Verify and manage employees",
      "Handle promotions & role updates",
      "Track attendance & activity",
      "Manage payroll workflows",
    ],
  },
  {
    id: 3,
    title: "Employee Portal",
    icon: User,
    features: [
      "Submit daily work logs",
      "Track attendance & tasks",
      "View salary & payment history",
      "Monitor personal performance",
    ],
  },
];

const RolePreview = () => {
  return (
    <section className="py-20 bg-base-300">
      <div className="max-w-7xl mx-auto px-4">
        {/* 🔥 Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for Every <span className="text-primary">Role</span>
          </h2>

          <p className="text-base-content/70 text-sm md:text-base">
            CraftFlow provides dedicated tools for Admins, HR, and Employees —
            ensuring smooth collaboration, transparency, and control across the
            organization.
          </p>
        </div>

        {/* 🔥 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <div
                key={role.id}
                className="group bg-base-200 border border-base-300 rounded-2xl p-6 
                hover:shadow-xl hover:border-primary/40 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                  <Icon className="text-primary size-6" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-base-content mb-4 group-hover:text-primary transition">
                  {role.title}
                </h3>

                {/* Features */}
                <ul className="space-y-2">
                  {role.features.map((feature, index) => (
                    <li
                      key={index}
                      className="text-sm text-base-content/70 flex items-start gap-2"
                    >
                      <span className="text-primary mt-1">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Bottom Accent */}
                <div className="mt-6 h-[2px] w-10 bg-primary/60 rounded-full group-hover:w-16 transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RolePreview;
