import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../../UserContext";

const Friend = ({ item }) => {
  console.log(item);
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
        <Text style={{ fontWeight: "bold" }}>{item?.username}</Text>
      </View>
      </Pressable>
  );
};

export default Friend;

const styles = StyleSheet.create({});
