import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../Payment/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const EmployeeList = () => {
  // --- Hooks & State ---
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // --- Fetch employees ---
  const {
    data: employees = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users?role");
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

  // --- Handlers ---

  // Handle verification Status
  const handleVerification = useCallback(
    (id) => {
      updateVerification(id);
    },
    [updateVerification]
  );

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
    [handleVerification]
  );

  // Sort Employee
  const sortedEmployees = useMemo(() => {
    const rolePriority = {
      Admin: 0,
      HR: 1,
      Employee: 2,
    };

    return [...employees].sort((a, b) => {
      const roleA = rolePriority[a.role] ?? 99;
      const roleB = rolePriority[b.role] ?? 99;
      return roleA - roleB;
    });
  }, [employees]);

  // React Table Setup
  const table = useReactTable({
    data: sortedEmployees,
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
            <Elements stripe={stripePromise}>
              <PaymentForm
                selectedEmployee={selectedEmployee}
                setShowModal={setShowModal}
                setSelectedEmployee={setSelectedEmployee}
              />
            </Elements>
          </div>
        </dialog>
      )}
    </section>
  );
};

export default EmployeeList;
