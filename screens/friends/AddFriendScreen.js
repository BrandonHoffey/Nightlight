import React, { useEffect, useState } from 'react';
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
  Button,
} from 'react-native';
import { API_VIEW_ALL_USERS } from '../../constants/Endpoints';


const UserItem = ({ user, onPress }) => (
  <TouchableOpacity onPress={() => onPress(user)}>
    <View style={styles.item}>
      <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
      <Text style={styles.title}>{user.username}</Text>
      {/* <Text style={styles.subtitle}>{user.displayName}</Text> */}
      {/* <Text style={styles.subtitle}>{user.email}</Text> */}
    </View>
  </TouchableOpacity>
);

const AddFriend = (props) => {
  const [userItems, setUserItems] = useState([]);

  async function fetchUserList() {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGE5OWJlNjQ3YjA2NTA4MTM3NzQ3ZSIsImlhdCI6MTY5OTkwMTk1OCwiZXhwIjoxNzAwNTA2NzU4fQ.zuPiLLMX4772VipOVHV2MM6JAjuJ1Xz7VVtDXqeDz40");
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
      <h1 style={styles.h1}>All Users</h1>
      <FlatList
        data={userItems}
        renderItem={({item}) => <UserItem user={item} />}
        keyExtractor={(item) => item._id}
      />
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
});

export default AddFriend;