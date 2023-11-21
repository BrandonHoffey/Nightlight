import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Text,
  Image,
  Pressable,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import BottomSheet from "@gorhom/bottom-sheet";
import AntDesign from "react-native-vector-icons/AntDesign";
import Colors from "../../Colors";
import UserCard from "../../ui/UserCard";

const InboxScreen = ({ params }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ["75%", "75%", "75%"], []);
  const navigation = useNavigation();

  const handleSheet = () => {
    setIsSheetOpen(!isSheetOpen);
  };

  useEffect(() => {
    if (!isSheetOpen) {
      bottomSheetRef.current.close();
    } else {
      bottomSheetRef.current.expand();
    }
  }, [isSheetOpen]);
  useEffect(() => {}, []);
  return (
    <GestureHandlerRootView style={{ flex: 1, width: "100%" }}>
      <View style={styles.viewport}>
        <SafeAreaView style={styles.user}>
          <Pressable onPress={() => navigation.navigate("Home")}>
            <AntDesign name="left" color={Colors.white} size={20} />
          </Pressable>
          <Text style={[styles.text, { fontSize: 20 }]}>Inbox</Text>
          <Pressable onPress={() => navigation.navigate("Inbox")}>
            <AntDesign name="plussquareo" color={Colors.white} size={20} />
          </Pressable>
        </SafeAreaView>
        <View style={styles.usersContainer}>
          <UserCard />
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enabledContentGestureInteraction={false}
          backgroundStyle={styles.gifContainer}
          handleIndicatorStyle={{ backgroundColor: Colors.white }}
        >
          {/* <TenorScreen isSheetOpen={isSheetOpen} /> */}
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  viewport: {
    flexDirection: "column",
    height: "100%",
    width: "100%",

    backgroundColor: Colors.darkBlue,
  },
  text: {
    color: Colors.white,
  },
  inputContainer: {
    alignSelf: "center",
    justifyContent: "center",
  },
  usersContainer: {
    justifyContent: "top",
    width: "100%",
    flex: 1,
  },
  gifContainer: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightBlue,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  user: {
    flexDirection: "row",
    borderBottomColor: Colors.white,
    borderBottomWidth: 0.2,
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    height: 120,
  },
});

export default InboxScreen;
