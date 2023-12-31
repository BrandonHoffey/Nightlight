import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  PixelRatio,
  Modal,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { UserContext } from "../../../UserContext";
import {
  API_SEND_FRIEND_REQUEST,
  API_SENT_FRIEND_REQUESTS,
  API_VIEW_ALL_FRIENDS_BY_ID,
} from "../../../constants/Endpoints";
import Colors from "../../../Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

const User = ({ item }) => {
  const { userId, setUserId, token } = useContext(UserContext);
  const [requestSent, setRequestSent] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const fetchFriendRequests = async () => {
    try {
      const response = await fetch(`${API_SENT_FRIEND_REQUESTS}/${userId}`);
      const data = await response.json();
      // console.log(data);
      if (response.ok) {
        setFriendRequests(data);
      } else {
        console.log("error fetching friend requests", response.status, data);
      }
    } catch (error) {
      console.log("Fetch error", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchFriendRequests = async () => {
        try {
          const url = `${API_SENT_FRIEND_REQUESTS}/${userId}`;
          const response = await fetch(url);
          const data = await response.json();
          if (response.ok) {
            setFriendRequests(data);
          } else {
            console.log(
              "error fetching friend requests",
              response.status,
              data
            );
          }
        } catch (error) {
          console.log("Fetch error", error);
        }
      };
      fetchFriendRequests();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      const checkFriendshipStatus = () => {
        if (friendRequests.some((friend) => friend._id === item._id)) {
          setRequestSent(true);
        } else {
          setRequestSent(false);
        }
      };
      checkFriendshipStatus();
    }, [friendRequests, item._id, requestSent])
  );

  useFocusEffect(
    React.useCallback(() => {
      const loadRequestSentStatus = async () => {
        try {
          const status = await AsyncStorage.getItem(
            `friendRequest:${item._id}`
          );
          setRequestSent(status === "sent");
        } catch (error) {
          console.log("Error loading requestSent status", error);
        }
      };

      loadRequestSentStatus();
    }, [friendRequests, item._id])
  );

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserFriends = async () => {
        try {
          const response = await fetch(
            `${API_VIEW_ALL_FRIENDS_BY_ID}/${userId}`
          );
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
    }, [userId])
  );

  const sendFriendRequest = async (currentUserId, selectedUserId) => {
    try {
      if (userFriends.includes(selectedUserId) || requestSent) {
        return;
      }

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

        fetchFriendRequests();
        fetchUserFriends();

        console.log(
          "Add Friend button pressed for user with ID:",
          selectedUserId
        );
      }
    } catch (error) {
      console.log("error message", error);
    }
  };

  return (
    <>
      <Pressable
        onPress={() => toggleModal()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
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
          <Text
            style={{
              fontWeight: "bold",
              color: Colors.white,
              fontSize: getFontSize(16),
            }}
          >
            {item?.displayName}
          </Text>
        </View>

        <Pressable
          onPress={() => sendFriendRequest(userId, item._id)}
          style={{
            backgroundColor: userFriends.includes(item._id)
              ? Colors.lightGreen
              : requestSent
              ? Colors.yellow
              : Colors.lightBlue,
            padding: 10,
            borderRadius: 20,
            width: 105,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: userFriends.includes(item._id)
                ? "white"
                : requestSent
                ? "black"
                : "white",
              fontSize: getFontSize(14),
            }}
          >
            {userFriends.includes(item._id)
              ? "Friend"
              : requestSent
              ? "Pending"
              : "Add Friend"}
          </Text>
        </Pressable>
      </Pressable>

      {/* Modal for displaying larger profile picture */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <Image
            style={styles.modalImage}
            source={{ uri: item.profilePicture }}
          />
          <Pressable onPress={() => toggleModal()} style={styles.closeButton}>
            <Text style={{ color: Colors.white }}>Close</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    borderRadius: 15,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default User;