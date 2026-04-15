import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import toast from "react-hot-toast";
import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, UploadCloud } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const location = useLocation();
  const { createUser, updateUserProfile } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userPhoto, setUserPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const password = watch("password");

  // 📸 Upload Image
  const handleUploadImage = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    setIsUploading(true);
    const imageData = new FormData();
    imageData.append("image", imageFile);

    const toastId = toast.loading("Uploading image...");

    try {
      const uploadUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_key
      }`;

      const response = await axios.post(uploadUrl, imageData);
      const uploadedImageUrl = response?.data?.data?.url;

      if (!uploadedImageUrl) throw new Error("Upload failed");

      setUserPhoto(uploadedImageUrl);
      toast.success("Image uploaded!", { id: toastId });
    } catch {
      toast.error("Image upload failed!", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  // 🚀 Register
  const handleRegister = async (data) => {
    if (isUploading) {
      toast("Wait until image upload finishes ⏳");
      return;
    }

    if (!userPhoto) {
      toast.error("Please upload a photo first");
      return;
    }

    const cleanedDesignation = data.designation.trim().toLowerCase();
    if (cleanedDesignation === "n/a") data.designation = "Employee";

    const {
      name,
      email,
      password,
      role,
      designation,
      bank_account_no,
      salary,
    } = data;

    setIsLoading(true);
    const toastId = toast.loading("Creating account...");

    try {
      await createUser(email, password);

      await updateUserProfile({
        displayName: name,
        photoURL: userPhoto,
      });

      await axiosInstance.post("/users", {
        name,
        email,
        role,
        designation,
        bank_account_no,
        salary,
        photo: userPhoto,
        status: "active",
        isVerified: false,
      });

      toast.dismiss(toastId);

      Swal.fire({
        icon: "success",
        title: "Welcome to CraftFlow 🎉",
        text: "Account created successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(location?.state || "/");
    } catch (error) {
      toast.dismiss(toastId);

      const errorMap = {
        "auth/email-already-in-use": "Email already registered.",
        "auth/invalid-email": "Invalid email address.",
      };

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: errorMap[error.code] || error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center w-full">
      <div className="bg-base-100 p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-xl border border-base-300">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">
            <span className="text-primary">Create</span>{" "}
            <span className="text-secondary">Account</span>
          </h2>
          <p className="text-sm text-base-content/70 mt-2">
            Join CraftFlow and manage your team efficiently
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          {/* Role */}
          <select
            className="select select-bordered w-full"
            {...register("role", { required: "Role is required" })}
          >
            <option value="">Select Role</option>
            <option value="Employee">Employee</option>
            <option value="HR">HR</option>
          </select>

          {/* Designation */}
          <input
            type="text"
            placeholder="Designation (e.g. Frontend Dev)"
            className="input input-bordered w-full"
            {...register("designation", { required: true })}
          />

          {/* Bank */}
          <input
            type="text"
            placeholder="Bank Account No"
            className="input input-bordered w-full"
            {...register("bank_account_no", { required: true })}
          />

          {/* Salary */}
          <input
            type="number"
            placeholder="Salary"
            className="input input-bordered w-full"
            {...register("salary", { required: true })}
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            {...register("email", { required: true })}
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered w-full"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="input input-bordered w-full"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showConfirm ? <Eye /> : <EyeOff />}
            </span>
          </div>

          {/* Upload */}
          <label className="flex items-center gap-2 cursor-pointer border border-dashed border-base-300 p-3 rounded-lg hover:bg-base-200 transition">
            <UploadCloud size={18} />
            <span className="text-sm">
              {isUploading ? "Uploading..." : "Upload Profile Photo"}
            </span>
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleUploadImage}
            />
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || isUploading}
            className="btn btn-primary w-full"
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-6 text-base-content/70">
          Already have an account?{" "}
          <Link to="/login" className="text-secondary font-medium">
            Login
          </Link>
        </p>

        <div className="mt-6">
          <SocialLogin />
        </div>
      </div>
    </section>
  );
};

export default Register;
