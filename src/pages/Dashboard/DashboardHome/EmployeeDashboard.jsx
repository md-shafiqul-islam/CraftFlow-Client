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

import { FaTasks, FaMoneyCheckAlt, FaClock } from "react-icons/fa";
import { Link } from "react-router";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const COLORS = ["#3b82f6", "#f59e0b"];

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ================= TASKS =================
  const { data: tasks = [], isLoading: loadingTasks } = useQuery({
    queryKey: ["employeeTasks", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/work-sheet/me?email=${user?.email}`);
      return res.data || [];
    },
    enabled: !!user?.email,
  });

  // ================= PAYMENTS =================
  const { data: paymentsData, isLoading: loadingPayments } = useQuery({
    queryKey: ["employeePayments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const payments = paymentsData?.payments || [];

  // ================= CALCULATIONS =================
  const totalTasks = tasks.length;

  const totalPayments = payments.length;

  const totalHours = tasks.reduce((sum, t) => sum + Number(t.hours || 0), 0);

  // ================= PIE DATA =================
  const pieData = [
    { name: "Tasks", value: totalTasks },
    { name: "Payments", value: totalPayments },
  ];

  // ================= MONTHLY HOURS =================
  const hoursByMonth = tasks.reduce((acc, task) => {
    if (!task?.date) return acc;

    const month = new Date(task.date).toLocaleString("default", {
      month: "short",
    });

    acc[month] = (acc[month] || 0) + Number(task.hours || 0);

    return acc;
  }, {});

  const hoursData = Object.entries(hoursByMonth).map(([month, hours]) => ({
    month,
    hours,
  }));

  // ================= LOADING =================
  if (loadingTasks || loadingPayments) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner text-secondary"></span>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-base-content">
          Welcome, {user?.displayName || "Employee"}
        </h2>
        <p className="text-sm text-base-content/60">
          Your activity overview and performance summary
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          label="Total Tasks"
          count={totalTasks}
          icon={<FaTasks />}
          color="bg-primary"
        />

        <SummaryCard
          label="Total Hours"
          count={totalHours}
          icon={<FaClock />}
          color="bg-accent"
        />

        <SummaryCard
          label="Payments"
          count={totalPayments}
          icon={<FaMoneyCheckAlt />}
          color="bg-warning"
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PIE CHART */}
        <div className="bg-base-100 border border-base-300 p-4 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Activity Overview</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div className="bg-base-100 border border-base-300 p-4 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Monthly Work Hours</h3>

          {hoursData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={hoursData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="#3b82f6" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-base-content/60">
              No work data available
            </p>
          )}
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LinkButton to="/dashboard/my-task" label="My Tasks" />

        <LinkButton to="/dashboard/payment-history" label="Payment History" />
      </div>
    </section>
  );
};

export default EmployeeDashboard;

// ================= COMPONENTS =================

function SummaryCard({ label, count, icon, color }) {
  return (
    <div
      className={`p-6 rounded-xl text-white shadow-sm flex flex-col items-center justify-center ${color}`}
    >
      <div className="text-2xl">{icon}</div>
      <p className="text-2xl font-bold">{count}</p>
      <p className="text-sm opacity-90">{label}</p>
    </div>
  );
}

function LinkButton({ to, label }) {
  return (
    <Link to={to} className="btn btn-primary text-white rounded-full w-full">
      {label}
    </Link>
  );
}
