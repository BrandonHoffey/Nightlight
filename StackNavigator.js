import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Groups } from "./screens/groups/GroupsScreen";
import { Auth } from "./screens/auth/AuthScreen";
import { HomeScreen } from "./screens/home/HomeScreen";
import ViewGroupsScreen from "./screens/groups/ViewGroupsScreen";
import Colors from "./Colors";
import CreateGroupScreen from "./screens/groups/CreateGroupScreen";
import CommunityScreen from "./screens/friends/CommunityScreen";
import FriendRequestsScreen from "./screens/friends/FriendRequestsScreen";
import FriendScreen from "./screens/friends/FriendsScreen";
import MessageScreen from "./screens/messages/MessageScreen";
import InboxScreen from "./screens/messages/InboxScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const handleAppLoad = async () => {
    const TOKEN = await AsyncStorage.getItem("TOKEN");
    const USER_ID = await AsyncStorage.getItem("USER_ID");
    if (TOKEN && USER_ID) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Stack.Navigator
      initialRouteName={handleAppLoad() ? "Home" : "Authorization"}
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: Colors.lightBlue,
        },
        headerTintColor: "white",
      })}
    >
      <Stack.Screen
        name="Authorization"
        component={Auth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
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
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="FriendRequestsScreen"
        component={FriendRequestsScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Community"
        component={CommunityScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="FriendScreen"
        component={FriendScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="InboxScreen"
        component={InboxScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
