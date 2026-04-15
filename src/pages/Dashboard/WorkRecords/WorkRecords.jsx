import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const monthOptions = [
  { value: "", label: "All Months" },
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const ITEMS_PER_PAGE = 10;

const WorkRecords = () => {
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  // ================= EMPLOYEES =================
  const { data: employees = [], isLoading: employeesLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?role=Employee`);
      return res.data || [];
    },
  });

  // ================= WORK RECORDS =================
  const {
    data: allRecords = [],
    isLoading: recordsLoading,
    isError,
  } = useQuery({
    queryKey: ["work-records"],
    queryFn: async () => {
      const res = await axiosSecure.get("/work-sheet");
      return res.data || [];
    },
  });

  // ================= FILTERING =================
  const filteredRecords = useMemo(() => {
    return allRecords.filter((record) => {
      const employeeMatch =
        !selectedEmployee || record.created_by === selectedEmployee;

      const recordMonth = new Date(record.date).getMonth() + 1;

      const monthMatch =
        !selectedMonth || Number(selectedMonth) === recordMonth;

      return employeeMatch && monthMatch;
    });
  }, [allRecords, selectedEmployee, selectedMonth]);

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);

  const paginatedRecords = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredRecords.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRecords, page]);

  // ================= TOTAL HOURS =================
  const totalHours = useMemo(() => {
    return filteredRecords.reduce((sum, r) => sum + Number(r.hours || 0), 0);
  }, [filteredRecords]);

  // ================= RESET PAGE =================
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  // ================= UI STATES =================
  if (recordsLoading || employeesLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner text-secondary"></span>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-base-content">Work Records</h2>
        <p className="text-sm text-base-content/60">
          Track employee tasks and working hours
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4">
        {/* Employee Filter */}
        <select
          className="select select-bordered w-full sm:max-w-xs"
          value={selectedEmployee}
          onChange={(e) => {
            setSelectedEmployee(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Employees</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp.email || emp._id}>
              {emp.name}
            </option>
          ))}
        </select>

        {/* Month Filter */}
        <select
          className="select select-bordered w-full sm:max-w-xs"
          value={selectedMonth}
          onChange={(e) => {
            setSelectedMonth(e.target.value);
            setPage(1);
          }}
        >
          {monthOptions.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      {/* TOTAL HOURS CARD */}
      <div className="bg-base-100 border border-base-300 p-4 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold">
          Total Work Hours:{" "}
          <span className="text-primary font-bold">
            {totalHours.toFixed(2)}
          </span>
        </h3>
      </div>

      {/* ERROR */}
      {isError && (
        <div className="text-center text-error">
          Failed to load work records.
        </div>
      )}

      {/* EMPTY STATE */}
      {!isError && paginatedRecords.length === 0 && (
        <div className="text-center text-base-content/60 py-10">
          No work records found
        </div>
      )}

      {/* TABLE */}
      {!isError && paginatedRecords.length > 0 && (
        <>
          <div className="overflow-x-auto bg-base-100 border border-base-300 rounded-xl shadow-sm">
            <table className="table w-full">
              <thead className="bg-base-200">
                <tr>
                  <th>#</th>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Task</th>
                  <th>Hours</th>
                </tr>
              </thead>

              <tbody>
                {paginatedRecords.map((record, idx) => {
                  const emp = employees.find(
                    (e) => (e.email || e._id) === record.created_by,
                  );

                  return (
                    <tr key={record._id || idx} className="hover">
                      <td>{(page - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                      <td className="font-medium">{emp?.name || "Unknown"}</td>
                      <td>{new Date(record.date).toLocaleDateString()}</td>
                      <td>{record.task}</td>
                      <td className="font-semibold">{record.hours}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`btn btn-sm ${
                    page === i + 1 ? "btn-primary text-white" : "btn-outline"
                  }`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default WorkRecords;
