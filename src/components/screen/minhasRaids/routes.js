import { createStackNavigator } from 'react-navigation-stack';
import appStyles from '~/styles';
import MinhasRaids from '.';
import Details from './components/Details';

const MinhasRaidsStack = createStackNavigator(
  {
    MinhasRaids: {
      screen: MinhasRaids,
      navigationOptions: {
        headerTitleAlign: 'center',
        title: 'Minhas Raids'
      }
    },
    Details
  },
  {
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

MinhasRaidsStack.navigationOptions = ({ navigation }) => {
  const tabBarVisible = navigation.state.index <= 0;

  return {
    tabBarVisible
  };
};
export default MinhasRaidsStack;
