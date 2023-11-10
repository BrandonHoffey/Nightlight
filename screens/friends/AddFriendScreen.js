import React, { useState } from "react";
import { Text, Pressable, StyleSheet, SafeAreaView, SectionList, TextInput, Alert } from "react-native";
import axios from "axios";
import { UsesNonExemptEncryption } from "@expo/config-plugins/build/ios";

const AddFriend = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [friendAdded, setFriendAdded] = useState(false);
    const [allUsers, setAllUsers] = useState([]);  
    
    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        try {
            const response = await axios.get("http://localhost:4000/user/view-all");
            setAllUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // const filteredData = [
    //     {title: 'B', data: ['Brandon']},
    //     {title: 'J', data: ['Jacob']},
    //     {title: 'N', data: ['Neil']},
    // ].filter(section => {
    //     const filteredItems = section.data.filter(item =>
    //         item.toLowerCase().includes(searchQuery.toLowerCase())
    //         );
    //         return filteredItems.length > 0;
    // });

    const FriendAddedMessage = ({friendName}) => {
        return (
            <SafeAreaView style={styles.FriendAddedMessage}>
                <Text>{`${friendName} has been added to your friends list.`}</Text>
            </SafeAreaView>
        );
    };

    const handleAddFriend = (friendNameArray) => {
        const friendName = friendNameArray;
        Alert.alert(
            "Add Friend",
            `Do you want to add ${friendName} as your friend?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => {
                        setFriendAdded(friendName);
                        console.log(`Added ${friendName} as a friend.`);
                    },
                },
            ],
            {cancelable: false}
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search..."
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
            />
            {friendAdded && <FriendAddedMessage friendName={friendAdded} />}
            <SectionList
                sections={allUsers}
                renderItem={({item}) => (
                <Pressable onPress={() => handleAddFriend([item.username])}>
                    <Text style={styles.item}>{item.username}</Text>
                </Pressable>
                )}
                renderSectionHeader={({section}) => (
                    <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
                keyExtractor={(item) => `basicListEntry-${item}`}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 22,
    },
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    searchBar: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      margin: 10,
      padding: 10,
    },
    FriendAddedMessage: {
        backgroundColor: "green",
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
  });

export default AddFriend;