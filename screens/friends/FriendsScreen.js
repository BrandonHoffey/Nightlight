import React, {
  useLayoutEffect,
  useEffect,
  useContext,
  useState,
  useRef,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../UserContext";
import LogoutButton from "../../ui/LogoutButton";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { API_VIEW_ALL_FRIENDS } from "../../constants/Endpoints";
import Friend from "./components/Friends";

const FriendScreen = () => {
    const navigation = useNavigation();
    const { userId, setUserId, token } = useContext(UserContext);
    const [friendItems, setFriendItems] = useState([]);

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
                setFriendItems(data.friends || []);
            } catch (error) {
                console.log(error);
            }
        }
        fetchFriends();
      }, [token]);

  return (
    <View>
      <View style={{ padding: 10 }}>
        {friendItems.map((item, index) => (
          <Friend key={index} item={item} />
        ))}
      </View>
    </View>
  );
};

export default FriendScreen;

const styles = StyleSheet.create({});