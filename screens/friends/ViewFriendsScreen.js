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
        <h1 style={styles.h1}>Your Friends</h1>
    </>
  );
}

const styles = StyleSheet.create({
    h1: {
        color: '#c5b358',
    },
})

export default ViewFriendsScreen;