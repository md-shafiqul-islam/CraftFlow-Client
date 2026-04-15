import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const BAR_COLORS = [
  "#4ade80",
  "#60a5fa",
  "#facc15",
  "#f472b6",
  "#38bdf8",
  "#fb923c",
  "#a78bfa",
  "#34d399",
  "#818cf8",
  "#f87171",
  "#2dd4bf",
  "#fcd34d",
];

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const axiosSecure = useAxiosSecure();

  // ================= FETCH =================
  const {
    data: employee,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employee-details", employeeId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${employeeId}/details`);
      return res.data;
    },
    enabled: !!employeeId,
  });

  // ================= LOADING =================
  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner text-secondary"></span>
      </div>
    );
  }

  // ================= ERROR =================
  if (isError || !employee) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-error">
        Failed to load employee details.
      </div>
    );
  }

  // ================= SAFE DATA =================
  const salaryHistory = employee?.salaryHistory || [];

  const chartData = salaryHistory.map((item) => ({
    name: `${monthNames[item.month - 1] || "N/A"} ${item.year}`,
    salary: Number(item.salary || 0),
  }));

  const totalSalary = chartData.reduce((acc, cur) => acc + cur.salary, 0);

  const avgSalary = chartData.length
    ? (totalSalary / chartData.length).toFixed(2)
    : 0;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-base-content">
          Employee Details
        </h2>
        <p className="text-sm text-base-content/60">
          Salary analytics and performance overview
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-6 flex items-center gap-6">
        <img
          src={employee.photo || "/default-avatar.png"}
          alt={employee.name}
          className="w-20 h-20 rounded-full object-cover border border-secondary"
        />

        <div>
          <h1 className="text-2xl font-semibold">{employee.name}</h1>

          <p className="text-base-content/60">
            {employee.designation || "No designation"}
          </p>

          <p className="text-sm text-base-content/50">{employee.email}</p>
        </div>
      </div>

      {/* EMPTY STATE */}
      {chartData.length === 0 ? (
        <div className="text-center text-base-content/60 py-10">
          No salary history available
        </div>
      ) : (
        <>
          {/* CHART */}
          <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-4">
            <h3 className="text-lg font-semibold mb-4">Salary History</h3>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 20,
                  left: 0,
                  bottom: 40,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-25}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="salary" radius={[6, 6, 0, 0]} barSize={35}>
                  {chartData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={BAR_COLORS[index % BAR_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* STATS CARD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-base-100 border border-base-300 rounded-xl p-4 shadow-sm">
              <p className="text-sm text-base-content/60">
                Total Salary Earned
              </p>
              <h4 className="text-xl font-bold text-primary">
                {totalSalary.toLocaleString()}
              </h4>
            </div>

            <div className="bg-base-100 border border-base-300 rounded-xl p-4 shadow-sm">
              <p className="text-sm text-base-content/60">
                Average Monthly Salary
              </p>
              <h4 className="text-xl font-bold text-secondary">
                {Number(avgSalary).toLocaleString()}
              </h4>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default EmployeeDetails;
