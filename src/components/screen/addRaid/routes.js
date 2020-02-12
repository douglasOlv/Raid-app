import { createStackNavigator } from 'react-navigation-stack';
import appStyles from '~/styles';
import AddRaid from './index';

const AddRaidStack = createStackNavigator(
  {
    AddRaid: {
      screen: AddRaid,
      navigationOptions: {
        headerTitleAlign: 'center',
        title: 'Criar Raid'
      }
    }
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

export default AddRaidStack;
