import React, { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";

const LogoutButton = () => {
  const navigation = useNavigation();
  const { setUserId } = useContext(UserType);

  const handleLogout = () => {
    setUserId(null);
    navigation.navigate("Authorization");
  };

  return (
    <MaterialCommunityIcons
      name="logout"
      size={24}
      color="black"
      onPress={handleLogout}
    />
  );
};

export default LogoutButton;