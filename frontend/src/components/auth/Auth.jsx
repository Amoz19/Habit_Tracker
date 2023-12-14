import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useUser } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const Auth = () => {
  const [isOpen, setIsopen] = useState(false);
  const { user } = useUser();

  if (user) {
    return <Navigate to="/habits" />;
  }

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
