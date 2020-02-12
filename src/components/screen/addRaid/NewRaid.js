import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';

import TextIputAnimation from '~/components/commun/TextInputAnimation';
import DateTimePicker from './components/DateTimeInput';
import { withFormik } from 'formik';
import { getItemFromStorage } from '~/utils/useAsyncStorage';
import api from '~/service/api';
import * as Yup from 'yup';
import appStyles from '~/styles';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    marginVertical: appStyles.metrics.extraLargeSize,
    color: appStyles.colors.primaryText,
    fontWeight: 'bold'
  },
  titleWrapper: { alignItems: 'center', marginBottom: 15 },
  form: {
    height: appStyles.metrics.getHeightFromDP('54'),
    justifyContent: 'space-between',
    marginBottom: appStyles.metrics.navigationHeaderHeight * 1.7,
    marginHorizontal: appStyles.metrics.getWidthFromDP('5'),
    backgroundColor: appStyles.colors.transparentGrayx,
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderRadius: 10
  },
  gymWrapper: {
    marginTop: appStyles.metrics.getHeightFromDP('4')
  },
  gymTitle: {
    color: 'rgba(0,0,0,0.7)',
    height: 48,
    paddingTop: 14
  },
  gymLabel: {
    fontSize: 12,
    color: '#808080',
    marginLeft: 15
  },
  gymInput: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    height: 48,
    justifyContent: 'center',
    paddingLeft: 15
  },
  button: {
    height: appStyles.metrics.getHeightFromDP('7%'),
    marginHorizontal: appStyles.metrics.getWidthFromDP('5'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appStyles.colors.yellow,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5
  }
});

const NewRaid = props => {
  const gym = props.navigation.getParam('gym');

  props.values.gym_id = gym.id;
  return (
    <KeyboardAvoidingView behavior='padding' style={style.container}>
      <View style={style.titleWrapper}>
        <Text style={style.title}> Criar uma Raid</Text>
      </View>
      <View style={style.form}>
        <View>
          <View style={style.gymWrapper}>
            <Text style={style.gymLabel}>Ginásio</Text>

            <View style={style.gymInput}>
              <Text
                style={style.gymTitle}
                onPress={() => {
                  props.navigation.goBack();
                }}
              >
                {gym.name}
              </Text>
            </View>
          </View>
          <DateTimePicker
            value={props.values.raid_time}
            onChange={text => props.setFieldValue('raid_time', text)}
          />
          <TextIputAnimation
            label='Raid nivel'
            value={props.values.raid_lv}
            setValue={text => props.setFieldValue('raid_lv', text)}
          />
          <TextIputAnimation
            label='Pokemon'
            value={props.values.pokemon}
            setValue={text => props.setFieldValue('pokemon', text)}
          />
        </View>

        <TouchableOpacity onPress={props.handleSubmit} style={style.button}>
          {props.isSubmitting && <ActivityIndicator />}
          {!props.isSubmitting && <Text>Criar Raid</Text>}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
NewRaid.navigationOptions = () => ({});

export default withFormik({
  mapPropsToValues: () => ({
    gym_id: '',
    raid_lv: '',
    pokemon: '',
    raid_time: new Date()
  }),

  validationSchema: Yup.object().shape({
    raid_lv: Yup.string().required('Nivel não pode ser vazio'),
    pokemon: Yup.string().required('Pokemon não pode ser vazio'),
    raid_time: Yup.string().required('Horario não pode ser vazio')
  }),
  validateOnChange: false,
  handleSubmit: (values, { setSubmitting }) => {
    const { gym_id, pokemon, raid_lv, raid_time } = values;

    getItemFromStorage('token')
      .then(token => {
        console.log(gym_id, raid_lv, raid_time, pokemon, token);

        api
          .post(
            'raid',
            { gym_id, raid_lv, raid_time, pokemon },
            {
              headers: {
                Authorization: 'Bearer '.concat(token)
              }
            }
          )
          .then(({ data }) => {
            alert('Raid criada com Sucesso');
            setSubmitting(false);
          })
          .catch(erro => {
            console.log(erro);
            setSubmitting(false);
          });
      })
      .catch(erro => {
        console.log(erro);
        setSubmitting(false);
      });
  }
})(NewRaid);
