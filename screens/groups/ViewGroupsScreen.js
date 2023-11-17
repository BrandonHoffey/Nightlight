// import React from "react";
import {StyleSheet, Text ,View, TextInput, Button, TouchableOpacity, FlatList, SafeAreaView} from "react-native";
import Colors from "../../Colors";
import { API_GROUP_VIEW_ALL } from "../../constants/Endpoints";
import React, { useState, useEffect } from 'react';


export default ViewGroupsCreated = (props) => {
  const [viewAllGroups, setViewAllGroups] = useState([]);
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append();

        let requestOptions = {
          method: "GET",
          headers: myHeaders,
        };
        const response = await fetch(API_GROUP_VIEW_ALL, requestOptions);
        const data = await response.json();
        console.log(data);
        setViewAllGroups(data.groups);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);
  useEffect(() => {
    console.log("use effect log",viewAllGroups)
  }, [viewAllGroups]);

  const Item = ({ name, users }) => (
    <View style={styles.groupInfo}>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.usersText}>{users}</Text>
        
    </View>
  );
  
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={viewAllGroups}
          renderItem={({ item }) => 
          <Item name={item.name} 
          users={item.users}/>}
          keyExtractor={item => item._id}
        />
      </SafeAreaView>
    );
  };


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlue,
    flex: 1,
  },
  nameText: {
    backgroundColor: Colors.lightBlue,
    color: "white",
    fontSize: 24,
  },
  usersText: {
    backgroundColor: Colors.lightBlue,
    color: Colors.lightGreen,
    fontSize: 16,
  },
  groupInfo: {
    backgroundColor: Colors.lightBlue,
    margin: 10,
    padding: 10,
    borderRadius: 15,
    overflow: "hidden",
    marginTop:15,
  },
  // buttonContainer: {
  //   borderRadius: 15,
  //   overflow: "hidden",
  //   margin: 10,
  //   color: Colors.lightBlue,
  // },
});

 // <View style={styles.container}>
    //   <TouchableOpacity style={styles.buttonContainer}>
    //     <Button
    //       color={Colors.lightBlue}
    //       title="View Groups"
          
    //       onPress={() => console.log("view groups clicked")}
    //     />
    //   </TouchableOpacity>
    // </View>
