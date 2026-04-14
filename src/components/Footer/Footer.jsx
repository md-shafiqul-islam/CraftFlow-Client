import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import CraftFlowLogo from "../CraftFlowLogo/CraftFlowLogo";

const Footer = () => {
  return (
    <footer className="bg-base-300 border-t border-base-200 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* ================= TOP SECTION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* BRAND */}
          <div>
            <CraftFlowLogo />

            <p className="mt-4 text-sm text-base-content/70 leading-relaxed">
              CraftFlow is a modern Employee Management System designed to
              streamline workforce tracking, payroll, and HR operations in one
              unified platform.
            </p>

            <div className="flex items-center gap-2 mt-4 text-xs text-base-content/60">
              <ShieldCheck size={16} className="text-primary" />
              Secure role-based access system
            </div>
          </div>

          {/* QUICK INFO */}
          <div>
            <h3 className="text-base font-semibold text-base-content mb-4">
              System Info
            </h3>

            <ul className="space-y-3 text-sm text-base-content/70">
              <li>✔ Role-based dashboards (Admin / HR / Employee)</li>
              <li>✔ Real-time task tracking</li>
              <li>✔ Automated payroll system</li>
              <li>✔ Performance analytics</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-base font-semibold text-base-content mb-4">
              Contact
            </h3>

            <div className="space-y-3 text-sm text-base-content/70">
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                +880 1717 910578
              </p>

              <p className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                shafiqul.islam3558@gmail.com
              </p>

              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                Mymensingh, Bangladesh
              </p>
            </div>
          </div>
        </div>

        {/* ================= SOCIAL ================= */}
        <div className="flex justify-center gap-6 py-6 border-t border-base-200">
          <a
            href="https://www.facebook.com/sniekdho.shafiq/"
            target="_blank"
            className="hover:text-primary transition text-base-content/70"
          >
            <FaFacebook size={22} />
          </a>

          <a
            href="https://www.linkedin.com/in/mdshafiqulislam1/"
            target="_blank"
            className="hover:text-primary transition text-base-content/70"
          >
            <FaLinkedin size={22} />
          </a>

          <a
            href="https://github.com/md-shafiqul-islam"
            target="_blank"
            className="hover:text-primary transition text-base-content/70"
          >
            <FaGithub size={22} />
          </a>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="text-center text-xs text-base-content/50 mt-6">
          © {new Date().getFullYear()}{" "}
          <span className="text-primary font-semibold">Craft</span>
          <span className="text-secondary font-semibold">Flow</span> — Built for
          modern workforce management
        </div>
      </div>
    </footer>
  );
};

export default Footer;
