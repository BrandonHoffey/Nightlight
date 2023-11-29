import React, {
  useLayoutEffect,
  useEffect,
  useContext,
  useState,
  useRef,
  PixelRatio,
} from "react";
import { ScrollView, StyleSheet, Text, View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../UserContext";
import LogoutButton from "../../ui/LogoutButton";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { API_VIEW_ALL_FRIENDS } from "../../constants/Endpoints";
import Friend from "./components/Friends";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../Colors";

const FriendScreen = ({ route }) => {
  const { currentUser, token } = route.params;
  const navigation = useNavigation();
  const [friendItems, setFriendItems] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Friends",
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
        const friends = data.friends;
        setFriendItems(friends);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriends();
  }, [token]);
  return (
    <FlatList
      style={styles.screenContainer}
      data={friendItems}
      keyExtractor={(item) => item._id}
      renderItem={(item) =>
        friendItems.length === 0 ? (
          <Text style={styles.emptyFriendsText}>
            Your friends list is empty
          </Text>
        ) : (
          <Friend
            key={item._id}
            item={item}
            currentUser={currentUser}
            token={token}
          />
        )
      }
    />
  );
};

export default FriendScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.darkBlue,
  },
  emptyFriendsText: {
    fontSize: 16,
    color: Colors.white,
    textAlign: "center",
    marginTop: 20,
  },
});