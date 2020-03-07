import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { getItemFromStorage } from '~/utils/useAsyncStorage';
import api from '~/service/api';

import appStyles from '~/styles';

export default function Details({ navigation }) {
  const { users, id } = navigation.state.params;
  const [takePart, setTakePart] = useState(false);
  const [raidUsers, setRaidUsers] = useState(users);

  useEffect(() => {
    getItemFromStorage('email').then(emailStorage => {
      raidUsers.forEach(user => {
        user.email === emailStorage ? setTakePart(true) : setTakePart(false);
      });
    });
  }, []);

  function addOrRemoveUser(parms) {}

  const renderUserInList = ({ item }) => {
    return <Text style={{ textTransform: 'capitalize' }}>{item.username}</Text>;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center' }}>
        <FlatList
          data={raidUsers}
          renderItem={renderUserInList}
          keyExtractor={item => item.id.toString()}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          getItemFromStorage('Token').then(token => {
            api
              .post(
                'raidUsers',
                { raid_id: id },
                {
                  headers: {
                    Authorization: 'Bearer '.concat(token)
                  }
                }
              )
              .then(({ data }) => {})
              .catch(erro => {
                console.log(erro);
              });
          });
        }}
        disabled={takePart}
        style={{
          height: appStyles.metrics.getHeightFromDP('7%'),
          marginTop: appStyles.metrics.getHeightFromDP('5%'),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: !takePart
            ? appStyles.colors.yellow
            : appStyles.colors.lightGray,
          borderColor: '#000',
          borderWidth: takePart ? 1 : 0,
          borderRadius: 5
        }}
      >
        <Text>Participar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          getItemFromStorage('Token').then(token => {
            api
              .post(
                'deleteUserFromRaid',
                { raid_id: id },
                {
                  headers: {
                    Authorization: 'Bearer '.concat(token)
                  }
                }
              )
              .then(({ data }) => {})
              .catch(erro => {
                console.log(erro);
              });
          });
        }}
        disabled={!takePart}
        style={{
          height: appStyles.metrics.getHeightFromDP('7%'),
          marginTop: appStyles.metrics.getHeightFromDP('5%'),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: takePart
            ? appStyles.colors.yellow
            : appStyles.colors.lightGray,
          borderColor: '#000',
          borderWidth: takePart ? 1 : 0,
          borderRadius: 5
        }}
      >
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
Details.navigationOptions = () => ({});
