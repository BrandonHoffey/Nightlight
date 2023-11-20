import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, {
  useLayoutEffect,
  useContext,
  useEffect,
  useState,
  useRef,
  PixelRatio,
} from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../../UserContext";
import { API_VIEW_ALL_USERS } from "../../constants/Endpoints";
import User from "./components/User";
import LogoutButton from "../../ui/LogoutButton";
import Colors from "../../Colors";

// const fontScale = PixelRatio.getFontScale();
// const getFontSize = (size) => size / fontScale;

const CommunityScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId, token } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [userItems, setUserItems] = useState([]);

  const flatListRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Community",
      // headerLeft: () => (
      //   <Text style={{ fontSize: getFontSize(16), fontWeight: "bold" }}>
      //     Nightlight
      //   </Text>
      // ),
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
        console.log(data);
        const filteredUsers = data.users.filter((user) => user._id !== userId);
        setUserItems(filteredUsers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <SafeAreaView>
      <View style={styles.screenContainer}>
        {userItems.map((item, index) => (
          <User key={index} item={item} />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default CommunityScreen;

const styles = StyleSheet.create({
  screenContainer: {
    padding: 10,
    backgroundColor: Colors.darkBlue,
    height: "100%",
    width: "100%",
  },
});