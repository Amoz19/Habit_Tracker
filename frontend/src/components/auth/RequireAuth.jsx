import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hook";

const RequireAuth = ({ children }) => {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;
