import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  ScrollView,
} from "react-native";
import { useSocket } from "../api/SocketManager";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../Colors";

const MessageBar = ({
  placeholder,
  handleSheet,
  receiverPicture,
  receiverId,
  receiverName,
  senderId,
  senderName,
}) => {
  const [textContent, setTextContent] = useState("");
  const [previousContentHeight, setPreviousContentHeight] = useState(40);
  const [textInputHeight, setTextInputHeight] = useState(40);
  const textInputRef = useRef();
  const socket = useSocket();

  const handleTextChange = (text) => {
    setTextContent(text);
  };

  const handleContentSizeChange = (contentHeight) => {
    setPreviousContentHeight(contentHeight);
    textInputRef.current.scrollToEnd({ animated: true });
  };

  const handlePress = (text) => {
    if (text === "gif") {
      handleSheet();
      Keyboard.dismiss();
    } else if (text === "image") {
      Keyboard.dismiss();
    } else if (text === "send") {
      socket.emit("message", {
        content: textContent,
        sender: senderId,
        senderName: senderId,
        receiver: receiverId,
        receiverName,
        receiverPicture,
      });
      setTextContent("");
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.viewport}>
      <ScrollView
        ref={textInputRef}
        style={{ maxHeight: 130, borderRadius: 20 }}
      >
        <TextInput
          style={{
            minHeight: 42,
            flex: 1,
            padding: 10,
            borderRadius: 20,
            backgroundColor: Colors.white,
            marginLeft: 6,
            paddingTop: 15,
          }}
          placeholder={placeholder}
          placeholderTextColor="#000"
          onChangeText={handleTextChange}
          onContentSizeChange={handleContentSizeChange}
          multiline={true}
          maxLength={1000}
          value={textContent}
        />
      </ScrollView>
      <View>
        <View style={styles.icons}>
          {textContent.length === 0 && (
            <>
              <Pressable onPress={() => handlePress("gif")}>
                <MaterialIcons
                  name="gif"
                  color={Colors.black}
                  style={styles.icon}
                  size={26}
                />
              </Pressable>

              <Pressable onPress={() => handlePress("image")}>
                <MaterialCommunityIcons
                  name="image-outline"
                  color={Colors.black}
                  style={styles.icon}
                  size={26}
                />
              </Pressable>
            </>
          )}
          {textContent.length > 0 && (
            <Pressable onPress={() => handlePress("send")} style={styles.send}>
              <FontAwesome5
                name="paper-plane"
                color={Colors.black}
                style={styles.icon}
                size={20}
              />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewport: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: Colors.white,
    minWidth: "80%",
    maxWidth: "80%",
    borderRadius: 20,
  },
  text: {
    color: Colors.white,
  },
  icon: {
    padding: 5,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "2%",
  },
  send: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingRight: 0,
    marginBottom: 5,
  },
});

export default MessageBar;
