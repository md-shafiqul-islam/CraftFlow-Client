import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const SocialLogin = ({ from }) => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);

        if (from === "register") {
          // Save user info to database
        } else {
          // Normal login behavior
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: `Welcome, ${result.user.displayName || "User"}!`,
            timer: 3000,
            showConfirmButton: false,
          });
          navigate("/");
        }
      })
      .catch((error) => {
        let message = "Google login failed. Please try again.";
        if (error.code === "auth/invalid-credential") {
          message = "Invalid credentials. Please try again.";
        } else if (error.code === "auth/popup-closed-by-user") {
          message = "Google login popup was closed before completing.";
        } else if (error.code === "auth/cancelled-popup-request") {
          message = "Another login request is in progress. Please wait.";
        } else if (error.code === "auth/popup-blocked") {
          message = "Your browser blocked the login popup. Please allow it.";
        } else if (error.code === "auth/network-request-failed") {
          message = "Network error. Please check your internet connection.";
        } else {
          message = error.message || message;
        }

        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: message,
          confirmButtonColor: "#d33",
        });
      });
  };

  return (
    <div className="text-center mt-6">
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full flex items-center justify-center gap-3 hover:shadow-md transition"
      >
        <FcGoogle size={20} />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
