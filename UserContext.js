import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  const login = async (userToken, userUserId) => {
    try {
      const TOKEN = await AsyncStorage.getItem("TOKEN");
      const USER_ID = await AsyncStorage.getItem("USER_ID");
      if (!userToken && !userUserId)
        throw new Error("error: params missing data");
      if (!userId || !token) {
        if (TOKEN && USER_ID) {
          setToken(TOKEN);
          setUserId(USER_ID);
        } else {
          setToken(userToken);
          setUserId(userUserId);
          await AsyncStorage.setItem("TOKEN", userToken);
          await AsyncStorage.setItem("USER_ID", userUserId);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      setUserId("");
      setToken("");
      await AsyncStorage.removeItem("TOKEN");
      await AsyncStorage.removeItem("USER_ID");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkStorage = async () => {
      try {
        const TOKEN = await AsyncStorage.getItem("TOKEN");
        const USER_ID = await AsyncStorage.getItem("USER_ID");
        if (TOKEN && USER_ID) {
          setToken(TOKEN);
          setUserId(USER_ID);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkStorage();
  }, []);
  return (
    <UserContext.Provider value={{ userId, setUserId, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
