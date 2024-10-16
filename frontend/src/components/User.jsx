import { useState } from "react";
import {
  MaterialSymbolsLightAccountCircleOutline,
  IonMdLogOut,
} from "../../util/icon";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { removeToken } from "../features/auth/authSlice";
import { apiSlice } from "../app/baseQuery";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const User = () => {
  // const [isActive, setIsActive] = useState(false);
  const { token } = useAppSelector((state) => state.auth);
  console.log(token);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(removeToken());
    dispatch(apiSlice.util.resetApiState());
    navigate("/login");
  };

  return (
    // <div className="flex relative">
    //   <MaterialSymbolsLightAccountCircleOutline
    //     onClick={() => setIsActive(!isActive)}
    //     className="text-indigo-700 dark:text-white"
    //   />

    <Popover>
      <PopoverTrigger>
        <MaterialSymbolsLightAccountCircleOutline className="text-indigo-700 dark:text-white" />
      </PopoverTrigger>
      <PopoverContent>
        {token && (
          <div className="text-sm">
            {token && (
              <p className=" text-indigo-700 dark:font-bold border-b-2 py-2 mb-2">
                {token.username}
              </p>
            )}
            <div className="flex flex-col items-start gap-2">
              <Link to="weeklyProgress">Weekly Progress</Link>
              <Link to="monthlyProgress">Monthly Progress</Link>
            </div>

            {/* <button
                  onClick={handleLogout}
                  className="bg-indigo-500  text-white px-4 py-2 rounded ml-4 text-sm mt-2"
                >
                  <span>
                    <IonMdLogOut />
                  </span>
                </button> */}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default User;
