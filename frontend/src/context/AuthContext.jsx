import { createContext, useContext, useEffect, useState } from "react";
import { useGetUserFunction } from "../hook/useAuthForm";
import Loading from "../components/Loading";
import LoadingSpinner from "../components/LoadingSpinner";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const { data, isLoading } = useGetUserFunction();

  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
    console.log(data);
  }, [data]);

  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="flex h-[100dvh] justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => {
  return useContext(AuthContext);
};
