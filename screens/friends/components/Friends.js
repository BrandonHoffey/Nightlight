import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  PixelRatio,
} from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../../UserContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../../Colors";
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

const Friend = ({ item }) => {
  console.log("Friend Component - Item:", item);
  const { userId, setUserId } = useContext(UserContext);

  const handleChatPress = () => {
    console.log("Chat button pressed for user:", item.username);
  };

  return (
    <SafeAreaView>
      <View style={styles.screenContainer}>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between", // Add this to create space between items
            // marginVertical: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                resizeMode: "cover",
              }}
              source={{ uri: item.profilePicture }}
            />

            <View style={{ marginLeft: 12 }}>
              <Text
                style={{
                  fontSize: getFontSize(16),
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {item?.username}
              </Text>
            </View>
          </View>

          <Pressable
            onPress={handleChatPress}
            style={{
              backgroundColor: Colors.lightBlue,
              padding: 10,
              borderRadius: 20,
              width: 70,
            }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: getFontSize(14) }}>
              Chat
            </Text>
          </Pressable>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Friend;

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: Colors.darkBlue,
    padding: 10,
    marginBottom: 10,
  },
});