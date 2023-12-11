import { createContext, useContext, useEffect, useState } from "react";
import { useGetUserFunction } from "../hook/useAuthForm";
import Loading from "../components/Loading";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const { data, isLoading } = useGetUserFunction();
  console.log(data);

  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
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
      <div className="flex h-screen justify-center items-center">
        <Loading />
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
