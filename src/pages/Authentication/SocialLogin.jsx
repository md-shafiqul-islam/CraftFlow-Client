import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";

const getRandomDesignation = () => {
  const roles = [
    "Interior Designer",
    "Project Manager",
    "Site Supervisor",
    "Draftsman",
    "3D Visualizer",
    "Lighting Consultant",
    "Procurement Officer",
    "Renovation Specialist",
    "Furniture Designer",
    "Client Coordinator",
  ];
  return roles[Math.floor(Math.random() * roles.length)];
};

const generateBankAccountNumber = () => {
  const randomDigits = Array.from({ length: 9 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  return `0009-${randomDigits}`;
};

const SocialLogin = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const location = useLocation();
  const { loginWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Signing in with Google...");

    try {
      const result = await loginWithGoogle();
      const user = result.user;

      // Save user info in database
      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        role: "Employee",
        designation: getRandomDesignation(),
        bank_account_no: generateBankAccountNumber(),
        salary: 35000,
        photo: user?.photoURL,
        status: "active",
        isVerified: false,
      };

      try {
        await axiosInstance.post("/users", userInfo);

        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: `Welcome, ${user.displayName || "User"}!`,
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (postError) {
        if (postError.response?.status === 409) {
          // User already exists - treat as login success
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: `Welcome back, ${user.displayName || "User"}!`,
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          throw postError;
        }
      }

      toast.dismiss(toastId);
      navigate(location?.state || "/");
    } catch (error) {
      toast.dismiss(toastId);

      const errorMap = {
        "auth/invalid-credential": "Invalid credentials. Please try again.",
        "auth/popup-closed-by-user":
          "Google popup was closed before completing.",
        "auth/cancelled-popup-request": "Another login request is in progress.",
        "auth/popup-blocked":
          "Popup was blocked by your browser. Please allow it.",
        "auth/network-request-failed":
          "Network error. Please check your connection.",
      };

      const message =
        errorMap[error.code] ||
        error.message ||
        "Google login failed. Please try again.";

      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: message,
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center mt-6">
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full flex items-center justify-center gap-3 hover:shadow-md transition"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loading loading-spinner text-secondary"></span>
        ) : (
          <>
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </>
        )}
      </button>
    </div>
  );
};

export default SocialLogin;
