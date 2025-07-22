import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "@tanstack/react-query";

const Payroll = () => {
  const axiosSecure = useAxiosSecure();
  const [processingId, setProcessingId] = useState(null);

  const {
    data: pendingPayments = [],
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

  const { mutate: paySalary } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch("/payments/salary", { id });
      return res.data;
    },

    onSuccess: () => {
      refetch();
    },

    onError: () => {
      Swal.fire("Error!", "Something went wrong while paying.", "error");
    },

    onSettled: () => setProcessingId(null),
  });

  const handlePaySalary = async (id) => {
    const result = await Swal.fire({
      title: "Confirm Payment?",
      text: "Are you sure you want to pay this salary?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1a237e",
      confirmButtonText: "Yes, Pay!",
    });

    if (result.isConfirmed) {
      setProcessingId(id);
      paySalary(id);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-accent">Payroll Panel</h2>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table w-full">
          <thead className="bg-base-300 text-base-content">
            <tr>
              <th>Name</th>
              <th>Salary</th>
              <th>Month</th>
              <th>Year</th>
              <th>Payment Date</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {isError ? (
              <tr>
                <td colSpan={6} className="text-center text-error py-6">
                  Failed to load payment data.
                </td>
              </tr>
            ) : isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-20">
                  <span className="loading loading-spinner text-secondary mx-auto"></span>
                </td>
              </tr>
            ) : pendingPayments.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-accent py-6">
                  No payment requests found.
                </td>
              </tr>
            ) : (
              pendingPayments.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>${item.salary.toLocaleString()}</td>
                  <td>
                    {new Date(2000, item.month - 1).toLocaleString("default", {
                      month: "long",
                    })}
                  </td>
                  <td>{item.year}</td>
                  <td>
                    {item.paymentDate
                      ? new Date(item.paymentDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handlePaySalary(item._id)}
                      disabled={!!item.paymentDate || processingId === item._id}
                    >
                      {processingId === item._id ? (
                        <span className="loading loading-spinner"></span>
                      ) : item.paymentDate ? (
                        "Paid"
                      ) : (
                        "Pay"
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Payroll;
