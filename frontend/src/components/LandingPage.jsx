import { useNavigate, Navigate } from "react-router-dom";
import { useUser } from "../context/AuthContext";

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  if (user) {
    return <Navigate to="/habits" />;
  }
  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-indigo-200 to-indigo-300 flex flex-col items-center justify-center">
      <div className="bg-white bg-opacity-20 rounded-full p-1.5 inline-block mb-8">
        <div className="bg-white rounded-full w-14 h-2.5" />
      </div>
      <h1 className="text-6xl font-bold text-indigo-900 mb-3">Habit Tracker</h1>
      <p className="text-lg text-indigo-800 mb-6">
        Stick with your habits to achive goals
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
