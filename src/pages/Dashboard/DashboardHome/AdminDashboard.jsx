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
import {
  FaUsers,
  FaUserShield,
  FaEnvelope,
  FaMoneyCheckAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const COLORS = ["#3b82f6", "#ec4899"];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["verifiedUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/verified");
      return res.data;
    },
  });

  const { data: payments = [], isLoading: loadingPayments } = useQuery({
    queryKey: ["all-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/all");
      return res.data;
    },
  });

  const { data: messages = [], isLoading: loadingMessages } = useQuery({
    queryKey: ["adminMessages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/messages");
      return res.data.slice(0, 5);
    },
  });

  const totalEmployees = users.filter(
    (u) => u.role === "Employee" && u.status === "active"
  ).length;

  const totalHRs = users.filter(
    (u) => u.role === "HR" && u.status === "active"
  ).length;

  const totalPendingPayroll = payments.filter(
    (p) => p.paymentStatus === "pending"
  ).length;

  const totalCompletedPayroll = payments.filter(
    (p) => p.paymentStatus === "completed"
  ).length;

  const totalMessages = messages.length;

  const pieData = [
    { name: "Employees", value: totalEmployees },
    { name: "HRs", value: totalHRs },
  ];

  const salaryData = [
    { month: "Jan", total: 21000 },
    { month: "Feb", total: 18000 },
    { month: "Mar", total: 24000 },
    { month: "Apr", total: 22000 },
    { month: "May", total: 20000 },
  ];

  if (loadingUsers || loadingPayments || loadingMessages) {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <SummaryCard
          label="Total Employees"
          count={totalEmployees}
          icon={<FaUsers />}
          color="bg-primary"
        />
        <SummaryCard
          label="Total HRs"
          count={totalHRs}
          icon={<FaUserShield />}
          color="bg-secondary"
        />
        <SummaryCard
          label="Pending Payroll"
          count={totalPendingPayroll}
          icon={<FaMoneyCheckAlt />}
          color="bg-warning"
        />
        <SummaryCard
          label="Completed Payroll"
          count={totalCompletedPayroll}
          icon={<FaCheckCircle />}
          color="bg-success"
        />
        <SummaryCard
          label="Messages"
          count={totalMessages}
          icon={<FaEnvelope />}
          color="bg-accent"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-base-200 p-4 shadow-md rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Role Distribution</h2>
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

        <div className="bg-base-200 p-4 shadow-md rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Monthly Salary Expense</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salaryData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#6366f1" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <LinkButton
          to="/dashboard/all-employee-list"
          label="Manage Employees"
        />
        <LinkButton to="/dashboard/payroll" label="View Payroll" />
        <LinkButton to="/dashboard/messages" label="Messages" />
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

export default AdminDashboard;
