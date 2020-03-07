import React from 'react';
import { withFormik } from 'formik';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { persistItemInStorage } from '~/utils/useAsyncStorage';
import * as Yup from 'yup';
import api from '~/service/api';
import InputCommun from '~/components/commun/InputCommun';
import appStyles from '~/styles';

const LoginInComponent = props => (
  <View style={style.container}>
    <View style={style.formWrapper}>
      {props.errors.message && (
        <Text style={style.notification}>{props.errors.message}</Text>
      )}

      <InputCommun
        style={style.customInput}
        label={props.errors.login ? props.errors.login : 'E-mail'}
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false}
        value={props.values.login}
        setValue={text => props.setFieldValue('login', text)}
      />
      <InputCommun
        style={style.customInput}
        label={props.errors.passwdLogin ? props.errors.passwdLogin : 'Senha'}
        secureTextEntry={true}
        autoCapitalize='none'
        autoCorrect={false}
        value={props.values.passwdLogin}
        setValue={text => props.setFieldValue('passwdLogin', text)}
      />
      <TouchableOpacity onPress={props.handleSubmit} style={style.button}>
        {props.isSubmitting && <ActivityIndicator />}
        {!props.isSubmitting && <Text>Entrar</Text>}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ForgotPasswd');
        }}
      >
        <Text style={style.forgetpsswd}>Esqueseu a Senha?</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const style = StyleSheet.create({
  container: {
    marginTop: appStyles.metrics.extraLargeSize,
    width: appStyles.metrics.getWidthFromDP('90'),
    marginHorizontal: appStyles.metrics.getWidthFromDP('5'),
    justifyContent: 'flex-start'
  },
  formWrapper: {
    justifyContent: 'center'
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
  forgetpsswd: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'center',
    marginTop: appStyles.metrics.getHeightFromDP('2')
  },

  notification: {
    color: appStyles.colors.red,
    marginTop: -appStyles.metrics.extraLargeSize,
    fontFamily: 'Montserrat-Regular'
  }
});

const HandleFormValidation = withFormik({
  mapPropsToValues: () => ({ login: '', passwdLogin: '', message: '' }),

  validationSchema: Yup.object().shape({
    login: Yup.string()
      .required('Digite um e-mail')
      .email('Digite um e-mail valido'),
    passwdLogin: Yup.string().required('Digite uma senha')
  }),
  validateOnChange: false,

  handleSubmit: (values, { setErrors, setSubmitting, props }) => {
    persistItemInStorage('email', values.login).then();
    persistItemInStorage('password', values.passwdLogin).then();
    api
      .post('login', {
        email: values.login,
        password: values.passwdLogin
      })
      .then(response => {
        setSubmitting(false);
        const { Token } = response.data;
        persistItemInStorage('Token', Token)
          .then(props.navigation.navigate('MainStack'))
          .catch(error => console.log(error));
      })
      .catch(erro => {
        setSubmitting(false);
        let { uidField } = erro.response.data.message;
        console.log(uidField);

        uidField === 'email'
          ? setErrors({
              message: ' Não foi encontrado usuário com esse email'
            })
          : setErrors({ message: ' Senha Incoreta' });
      });
  }
})(LoginInComponent);

export default withNavigation(HandleFormValidation);
