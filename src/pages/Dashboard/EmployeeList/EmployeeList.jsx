import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const EmployeeList = () => {
  // --- Hooks & State ---
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // --- Fetch employees ---
  const {
    data: employees = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users?role=Employee");
      return res.data;
    },
  });

  // --- Mutations ---

  // Update Verification Status
  const { mutate: updateVerification } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/users/${id}/update-verification`);
      return res.data;
    },

    onSuccess: () => {
      refetch();
    },

    onError: (error) => {
      const message =
        error?.response?.data?.error || "Failed to update verification status";
      toast.error(message);
    },
  });

  // Submit Payment Request
  const { mutate: submitPayment } = useMutation({
    mutationFn: async (paymentData) => {
      const res = await axiosSecure.post("/payment", paymentData);
      return res.data;
    },

    onSuccess: (data) => {
      if (data?.insertedId) {
        toast.success("Payment request created!");
        setShowModal(false);
        setSelectedEmployee(null);
        reset();

        queryClient.invalidateQueries(["payments"]);
      } else {
        toast.error("Failed to submit payment request. Try again.");
      }
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to submit payment request.";
      toast.error(message);
    },
  });

  // --- Handlers ---

  // Handle verification Status
  const handleVerification = useCallback(
    (id) => {
      updateVerification(id);
    },
    [updateVerification]
  );

  // Handle payment form submit
  const handlePayment = (data) => {
    const paymentData = {
      employeeId: selectedEmployee._id,
      name: selectedEmployee.name,
      email: selectedEmployee.email,
      ...data,
      status: "pending",
      requestedAt: new Date().toISOString(),
    };

    submitPayment(paymentData);
  };

  // Table columns
  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Verified",
        cell: ({ row }) => {
          const user = row.original;
          return user.isVerified ? (
            <button
              onClick={() => handleVerification(user._id)}
              className="text-green-600 cursor-pointer"
              title="Click to un-verify"
            >
              ✔️
            </button>
          ) : (
            <button
              onClick={() => handleVerification(user._id)}
              className="text-red-500 cursor-pointer"
              title="Click to verify"
            >
              <FaTimes />
            </button>
          );
        },
      },
      {
        header: "Bank Account",
        accessorKey: "bank_account_no",
      },
      {
        header: "Salary",
        accessorKey: "salary",
      },
      {
        header: "Pay",
        cell: ({ row }) => {
          const employee = row.original;
          return (
            <button
              className="btn btn-sm btn-primary text-white"
              onClick={() => {
                setSelectedEmployee(employee);
                setShowModal(true);
                reset({
                  salary: employee.salary,
                  month: "",
                  year: "",
                });
              }}
              disabled={!employee.isVerified}
            >
              Pay
            </button>
          );
        },
      },
      {
        header: "Details",
        cell: () => (
          <button className="btn btn-sm btn-secondary text-white">
            Details
          </button>
        ),
      },
    ],
    [handleVerification, reset]
  );

  // React Table Setup
  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Loading State
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-secondary"></span>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-accent">Employee List</h2>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table w-full">
          <thead className="bg-base-300 text-base-content">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-sm font-medium px-4 py-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="text-sm px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for payment */}
      {showModal && selectedEmployee && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              Pay{" "}
              <span className="text-secondary">{selectedEmployee.name}</span>
            </h3>

            <form onSubmit={handleSubmit(handlePayment)} className="space-y-4">
              <input
                type="text"
                readOnly
                className="input input-bordered w-full cursor-not-allowed"
                {...register("salary")}
              />

              <input
                type="text"
                placeholder="Enter month (e.g., July)"
                className="input input-bordered w-full"
                {...register("month", { required: true })}
              />
              {errors.month && (
                <p className="text-red-500 text-sm">Month is required</p>
              )}

              <input
                type="number"
                placeholder="Enter year (e.g., 2025)"
                className="input input-bordered w-full"
                {...register("year", { required: true })}
              />
              {errors.year && (
                <p className="text-red-500 text-sm">Year is required</p>
              )}

              <div className="modal-action">
                <button type="submit" className="btn btn-success text-white">
                  Submit
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedEmployee(null);
                    reset();
                  }}
                  className="btn"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </section>
  );
};

export default EmployeeList;
