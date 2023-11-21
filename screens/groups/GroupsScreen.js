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

export const Groups = () => {
  const navigation = useNavigation();
  const pressHandlerView = () => {
    navigation.navigate("View Groups");
  };
  const pressHandlerCreate = () => {
    navigation.navigate("Create Groups")
  };
   useLayoutEffect(() => {
     navigation.setOptions({
       headerTitle: "Groups",
    
       headerRight: () => (
         <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
           <AntDesign name="message1" size={24} color="white" />
           <Ionicons
             onPress={() => navigation.navigate("FriendRequestsScreen")}
             name="people-outline"
             size={24}
             color="white"
           />
           <LogoutButton />
         </View>
       ),
     });
   }, []);
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
    margin:10,
    marginTop:10,
    
  },
});
