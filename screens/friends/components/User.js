import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../UserContext";
import {
  API_SEND_FRIEND_REQUEST,
  API_SENT_FRIEND_REQUESTS,
  API_VIEW_ALL_FRIENDS_BY_ID,
} from "../../../constants/Endpoints";
import Colors from "../../../Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const User = ({ item }) => {
  const { userId, setUserId, token } = useContext(UserContext);
  const [requestSent, setRequestSent] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [userFriends, setUserFriends] = useState([]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await fetch(`${API_SENT_FRIEND_REQUESTS}/${userId}`);

        const data = await response.json();
        if (response.ok) {
          setFriendRequests(data);
        } else {
          console.log("error", response.status);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchFriendRequests();
  }, []);

  useEffect(() => {
    const fetchUserFriends = async () => {
      try {
        const response = await fetch(`${API_VIEW_ALL_FRIENDS_BY_ID}/${userId}`);

        const data = await response.json();

        if (response.ok) {
          setUserFriends(data);
        } else {
          console.log("error retrieving user friends", response.status);
        }
      } catch (error) {
        console.log("Error Message", error);
      }
    };

    fetchUserFriends();
  }, []);

  useEffect(() => {
    const loadRequestSentStatus = async () => {
      try {
        const status = await AsyncStorage.getItem(`friendRequest:${item._id}`);
        setRequestSent(status === "sent");
      } catch (error) {
        console.log("Error loading requestSent status", error);
      }
    };

    loadRequestSentStatus();
  }, [item._id]);

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
        await AsyncStorage.setItem(`friendRequest:${selectedUserId}`, "sent");
        setRequestSent(true);
        console.log(
          "Add Friend button pressed for user with ID:",
          selectedUserId
        );
      }
    } catch (error) {
      console.log("error message", error);
    }
  };

  console.log("friend request sent", friendRequests);
  console.log("user friends", userFriends);

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

      {userFriends.includes(item._id) ? (
        <Pressable
          style={{
            backgroundColor: "#82CD47",
            padding: 10,
            width: 105,
            borderRadius: 6,
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>Friends</Text>
        </Pressable>
      ) : requestSent ||
        friendRequests.some((friend) => friend._id === item._id) ? (
        <Pressable
          style={{
            backgroundColor: "gray",
            padding: 10,
            width: 105,
            borderRadius: 6,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
            Pending
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => sendFriendRequest(userId, item._id)}
          style={{
            backgroundColor: "#567189",
            padding: 10,
            borderRadius: 6,
            width: 105,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
            Add Friend
          </Text>
        </Pressable>
      )}
    </Pressable>
  );
};

export default User;

const styles = StyleSheet.create({});
