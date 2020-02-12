import React from 'react';
import { View, Text, Button } from 'react-native';

// import { Container } from './styles';

export default function MinhasRaids(props) {
  return (
    <View>
        <Button title='Description'
        onPress={()=>{props.navigation.navigate('Details')}}
        />
    </View>
  );
}
