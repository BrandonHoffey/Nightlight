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
import { listMessages } from "../../api/MessagesApi";
import { Status } from "../../ui/Status";

const MessageScreen = ({ route }) => {
  const {
    receiverName,
    username,
    receiverId,
    receiverPicture,
    currentUser,
    token,
  } = route.params;
  console.log("Here", currentUser);
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
    socket.emit("join", { senderId: currentUser._id, receiverId: receiverId });
    const loadPreviousMessages = async () => {
      try {
        const previousMessages = await listMessages(receiverId, token);
        setMessages(previousMessages);
      } catch (error) {
        console.error("Error fetching previous messages:", error);
      }
    };
    loadPreviousMessages();
    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket, currentUser._id, receiverId]);
  return (
    <GestureHandlerRootView style={{ flex: 1, width: "100%" }}>
      <View style={styles.viewport}>
        <SafeAreaView style={styles.user}>
          <Pressable
            onPress={() =>
              navigation.navigate("InboxScreen", { currentUser, token })
            }
          >
            <AntDesign name="left" color={Colors.white} size={20} />
          </Pressable>
          <View style={styles.image}>
            <Status picture={receiverPicture} id={receiverId} />
          </View>
          <View style={styles.name}>
            <Text style={styles.nameText}>{receiverName}</Text>
            <Text style={styles.usernameText}>{username}</Text>
          </View>
        </SafeAreaView>
        <View style={styles.messageContainer}>
          <MessageCard messages={messages} currentUser={currentUser._id} />
        </View>
        <KeyboardAvoidingView
          keyboardVerticalOffset={20}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inputContainer}
        >
          <MessageBar
            handleSheet={handleSheet}
            placeholder="Message..."
            receiverPicture={receiverPicture}
            receiverName={receiverName}
            receiverId={receiverId}
            senderId={currentUser._id}
            senderName={currentUser.displayName}
            senderPicture={currentUser.profilePicture}
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
            setIsSheetOpen={setIsSheetOpen}
            receiverPicture={receiverPicture}
            receiverName={receiverName}
            receiverId={receiverId}
            senderId={currentUser._id}
            senderName={currentUser.displayName}
            senderPicture={currentUser.profilePicture}
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