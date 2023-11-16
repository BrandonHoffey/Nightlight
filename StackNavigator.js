import React from "react";
import { View, Text, StyleSheet, } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Groups } from "./screens/groups/GroupsScreen";
import { Auth } from "./screens/auth/AuthScreen";
import FriendScreen from "./screens/friends/FriendScreen";
import ViewFriendsScreen from "./screens/friends/ViewFriendsScreen";
import ViewGroupsScreen from "./screens/groups/ViewGroupsScreen";
import Colors from "./Colors";
import CreateGroupScreen from "./screens/groups/CreateGroupScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
      <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: Colors.lightBlue,
        },
        headerTintColor:"white"
      })}
      >
        <Stack.Screen 
          name="Authorization"
          component={Auth}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="Group Chats"
          component={Groups}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="View Groups"
          component={ViewGroupsScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Create Groups"
          component={CreateGroupScreen}
          options={{headerShown: true}}
        />
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
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});