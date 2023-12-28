import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col flex-1 justify-center h-[100dvh] items-center bg-gradient-to-b from-indigo-200 to-indigo-300">
      <p className="text-xl p-4">You seems Lost 🧐</p>
      <Link to="/">
        <span className="bg-blue-900 text-white p-3 rounded-3xl">Go back</span>
      </Link>
    </div>
  );
};

export default NotFound;
