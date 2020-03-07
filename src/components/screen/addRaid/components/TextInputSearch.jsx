import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Animated,
  FlatList,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import _ from 'lodash';
import { set } from 'date-fns';

export default function TextInputSearch(props) {
  const [data, setData] = useState(props.data);
  const [showFlatList, setShowFlatlist] = useState(false);
  const [display, setDisplay] = useState('');

  const [isFocused, setIsFocused] = useState(false);
  const [haveText, setHaveText] = useState(false);
  const animation = new Animated.Value(0);

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

  function contains({ name }, query) {
    if (name.includes(query) && query !== '') {
      return true;
    }
    return false;
  }

  function handleSearch(textValue) {
    textValue == '' ? setHaveText(false) : setHaveText(true);
    setDisplay(textValue);
    const formatedQuery = textValue.toUpperCase();
    const filtredData = _.filter(props.data, item =>
      contains(item, formatedQuery)
    );
    setData(filtredData);
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
      <View>
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
            setDisplay('');
            setHaveText(false);
            setData(props.data);
          }}
          onBlur={() => {
            handleBlur();
          }}
          value={display}
          onChangeText={textValue => {
            setShowFlatlist(true);
            handleSearch(textValue);
          }}
        />
      </View>
      {showFlatList && (
        <View
          style={{
            position: 'absolute',
            zIndex: 2,
            top: 70,
            maxHeight: 290,
            backgroundColor: '#adadad',
            borderRadius: 5
          }}
        >
          <FlatList
            data={data}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity
                  style={{ marginVertical: 4 }}
                  onPress={() => {
                    setDisplay(item.name);
                    setIsFocused(true);
                    setShowFlatlist(false);
                    props.setValue(item.id);
                  }}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}
