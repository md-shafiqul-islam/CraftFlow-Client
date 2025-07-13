import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import CraftFlowLogo from "../CraftFlowLogo/CraftFlowLogo";

const Footer = () => {
  return (
    <footer className="py-20 bg-base-300 text-center">
      <div className="max-w-7xl mx-auto px-4">
        {/* Logo + Name */}
        <div className="flex flex-col items-center mb-4 gap-2">
          <CraftFlowLogo />

          <p className="max-w-lg text-text-accent text-sm md:text-base">
            Crafting beautiful, functional spaces through expert design and
            thoughtful renovation.
          </p>
        </div>

        {/* Contact Info */}
        <div className="text-sm font-medium space-y-1">
          <p>
            <span className="font-semibold text-primary">Phone:</span> +880 1717
            910578
          </p>
          <p>
            <span className="font-semibold text-primary">Address:</span>{" "}
            Mymensingh, Bangladesh
          </p>
          <p>
            <span className="font-semibold text-primary">Email:</span>{" "}
            shafiqul.islam3558@gmail.com
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-4">
          <a
            href="https://www.facebook.com/sniekdho.shafiq/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-secondary hover:text-primary transition"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/mdshafiqulislam1/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-secondary hover:text-primary transition"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/md-shafiqul-islam"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-secondary hover:text-primary transition"
          >
            <FaGithub size={24} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs font-semibold opacity-70 mt-4">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-primary">Craft</span>
          <span className="text-secondary">Flow</span> — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
