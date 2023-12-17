import { useEffect } from "react";
import logo from "../assets/animation.gif";
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
    <div className="bg-gradient-to-b from-indigo-200 to-indigo-300 shadow-sm px-8 md:px-32 py-6 sticky top-0 flex justify-between">
      <img src={logo} alt="logo" className="w-24" />
      <div>
        {user && (
          <div className="flex items-center">
            {user && <p className="text-white">Hi, {user.username}</p>}
            <button
              onClick={handleLogout}
              className="bg-white text-indigo-500 p-2 rounded ml-4"
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
