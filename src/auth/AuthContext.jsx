import { createContext, useEffect, useState } from "react";
import { userObserver } from "../auth/firebase.js";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(false);
  useEffect(() => {
    userObserver(setCurrUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currUser }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
