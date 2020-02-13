import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';

import TextIputAnimation from '~/components/commun/TextInputAnimation';
import TextIputSearch from './components/TextInputSearch';

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
    paddingVertical: 15,
    borderRadius: 10
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
  // const gym = props.navigation.getParam('gym');

  // props.values.gym_id = gym.id;
  const [gym, setGym] = useState();
  useEffect(() => {
    getItemFromStorage('Token')
      .then(token => {
        api
          .get('/gym', {
            headers: {
              Authorization: 'Bearer '.concat(token)
            }
          })
          .then(({ data }) => {
            setGym(data);
          })
          .catch(erro => {
            console.log(erro);
          });
      })
      .catch(erro => {
        console.log(erro);
      });
  }, []);
  return (
    <KeyboardAvoidingView behavior='padding' style={style.container}>
      <View style={style.titleWrapper}>
        <Text style={style.title}> Criar uma Raid</Text>
      </View>
      <View style={style.form}>
        <View>
          <TextIputSearch
            label='Ginásio'
            data={gym}
            setValue={text => props.setFieldValue('gym_id', text)}
          />
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

    getItemFromStorage('Token')
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
