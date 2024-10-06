// import { useState } from "react";
// import {
//   MaterialSymbolsLightAccountCircleOutline,
//   IonMdLogOut,
// } from "../../util/icon";
// import useAuthContext from "../hook/useAuthContext";
// import { useNavigate } from "react-router-dom";
// import { useQueryClient } from "react-query";

// const User = () => {
//   const queryClient = useQueryClient();
//   const [isActive, setIsActive] = useState(false);
//   // const { user, dispatch } = useAuthContext();

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     dispatch({ type: "LOGOUT" });
//     navigate("/login");
//     queryClient.clear();
//   };

//   return (
//     <div className="flex relative">
//       <MaterialSymbolsLightAccountCircleOutline
//         onClick={() => setIsActive(!isActive)}
//         className="text-indigo-700 dark:text-white"
//       />
//       {isActive && (
//         <div className=" bg-white p-2 rounded absolute top-10 right-2  shadow transition-all w-24 ">
//           {user && (
//             <div className="flex flex-col items-center">
//               {user && (
//                 <p className="text-sm text-indigo-700  dark:font-bold">
//                   Hi, {user.username}
//                 </p>
//               )}
//               <button
//                 onClick={handleLogout}
//                 className="bg-indigo-500  text-white px-4 py-2 rounded ml-4 text-sm mt-2"
//               >
//                 <span>
//                   <IonMdLogOut />
//                 </span>
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default User;
