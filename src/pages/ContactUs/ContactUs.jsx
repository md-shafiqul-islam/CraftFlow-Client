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
          text: "Your message has been submitted successfully.",
          icon: "success",
          confirmButtonColor: "#1a237e",
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
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Contact</span>{" "}
            <span className="text-secondary">Us</span>
          </h2>
          <p className="text-text-accent text-sm md:text-base">
            Have a question or project in mind? Reach out to our team — we’re
            here to help!
          </p>
        </div>

        {/* Grid: Info + Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6 text-text-accent">
            <div className="flex items-start gap-4">
              <MapPin className="text-secondary size-6 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-accent">
                  Our Office
                </h4>
                <p>House #12, Road #4, Dhanmondi, Dhaka 1209, Bangladesh</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="text-secondary size-6 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-accent">Phone</h4>
                <p>+880 1717 910578</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="text-secondary size-6 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-accent">Email</h4>
                <p>craft-flow@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-base-100 p-8 rounded-xl shadow-md space-y-6"
          >
            <div>
              <label className="block mb-1 text-sm font-medium text-text-accent">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">Name is required</p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-text-accent">
                Your Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-text-accent">
                Your Message
              </label>
              <textarea
                placeholder="Type your message"
                className="textarea textarea-bordered w-full h-32"
                {...register("message", { required: true })}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm">Message is required</p>
              )}
            </div>
            <button
              type="submit"
              className="btn bg-primary text-white hover:bg-secondary transition-colors"
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
