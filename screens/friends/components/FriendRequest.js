import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import Reac, { useContext } from "react";
import { UserType } from "../../../UserContext";
import { useNavigation } from "@react-navigation/core";
import { API_FRIEND_REQUEST_ACCEPT } from "../../../constants/Endpoints";

const FriendRequest = ({ item, FriendRequests, setFriendRequests }) => {
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();

  const acceptRequest = async (friendRequestId) => {
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
        navigation.navigate("Friend");
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
        style={{ fontSize: 15, fontWeight: "bold", marginLeft: 10, flex: 1 }}
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
