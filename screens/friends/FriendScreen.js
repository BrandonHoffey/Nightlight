import { StyleSheet, Text, View } from "react-native";
import React, {
  useLayoutEffect,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../../UserContext";
import { API_VIEW_ALL_USERS } from "../../constants/Endpoints";
import User from "./components/User";
import LogoutButton from "../../ui/LogoutButton";

const FriendScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [userItems, setUserItems] = useState([]);

  const flatListRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Nightlight</Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <AntDesign name="message1" size={24} color="black" />
          <Ionicons
            onPress={() => navigation.navigate("ViewFriends")}
            name="people-outline"
            size={24}
            color="black"
          />
          <LogoutButton />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTRlNDAyMjcwYjI2NDliY2NjODJmYiIsImlhdCI6MTcwMDA2NTgwNywiZXhwIjoxNzAwNjcwNjA3fQ.FRiNpxJMMN6BNYUwR_hX7XU8VD2C-YsVwUTtsaCErTc"
        );
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
    };

    fetchUsers();
  }, []);

  return (
    <View>
      <View style={{ padding: 10 }}>
        {userItems.map((item, index) => (
          <User key={index} item={item} />
        ))}
      </View>
    </View>
  );
};

export default FriendScreen;

const styles = StyleSheet.create({});
