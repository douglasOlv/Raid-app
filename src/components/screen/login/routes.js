import { createStackNavigator } from 'react-navigation-stack';
import Login from './';
import ForgotPasswd from './components/forgotPasswd';

const LoginStack = createStackNavigator(
  {
    Login,

    ForgotPasswd
  },
  {
    headerMode: 'none'
  }
);

export default LoginStack;
