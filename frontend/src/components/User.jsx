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
import { Power, UserRound, Minus, Loader } from "lucide-react";

const User = () => {
  // const [isActive, setIsActive] = useState(false);
  const { token } = useAppSelector((state) => state.auth);

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
      <PopoverContent className=" w-fit px-8">
        {token && (
          <div className="text-sm  ">
            {token && (
              <div className="flex items-center  border-b-2 py-2 mb-2 text-indigo-700">
                <UserRound size={22} />
                <Minus size={22} />
                <p className="  dark:font-bold">- {token.username}</p>
              </div>
            )}

            <div className="flex flex-col items-start gap-2">
              <Link to="monthlyProgress">Monthly progress</Link>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500  text-white rounded text-sm mt-4 p-1"
            >
              <span>
                <Power size={18} />
              </span>
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default User;
