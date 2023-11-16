import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import FriendScreen from "./screens/friends/FriendScreen";
import ViewFriendsScreen from "./screens/friends/ViewFriendsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Friend"
          component={FriendScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="ViewFriends"
          component={ViewFriendsScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});