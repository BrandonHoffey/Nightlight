import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { API_VIEW_ALL_USERS } from '../../constants/Endpoints';


const UserItem = ({ user, onPress, onLayout }) => (
  <TouchableOpacity onPress={() => onPress(user)} onLayout={onLayout}>
    <View style={styles.item}>
      <View style={styles.userInfoContainer}>
        <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
        <View style={styles.userInfo}>
          <Text style={styles.title}>{user.username}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const sendFriendRequest = async (userId) => {

};

const AddFriend = (props) => {
  const [userItems, setUserItems] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [sentFriendRequests, setSentFriendRequests] = useState([]);

  const flatListRef = useRef(null);

  const handleUserPress = (user, layout) => {
    setSelectedUser(user);
    setModalPosition({
      top: layout.y,
      left: layout.x,
    });
    setModalVisible(true);
  };

  const handleSendFriendRequest = async () => {
    try {
      const response = await sendFriendRequest(selectedUser._id);
  
      // Check if response is defined before accessing its properties
      if (response && response.message === 'successfully added friend') {
        setSentFriendRequests((prevRequests) => [
          ...prevRequests,
          response.newFriend,
        ]);
        setModalVisible(false);
        Alert.alert('Friend Request Sent', `Friend request sent to ${selectedUser.username}`);
      } else {
        // Handle the case where response is undefined or has a different structure
        console.error('Unexpected or undefined response:', response);
        Alert.alert('Error sending friend request', 'Unexpected response from the server');
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  async function fetchUserList() {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTI3Mzg3Mzg4ZTA0MTUzY2ExYzUxNSIsImlhdCI6MTY5OTk5NTcwMywiZXhwIjoxNzAwNjAwNTAzfQ.QzzPG1snsmpEE67ncLPq9c54dBJpTRh_7BROsAf1Aqo");
      myHeaders.append("ngrok-skip-browser-warning", "true");
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      const response = await fetch(API_VIEW_ALL_USERS, requestOptions);
      const data = await response.json();
      console.log(data);
      setUserItems(data.users);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchUserList();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <h1 style={styles.h1}>Online Users</h1>
      <FlatList
        ref={flatListRef}
        data={userItems}
        renderItem={({ item, index }) => (
          <UserItem
            user={item}
            onPress={(user) => handleUserPress(user, modalPosition)}
            onLayout={(event) => {
              if (index === 0 && flatListRef.current) {
                flatListRef.current.scrollToIndex({ index: 0 });
              }
            }}
          />
        )}
        keyExtractor={(item) => item._id}
      />
      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={[styles.centeredView, { top: modalPosition.top, left: modalPosition.left }]}>
    <View style={styles.modalView}>
      <Text style={styles.modalText}>Send friend request to {selectedUser?.username}?</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSendFriendRequest}>
          <Text style={styles.buttonText}>Send Request</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#009d94',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  h1: {
    color: '#c5b358',
  },
  centeredView: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#009d94',
    marginHorizontal: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddFriend;