import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Groups } from "./screens/groups/GroupsScreen";
import ViewGroupsScreen from "./screens/groups/ViewGroupsScreen";
import Colors from "./Colors";
import CreateGroupScreen from "./screens/groups/CreateGroupScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: Colors.lightBlue,
        },
        headerTintColor:"white"
      })}
      >
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
