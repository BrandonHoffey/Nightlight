import { StyleSheet, Text, View, Image, Pressable, PixelRatio } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../../UserContext";
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

const Friend = ({ item }) => {
  const { userId, setUserId } = useContext(UserContext);

  return (
    <Pressable
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
    >
      <View>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: "cover",
          }}
          source={{ uri: item.profilePicture }}
        />
      </View>

      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontSize:getFontSize(16), color:"white",fontWeight: "bold" }}>{item?.username}</Text>
      </View>
      </Pressable>
  );
};

export default Friend;

const styles = StyleSheet.create({});