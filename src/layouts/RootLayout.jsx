import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>Navbar</header>

      <main className="flex-1 bg-base-200">
        <Outlet />
      </main>

      <footer>Footer</footer>
    </div>
  );
};

export default RootLayout;
