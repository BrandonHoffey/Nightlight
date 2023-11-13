import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Auth } from "./screens/auth/AuthScreen";
import AddFriend from "./screens/friends/AddFriendScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <Auth />
      {/* <AddFriend /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#011c40",
    alignItems: "center",
    justifyContent: "center",
  },
});
