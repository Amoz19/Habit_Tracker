import { Navigate } from "react-router-dom";
import useAuthContext from "../../hook/useAuthContext";
import { useEffect, useState } from "react";

const RequireAuth = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;
