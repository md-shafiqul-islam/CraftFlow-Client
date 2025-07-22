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

  const { data: tasks = [], isLoading: loadingTasks } = useQuery({
    queryKey: ["employeeTasks", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/work-sheet/me?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: payments = [], isLoading: loadingPayments } = useQuery({
    queryKey: ["employeePayments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const totalTasks = tasks?.length || 0;
  const totalPayments = payments?.payments?.length || 0;
  const totalHours =
    tasks?.reduce((acc, task) => acc + Number(task.hours || 0), 0) || 0;

  const pieData = [
    { name: "Tasks", value: totalTasks },
    { name: "Payments", value: totalPayments },
  ];

  const taskHoursByMonth = tasks.reduce((acc, task) => {
    const month = new Date(task.date).toLocaleString("default", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + Number(task.hours || 0);
    return acc;
  }, {});

  const hoursData = Object.keys(taskHoursByMonth).map((month) => ({
    month,
    hours: taskHoursByMonth[month],
  }));

  if (loadingTasks || loadingPayments) {
    return (
      <div className="p-10 text-center text-lg">
        <span className="loading loading-spinner text-secondary mx-auto"></span>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <h2 className="text-2xl font-bold text-accent">
        Welcome, {user?.displayName || "Employee"}
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <SummaryCard
          label="Total Tasks"
          count={totalTasks}
          icon={<FaTasks />}
          color="bg-primary"
        />
        <SummaryCard
          label="Total Work Hours"
          count={totalHours}
          icon={<FaClock />}
          color="bg-accent"
        />
        <SummaryCard
          label="Total Payments"
          count={totalPayments}
          icon={<FaMoneyCheckAlt />}
          color="bg-warning"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-base-200 p-4 shadow-md rounded-xl">
          <h2 className="text-lg font-semibold mb-4">
            Task & Payment Overview
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-base-200 p-4 shadow-md rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Monthly Work Hours</h2>
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
            <p className="text-center text-gray-500">No task data available.</p>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LinkButton to="/dashboard/my-task" label="My Tasks" />
        <LinkButton to="/dashboard/payment-history" label="My Payments" />
      </div>
    </section>
  );
};

function SummaryCard({ label, count, icon, color }) {
  return (
    <div
      className={`shadow-md ${color} text-white p-6 rounded-lg flex flex-col items-center justify-center`}
    >
      <div className="text-2xl">{icon}</div>
      <p className="text-2xl font-bold">{count}</p>
      <p className="text-sm opacity-90">{label}</p>
    </div>
  );
}

function LinkButton({ to, label }) {
  return (
    <Link
      to={to}
      className="btn bg-accent rounded-full text-lg w-full transition-all duration-300 text-center text-white"
    >
      {label}
    </Link>
  );
}

export default EmployeeDashboard;
