import { API_GROUP_ADD } from "../../constants/Endpoints";

import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import LogoutButton from "../../ui/LogoutButton";
import { Ionicons } from "@expo/vector-icons";
import GetAllUsers from "./AllUsersGroupScreen";
import Colors from "../../Colors";
import { useNavigation } from "@react-navigation/native";
const GroupCreateAddInput = (props) => {
  const navigation = useNavigation();
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  async function handleButtonClick() {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let users = [];

      let body = {
        name: inputValue,
        users: users.push(),
      };
      const requestOptions = {
        method: "Post",
        headers: myHeaders,
        body: JSON.stringify(body),
      };
      const response = await fetch(API_GROUP_ADD, requestOptions);

      const data = await response.json();
      //   props.fetchGroups();
      console.log("Input Value:", inputValue);
      // Hide the input field after saving
      setShowInput(false);
      //  resets input field after save
      setInputValue("");
    } catch (error) {
      console.error(error);
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Create Groups",

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
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => setShowInput(true)}
      >
        <Button
          color={Colors.lightBlue}
          title="Create Group"
          onPress={() => setShowInput(true)}
        />
      </TouchableOpacity>

      {showInput && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Group Name"
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
          />

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleButtonClick}
          >
            <Button
              color={Colors.lightGreen}
              title="Save"
              onPress={handleButtonClick}
            />
          </TouchableOpacity>
        </View>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlue,
    flex: 1,
  },
  buttonContainer: {
    borderRadius: 15,
    overflow: "hidden",
    margin: 10,
  },
  inputContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    backgroundColor: "white",
    height: 40,
    borderColor: Colors.darkGreen,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 200,
    borderRadius: 15,
    overflow: "hidden",
  },
});

export default GroupCreateAddInput;