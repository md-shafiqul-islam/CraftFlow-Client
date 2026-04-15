import Swal from "sweetalert2";
import { useState } from "react";
import toast from "react-hot-toast";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "admin@gmail.com",
      password: "A1234@",
    },
  });

  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const location = useLocation();
  const axiosInstance = useAxios();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (data) => {
    const { email, password } = data;

    setIsLoading(true);
    const toastId = toast.loading("Logging in...");

    try {
      await axiosInstance.post("login-check", { email });

      await loginUser(email, password);

      toast.dismiss(toastId);

      Swal.fire({
        icon: "success",
        title: "Welcome Back 👋",
        text: "Login successful!",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(location?.state || "/");
    } catch (error) {
      toast.dismiss(toastId);

      if (error?.response?.status === 403) {
        return Swal.fire({
          icon: "error",
          title: "Access Denied",
          text:
            error.response?.data?.message ||
            "You are not allowed to log in. Contact Admin.",
          confirmButtonColor: "#d33",
        });
      }

      const errorMap = {
        "auth/invalid-credential": "Incorrect email or password.",
        "auth/invalid-email": "Please enter a valid email address.",
      };

      const message =
        errorMap[error.code] ||
        error.message ||
        "Something went wrong. Please try again.";

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: message,
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center w-full px-4">
      <div className="w-full max-w-md bg-base-100 border border-base-300 rounded-2xl shadow-lg p-8 md:p-10">
        {/* 🔥 Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome to <span className="text-primary">Craft</span>
            <span className="text-secondary">Flow</span>
          </h2>
          <p className="text-sm text-base-content/70">
            Sign in to manage your workspace 🚀
          </p>
        </div>

        {/* 🔥 Form */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-base-content">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              autoComplete="username"
              className="input input-bordered w-full mt-1 focus:outline-none focus:border-primary"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-base-content">
              Password
            </label>

            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                autoComplete="current-password"
                className="input input-bordered w-full pr-10 focus:outline-none focus:border-primary"
                {...register("password", {
                  required: "Password is required",
                })}
              />

              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-primary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn w-full bg-primary text-white hover:bg-secondary transition-all duration-300 disabled:opacity-70"
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-xs text-base-content/50 my-6">
          OR CONTINUE WITH
        </div>

        {/* Social Login */}
        <SocialLogin />

        {/* Register */}
        <p className="text-center text-sm text-base-content/70 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-secondary font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
