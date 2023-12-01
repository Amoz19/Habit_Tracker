import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col ">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
