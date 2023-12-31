import { StyleSheet, Text, View, PixelRatio, SafeAreaView, FlatList } from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { API_FRIEND_REQUESTS } from "../../constants/Endpoints";
import FriendRequest from "./components/FriendRequest";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Colors from "../../Colors";
import { Fonts } from "../../Font";

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
      // console.log(data);
      setFriendRequests(filteredFriendRequests);
    } catch (error) {
      console.log("error message", error);
    }
  };

  useEffect(() => {
    fetchFriendRequests();
  

  useFocusEffect(
    React.useCallback(() => {
      fetchFriendRequests();
    }, [fetchFriendRequests])
  );

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

  return (
    <SafeAreaView>
      <View style={styles.screenContainer}>
        {friendRequests.length > 0 && (
          <Text style={styles.yourFriendRequests}>
            Your Friend Requests
          </Text>
        )}
        {friendRequests.length === 0 && (
          <Text style={styles.noRequestsText}>
            No New Friend Requests
          </Text>
        )}

<FlatList
  data={friendRequests}
  keyExtractor={(item) => item._id}
  renderItem={({ item }) => (
    <FriendRequest
      item={item}
      friendRequests={friendRequests}
      setFriendRequests={setFriendRequests}
    />
  )}
  extraData={friendRequests}
/>
      </View>
    </SafeAreaView>
  );
  }

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
  }
});