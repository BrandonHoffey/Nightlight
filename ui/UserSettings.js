import React, { useContext, useState } from "react";
import { View, SafeAreaView, Text, StyleSheet, TextInput, Button } from "react-native";
import { UserContext } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { API_USER_EDIT_BY_ID } from "../constants/Endpoints";

const UserSettings = () => {
  const { userId, token } = useContext(UserContext);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`${API_USER_EDIT_BY_ID}/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          username: newUsername,
          email: newEmail,
          password: newPassword,
        }),
      });

      if (response.ok) {
        // Handle success, e.g., show a success message
        console.log("Profile updated successfully");
      } else {
        // Handle error, e.g., show an error message
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Edit Profile</Text>
      <View style={styles.formGroup}>
        <Text>Username:</Text>
        <TextInput
          value={newUsername}
          onChangeText={(text) => setNewUsername(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Email:</Text>
        <TextInput
          value={newEmail}
          onChangeText={(text) => setNewEmail(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Password:</Text>
        <TextInput
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          secureTextEntry
          style={styles.input}
        />
      </View>
      <Button title="Save Changes" onPress={handleSaveChanges} />
    </SafeAreaView>
  );
};

export default UserSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
  },
});