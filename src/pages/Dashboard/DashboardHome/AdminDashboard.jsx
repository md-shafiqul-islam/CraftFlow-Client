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

const COLORS = ["#6366f1", "#ec4899"];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // ---------------- USERS ----------------
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["verifiedUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/verified");
      return res.data;
    },
  });

  // ---------------- PAYMENTS ----------------
  const { data: payments = [], isLoading: loadingPayments } = useQuery({
    queryKey: ["all-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/all");
      return res.data;
    },
  });

  // ---------------- MESSAGES ----------------
  const { data: messages = [], isLoading: loadingMessages } = useQuery({
    queryKey: ["adminMessages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/messages");
      return res.data.slice(0, 5);
    },
  });

  // ---------------- METRICS ----------------
  const totalEmployees = users?.filter(
    (u) => u.role === "Employee" && u.status === "active",
  ).length;

  const totalHRs = users?.filter(
    (u) => u.role === "HR" && u.status === "active",
  ).length;

  const totalPendingPayroll = payments?.filter(
    (p) => p.paymentStatus === "pending",
  ).length;

  const totalCompletedPayroll = payments?.filter(
    (p) => p.paymentStatus === "completed",
  ).length;

  const totalMessages = messages?.length;

  const pieData = [
    { name: "Employees", value: totalEmployees || 0 },
    { name: "HR", value: totalHRs || 0 },
  ];

  const salaryData = [
    { month: "Jan", total: 21000 },
    { month: "Feb", total: 18000 },
    { month: "Mar", total: 24000 },
    { month: "Apr", total: 22000 },
    { month: "May", total: 20000 },
  ];

  const isLoading = loadingUsers || loadingPayments || loadingMessages;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <span className="loading loading-spinner text-secondary"></span>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* ================= HEADER ================= */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-base-content">
          Welcome back,{" "}
          <span className="text-primary">{user?.displayName || "Admin"}</span>
        </h2>
        <p className="text-base-content/60 text-sm mt-1">
          Here’s your system overview and performance summary
        </p>
      </div>

      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard label="Employees" value={totalEmployees} icon={<FaUsers />} />
        <KpiCard label="HR Team" value={totalHRs} icon={<FaUserShield />} />
        <KpiCard
          label="Pending Payroll"
          value={totalPendingPayroll}
          icon={<FaMoneyCheckAlt />}
        />
        <KpiCard
          label="Completed Payroll"
          value={totalCompletedPayroll}
          icon={<FaCheckCircle />}
        />
        <KpiCard label="Messages" value={totalMessages} icon={<FaEnvelope />} />
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PIE CHART */}
        <div className="bg-base-100 border border-base-300 rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Role Distribution</h3>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
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

        {/* BAR CHART */}
        <div className="bg-base-100 border border-base-300 rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Monthly Salary Expense</h3>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={salaryData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#6366f1" barSize={35} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ActionButton to="/dashboard/all-employee-list">
          Manage Employees
        </ActionButton>
        <ActionButton to="/dashboard/payroll">Payroll System</ActionButton>
        <ActionButton to="/dashboard/messages">View Messages</ActionButton>
      </div>
    </section>
  );
};

export default AdminDashboard;

/* ================= KPI CARD ================= */
function KpiCard({ label, value, icon }) {
  return (
    <div className="bg-base-100 border border-base-300 rounded-xl p-5 flex flex-col gap-2 hover:shadow-md transition">
      <div className="text-secondary text-xl">{icon}</div>
      <h3 className="text-2xl font-bold">{value || 0}</h3>
      <p className="text-sm text-base-content/60">{label}</p>
    </div>
  );
}

/* ================= ACTION BUTTON ================= */
function ActionButton({ to, children }) {
  return (
    <Link
      to={to}
      className="btn bg-secondary text-base-100 hover:opacity-90 w-full rounded-lg"
    >
      {children}
    </Link>
  );
}
