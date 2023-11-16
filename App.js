import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "./Colors";

import { Groups } from "./screens/groups/GroupsScreen";
import { Auth } from "./screens/auth/AuthScreen";
import { Friend } from "./screens/friends/FriendScreen";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";

export default function App() {
  return <StackNavigator />;
  // return (
  //   // <NavigationContainer>
  //   // <View style={styles.container}>
  //     {/* <View style={styles.textRow}>
  //       <Text style={styles.textContainerNight}>Night</Text>
  //       <Text style={styles.textContainerLight}>Light</Text>
  //     </View> */}

  //     {/* <Auth /> */}
  //     {/* <Groups /> */}
  //     {/* <Friend /> */}
  //     <StatusBar style="auto" />
  //     </>
  //   // </View>
  //   // {/* </NavigationContainer> */}
  // );
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
