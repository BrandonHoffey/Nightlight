import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { API_FRIEND_REQUESTS } from "../../constants/Endpoints";
import FriendRequest from "./components/FriendRequest";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../Colors";
import { Fonts } from "../../Font";
import { currentUser } from "../../api/UserApi";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

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
        const currentUserFriends = await currentUser(token);
        const requests = data.friendRequests;
        const currentFriends = currentUserFriends.friends;
        const currentRequests = requests.filter(
          (item) => !currentFriends.includes(item._id)
        );
        setFriendRequests(currentRequests);
      } catch (error) {
        console.log("error message", error);
      }
    };
    fetchFriendRequests();
  }, [token, userId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      // headerLeft: () => (
      //   <Text style={{ fontSize: getFontSize(16), fontWeight: "bold" }}>Nightlight</Text>
      // ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <MaterialCommunityIcons
            name="logout"
            size={24}
            color="white"
            onPress={handleLogout}
          />
        </View>
      ),
    });
  }, []);

  if (friendRequests.length === 0) {
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.yourFriendRequests}>No New Friend Requests</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: Colors.darkBlue }}>
      <View style={styles.screenContainer}>
        <Text style={styles.yourFriendRequests}>Your Friend Requests</Text>
        <FriendRequest
          friendRequests={friendRequests}
          setFriendRequests={setFriendRequests}
        />
      </View>
    </SafeAreaView>
  );
};

export default FriendRequestsScreen;
const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: Colors.darkBlue,
    padding: 10,
    // marginHorizontal: 12,
    height: "100%",
    width: "100%",
  },
  noRequestsText: {
    color: Colors.yellow,
    fontSize: getFontSize(16),
    textAlign: "center",
    marginTop: "50%",
  },
  yourFriendRequests: {
    color: Colors.yellow,
    fontSize: getFontSize(16),
    textAlign: "center",
  },
});
