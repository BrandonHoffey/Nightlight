import React, { useState } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import SignupScreen from "./SignupScreen";
import SigninScreen from "./SigninScreen";
import Colors from "../../Colors";
import logo from "../../assets/logo.png";

export const Auth = (params) => {
  const [signinVisible, setSigninVisible] = useState(true);

  const handleSwitch = () => {
    setSigninVisible(!signinVisible);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenContainer}>
        <Image style={styles.logoContainer} source={logo} />
        {signinVisible ? (
          <SigninScreen handleSwitch={handleSwitch} />
        ) : (
          <SignupScreen handleSwitch={handleSwitch} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
  },
  screenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    resizeMode: "contain",
    width: "80%",
    height: "20%",
    marginTop: "40%",
  },
});
