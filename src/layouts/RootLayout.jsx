import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <ScrollToTop />

      <Navbar />

      <div className="h-[64px]" />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;
