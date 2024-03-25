import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useGetUserFunction } from "../hook/useAuthForm";
import Loading from "../components/Loading";
import LoadingSpinner from "../components/LoadingSpinner";

export const AuthContext = createContext(null);

const initialState = { user: null };

const reducerFn = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFn, initialState);
  console.log(state);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
