import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SocialLogin = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const { loginWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Signing in with Google...");

    try {
      const result = await loginWithGoogle();
      const user = result.user;

      const { data: existingUser } = await axiosSecure.get(
        `/users?email=${user?.email}`
      );

      if (!existingUser?.email) {
        // Save user info in database
        const userInfo = {
          name: user?.displayName,
          email: user?.email,
          role: "Employee",
          designation: "N/A",
          bank_account_no: "N/A",
          salary: 0,
          photo: user?.photoURL,
        };
        await axiosInstance.post("/users", userInfo);

        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: `Welcome, ${user.displayName || "User"}!`,
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${user.displayName || "User"}!`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
      toast.dismiss(toastId);
      navigate("/");
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
