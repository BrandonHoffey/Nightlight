import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Groups } from "./screens/groups/GroupsScreen";
import { Auth } from "./screens/auth/AuthScreen";
import ViewGroupsScreen from "./screens/groups/ViewGroupsScreen";
import Colors from "./Colors";
import CreateGroupScreen from "./screens/groups/CreateGroupScreen";


import {HomeScreen} from "./screens/home/HomeScreen";
import CommunityScreen from "./screens/friends/CommunityScreen";
import FriendRequestsScreen from "./screens/friends/FriendRequestsScreen";
import FriendScreen from "./screens/friends/FriendsScreen";
import Signin from "./screens/auth/SigninScreen";
import UserSettings from "./ui/UserSettings";




const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
      <Stack.Navigator
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
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown:false}}
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
        options={{ headerShown: true}}
        />
        <Stack.Screen
        name="FriendScreen"
        component={FriendScreen}
        options={{headerShown: true}}
        />
        <Stack.Screen
        name="SigninScreen"
        component={Signin}
        options={{headerShown: true}}
        />
        <Stack.Screen
        name="UserSettings"
        component={UserSettings}
        options={{headerShown: true}}
        />
      </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});