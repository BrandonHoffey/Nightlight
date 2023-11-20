import { StyleSheet, Text, View, Pressable, Image, PixelRatio} from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../../UserContext";
import { useNavigation } from "@react-navigation/core";
import { API_FRIEND_REQUEST_ACCEPT } from "../../../constants/Endpoints";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;
const FriendRequest = ({ item, FriendRequests, setFriendRequests }) => {
  const { userId, setUserId } = useContext(UserContext);
  const navigation = useNavigation();

  const acceptRequest = async (friendRequestId) => {
    console.log("Accept button pressed for friendRequestId:", friendRequestId);
    try {
      const response = await fetch(API_FRIEND_REQUEST_ACCEPT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: friendRequestId,
          recipientId: userId,
        }),
      });

      if (response.ok) {
        setFriendRequests(
          FriendRequests.filter((request) => request._id !== friendRequestId)
        );
        console.log("Updated Friend Requests:", FriendRequests);
        console.log("Accepting friend request for user:", userId, "from user:", friendRequestId);
        // navigation.navigate("Community");
      }
    } catch (error) {
      console.log("error accepting the friend request", error);
    }
  };
  return (
    <Pressable
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
        style={{ fontSize: getFontSize(16), fontWeight: "bold", marginLeft: 10, flex: 1 }}
      >
        {item?.username} sent you a friend request!!
      </Text>
      <Pressable
        onPress={() => acceptRequest(item._id)}
        style={{ backgroundColor: "#0066b2", padding: 10, borderRadius: 6 }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>Accept</Text>
      </Pressable>
    </Pressable>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({});
