import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");

  const login = (userToken, userUserId, userUsername) => {
    if (userToken && userUserId && userUsername) {
      setToken(userToken);
      setUserId(userUserId);
      setUsername(userUsername);
  } else {
    console.error("Invalid token, userId or username");
  }
};

  const logout = () => {
    setUserId("");
    setToken("");
    setUsername("");
  };

  return (
    <UserContext.Provider value={{ userId, setUserId, token, login, logout, username }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };