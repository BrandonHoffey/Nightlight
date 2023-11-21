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
import { UserType } from "../../UserContext";
import User from "./components/User";
import { fetchUsers } from "../../api/UserApi";

const FriendScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
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
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    async () => {
      try {
        const data = await fetchUsers();
        setUserItems(data.users);
      } catch (error) {
        console.error(error);
      }
    };
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
