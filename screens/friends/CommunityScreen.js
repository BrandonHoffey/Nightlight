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

const CommunityScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId, token } = useContext(UserContext);
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
            onPress={() => navigation.navigate("FriendRequestsScreen")}
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
        myHeaders.append("Authorization", token);
        myHeaders.append("ngrok-skip-browser-warning", "true");
        let requestOptions = {
          method: "GET",
          headers: myHeaders,
        };
        const response = await fetch(API_VIEW_ALL_USERS, requestOptions);
        const data = await response.json();
        const filteredUsers = data.users.filter((user) => user._id !== userId);
        setUserItems(filteredUsers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [token, userId]);

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

export default CommunityScreen;

const styles = StyleSheet.create({});