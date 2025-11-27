"user client"
import React, { createContext, useContext, useEffect } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {



  const logIn = (userData) => {

  };

  const logOut = () => {
  
  };
  useEffect(() => {
    const restoreToken = async () => {
      console.log("Restoring Token");
    };
    restoreToken();
  }, []);
  return (
    <AuthContext.Provider value={{ logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
