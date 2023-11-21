import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  PixelRatio,
  SafeAreaView,
} from "react-native";
import { UserContext } from "../../UserContext";
import { API_USER_SIGN_UP } from "../../constants/Endpoints";
import Colors from "../../Colors";
import { useNavigation } from "@react-navigation/native";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

export default (params) => {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const clearInputFields = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async () => {
    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const body = {
        username: username,
        email: email,
        password: password,
      };
      const requestOption = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      };
      const response = await fetch(API_USER_SIGN_UP, requestOption);
      if (response.ok) {
        const data = await response.json();

        navigation.navigate("Authorization");

        // login({ token: data.token, userId: data.userId });

        Alert.alert(data.message);
        clearInputFields();
      } else if (response.status === 422) {
        Alert.alert("Missing fields. Please try again.");
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
    <SafeAreaView>
      <View style={styles.screenContainer}>
        <View style={styles.imageContainer}></View>
        <View style={styles.signinContainer}>
          <View style={styles.inputContainer}>
            <View>
              <TextInput
                textContentType="name"
                style={styles.input}
                onChangeText={(text) => setUsername(text)}
                value={username}
                placeholder="Username"
                placeholderTextColor="#000"
              />
            </View>
            <View>
              <TextInput
                textContentType="emailAddress"
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="Email"
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
                <Text style={{ color: Colors.white }}>Sign Up</Text>
              </Pressable>
            </View>
            <View style={styles.controlContainer}>
              <Text style={styles.text} onPress={params.handleSwitch}>
                Have An Account?
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    height: "100%",
    width: "100%",
    marginBottom: "40%",
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
  },
  controlContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
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