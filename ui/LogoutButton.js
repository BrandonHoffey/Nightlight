import React, { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../UserContext";

const LogoutButton = () => {
  const navigation = useNavigation();
  const {logout, setUserId} = useContext(UserContext);

  const handleLogout = () => {
    setUserId(null);
    logout();
    navigation.navigate("Authorization");
  };

  return (
    <MaterialCommunityIcons
      name="logout"
      size={24}
      color="white"
      onPress={handleLogout}
    />
  );
};

export default LogoutButton;