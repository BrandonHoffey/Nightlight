import React from "react";
import { StyleSheet, View } from "react-native";
import AddFriendScreen from "./AddFriendScreen";
import ViewFriendScreen from "./ViewFriendsScreen";

export const Friend = (params) => {
    return (
        <View style={styles.screenContainer}>
            <View style={styles.friendContainer}>
                <AddFriendScreen style={styles.friendComponent} />
                <ViewFriendScreen style={styles.friendComponent} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "#011c40", // Set your desired background color here
        padding: 50, // Add padding as needed
    },
    friendScreen: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    friendContainer: {
        flexDirection: "row",
        justifyContent: "space-between", // evenly space the components
    },
    friendComponent: {
        flex: 1, // Each component takes equal space
        margin: 5, // Add margin as needed
    },
});