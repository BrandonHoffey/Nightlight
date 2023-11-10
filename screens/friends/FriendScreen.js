import { StyleSheet, Text, View } from "react-native";
import AddFriendScreen from "./AddFriendScreen";
import ViewFriendScreen from "./ViewFriendsScreen";

export const Friend = (params) => {
    return (
        <View style={StyleSheet.screenContainer}>
            <Text>Friend Screen</Text>
            <AddFriendScreen />
            {/* <ViewFriendScreen /> */}
        </View>
    );
};