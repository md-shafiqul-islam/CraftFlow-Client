import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (data) => {
    const { email, password } = data;

    loginUser(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have logged in successfully!",
          timer: 3000,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((error) => {
        let message = "Something went wrong. Please try again.";
        if (error.code === "auth/invalid-credential") {
          message = "Incorrect email or password.";
        } else if (error.code === "auth/invalid-email") {
          message = "Please enter a valid email address.";
        } else {
          message = error.message || message;
        }

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: message,
          confirmButtonColor: "#d33",
        });
      });
  };

  return (
    <section className="flex items-center justify-center w-full">
      <div className="bg-base-100 p-10 rounded-xl shadow-xl w-full max-w-xl">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            <span className="text-primary">Welcome</span>{" "}
            <span className="text-secondary">Back</span>
          </h2>
          <p className="text-sm text-text-accent">Please sign in to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
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
              autoComplete="username"
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

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary text-secondary w-full"
          >
            Login
          </button>
        </form>

        {/* Forget Password */}
        <div className="mt-1">
          <Link className="font-medium text-sm text-accent hover:underline">
            Forget Password?
          </Link>
        </div>

        {/* Link to Register */}
        <p className="mt-6 text-center text-sm text-text-accent">
          Don’t have an account?{" "}
          <Link to="/register" className="text-secondary font-medium btn-link">
            Register here
          </Link>
        </p>

        {/* SocialLogin */}
        <SocialLogin from="login" />
      </div>
    </section>
  );
};

export default Login;
