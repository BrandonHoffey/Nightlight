import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View,Image } from "react-native";
import MessageScreen from "./screens/messages/MessageScreen";
import Colors from "./Colors";
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from "./StackNavigator";
import { UserContext } from "./UserContext";


export default function App() {
  return (
    <>
      <UserContext>
        
        <StackNavigator style={styles.container} 
        
        />
      </UserContext>
    </>
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
