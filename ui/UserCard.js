import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { fetchFriendDetail } from "../api/FriendApi";
import Colors from "../Colors";
import { useNavigation } from "@react-navigation/native";

const UserCard = ({ params }) => {
  const [friendDetails, setFriendDetails] = useState([]);
  const navigate = useNavigation();
  useEffect(() => {
    async function get() {
      try {
        const data = await fetchFriendDetail();
        setFriendDetails(data.friends);
      } catch (error) {
        console.error(error);
      }
    }
    get();
  }, []);
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
              navigate.navigate("Messaging", {
                displayName: item.displayName,
                username: item.username,
                profilePicture: item.profilePicture,
                id: item._id,
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
              <Text style={[styles.text, { opacity: 0.7 }]}>hi</Text>
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
    borderRadius: "50%",
  },
});

export default UserCard;
