import { StyleSheet, Text, View } from "react-native";
import SignupScreen from "./SignupScreen";
import SigninScreen from "./SigninScreen";

export const Auth = (params) => {
  return (
    <View style={styles.screenContainer}>
      <Text>Auth</Text>
      <SigninScreen />
      <SignupScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: "#93caed",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
    width: "80%",
  },
});
