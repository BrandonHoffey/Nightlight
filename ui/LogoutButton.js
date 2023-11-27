import React, { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../UserContext";
import { API_UPDATE_STATUS } from "../constants/Endpoints";

const LogoutButton = () => {
  const navigation = useNavigation();
  const { logout, setUserId, token, userId } = useContext(UserContext);

  const handleLogout = async () => {
    // Reset user status to offline when logging out
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token);

      await fetch(`${API_UPDATE_STATUS}/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          status: "offline",
        }),
      });
    } catch (error) {
      console.error(
        "An error occurred while updating user status during logout:",
        error
      );
    }

    // Reset other user-related states and navigate to the Authorization screen
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
