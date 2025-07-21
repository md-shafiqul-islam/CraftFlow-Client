import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FiDollarSign, FiShield, FiUserX } from "react-icons/fi";
import { useState } from "react";
import { useForm } from "react-hook-form";

const VerifiedEmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

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

  const { mutate: makeHR } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/users/${id}/make-hr`);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        toast.success("Employee promoted to HR.");
        queryClient.invalidateQueries({ queryKey: ["verified-employees"] });
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
        toast.success("Employee has been fired.");
        queryClient.invalidateQueries({ queryKey: ["verified-employees"] });
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
      queryClient.invalidateQueries({ queryKey: ["verified-employees"] });
      setSelectedEmployee(null);
      reset();
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.error || "Failed to update salary. Try again."
      );
    },
  });

  const handleMakeHR = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are promoting this employee to HR.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1a237e",
      confirmButtonText: "Yes, promote",
    });

    if (result.isConfirmed) {
      makeHR(id);
    }
  };

  const handleFireEmployee = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure fire the employee?",
      text: "This employee will be disabled from logging in!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1a237e",
      confirmButtonText: "Yes, fire!",
    });

    if (result.isConfirmed) {
      fireEmployee(id);
    }
  };

  const openSalaryModal = (emp) => {
    setSelectedEmployee(emp);
    reset({ salary: emp.salary });
  };

  // Form submit handler
  const handleUpdateSalary = (data) => {
    const parsedSalary = Number(data.salary);
    updateSalary({ id: selectedEmployee._id, newSalary: parsedSalary });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-accent">
        All Employee List
      </h2>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table w-full">
          <thead className="bg-base-300 text-base-content">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Role</th>
              <th>Salary</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isError ? (
              <tr>
                <td colSpan={7} className="text-center text-error py-6">
                  Failed to load data.
                </td>
              </tr>
            ) : isLoading ? (
              <tr>
                <td colSpan={7} className="text-center py-20">
                  <span className="loading loading-spinner text-secondary mx-auto"></span>
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-accent py-6">
                  No verified employees found.
                </td>
              </tr>
            ) : (
              employees.map((emp, idx) => (
                <tr key={emp._id}>
                  <td>{idx + 1}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.role}</td>
                  <td>{emp.salary}</td>
                  <td className="flex justify-center gap-2">
                    {emp.status === "fired" ? (
                      <span className="badge badge-error text-white px-3 py-2 text-sm font-semibold">
                        <FiUserX size={16} className="inline-block mr-1" />
                        Fired
                      </span>
                    ) : (
                      <>
                        {emp.role !== "HR" && (
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleMakeHR(emp._id)}
                            title="Promote to HR"
                          >
                            <FiShield size={16} />
                          </button>
                        )}

                        <button
                          className="btn btn-sm btn-warning text-white"
                          onClick={() => openSalaryModal(emp)}
                          title="Update Salary"
                        >
                          <FiDollarSign size={16} />
                        </button>

                        <button
                          className="btn btn-sm btn-error text-white"
                          onClick={() => handleFireEmployee(emp._id)}
                          title="Fire employee"
                        >
                          <FiUserX size={16} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Salary Update Modal */}
      {selectedEmployee && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <form
            onSubmit={handleSubmit(handleUpdateSalary)}
            className="modal-box text-base-content"
          >
            <h3 className="font-bold text-lg text-primary mb-4">
              Update Salary for {selectedEmployee.name}
            </h3>

            <label className="block mb-2 font-semibold">
              Current Salary: {selectedEmployee.salary}
            </label>

            <input
              type="number"
              {...register("salary", {
                required: "Salary is required",
                min: {
                  value: selectedEmployee.salary + 1,
                  message: `Salary must be greater than current salary (${selectedEmployee.salary})`,
                },
                valueAsNumber: true,
              })}
              className={`input input-bordered w-full mb-2 ${
                errors.salary ? "input-error" : ""
              }`}
            />
            {errors.salary && (
              <p className="text-error text-sm mb-2">{errors.salary.message}</p>
            )}

            <div className="modal-action mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="btn bg-base-200 text-base-content border border-error"
                onClick={() => {
                  setSelectedEmployee(null);
                  reset();
                }}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-primary hover:bg-accent-focus text-white"
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
