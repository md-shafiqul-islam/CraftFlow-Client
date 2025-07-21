import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FiShield, FiUserX } from "react-icons/fi";

const AllEmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

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

  const { mutate: fireUser } = useMutation({
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

  const handleFire = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure fire the employee?",
      text: "This employee will be disabled from logging in!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1a237e",
      confirmButtonText: "Yes, fire!",
    });

    if (result.isConfirmed) {
      fireUser(id);
    }
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
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isError ? (
              <tr>
                <td colSpan={6} className="text-center text-error py-6">
                  Failed to load data.
                </td>
              </tr>
            ) : isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-20">
                  <span className="loading loading-spinner text-secondary mx-auto"></span>
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-accent py-6">
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
                          className="btn btn-sm btn-error text-white"
                          onClick={() => handleFire(emp._id)}
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
    </section>
  );
};

export default AllEmployeeList;
