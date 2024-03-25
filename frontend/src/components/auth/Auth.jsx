import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Auth = () => {
  const [isOpen, setIsopen] = useState(false);

  const handleOpen = () => {
    setIsopen(true);
  };

  const handleClose = () => {
    setIsopen(false);
  };
  return (
    <>
      {isOpen ? (
        <Signup handleClose={handleClose} />
      ) : (
        <Login handleOpen={handleOpen} />
      )}
    </>
  );
};

export default Auth;
