import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  Modal,
  Alert,
} from "react-native";
import logo from "../../assets/logo-nightlight.png";
import { API_USER_SIGN_IN } from "../../constants/Endpoints";

export default (params) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        Alert.alert(data.message);
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
    <View style={styles.screenContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={logo}
          style={{
            flex: 1,
            maxHeight: 150,
            width: "100%",
            resizeMode: "contain",
          }}
        />
      </View>
      <View style={styles.signinContainer}>
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
                  backgroundColor: pressed ? "#b1a14f" : "#c5b358",
                },
                styles.submit,
              ]}
              onPress={handleSubmit}
            >
              <Text>Sign In</Text>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#011c40",
  },
  inputContainer: {
    backgroundColor: "#011c40",
    gap: 20,
  },
  input: {
    height: 40,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  text: {
    color: "white",
  },
  controlContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  imageContainer: {
    flex: 1,
  },
  signinContainer: {
    flex: 3,
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
