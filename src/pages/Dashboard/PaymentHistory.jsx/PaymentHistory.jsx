import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const LIMIT = 5;

const getMonthName = (month) =>
  new Date(2000, month - 1).toLocaleString("default", {
    month: "long",
  });

const statusBadge = (status) => {
  switch (status) {
    case "completed":
      return "badge badge-success text-white";
    case "pending":
      return "badge badge-warning text-white";
    case "failed":
      return "badge badge-error text-white";
    default:
      return "badge badge-ghost";
  }
};

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["payment-history", user?.email, page],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments?email=${user.email}&page=${page}&limit=${LIMIT}`,
      );
      return res.data;
    },
  });

  const payments = data?.payments || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / LIMIT);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-base-content">
        CraftFlow Salary History
      </h2>

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-10">
          <span className="loading loading-spinner text-secondary"></span>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="text-center text-error py-10">
          Unable to load payment history.
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && payments.length === 0 && (
        <div className="text-center text-base-content/60 py-10">
          No salary records found yet.
        </div>
      )}

      {/* Table */}
      {!isLoading && !isError && payments.length > 0 && (
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
          <table className="table w-full">
            <thead className="bg-base-300">
              <tr>
                <th>Month</th>
                <th>Year</th>
                <th>Amount</th>
                <th>Transaction</th>
                <th>Requested</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p) => (
                <tr key={p._id}>
                  <td>{p.monthName || getMonthName(p.month)}</td>
                  <td>{p.year}</td>
                  <td>${Number(p.salary || 0).toLocaleString()}</td>
                  <td className="font-mono text-xs">
                    {p.transactionId || "N/A"}
                  </td>
                  <td>
                    {p.requestedAt
                      ? new Date(p.requestedAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td>
                    <span className={statusBadge(p.paymentStatus)}>
                      {p.paymentStatus || "unknown"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
    </section>
  );
};

export default PaymentHistory;
