import React, {
  useLayoutEffect,
  useEffect,
  useContext,
  useState,
  useRef,
  PixelRatio
} from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../UserContext";
import LogoutButton from "../../ui/LogoutButton";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { API_VIEW_ALL_FRIENDS } from "../../constants/Endpoints";
import Friend from "./components/Friends";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../Colors";

// const fontScale = PixelRatio.getFontScale();
// const getFontSize = (size) => size / fontScale;

const FriendScreen = () => {
    const navigation = useNavigation();
    const { userId, setUserId, token } = useContext(UserContext);
    const [friendItems, setFriendItems] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: "Friends",
          // headerLeft: () => (
          //   <Text style={{ fontSize: 16, fontWeight: "bold" }}>Nightlight</Text>
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

      <ScrollView style={styles.screenContainer}>
        {friendItems.map((item) => (
          <Friend key={item._id} item={item} />
        ))}
      </ScrollView>

  );
};

export default FriendScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.darkBlue,
  },
});