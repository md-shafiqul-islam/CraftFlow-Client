import {
  Users,
  UserCheck,
  ClipboardList,
  Wallet,
  Activity,
  BarChart3,
  Clock,
  Building2,
} from "lucide-react";

const stats = [
  {
    id: 1,
    icon: Users,
    value: "120+",
    label: "Total Employees Managed",
  },
  {
    id: 2,
    icon: UserCheck,
    value: "35+",
    label: "Active HR & Admin Users",
  },
  {
    id: 3,
    icon: ClipboardList,
    value: "500+",
    label: "Tasks Tracked Monthly",
  },
  {
    id: 4,
    icon: Wallet,
    value: "98%",
    label: "Payroll Accuracy Rate",
  },
  {
    id: 5,
    icon: Activity,
    value: "99.9%",
    label: "System Uptime",
  },
  {
    id: 6,
    icon: BarChart3,
    value: "250+",
    label: "Reports Generated",
  },
  {
    id: 7,
    icon: Clock,
    value: "24/7",
    label: "Workflow Monitoring",
  },
  {
    id: 8,
    icon: Building2,
    value: "10+",
    label: "Departments Supported",
  },
];

const SystemStats = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            System <span className="text-primary">Overview</span>
          </h2>

          <p className="text-base-content/70 text-sm md:text-base">
            CraftFlow is built for scalability, reliability, and real-time
            workforce management across departments.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group bg-base-300 border border-base-300 rounded-2xl p-6
                shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                  <Icon className="text-primary size-6" />
                </div>

                {/* Value */}
                <h3 className="text-2xl font-bold text-base-content group-hover:text-primary transition">
                  {item.value}
                </h3>

                {/* Label */}
                <p className="text-sm text-base-content/70 mt-1">
                  {item.label}
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

export default SystemStats;
