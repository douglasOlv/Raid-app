import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Keyboard
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
  state = { keyboardShow: false };
  _loginFontSize: Object = new Animated.Value(1);
  _signUpFontSize: Object = new Animated.Value(0);

  componentDidMount() {
    Keyboard.addListener('keyboardDidShow', () => {
      this.setState({ keyboardShow: true });
    });
    Keyboard.addListener('keyboardDidHide', () => {
      this.setState({ keyboardShow: false });
    });
  }

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
      <View style={style.formWrapper}>
        <Layout />
      </View>
    );
  };

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={style.container}>
        {!this.state.keyboardShow && (
          <View style={{ alignItems: 'center' }}>
            <Text style={style.appName}>RaidsApp</Text>
          </View>
        )}
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
                      appStyles.colors.lightGray,
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
                      appStyles.colors.lightGray,
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
    paddingTop: appStyles.metrics.getHeightFromDP('8'),
    justifyContent: 'space-evenly',
    flex: 1,
    backgroundColor: appStyles.colors.primaryColor
  },
  wrapperButonNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: appStyles.metrics.getWidthFromDP('100%'),
    height: appStyles.metrics.getHeightFromDP('8%'),
    paddingHorizontal: 2 * appStyles.metrics.extraLargeSize,
    marginTop: appStyles.metrics.getHeightFromDP('5%')
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  formWrapper: {
    width: appStyles.metrics.width,
    height: appStyles.metrics.getHeightFromDP('70')
  },
  appName: {
    color: styles.colors.yellow,
    marginBottom: 30,
    fontFamily: 'CircularStd-Black',
    fontSize: 25,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  }
});

export default Login;
