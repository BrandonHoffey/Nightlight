import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  PixelRatio,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Colors from "../../Colors";
import { useNavigation } from "@react-navigation/native";
import LogoutButton from "../../ui/LogoutButton";
import logo from "../../assets/logo.png";
import { UserContext } from "../../UserContext";
import { currentUser } from "../../api/UserApi";
import bgStars from "../../assets/background.png";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

const HomeScreen = () => {
  const [currentlySignedIn, setCurrentlySignedIn] = useState({});
  const { username, token } = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    const handlePageLoad = async () => {
      try {
        if (token) {
          const result = await currentUser(token);
          setCurrentlySignedIn(result);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      handlePageLoad();
    }
  }, [token]);

  const pressHandlerFriends = () => {
    navigation.navigate("FriendScreen", {
      currentUser: currentlySignedIn,
      token: token,
    });
  };
  const pressHandlerGroups = () => {
    navigation.navigate("Group Chats", {
      currentUser: currentlySignedIn,
      token: token,
    });
  };
  const pressHandlerCommunity = () => {
    navigation.navigate("Community", {
      currentUser: currentlySignedIn,
      token: token,
    });
  };
  const pressHandlerMessages = () => {
    navigation.navigate("InboxScreen", {
      currentUser: currentlySignedIn,
      token: token,
    });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Image source={bgStars} style={styles.backgroundImage} />
        <View style={styles.header}>
          <View style={styles.navBar}>
            <Image source={logo} style={styles.logo} />
            <View style={styles.statusContainer}>
              <TouchableOpacity style={styles.profileImageContainer}>
                {currentlySignedIn ? (
                  <Image
                    source={{ uri: currentlySignedIn.profilePicture }}
                    style={styles.profileImage}
                  />
                ) : (
                  <ActivityIndicator />
                )}
              </TouchableOpacity>
              <View style={styles.online} />
            </View>
          </View>
          <Text style={[styles.welcomeText]}>
            {currentlySignedIn
              ? `Welcome, ${currentlySignedIn.displayName}`
              : "Welcome"}
          </Text>
        </View>
        <View style={styles.buttonColumnsContainer}>
          <View style={styles.buttonColumn}>
            <Pressable
              style={({ pressed }) => [
                styles.buttonContainer,
                styles.friendsButton,
                {
                  backgroundColor: pressed
                    ? Colors.lightGreen
                    : Colors.lightBlue,
                },
              ]}
              onPress={pressHandlerFriends}
            >
              <Text style={[styles.buttonText]}>Friends</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.buttonContainer,
                styles.groupsButton,
                {
                  backgroundColor: pressed
                    ? Colors.lightBlue
                    : Colors.lightGreen,
                },
              ]}
              onPress={pressHandlerGroups}
            >
              <Text style={[styles.buttonText]}>Groups</Text>
            </Pressable>
          </View>
          <View style={styles.buttonColumn}>
            <Pressable
              style={({ pressed }) => [
                styles.buttonContainer,
                styles.communityButton,
                {
                  backgroundColor: pressed ? Colors.white : Colors.yellow,
                },
              ]}
              onPress={pressHandlerCommunity}
            >
              <Text style={[styles.communityButtonText]}>Community</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.buttonContainer,
                styles.communityButton,
                { backgroundColor: pressed ? Colors.yellow : Colors.white },
              ]}
              onPress={pressHandlerMessages}
            >
              <Text style={[styles.communityButtonText]}>Messages</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.darkBlue,
  },
  navBar: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: Colors.white,
    borderBottomWidth: 0.2,
  },
  header: {
    flexDirection: "column",
    gap: 20,
    flex: 1,
    alignItems: "left",
    width: "95%",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    height: "120%",
  },
  welcomeText: {
    color: Colors.white,
    fontSize: getFontSize(24),
  },
  profileImageContainer: {
    borderWidth: 1,
    padding: 3,
    borderRadius: 50,
    borderColor: Colors.white,
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  logo: {
    resizeMode: "contain",
    width: "40%",
  },
  buttonContainer: {
    borderRadius: 100,
    padding: 20,
    overflow: "hidden",
    margin: 10,
    marginTop: 10,
    width: "50%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
  },
  buttonColumnsContainer: {
    flexDirection: "row",
    flex: 4,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonColumn: {
    flexDirection: "column",
  },
  friendsButton: {
    backgroundColor: Colors.lightBlue,
  },
  groupsButton: {
    backgroundColor: Colors.lightGreen,
  },
  communityButton: {
    backgroundColor: Colors.lightBlue,
  },
  buttonText: {
    color: Colors.white,
    fontSize: getFontSize(24),
    fontWeight: "bold",
  },
  communityButtonText: {
    color: Colors.lightBlue,
    fontSize: getFontSize(24),
    fontWeight: "bold",
  },
  statusContainer: {
    position: "relative",
  },
  online: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 6,
    backgroundColor: Colors.lightGreen,
    right: 0,
    bottom: 30,
    borderWidth: 2,
    borderColor: Colors.darkBlue,
  },
});

export { HomeScreen };
