import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { Pencil, Trash2 } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Modal from "react-modal";

const MyTask = () => {
  // --- Hooks & State ---
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableTask, setEditableTask] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  // --- Fetch tasks ---
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-tasks", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/work-sheet/me?email=${user?.email}`);
      return res.data;
    },
  });

  // --- Mutations ---

  // Add task
  const { mutate: addTask, isLoading: isAdding } = useMutation({
    mutationFn: async (newTask) => {
      const response = await axiosSecure.post("/work-sheet", newTask);
      return response.data;
    },

    onSuccess: (data, variables) => {
      if (data?.insertedId) {
        toast.success("Task added successfully!");
        reset();
        setSelectedDate(new Date());

        queryClient.setQueryData(["my-tasks", user?.email], (old = []) => {
          const newTask = { ...variables, _id: data.insertedId };
          return [newTask, ...old].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
        });
      } else {
        toast.error("Failed to add task. Try again.");
      }
    },

    onError: () => {
      toast.error("Failed to add task. Please try again.");
    },
  });

  // Delete task
  const { mutate: deleteTask, isLoading: isDeleting } = useMutation({
    mutationFn: async (id) => {
      const response = await axiosSecure.delete(`/work-sheet/${id}`);
      return response.data;
    },

    onSuccess: (data) => {
      if (data?.deletedCount > 0) {
        toast.success("Deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["my-tasks", user?.email] });
      } else {
        toast.error("Failed to delete.");
      }
    },

    onError: () => {
      toast.error("Something went wrong while deleting. Please try again.");
    },
  });

  // Update task
  const { mutate: updateTask, isLoading: isUpdating } = useMutation({
    mutationFn: async (updatedTask) => {
      const response = await axiosSecure.put(
        `/work-sheet/${editableTask._id}`,
        updatedTask
      );
      return response.data;
    },

    onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        toast.success("Task updated successfully!");
        setIsModalOpen(false);
        reset();
        queryClient.invalidateQueries({ queryKey: ["my-tasks", user?.email] });
      } else {
        toast.error("No changes were made.");
      }
    },

    onError: () => {
      toast.error("Failed to update task. Please try again.");
    },
  });

  // --- Handlers ---

  // Create task
  const handleCreateTask = (data) => {
    const newTask = {
      ...data,
      created_by: user?.email,
      date: selectedDate.toLocaleDateString("en-CA"),
    };

    addTask(newTask);
  };

  // Confirm & delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This task will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      deleteTask(id);
    }
  };

  // Update task
  const handleUpdate = (data) => {
    const updatedTask = {
      ...data,
      date: selectedDate.toLocaleDateString("en-CA"),
    };

    updateTask(updatedTask);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-accent">My Tasks</h2>

      {/* Instruction */}
      <p className="text-sm mb-2">
        <span className="text-red-500">*</span> indicates required fields
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit(handleCreateTask)}
        className="flex flex-wrap md:flex-nowrap items-end gap-4 mb-10 bg-base-300 p-6 rounded-lg shadow-md"
      >
        {/* User Email */}
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-sm font-medium text-accent mb-1">
            Your Email
          </label>
          <input
            type="email"
            readOnly
            value={user?.email || ""}
            className="input input-bordered w-full md:w-64 bg-base-100 cursor-not-allowed"
          />
        </div>

        {/* Task Dropdown */}
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-sm font-medium text-accent mb-1">
            Task <span className="text-red-500">*</span>
          </label>
          <select
            defaultValue=""
            className="select select-bordered w-full md:w-48"
            {...register("task", { required: true })}
          >
            <option value="" disabled>
              Select Task
            </option>
            <option value="Sales">Sales</option>
            <option value="Support">Support</option>
            <option value="Content">Content</option>
            <option value="Paper-work">Paper-work</option>
            <option value="Site Visit">Site Visit</option>
            <option value="Client Consultation">Client Consultation</option>
            <option value="3D Design Rendering">3D Design Rendering</option>
            <option value="Material Selection">Material Selection</option>
            <option value="Furniture Procurement">Furniture Procurement</option>
            <option value="Lighting Design">Lighting Design</option>
            <option value="On-site Supervision">On-site Supervision</option>
          </select>
        </div>

        {/* Hours Worked */}
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-sm font-medium text-accent mb-1">
            Hours Worked <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            placeholder="Can't Be 0"
            className="input input-bordered w-full md:w-32"
            {...register("hours", {
              required: true,
              min: 1,
            })}
          />
        </div>

        {/* Date Picker */}
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-sm font-medium text-accent mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="input input-bordered w-full md:w-40"
            dateFormat="yyyy-MM-dd"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary text-white md:mt-0 mt-4 w-full md:w-auto"
          disabled={isAdding}
        >
          {isAdding ? "Adding..." : "Add Task"}
        </button>
      </form>

      {/* Table Section */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table w-full">
          <thead className="bg-base-300">
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Hours</th>
              <th>Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isError ? (
              <tr>
                <td colSpan={5} className="text-center text-error py-6">
                  Failed to load tasks.
                </td>
              </tr>
            ) : isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-20">
                  <span className="loading loading-spinner text-secondary mx-auto"></span>
                </td>
              </tr>
            ) : tasks.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-text-accent py-6">
                  No tasks added yet.
                </td>
              </tr>
            ) : (
              tasks.map((task, index) => (
                <tr key={task._id}>
                  <td>{index + 1}</td>
                  <td>{task.task}</td>
                  <td>{task.hours}</td>
                  <td>{new Date(task.date).toLocaleDateString("en-GB")}</td>
                  <td className="flex gap-2 justify-center">
                    <button
                      className="btn btn-sm btn-accent"
                      onClick={() => {
                        setEditableTask(task);
                        reset({ task: task.task, hours: task.hours }); // Pre-fill form fields
                        setSelectedDate(new Date(task.date));
                        setIsModalOpen(true);
                      }}
                      title="Edit task"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={() => handleDelete(task._id)}
                      disabled={isDeleting}
                      title="Delete task"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Task"
        className="modal-box max-w-lg overflow-visible"
        overlayClassName="modal modal-open"
        ariaHideApp={false}
      >
        <h3 className="text-lg font-bold mb-4">Edit Task</h3>

        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
          {/* Task Dropdown */}
          <div>
            <label className="label">
              <span className="label-text">
                Task <span className="text-red-500">*</span>
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register("task", { required: true })}
            >
              <option value="Site Visit">Site Visit</option>
              <option value="Client Consultation">Client Consultation</option>
              <option value="3D Design Rendering">3D Design Rendering</option>
              <option value="Material Selection">Material Selection</option>
              <option value="Furniture Procurement">
                Furniture Procurement
              </option>
              <option value="Lighting Design">Lighting Design</option>
              <option value="On-site Supervision">On-site Supervision</option>
            </select>
          </div>

          {/* Hours Input */}
          <div>
            <label className="label">
              <span className="label-text">
                Hours Worked <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              {...register("hours", { required: true, min: 1 })}
            />
          </div>

          {/* Date Picker */}
          <div>
            <label className="label">
              <span className="label-text">
                Date <span className="text-red-500">*</span>
              </span>
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="input input-bordered w-full"
              dateFormat="yyyy-MM-dd"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Task"}
            </button>

            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="btn btn-base-100 flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default MyTask;
