import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import { useEffect } from "react";

const RequireAuth = ({ children }) => {
  const token = useAppSelector((state) => state.auth.token);
  console.log(token);
  useEffect(() => {}, [token]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;
