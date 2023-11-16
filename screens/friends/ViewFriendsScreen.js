import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Image,
  } from 'react-native';


function ViewFriendsScreen(props) {
  return (
    <>
        <Text style={styles.text}>Your Friends</Text>
    </>
  );
}

const styles = StyleSheet.create({
    h1: {
        color: '#c5b358',
    },
})

export default ViewFriendsScreen;