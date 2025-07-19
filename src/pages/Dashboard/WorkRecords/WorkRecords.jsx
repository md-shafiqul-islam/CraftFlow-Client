import { useState, useEffect, useMemo } from "react";
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

  // Fetch employees for dropdown
  const { data: employees = [], isLoading: employeesLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users?role=Employee");
      return res.data;
    },
  });

  // Fetch all work records from backend (no pagination on backend)
  const {
    data: allRecords = [],
    isLoading: recordsLoading,
    isError,
  } = useQuery({
    queryKey: ["work-records"],
    queryFn: async () => {
      const res = await axiosSecure.get("/work-sheet");
      return res.data;
    },
  });

  // Filter work records based on employee and month filter
  const filteredRecords = useMemo(() => {
    return allRecords.filter((record) => {
      const matchesEmployee =
        !selectedEmployee || record.created_by === selectedEmployee;
      const recordDate = new Date(record.date);
      const recordMonth = recordDate.getMonth() + 1;
      const matchesMonth =
        !selectedMonth || Number(selectedMonth) === recordMonth;
      return matchesEmployee && matchesMonth;
    });
  }, [allRecords, selectedEmployee, selectedMonth]);

  // Pagination logic
  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);

  // Paginated records for current page
  const paginatedRecords = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredRecords.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRecords, page]);

  // Total hours from filtered data
  const totalHours = filteredRecords.reduce(
    (sum, record) => sum + Number(record.hours || 0),
    0
  );

  // Reset page if filters change and current page exceeds total pages
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-accent">
        Employee Work Records
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Employee Select */}
        <select
          className="select select-bordered w-full sm:max-w-xs"
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          disabled={employeesLoading}
        >
          <option value="">All Employees</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp.email || emp._id}>
              {emp.name}
            </option>
          ))}
        </select>

        {/* Month Select */}
        <select
          className="select select-bordered w-full sm:max-w-xs"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {monthOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Total Hours */}
      <div className="bg-base-100 p-4 rounded-md shadow mb-4">
        <h3 className="text-lg font-semibold text-base-content/80">
          Total Work Hours:{" "}
          <span className="text-accent">{totalHours.toFixed(2)}</span>
        </h3>
      </div>

      {/* Table & Pagination */}
      {recordsLoading ? (
        <div className="text-center py-10">
          <span className="loading loading-spinner text-secondary"></span>
        </div>
      ) : isError ? (
        <div className="text-center text-error py-10">
          Failed to load work records.
        </div>
      ) : paginatedRecords.length === 0 ? (
        <p className="text-center text-base-content/60">No records found.</p>
      ) : (
        <>
          <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee Name</th>
                  <th>Date</th>
                  <th>Task</th>
                  <th>Hours</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRecords.map((record, idx) => {
                  const emp = employees.find(
                    (e) => (e.email || e._id) === record.created_by
                  );
                  return (
                    <tr key={record._id || idx}>
                      <td>{(page - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                      <td>{emp?.name || "Unknown"}</td>
                      <td>{new Date(record.date).toLocaleDateString()}</td>
                      <td>{record.task}</td>
                      <td>{record.hours}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
