import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState(null);

  const login = (userToken, userUserId) => {
    if (userToken && userUserId) {
      setToken(userToken);
      setUserId(userUserId);
  } else {
    console.error("Invalid token or userId");
  }
};

  const logout = () => {
    setUserId("");
    setToken("");
  };

  return (
    <UserContext.Provider value={{ userId, setUserId, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };