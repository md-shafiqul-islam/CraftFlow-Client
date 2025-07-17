import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EmployeeList = () => {
  const axiosSecure = useAxiosSecure();

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

  const { mutateAsync: toggleVerified } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/users/${id}/toggle-verified`);
      return res.data;
    },
    onSuccess: () => {
      refetch();
    },
  });

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
              onClick={() => toggleVerified(user._id)}
              className="text-green-600 cursor-pointer"
              title="Click to un-verify"
            >
              ✔️
            </button>
          ) : (
            <button
              onClick={() => toggleVerified(user._id)}
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
        cell: () => (
          <button className="btn btn-sm btn-primary text-white">Pay</button>
        ),
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
    []
  );

  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
    </section>
  );
};

export default EmployeeList;
