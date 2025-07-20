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
  Legend,
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

// Predefined colors for bars
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
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-secondary"></span>
      </div>
    );
  }

  if (isError || !employee) {
    return (
      <div className="p-10 text-center text-error">
        Failed to fetch employee data.
      </div>
    );
  }

  const chartData = employee.salaryHistory
    .map(({ month, year, salary }) => ({
      name: `${monthNames[month - 1]} ${year}`,
      salary,
    }))
    .reverse();

  const totalSalary = chartData.reduce((acc, cur) => acc + cur.salary, 0);
  const avgSalary = (totalSalary / chartData.length).toFixed(2);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-accent">
        Employee Salary Details
      </h2>

      <div className="bg-base-100 rounded-lg shadow p-6">
        {/* Profile Section */}
        <div className="flex items-center gap-6 mb-8">
          <img
            src={employee.photo || "/default-avatar.png"}
            alt={employee.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-secondary"
          />
          <div>
            <h1 className="text-3xl font-semibold text-base-content">
              {employee.name}
            </h1>
            <p className="text-base text-base-content/70">
              {employee.designation}
            </p>
          </div>
        </div>

        {/* Bar Chart Section */}
        {chartData.length === 0 ? (
          <p className="text-center text-base-content/60">
            No salary history available.
          </p>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-30}
                  textAnchor="end"
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  interval={0}
                />
                <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                <Tooltip />
                <Bar dataKey="salary" radius={[6, 6, 0, 0]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={BAR_COLORS[index % BAR_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <p className="text-sm text-center text-base-content/70 mt-2">
              Salary
            </p>

            <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
              <div className="text-base-content/70 text-sm">
                Total Salary: <span className="font-medium">{totalSalary}</span>
                <br />
                Avg Monthly Salary:{" "}
                <span className="font-medium">{avgSalary}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default EmployeeDetails;
