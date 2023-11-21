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
  PixelRatio,
} from "react-native";
import Colors from "../../Colors";
import { API_GROUP_VIEW_ALL } from "../../constants/Endpoints";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserContext";
import { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import LogoutButton from "../../ui/LogoutButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

export default ViewGroupsCreated = (props) => {
  const navigation = useNavigation();
  const { userId, setUserId, token } = useContext(UserContext);
  const [viewAllGroups, setViewAllGroups] = useState([]);
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
        console.log(data);
        setViewAllGroups(data.groups);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);
  useEffect(() => {
    console.log("use effect log", viewAllGroups);
  }, [viewAllGroups]);

  const Item = ({ name, users }) => (
    <View style={styles.groupInfo}>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.usersText}>{users}</Text>
    </View>
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "All Groups",

      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <AntDesign name="message1" size={24} color="white" />
          <Ionicons
            onPress={() => navigation.navigate("FriendRequestsScreen")}
            name="people-outline"
            size={24}
            color="white"
          />
          <LogoutButton />
        </View>
      ),
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={viewAllGroups}
        renderItem={({ item }) => <Item name={item.name} users={item.users} />}
        keyExtractor={(item) => item._id}
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
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 15,
  },
  // buttonContainer: {
  //   borderRadius: 15,
  //   overflow: "hidden",
  //   margin: 10,
  //   color: Colors.lightBlue,
  // },
});

