import React, { useState } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import SignupScreen from "./SignupScreen";
import SigninScreen from "./SigninScreen";
import Colors from "../../Colors";
// import logo from "../../assets/NightLight-BeamFont.png";
import logo from "../../assets/NightLight-GCfont1.png";

export const Auth = (params) => {
  const [signinVisible, setSigninVisible] = useState(true);

  const handleSwitch = () => {
    setSigninVisible(!signinVisible);
  };

  return (
    <SafeAreaView>
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
  screenContainer: {
    backgroundColor: Colors.darkBlue,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    // marginBottom:"10%"
  },
  logoContainer: {
    resizeMode: "contain",
    width: "80%",
    height: "80%",
    marginTop: "100%",
  },
});
