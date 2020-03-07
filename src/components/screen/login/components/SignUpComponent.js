import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withNavigation } from 'react-navigation';
import api from '~/service/api';
import InputCommun from '~/components/commun/InputCommun';
import appStyles from '~/styles';

const SignUpComponent = props => (
  <View style={style.container}>
    <View>
      <InputCommun
        style={style.customInput}
        label={
          props.errors.username ? props.errors.username : 'Nome de Usuário'
        }
        keyboardType='default'
        autoCapitalize='none'
        autoCorrect={false}
        value={props.values.username}
        setValue={text => props.setFieldValue('username', text)}
      />

      <InputCommun
        style={style.customInput}
        label={props.errors.email ? props.errors.email : 'E-mail'}
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false}
        value={props.values.email}
        setValue={text => props.setFieldValue('email', text)}
      />

      <InputCommun
        style={style.customInput}
        label={props.errors.passwd ? props.errors.passwd : 'Senha'}
        secureTextEntry={true}
        autoCapitalize='none'
        autoCorrect={false}
        value={props.values.passwd}
        setValue={text => props.setFieldValue('passwd', text)}
      />

      <InputCommun
        style={style.customInput}
        label={
          props.errors.passwdConfirmation
            ? props.errors.passwdConfirmation
            : 'Confirme a senha'
        }
        secureTextEntry={true}
        autoCapitalize='none'
        autoCorrect={false}
        value={props.values.passwdConfirmation}
        setValue={text => props.setFieldValue('passwdConfirmation', text)}
      />
      <TouchableOpacity onPress={props.handleSubmit} style={style.button}>
        {props.isSubmitting && <ActivityIndicator />}
        {!props.isSubmitting && <Text>Cadastrar Usuário</Text>}
      </TouchableOpacity>
    </View>
    <View style={style.notificationWrapper}>
      {props.errors.message && (
        <Text style={style.notification}>{props.errors.message}</Text>
      )}
    </View>
  </View>
);

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: appStyles.metrics.extraLargeSize,
    width: appStyles.metrics.getWidthFromDP('90'),
    marginHorizontal: appStyles.metrics.getWidthFromDP('5%'),
    justifyContent: 'flex-start'
  },

  button: {
    height: appStyles.metrics.getHeightFromDP('7%'),
    marginTop: appStyles.metrics.getHeightFromDP('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appStyles.colors.yellow,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5
  },

  notification: {
    color: appStyles.colors.red,
    marginTop: -appStyles.metrics.extraLargeSize,
    fontFamily: 'Montserrat-Regular'
  },
  notificationWrapper: {
    marginTop: appStyles.metrics.extraLargeSize,
    alignItems: 'center'
  }
});

const handleFormValidation = withFormik({
  mapPropsToValues: () => ({
    username: '',
    email: '',
    passwd: '',
    passwdConfirmation: '',
    message: ''
  }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Digite um nome de usuario'),
    email: Yup.string()
      .email('Digite um e-mail valido')
      .required('Digite um email'),
    passwd: Yup.string()
      .min(6, 'Digite uma senha com no mínimo 6 caracteres')
      .required('Digite uma senha'),
    passwdConfirmation: Yup.string()
      .oneOf([Yup.ref('passwd'), null], 'Repita a senha coretamente')
      .required('Digite a senha')
  }),
  validateOnChange: false,

  handleSubmit: (values, { setSubmitting, setErrors }) => {
    api
      .post('users', {
        username: values.username,
        email: values.email,
        password: values.passwd
      })
      .then(response => {
        setSubmitting(false);
        console.log(response.data);
      })
      .catch(error => {
        setSubmitting(false);
        let message = Object.values(error.response.data);
        let cont = message.indexOf('allready have this email on database');
        cont >= 0
          ? setErrors({ message: 'Este email já está cadastrado' })
          : setErrors({ message: 'Este nome de usuário já está em uso' });
      });
  }
})(SignUpComponent);

export default withNavigation(handleFormValidation);
