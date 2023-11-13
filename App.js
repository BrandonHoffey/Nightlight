import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Group } from "./screens/groups/GroupsScreen";
// import { Auth } from "./screens/auth/AuthScreen";


export default function App() {
  return (
    <View style={styles.container}>
      <Text>App</Text>
      {/* <Auth /> */}
      <Group/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
