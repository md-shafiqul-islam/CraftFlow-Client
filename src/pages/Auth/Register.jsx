import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { createUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegister = (data) => {
    const { email, password } = data;

    createUser(email, password)
      .then((result) => {
        console.log(result);
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Your account has been created successfully!",
          timer: 3000,
          confirmButtonColor: false,
        });
      })
      .catch((error) => {
        let message = "Something went wrong.";
        if (error.code === "auth/email-already-in-use") {
          message = "This email is already registered.";
        } else if (error.code === "auth/invalid-email") {
          message = "Please enter a valid email address.";
        }

        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: message,
          confirmButtonColor: "#d33",
        });
      });
  };

  const password = watch("password");

  return (
    <section className="flex items-center justify-center w-full">
      <div className="bg-base-100 p-10 rounded-xl shadow-xl w-full max-w-xl">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            <span className="text-primary">Create</span>{" "}
            <span className="text-secondary">Account</span>
          </h2>
          <p className="text-sm text-text-accent">
            Please fill out the form to register
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
          {/* Name */}
          <div>
            <label
              className="block mb-1 font-medium text-sm text-accent"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              autoComplete="username"
              className="input input-bordered input-secondary text-secondary w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label
              className="block mb-1 font-medium text-sm text-accent"
              htmlFor="role"
            >
              Role
            </label>
            <select
              id="role"
              {...register("role", { required: "Role is required" })}
              className="select select-bordered select-secondary text-secondary w-full"
              defaultValue=""
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="Employee">Employee</option>
              <option value="HR">HR</option>
            </select>
            {errors.role && (
              <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Designation */}
          <div>
            <label
              className="block mb-1 font-medium text-sm text-accent"
              htmlFor="designation"
            >
              Designation
            </label>
            <input
              id="designation"
              type="text"
              placeholder="Interior Designer, Site Engineer, Electrician, etc."
              className="input input-bordered input-secondary text-secondary w-full"
              {...register("designation", {
                required: "Designation is required",
              })}
            />
            {errors.designation && (
              <p className="text-sm text-red-500 mt-1">
                {errors.designation.message}
              </p>
            )}
          </div>

          {/* Bank Account No */}
          <div>
            <label
              className="block mb-1 font-medium text-sm text-accent"
              htmlFor="bank_account_no"
            >
              Bank Account No
            </label>
            <input
              id="bank_account_no"
              type="text"
              placeholder="Enter your bank account number"
              className="input input-bordered input-secondary text-secondary w-full"
              {...register("bank_account_no", {
                required: "Bank account number is required",
              })}
            />
            {errors.bank_account_no && (
              <p className="text-sm text-red-500 mt-1">
                {errors.bank_account_no.message}
              </p>
            )}
          </div>

          {/* Salary */}
          <div>
            <label
              className="block mb-1 font-medium text-sm text-accent"
              htmlFor="salary"
            >
              Salary
            </label>
            <input
              id="salary"
              type="number"
              placeholder="Enter your salary"
              className="input input-bordered input-secondary text-secondary w-full"
              {...register("salary", {
                required: "Salary is required",
                min: {
                  value: 1,
                  message: "Salary must be greater than 0",
                },
              })}
            />
            {errors.salary && (
              <p className="text-sm text-red-500 mt-1">
                {errors.salary.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              className="block mb-1 font-medium text-sm text-accent"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              className="input input-bordered input-secondary text-secondary w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              className="block mb-1 font-medium text-sm text-accent"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="input input-bordered input-secondary text-secondary w-full"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                    message:
                      "Must include one uppercase and one special character",
                  },
                })}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 right-3 z-50 cursor-pointer text-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </div>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              className="block mb-1 font-medium text-sm text-accent"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your password"
                autoComplete="new-password"
                className="input input-bordered input-secondary text-secondary w-full"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 right-3 z-50 cursor-pointer text-secondary"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <Eye /> : <EyeOff />}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Photo Upload */}
          <div>
            <label
              className="block mb-1 font-medium text-sm text-accent"
              htmlFor="photo"
            >
              Photo
            </label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              {...register("photo", { required: "Photo is required" })}
            />
            {errors.photo && (
              <p className="text-sm text-red-500 mt-1">
                {errors.photo.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary text-secondary w-full"
          >
            Register
          </button>
        </form>

        {/* Link to Login */}
        <p className="mt-6 text-center text-sm text-text-accent">
          Already have an account?{" "}
          <Link to="/login" className="text-secondary font-medium btn-link">
            Login here
          </Link>
        </p>

        {/* SocialLogin */}
        <SocialLogin />
      </div>
    </section>
  );
};

export default Register;
