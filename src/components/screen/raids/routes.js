import { createStackNavigator } from 'react-navigation-stack';
import headerUtils from '~/routes/headerUtils';
import appStyles from '~/styles';
import Raids from '.';
import Details from './components/Details';
import { TransitioningView } from 'react-native-reanimated';

const RootStack = createStackNavigator(
  {
    Raids: {
      screen: Raids,
      navigationOptions: {
        headerTitleAlign: 'center',
        title: 'Raids'
      }
    },
    Details
  },
  {
    initialRouteName: 'Raids',
    defaultNavigationOptions: {
      headerTitleStyle: {
        color: appStyles.colors.defaultWhite,
        fontWeight: 'bold'
      },
      headerStyle: {
        backgroundColor: appStyles.colors.primaryColor
      }
    }
  }
);

RootStack.navigationOptions = ({ navigation }) => {
  const tabBarVisible = navigation.state.index <= 0;

  return {
    tabBarVisible
  };
};

export default RootStack;
