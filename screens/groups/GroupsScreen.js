import {StyleSheet, Text, View, SafeAreaView, Image, Button, Alert, Platform, PixelRatio} from "react-native";
import { StatusBar } from "expo-status-bar";
import CreateGroupScreen from "./CreateGroupScreen";
import ViewGroupsScreen from "./ViewGroupsScreen";


export const Group = (params) => {
  return (
    
    <SafeAreaView style={styles.screenContainer}>
      <Text
        style={{
          color: "rgb(200, 180, 90)",
          fontWeight: "bold",
          fontSize: 24,
        }}>Group Chats </Text>

      <ViewGroupsScreen />
      <CreateGroupScreen />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#rgb(1, 30, 70)",
    marginTop: 25,
    padding: 10,
    height: "100%",
    width: "100%",
    flexDirection:"column",
    justifyContent:"space-evenly",
    // alignItems:"center",
  },
});
