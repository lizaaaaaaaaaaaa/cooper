import React, { useState, useEffect } from "react";

// Створюємо контекст
const AuthContext = React.createContext({
  isAuthenticated: false,
  login: (email, password) => {},
  logout: () => {},
});

// Створюємо провайдер
export const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storageLoginInfo = localStorage.getItem("isLoggedIn");

    if (storageLoginInfo === "auth") {
        setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isLoggedIn", "auth");
    console.log(isAuthenticated);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: isAuthenticated, login: login, logout: logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
