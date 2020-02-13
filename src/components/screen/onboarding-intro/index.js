import React, { Component } from 'react';
import { View } from 'react-native';
import * as Font from 'expo-font';
import { getItemFromStorage } from '~/utils/useAsyncStorage';

import appStyle from '~/styles';

export default class Onboarding_Intro extends Component {
  async componentDidMount() {
    await Font.loadAsync({
      'CircularStd-Black': require('~assets/fonts/CircularStd-Black.ttf'),
      'Montserrat-Regular': require('~assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-Light': require('~assets/fonts/Montserrat-Light.ttf')
    });

    getItemFromStorage('Token').then(response => {
      response !== undefined
        ? this.props.navigation.navigate('MainStack')
        : this.props.navigation.navigate('Login');
    });
  }
  render() {
    return <View></View>;
  }
}
