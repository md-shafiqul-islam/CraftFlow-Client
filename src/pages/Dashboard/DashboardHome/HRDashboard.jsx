import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import { FaUsers, FaTasks, FaClock } from "react-icons/fa";
import { Link } from "react-router";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const COLORS = ["#3b82f6", "#ec4899"];

const HRDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // ================= EMPLOYEES =================
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["hr-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/employees");
      return res.data || [];
    },
  });

  // ================= TASKS =================
  const { data: tasks = [], isLoading: loadingTasks } = useQuery({
    queryKey: ["hr-tasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/work-sheet");
      return res.data || [];
    },
  });

  const isLoading = loadingUsers || loadingTasks;

  // ================= METRICS =================
  const totalEmployees = users.length;

  const totalTasks = tasks.length;

  const totalHours = useMemo(() => {
    return tasks.reduce((acc, task) => acc + Number(task.hours || 0), 0);
  }, [tasks]);

  // ================= PIE DATA =================
  const pieData = [
    { name: "Employees", value: totalEmployees },
    { name: "Tasks", value: totalTasks },
  ];

  // ================= MONTHLY HOURS =================
  const hoursData = useMemo(() => {
    const map = {};

    tasks.forEach((task) => {
      if (!task?.date) return;

      const month = new Date(task.date).toLocaleString("default", {
        month: "short",
      });

      map[month] = (map[month] || 0) + Number(task.hours || 0);
    });

    return Object.entries(map).map(([month, hours]) => ({
      month,
      hours,
    }));
  }, [tasks]);

  // ================= LOADING =================
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner text-secondary"></span>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* ================= HEADER ================= */}
      <div>
        <h2 className="text-2xl font-bold text-base-content">HR Dashboard</h2>
        <p className="text-sm text-base-content/60">
          Welcome, {user?.displayName || "HR Manager"}
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          label="Employees"
          count={totalEmployees}
          icon={<FaUsers />}
          color="bg-primary"
        />

        <SummaryCard
          label="Tasks"
          count={totalTasks}
          icon={<FaTasks />}
          color="bg-secondary"
        />

        <SummaryCard
          label="Work Hours"
          count={totalHours}
          icon={<FaClock />}
          color="bg-accent"
        />
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PIE */}
        <div className="bg-base-100 border border-base-300 rounded-xl p-4">
          <h3 className="font-semibold mb-4">Work Overview</h3>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={85}
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}
        <div className="bg-base-100 border border-base-300 rounded-xl p-4">
          <h3 className="font-semibold mb-4">Monthly Work Hours</h3>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={hoursData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#10b981" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <LinkButton to="/dashboard/employee-list" label="Manage Employees" />

        <LinkButton to="/dashboard/work-records" label="Work Records" />
      </div>
    </section>
  );
};

export default HRDashboard;

/* ================= COMPONENTS ================= */

function SummaryCard({ label, count, icon, color }) {
  return (
    <div
      className={`rounded-xl p-6 text-white shadow-md flex flex-col items-center justify-center ${color}`}
    >
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-2xl font-bold">{count}</p>
      <p className="text-sm opacity-90">{label}</p>
    </div>
  );
}

function LinkButton({ to, label }) {
  return (
    <Link
      to={to}
      className="btn bg-accent text-white rounded-full w-full text-lg hover:opacity-90"
    >
      {label}
    </Link>
  );
}
