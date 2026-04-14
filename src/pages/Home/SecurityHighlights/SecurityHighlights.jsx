import {
  ShieldCheck,
  Lock,
  UserCheck,
  KeyRound,
  FileCheck,
  Database,
  Eye,
  Server,
} from "lucide-react";

const securityFeatures = [
  {
    id: 1,
    icon: ShieldCheck,
    title: "Role-Based Access Control",
    description:
      "Strict permission system ensures Admin, HR, and Employees access only their allowed data.",
  },
  {
    id: 2,
    icon: Lock,
    title: "Secure Authentication",
    description:
      "Protected login system with encrypted credentials and session security.",
  },
  {
    id: 3,
    icon: UserCheck,
    title: "Verified User System",
    description:
      "Only approved employees can access sensitive company resources.",
  },
  {
    id: 4,
    icon: KeyRound,
    title: "Permission Management",
    description:
      "Granular control over what each role can view, edit, and manage.",
  },
  {
    id: 5,
    icon: FileCheck,
    title: "Audit Trail Logs",
    description: "Every action is tracked for transparency and accountability.",
  },
  {
    id: 6,
    icon: Database,
    title: "Secure Data Storage",
    description:
      "All employee and payroll data is stored with structured protection layers.",
  },
  {
    id: 7,
    icon: Eye,
    title: "Activity Monitoring",
    description:
      "System monitors critical actions to prevent unauthorized access.",
  },
  {
    id: 8,
    icon: Server,
    title: "Reliable Infrastructure",
    description:
      "Built for stability with scalable architecture and high availability.",
  },
];

const SecurityHighlights = () => {
  return (
    <section className="py-20 bg-base-300">
      <div className="max-w-7xl mx-auto px-4">
        {/* 🔐 Heading */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Security That Powers <span className="text-primary">CraftFlow</span>
          </h2>

          <p className="text-base-content/70 text-sm md:text-base">
            Built with enterprise-grade security principles to ensure your
            employee data, payroll, and workflows remain fully protected.
          </p>
        </div>

        {/* 🔐 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group bg-base-200 border border-base-300 rounded-2xl p-6
                shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                  <Icon className="text-primary size-6" />
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-base-content group-hover:text-primary transition">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-base-content/70 mt-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Accent line */}
                <div className="mt-4 h-[2px] w-10 bg-primary/60 rounded-full group-hover:w-16 transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SecurityHighlights;
