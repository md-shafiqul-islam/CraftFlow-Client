import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import { FaTimes } from "react-icons/fa";
import { Link } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import PaymentForm from "../Payment/PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const EmployeeList = () => {
  const axiosSecure = useAxiosSecure();

  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // ================= FETCH =================
  const {
    data: employees = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/employees");
      return res.data || [];
    },
  });

  // ================= MUTATION =================
  const { mutate: updateVerification, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/users/${id}/update-verification`);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Verification status updated");
      refetch();
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.error || "Failed to update verification status",
      );
    },
  });

  // ================= HANDLER =================
  const handleVerification = useCallback(
    (id) => {
      updateVerification(id);
    },
    [updateVerification],
  );

  // ================= TABLE COLUMNS =================
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

          return (
            <button
              onClick={() => handleVerification(user._id)}
              className={`cursor-pointer font-bold ${
                user.isVerified ? "text-green-500" : "text-red-500"
              }`}
              title="Toggle verification"
              disabled={isPending}
            >
              {user.isVerified ? "✔ Verified" : <FaTimes />}
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
        cell: ({ getValue }) => (
          <span>${Number(getValue() || 0).toLocaleString()}</span>
        ),
      },
      {
        header: "Pay",
        cell: ({ row }) => {
          const emp = row.original;

          return (
            <button
              className="btn btn-sm btn-primary text-white"
              disabled={!emp.isVerified}
              onClick={() => {
                setSelectedEmployee(emp);
                setShowModal(true);
              }}
            >
              Pay
            </button>
          );
        },
      },
      {
        header: "Details",
        cell: ({ row }) => {
          const emp = row.original;

          return (
            <Link
              to={`/dashboard/employee-details/${emp._id}`}
              className="btn btn-sm btn-secondary text-white"
            >
              Details
            </Link>
          );
        },
      },
    ],
    [handleVerification, isPending],
  );

  // ================= TABLE =================
  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
  if (isError) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-error">
        Failed to load employee data.
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-base-content">
          Employee Management
        </h2>
        <p className="text-sm text-base-content/60">
          Manage verification, salary and payments
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-base-100 border border-base-300 rounded-xl shadow-sm">
        <table className="table w-full">
          {/* HEAD */}
          <thead className="bg-base-200 text-base-content">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-sm px-4 py-3">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* BODY */}
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-10 text-base-content/60"
                >
                  No employees found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAYMENT MODAL */}
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

            {/* CLOSE */}
            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => {
                  setShowModal(false);
                  setSelectedEmployee(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
};

export default EmployeeList;
