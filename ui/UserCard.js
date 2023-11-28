import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { fetchFriendDetail } from "../api/FriendApi";
import { latestMessage } from "../api/MessagesApi";
import Colors from "../Colors";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { UserContext } from "../UserContext";
import { useSocket } from "../api/SocketManager";

const UserCard = ({ currentUser }) => {
  const [friendDetails, setFriendDetails] = useState([]);
  const [latestMessages, setLatestMessages] = useState([]);
  const { token } = useContext(UserContext);
  const navigate = useNavigation();
  const socket = useSocket();

  useFocusEffect(
    React.useCallback(() => {
      socket.emit("inboxUpdate", {
        user: currentUser,
      });
      socket.on("inboxUpdate", (update) => {
        setFriendDetails(update);
      });
      return () => {
        socket.off("inboxUpdate");
      };
    }, [socket, currentUser])
  );

  useFocusEffect(
    React.useCallback(() => {
      async function getLatestMessages() {
        try {
          if (!token) throw new Error("Invalid Token");
          const updatedMessages = await Promise.all(
            friendDetails.map(async (friend) => {
              const { latestMessageSent, latestMessageSender } =
                await latestMessage(friend._id, token);
              let data =
                latestMessageSender === currentUser._id
                  ? "Sent"
                  : latestMessageSent;
              if (latestMessageSent?.includes(".gif", "https")) {
                if (latestMessageSender !== currentUser._id) {
                  data = "sent a GIF";
                }
              }
              return { [friend._id]: data };
            })
          );
          setLatestMessages(updatedMessages);
        } catch (error) {
          console.error(error);
        }
      }
      getLatestMessages();
    }, [friendDetails])
  );

  if (latestMessages.length === 0) {
    return (
      <View>
        <ActivityIndicator
          size="large"
          color="#fff"
          style={{ marginTop: "50%" }}
        />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        style={{ height: "100%", width: "100%" }}
        data={friendDetails}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Pressable
            style={styles.container}
            onPress={() =>
              navigate.navigate("MessageScreen", {
                receiverName: item.displayName,
                username: item.username,
                receiverPicture: item.profilePicture,
                receiverId: item._id,
                currentUser: currentUser,
                token: token,
              })
            }
          >
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: item.profilePicture }}
                style={styles.image}
              />
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.text}>{item.displayName}</Text>
              <Text style={[styles.text, { opacity: 0.7 }]}>
                {latestMessages[index][item._id]}
              </Text>
            </View>
          </Pressable>
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightBlue,
    // borderColor: Colors.white,
    // borderWidth: 1,
    height: 100,
    borderRadius: 10,
    padding: 20,
    margin: 10,
  },
  imageWrapper: {
    alignItems: "center",
  },
  textWrapper: {
    flexDirection: "column",
    marginLeft: 20,
  },
  text: {
    color: Colors.white,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
});

export default UserCard;
