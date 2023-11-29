import { API_GROUP_ADD, API_VIEW_ALL_FRIENDS } from "../../constants/Endpoints";
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

const GroupCreateAddInput = ({ route }) => {
  const { currentUser } = route.params;
  const navigation = useNavigation();
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [userFriends, setUserFriends] = useState([]);
  const { userId, setUserId, token } = useContext(UserContext);
  const [selectedFriends, setSelectedFriends] = useState([currentUser]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("ngrok-skip-browser-warning", "true");
        let requestOptions = {
          method: "GET",
          headers: myHeaders,
        };
        const response = await fetch(API_VIEW_ALL_FRIENDS, requestOptions);
        const data = await response.json();
        const friends = data.friends;
        setUserFriends(friends);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriends();
  }, [token]);

  const toggleFriendsModal = () => {
    setShowFriendsModal(!showFriendsModal);
  };

  const selectFriend = (friend) => {
    // Toggle the selection status of the friend
    setSelectedFriends((prevSelectedFriends) => {
      if (prevSelectedFriends.includes(friend)) {
        return prevSelectedFriends.filter(
          (selectedFriend) => selectedFriend !== friend
        );
      } else {
        return [...prevSelectedFriends, friend];
      }
    });
  };
  const handleAddFriendsClick = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let body = {
        name: inputValue,
        users: selectedFriends,
      };
      const requestOptions = {
        method: "Post",
        headers: myHeaders,
        body: JSON.stringify(body),
      };
      const response = await fetch(API_GROUP_ADD, requestOptions);

      const data = await response.json();
      console.log("Group Add Response:", data);
      //   props.fetchGroups();
      console.log("Input Value:", inputValue);
      // Hide the input field after saving
      setShowInput(false);
      //  resets input field after save
      setInputValue("");
      setSelectedFriends([]);
    } catch (error) {
      console.error(error);
    }
    setSelectedFriends([]);
    toggleFriendsModal();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Create Groups",
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

          <TouchableOpacity style={styles.buttonContainer}>
            <Button color={Colors.lightGreen} title="Save" />
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
                {userFriends && userFriends.length > 0 ? (
                  userFriends.map((friend) => (
                    <TouchableOpacity
                      key={friend._id}
                      style={[
                        styles.friendItem,
                        selectedFriends &&
                          selectedFriends.includes(friend) &&
                          styles.selectedFriend,
                      ]}
                      onPress={() => selectFriend(friend)}
                    >
                      <Image
                        source={{ uri: friend.profilePicture }}
                        style={styles.profilePicture}
                      />
                      <Text style={styles.displayName}>
                        {friend.displayName}
                      </Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text>No friends to display</Text>
                )}
                {selectedFriends && selectedFriends.length > 0 && (
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={handleAddFriendsClick}
                  >
                    <Button
                      color={Colors.lightBlue}
                      title="Add Friends"
                      onPress={handleAddFriendsClick}
                    />
                  </TouchableOpacity>
                )}
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
    maxHeight: 500,
    overflow: "hidden",
  },
  closeModalButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.lightBlue,
    borderRadius: 5,
    width: 300,
  },
  selectedFriend: {
    backgroundColor: Colors.lightBlue,
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
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.darkBlue,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  displayName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.white,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 20,
  },
});

export default GroupCreateAddInput;
