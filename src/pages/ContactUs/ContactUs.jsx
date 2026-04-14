import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";

const ContactUs = () => {
  const axiosInstance = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const errorMap = {
      ERR_NETWORK: "Network error. Please check your connection.",
      ERR_BAD_REQUEST:
        "Invalid input. Please review your message and try again.",
      ERR_INTERNAL_SERVER: "Server error. Please try again later.",
    };

    try {
      const res = await axiosInstance.post("/messages", {
        ...data,
        created_at: new Date(),
      });

      if (res.data?.insertedId) {
        Swal.fire({
          title: "Message Sent!",
          text: "Our HR system support team will respond shortly.",
          icon: "success",
          confirmButtonColor: "#0d9488",
          confirmButtonText: "OK",
        });

        reset();
      } else {
        Swal.fire("Oops!", "Message was not saved. Try again.", "warning");
      }
    } catch (error) {
      const message =
        errorMap[error.code] ||
        error?.response?.data?.error ||
        error.message ||
        "Something went wrong.";

      Swal.fire("Error", message, "error");
    }
  };

  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-6xl mx-auto px-4">
        {/* ================= HEADING ================= */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-primary">
            <span className="text-primary">Get in</span>{" "}
            <span className="text-secondary">Touch</span>
          </h2>

          <p className="text-base-content/70 text-sm md:text-base">
            Need support, integration help, or want to collaborate with
            <span className="text-primary font-semibold"> CraftFlow</span>? Our
            system team is here to assist HR, Admins, and organizations.
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* ================= INFO ================= */}
          <div className="space-y-6 text-base-content/70">
            <div className="flex items-start gap-4">
              <MapPin className="text-primary size-6 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-base-content">
                  Headquarters
                </h4>
                <p>
                  CraftFlow Systems Ltd. <br />
                  Mymensingh Tech Park, Bangladesh
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-primary size-6 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-base-content">
                  Support Hotline
                </h4>
                <p>+880 1717 910578</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-primary size-6 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-base-content">
                  System Support Email
                </h4>
                <p>support@craftflow.systems</p>
              </div>
            </div>

            {/* extra system note */}
            <div className="p-4 rounded-xl bg-base-100 border border-base-300 hover:border-secondary/40 text-sm">
              ⚡ Typical response time:{" "}
              <span className="font-semibold">24–48 hours</span>
            </div>
          </div>

          {/* ================= FORM ================= */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-base-100 p-8 rounded-xl shadow-md space-y-6 border border-base-300"
          >
            <div>
              <label className="block mb-1 text-sm font-medium text-base-content/70">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered input-secondary w-full"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">Name is required</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-base-content/70">
                Work Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered input-secondary w-full"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-base-content/70">
                Message
              </label>
              <textarea
                placeholder="Describe your issue or request"
                className="textarea textarea-bordered input-secondary w-full h-32"
                {...register("message", { required: true })}
              ></textarea>

              {errors.message && (
                <p className="text-red-500 text-sm">Message is required</p>
              )}
            </div>

            <button
              type="submit"
              className="btn bg-secondary text-base-100 hover:opacity-90 transition w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
