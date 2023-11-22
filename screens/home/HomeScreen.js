import React, { useContext, useLayoutEffect, useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  PixelRatio,
  Pressable,
  SafeAreaView,
} from "react-native";
import Colors from "../../Colors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import LogoutButton from "../../ui/LogoutButton";
import logo from "../../assets/NightLight-GCfont1.png";
import { UserContext } from "../../UserContext";
import bgStars from "../../assets/stars-backgroundRS.png";
import { API_UPDATE_STATUS } from "../../constants/Endpoints";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

const HomeScreen = () => {
  const navigation = useNavigation();
  const { username } = useContext(UserContext);
  const [isOnline, setIsOnline] = useState(false);
  const { userId, setUserId, token } = useContext(UserContext);

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        const response = await fetch(`${API_UPDATE_STATUS}/${userId}`, {
          method: "GET",
          headers: myHeaders,
        });

        if (response.ok) {
          const data = await response.json();
          setIsOnline(data.user.status === "online");
        }
      } catch (error) {
        console.error("Error fetching user status:", error);
      }
    };

    fetchUserStatus();
  }, [userId, token]);

  const toggleOnlineStatus = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token);

      const response = await fetch(`${API_UPDATE_STATUS}/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify({
          status: isOnline ? "offline" : "online",
        }),
      });

      if (response.ok) {
        setIsOnline(!isOnline);
      } else {
        console.error(`Failed to update user status. HTTP Error: ${response.status}`);
      }
    } catch (error) {
      console.error("An error occurred while updating user status:", error);
    }
  };

  const pressHandlerFriends = () => {
    navigation.navigate("FriendScreen");
  };
  const pressHandlerGroups = () => {
    navigation.navigate("Group Chats");
  };
  const pressHandlerCommunity = () => {
    navigation.navigate("Community");
  };
  const handleSettings = () => {
    navigation.navigate("UserSettings");
  };

  return (
    <>
      <SafeAreaView style={styles.containerBG}>
        <Image source={bgStars} style={styles.backgroundImage}></Image>
        <View style={styles.overlay}>
          <View style={styles.logoutButtonContainer}>
            <LogoutButton />
          </View>
          <View style={styles.userSettingsContainer}>
            <Ionicons
              name="md-settings-outline"
              size={24}
              color="white"
              onPress={handleSettings}
            />
          </View>
          <Image source={logo} />
          <Text style={styles.textContainer}>Welcome {username}!</Text>
          <Pressable
            style={({ pressed }) => [
              styles.buttonContainer,
              {
                backgroundColor: pressed ? Colors.lightGreen : Colors.lightBlue,
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 1,
                shadowRadius: 10,
                borderColor: Colors.lightGreen,
                borderWidth: 3,
                elevation: 10,
                shadowColor: Colors.black,
              },
            ]}
            onPress={pressHandlerFriends}
          >
            <Text style={styles.buttonText}>Friends</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.buttonContainer,
              {
                backgroundColor: pressed ? Colors.lightBlue : Colors.lightGreen,
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 1,
                shadowRadius: 10,
                borderColor: Colors.white,
                borderWidth: 3,
                elevation: 10,
                shadowColor: Colors.black,
              },
            ]}
            onPress={pressHandlerGroups}
          >
            <Text style={styles.buttonText}>Groups</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.buttonContainer,
              {
                backgroundColor: pressed ? Colors.lightGreen : Colors.yellow,
                elevation: 10,
                shadowColor: Colors.black,
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 1,
                shadowRadius: 10,
                borderColor: Colors.lightGreen,
                borderWidth: 3,
              },
            ]}
            onPress={pressHandlerCommunity}
          >
            <Text style={styles.buttonText1}>Community</Text>
          </Pressable>
          <Pressable
        style={({ pressed }) => [
          styles.buttonContainerStatus,
          {
            backgroundColor: pressed
              ? Colors.onlineGreen
              : isOnline
              ? Colors.onlineGreen
              : Colors.red,
            elevation: 10,
            shadowColor: Colors.black,
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 10,
            borderColor: Colors.white,
            borderWidth: 3,
          },
        ]}
        onPress={toggleOnlineStatus}
      >
        <Text style={styles.buttonText2}>
          {isOnline ? "ONLINE" : "OFFLINE"}
        </Text>
      </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  containerBG: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    // transform: [{ rotate: '180deg' }], //rotates image 180
  },
  overlay: {
    flex: 1,
    // marginTop:10,
    padding: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "rgba(5, 0, 43, 0.4)",
  },
  textContainer: {
    color: Colors.white,
    fontSize: getFontSize(24),
    // fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 100,
    padding: 20,
    overflow: "hidden",
    margin: 10,
    marginTop: 10,
    width: "35%",
    height: "17%",
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
  },
  buttonContainerStatus: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 100,
    // padding: 20,
    overflow: "hidden",
    margin: 10,
    marginTop: 10,
    width: "20%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
  },
  buttonText: {
    color: Colors.white,
    fontSize: getFontSize(18),
    fontWeight: "bold",
  },
  buttonText1: {
    color: Colors.lightBlue,
    fontSize: getFontSize(18),
    fontWeight: "bold",
  },
  buttonText2: {
    color: Colors.white,
    fontSize: getFontSize(14),
    fontWeight: "bold",
  },
  logoutButtonContainer: {
    position: "absolute",
    top: 10,
    right: 16,
    marginTop: 15,
  },
  userSettingsContainer: {
    position: "absolute",
    top: 16,
    left: 16,
    marginTop: 25,
  },
});

export { HomeScreen };