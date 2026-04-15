import Lottie from "lottie-react";
import animation from "../assets/Animation/Login.json";
import { Outlet } from "react-router";
import CraftFlowLogo from "../components/CraftFlowLogo/CraftFlowLogo";

const AuthLayout = () => {
  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-base-200">
      {/* ================= LEFT (Brand / Visual) ================= */}
      <div className="hidden lg:flex flex-col justify-center items-center relative overflow-hidden px-10">
        {/* Background Glow */}
        <div className="absolute w-[400px] h-[400px] bg-primary/10 blur-3xl rounded-full top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-secondary/10 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

        <div className="relative z-10 text-center max-w-md">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <CraftFlowLogo />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-base-content mb-4">
            Welcome to <span className="text-primary">CraftFlow</span>
          </h2>

          {/* Description */}
          <p className="text-base-content/70 text-sm mb-6">
            Manage your employees, track workflows, and streamline your HR
            operations — all in one modern platform.
          </p>

          {/* Animation */}
          <Lottie
            animationData={animation}
            loop
            className="w-full max-w-sm mx-auto"
          />
        </div>
      </div>

      {/* ================= RIGHT (Form Area) ================= */}
      <div className="flex justify-center items-center px-4 py-10">
        <div className="w-full max-w-md bg-base-100 border border-base-300 rounded-2xl shadow-xl p-8">
          {/* Mobile Logo */}
          <div className="flex justify-center mb-6 lg:hidden">
            <CraftFlowLogo />
          </div>

          {/* Form Outlet */}
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
