import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { API_FRIEND_REQUESTS } from "../../constants/Endpoints";
import FriendRequest from "./components/FriendRequest";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FriendRequestsScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId, token } = useContext(UserContext);
  const [friendRequests, setFriendRequests] = useState([]);

  const handleLogout = () => {
    setUserId(null);
    navigation.navigate("Authorization");
  };

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("ngrok-skip-browser-warning", "true");

        const apiUrl = `${API_FRIEND_REQUESTS}/${userId}`;

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
        };

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        const uniqueUserIds = new Set();
        const filteredFriendRequests = data.friendRequests.filter((request) => {
          if (uniqueUserIds.has(request.senderId)) {
            return false;
          }
          uniqueUserIds.add(request.senderId);
          return true;
        });
        console.log(data);
        setFriendRequests(filteredFriendRequests);

      } catch (error) {
        console.log("error message", error);
      }
    };
    fetchFriendRequests();
  }, [token, userId]);

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
      {friendRequests.length === 0 && <Text>No New Friend Requests</Text>}

      {friendRequests.map((item) => (
        <FriendRequest
          key={item._id}
          item={item}
          friendRequests={friendRequests}
          setFriendRequests={setFriendRequests}
        />
      ))}
    </View>
  );
};

export default FriendRequestsScreen;
const styles = StyleSheet.create({});