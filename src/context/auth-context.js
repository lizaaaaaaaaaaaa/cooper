import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isAuthenticated: false,
  userDetails: null,
  login: (user) => {},
  logout: () => {},
  updateUserDetails: (newDetails) => {}, // Додати функцію для оновлення деталей користувача
});

export const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const storageLoginInfo = localStorage.getItem("isLoggedIn");
    const storageUserInfo = localStorage.getItem("userInfo");

    if (storageLoginInfo === "auth" && storageUserInfo) {
      setIsAuthenticated(true);
      setUserDetails(JSON.parse(storageUserInfo));
    }
  }, []);

  const login = (user) => {
    setIsAuthenticated(true);
    setUserDetails(user);
    localStorage.setItem("isLoggedIn", "auth");
    localStorage.setItem("userInfo", JSON.stringify(user));
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userInfo");
    setIsAuthenticated(false);
    setUserDetails(null);
  };

  const updateUserDetails = (newDetails) => {
    setUserDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails, ...newDetails };
      localStorage.setItem("userInfo", JSON.stringify(updatedDetails));
      console.log(updatedDetails);
      return updatedDetails;
    });
  };

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userDetails,
        login,
        logout,
        updateUserDetails,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
