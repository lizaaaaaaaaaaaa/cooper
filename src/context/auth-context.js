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

  const login = () => {
    setIsAuthenticated(true);
    console.log(isAuthenticated);
  };

  const logout = () => {
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
