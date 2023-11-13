import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from "react-native";




export default (params) => {
  return (
    <View>
      <TouchableOpacity style={styles.buttonContainer}>
        <Button
          color="rgb(4, 117, 111)"
          title="View Groups"
          onPress={() => console.log("view groups clicked")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 15,
    overflow: "hidden",
  },
});