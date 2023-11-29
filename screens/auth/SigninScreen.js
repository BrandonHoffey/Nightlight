import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
  Modal,
  Alert,
  PixelRatio,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { UserContext } from "../../UserContext";
import { API_USER_SIGN_IN } from "../../constants/Endpoints";
import Colors from "../../Colors";
import { useNavigation } from "@react-navigation/native";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

export default (params) => {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("john");
  const [password, setPassword] = useState("test123");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const body = {
        username: username,
        email: username,
        password: password,
      };
      const requestOption = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      };
      const response = await fetch(API_USER_SIGN_IN, requestOption);
      if (response.ok) {
        const data = await response.json();
        console.log("User Data:", data.signedInAccount);

        login(
          data.token,
          data.signedInAccount._id,
          data.signedInAccount.username
        );
        navigation.navigate("Home");
        Alert.alert(data.message);
        // setUsername("");
        // setPassword("");
      } else if (response.status === 401) {
        Alert.alert("Incorrect username or password. Please try again.");
      } else {
        console.error(`HTTP Error: ${response.status}`);
        Alert.alert("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("An error occurred. Please try again later.");
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.darkBlue,
        alignItems: "center",
      }}
    >
      <View style={styles.screenContainer}>
        <View style={styles.imageContainer}></View>
        <KeyboardAvoidingView
          keyboardVerticalOffset={20}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.signinContainer}
        >
          <View style={styles.inputContainer}>
            <View>
              <TextInput
                textContentType="emailAddress"
                style={styles.input}
                onChangeText={(text) => setUsername(text)}
                value={username}
                placeholder="Username or Email"
                placeholderTextColor="#000"
              />
            </View>
            <View>
              <TextInput
                secureTextEntry={true}
                textContentType="password"
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                value={password}
                placeholder="Password"
                placeholderTextColor="#000"
              />
            </View>
            <View>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? Colors.lightGreen
                      : Colors.lightBlue,
                  },
                  styles.submit,
                ]}
                onPress={handleSubmit}
              >
                <Text
                  style={{
                    color: Colors.white,
                    // fontWeight: "bold",
                    fontSize: getFontSize(16),
                  }}
                >
                  Sign In
                </Text>
              </Pressable>
            </View>
            <View style={styles.controlContainer}>
              <Text style={styles.text} onPress={params.handleSwitch}>
                Create Account
              </Text>
              <Pressable
                onPress={() => {
                  console.log("hi");
                }}
              >
                <Text style={styles.text}>Forgot Password?</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    // marginBottom: "40%",
  },
  inputContainer: {
    gap: 20,
  },
  input: {
    height: 40,
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 20,
  },
  text: {
    color: "white",
    padding: 20,
  },
  controlContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },

  signinContainer: {
    flex: 1,
  },
  submit: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    width: "100%",
  },
});
