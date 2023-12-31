import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
import Signin from "./screens/auth/SigninScreen";
import UserSettings from "./ui/UserSettings";

const Stack = createNativeStackNavigator();

const loadingScreen = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

const StackNavigator = () => {
  const [initialRoute, setInitialRoute] = useState("Authorization");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAppLoad = async () => {
      const TOKEN = await AsyncStorage.getItem("TOKEN");
      const USER_ID = await AsyncStorage.getItem("USER_ID");
      console.log(TOKEN, USER_ID);
      if (TOKEN === null || USER_ID === null) {
        setInitialRoute("Authorization");
      } else {
        setInitialRoute("Home");
      }
      setLoading(false);
    };
    handleAppLoad();
  }, []);

  console.log(initialRoute);
  return loading ? (
    loadingScreen
  ) : (
    <Stack.Navigator
      initialRouteName={initialRoute}
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
        options={{ title: "Create Group" }}
        key="CreateGroup"
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
        <Stack.Screen
        name="SigninScreen"
        component={Signin}
        options={{headerShown: true}}
        />
        <Stack.Screen
        name="UserSettings"
        component={UserSettings}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};
export default StackNavigator;
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
