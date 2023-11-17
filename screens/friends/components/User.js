import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../UserContext";
import { API_SEND_FRIEND_REQUEST } from "../../../constants/Endpoints";
import Colors from "../../../Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const User = ({ item }) => {
  const { userId, setUserId, token } = useContext(UserContext);
  const [requestSent, setRequestSent] = useState(false);
  const sendFriendRequest = async (currentUserId, selectedUserId) => {
    try {
      const response = await fetch(API_SEND_FRIEND_REQUEST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ currentUserId, selectedUserId }),
      });

      if (response.ok) {
        setRequestSent(true);
        await AsyncStorage.setItem(`friendRequest:${selectedUserId}`, 'sent');
        console.log(
          "Add Friend button pressed for user with ID:",
          selectedUserId
        );
      } else {
        console.log(
          "Server returned an error:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.log("error message", error);
    }
  };

  useEffect(() => {
    const checkFriendRequestStatus = async () => {
      const status = await AsyncStorage.getItem(`friendRequest:${item._id}`);
      if (status === 'sent') {
        setRequestSent(true);
      }
    };

    checkFriendRequestStatus();
  }, [item._id]);


  return (
    <Pressable
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
      disabled={requestSent}
    >
      <View>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: "cover",
          }}
          source={{ uri: item.profilePicture }}
        />
      </View>

      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{item?.username}</Text>
      </View>

      <Pressable
        onPress={() => {
          if (!requestSent) {
            sendFriendRequest(userId, item._id);
          }
        }}
        style={{
          backgroundColor: requestSent ? Colors.yellow : Colors.lightBlue,
          padding: 10,
          borderRadius: 6,
          width: 105,
        }}
        disabled={requestSent}
      >
        <Text style={{ textAlign: "center", color: requestSent ? "black" : "white", fontSize: 13 }}>
          {requestSent ? "Pending" : "Add Friend"}
        </Text>
      </Pressable>
    </Pressable>
  );
};

export default User;

const styles = StyleSheet.create({});
