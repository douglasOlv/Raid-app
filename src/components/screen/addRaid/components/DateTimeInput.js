import React from 'react';
import DatePicker from 'react-native-datepicker';
import { View, Text, StyleSheet, YellowBox } from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import appStyles from '~/styles';

YellowBox.ignoreWarnings([
  "DatePickerAndroid has been merged with DatePickerIOS and will be removed in a future release. It can now be installed and imported from '@react-native-community/datetimepicker' instead of 'react-native'. See https://github.com/react-native-community/react-native-datetimepicker",
  "TimePickerAndroid has been merged with DatePickerIOS and DatePickerAndroid and will be removed in a future release. It can now be installed and imported from '@react-native-community/datetimepicker' instead of 'react-native'. See https://github.com/react-native-community/react-native-datetimepicker",
  'componentWillReceiveProps has been renamed, and is not recommended for use. See https://fb.me/react-async-component-lifecycle-hooks for details' // TODO: Remove when fixed
]);

const style = StyleSheet.create({
  gymWrapper: {
    marginTop: appStyles.metrics.getHeightFromDP('0.4')
  },
  gymLabel: {
    fontSize: 12,
    color: '#808080',
    marginLeft: 15
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    height: 48,
    width: appStyles.metrics.getWidthFromDP('82'),
    justifyContent: 'center',
    paddingLeft: 15
  }
});

function MyDatePicker(props) {
  function textDateDisplay() {
    const date = props.value;
    if (typeof date === 'object') {
      return format(date, "dd 'de' MMMM 'de 'yyyy 'às' HH:mm", {
        locale: ptBR
      });
    }
    var year = date.split('-')[0];
    var month = date.split('-')[1];
    var day = date.split('-')[2].split(' ')[0];
    var hour = date
      .split('-')[2]
      .split(' ')[1]
      .split(':')[0];
    var minute = date
      .split('-')[2]
      .split(' ')[1]
      .split(':')[1];
    return format(
      new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hour),
        parseInt(minute)
      ),
      "dd 'de' MMMM 'de 'yyyy 'às' HH:mm",
      { locale: ptBR }
    );
  }

  return (
    <View style={style.gymWrapper}>
      <Text style={style.gymLabel}>Data e Hora</Text>
      <Text style={{ position: 'absolute', top: 30, left: 15 }}>
        {textDateDisplay()}
      </Text>

      <DatePicker
        style={style.input}
        date={props.value}
        timeZoneOffsetInMinutes={0}
        mode='datetime'
        is24Hour={true}
        customStyles={{
          dateIcon: {
            position: 'absolute',
            margin: 0,
            height: 0,
            width: 0
          },
          dateInput: {
            borderWidth: 0,
            alignItems: 'flex-start'
          },
          dateText: {
            color: 'rgba(0,0,0,0.7)',
            textAlign: 'left',
            display: 'none'
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={props.onChange}
      />
    </View>
  );
}
export default MyDatePicker;
