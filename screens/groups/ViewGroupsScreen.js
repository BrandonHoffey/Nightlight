// import React from "react";
import {StyleSheet, Text ,View, TextInput, Button, TouchableOpacity,} from "react-native";
import Colors from "../../Colors";
import { API_GROUP_VIEW_ALL } from "../../constants/Endpoints";
import React, { useState, useEffect } from 'react';


export default ViewGroupsCreated = (props) => {
  const [ViewAllGroups, setViewAllGroups] = useState([]);

  const fetchGroups = async () => {
    try {
      let body = {
        name: name,

      }
      const requestOptions = {
        method: "Get",
        body: JSON.stringify(body),

      }
      const response = await fetch(API_GROUP_VIEW_ALL, requestOptions);
      setViewAllGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(()=>{fetchGroups();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer}>
        <Button
          color={Colors.lightBlue}
          title="View Groups"
          
          onPress={() => console.log("view groups clicked")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlue,
    flex: 1,
  },
  buttonContainer: {
    borderRadius: 15,
    overflow: "hidden",
    margin: 10,
    color: Colors.lightBlue,
  },
});
