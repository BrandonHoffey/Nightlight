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
    backgroundColor: Colors.darkBlue,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});
