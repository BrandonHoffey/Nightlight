import React, { useLayoutEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  PixelRatio,
  Pressable,
  SafeAreaView,
} from "react-native";
import Colors from "../../Colors";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import LogoutButton from "../../ui/LogoutButton";
// import logo from "../../assets/NightLight-BeamFont.png";
import logo from "../../assets/NightLight-GCfont1.png";
// import bgStars from "../../assets/Texture-Stars75Op.png";
// import bgStars from "../../assets/Texture-Stars90oP.png";
import bgStars from "../../assets/stars-backgroundRS.png";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

const HomeScreen = () => {
  const navigation = useNavigation();

  const pressHandlerFriends = () => {
    navigation.navigate("FriendScreen");
  };
  const pressHandlerGroups = () => {
    navigation.navigate("Group Chats");
  };
  const pressHandlerCommunity = () => {
    navigation.navigate("Community");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text
          style={{
            fontSize: getFontSize(16),
            fontWeight: "bold",
            color: "white",
          }}
        >
          Home
        </Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <AntDesign name="message1" size={24} color="white" />
          <Ionicons
            onPress={() => navigation.navigate("ViewFriends")}
            name="people-outline"
            size={24}
            color="white"
          />
          <LogoutButton />
        </View>
      ),
    });
  }, []);

  return (
    <>
      <SafeAreaView style={styles.containerBG}>
        <Image source={bgStars} style={styles.backgroundImage}></Image>
        <View style={styles.overlay}>
          <Image source={logo} />
          <Text style={styles.textContainer}>Welcome User</Text>
          <Pressable
            style={({ pressed }) => [
              styles.buttonContainer,
              {
                backgroundColor: pressed ? Colors.lightGreen : Colors.lightBlue,
              },
            ]}
            onPress={pressHandlerFriends}
          >
            <Text style={styles.buttonText}>Friends</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.buttonContainer,
              {
                backgroundColor: pressed ? Colors.lightBlue : Colors.lightGreen,
              },
            ]}
            onPress={pressHandlerGroups}
          >
            <Text style={styles.buttonText}>Groups</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.buttonContainer,
              { backgroundColor: pressed ? Colors.lightGreen : Colors.yellow },
            ]}
            onPress={pressHandlerCommunity}
          >
            <Text style={styles.buttonText1}>Community</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  containerBG: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    // transform: [{ rotate: '180deg' }], //rotates image 180
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(5, 0, 43, 0.5)", // Adjust the opacity with last digit, first 3 dialed in darkBlue
  },
  textContainer: {
    color: Colors.white,
    fontSize: getFontSize(24),
    // fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 100,
    padding: 20,
    overflow: "hidden",
    margin: 10,
    marginTop: 10,
    width: "50%",
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
  },
  buttonText: {
    color: Colors.white,
    fontSize: getFontSize(24),
    fontWeight: "bold",
  },
  buttonText1: {
    color: Colors.lightBlue,
    fontSize: getFontSize(24),
    fontWeight: "bold",
  },
});

export { HomeScreen };
