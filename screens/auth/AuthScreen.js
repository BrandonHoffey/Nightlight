import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SignupScreen from "./SignupScreen";
import SigninScreen from "./SigninScreen";

export const Auth = (params) => {
  const [signinVisible, setSigninVisible] = useState(true);

  const handleSwitch = () => {
    setSigninVisible(!signinVisible);
  };

  return (
    <View style={styles.screenContainer}>
      {signinVisible ? (
        <SigninScreen handleSwitch={handleSwitch} />
      ) : (
        <SignupScreen handleSwitch={handleSwitch} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: "#011c40",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
    width: "80%",
  },
});
