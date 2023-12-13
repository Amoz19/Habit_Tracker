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
    <div className="bg-slate-900/90 px-8 md:px-32 py-6 sticky top-0 text-white flex justify-between">
      <img src={logo} alt="logo" className="w-24" />
      <div className="flex flex-col justify-between ">
        {user && (
          <>
            {user && <p>Welcome, {user.username}</p>}
            <button
              onClick={handleLogout}
              className="bg-red-900 px-2 rounded-2xl mt-4"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
