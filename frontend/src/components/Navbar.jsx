import logo from "../assets/animation.gif";

const Navbar = () => {
  return (
    <div className="bg-slate-900/90 px-8 md:px-32 py-6 sticky top-0 text-white">
      <img src={logo} alt="logo" className="w-24" />
    </div>
  );
};

export default Navbar;
