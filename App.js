import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Group } from "./screens/groups/GroupsScreen";
import { Auth } from "./screens/auth/AuthScreen";
import FriendScreen from "./screens/friends/FriendScreen";
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from "./StackNavigator";
import { UserContext } from "./UserContext";



export default function App() {
  return (
    <>
      <UserContext>
        <StackNavigator/>
      </UserContext>
    </>
    // <View style={styles.container}>
        // {/* <Text>App</Text> */}
        // {/* <Auth /> */}
        // {/* <Group/> */}
    // {/* <StatusBar style="auto" /> */}
      // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});