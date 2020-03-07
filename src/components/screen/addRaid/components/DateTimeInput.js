import React, { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, TextInput, Animated, Platform } from 'react-native';
import { formatRelative } from 'date-fns';
import { ptBR, pt } from 'date-fns/locale';

export default function MyDateTimePicker(props) {
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState('');

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
    left: 15,
    top: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [32, 0]
    }),
    fontSize: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12]
    }),
    color: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#808080', '#808080']
    })
  };

  function handleText(textValue) {
    if (textValue == '') {
      setHaveText(false);
    } else {
      setHaveText(true);
    }
  }

  function handleBlur() {
    if (haveText) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  }
  function setDataTime(event, newdate) {
    setShow(Platform.OS === 'ios' ? true : false);

    if (event.type === 'set') {
      props.onChange(newdate);
      let formatedDate = formatRelative(newdate, new Date(), { locale: ptBR });
      setDisplay(formatedDate);
      setHaveText(true);
    } else {
      props.onChange('');
      setDisplay('');
      setHaveText(false);
    }
  }

  return (
    <View style={{ paddingTop: 18 }}>
      <Animated.Text style={labelStyle}>{props.label}</Animated.Text>
      <TextInput
        style={{
          height: 48,
          fontSize: 16,
          color: props.fontColor ? props.fontColor : 'rgba(0, 0, 0, 0.7)',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: 20,
          paddingLeft: 15
        }}
        secureTextEntry={props.secureText ? props.secureText : false}
        onFocus={() => {
          setIsFocused(true);
          setShow(true);
        }}
        onBlur={() => {
          handleBlur();
        }}
        onChangeText={textValue => {
          handleText(textValue);
        }}
        blurOnSubmit
        value={display}
      />
      {show && (
        <DateTimePicker
          mode='time'
          display='spinner'
          is24Hour={true}
          value={new Date()}
          onChange={setDataTime}
        />
      )}
    </View>
  );
}
