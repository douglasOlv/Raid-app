import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList
} from 'react-native';
import PTRView from 'react-native-pull-to-refresh';
import api from '~/service/api';
import { getItemFromStorage } from '~/utils/useAsyncStorage';

import appStyles from '~/styles';

export default function Raids(props) {
  const [feed, setFeed] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getItemFromStorage('Token').then(token => {
      api
        .get('raid', {
          headers: {
            Authorization: 'Bearer '.concat(token)
          }
        })
        .then(({ data }) => {
          setFeed(data);
        })
        .catch(erro => {
          console.log(erro);
          props.navigation.navigate('Login');
        });
    });
  }, [refresh]);

  const renderRaidItemlist = ({ item }) => (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Details');
        }}
      >
        <View>
          <Text>{item.raid_lv}</Text>
        </View>
        <View>
          <Text>{item.pokemon}</Text>
          <Text>{item.raid_lv}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={style.container}>
      <FlatList
        data={feed}
        extraData
        renderItem={renderRaidItemlist}
        keyExtractor={item => `${item.id}`}
        refreshing={refresh}
        onRefresh={() => {
          setRefresh(true);
        }}
      />
    </View>
  );
}

Raids.navigationOptions = () => ({});

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  headerTxt: {},
  button: {
    backgroundColor: appStyles.colors.yellow
  }
});
