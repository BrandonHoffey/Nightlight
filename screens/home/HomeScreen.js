import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  PixelRatio,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Colors from "../../Colors";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import logo from "../../assets/logo.png";
import bgStars from "../../assets/background.png";
import { currentUser } from "../../api/UserApi";
import { StatusHome } from "../../ui/Status";
import { UserContext } from "../../UserContext";
import { useSocket } from "../../api/SocketManager";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

const HomeScreen = () => {
  const [currentlySignedIn, setCurrentlySignedIn] = useState({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { token, logout } = useContext(UserContext);
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ["40%", "40%", "40%"], []);
  const navigation = useNavigation();
  const socket = useSocket();

  const handleSheet = () => {
    setIsSheetOpen(!isSheetOpen);
  };

  const handlePress = (text) => {
    if (text === "changeStatus") {
      setIsStatusOpen(!isStatusOpen);
    } else if (text === "account") {
      handleSheet();
    } else if (text === "signOut") {
      handleSheet();
      socket.emit("statusUpdate", {
        user: currentlySignedIn,
        status: "offline",
      });
      navigation.navigate("Authorization");
      logout();
    }
  };

  const handleStatusChange = (text) => {
    if (text === "offline") {
      handleSheet();
      socket.emit("statusUpdate", {
        user: currentlySignedIn,
        status: "offline",
      });
      setIsStatusOpen(false);
    } else if (text === "online") {
      handleSheet();
      socket.emit("statusUpdate", {
        user: currentlySignedIn,
        status: "online",
      });
      setIsStatusOpen(false);
    } else if (text === "notReady") {
      handleSheet();
      socket.emit("statusUpdate", {
        user: currentlySignedIn,
        status: "notReady",
      });
      setIsStatusOpen(false);
    }
  };

  useEffect(() => {
    const handlePageLoad = async () => {
      try {
        if (token) {
          const result = await currentUser(token);
          setCurrentlySignedIn(result);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      handlePageLoad();
    }
  }, [token]);

  useEffect(() => {
    if (!isSheetOpen) {
      bottomSheetRef.current && bottomSheetRef.current.close();
    } else {
      bottomSheetRef.current && bottomSheetRef.current.expand();
    }
  }, [isSheetOpen]);

  useEffect(() => {
    socket.emit("statusUpdate", {
      user: currentlySignedIn,
      status: "online",
    });
  }, [currentlySignedIn]);

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName, {
      currentUser: currentlySignedIn,
      token: token,
    });
  };

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.white} />
        </View>
      ) : (
        <GestureHandlerRootView style={{ flex: 1, width: "100%" }}>
          <SafeAreaView style={styles.container}>
            <Image source={bgStars} style={styles.backgroundImage} />
            <View style={styles.header}>
              <View style={styles.navBar}>
                <Image source={logo} style={styles.logo} />
                {currentlySignedIn && (
                  <StatusHome
                    currentlySignedIn={currentlySignedIn}
                    handleSheet={handleSheet}
                  />
                )}
              </View>
              <Text style={styles.welcomeText}>
                {currentlySignedIn
                  ? `Welcome, ${currentlySignedIn.displayName}`
                  : "Welcome"}
              </Text>
            </View>
            <View style={styles.buttonColumnsContainer}>
              <View style={styles.buttonColumn}>
                <CustomPressable
                  onPress={() => navigateToScreen("FriendScreen")}
                  style={styles.friendsButton}
                  text="Friends"
                />
                <CustomPressable2
                  onPress={() => navigateToScreen("Group Chats")}
                  style={styles.groupsButton}
                  text="Groups"
                />
              </View>
              <View style={styles.buttonColumn}>
                <CustomPressable2
                  onPress={() => navigateToScreen("Community")}
                  style={styles.communityButton}
                  text="Community"
                />
                <CustomPressable
                  onPress={() => navigateToScreen("InboxScreen")}
                  style={styles.communityButton}
                  text="Messages"
                />
              </View>
            </View>
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
              backgroundStyle={styles.sheetContainer}
              handleIndicatorStyle={{ backgroundColor: Colors.white }}
            >
              <View style={styles.sheetContainerContent}>
                <Pressable
                  style={styles.buttons}
                  onPress={() => handlePress("changeStatus")}
                >
                  <Text style={styles.text}>Change Status</Text>
                </Pressable>
                {isStatusOpen ? (
                  <View style={styles.statusChangeContainer}>
                    <View>
                      <TouchableOpacity
                        onPress={() => handleStatusChange("online")}
                        style={styles.statusWrapper}
                      >
                        <View
                          style={[
                            styles.statusColor,
                            { backgroundColor: Colors.onlineGreen },
                          ]}
                        />
                        <Text style={styles.text}>Online</Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => handleStatusChange("offline")}
                        style={styles.statusWrapper}
                      >
                        <View
                          style={[
                            styles.statusColor,
                            { backgroundColor: Colors.yellow },
                          ]}
                        />
                        <Text style={styles.text}>Offline</Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => handleStatusChange("notReady")}
                        style={styles.statusWrapper}
                      >
                        <View
                          style={[
                            styles.statusColor,
                            { backgroundColor: Colors.red },
                          ]}
                        />
                        <Text style={styles.text}>Not ready</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <>
                    <Pressable
                      style={styles.buttons}
                      onPress={() => handlePress("account")}
                    >
                      <Text style={styles.text}>Account</Text>
                    </Pressable>
                    <Pressable
                      style={styles.buttons}
                      onPress={() => handlePress("signOut")}
                    >
                      <Text style={styles.text}>Sign Out</Text>
                    </Pressable>
                  </>
                )}
              </View>
            </BottomSheet>
          </SafeAreaView>
        </GestureHandlerRootView>
      )}
    </>
  );
};

const CustomPressable = ({ onPress, style, text }) => (
  <Pressable
    style={({ pressed }) => [
      styles.buttonContainer,
      style,
      { backgroundColor: pressed ? Colors.lightGreen : Colors.lightBlue },
    ]}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{text}</Text>
  </Pressable>
);
const CustomPressable2 = ({ onPress, style, text }) => (
  <Pressable
    style={({ pressed }) => [
      styles.buttonContainer,
      style,
      { backgroundColor: pressed ? Colors.lightBlue : Colors.lightGreen },
    ]}
    onPress={onPress}
  >
    <Text style={styles.buttonText2}>{text}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.darkBlue,
  },
  statusChangeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    width: "90%",
  },
  statusColor: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  statusWrapper: {
    flexDirection: "row",
    gap: 4,
  },
  sheetContainer: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: Colors.darkBlue,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    width: "100%",
  },
  sheetContainerContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
  },
  buttons: {
    backgroundColor: Colors.lightBlue,
    width: "90%",
    padding: 20,
    borderRadius: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.darkBlue,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    height: "120%",
  },
  header: {
    flexDirection: "column",
    gap: 20,
    flex: 1,
    alignItems: "left",
    width: "95%",
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
  welcomeText: {
    color: Colors.white,
    fontSize: getFontSize(24),
  },
  text: {
    color: Colors.white,
    textAlign: "center",
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
    margin:40,
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
    fontSize: getFontSize(18),
    fontWeight: "bold",
  },
  buttonText2: {
    color: Colors.white,
    fontSize: getFontSize(18),
    fontWeight: "bold",
  },
  communityButtonText: {
    color: Colors.lightBlue,
    fontSize: getFontSize(18),
    fontWeight: "bold",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});

export { HomeScreen };
