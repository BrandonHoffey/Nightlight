import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default (params) => {
  return (
    <View style={styles.screenContainer}>
      <Text>Nightlight</Text>
      <View>
        <Text>Sign In</Text>
        <View style={styles.inputContainer}>
          <View>
            <Text>Username or Email</Text>
            <TextInput style={styles.inputContainer.input} />
          </View>
          <View>
            <Text>Password</Text>
            <TextInput style={styles.inputContainer.input} />
          </View>
          <View>
            <Button title="Sign In" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: "#93caed",
    height: "80%",
    width: "80%",
  },
  inputContainer: {
    backgroundColor: "#93caed",
    gap: 20,
    input: {
      height: 40,
      padding: 10,
      backgroundColor: "#fff",
      borderRadius: 10,
    },
  },
});
