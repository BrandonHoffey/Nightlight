import React, {useLayoutEffect} from "react";

import { View, Text, StyleSheet, Image, Button } from "react-native";
import Colors from "../../Colors";
import { useNavigation } from "@react-navigation/native";




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


  return (
    <>
      <View style={styles.container}>
        <Text style={styles.textContainer}>Welcome to NightLight!</Text>
        <Image />
      </View>
      <View>
        <Button title="Friends" onPress={pressHandlerFriends}></Button>
        <Button title="Groups" onPress={pressHandlerGroups}></Button>
        <Button title="Community" onPress={pressHandlerCommunity}></Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
    alignItems: "center",
    // justifyContent: "center",
  },
  textRow: {
    flexDirection: "row",
    marginTop: 100,
  },

  textContainer: {
    color: Colors.lightGreen,
    fontSize: 30,
    // fontWeight: "bold",
  },
  
});

export {HomeScreen};