// import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  PixelRatio,
} from "react-native";
import Colors from "../../Colors";
import { API_GROUP_VIEW_ALL } from "../../constants/Endpoints";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

export default ViewGroupsCreated = ({ route }) => {
  const { currentUser, token } = route.params;
  const [viewAllGroups, setViewAllGroups] = useState([]);
  const navigate = useNavigation();

  const handlePress = (item, users) => {
    console.log(item);
    navigate.navigate("MessageScreen", {
      receiverName: item.name,
      username: users,
      receiverPicture: item.groupPicture,
      receiverId: item._id,
      currentUser: currentUser,
      token: token,
    });
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        let requestOptions = {
          method: "GET",
          headers: myHeaders,
        };
        const response = await fetch(API_GROUP_VIEW_ALL, requestOptions);
        const data = await response.json();
        setViewAllGroups(data.groups);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, []);
  const Item = ({ name, users, picture, item }) => {
    if (users.length >= 3) {
      users = users.slice(0, 2);
      const updatedUsers = users.push("and others");
    }
    users = users.slice(0, 3).join(" ");
    return (
      <TouchableOpacity
        style={styles.groupInfo}
        onPress={() => handlePress(item, users)}
      >
        <View style={styles.wrapper}>
          <Image
            source={{ uri: picture }}
            style={{ height: 50, width: 50, borderRadius: 50 }}
          />
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.usersText}>{users}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={viewAllGroups}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Item
            name={item.name}
            users={item.users}
            picture={item.groupPicture}
            item={item}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlue,
    flex: 1,
  },
  nameText: {
    backgroundColor: Colors.lightBlue,
    color: "white",
    fontSize: getFontSize(18),
  },
  usersText: {
    backgroundColor: Colors.lightBlue,
    color: Colors.lightGreen,
    fontSize: getFontSize(14),
  },
  groupInfo: {
    backgroundColor: Colors.lightBlue,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
  },
  wrapper: {
    padding: 5,
  },
});
