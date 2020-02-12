import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated
} from 'react-native';
import LogInComponent from './components/LogInComponent';
import SignUpComponent from './components/SignUpComponent';

import appStyles from '~/styles';
import styles from '~/styles';

const LAYOUTS = [
  { Layout: LogInComponent, id: 'login' },
  { Layout: SignUpComponent, id: 'signup' }
];

class Login extends Component {
  _loginFontSize: Object = new Animated.Value(1);
  _signUpFontSize: Object = new Animated.Value(0);

  swipeLogin = () => {
    Animated.parallel([
      Animated.timing(this._loginFontSize, {
        toValue: 1,
        duration: 200
      }),
      Animated.timing(this._signUpFontSize, {
        toValue: 0,
        duration: 200
      })
    ]).start(this._flatListRef.scrollToIndex({ animated: true, index: 0 }));
  };

  swipeSignIn = () => {
    Animated.parallel([
      Animated.timing(this._signUpFontSize, {
        toValue: 1,
        duration: 200
      }),
      Animated.timing(this._loginFontSize, {
        toValue: 0,
        duration: 200
      })
    ]).start(this._flatListRef.scrollToIndex({ animated: true, index: 1 }));
  };

  renderContent = (): Object => (
    <FlatList
      renderItem={this.flatListItem}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      ref={(ref: any): void => {
        this._flatListRef = ref;
      }}
      scrollEnabled={false}
      data={LAYOUTS}
      pagingEnabled
      horizontal
    />
  );

  flatListItem = ({ item }) => {
    const { Layout } = item;

    return (
      <View
        style={{
          flex: 1,
          width: appStyles.metrics.width,
          height: appStyles.metrics.getHeightFromDP('80')
        }}
      >
        <Layout />
      </View>
    );
  };

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={style.container}>
        <View style={style.wrapper}>
          <View style={style.wrapperButonNav}>
            <TouchableOpacity onPress={this.swipeLogin}>
              <Animated.Text
                style={{
                  paddingBottom: appStyles.metrics.getHeightFromDP('3%'),
                  paddingRight: appStyles.metrics.getHeightFromDP('4%'),
                  paddingTop: appStyles.metrics.getHeightFromDP('1%'),
                  fontFamily: 'CircularStd-Black',
                  color: this._loginFontSize.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      appStyles.colors.gray,
                      appStyles.colors.defaultWhite
                    ],
                    extrapolate: 'clamp'
                  }),
                  fontSize: this._loginFontSize.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      appStyles.metrics.mediumSize * 1.3,
                      appStyles.metrics.extraLargeSize * 1.3
                    ],
                    extrapolate: 'clamp'
                  })
                }}
              >
                Entrar
              </Animated.Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.swipeSignIn}>
              <Animated.Text
                style={{
                  paddingBottom: appStyles.metrics.getHeightFromDP('3%'),
                  paddingLeft: appStyles.metrics.getHeightFromDP('4%'),
                  paddingTop: appStyles.metrics.getHeightFromDP('1%'),
                  fontFamily: 'CircularStd-Black',
                  color: this._signUpFontSize.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      appStyles.colors.gray,
                      appStyles.colors.defaultWhite
                    ],
                    extrapolate: 'clamp'
                  }),
                  fontSize: this._signUpFontSize.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      appStyles.metrics.mediumSize * 1.3,
                      appStyles.metrics.extraLargeSize * 1.3
                    ],
                    extrapolate: 'clamp'
                  })
                }}
              >
                Cadastrar-se
              </Animated.Text>
            </TouchableOpacity>
          </View>
          {this.renderContent()}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: appStyles.colors.primaryColor
  },
  wrapperButonNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: appStyles.metrics.getWidthFromDP('100'),
    height: appStyles.metrics.getHeightFromDP('8'),
    paddingHorizontal: 2 * appStyles.metrics.extraLargeSize,
    marginTop: appStyles.metrics.getHeightFromDP('20')
  },
  wrapper: {
    marginTop: appStyles.metrics.mediumSize,
    justifyContent: 'center',
    alignItems: 'center'
  },
  formWrapper: {
    width: styles.metrics.getWidthFromDP('92%')
  }
});

export default Login;
