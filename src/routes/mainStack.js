import { createBottomTabNavigator } from 'react-navigation-tabs';
import headerUtils from './headerUtils';
import appStyles from '~/styles';

import RootStack from '~/components/screen/raids/routes';
import MinhasRaidsStack from '~/components/screen/minhasRaids/routes';
import AddRaidStack from '~/components/screen/addRaid/routes';

const applicationTabs = createBottomTabNavigator(
  {
    RootStack: {
      screen: RootStack,
      navigationOptions: ({ navigation, screenProps }) => ({
        title: 'Raids',
        tabBarIcon: headerUtils.getIconFontAwesome('list-ul')
      })
    },
    MinhasRaidsStack: {
      screen: MinhasRaidsStack,
      navigationOptions: {
        title: 'Minhas Raids',
        tabBarIcon: headerUtils.getIconFontAwesome('group')
      }
    },

    AddRaidStack: {
      screen: AddRaidStack,
      navigationOptions: {
        title: 'Adicionar Raid',
        tabBarIcon: headerUtils.getIconEntypo('add-to-list', 34)
      }
    }
  },
  {
    optimizationsEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      showLabel: false,
      activeTintColor: appStyles.colors.defaultWhite,
      inactiveTintColor: appStyles.colors.transparent05,
      style: {
        backgroundColor: appStyles.colors.primaryColor,
        height: appStyles.metrics.navigationHeaderHeight,
        position: 'absolute'
      }
    }
  }
);

export default applicationTabs;
