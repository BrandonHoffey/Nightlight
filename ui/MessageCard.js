import React from "react";
import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import Colors from "../Colors";

const MessageCard = ({ messages }) => {
  return (
    <View>
      <FlatList
        style={{ height: "100%", width: "100%" }}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.container}>
            <View style={styles.userWrapper}>
              <Image
                source={{ uri: item.receiverPicture }}
                style={styles.image}
              />
              <Text style={[styles.text, { marginLeft: 10 }]}>
                {item.receiverName}
              </Text>
            </View>
            {item.content.includes("https", ".gif") ? (
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: item.content }}
                  style={{ height: 200, width: 200, borderRadius: 10 }}
                />
              </View>
            ) : (
              <View style={styles.textWrapper}>
                <Text style={styles.text}>{item.content}</Text>
              </View>
            )}
          </View>
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "left",
    borderRadius: 10,
    margin: 10,
    flex: 1,
  },
  userWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  textWrapper: {
    flexDirection: "column",
    backgroundColor: Colors.lightBlue,
    padding: 10,
    borderRadius: 10,
    width: "70%",
    flex: 1,
    marginTop: 10,
  },
  imageWrapper: {
    flexDirection: "column",
    // backgroundColor: Colors.lightBlue,
    padding: 10,
    borderRadius: 10,
    width: "100%",
    flex: 1,
    marginTop: 10,
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
