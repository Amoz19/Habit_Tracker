import React from "react";
import { useUser } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/auth" />;
  }
  return children;
};

export default RequireAuth;
