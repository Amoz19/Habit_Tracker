import { useState } from "react";
import {
  MaterialSymbolsLightAccountCircleOutline,
  IonMdLogOut,
} from "../../util/icon";
import { useUser } from "../context/AuthContext";
import { useLogoutFunction } from "../hook/useAuthForm";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [isActive, setIsActive] = useState(false);
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
    <div className="flex relative">
      <MaterialSymbolsLightAccountCircleOutline
        onClick={() => setIsActive(!isActive)}
        className="text-indigo-700 dark:text-white"
      />
      {isActive && (
        <div className=" bg-white p-2 rounded absolute top-10 right-2  shadow transition-all w-24 ">
          {user && (
            <div className="flex flex-col items-center">
              {user && (
                <p className="text-sm text-indigo-700  dark:font-bold">
                  Hi, {user.username}
                </p>
              )}
              <button
                onClick={handleLogout}
                className="bg-indigo-500  text-white px-4 py-2 rounded ml-4 text-sm mt-2"
              >
                <span>
                  <IonMdLogOut />
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default User;
