import Lottie from "lottie-react";
import animation from "../assets/Animation/Login.json";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-base-200 grid grid-cols-1 lg:grid-cols-2">
      {/* Left: Lottie Animation */}
      <div className="flex justify-center items-center p-8">
        <Lottie
          animationData={animation}
          loop={true}
          className="w-full max-w-md"
        />
      </div>

      {/* Right: Auth Form */}
      <div className="flex justify-center items-center p-8">
        <Outlet />
      </div>
    </section>
  );
};

export default AuthLayout;
