import React from 'react';
import { View, Text } from 'react-native';
import appStyles from '~/styles';

export default function Details() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Hello Description</Text>
    </View>
  );
}
Details.navigationOptions = () => ({});
