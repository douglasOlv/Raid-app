import React from 'react';
import { View, Vibration } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';
import { Entypo } from '@expo/vector-icons';
import appStyles from '~/styles';
import { removeItemFromStorage } from '~/utils/useAsyncStorage';
import { Updates } from 'expo';

function ThreeDotsMenu() {
  function logout() {
    removeItemFromStorage('token').then(response => {
      Updates.reload();
    });
  }

  return (
    <View>
      <Menu>
        <MenuTrigger
          style={{ paddingHorizontal: 10, paddingVertical: 5 }}
          onPress={() => {
            Vibration.vibrate(100);
          }}
        >
          <Entypo
            name='dots-three-vertical'
            size={20}
            color={appStyles.colors.defaultWhite}
          />
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={{
            maxWidth: 125,
            marginTop: -appStyles.metrics.getHeightFromDP('1')
          }}
        >
          <MenuOption onSelect={() => {}} text='Perfil' />
          <MenuOption onSelect={logout} text='Sair' />
        </MenuOptions>
      </Menu>
    </View>
  );
}
export default ThreeDotsMenu;
