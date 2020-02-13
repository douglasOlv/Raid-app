import { createStackNavigator } from 'react-navigation-stack';
import ThreeDotsMenu from '~/utils/ThreeDotsMenu';
import appStyles from '~/styles';
import AddRaid from './index';

const AddRaidStack = createStackNavigator(
  {
    AddRaid: {
      screen: AddRaid,
      navigationOptions: {
        headerTitleAlign: 'center',
        title: 'Nova Raid',
        headerRight: ThreeDotsMenu
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
