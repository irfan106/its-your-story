import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser ?? null);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, active, setActive }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
