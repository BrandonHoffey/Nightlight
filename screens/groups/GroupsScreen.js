import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Button,
  TouchableOpacity,
  Alert,
  Platform,
  PixelRatio,
} from "react-native";
import { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import LogoutButton from "../../ui/LogoutButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../Colors";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

export const Groups = ({ route }) => {
  const { currentUser, token } = route.params;
  const navigate = useNavigation();
  const pressHandlerView = () => {
    navigate.navigate("View Groups", { currentUser, token });
  };
  const pressHandlerCreate = () => {
    navigate.navigate("Create Groups", { currentUser });
  };
  return (
    <SafeAreaView style={styles.screenContainer}>
      {/* <Text style={styles.textContainer}>Group Chats</Text> */}
      <TouchableOpacity style={styles.buttonContainer}>
        <Button
          color={Colors.lightBlue}
          title="View Groups"
          onPress={pressHandlerView}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <Button
          color={Colors.lightBlue}
          title="Create Groups"
          onPress={pressHandlerCreate}
        />
      </TouchableOpacity>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: Colors.darkBlue,
    // marginTop: 25,
    padding: 50,
    // height: "100%",
    // width: "100%",
    flexDirection: "column",
    // justifyContent: "space-evenly",
    // alignItems: "center",
  },
  textContainer: {
    color: Colors.lightGreen,
    fontWeight: "bold",
    fontSize: getFontSize(34),
    marginVertical: 0,
  },
  buttonContainer: {
    borderRadius: 15,
    overflow: "hidden",
    margin: 10,
    marginTop: 10,
  },
});
