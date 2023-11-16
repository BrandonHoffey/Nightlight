import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { UserType } from "../../UserContext";
import { API_FRIEND_REQUESTS } from "../../constants/Endpoints";
import FriendRequest from "./components/FriendRequest";

const ViewFriendsScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTRlNDAyMjcwYjI2NDliY2NjODJmYiIsImlhdCI6MTcwMDA2NTgwNywiZXhwIjoxNzAwNjcwNjA3fQ.FRiNpxJMMN6BNYUwR_hX7XU8VD2C-YsVwUTtsaCErTc"
        );
        myHeaders.append("ngrok-skip-browser-warning", "true");

        const userId = "6554e402270b2649bccc82fb";
        const apiUrl = `${API_FRIEND_REQUESTS}/${userId}`;

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
        };

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        console.log(data);

        // const data = JSON.parse(textResponse);

        setFriendRequests(data.friendRequests);
      } catch (error) {
        console.log("error message", error);
      }
    };
    fetchFriendRequests();
  }, []);

  return (

    <View style={{ padding: 10, marginHorizontal: 12 }}>
      {friendRequests.length > 0 && <Text>Your Friend Requests</Text>}

      {friendRequests.map((item, index) => (
        <FriendRequest
          key={index}
          item={item}
          friendRequests={friendRequests}
          setFriendRequests={setFriendRequests}
        />
      ))}
    </View>
  );
};

export default ViewFriendsScreen;
const styles = StyleSheet.create({});