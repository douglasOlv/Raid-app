import React from 'react';

import { View, Text, Vibration } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import appStyles from '~/styles';
import { removeItemFromStorage } from '~/utils/useAsyncStorage';
import { Updates } from 'expo';

function ThreeDotsMenu() {
  hideMenu = () => {
    menu.hide();
  };

  showMenu = () => {
    Vibration.vibrate(100);
    menu.show();
  };

  logout = () => {
    removeItemFromStorage('Token').then(response => {
      Updates.reload();
    });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Menu
        ref={ref => (menu = ref)}
        button={
          <Text
            onPress={showMenu}
            style={{
              height: 40,
              width: 30,
              paddingVertical: 5
            }}
          >
            <Entypo
              name='dots-three-vertical'
              size={20}
              color={appStyles.colors.defaultWhite}
            />
          </Text>
        }
      >
        <MenuItem onPress={hideMenu}>Menu item 1</MenuItem>
        <MenuItem onPress={hideMenu}>Menu item 2</MenuItem>
        <MenuDivider />
        <MenuItem onPress={logout}>Sair</MenuItem>
      </Menu>
    </View>
  );
}

export default ThreeDotsMenu;
