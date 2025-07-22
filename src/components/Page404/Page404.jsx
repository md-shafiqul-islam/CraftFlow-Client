import { Link } from "react-router";

const Page404 = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 text-accent px-4 text-center">
      <h1 className="text-8xl font-extrabold tracking-widest text-primary">
        404
      </h1>
      <p className="mt-4 text-2xl font-semibold">Page Not Found</p>
      <p className="mt-2 max-w-sm text-base-content text-opacity-70">
        The page you're looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Page404;
