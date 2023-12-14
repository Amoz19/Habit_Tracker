import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col flex-1 justify-center h-screen items-center">
      <p className="text-xl p-4">You seems Lost 🧐</p>
      <Link to="/habits">
        <span className="bg-blue-900 text-white p-3 rounded-3xl">Go back</span>
      </Link>
    </div>
  );
};

export default NotFound;
