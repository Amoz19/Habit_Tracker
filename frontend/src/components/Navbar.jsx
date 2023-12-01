import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-slate-100 px-32 py-6 sticky top-0  mb-4">
      <Link to="/">Habit Tracker</Link>
    </div>
  );
};

export default Navbar;
