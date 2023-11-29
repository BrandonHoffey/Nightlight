import React, { useContext, useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Image,
} from "react-native";
import { UserContext } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import { API_USER_EDIT_BY_ID } from "../constants/Endpoints";
import * as ImagePicker from "expo-image-picker";

const UserSettings = () => {
  const { userId, token } = useContext(UserContext);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    console.log("User ID:", userId);
    console.log("Token:", token);
  }, []);

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfilePicture(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Image picker error:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      if (newPassword && !currentPassword) {
        Alert.alert(
          "Current Password Required",
          "Please enter your current password before changing it."
        );
        return;
      }

      const requestBody = {
        username: newUsername,
        email: newEmail,
        currentPassword: currentPassword,
        displayName: displayName,
      };

      if (newPassword) {
        requestBody.password = newPassword;
      }

      if (profilePicture !== null) {
        requestBody.profilePicture = profilePicture;
      }

      const response = await fetch(`${API_USER_EDIT_BY_ID}/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(requestBody),
      });
      console.log("Response:", response);
      console.log("API URL:", `${API_USER_EDIT_BY_ID}/${userId}`);

      const responseData = await response.json().catch((error) => {
        console.error("Error parsing JSON response:", error);
      });

      if (response.ok) {
        console.log("Profile updated successfully");
        console.log("Response Data:", JSON.stringify(responseData));
        navigation.navigate("Home", {
          screen: "Home",
          params: {
            updateUserData: (userData) => {
              // Callback function to update user data on the Home screen
              // This function will be called when navigating back from User Settings
              // userData is the updated user data
              // Update your state or trigger a re-fetch of user data on the Home screen
            },
          },
        });
      } else {
        console.error("Failed to update profile", responseData);
        Alert.alert(
          "Failed to update profile",
          responseData && responseData.error
            ? responseData.error
            : "An error occurred"
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
      Alert.alert("An error occurred", "Please try again later");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.labelText}>Edit Profile</Text>
      <View style={styles.formGroup}>
        <Text style={styles.labelText}>Username:</Text>
        <TextInput
          value={newUsername}
          onChangeText={(text) => setNewUsername(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.labelText}>Display Name:</Text>
        <TextInput
          value={displayName}
          onChangeText={(text) => setDisplayName(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.labelText}>Profile Picture:</Text>
        {profilePicture && (
          <Image
            source={{ uri: profilePicture }}
            style={styles.profilePicture}
          />
        )}
        <Button
          title="Choose Profile Picture"
          onPress={handleImagePicker}
          color="#24A49C" // Set button color to #24A49C
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.labelText}>Email:</Text>
        <TextInput
          value={newEmail}
          onChangeText={(text) => setNewEmail(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.labelText}>Current Password:</Text>
        <TextInput
          value={currentPassword}
          onChangeText={(text) => setCurrentPassword(text)}
          secureTextEntry
          style={styles.input}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.labelText}>New Password:</Text>
        <TextInput
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          secureTextEntry
          style={styles.input}
        />
      </View>
      <Button
        title="Save Changes"
        onPress={handleSaveChanges}
        color="#24A49C" // Set button color to #24A49C
      />
    </SafeAreaView>
  );
};

export default UserSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#05002B", // Dark blue background color
  },
  formGroup: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 8, // Rounded corners for input fields
    backgroundColor: "#fff", // White background for input fields
    color: "#001F3F", // Dark blue text color
  },
  profilePicture: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 50,
    marginTop: 10,
  },
  labelText: {
    color: 'white', // Set text color to white
  },
});