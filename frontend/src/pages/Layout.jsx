import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/react";

const Layout = () => {
  return (
    <div className="h-[100dvh] flex flex-col ">
      <Navbar />
      <Outlet />
      <SpeedInsights />
      <Footer />
    </div>
  );
};

export default Layout;
