import { FcGoogle } from "react-icons/fc";

const SocialLogin = ({ onGoogleLogin }) => {
  return (
    <div className="text-center mt-6">
      <button
        onClick={onGoogleLogin}
        className="btn btn-outline w-full flex items-center justify-center gap-3 hover:shadow-md transition"
      >
        <FcGoogle size={20} />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
