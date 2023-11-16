import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";
import useLoading from "./UseLoading";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import TenorApi from "../api/TenorApi";

const screenWidth = Dimensions.get("window").width;
const itemWidth = (screenWidth - 3 * 20) / 2;

const TenorScreen = ({ isSheetOpen }) => {
  const [searchGif, setSearchGif] = useState([]);
  const [categoryGif, setCategoryGif] = useState([]);
  const [textContent, setTextContent] = useState("");
  const [loading, executeWithLoading] = useLoading(async (query) => {
    try {
      const results = await TenorApi(query);
      setSearchGif(results);
    } catch (error) {
      Alert.alert(error);
    }
  });

  const handleTextChange = (text) => {
    setTextContent(text);
    if (text.length > 0) {
      executeWithLoading(text);
    } else {
      setSearchGif([]);
    }
  };

  useEffect(() => {
    executeWithLoading();
  }, []);

  useEffect(() => {
    if (!isSheetOpen) {
      setTextContent("");
    }
  }, [isSheetOpen]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <FontAwesome
          name="search"
          color="#000"
          style={[styles.icon, styles.left]}
          size={18}
        />
        <TextInput
          style={styles.input}
          onChangeText={handleTextChange}
          value={textContent}
          placeholder="Search GIFs"
          placeholderTextColor="#000"
        />
        {textContent.length > 0 && (
          <Octicons
            name="x"
            color="#000"
            style={[styles.icon, styles.right]}
            size={18}
            onPress={() => handleTextChange("")}
          />
        )}
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <BottomSheetFlatList
            style={{ flex: 1 }}
            data={searchGif.length === 0 ? categoryGif : searchGif}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            nestedScrollEnabled={true}
            horizontal={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  width: itemWidth,
                  flex: 1,
                  alignItems: "center",
                }}
                onPress={() => console.log(item.itemurl)}
              >
                <Image
                  key={index}
                  style={styles.image}
                  source={{
                    uri:
                      searchGif.length === 0
                        ? item.image
                        : `${item.itemurl}.gif`,
                  }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  imageContainer: {
    flex: 1,
    width: "100%",
  },
  image: {
    width: itemWidth,
    height: 200,
    borderRadius: 10,
    margin: 10,
  },
  icon: {
    padding: 5,
  },
  left: {
    marginLeft: 10,
  },
  right: {
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TenorScreen;
