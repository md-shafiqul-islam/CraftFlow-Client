import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FiDollarSign, FiShield, FiUserX } from "react-icons/fi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaThLarge, FaThList } from "react-icons/fa";

const VerifiedEmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewMode, setViewMode] = useState("table");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // ================= FETCH EMPLOYEES =================
  const {
    data: employees = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["verified-employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/verified");
      return res.data;
    },
  });

  // ================= MUTATIONS =================
  const { mutate: makeHR } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/users/${id}/make-hr`);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        toast.success("Promoted to HR successfully.");
        queryClient.invalidateQueries(["verified-employees"]);
      } else {
        toast.error("Promotion failed.");
      }
    },
    onError: () => toast.error("Something went wrong."),
  });

  const { mutate: fireEmployee } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/users/${id}/fire`);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        toast.success("Employee fired successfully.");
        queryClient.invalidateQueries(["verified-employees"]);
      } else {
        toast.error("Failed to fire employee.");
      }
    },
    onError: () => toast.error("Something went wrong."),
  });

  const { mutate: updateSalary } = useMutation({
    mutationFn: async ({ id, newSalary }) => {
      const res = await axiosSecure.patch(`/users/${id}/update-salary`, {
        newSalary,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Salary updated successfully.");
      queryClient.invalidateQueries(["verified-employees"]);
      setSelectedEmployee(null);
      reset();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error || "Failed to update salary.");
    },
  });

  // ================= ACTION HANDLERS =================
  const handleMakeHR = async (id) => {
    const result = await Swal.fire({
      title: "Promote to HR?",
      text: "This will give HR privileges to this employee.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      confirmButtonText: "Yes, promote",
    });

    if (result.isConfirmed) makeHR(id);
  };

  const handleFireEmployee = async (id) => {
    const result = await Swal.fire({
      title: "Fire Employee?",
      text: "They will lose access to the system.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, fire",
    });

    if (result.isConfirmed) fireEmployee(id);
  };

  const openSalaryModal = (emp) => {
    setSelectedEmployee(emp);
    reset({ salary: emp.salary });
  };

  const handleUpdateSalary = (data) => {
    updateSalary({
      id: selectedEmployee._id,
      newSalary: Number(data.salary),
    });
  };

  const isEmpty = !employees || employees.length === 0;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-base-content">
            Verified Employees
          </h2>
          <p className="text-sm text-base-content/60">
            Manage roles, salaries, and employee status
          </p>
        </div>

        <button
          onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}
          className="btn btn-outline btn-sm gap-2"
        >
          {viewMode === "table" ? <FaThLarge /> : <FaThList />}
          Toggle View
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner text-secondary"></span>
        </div>
      ) : isError ? (
        <p className="text-center text-error py-10">
          Failed to load employees.
        </p>
      ) : isEmpty ? (
        <p className="text-center text-base-content/60 py-10">
          No verified employees found.
        </p>
      ) : viewMode === "table" ? (
        /* ================= TABLE VIEW ================= */
        <div className="overflow-x-auto bg-base-100 border border-base-300 rounded-xl">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Salary</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp, idx) => (
                <tr key={emp._id}>
                  <td>{idx + 1}</td>
                  <td>{emp.name}</td>
                  <td className="text-sm">{emp.email}</td>
                  <td>{emp.role}</td>
                  <td>{emp.salary}</td>

                  <td className="flex justify-center gap-2">
                    {emp.status === "fired" ? (
                      <span className="badge badge-error text-white">
                        Fired
                      </span>
                    ) : (
                      <>
                        {emp.role !== "HR" && (
                          <button
                            onClick={() => handleMakeHR(emp._id)}
                            className="btn btn-xs btn-success"
                          >
                            <FiShield />
                          </button>
                        )}

                        <button
                          onClick={() => openSalaryModal(emp)}
                          className="btn btn-xs btn-warning text-white"
                        >
                          <FiDollarSign />
                        </button>

                        <button
                          onClick={() => handleFireEmployee(emp._id)}
                          className="btn btn-xs btn-error text-white"
                        >
                          <FiUserX />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* ================= CARD VIEW ================= */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {employees.map((emp) => (
            <div
              key={emp._id}
              className="bg-base-100 border border-base-300 rounded-xl p-5 space-y-2"
            >
              <h3 className="text-lg font-semibold">{emp.name}</h3>
              <p className="text-sm text-base-content/60">{emp.email}</p>

              <div className="text-sm space-y-1">
                <p>
                  <span className="font-semibold">Role:</span> {emp.role}
                </p>
                <p>
                  <span className="font-semibold">Salary:</span> {emp.salary}
                </p>
              </div>

              {emp.status === "fired" ? (
                <span className="badge badge-error text-white">Fired</span>
              ) : (
                <div className="flex gap-2 pt-2">
                  {emp.role !== "HR" && (
                    <button
                      onClick={() => handleMakeHR(emp._id)}
                      className="btn btn-xs btn-success"
                    >
                      HR
                    </button>
                  )}

                  <button
                    onClick={() => openSalaryModal(emp)}
                    className="btn btn-xs btn-warning text-white"
                  >
                    Salary
                  </button>

                  <button
                    onClick={() => handleFireEmployee(emp._id)}
                    className="btn btn-xs btn-error text-white"
                  >
                    Fire
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ================= MODAL ================= */}
      {selectedEmployee && (
        <dialog open className="modal">
          <form
            onSubmit={handleSubmit(handleUpdateSalary)}
            className="modal-box"
          >
            <h3 className="text-lg font-bold text-primary mb-4">
              Update Salary - {selectedEmployee.name}
            </h3>

            <input
              type="number"
              {...register("salary", {
                required: "Salary required",
                min: selectedEmployee.salary + 1,
              })}
              className="input input-bordered w-full"
            />

            {errors.salary && (
              <p className="text-error text-sm mt-1">{errors.salary.message}</p>
            )}

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => setSelectedEmployee(null)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </dialog>
      )}
    </section>
  );
};

export default VerifiedEmployeeList;
