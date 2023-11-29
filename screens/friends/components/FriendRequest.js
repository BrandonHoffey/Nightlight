import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  PixelRatio,
  FlatList,
} from "react-native";
import React, { useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { UserContext } from "../../../UserContext";
import { useNavigation } from "@react-navigation/core";
import {
  API_FRIEND_REQUEST_ACCEPT,
  API_FRIEND_REQUEST_DECLINE,
} from "../../../constants/Endpoints";
import Colors from "../../../Colors";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

const FriendRequest = ({ item, friendRequests, setFriendRequests }) => {
  const { userId, setUserId, token } = useContext(UserContext);
  const navigation = useNavigation();

  const acceptRequest = async (friendRequestId) => {
    try {
      const response = await fetch(API_FRIEND_REQUEST_ACCEPT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          senderId: friendRequestId,
          recipientId: userId,
        }),
      });

      const responseData = await response.json();
      if (response.ok) {
        setFriendRequests((prevFriendRequests) =>
          prevFriendRequests.filter(
            (request) => request._id !== friendRequestId
          )
        );
      }
    } catch (error) {
      console.log("error accepting the friend request", error);
    }
  };

  const declineRequest = async (friendRequestId) => {
    try {
      const response = await fetch(API_FRIEND_REQUEST_DECLINE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          senderId: friendRequestId,
          recipientId: userId,
        }),
      });

      const responseData = await response.json();
      if (response.ok) {
        setFriendRequests((prevFriendRequests) =>
          prevFriendRequests.filter(
            (request) => request._id !== friendRequestId
          )
        );
      }
    } catch (error) {
      console.log("error declining the friend request", error);
    }
  };

  return (
    <FlatList
      style={{ flex: 1 }}
      data={friendRequests}
      keyExtractor={(item, index) => item._id.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.requestsContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <Image
              style={{ width: 50, height: 50, borderRadius: 25 }}
              source={{ uri: item.profilePicture }}
            />
            <Text
              style={{
                fontSize: getFontSize(16),
                fontWeight: "bold",
                marginLeft: 10,
                flex: 1,
                color: "white",
              }}
            >
              {item?.displayName} {"\n"}
              <Text
                style={{
                  fontSize: getFontSize(15),
                  fontWeight: "normal",
                  marginLeft: 10,
                  flex: 1,
                  color: "white",
                }}
              >
                sent you a friend request!
              </Text>
            </Text>
            <View
              style={{ alignItems: "center", flex: 1, flexDirection: "row" }}
            >
              <Pressable
                onPress={() => acceptRequest(item._id)}
                style={{
                  backgroundColor: Colors.lightBlue,
                  padding: 10,
                  borderRadius: 20,
                }}
              >
                <Text style={{ textAlign: "center", color: "white" }}>
                  Accept
                </Text>
              </Pressable>
              <Pressable
                onPress={() => declineRequest(item._id)}
                style={{
                  backgroundColor: Colors.red,
                  padding: 10,
                  borderRadius: 20,
                  marginLeft: 10,
                }}
              >
                <Text style={{ textAlign: "center", color: "white" }}>
                  Decline
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default FriendRequest;

const styles = StyleSheet.create({
  requestsContainer: {
    flex: 1,
  },
});
