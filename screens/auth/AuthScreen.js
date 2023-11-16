import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SignupScreen from "./SignupScreen";
import SigninScreen from "./SigninScreen";
import Colors from "../../Colors";

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
    // backgroundColor: "#35478C",
    // backgroundColor: "#0A3C41",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
    width: "80%",
  },
});
