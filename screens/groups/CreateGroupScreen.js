import { API_GROUP_ADD } from "../../constants/Endpoints";

import React, { useState, useContext, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Modal,
  Text,
} from "react-native";
import { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import LogoutButton from "../../ui/LogoutButton";
import { Ionicons } from "@expo/vector-icons";
import GetAllUsers from "./AllUsersGroupScreen";
import Colors from "../../Colors";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../UserContext";
import { API_VIEW_ALL_FRIENDS_BY_ID, API_VIEW_FRIENDS_DETAILS } from "../../constants/Endpoints";

const GroupCreateAddInput = (props) => {
  const navigation = useNavigation();
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [userFriends, setUserFriends] = useState([]);
  const { userId, setUserId, token } = useContext(UserContext);

  useEffect(() => {
    const fetchUserFriends = async () => {
      try {
        const response = await fetch(`${API_VIEW_ALL_FRIENDS_BY_ID}/${userId}`);
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          setUserFriends(data);
        } else {
          console.log("Error retrieving user friends", response.status);
        }
      } catch (error) {
        console.log("Error Message", error);
      }
    };

    fetchUserFriends();
  }, [userId]);

  const toggleFriendsModal = () => {
    setShowFriendsModal(!showFriendsModal);
  };

  const handleButtonClick = async () => {
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
  };
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
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={toggleFriendsModal}
          >
            <Button
              color={Colors.lightBlue}
              title="Add Friends"
              onPress={toggleFriendsModal}
            />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showFriendsModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Friends List</Text>
                {/* Display the user's friends */}
                {userFriends.map((friend) => {
                  console.log("Friend object:", friend); // Add this line for debugging
                  return (
                    <View key={friend._id} style={styles.friendItem}>
                      {/* Display friend's profile picture */}
                      <Image
                        source={{ uri: friend.profilePicture }}
                        style={styles.profilePicture}
                      />
                      {/* Display friend's display name */}
                      <Text style={styles.displayName}>
                        {friend.displayName}
                      </Text>
                    </View>
                  );
                })}
              </View>

              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={toggleFriendsModal}
              >
                <Text style={styles.closeModalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
    maxHeight: 400, // Adjust as needed
    overflow: "hidden",
  },
  closeModalButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.lightBlue,
    borderRadius: 5,
  },
  closeModalButtonText: {
    color: "white",
    textAlign: "center",
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  displayName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GroupCreateAddInput;
