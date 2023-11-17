import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
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
    
    <View style={styles.screenContainer}>
      <Image style={styles.logoContainer}source={logo} />
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
    // borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  logoContainer:{
    marginTop:150,
  }
});
