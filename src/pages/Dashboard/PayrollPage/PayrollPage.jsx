import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "@tanstack/react-query";

const Payroll = () => {
  const axiosSecure = useAxiosSecure();
  const [processingId, setProcessingId] = useState(null);

  // ================= FETCH PAYMENTS =================
  const {
    data: payments = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["payment-pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/all");
      return res.data;
    },
  });

  // ================= PAY SALARY =================
  const { mutate: paySalary } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch("/payments/salary", { id });
      return res.data;
    },
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      Swal.fire("Error!", "Payment failed. Try again.", "error");
    },
    onSettled: () => setProcessingId(null),
  });

  const handlePaySalary = async (id) => {
    const result = await Swal.fire({
      title: "Confirm Payment?",
      text: "This will mark salary as paid.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      confirmButtonText: "Yes, Pay",
    });

    if (result.isConfirmed) {
      setProcessingId(id);
      paySalary(id);
    }
  };

  const isEmpty = !payments || payments.length === 0;

  const paidCount = payments.filter((p) => p.paymentDate).length;
  const pendingCount = payments.length - paidCount;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-base-content">
            Payroll Management
          </h2>
          <p className="text-sm text-base-content/60">
            Process and manage employee salary payments
          </p>
        </div>

        {/* Summary */}
        <div className="flex gap-3 text-sm">
          <span className="badge badge-warning">Pending: {pendingCount}</span>
          <span className="badge badge-success">Paid: {paidCount}</span>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner text-secondary"></span>
        </div>
      ) : isError ? (
        <p className="text-center text-error py-10">
          Failed to load payroll data.
        </p>
      ) : isEmpty ? (
        <p className="text-center text-base-content/60 py-10">
          No payroll records found.
        </p>
      ) : (
        <div className="overflow-x-auto bg-base-100 border border-base-300 rounded-xl">
          <table className="table w-full">
            {/* ================= HEAD ================= */}
            <thead className="bg-base-200">
              <tr>
                <th>Employee</th>
                <th>Salary</th>
                <th>Month</th>
                <th>Year</th>
                <th>Status</th>
                <th>Date</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            {/* ================= BODY ================= */}
            <tbody>
              {payments.map((item) => {
                const isPaid = !!item.paymentDate;

                return (
                  <tr key={item._id} className="hover">
                    <td className="font-medium">{item.name}</td>

                    <td>${Number(item.salary).toLocaleString()}</td>

                    <td>
                      {new Date(2000, item.month - 1).toLocaleString(
                        "default",
                        { month: "long" },
                      )}
                    </td>

                    <td>{item.year}</td>

                    {/* STATUS */}
                    <td>
                      {isPaid ? (
                        <span className="badge badge-success text-white">
                          Paid
                        </span>
                      ) : (
                        <span className="badge badge-warning">Pending</span>
                      )}
                    </td>

                    {/* DATE */}
                    <td className="text-sm text-base-content/70">
                      {item.paymentDate
                        ? new Date(item.paymentDate).toLocaleDateString()
                        : "-"}
                    </td>

                    {/* ACTION */}
                    <td className="text-center">
                      <button
                        onClick={() => handlePaySalary(item._id)}
                        disabled={isPaid || processingId === item._id}
                        className={`btn btn-sm min-w-[80px] ${
                          isPaid
                            ? "btn-success text-white cursor-not-allowed"
                            : "btn-primary"
                        }`}
                      >
                        {processingId === item._id ? (
                          <span className="loading loading-spinner"></span>
                        ) : isPaid ? (
                          "Paid"
                        ) : (
                          "Pay"
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default Payroll;
