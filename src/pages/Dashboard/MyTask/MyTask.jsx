import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { Pencil, Trash2 } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Modal from "react-modal";

Modal.setAppElement("#root");

const MyTask = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableTask, setEditableTask] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  // ---------------- FETCH TASKS ----------------
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

  // ---------------- CREATE TASK ----------------
  const { mutate: addTask, isPending: isAdding } = useMutation({
    mutationFn: async (newTask) => {
      const res = await axiosSecure.post("/work-sheet", newTask);
      return res.data;
    },
    onSuccess: (data, variables) => {
      if (data?.insertedId) {
        toast.success("Task added to CraftFlow successfully!");

        queryClient.setQueryData(["my-tasks", user?.email], (old = []) => {
          return [{ ...variables, _id: data.insertedId }, ...old].sort(
            (a, b) => new Date(b.date) - new Date(a.date),
          );
        });

        reset();
        setSelectedDate(new Date());
      } else {
        toast.error("Failed to add task.");
      }
    },
    onError: () => toast.error("Server error while adding task."),
  });

  // ---------------- DELETE TASK ----------------
  const { mutate: deleteTask, isPending: isDeleting } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/work-sheet/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.deletedCount > 0) {
        toast.success("Task removed successfully!");
        queryClient.invalidateQueries(["my-tasks", user?.email]);
      }
    },
  });

  // ---------------- UPDATE TASK ----------------
  const { mutate: updateTask, isPending: isUpdating } = useMutation({
    mutationFn: async (updatedTask) => {
      const res = await axiosSecure.put(
        `/work-sheet/${editableTask._id}`,
        updatedTask,
      );
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.modifiedCount > 0) {
        toast.success("Task updated successfully!");
        setIsModalOpen(false);
        setEditableTask(null);
        reset();
        queryClient.invalidateQueries(["my-tasks", user?.email]);
      } else {
        toast.error("No changes detected.");
      }
    },
    onError: () => toast.error("Failed to update task."),
  });

  // ---------------- HANDLERS ----------------
  const handleCreateTask = (data) => {
    addTask({
      ...data,
      created_by: user?.email,
      date: selectedDate.toISOString().split("T")[0],
    });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this task?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      deleteTask(id);
    }
  };

  const openEditModal = (task) => {
    setEditableTask(task);
    reset({ task: task.task, hours: task.hours });
    setSelectedDate(new Date(task.date));
    setIsModalOpen(true);
  };

  const handleUpdate = (data) => {
    updateTask({
      ...data,
      date: selectedDate.toISOString().split("T")[0],
    });
  };

  // ---------------- UI ----------------
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-base-content">
        CraftFlow Task Manager
      </h2>

      {/* CREATE FORM */}
      <form
        onSubmit={handleSubmit(handleCreateTask)}
        className="flex flex-wrap gap-4 bg-base-300 p-6 rounded-lg shadow-md mb-10"
      >
        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="input input-bordered w-full md:w-64"
        />

        <select
          className="select select-bordered w-full md:w-52"
          {...register("task", { required: true })}
        >
          <option value="">Select Task</option>
          <option>Client Meeting</option>
          <option>Design Planning</option>
          <option>UI/UX Work</option>
          <option>Development</option>
          <option>Testing</option>
          <option>Deployment</option>
          <option>Bug Fixing</option>
        </select>

        <input
          type="number"
          placeholder="Hours"
          className="input input-bordered w-full md:w-32"
          {...register("hours", { required: true, min: 1 })}
        />

        <DatePicker
          selected={selectedDate}
          onChange={setSelectedDate}
          className="input input-bordered w-full md:w-40"
        />

        <button className="btn btn-primary text-white" disabled={isAdding}>
          {isAdding ? "Adding..." : "Add Task"}
        </button>
      </form>

      {/* TABLE */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table w-full">
          <thead className="bg-base-300">
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Hours</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-10">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={5} className="text-center text-error">
                  Failed to load tasks
                </td>
              </tr>
            ) : tasks.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  No tasks found
                </td>
              </tr>
            ) : (
              tasks.map((task, idx) => (
                <tr key={task._id}>
                  <td>{idx + 1}</td>
                  <td>{task.task}</td>
                  <td>{task.hours}</td>
                  <td>{new Date(task.date).toLocaleDateString()}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm btn-accent"
                      onClick={() => openEditModal(task)}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={() => handleDelete(task._id)}
                      disabled={isDeleting}
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

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal-box"
        overlayClassName="modal modal-open"
      >
        <h3 className="text-lg font-bold mb-4">Update Task</h3>

        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
          <select
            className="select select-bordered w-full"
            {...register("task", { required: true })}
          >
            <option>Client Meeting</option>
            <option>Design Planning</option>
            <option>Development</option>
            <option>Testing</option>
            <option>Deployment</option>
          </select>

          <input
            type="number"
            className="input input-bordered w-full"
            {...register("hours", { required: true })}
          />

          <DatePicker
            selected={selectedDate}
            onChange={setSelectedDate}
            className="input input-bordered w-full"
          />

          <div className="flex gap-2">
            <button className="btn btn-primary flex-1" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update"}
            </button>

            <button
              type="button"
              className="btn flex-1"
              onClick={() => setIsModalOpen(false)}
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
