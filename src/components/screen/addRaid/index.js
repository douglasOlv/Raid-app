import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import appStyles from '~/styles'


export default function AddRaid() {
  return (
      <View style={style.container}>
        <Text>Hello</Text>
      </View>    
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appStyles.colors.defaultWhite
  }
})