import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  PixelRatio,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../../Colors";
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

const Friend = ({ item, token, currentUser }) => {
  item = item.item;
  const navigate = useNavigation();
  const handleChatPress = () => {
    navigate.navigate("MessageScreen", {
      receiverName: item.displayName,
      username: item.username,
      receiverPicture: item.profilePicture,
      receiverId: item._id,
      currentUser: currentUser,
      token: token,
    });
  };
  return (
    <SafeAreaView>
      <View style={styles.screenContainer}>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
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
              source={{ uri: item?.profilePicture }}
            />

            <View style={{ marginLeft: 12 }}>
              <Text
                style={{
                  fontSize: getFontSize(16),
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {item?.displayName}
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
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: getFontSize(14),
              }}
            >
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
    marginBottom: 10,
    borderRadius: 10,
  },
});
