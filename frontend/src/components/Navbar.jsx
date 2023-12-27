import { useEffect } from "react";
import logo from "../assets/animatelogo.gif";
import { useUser } from "../context/AuthContext";
import { useLogoutFunction } from "../hook/useAuthForm";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { mutate: userLogout } = useLogoutFunction();
  const { user, logout } = useUser();

  const handleLogout = () => {
    userLogout("logout", {
      onSuccess: () => {
        logout();
        navigate("/auth");
      },
    });
  };

  return (
    <div className="bg-[#e6e6e6] shadow-sm px-8 md:px-32 py-6 sticky top-0 flex justify-between">
      <img src={logo} alt="logo" className="w-24" />
      <div>
        {user && (
          <div className="flex items-center">
            {user && (
              <p className="text-sm text-indigo-700">Hi, {user.username}</p>
            )}
            <button
              onClick={handleLogout}
              className="bg-indigo-500  text-white p-2 rounded ml-4 text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
