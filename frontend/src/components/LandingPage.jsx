// import React from "react";
// import dotGrid from "../assets/dot.png";
// import logo from "../assets/logo.gif";
// // import track from "../assets/track.png";
// import { IonCaretForward } from "../assets/icon.jsx";
// import styles from "./LandingPage.module.css";
// import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

// const LandingPage = () => {
//   return (
//     <>
//       <div
//         className={`${styles.background} fixed inset-0 background w-full h-full`}
//       ></div>
//       <div
//         className={`${styles.background1} fixed inset-0 w-full h-full `}
//       ></div>
//       <div>
//         <img src={dotGrid} className="w-56 h-56 fixed top-6 left-6 " />
//         <img src={dotGrid} className="w-56 h-56 fixed left-[30%]" />
//         <img src={dotGrid} className="w-56 h-56 fixed bottom-32 left-30" />
//         <img src={dotGrid} className="w-56 h-56 fixed top-22 right-64" />
//       </div>
//       <div className="flex justify-center h-[100dvh] items-center relative">
//         <div className="flex flex-col items-center">
//           <h1 className={`${styles.title} text-3xl md:text-5xl text-[#0A0857]`}>
//             Habit Tracker
//           </h1>
//           <p className="my-4">Persistance with your habits.</p>
//           <div className="bg-[#0A0857] text-slate-100 rounded px-3 py-1 flex justify-between items-center text-l">
//             <Link to="/auth" className="mr-2">
//               Get Started
//             </Link>
//             <IonCaretForward />
//           </div>
//         </div>
//         <div>
//           <img src={logo} className="fixed left-[20%] top-[20%] w-32" />
//         </div>
//       </div>
//     </>
//   );
// };

// export default LandingPage;

// import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-indigo-200 to-indigo-300 flex flex-col items-center justify-center">
      <div className="bg-white bg-opacity-20 rounded-full p-1.5 inline-block mb-8">
        <div className="bg-white rounded-full w-14 h-2.5" />
      </div>
      <h1 className="text-6xl font-bold text-indigo-900 mb-3">Habit Tracker</h1>
      <p className="text-lg text-indigo-800 mb-6">
        Persistence with your habits.
      </p>
      <button
        className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 shadow-lg transition duration-300 ease-in-out"
        onClick={() => navigate("/auth")}
      >
        Get Started
      </button>
    </div>
  );
}

function BarChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}
