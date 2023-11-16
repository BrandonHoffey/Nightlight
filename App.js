import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "./Colors";
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from "./StackNavigator";
import { UserProvider } from "./UserContext";

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <StackNavigator style={styles.StyleSheet}/>
      </UserProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.darkBlue,

    alignItems: "center",
    justifyContent: "center",
  },
  textRow: {
    flexDirection: "row",
    marginTop: 100,
  },

  textContainerNight: {
    color: Colors.lightGreen,
    fontSize: 40,
    fontWeight: "bold",
  },
  textContainerLight: {
    color: Colors.yellow,
    fontSize: 40,
    fontWeight: "bold",
  },
});