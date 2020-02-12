import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import appStyles from '~/styles';

// import { Container } from './styles';

export default function InputCommun(props) {
  const [placeholderColor, setPlaceholderColor] = useState(
    appStyles.colors.transparent07
  );
  return (
    <View>
      <TextInput
        style={style.customInput}
        placeholder={props.placeholder}
        placeholderTextColor={placeholderColor}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        autoCapitalize={props.autoCapitalize}
        autoCorrect={props.autoCorrect}
        value={props.value}
        onChangeText={props.onChangeText}
        onFocus={() => {
          setPlaceholderColor('rgba(0,0,0,0)');
        }}
        onBlur={() => {
          setPlaceholderColor(appStyles.colors.transparent07);
        }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  customInput: {
    marginBottom: 15,
    borderRadius: 5,
    paddingHorizontal: 20,
    fontSize: 17,
    color: '#444',
    height: 50,
    backgroundColor: appStyles.colors.transparent02
  }
});
