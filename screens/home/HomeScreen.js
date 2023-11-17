import React, { useLayoutEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Colors from "../../Colors";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import LogoutButton from "../../ui/LogoutButton";
// import logo from "../../assets/NightLight-BeamFont.png";
import logo from "../../assets/NightLight-GCfont1.png";

const HomeScreen = () => {
  const navigation = useNavigation();

  const pressHandlerFriends = () => {
    navigation.navigate("Friend");
  };
  const pressHandlerGroups = () => {
    navigation.navigate("Group Chats");
  };
  const pressHandlerCommunity = () => {
    navigation.navigate("Authorization");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
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
      <View style={styles.container}>
        <Text style={styles.textContainer}>Welcome User</Text>
        <Image source={logo} />
        <Pressable
          style={({ pressed }) => [
            styles.buttonContainer,
            { backgroundColor: pressed ? Colors.lightGreen : Colors.lightBlue },
          ]}
          onPress={pressHandlerFriends}
        >
          <Text style={styles.buttonText}>Friends</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.buttonContainer,
            { backgroundColor: pressed ? Colors.lightBlue : Colors.lightGreen },
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
          {/* <Text style={styles.buttonText}>Community</Text> */}
          <Text style={styles.buttonText1}>Community</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
    alignItems: "center",
    height: 100,
    flexDirection: "column",
    // justifyContent: "center",
  },

  textContainer: {
    color: Colors.white,
    fontSize: 25,
    // fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 100,
    padding: 20,
    overflow: "hidden",
    margin: 10,
    marginTop: 10,
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    // opacity:0.7,
    // paddingHorizontal:10,
    // paddingVertical:10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonText1: {
    color: Colors.lightBlue,
    fontSize: 24,
    fontWeight: "bold",
  },
});

export { HomeScreen };
