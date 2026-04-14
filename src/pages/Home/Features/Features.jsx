import {
  Users,
  ClipboardList,
  LayoutDashboard,
  Wallet,
  BarChart3,
  UserCheck,
  Brain,
  Building2,
} from "lucide-react";
const features = [
  {
    id: 1,
    icon: ClipboardList,
    title: "Workflow Tracking",
    description:
      "Monitor daily tasks, working hours, and employee productivity in real-time.",
  },
  {
    id: 2,
    icon: Users,
    title: "Employee Management",
    description:
      "Manage employee profiles, roles, verification, and status from a single system.",
  },
  {
    id: 3,
    icon: LayoutDashboard,
    title: "Role-Based Dashboard",
    description:
      "Dedicated dashboards for Admin, HR, and Employees with secure access control.",
  },
  {
    id: 4,
    icon: Wallet,
    title: "Payroll Automation",
    description:
      "Automate salary processing with approval flows and accurate payroll tracking.",
  },
  {
    id: 5,
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Gain insights with reports and visual charts to evaluate employee performance.",
  },
  {
    id: 6,
    icon: UserCheck,
    title: "Attendance Monitoring",
    description:
      "Track attendance, working hours, and activity logs with precision.",
  },
  {
    id: 7,
    icon: Brain,
    title: "Smart HR Decisions",
    description:
      "Enable HR to manage promotions, verification, and decisions with structured workflows.",
  },
  {
    id: 8,
    icon: Building2,
    title: "Organization Control Panel",
    description:
      "Centralized admin panel to manage company-wide data and operations efficiently.",
  },
];
const Features = () => {
  return (
    <section className="py-20 bg-base-300">
      {" "}
      <div className="max-w-7xl mx-auto px-4">
        {" "}
        {/* 🔥 Heading */}{" "}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          {" "}
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {" "}
            Powerful Features for{" "}
            <span className="text-primary">Modern Teams</span>{" "}
          </h2>{" "}
          <p className="text-base-content/70 text-sm md:text-base leading-relaxed">
            {" "}
            CraftFlow provides everything you need to manage employees, track
            performance, and streamline HR operations — all in one unified
            platform.{" "}
          </p>{" "}
        </div>{" "}
        {/* 🔥 Grid */}{" "}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {" "}
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative bg-base-200 border border-base-300 rounded-2xl p-6 hover:border-primary/40 hover:shadow-xl transition-all duration-300"
              >
                {" "}
                {/* Icon */}{" "}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                  {" "}
                  <Icon className="text-primary size-6" />{" "}
                </div>{" "}
                {/* Title */}{" "}
                <h3 className="text-lg font-semibold text-base-content mb-2 group-hover:text-primary transition">
                  {" "}
                  {feature.title}{" "}
                </h3>{" "}
                {/* Description */}{" "}
                <p className="text-sm text-base-content/70 leading-relaxed">
                  {" "}
                  {feature.description}{" "}
                </p>{" "}
                {/* Glow effect */}{" "}
                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition pointer-events-none" />{" "}
              </div>
            );
          })}{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
};
export default Features;
