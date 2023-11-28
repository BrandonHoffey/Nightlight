import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSocket } from "../api/SocketManager";
import Colors from "../Colors";

const StatusHome = ({ currentlySignedIn, handleSheet }) => {
  const [currentStatus, setCurrentStatus] = useState("online");
  const [color, setColor] = useState(null);
  const socket = useSocket();

  const statusColor = () => {
    if (currentStatus === "online") {
      return Colors.onlineGreen;
    }
    if (currentStatus === "offline") {
      return Colors.yellow;
    }
    if (currentStatus === "notReady") {
      return Colors.red;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      socket.emit("status", {
        user: currentlySignedIn.user,
      });
      socket.on("status", (status) => {
        setCurrentStatus(status);
      });
      socket.on("statusUpdate", (newStatus) => {
        setCurrentStatus(newStatus);
      });
      return () => {
        socket.off("status");
        socket.off("statusUpdate");
      };
    }, [socket, currentlySignedIn])
  );

  useFocusEffect(
    React.useCallback(() => {
      setColor(statusColor());
    }, [currentStatus])
  );

  return (
    <View style={styles.statusContainer}>
      <TouchableOpacity
        style={styles.profileImageContainer}
        onPress={() => handleSheet()}
      >
        {currentlySignedIn ? (
          <Image
            source={{ uri: currentlySignedIn.profilePicture }}
            style={styles.profileImage}
          />
        ) : (
          <ActivityIndicator />
        )}
      </TouchableOpacity>
      <View style={[styles.online, { backgroundColor: color }]} />
    </View>
  );
};

const Status = ({ id, picture, handlePress }) => {
  const [currentStatus, setCurrentStatus] = useState("online");
  const [color, setColor] = useState(null);
  const socket = useSocket();

  const statusColor = () => {
    if (currentStatus === "online") {
      return Colors.onlineGreen;
    }
    if (currentStatus === "offline") {
      return Colors.yellow;
    }
    if (currentStatus === "notReady") {
      return Colors.red;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      socket.emit("status", {
        user: id,
      });
      socket.on("status", (status) => {
        setCurrentStatus(status);
      });
      socket.on("statusUpdate", (newStatus) => {
        setCurrentStatus(newStatus);
      });
      return () => {
        socket.off("status");
        socket.off("statusUpdate");
      };
    }, [socket, id])
  );

  useFocusEffect(
    React.useCallback(() => {
      setColor(statusColor());
    }, [currentStatus])
  );

  return (
    <View style={styles.statusContainer}>
      <TouchableOpacity
        style={styles.profileImageContainer}
        // onPress={}
      >
        {picture ? (
          <Image source={{ uri: picture }} style={styles.profileImage} />
        ) : (
          <ActivityIndicator />
        )}
      </TouchableOpacity>
      <View style={[styles.online, { backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
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
  statusContainer: {
    position: "relative",
  },
  online: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 6,
    right: 0,
    bottom: 30,
    borderWidth: 2,
    borderColor: Colors.darkBlue,
  },
});

export { Status, StatusHome };
