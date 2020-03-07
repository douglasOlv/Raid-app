import { createStackNavigator } from 'react-navigation-stack';
import Login from './';
import ForgotPasswd from './components/forgotPasswd';

const LoginStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        title: '',
        headerTransparent: true
      }
    },

    ForgotPasswd: {
      screen: ForgotPasswd,
      navigationOptions: {
        title: '',
        headerTransparent: true
      }
    }
  },
  {}
);

export default LoginStack;
