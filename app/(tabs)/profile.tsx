import { View, Text } from 'react-native'
import React from 'react'

export default function profile() {
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          marginTop: "50%",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Profile
      </Text>
    </View>
  );
}