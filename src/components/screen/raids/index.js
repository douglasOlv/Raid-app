import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList
} from 'react-native';
import { parseISO, formatRelative } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import api from '~/service/api';
import { getItemFromStorage } from '~/utils/useAsyncStorage';

import { Feather } from '@expo/vector-icons';

import appStyles from '~/styles';

export default function Raids(props) {
  const [feed, setFeed] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [statusRefresh, setStatusRefresh] = useState(false);
  const [showUsers, setSHowUsers] = useState(false);
  const [isPartaker, setIsPartaker] = useState(false);

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
          setStatusRefresh(false);
        })
        .catch(erro => {
          console.log(erro);
          props.navigation.navigate('Login');
        });
    });
  }, [refresh, isPartaker]);

  const renderItemFeed = ({ item }) => {
    const { raid_lv, pokemon, raid_time, id, users } = item;
    const handleDisplayDate = date => {
      var dateFormated = formatRelative(parseISO(date), new Date(), {
        locale: ptBR
      });
      return dateFormated;
    };

    return (
      <View style={style.feedItem}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Details', { id, users });
          }}
        >
          <View style={style.feedItemLvl}>
            <Text style={style.itemLvlText}>{raid_lv}</Text>
          </View>
          <View style={style.bodyFeedItem}>
            <Text style={style.feedNameText}>{pokemon}</Text>
            <Text>{handleDisplayDate(raid_time)}</Text>
            <Text>{raid_time}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={style.container}>
      <FlatList
        data={feed}
        extraData
        renderItem={renderItemFeed}
        keyExtractor={item => item.id.toString()}
        invertStickyHeaders
        refreshing={statusRefresh}
        onRefresh={() => {
          setStatusRefresh(true);
          refresh === 0 ? setRefresh(1) : setRefresh(0);
        }}
      />
    </View>
  );
}

Raids.navigationOptions = () => ({});

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: appStyles.metrics.navigationHeaderHeight
  },
  feedItem: {
    minHeight: appStyles.metrics.getHeightFromDP('12'),
    zIndex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: appStyles.colors.defaultWhite,
    borderRadius: appStyles.metrics.smallSize,
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10
  },
  feedItemLvl: {
    position: 'absolute',
    top: 8,
    right: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appStyles.colors.lightingDarkLayer,
    height: appStyles.metrics.getWidthFromDP('8'),
    width: appStyles.metrics.getWidthFromDP('8'),
    borderRadius: appStyles.metrics.getWidthFromDP('5')
  },
  itemLvlText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: appStyles.colors.blue
  },
  bodyFeedItem: {
    justifyContent: 'space-between',
    height: appStyles.metrics.getHeightFromDP('7'),
    marginVertical: appStyles.metrics.getHeightFromDP('2')
  },
  feedNameText: {
    fontSize: 16,
    fontFamily: 'CircularStd-Black',
    color: appStyles.colors.darkText
  },
  nameListPartaker: {
    textTransform: 'capitalize',
    marginLeft: 30
  }
});
