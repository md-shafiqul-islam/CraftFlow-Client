import { Mail, MapPin, Phone } from "lucide-react";

const ContactUs = () => {
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

        {/* Grid: Contact Info & Form */}
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
                <p>shafiqul.islam3558@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-base-100 p-8 rounded-xl shadow-md space-y-6">
            <div>
              <label className="block mb-1 text-sm font-medium text-text-accent">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-text-accent">
                Your Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-text-accent">
                Your Message
              </label>
              <textarea
                placeholder="Type your message"
                className="textarea textarea-bordered w-full h-32"
                required
              ></textarea>
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
