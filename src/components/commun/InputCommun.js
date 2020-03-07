import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Animated, StyleSheet } from 'react-native';

import appStyles from '~/styles';

// import { Container } from './styles';

export default function InputCommun(props) {
  const [isFocused, setIsFocused] = useState(false);
  const [haveText, setHaveText] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isFocused ? 1 : 0,
      duration: 450
    }).start();
  }, [isFocused]);

  const labelStyle = {
    position: 'absolute',
    left: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [15, 10]
    }),
    top: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [32, 0]
    }),
    fontSize: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 14]
    }),
    color: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa69d', '#f7f1e3']
    })
  };

  function handleText(textValue) {
    if (textValue == '') {
      setHaveText(false);
    } else {
      setHaveText(true);
    }

    props.setValue(textValue);
  }

  function handleBlur() {
    if (haveText) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  }

  return (
    <View style={{ paddingTop: 18 }}>
      <Animated.Text style={labelStyle}>{props.label}</Animated.Text>
      <TextInput
        style={style.customInput}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        autoCapitalize={props.autoCapitalize}
        autoCorrect={props.autoCorrect}
        value={props.value}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          handleBlur();
        }}
        value={props.value}
        onChangeText={textValue => {
          handleText(textValue);
        }}
        blurOnSubmit
      />
    </View>
  );
}

const style = StyleSheet.create({
  customInput: {
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 17,
    color: '#444',
    height: 50,
    backgroundColor: appStyles.colors.transparent02
  }
});
