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
import BottomSheet from "@gorhom/bottom-sheet";
import MessageBar from "../../ui/MessageBar";
import TenorScreen from "../../ui/GifSearch";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import Colors from "../../Colors";
import { useNavigation } from "@react-navigation/core";
import { useSocket } from "../../api/SocketManager";
import MessageCard from "../../ui/MessageCard";

const MessageScreen = ({ route }) => {
  const { displayName, username, profilePicture, id } = route.params;
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ["75%", "75%", "75%"], []);
  const navigation = useNavigation();
  const socket = useSocket();

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

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on("message", (data) => {
      console.log("Received message from server:", data);
      // Handle the received message as needed
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      // Clean up on component unmount
      socket.off("message");
    };
  }, [socket]);

  return (
    <GestureHandlerRootView style={{ flex: 1, width: "100%" }}>
      <View style={styles.viewport}>
        {console.log({ messages })}
        <SafeAreaView style={styles.user}>
          <Pressable onPress={() => navigation.navigate("InboxScreen")}>
            <AntDesign name="left" color={Colors.white} size={20} />
          </Pressable>
          <View style={styles.image}>
            <Image
              source={{ uri: profilePicture }}
              style={{ width: 40, height: 40, borderRadius: 50 }}
            />
          </View>
          <View style={styles.name}>
            <Text style={styles.nameText}>{displayName}</Text>
            <Text style={styles.usernameText}>{username}</Text>
          </View>
        </SafeAreaView>
        <View style={styles.messageContainer}>
          <MessageCard messages={messages} />
        </View>
        <KeyboardAvoidingView
          keyboardVerticalOffset={20}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inputContainer}
        >
          <MessageBar
            handleSheet={handleSheet}
            placeholder="Message..."
            receiverPicture={profilePicture}
            receiverName={displayName}
            receiverId={id}
            senderId={"nothing yet"}
            senderName={displayName}
          />
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
          handleIndicatorStyle={{ backgroundColor: Colors.white }}
        >
          <TenorScreen
            isSheetOpen={isSheetOpen}
            receiverPicture={profilePicture}
            receiverName={displayName}
            receiverId={id}
            senderId={"nothing yet"}
            senderName={displayName}
            socket={socket}
          />
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
    marginBottom: "15%",
  },
  messageContainer: {
    alignSelf: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
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
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  name: {
    flexDirection: "column",
  },
  nameText: {
    color: Colors.white,
    fontSize: 16,
  },
  usernameText: {
    color: Colors.white,
    fontSize: 14,
    opacity: 0.75,
  },
  image: {
    padding: 20,
  },
});

export default MessageScreen;
