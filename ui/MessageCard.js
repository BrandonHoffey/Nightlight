import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import Colors from "../Colors";

const MessageCard = ({ messages, currentUser }) => {
  const reversedMessages = [...messages].reverse();
  return (
    <View>
      <FlatList
        inverted
        style={{ height: "100%", width: "100%" }}
        data={reversedMessages}
        keyExtractor={(item, index) => item._id.toString()}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.messagesContainer,
              currentUser === item.sender ? styles.right : styles.left,
            ]}
          >
            <View style={styles.container}>
              <View style={styles.userWrapper}>
                <Image
                  source={{ uri: item.senderPicture }}
                  style={styles.image}
                />
                <Text style={[styles.text, { marginLeft: 10 }]}>
                  {item.senderName}
                </Text>
              </View>
              {item.content.includes("https", ".gif") ? (
                <View
                  style={[
                    styles.imageWrapper,
                    currentUser === item.sender ? styles.right : styles.left,
                  ]}
                >
                  <Image
                    source={{ uri: item.content }}
                    style={{ height: 200, width: 200, borderRadius: 10 }}
                  />
                </View>
              ) : (
                <View
                  style={[
                    styles.textWrapper,
                    currentUser === item.sender ? styles.right : styles.left,
                  ]}
                >
                  <Text style={styles.text}>{item.content}</Text>
                </View>
              )}
            </View>
          </View>
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  messagesContainer: {
    flexDirection: "column",
    flex: 1,
  },
  container: {
    flexDirection: "column",
    borderRadius: 10,
    margin: 10,
    maxWidth: "60%",
    flex: 1,
  },
  userWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  textWrapper: {
    backgroundColor: Colors.lightBlue,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  imageWrapper: {
    padding: 10,
    borderRadius: 10,
    width: "100%",
    flex: 1,
    marginTop: 10,
  },
  left: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  right: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  text: {
    color: Colors.white,
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: "50%",
  },
});

export default MessageCard;
