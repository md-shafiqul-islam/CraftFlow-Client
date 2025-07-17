import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { Pencil, Trash2 } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const MyTask = () => {
  const { register, handleSubmit, reset } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const queryClient = useQueryClient();

  const { data: tasks = [] } = useQuery({
    queryKey: ["my-tasks", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/work-sheet?email=${user?.email}`);
      return res.data;
    },
  });

  const { mutate: addTask, isPending } = useMutation({
    mutationFn: async (newTask) => {
      const response = await axiosSecure.post("/work-sheet", newTask);
      return response.data;
    },

    onSuccess: (data, variables) => {
      if (data?.insertedId) {
        toast.success("Task added successfully!");
        reset();
        setSelectedDate(new Date());

        queryClient.setQueryData(["my-tasks", user?.email], (old = []) => [
          { ...variables, _id: data.insertedId },
          ...old,
        ]);
      } else {
        toast.error("Failed to add task. Try again.");
      }
    },

    onError: () => {
      toast.error("Failed to add task. Please try again.");
    },
  });

  const handleCreateTask = async (data) => {
    const newTask = {
      ...data,
      created_by: user?.email,
      date: selectedDate.toLocaleDateString("en-CA"),
    };

    addTask(newTask);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Instruction for Required Fields */}
      <p className="text-sm text-gray-500 mb-2">
        <span className="text-red-500">*</span> indicates required fields
      </p>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(handleCreateTask)}
        className="flex flex-wrap md:flex-nowrap items-end gap-4 mb-10 bg-base-300 p-6 rounded-lg shadow-md"
      >
        {/* User Email (readonly) */}
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
          className="btn btn-primary text-white md:mt-0 mt-4 w-full md:w-auto"
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add Task"}
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
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-text-accent py-6">
                  No tasks added yet.
                </td>
              </tr>
            ) : (
              tasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.task}</td>
                  <td>{task.hours}</td>
                  <td>{task.date}</td>
                  <td className="flex gap-2 justify-center">
                    <button className="btn btn-sm btn-accent">
                      <Pencil size={16} />
                    </button>

                    <button className="btn btn-sm btn-error text-white">
                      <Trash2 size={16} />
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

export default MyTask;
