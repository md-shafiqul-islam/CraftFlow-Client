import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";

/* 🧠 Smart Designation Generator (Employee System) */
const getRandomDesignation = () => {
  const roles = [
    "Software Engineer",
    "HR Executive",
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer",
    "QA Engineer",
    "DevOps Engineer",
    "Product Manager",
    "Support Executive",
    "Data Analyst",
  ];
  return roles[Math.floor(Math.random() * roles.length)];
};

/* 🏦 Bank Account Generator */
const generateBankAccountNumber = () => {
  const randomDigits = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 10),
  ).join("");
  return `CF-${randomDigits}`;
};

const SocialLogin = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const location = useLocation();
  const { loginWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Connecting to Google...");

    try {
      const result = await loginWithGoogle();
      const user = result.user;

      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        role: "Employee",
        designation: getRandomDesignation(),
        bank_account_no: generateBankAccountNumber(),
        salary: 30000 + Math.floor(Math.random() * 20000),
        photo: user?.photoURL,
        status: "active",
        isVerified: false,
        created_at: new Date(),
      };

      try {
        await axiosInstance.post("/users", userInfo);

        Swal.fire({
          icon: "success",
          title: "Welcome to CraftFlow 🎉",
          text: `Account created successfully for ${
            user.displayName || "User"
          }`,
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (postError) {
        if (postError.response?.status === 409) {
          Swal.fire({
            icon: "success",
            title: "Welcome Back 👋",
            text: `Logged in as ${user.displayName || "User"}`,
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          throw postError;
        }
      }

      toast.dismiss(toastId);
      navigate(location?.state || "/dashboard");
    } catch (error) {
      toast.dismiss(toastId);

      const errorMap = {
        "auth/invalid-credential": "Invalid credentials.",
        "auth/popup-closed-by-user": "Login cancelled.",
        "auth/cancelled-popup-request": "Another login is in progress.",
        "auth/popup-blocked": "Popup blocked. Please allow popups.",
        "auth/network-request-failed":
          "Network error. Check your internet connection.",
      };

      const message =
        errorMap[error.code] ||
        error.message ||
        "Google login failed. Try again.";

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
    <div className="mt-6 space-y-4">
      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-[1px] bg-base-300"></div>
        <div className="flex-1 h-[1px] bg-base-300"></div>
      </div>

      {/* Google Button */}
      <button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="btn w-full bg-base-100 border border-base-300 hover:border-secondary hover:shadow-md transition-all flex items-center justify-center gap-3"
      >
        {isLoading ? (
          <span className="loading loading-spinner text-secondary"></span>
        ) : (
          <>
            <FcGoogle size={20} />
            <span className="font-medium">Continue with Google</span>
          </>
        )}
      </button>

      {/* Small Note */}
      <p className="text-xs text-center text-base-content/50">
        Quick access for employees and HR — no manual signup needed.
      </p>
    </div>
  );
};

export default SocialLogin;
