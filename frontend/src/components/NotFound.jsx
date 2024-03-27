import { Link } from "react-router-dom";

const NotFound = ({ message }) => {
  return (
    <div className="flex flex-col flex-1 justify-center h-[100dvh] items-center bg-gradient-to-b  dark:from-black from-[#e6e6e6] dark:via-[#000000] via-[#ffffff] dark:to-gray-800 to-[#d4e6f1]">
      <p className="text-xl p-4">{message} 🧐</p>
      <Link to="/">
        <span className="bg-blue-900 text-white p-3 rounded-3xl">Go back</span>
      </Link>
    </div>
  );
};

export default NotFound;
