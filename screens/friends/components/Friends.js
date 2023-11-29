import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  PixelRatio,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../../Colors";
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

const Friend = ({ item, token, currentUser }) => {
  item = item.item;
  const navigate = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleChatPress = () => {
    navigate.navigate("MessageScreen", {
      receiverName: item.displayName,
      username: item.username,
      receiverPicture: item.profilePicture,
      receiverId: item._id,
      currentUser: currentUser,
      token: token,
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.screenContainer}>
        <Pressable
          onPress={() => toggleModal()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                resizeMode: "cover",
              }}
              source={{ uri: item?.profilePicture }}
            />

            <View style={{ marginLeft: 12 }}>
              <Text
                style={{
                  fontSize: getFontSize(16),
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {item?.displayName}
              </Text>
            </View>
          </View>

          <Pressable
            onPress={handleChatPress}
            style={{
              backgroundColor: Colors.lightBlue,
              padding: 10,
              borderRadius: 20,
              width: 70,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: getFontSize(14),
              }}
            >
              Chat
            </Text>
          </Pressable>
        </Pressable>

        {/* Modal for displaying larger profile picture */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            toggleModal();
          }}
        >
          <View style={styles.modalContainer}>
            <Image
              style={styles.modalImage}
              source={{ uri: item?.profilePicture }}
            />
            <Pressable onPress={toggleModal} style={styles.closeButton}>
              <Text style={{ color: Colors.white }}>Close</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    padding: 10,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    borderRadius: 15,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default Friend;