import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

function SentFriendRequests({ sentFriendRequests }) {
  return (
    <SafeAreaView>
      <View>
        <h1>Sent Requests</h1>
        {sentFriendRequests ? (
          sentFriendRequests.map((request) => (
            <Text key={request._id}>
              Sent to: {request.friend.username}, Status: {request.status}
            </Text>
          ))
        ) : (
          <Text>No sent friend requests</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

export default SentFriendRequests;