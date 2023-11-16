import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { API_FRIEND_REQUESTS } from "../../constants/Endpoints";
import FriendRequest from "./components/FriendRequest";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ViewFriendsScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserContext);
  const [friendRequests, setFriendRequests] = useState([]);

  const handleLogout = () => {
    setUserId(null);
    navigation.navigate("Authorization");
  };

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTRlNDAyMjcwYjI2NDliY2NjODJmYiIsImlhdCI6MTcwMDA2NTgwNywiZXhwIjoxNzAwNjcwNjA3fQ.FRiNpxJMMN6BNYUwR_hX7XU8VD2C-YsVwUTtsaCErTc"
        );
        myHeaders.append("ngrok-skip-browser-warning", "true");

        const userId = "6554e402270b2649bccc82fb";
        const apiUrl = `${API_FRIEND_REQUESTS}/${userId}`;

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
        };

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        console.log(data);
        setFriendRequests(data.friendRequests);
      } catch (error) {
        console.log("error message", error);
      }
    };
    fetchFriendRequests();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Nightlight</Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <MaterialCommunityIcons
            name="logout"
            size={24}
            color="black"
            onPress={handleLogout}
          />
        </View>
      ),
    });
  }, []);

  return (
    <View style={{ padding: 10, marginHorizontal: 12 }}>
      {friendRequests.length > 0 && <Text>Your Friend Requests</Text>}

      {friendRequests.map((item, index) => (
        <FriendRequest
          key={index}
          item={item}
          friendRequests={friendRequests}
          setFriendRequests={setFriendRequests}
        />
      ))}
    </View>
  );
};

export default ViewFriendsScreen;
const styles = StyleSheet.create({});
