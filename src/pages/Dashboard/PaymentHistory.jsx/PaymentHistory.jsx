import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["payment-history", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments?email=${user.email}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-accent">
        Salary Payment History
      </h2>

      {isLoading ? (
        <div className="text-center py-10">
          <span className="loading loading-spinner text-secondary"></span>
        </div>
      ) : isError ? (
        <div className="text-center text-error py-10">
          Failed to load payment history.
        </div>
      ) : data?.payments?.length === 0 ? (
        <div className="text-center text-accent py-10">
          No payment history found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
          <table className="table w-full">
            <thead className="bg-base-300">
              <tr>
                <th>Month</th>
                <th>Year</th>
                <th>Amount</th>
                <th>Transaction ID</th>
                <th>Requested</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.payments?.map((p, idx) => (
                <tr key={idx}>
                  <td>
                    {p.monthName ||
                      new Date(2000, p.month - 1).toLocaleString("default", {
                        month: "long",
                      })}
                  </td>
                  <td>{p.year}</td>
                  <td>${parseInt(p.salary).toLocaleString()}</td>
                  <td>{p.transactionId}</td>
                  <td>{new Date(p.requestedAt).toLocaleDateString()}</td>
                  <td>{p.paymentStatus}</td>
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
