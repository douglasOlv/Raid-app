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
          data.reverse();
          setFeed(data);
        })
        .catch(erro => {
          console.log(erro);
          props.navigation.navigate('Login');
        });
    });
  }, [refresh]);

  const renderRaidItemlist = ({ item }) => {
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
            props.navigation.navigate('Details');
          }}
        >
          <View style={style.feedItemLvl}>
            <Text style={style.itemLvlText}>{item.raid_lv}</Text>
          </View>
          <View style={style.bodyFeedItem}>
            <Text style={style.feedNameText}>{item.pokemon}</Text>
            <Text>{handleDisplayDate(item.raid_time)}</Text>
            <Text>{item.raid_time}</Text>
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
        renderItem={renderRaidItemlist}
        keyExtractor={item => `${item.id}`}
        invertStickyHeaders
        refreshing={false}
        onRefresh={() => {
          refresh === false ? setRefresh(true) : setRefresh(false);
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
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: appStyles.colors.defaultWhite,
    borderRadius: appStyles.metrics.smallSize,
    paddingLeft: appStyles.metrics.getWidthFromDP('4'),
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
    backgroundColor: appStyles.colors.lightGray,
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
  }
});
