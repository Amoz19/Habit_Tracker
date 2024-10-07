import { useState } from "react";
import {
  MaterialSymbolsLightAccountCircleOutline,
  IonMdLogOut,
} from "../../util/icon";
// import useAuthContext from "../hook/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { removeToken } from "../features/auth/authSlice";

const User = () => {
  const [isActive, setIsActive] = useState(false);
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(removeToken());
    navigate("/login");
  };

  return (
    <div className="flex relative">
      <MaterialSymbolsLightAccountCircleOutline
        onClick={() => setIsActive(!isActive)}
        className="text-indigo-700 dark:text-white"
      />
      {isActive && (
        <div className=" bg-white p-2 rounded absolute top-10 right-2  shadow transition-all w-24 ">
          {token && (
            <div className="flex flex-col items-center">
              {token && (
                <p className="text-sm text-indigo-700  dark:font-bold">
                  Hi, {token.username}
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
