import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");

  const login = (userToken, userUserId, userUsername) => {
    if (userToken && userUserId && userUsername) {
      setToken(userToken);
      setUserId(userUserId);
      setUsername(userUsername);
  } else {
    console.error("Invalid token, userId or username");
  }
};

const setDisplayNameForUser = (userDisplayName) => {
  setDisplayName(userDisplayName);
};

  const logout = () => {
    setUserId("");
    setToken("");
    setUsername("");
    setDisplayName("");
  };

  return (
    <UserContext.Provider value={{ userId, setUserId, token, login, logout, username, displayName, setDisplayNameForUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };