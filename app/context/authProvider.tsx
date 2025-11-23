"user client"
import React, { createContext, useContext, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../utils/redux";
import { login, logout } from "./slices/authSlice";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const userToken = useAppSelector((state) => state.auth.userToken);

  const logIn = (userData) => {
    dispatch(login(userData)); // Dispatch login action
  };

  const logOut = () => {
    dispatch(logout()); // Dispatch logout action
  };
  useEffect(() => {
    const restoreToken = async () => {
      console.log("Restoring Token");
    };
    restoreToken();
  }, []);
  return (
    <AuthContext.Provider value={{ isAuthenticated, userToken, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
