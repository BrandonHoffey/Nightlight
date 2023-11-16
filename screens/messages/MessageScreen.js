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
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import MessageBar from "../../ui/MessageBar";
import TenorScreen from "../../ui/GifSearch";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const MessageScreen = ({ receiver }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ["75%", "75%", "75%"], []);

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

  return (
    <GestureHandlerRootView style={{ flex: 1, width: "100%" }}>
      <View style={styles.viewport}>
        <SafeAreaView style={styles.user}>
          <View style={styles.image}>
            <Image
              source={{ uri: "https://picsum.photos/200/200" }}
              style={{ width: 40, height: 40, borderRadius: 50 }}
            />
          </View>
          <View style={styles.name}>
            <Text style={styles.nameText}>Cool Man</Text>
            <Text style={styles.usernameText}>CoolMan87</Text>
          </View>
        </SafeAreaView>
        <View style={styles.messageContainer}></View>
        <KeyboardAvoidingView
          keyboardVerticalOffset={20}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inputContainer}
        >
          <MessageBar handleSheet={handleSheet} placeholder="Message..." />
        </KeyboardAvoidingView>
        {isSheetOpen && (
          <TouchableWithoutFeedback onPress={handleSheet}>
            <View style={styles.overlay}></View>
          </TouchableWithoutFeedback>
        )}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enabledContentGestureInteraction={false}
          backgroundStyle={styles.gifContainer}
          handleIndicatorStyle={{ backgroundColor: "#fff" }}
        >
          <TenorScreen isSheetOpen={isSheetOpen} />
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
  },
  text: {
    color: "#fff",
  },
  inputContainer: {
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: "15%",
  },
  messageContainer: {
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
    flex: 1,
  },
  gifContainer: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#222222",
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
    borderBottomColor: "#fff",
    borderBottomWidth: 0.2,
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  name: {
    flexDirection: "column",
  },
  nameText: {
    color: "#fff",
    fontSize: 16,
  },
  usernameText: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.75,
  },
  image: {
    padding: 20,
  },
});

export default MessageScreen;
